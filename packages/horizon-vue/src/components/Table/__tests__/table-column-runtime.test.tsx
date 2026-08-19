import { mount } from '@vue/test-utils';
import { defineComponent, Fragment, nextTick, provide, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import TableColumn from '../src/TableColumn';
import type { TableProps } from '../src/composables/useProps';
import useColumn from '../src/hooks/useColumn';
import { getColumnRuntime } from '../src/hooks/useColumnRuntime';
import {
  HTableColumnAnalysisInjectKey,
  HTableEmitsInjectKey,
  HTableFlattenDataInjectKey,
  HTablePropsInjectKey,
  HTableUseBuiltInDataOperationsInjectKey,
} from '../src/utils/injectKeys';
import type { HTableTransformedRowDataType } from '../src/utils/types';
import {
  HTableColumnContextKey,
  HTableColumnSelectionKey,
  HTableTransformedRowContextKey,
} from '../src/utils/types';

function createRow(id: number, name: string) {
  return {
    id,
    name,
    [HTableTransformedRowContextKey]: {
      uuid: id,
      index: id - 1,
      siblingIndex: id - 1,
      visible: ref({}),
      parentUuid: null,
      level: 0,
      isLeaf: true,
    },
  } as HTableTransformedRowDataType;
}

async function settleRuntime() {
  await nextTick();
  await nextTick();
  await nextTick();
}

describe('Table column runtime', () => {
  test('does not multiply filter watchers when column analysis recomputes and cleans on unmount', async () => {
    const rows = ref([createRow(1, 'Alpha'), createRow(2, 'Beta')]);
    const useBuiltInDataOperations = ref(true);
    const selectedKeys = ref<number[]>([]);
    const filterMethod = vi.fn(() => true);
    const emit = vi.fn() as any;
    const tableProps = reactive({ queryMode: 'local' }) as TableProps;
    let columnState!: ReturnType<typeof useColumn>;

    const Harness = defineComponent({
      setup() {
        provide(HTablePropsInjectKey, tableProps);
        provide(HTableEmitsInjectKey, emit);
        provide(HTableFlattenDataInjectKey, rows);
        provide(HTableUseBuiltInDataOperationsInjectKey, () => useBuiltInDataOperations.value);

        columnState = useColumn(rows, emit, () => useBuiltInDataOperations.value);
        provide(HTableColumnAnalysisInjectKey, columnState.analysisColumns);

        return () => (
          <div data-column-count={columnState.analysisColumns.value.flattenColumns.length}>
            <TableColumn
              title="Name"
              field="name"
              filterable
              filterType="input"
              filterMethod={filterMethod}
            />
            <TableColumn
              title="Identifier"
              field="id"
              type="selection"
              columnKey="id"
              multiple
              selectedKeys={selectedKeys.value}
            />
          </div>
        );
      },
    });
    const wrapper = mount(Harness);

    await settleRuntime();
    expect(columnState.columns.value).toHaveLength(2);
    expect(columnState.analysisColumns.value.flattenColumns).toHaveLength(2);

    const nameColumnUuid = columnState.columns.value[0].uuid;
    const initialColumn = columnState.analysisColumns.value.flattenColumns.find(
      column => column.uuid === nameColumnUuid,
    )!;
    const initialContext = initialColumn[HTableColumnContextKey];
    const runtime = getColumnRuntime(columnState.columns.value[0]);
    const selectionColumnUuid = columnState.columns.value[1].uuid;
    const selectionColumn = columnState.analysisColumns.value.flattenColumns.find(
      column => column.uuid === selectionColumnUuid,
    )!;

    expect(runtime.column).toBe(initialColumn);
    selectedKeys.value = [1];
    await nextTick();
    expect(selectionColumn[HTableColumnSelectionKey].checkedRows).toEqual(new Set([1]));
    expect(
      columnState.analysisColumns.value.flattenColumns.find(
        column => column.uuid === selectionColumnUuid,
      ),
    ).toBe(selectionColumn);

    runtime.filter.currentFilterValue.value = 'a';
    await nextTick();

    filterMethod.mockClear();
    useBuiltInDataOperations.value = false;
    await nextTick();
    useBuiltInDataOperations.value = true;
    await nextTick();
    const callsBeforeRecomputation = filterMethod.mock.calls.length;
    expect(callsBeforeRecomputation).toBeGreaterThanOrEqual(rows.value.length);

    for (let index = 0; index < 5; index++) {
      const order = index % 2 === 0 ? 2 : -1;
      columnState.sortStore.value = new Map([[nameColumnUuid, order]]);
      await nextTick();

      expect(columnState.analysisColumns.value.flattenColumns[0].uuid).toBe(
        order < 1 ? nameColumnUuid : selectionColumnUuid,
      );
      const currentColumn = columnState.analysisColumns.value.flattenColumns.find(
        column => column.uuid === nameColumnUuid,
      )!;
      expect(currentColumn).toBe(initialColumn);
      expect(currentColumn[HTableColumnContextKey]).toBe(initialContext);
    }

    filterMethod.mockClear();
    useBuiltInDataOperations.value = false;
    await nextTick();
    useBuiltInDataOperations.value = true;
    await nextTick();

    expect(filterMethod).toHaveBeenCalledTimes(callsBeforeRecomputation);

    const columnsIdentity = columnState.columns.value;
    filterMethod.mockClear();
    wrapper.unmount();
    expect(columnState.columns.value).toBe(columnsIdentity);
    expect(columnState.columns.value).toHaveLength(0);

    useBuiltInDataOperations.value = false;
    await nextTick();
    useBuiltInDataOperations.value = true;
    await nextTick();
    expect(filterMethod).not.toHaveBeenCalled();
  });

  test('keeps a nested children array stable when a child column unmounts', async () => {
    const rows = ref([createRow(1, 'Alpha')]);
    const showChild = ref(true);
    const emit = vi.fn() as any;
    const tableProps = reactive({ queryMode: 'local' }) as TableProps;
    let columnState!: ReturnType<typeof useColumn>;

    const Harness = defineComponent({
      setup() {
        provide(HTablePropsInjectKey, tableProps);
        provide(HTableEmitsInjectKey, emit);
        provide(HTableFlattenDataInjectKey, rows);
        provide(HTableUseBuiltInDataOperationsInjectKey, () => true);

        columnState = useColumn(rows, emit);
        provide(HTableColumnAnalysisInjectKey, columnState.analysisColumns);

        return () => (
          <TableColumn title="Group">
            {{
              default: () => (
                <Fragment>{showChild.value && <TableColumn title="Name" field="name" />}</Fragment>
              ),
            }}
          </TableColumn>
        );
      },
    });
    const wrapper = mount(Harness);

    await settleRuntime();
    const group = columnState.columns.value[0];
    const childrenIdentity = group.children;
    expect(childrenIdentity).toHaveLength(1);

    showChild.value = false;
    await settleRuntime();

    expect(group.children).toBe(childrenIdentity);
    expect(group.children).toHaveLength(0);
    wrapper.unmount();
  });
});
