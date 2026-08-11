import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, ref, shallowReactive, shallowRef } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type { TableColumnProps } from '../src/composables/useProps';
import {
  createTableFilterPredicate,
  isTableFilterValueActive,
} from '../src/hooks/useFilter';
import useFilter from '../src/hooks/useFilter';
import useSortable, { compareTableRows } from '../src/hooks/useSortable';
import type {
  HTableColumnData,
  HTableInsertedColumnData,
  HTableTransformedRowDataType,
} from '../src/utils/types';
import {
  HTableSortOrderEnum,
  HTableTransformedRowContextKey,
} from '../src/utils/types';

function row(id: number, extra: Record<string, unknown> = {}) {
  return {
    id,
    ...extra,
    [HTableTransformedRowContextKey]: {
      uuid: id,
      index: id - 1,
      siblingIndex: id - 1,
      visible: shallowReactive<Record<string, boolean>>({}),
      parentUuid: null,
      level: 0,
      isLeaf: true,
    },
  } as HTableTransformedRowDataType;
}

function column(
  uuid: string,
  props: Partial<TableColumnProps>,
): HTableInsertedColumnData {
  return {
    uuid,
    props: shallowReactive<Record<string, unknown>>({
      field: 'value',
      filterType: 'input',
      useBuiltInFilter: true,
      sortable: true,
      useBuiltInSort: true,
      sortOrders: [HTableSortOrderEnum.ASC, HTableSortOrderEnum.DESC, null],
      ...props,
    }) as unknown as TableColumnProps,
    emit: vi.fn(),
    slots: {},
    children: [],
  };
}

