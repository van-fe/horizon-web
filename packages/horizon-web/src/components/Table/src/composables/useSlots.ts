import type { SlotsType } from 'vue';
import type {
  HTableCellScopeSlots,
  HTableFooterCellScopeSlots,
  HTableHeaderCellScopeSlots,
  HTableGroupScopeSlots,
  HTableSelectionFooterScope,
} from '../utils/types';

export const useTableSlots = Object as SlotsType<{
  /**
   * 默认展示内容
   * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 表尾统计插槽
   * 会将 `show-summary` 生成的表尾表格覆盖
   * @en Custom content for the summary slot.
   */
  summary?: {};
  /**
   * 插入到表格最后一行之后的内容
   * 此区域内容在 `table` 节点之外
   * @en Custom content for the append slot.
   */
  append?: {};
  /**
   * 数据为空时自定义内容
   * @en Custom content for the empty slot.
   */
  empty?: {};
  /**
   * 跨页选择栏开头区域，默认显示清空按钮
   * @param params 跨页选择状态与清空方法
   * @paramEn params Cross-page selection state and clear method.
   * @en Custom content before the cross-page selection footer.
   */
  'selection-footer-prepend'?: HTableSelectionFooterScope;
  /**
   * 跨页选择栏提示文字
   * @param params 所有已选项与当前数据集合已选项
   * @paramEn params All selected items and selected items in the current data collection.
   * @en Custom status content in the cross-page selection footer.
   */
  'selection-footer-text'?: HTableSelectionFooterScope;
  /**
   * 跨页选择栏结尾区域，可用于放置分页等控件
   * @param params 跨页选择状态与清空方法
   * @paramEn params Cross-page selection state and clear method.
   * @en Custom content after the cross-page selection footer, such as pagination controls.
   */
  'selection-footer-append'?: HTableSelectionFooterScope;
  /**
   * 自定义分组行内容
   * @param params 分组信息、聚合值与切换方法
   * @paramEn params Group information, aggregate values, and toggle method.
   * @en Custom group row content.
   */
  group?: HTableGroupScopeSlots;
}>;

export const useTableColumnSlots = Object as SlotsType<{
  /**
   * 默认展示内容
   * @param params 插槽参数
   * @paramEn params The params value.
   * @en Custom content for the default slot.
   */
  default?: HTableCellScopeSlots;
  /**
   * 表头单元格插槽
   * @param params 插槽参数
   * @paramEn params The params value.
   * @en Custom content for the header slot.
   */
  header?: HTableHeaderCellScopeSlots;
  /**
   * 表尾统计单元格插槽，必须开启 `show-summary` 才有效
   * @param params 插槽参数
   * @paramEn params The params value.
   * @en Custom content for the summary footer slot.
   */
  summaryFooter?: HTableFooterCellScopeSlots;
  /**
   * 展开行内容
   * @param params 插槽参数
   * @paramEn params The params value.
   * @en Custom content for the expand slot.
   */
  expand?: HTableCellScopeSlots;
  /**
   * 自定义单元格编辑器
   * @param params 当前值、提交、取消、等待和错误状态
   * @paramEn params Current value, commit, cancel, pending, and error state.
   * @en Custom cell editor.
   */
  editor?: HTableCellScopeSlots & {
    value: unknown;
    oldValue: unknown;
    pending: boolean;
    error?: unknown;
    update: (value: unknown) => void;
    commit: () => Promise<boolean>;
    cancel: () => void;
  };
}>;

export type TableSlots = typeof useTableSlots;
export type TableColumnSlots = typeof useTableColumnSlots;
