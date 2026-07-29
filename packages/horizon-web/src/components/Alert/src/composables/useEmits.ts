export const useAlertEmits = {
  /**
   * 关闭alert时触发的事件
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when close changes.
   */
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type AlertEmits = typeof useAlertEmits;
