import { mount } from '@vue/test-utils';
import {
  computed,
  defineComponent,
  isReactive,
  isRef,
  isShallow,
  markRaw,
  nextTick,
  reactive,
  shallowReactive,
  shallowRef,
  toRefs,
} from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type { TableProps } from '../src/composables/useProps';
import useDataAnalysis from '../src/hooks/useDataAnalysis';
import useGrouping from '../src/hooks/useGrouping';
import useTree from '../src/hooks/useTree';
import useVisibleRows from '../src/hooks/useVisibleRows';
import {
  HTableFieldMapFormattedInjectKey,
  HTableSetChildrenByRowKeyValueInjectKey,
} from '../src/utils/injectKeys';
import type { HTableRowDataType, HTableTransformedRowDataType } from '../src/utils/types';
import { HTableGroupContextKey, HTableTransformedRowContextKey } from '../src/utils/types';

function createTransformedRow(
  id: number,
  options: {
    parentId?: number | null;
    value?: number;
    visible?: boolean;
    children?: HTableRowDataType[];
    extra?: Record<string, unknown>;
  } = {},
) {
  return {
    id,
    value: options.value ?? id,
    children: options.children ?? [],
    ...options.extra,
    [HTableTransformedRowContextKey]: {
      uuid: id,
      index: id,
      siblingIndex: id,
      visible: shallowReactive({ value: options.visible ?? true }),
      parentUuid: options.parentId ?? null,
      level: options.parentId == null ? 0 : 1,
      isLeaf: !(options.children?.length ?? 0),
    },
  } as unknown as HTableTransformedRowDataType;
}

