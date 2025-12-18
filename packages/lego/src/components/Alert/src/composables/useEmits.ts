export const useAlertEmits = {
  /**
   * 关闭alert时触发的事件
   * @param evt 鼠标事件
   */
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type AlertEmits = typeof useAlertEmits;
