export const useButtonEmits = {
  /**
   * 鼠标点击后触发
   * @param e 点击事件
   * @paramEn e The e value.
    * @en Emitted when click changes.
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 聚焦后触发
   * @param e 聚集事件
   * @paramEn e The e value.
    * @en Emitted when focus changes.
   */
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  /**
   * 失焦后触发
   * @param e 失焦事件
   * @paramEn e The e value.
    * @en Emitted when blur changes.
   */
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  /**
   * 防抖函数执行完毕的通知
    * @en Emitted when debounce finished changes.
   */
  debounceFinished: () => true,
};

export type ButtonEmits = typeof useButtonEmits;
