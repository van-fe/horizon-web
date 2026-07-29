export const useResultEmits = {
  /**
   * 主要按钮点击时触发
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when primary click changes.
   */
  primaryClick: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 次要按钮点击时触发
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when secondary click changes.
   */
  secondaryClick: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ResultEmits = typeof useResultEmits;
