import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';
import type { NTableRowKeyType, NTableTransformedRowDataType } from '../utils/types';

export const useTableExposes = {
  /**
   * 在某些情况下，如果数据没有做到动态监听，则可以调用此方法重载数据
   * @param data 如果不传值，则使用 `prop.data` 的值
   */
  reloadData: Function as ExposeType<(data?: NTableTransformedRowDataType[]) => void>,
  /**
   * 在一些未能正确响应表格布局，且需要对表格的布局刷新，可以调用此方法
   */
  refreshLayout: Function as ExposeType<() => void>,
};

export const useTableColumnExposes = {
  /**
   * 清空已选项
   * @param ignoreSelectable 是否忽略 `selectable`，默认为 `false`
   */
  clearSelection: Function as ExposeType<(ignoreSelectable: boolean) => void>,
  /**
   * 获取已选择的行
   */
  getSelectionRows: Function as ExposeType<() => NTableTransformedRowDataType[]>,
  /**
   * 当且仅当 `type = selection` 并设置了 `row-key` 时有效
   * @param rowKey 需要切换选中的行的 `row-key`
   * @param selected 不传时自动切换选择状态；传入即按照值切换状态
   * @param ignoreSelectable 是否忽略 `selectable`
   */
  toggleRowSelection: Function as ExposeType<
    (
      rowKey: NTableRowKeyType | NTableRowKeyType[],
      selected?: boolean,
      ignoreSelectable?: boolean,
    ) => void
  >,
};

export type TableExposes = ExtractExposeTypes<typeof useTableExposes>;
export type TableColumnExposes = ExtractExposeTypes<typeof useTableColumnExposes>;
