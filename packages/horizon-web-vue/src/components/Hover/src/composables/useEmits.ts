export const useHoverEmits = {
  /**
   * 鼠标进入
   * @param e 鼠标事件
   * @paramEn e The e value.
    * @en Emitted when mouse enter changes.
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标离开
   * @param e 鼠标事件
   * @paramEn e The e value.
    * @en Emitted when mouse leave changes.
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移动
   * @param e 鼠标事件
   * @paramEn e The e value.
    * @en Emitted when mouse move changes.
   */
  mouseMove: (e: MouseEvent) => e instanceof MouseEvent,
};

export type HoverEmits = typeof useHoverEmits;
