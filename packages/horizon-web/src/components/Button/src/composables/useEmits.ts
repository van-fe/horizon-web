export const useButtonEmits = {
  /**
   * 鼠标点击后触发
   * @param e 点击事件
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 聚焦后触发
   * @param e 聚集事件
   */
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  /**
   * 失焦后触发
   * @param e 失焦事件
   */
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  /**
   * 防抖函数执行完毕的通知
   * @version 2.2.7
   */
  debounceFinished: () => true,
};

export type ButtonEmits = typeof useButtonEmits;
