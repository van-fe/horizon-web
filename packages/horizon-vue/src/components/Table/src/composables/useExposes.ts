import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type {
  HTableRowKeyType,
  HTableRowDataType,
  HTableTransformedRowDataType,
  HTableVisibleRange,
  HTableState,
  HTableDataProcessingState,
} from '../utils/types';

export const useTableExposes = {
  /**
   * 在某些情况下，如果数据没有做到动态监听，则可以调用此方法重载数据
   * @param data 如果不传值，则使用 `prop.data` 的值
   * @paramEn data The data value.
   * @en Controls reload data.
   */
  reloadData: Function as ExposeType<(data?: HTableRowDataType[]) => void>,
  /**
   * 取消当前尚未完成的数据处理任务
   * @en Cancels the current pending data processing task.
   */
  cancelDataProcessing: Function as ExposeType<() => void>,
  /**
   * 获取当前数据处理状态
   * @en Gets the current data processing state.
   */
  getDataProcessingState: Function as ExposeType<() => HTableDataProcessingState>,
  /**
   * 立即重新执行本地数据处理，并在完成后返回状态
   * @en Immediately reruns local data processing and resolves with its final state.
   */
  refreshDataProcessing: Function as ExposeType<() => Promise<HTableDataProcessingState>>,
  /**
   * 在一些未能正确响应表格布局，且需要对表格的布局刷新，可以调用此方法
   * @en Controls refresh layout.
   */
  refreshLayout: Function as ExposeType<() => void>,
  /**
   * 获取表格内部的滚动容器
   * @en Gets the internal scroll container.
   */
  getScrollWrap: Function as ExposeType<() => HTMLElement | null | undefined>,
  /**
   * 滚动到排序、过滤后的指定行索引
   * @param index 行索引
   * @paramEn index The displayed row index.
   * @en Scrolls to the displayed row index.
   */
  scrollToIndex: Function as ExposeType<(index: number) => void>,
  /**
   * 根据 `row-key` 滚动到指定行
   * @param rowKey 行唯一标识
   * @paramEn rowKey The row key.
   * @en Scrolls to a row by row key.
   */
  scrollToRow: Function as ExposeType<(rowKey: HTableRowKeyType) => void>,
  /**
   * 获取当前虚拟滚动的渲染与可见范围。普通模式返回完整范围
   * @en Gets the current rendered and visible range. Regular mode returns the complete range.
   */
  getVisibleRange: Function as ExposeType<() => HTableVisibleRange>,
  /**
   * 通过行和列标识进入编辑状态
   * @param rowKey 行唯一标识
   * @paramEn rowKey The row key.
   * @param columnKey `column-key` 或 `field`
   * @paramEn columnKey The column-key or field.
   * @en Starts editing a cell by row and column key.
   */
  startCellEdit: Function as ExposeType<
    (rowKey: HTableRowKeyType, columnKey: string) => Promise<boolean>
  >,
  /**
   * 提交当前编辑
   * @en Commits the current edit.
   */
  commitEdit: Function as ExposeType<() => Promise<boolean>>,
  /**
   * 取消当前编辑
   * @en Cancels the current edit.
   */
  cancelEdit: Function as ExposeType<() => void>,
  /**
   * 获取完整表格状态
   * @en Gets the complete table state.
   */
  getState: Function as ExposeType<() => HTableState>,
  /**
   * 合并设置表格状态
   * @param state 部分表格状态
   * @paramEn state Partial table state.
   * @en Merges partial table state.
   */
  setState: Function as ExposeType<(state: Partial<HTableState>) => void>,
  /**
   * 恢复初始表格状态
   * @en Restores the initial table state.
   */
  resetState: Function as ExposeType<() => void>,
  /**
   * 导出可序列化表格状态
   * @en Exports serializable table state.
   */
  exportState: Function as ExposeType<() => HTableState>,
  /**
   * 恢复已导出的表格状态
   * @param state 已导出的状态
   * @paramEn state The exported state.
   * @en Restores an exported table state.
   */
  restoreState: Function as ExposeType<(state: Partial<HTableState>) => boolean>,
  /**
   * 仅恢复初始列配置
   * @en Restores only the initial column configuration.
   */
  resetColumnState: Function as ExposeType<() => void>,
};

export const useTableColumnExposes = {
  /**
   * 清空已选项
   * @param ignoreSelectable 是否忽略 `selectable`，默认为 `false`
   * @paramEn ignoreSelectable The ignore selectable value.
   * @en Controls clear selection.
   */
  clearSelection: Function as ExposeType<(ignoreSelectable: boolean) => void>,
  /**
   * 获取已选择的行
   * @en Controls get selection rows.
   */
  getSelectionRows: Function as ExposeType<() => HTableTransformedRowDataType[]>,
  /**
   * 当且仅当 `type = selection` 并设置了 `row-key` 时有效
   * @param rowKey 需要切换选中的行的 `row-key`
   * @paramEn rowKey The row key value.
   * @param selected 不传时自动切换选择状态；传入即按照值切换状态
   * @paramEn selected The selected value.
   * @param ignoreSelectable 是否忽略 `selectable`
   * @paramEn ignoreSelectable The ignore selectable value.
   * @en Controls toggle row selection.
   */
  toggleRowSelection: Function as ExposeType<
    (
      rowKey: HTableRowKeyType | HTableRowKeyType[],
      selected?: boolean,
      ignoreSelectable?: boolean,
    ) => void
  >,
};

export type TableExposes = ExtractExposeTypes<typeof useTableExposes>;
export type TableColumnExposes = ExtractExposeTypes<typeof useTableColumnExposes>;
