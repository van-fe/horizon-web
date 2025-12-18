import type { SlotsType } from 'vue';
export const useTimePickerSlots = Object as SlotsType<{
  /**
   * 时间范围分隔符
   */
  rangeSeparator?: {};
  /**
   * 时间范围面板分隔符
   */
  rangePanelSeparator?: {};
  /**
   * 此刻插槽，可以自定义其他的功能
   */
  showNow?: {};
  /**
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender?: {};
  /**
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender?: {};
  /**
   * 自定义 `dropConfirm` 渲染内容，只有在传入 `needDropdownConfirm` 为 `true` 时生效
   */
  dropConfirmRender?: {};
  /**
   * 自定义选择器渲染
   */
  picker?: {};
  /**
   * 自定义选择器内部渲染
   */
  pickerInner?: {};
  /**
   * 自定义选择器容器渲染
   */
  pickerContainer?: {};
  /**
   * 选择器整体自定义渲染
   */
  pickerOuter?: {};
  /**
   * 前缀插槽
   */
  prefix?: {};
  /**
   * 后缀插槽
   */
  suffix?: {};
}>;

export type TimePickerSlots = typeof useTimePickerSlots;
