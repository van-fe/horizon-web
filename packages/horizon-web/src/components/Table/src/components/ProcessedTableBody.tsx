import { defineComponent, inject, provide, ref, toRef, type PropType } from 'vue';
import TableBody, { type TableBodyExposes } from './TableBody';
import { HTableFlattenDataInjectKey, HTableFullDataForStateInjectKey } from '../utils/injectKeys';
import type {
  HTableColumnData,
  HTableRowKeyType,
  HTableTransformedRowDataType,
} from '../utils/types';

/**
 * 为表体提供经过本地数据引擎处理的行，同时让列、汇总和状态逻辑继续使用完整数据集。
 * @en Provides processed rows to the body while columns, summaries, and state keep the full dataset.
 */
export default defineComponent({
  name: 'ProcessedTableBody',
  props: {
    columns: {
      type: Array as PropType<HTableColumnData[]>,
      required: true,
    },
    rows: {
      type: Array as PropType<HTableTransformedRowDataType[]>,
      required: true,
    },
  },
  setup(props, { expose }) {
    const tableBodyRef = ref<TableBodyExposes>();
    const fullRows = inject(HTableFlattenDataInjectKey)!;

    provide(HTableFullDataForStateInjectKey, fullRows);
    provide(HTableFlattenDataInjectKey, toRef(props, 'rows'));

    expose({
      scrollToIndex: (index: number) => tableBodyRef.value?.scrollToIndex(index),
      scrollToRow: (rowKey: HTableRowKeyType) => tableBodyRef.value?.scrollToRow(rowKey),
      getVisibleRange: () =>
        tableBodyRef.value?.getVisibleRange() ?? {
          startIndex: 0,
          endIndex: props.rows.length,
          visibleStartIndex: 0,
          visibleEndIndex: props.rows.length,
        },
      startCellEdit: (rowKey: HTableRowKeyType, columnKey: string) =>
        tableBodyRef.value?.startCellEdit(rowKey, columnKey) ?? Promise.resolve(false),
      commitEdit: () => tableBodyRef.value?.commitEdit() ?? Promise.resolve(true),
      cancelEdit: () => tableBodyRef.value?.cancelEdit(),
    } satisfies TableBodyExposes);

    return () => <TableBody ref={tableBodyRef} columns={props.columns} />;
  },
});
