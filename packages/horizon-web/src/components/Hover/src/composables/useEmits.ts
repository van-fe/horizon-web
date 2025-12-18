export const useHoverEmits = {
  /**
   * 鼠标进入
   * @param e 鼠标事件
   * @version 2.0.16
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标离开
   * @param e 鼠标事件
   * @version 2.0.16
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移动
   * @param e 鼠标事件
   * @version 2.12.14
   */
  mouseMove: (e: MouseEvent) => e instanceof MouseEvent,
};

export type HoverEmits = typeof useHoverEmits;
