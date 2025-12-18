export const usePopoverEmits = {
  /**
   * popper 显示
   */
  show: () => true,
  /**
   * popper 隐藏
   */
  hide: () => true,
  /**
   * 进入触发器回调
   * @param evt 鼠标事件
   * @version 2.0.3
   */
  enterReference: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 离开触发器回调
   * @param evt 鼠标事件
   * @version 2.0.3
   */
  leaveReference: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 点击时触发
   * @param evt 鼠标事件
   * @version 2.0.18
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type PopoverEmits = typeof usePopoverEmits;