describe('Table filter and sort browser branches', () => {
  test('classifies active scalar, empty, and nested array filter values', () => {
    expect(isTableFilterValueActive(null)).toBe(false);
    expect(isTableFilterValueActive(undefined)).toBe(false);
    expect(isTableFilterValueActive('')).toBe(true);
    expect(isTableFilterValueActive([])).toBe(false);
    expect(isTableFilterValueActive([null, undefined, []])).toBe(false);
    expect(isTableFilterValueActive([null, ['active']])).toBe(true);
  });

  test('compiles custom, text, selection, date, time, and fallback predicates', () => {
    const alpha = row(1, {
      profile: { name: ' Alpha ' },
      status: 1,
      date: '2026-08-10 11:30:00',
      time: '11:30:00',
    });
    const beta = row(2, {
      profile: { name: 'Beta' },
      status: 2,
      date: '2026-08-12 11:30:00',
      time: '14:00:00',
    });

    expect(createTableFilterPredicate(column('none', { field: undefined }), 'x')(alpha)).toBe(true);
    expect(createTableFilterPredicate(column('empty', {}), undefined)(alpha)).toBe(true);

    const customMethod = vi.fn((value: unknown, current: HTableTransformedRowDataType) =>
      String(current.id) === String(value),
    );
    const custom = createTableFilterPredicate(
      column('custom', { filterMethod: customMethod }),
      2,
    );
    expect(custom(alpha)).toBe(false);
    expect(custom(beta)).toBe(true);
    expect(customMethod).toHaveBeenCalledWith(2, beta, expect.objectContaining({ uuid: 'custom' }));

    const text = createTableFilterPredicate(
      column('text', { field: 'profile.name', filterType: 'input-number' }),
      ' ALP ',
    );
    expect(text(alpha)).toBe(true);
    expect(text(beta)).toBe(false);

    const multiple = createTableFilterPredicate(
      column('multi', { field: 'status', filterType: 'tree-select' }),
      [2, 3],
    );
    expect(multiple(alpha)).toBe(false);
    expect(multiple(beta)).toBe(true);
    const scalarMultiple = createTableFilterPredicate(
      column('scalar-multi', { field: 'status', filterType: 'cascader' }),
      1,
    );
    expect(scalarMultiple(alpha)).toBe(true);
    const single = createTableFilterPredicate(
      column('single', {
        field: 'status',
        filterType: 'select',
        filterOptions: { multiple: false },
      }),
      '2',
    );
    expect(single(beta)).toBe(true);

    const date = createTableFilterPredicate(
      column('date', { field: 'date', filterType: 'date-picker' }),
      '2026-08-10',
    );
    expect(date(alpha)).toBe(true);
    expect(date(beta)).toBe(false);
    const dateRange = createTableFilterPredicate(
      column('date-range', {
        field: 'date',
        filterType: 'date-picker',
        filterOptions: { type: 'daterange' },
      }),
      ['2026-08-09', '2026-08-11'],
    );
    expect(dateRange(alpha)).toBe(true);
    expect(dateRange(beta)).toBe(false);

    const time = createTableFilterPredicate(
      column('time', { field: 'time', filterType: 'time-picker' }),
      '11:30:00',
    );
    expect(time(alpha)).toBe(true);
    expect(time(beta)).toBe(false);
    const timeRange = createTableFilterPredicate(
      column('time-range', {
        field: 'time',
        filterType: 'time-picker',
        filterOptions: { isRange: true },
      }),
      ['10:00:00', '12:00:00'],
    );
    expect(timeRange(alpha)).toBe(true);
    expect(timeRange(beta)).toBe(false);

    expect(
      createTableFilterPredicate(
        column('fallback', { filterType: 'unknown' as TableColumnProps['filterType'] }),
        'x',
      )(alpha),
    ).toBe(true);
  });

  test('applies, clears, reconfigures, and disposes built-in row visibility', async () => {
    const rows = ref([row(1, { name: 'Alpha' }), row(2, { name: 'Beta' })]);
    const builtIn = ref(true);
    const currentColumn = column('name-filter', { field: undefined, filterType: 'input' });
    let filter!: ReturnType<typeof useFilter>;
    const Harness = defineComponent({
      setup() {
        filter = useFilter(currentColumn, vi.fn() as never, rows, () => builtIn.value);
        return () => null;
      },
    });
    const wrapper = mount(Harness);

    filter.currentFilterValue.value = 'alp';
    await nextTick();
    expect(currentColumn.emit).toHaveBeenCalledWith('filterChange', 'alp');
    expect(rows.value[0][HTableTransformedRowContextKey].visible).toEqual({});

    currentColumn.props.field = 'name';
    await nextTick();
    expect(rows.value[0][HTableTransformedRowContextKey].visible).toMatchObject({
      'name-filter': true,
    });
    expect(rows.value[1][HTableTransformedRowContextKey].visible).toMatchObject({
      'name-filter': false,
    });

    builtIn.value = false;
    await nextTick();
    expect(rows.value[0][HTableTransformedRowContextKey].visible).toEqual({});
    builtIn.value = true;
    await nextTick();
    currentColumn.props.useBuiltInFilter = false;
    await nextTick();
    expect(rows.value[1][HTableTransformedRowContextKey].visible).toEqual({});

    currentColumn.props.useBuiltInFilter = true;
    await nextTick();
    wrapper.unmount();
    expect(rows.value[0][HTableTransformedRowContextKey].visible).toEqual({});
  });

  test('uses built-in filtering by default when no mode callback is supplied', async () => {
    const rows = ref([row(1, { name: 'Alpha' }), row(2, { name: 'Beta' })]);
    const currentColumn = column('default-filter', { field: 'name', filterType: 'input' });
    let filter!: ReturnType<typeof useFilter>;
    const Harness = defineComponent({
      setup() {
        filter = useFilter(currentColumn, vi.fn() as never, rows);
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    filter.currentFilterValue.value = 'alpha';
    await nextTick();
    expect(rows.value[0][HTableTransformedRowContextKey].visible).toMatchObject({
      'default-filter': true,
    });
    expect(rows.value[1][HTableTransformedRowContextKey].visible).toMatchObject({
      'default-filter': false,
    });
    wrapper.unmount();
  });

  test('compares numeric edge cases, strings, custom methods, and skipped columns', () => {
    const one = row(1, { value: 2, label: 'item 2' });
    const two = row(2, { value: 10, label: 'item 10' });
    const nan = row(3, { value: Number.NaN, label: 'item 3' });
    const numeric = column('numeric', { field: 'value' }) as unknown as HTableColumnData;
    expect(compareTableRows([[numeric, HTableSortOrderEnum.ASC]], one, two)).toBeLessThan(0);
    expect(compareTableRows([[numeric, HTableSortOrderEnum.ASC]], two, one)).toBeGreaterThan(0);
    expect(compareTableRows([[numeric, HTableSortOrderEnum.DESC]], one, two)).toBeGreaterThan(0);
    expect(compareTableRows([[numeric, HTableSortOrderEnum.ASC]], nan, two)).toBeGreaterThan(0);
    expect(compareTableRows([[numeric, HTableSortOrderEnum.ASC]], two, nan)).toBeLessThan(0);
    expect(compareTableRows([[numeric, HTableSortOrderEnum.ASC]], nan, nan)).toBe(0);
    expect(compareTableRows([[numeric, HTableSortOrderEnum.ASC]], one, row(4, { value: 2 }))).toBe(0);

    const label = column('label', { field: 'label' }) as unknown as HTableColumnData;
    expect(compareTableRows([[label, HTableSortOrderEnum.ASC]], one, two)).toBeLessThan(0);
    expect(compareTableRows([[label, HTableSortOrderEnum.ASC]], row(4), row(5))).toBe(0);
    const skip = column('skip', { sortable: 'custom' }) as unknown as HTableColumnData;
    expect(compareTableRows([[skip, HTableSortOrderEnum.ASC]], one, two)).toBe(0);
    const disabled = column('disabled', { useBuiltInSort: false }) as unknown as HTableColumnData;
    expect(compareTableRows([[disabled, HTableSortOrderEnum.ASC]], one, two)).toBe(0);

    const method = vi.fn(() => () => -7);
    const custom = column('method', { sortMethod: method }) as unknown as HTableColumnData;
    expect(compareTableRows([[custom, HTableSortOrderEnum.ASC]], one, two)).toBe(-7);
    expect(method).toHaveBeenCalledWith(HTableSortOrderEnum.ASC);
    const sortBy = column('sort-by', { sortBy: () => 4 }) as unknown as HTableColumnData;
    expect(compareTableRows([[sortBy, HTableSortOrderEnum.ASC]], one, two)).toBe(4);
    expect(compareTableRows([[sortBy, HTableSortOrderEnum.DESC]], one, two)).toBe(-4);
    const noField = column('no-field', { field: undefined }) as unknown as HTableColumnData;
    expect(compareTableRows([[noField, HTableSortOrderEnum.ASC]], one, two)).toBe(0);
  });

  test('cycles, replaces, preserves, and disables sortable state', async () => {
    const first = column('first', { field: 'first' }) as unknown as HTableColumnData;
    const second = column('second', { field: 'second' }) as unknown as HTableColumnData;
    const columns = shallowRef({
      columnGroups: [] as HTableColumnData[][],
      flattenColumns: [] as HTableColumnData[],
    });
    const defaults = ref([{ prop: 'first', order: HTableSortOrderEnum.DESC }]);
    const builtIn = ref(true);
    const emit = vi.fn();
    let sortable!: ReturnType<typeof useSortable>;
    const Harness = defineComponent({
      setup() {
        sortable = useSortable(emit as never, columns, defaults, () => builtIn.value);
        return () => null;
      },
    });
    const wrapper = mount(Harness);

    columns.value = { columnGroups: [[first, second]], flattenColumns: [first, second] };
    await nextTick();
    await nextTick();
    expect(sortable.currentSorts.value.get(first)).toBe(HTableSortOrderEnum.DESC);
    expect(first.emit).toHaveBeenCalledWith('sortChange', HTableSortOrderEnum.DESC);

    sortable.setSort(first, HTableSortOrderEnum.DESC);
    await nextTick();
    expect(sortable.currentSorts.value.has(first)).toBe(false);
    sortable.setSort(first);
    sortable.setSort(first);
    expect(sortable.currentSorts.value.get(first)).toBe(HTableSortOrderEnum.DESC);
    sortable.setSort(first);
    expect(sortable.currentSorts.value.has(first)).toBe(false);

    sortable.setSort(first, HTableSortOrderEnum.ASC);
    sortable.setSort(second, HTableSortOrderEnum.DESC, true);
    expect(sortable.currentSorts.value.size).toBe(2);
    sortable.setSort(second, false);
    expect(sortable.currentSorts.value.has(second)).toBe(false);
    sortable.setSort(second, HTableSortOrderEnum.ASC);
    expect(sortable.currentSorts.value.has(first)).toBe(false);

    defaults.value = [];
    await nextTick();
    const replacement = column('second', { field: 'second' }) as unknown as HTableColumnData;
    columns.value = { columnGroups: [[replacement]], flattenColumns: [replacement] };
    await nextTick();
    expect(sortable.currentSorts.value.get(replacement)).toBe(HTableSortOrderEnum.ASC);

    builtIn.value = false;
    expect(sortable.sortRow(row(1, { second: 2 }), row(2, { second: 1 }))).toBe(0);
    builtIn.value = true;
    expect(sortable.compareRows(row(1, { second: 2 }), row(2, { second: 1 }))).toBeGreaterThan(0);
    wrapper.unmount();
  });

  test('uses its default built-in sorter and resolves defaults by columnKey', async () => {
    const keyed = column('keyed', { field: 'value', columnKey: 'alias' }) as unknown as HTableColumnData;
    const columns = shallowRef({
      columnGroups: [[keyed]],
      flattenColumns: [keyed],
    });
    const defaults = ref([
      { prop: 'alias', order: HTableSortOrderEnum.ASC },
      { prop: 'missing', order: HTableSortOrderEnum.DESC },
    ]);
    const emit = vi.fn();
    let sortable!: ReturnType<typeof useSortable>;
    const Harness = defineComponent({
      setup() {
        sortable = useSortable(emit as never, columns, defaults);
        return () => null;
      },
    });
    const wrapper = mount(Harness);
    await nextTick();

    expect(sortable.currentSorts.value.get(keyed)).toBe(HTableSortOrderEnum.ASC);
    expect(sortable.sortRow(row(1, { value: 2 }), row(2, { value: 10 }))).toBeLessThan(0);
    wrapper.unmount();
  });
});
