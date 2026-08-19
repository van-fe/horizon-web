import { mount } from '@vue/test-utils';
import { computed, defineComponent, nextTick, reactive } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type { TableProps } from '../src/composables/useProps';
import useGrouping from '../src/hooks/useGrouping';
import type { HTableTransformedRowDataType } from '../src/utils/types';
import { HTableGroupContextKey } from '../src/utils/types';

function createHarness(
  initialProps: Partial<TableProps>,
  initialRows: Array<Record<string, unknown>>,
) {
  const rawProps: Record<string, unknown> = {
    aggregations: {},
    defaultExpandAllGroups: false,
  };
  Object.assign(rawProps, initialProps);
  const props = reactive(rawProps) as unknown as TableProps;
  const source = reactive({ rows: initialRows as HTableTransformedRowDataType[] });
  const emit = vi.fn();
  let grouping!: ReturnType<typeof useGrouping>;
  const Harness = defineComponent({
    setup() {
      grouping = useGrouping({
        props,
        rows: computed(() => source.rows),
        emit: emit as never,
      });
      return () => null;
    },
  });
  const wrapper = mount(Harness);
  return { emit, grouping, props, source, wrapper };
}

function contexts(grouping: ReturnType<typeof useGrouping>) {
  return grouping.rows.value
    .filter(grouping.isGroupRow)
    .map(row => row[HTableGroupContextKey]);
}

describe('Table useGrouping branch contracts', () => {
  test('returns source rows unchanged without grouping and reacts to scalar/function/array fields', async () => {
    const rows = [
      { id: 1, team: 'Core', nested: { role: 'dev' } },
      { id: 2, team: 'Core', nested: { role: 'qa' } },
    ];
    const state = createHarness({}, rows);

    expect(state.grouping.rows.value).toBe(state.source.rows);
    expect(contexts(state.grouping)).toEqual([]);

    state.props.groupBy = 'team';
    await nextTick();
    expect(contexts(state.grouping).map(group => group.field)).toEqual(['team']);

    state.props.groupBy = row => (row.id === 1 ? 'odd' : 'even');
    await nextTick();
    expect(contexts(state.grouping).map(group => [group.value, group.field])).toEqual([
      ['odd', undefined],
      ['even', undefined],
    ]);

    state.props.groupBy = ['team', 'nested.role'];
    state.props.defaultExpandAllGroups = true;
    await nextTick();
    expect(contexts(state.grouping).map(group => [group.level, group.label])).toEqual([
      [0, 'Core'],
      [1, 'dev'],
      [1, 'qa'],
    ]);

    state.wrapper.unmount();
  });

  test('serializes nullable, object, undefined, and circular group values', () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    const state = createHarness(
      {
        groupBy: row => row.group,
        defaultExpandAllGroups: true,
      },
      [
        { id: 1, group: null },
        { id: 2, group: undefined },
        { id: 3, group: { kind: 'object' } },
        { id: 4, group: circular },
      ],
    );

    expect(contexts(state.grouping).map(group => group.label)).toEqual([
      'null',
      'undefined',
      '{"kind":"object"}',
      '[object Object]',
    ]);
    expect(contexts(state.grouping).map(group => group.key)).toEqual([
      'group:0:null',
      'group:0:undefined',
      'group:0:%7B%22kind%22%3A%22object%22%7D',
      'group:0:%5Bobject%20Object%5D',
    ]);

    state.wrapper.unmount();
  });

  test('finishes every built-in aggregation branch and invokes custom aggregators', () => {
    const custom = vi.fn((values: unknown[], rows: HTableTransformedRowDataType[], field: string) =>
      `${field}:${values.join('|')}:${rows.length}`,
    );
    const state = createHarness(
      {
        groupBy: 'team',
        defaultExpandAllGroups: true,
        aggregations: {
          id: 'count',
          total: 'sum',
          average: 'average',
          low: 'min',
          high: 'max',
          empty: 'sum',
          custom,
        },
      },
      [
        {
          id: 1,
          team: 'Core',
          total: 2,
          average: 2,
          low: 4,
          high: 4,
          empty: 'not numeric',
          custom: 'a',
        },
        {
          id: 2,
          team: 'Core',
          total: 3,
          average: 4,
          low: 1,
          high: 9,
          empty: Number.NaN,
          custom: 'b',
        },
      ],
    );
    const group = contexts(state.grouping)[0];

    expect(group.aggregates).toEqual({
      id: 2,
      total: 5,
      average: 3,
      low: 1,
      high: 9,
      empty: undefined,
      custom: 'custom:a|b:2',
    });
    expect(custom).toHaveBeenCalledWith(['a', 'b'], state.source.rows, 'custom');

    state.wrapper.unmount();
  });

  test('sets optional row keys and toggles uncontrolled collapsed and expanded states', () => {
    const state = createHarness(
      { groupBy: 'team', rowKey: 'id', defaultExpandAllGroups: false },
      [
        { id: 1, team: 'Core' },
        { id: 2, team: 'Web' },
      ],
    );
    const [core, web] = contexts(state.grouping);
    const coreRow = state.grouping.rows.value[0];

    expect(coreRow.id).toBe(core.key);
    expect(core.expanded).toBe(false);
    expect(state.grouping.expandedGroupKeys()).toEqual([]);

    state.grouping.toggleGroup(core.key);
    expect(contexts(state.grouping)[0].expanded).toBe(true);
    expect(state.grouping.expandedGroupKeys()).toEqual([core.key]);
    expect(state.emit).toHaveBeenNthCalledWith(1, 'update:expandedGroupKeys', [core.key]);
    expect(state.emit).toHaveBeenNthCalledWith(2, 'groupToggle', core.key, true);

    state.grouping.toggleGroup(web.key);
    expect(state.emit).toHaveBeenNthCalledWith(3, 'update:expandedGroupKeys', [core.key, web.key]);
    state.grouping.toggleGroup(core.key);
    expect(state.emit).toHaveBeenNthCalledWith(5, 'update:expandedGroupKeys', [web.key]);
    expect(state.emit).toHaveBeenNthCalledWith(6, 'groupToggle', core.key, false);

    state.wrapper.unmount();
  });

  test('toggles default-expanded groups and honors controlled expanded keys', async () => {
    const state = createHarness(
      { groupBy: 'team', defaultExpandAllGroups: true },
      [
        { id: 1, team: 'Core' },
        { id: 2, team: 'Web' },
      ],
    );
    const [core, web] = contexts(state.grouping);

    expect(state.grouping.expandedGroupKeys()).toEqual([core.key, web.key]);
    state.grouping.toggleGroup(core.key);
    expect(state.grouping.expandedGroupKeys()).toEqual([web.key]);
    state.grouping.toggleGroup(core.key);
    expect(state.grouping.expandedGroupKeys()).toEqual([core.key, web.key]);

    state.props.expandedGroupKeys = [web.key];
    await nextTick();
    expect(contexts(state.grouping).map(group => group.expanded)).toEqual([false, true]);
    state.grouping.toggleGroup(core.key);
    expect(state.emit).toHaveBeenLastCalledWith('groupToggle', core.key, true);
    expect(state.emit).toHaveBeenNthCalledWith(
      state.emit.mock.calls.length - 1,
      'update:expandedGroupKeys',
      [core.key, web.key],
    );

    state.wrapper.unmount();
  });
});
