import type { SlotsType } from 'vue';
import type {
  HTableCellScopeSlots,
  HTableFooterCellScopeSlots,
  HTableHeaderCellScopeSlots,
} from '../utils/types';

export const useTableSlots = Object as SlotsType<{
  /**
   * 默认展示内容
   */
  default?: {};
  /**
   * 表尾统计插槽
   * 会将 `show-summary` 生成的表尾表格覆盖
   */
  summary?: {};
  /**
   * 插入到表格最后一行之后的内容
   * 此区域内容在 `table` 节点之外
   */
  append?: {};
  /**
   * 数据为空时自定义内容
   */
  empty?: {};
}>;

export const useTableColumnSlots = Object as SlotsType<{
  /**
   * 默认展示内容
   * @param params 插槽参数
   */
  default?: HTableCellScopeSlots;
  /**
   * 表头单元格插槽
   * @param params 插槽参数
   */
  header?: HTableHeaderCellScopeSlots;
  /**
   * 表尾统计单元格插槽，必须开启 `show-summary` 才有效
   * @param params 插槽参数
   */
  summaryFooter?: HTableFooterCellScopeSlots;
  /**
   * 展开行内容
   * @param params 插槽参数
   */
  expand?: HTableCellScopeSlots;
}>;

export type TableSlots = typeof useTableSlots;
export type TableColumnSlots = typeof useTableColumnSlots;
