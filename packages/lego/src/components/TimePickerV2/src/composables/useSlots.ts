export const useTimePickerV2Slots = {
  /**
   * 时间范围分隔符
   */
  rangeSeparator: () => true,
  /**
   * 时间范围面板分隔符
   */
  rangePanelSeparator: () => true,
  /**
   * 此刻插槽，可以自定义其他的功能
   */
  showNow: () => true,
  /**
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender: () => true,
  /**
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender: () => true,
  /**
   * 自定义 `dropConfirm` 渲染内容，只有在传入 `needDropdownConfirm` 为 `true` 时生效
   */
  dropConfirmRender: () => true,
  /**
   * 自定义选择器渲染
   */
  picker: () => true,
  /**
   * 自定义选择器内部渲染
   */
  pickerInner: () => true,
  /**
   * 自定义选择器容器渲染
   */
  pickerContainer: () => true,
  /**
   * 选择器整体自定义渲染
   */
  pickerOuter: () => true,
  /**
   * 前缀插槽
   */
  prefix: () => true,
  /**
   * 后缀插槽
   */
  suffix: () => true,
};

export type TimePickerV2Slots = typeof useTimePickerV2Slots;
