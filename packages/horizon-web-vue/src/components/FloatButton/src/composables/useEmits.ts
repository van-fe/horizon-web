export const useFloatButtonEmits = {
  /**
   * 点击事件
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  /**
   * 拖拽开始
    * @en Emitted when drag start changes.
   */
  dragStart: () => true,
  /**
   * 拖拽中
    * @en Emitted when dragging changes.
   */
  dragging: () => true,
  /**
   * 拖拽结束
    * @en Emitted when drag end changes.
   */
  dragEnd: () => true,
};

export const useFloatButtonGroupEmits = {
  /**
   * 展开
    * @en Emitted when expand changes.
   */
  expand: () => true,
  /**
   * 收起
    * @en Emitted when fold changes.
   */
  fold: () => true,
  /**
   * 在点击折叠按钮时触发
    * @en Emitted when click changes.
   */
  click: () => true,
};

export type FloatButtonEmits = typeof useFloatButtonEmits;
export type FloatButtonGroupEmits = typeof useFloatButtonGroupEmits;