describe('Table data hot paths', () => {
  test('uses a shallow result, switches deep watching, and preserves row contexts', async () => {
    const source = reactive<{
      data: HTableRowDataType[];
      rowKey: string;
      watchData: boolean;
    }>({
      data: [
        {
          id: 1,
          name: 'Parent',
          children: [{ id: 2, name: 'Child', children: [] }],
        },
      ],
      rowKey: 'id',
      watchData: false,
    });
    let analysis!: ReturnType<typeof useDataAnalysis>;
    const Harness = defineComponent({
      setup() {
        analysis = useDataAnalysis(
          toRefs(source) as unknown as Parameters<typeof useDataAnalysis>[0],
          vi.fn() as never,
          {
            fieldMapFormatted: computed(() => ({ children: 'children', isLeaf: 'isLeaf' })),
          },
        );
        return () => null;
      },
    });
    const wrapper = mount(Harness);

    expect(isShallow(analysis.flattenData)).toBe(true);
    expect(analysis.flattenData.value.map(row => row.id)).toEqual([1, 2]);
    const initialContext = analysis.flattenData.value[0][HTableTransformedRowContextKey];
    const visible = initialContext.visible as unknown as Record<string, boolean>;
    expect(isRef(initialContext.visible)).toBe(false);
    expect(isReactive(initialContext.visible)).toBe(true);
    visible.name = false;

    source.data = [
      {
        id: 1,
        name: 'Updated parent',
        children: [{ id: 3, name: 'New child', children: [] }],
      },
    ];
    await nextTick();

    expect(analysis.flattenData.value.map(row => row.id)).toEqual([1, 3]);
    expect(analysis.flattenData.value[0][HTableTransformedRowContextKey]).toBe(initialContext);
    expect(
      (
        analysis.flattenData.value[0][HTableTransformedRowContextKey].visible as unknown as Record<
          string,
          boolean
        >
      ).name,
    ).toBe(false);

    source.data[0].name = 'Ignored deep mutation';
    await nextTick();
    expect(analysis.flattenData.value[0].name).toBe('Updated parent');

    source.watchData = true;
    await nextTick();
    expect(analysis.flattenData.value[0].name).toBe('Ignored deep mutation');

    source.data[0].name = 'Observed deep mutation';
    await nextTick();
    expect(analysis.flattenData.value[0].name).toBe('Observed deep mutation');

    wrapper.unmount();
  });

  test('flattens a deeply nested tree without recursive stack growth', () => {
    const depth = 12_000;
    let row: HTableRowDataType = { id: depth - 1, children: [] };
    for (let id = depth - 2; id >= 0; id--) {
      row = { id, children: [row] };
    }

    const source = reactive({
      data: markRaw([row]),
      rowKey: 'id',
      watchData: false,
    });
    let analysis!: ReturnType<typeof useDataAnalysis>;
    const Harness = defineComponent({
      setup() {
        analysis = useDataAnalysis(
          toRefs(source) as unknown as Parameters<typeof useDataAnalysis>[0],
          vi.fn() as never,
          {
            fieldMapFormatted: computed(() => ({ children: 'children', isLeaf: 'isLeaf' })),
          },
        );
        return () => null;
      },
    });
    const wrapper = mount(Harness);

    expect(analysis.flattenData.value).toHaveLength(depth);
    expect(analysis.flattenData.value.at(-1)?.[HTableTransformedRowContextKey].level).toBe(
      depth - 1,
    );

    wrapper.unmount();
  });

  test('uses tree indexes for visibility and iterative descendant collapse', async () => {
    const root = createTransformedRow(1, { children: [{}] });
    const child = createTransformedRow(2, { parentId: 1, children: [{}] });
    const grandchild = createTransformedRow(3, { parentId: 2 });
    const rows = [root, child, grandchild];
    Object.defineProperties(rows, {
      filter: {
        value: () => {
          throw new Error('tree hot paths must not scan with Array.filter');
        },
      },
      find: {
        value: () => {
          throw new Error('tree hot paths must not scan with Array.find');
        },
      },
    });
    const rowsData = shallowRef(rows);
    let tree!: ReturnType<typeof useTree>;
    const Harness = defineComponent({
      setup() {
        tree = useTree(
          {
            rowKey: 'id',
            fieldMap: { children: 'children', isLeaf: 'isLeaf' },
          } as TableProps,
          rowsData,
        );
        return () => null;
      },
    });
    const wrapper = mount(Harness, {
      global: {
        provide: {
          [HTableFieldMapFormattedInjectKey as symbol]: computed(() => ({
            children: 'children',
            isLeaf: 'isLeaf',
          })),
          [HTableSetChildrenByRowKeyValueInjectKey as symbol]: vi.fn(),
        },
      },
    });

    expect(tree.isTreeData.value).toBe(true);
    expect(tree.isTreeRowVisible(root)).toBe(true);
    expect(tree.isTreeRowVisible(child)).toBe(false);

    await tree.toggleTreeExpandRows(root);
    expect(tree.isTreeRowVisible(child)).toBe(true);
    await tree.toggleTreeExpandRows(child);
    expect(tree.isTreeRowVisible(grandchild)).toBe(true);

    await tree.toggleTreeExpandRows(root);
    expect(tree.treeExpandRows.value.has(1)).toBe(false);
    expect(tree.treeExpandRows.value.has(2)).toBe(false);
    expect(tree.isTreeRowVisible(grandchild)).toBe(false);

    wrapper.unmount();
  });

  test('reuses an already ordered flat source and filters in one pass', () => {
    const rows = [
      createTransformedRow(1, { value: 1 }),
      createTransformedRow(2, { value: 2 }),
      createTransformedRow(3, { value: 3 }),
    ];
    const flattenData = shallowRef(rows);
    const sortRow = vi.fn(
      (a: HTableTransformedRowDataType, b: HTableTransformedRowDataType) => a.value - b.value,
    );
    const { visibleRows } = useVisibleRows({
      flattenData,
      isTreeData: computed(() => false),
      isTreeRowVisible: () => true,
      sortRow,
    });

    expect(visibleRows.value).toBe(rows);
    expect(sortRow).toHaveBeenCalledTimes(rows.length - 1);

    (rows[1][HTableTransformedRowContextKey].visible as unknown as Record<string, boolean>).value =
      false;
    expect(visibleRows.value.map(row => row.id)).toEqual([1, 3]);

    flattenData.value = [rows[2], rows[0], rows[1]];
    expect(visibleRows.value.map(row => row.id)).toEqual([1, 3]);
  });

  test('computes grouped built-in aggregates and shares empty visibility state', async () => {
    const data = shallowRef([
      createTransformedRow(1, {
        extra: {
          team: 'A',
          sumValue: 2,
          averageValue: 2,
          minValue: 8,
          maxValue: 8,
          counted: null,
          customValue: 'x',
        },
      }),
      createTransformedRow(2, {
        extra: {
          team: 'A',
          sumValue: 3,
          averageValue: 4,
          minValue: 1,
          maxValue: 10,
          counted: null,
          customValue: 'y',
        },
      }),
      createTransformedRow(3, {
        extra: {
          team: 'B',
          sumValue: 5,
          averageValue: 6,
          minValue: 4,
          maxValue: 4,
          counted: null,
          customValue: 'z',
        },
      }),
    ]);
    const props = reactive({
      rowKey: 'id',
      groupBy: 'team',
      aggregations: {
        sumValue: 'sum',
        averageValue: 'average',
        minValue: 'min',
        maxValue: 'max',
        counted: 'count',
        customValue: (values: unknown[]) => values.join(''),
      },
      defaultExpandAllGroups: true,
      expandedGroupKeys: undefined as string[] | undefined,
    }) as unknown as TableProps;
    const emit = vi.fn();
    const grouping = useGrouping({
      props,
      rows: computed(() => data.value),
      emit: emit as never,
    });

    const groupRows = grouping.rows.value.filter(grouping.isGroupRow);
    expect(groupRows).toHaveLength(2);
    const firstGroup = groupRows[0][HTableGroupContextKey];
    expect(firstGroup.aggregates).toMatchObject({
      sumValue: 5,
      averageValue: 3,
      minValue: 1,
      maxValue: 10,
      counted: 2,
      customValue: 'xy',
    });
    expect(groupRows[0][HTableTransformedRowContextKey].visible).toBe(
      groupRows[1][HTableTransformedRowContextKey].visible,
    );

    props.expandedGroupKeys = [];
    await nextTick();
    expect(grouping.rows.value.filter(grouping.isGroupRow)).toHaveLength(2);
    expect(grouping.rows.value).toHaveLength(2);

    grouping.toggleGroup(firstGroup.key);
    expect(emit).toHaveBeenCalledWith('update:expandedGroupKeys', [firstGroup.key]);
  });
});
