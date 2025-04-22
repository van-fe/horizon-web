export const useFloatButtonEmits = {
  /**
   * 点击事件
   * @param evt 鼠标事件
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 拖拽开始
   */
  dragStart: () => true,
  /**
   * 拖拽中
   */
  dragging: () => true,
  /**
   * 拖拽结束
   */
  dragEnd: () => true,
};

export const useFloatButtonGroupEmits = {
  /**
   * 展开
   */
  expand: () => true,
  /**
   * 收起
   */
  fold: () => true,
  /**
   * 在点击折叠按钮时触发
   */
  click: () => true,
};

export type FloatButtonEmits = typeof useFloatButtonEmits;
export type FloatButtonGroupEmits = typeof useFloatButtonGroupEmits;
