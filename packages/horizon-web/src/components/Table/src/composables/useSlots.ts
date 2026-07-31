import type { SlotsType } from 'vue';
import type {
  HTableCellScopeSlots,
  HTableFooterCellScopeSlots,
  HTableHeaderCellScopeSlots,
  HTableGroupScopeSlots,
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
