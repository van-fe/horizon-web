export const useAlertEmits = {
  /**
   * 关闭alert时触发的事件
   * @param evt 鼠标或键盘关闭事件
   * @paramEn evt The mouse or keyboard event that closed the alert.
   * @en Emitted when close changes.
   */
  close: (evt: MouseEvent | KeyboardEvent) =>
    evt instanceof MouseEvent || evt instanceof KeyboardEvent,
};

export type AlertEmits = typeof useAlertEmits;
