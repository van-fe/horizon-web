export const usePopoverEmits = {
  /**
   * popper 显示
    * @en Emitted when show changes.
   */
  show: () => true,
  /**
   * popper 隐藏
    * @en Emitted when hide changes.
   */
  hide: () => true,
  /**
   * 进入触发器回调
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when enter reference changes.
   */
  enterReference: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 离开触发器回调
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when leave reference changes.
   */
  leaveReference: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 点击时触发
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type PopoverEmits = typeof usePopoverEmits;
