export const useLinkEmits = {
  /**
   * 点击链接后的事件
   * @param event 鼠标事件
   * @paramEn event The event value.
    * @en Emitted when click changes.
   */
  click: (event: MouseEvent) => event instanceof MouseEvent,
};

export type LinkEmits = typeof useLinkEmits;
