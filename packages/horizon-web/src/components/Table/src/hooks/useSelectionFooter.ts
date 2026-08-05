import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';
import type {
  HTableColumnData,
  HTableRowKeyType,
  HTableSelectionFooterScope,
  HTableTransformedRowDataType,
} from '../utils/types';
import { HTableColumnSelectionKey } from '../utils/types';

/**
 * 汇总跨页选择列的全部选择与当前数据集合选择状态。
 * @en Aggregates all selections and current-collection selections for the cross-page selection column.
 */
export default function useSelectionFooter(
  columns: ComputedRef<HTableColumnData[]>,
  rows: Ref<HTableTransformedRowDataType[]>,
) {
  const column = computed(() =>
    columns.value.find(
      current =>
        current.props.type === 'selection' &&
        current.props.reserveSelection &&
        current.props.columnKey !== undefined &&
        current.props.columnKey !== '',
    ),
  );

  const scope = computed<HTableSelectionFooterScope | undefined>(() => {
    const currentColumn = column.value;
    const columnKey = currentColumn?.props.columnKey;

    if (!currentColumn || columnKey === undefined || columnKey === '') return undefined;

    const selectedKeys = Array.from(
      currentColumn[HTableColumnSelectionKey].checkedRows,
    ) as HTableRowKeyType[];
    const selectedSet = new Set(selectedKeys);
    const currentSelectedKeys = rows.value
      .map(row => row[columnKey] as HTableRowKeyType)
      .filter(key => selectedSet.has(key));

    return {
      column: currentColumn,
      selectedKeys,
      currentSelectedKeys,
      selectedCount: selectedKeys.length,
      currentSelectedCount: currentSelectedKeys.length,
      clearSelection: () => currentColumn[HTableColumnSelectionKey].handleClear(true),
    };
  });

  return {
    column,
    scope,
    visible: computed(() => scope.value !== undefined),
  };
}
