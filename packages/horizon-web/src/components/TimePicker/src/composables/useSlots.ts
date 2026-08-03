import type { SlotsType } from 'vue';
export const useTimePickerSlots = Object as SlotsType<{
  /**
   * 时间范围分隔符
    * @en Custom content for the range separator slot.
   */
  rangeSeparator?: {};
  /**
   * 时间范围面板分隔符
    * @en Custom content for the range panel separator slot.
   */
  rangePanelSeparator?: {};
  /**
   * 此刻插槽，可以自定义其他的功能
    * @en Custom content for the show now slot.
   */
  showNow?: {};
  /**
   * 自定义 `option` 面板中的顶部内容
    * @en Custom content for the panel header render slot.
   */
  panelHeaderRender?: {};
  /**
   * 自定义 `option` 面板中的底部内容
    * @en Custom content for the panel footer render slot.
   */
  panelFooterRender?: {};
  /**
   * 自定义 `dropConfirm` 渲染内容，只有在传入 `needDropdownConfirm` 为 `true` 时生效
    * @en Custom content for the drop confirm render slot.
   */
  dropConfirmRender?: {};
  /**
   * 自定义选择器渲染
    * @en Custom content for the picker slot.
   */
  picker?: {};
  /**
   * 自定义选择器内部渲染
    * @en Custom content for the picker inner slot.
   */
  pickerInner?: {};
  /**
   * 自定义选择器容器渲染
    * @en Custom content for the picker container slot.
   */
  pickerContainer?: {};
  /**
   * 选择器整体自定义渲染
    * @en Custom content for the picker outer slot.
   */
  pickerOuter?: {};
  /**
   * 前缀插槽
    * @en Custom content for the prefix slot.
   */
  prefix?: {};
  /**
   * 后缀插槽
    * @en Custom content for the suffix slot.
   */
  suffix?: {};
}>;

export type TimePickerSlots = typeof useTimePickerSlots;
