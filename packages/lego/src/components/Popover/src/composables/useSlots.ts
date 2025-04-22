export const usePopoverSlots = {
  /**
   * 触发的元素
   */
  reference: () => true,
  /**
   * 弹出元素内容的插槽
   */
  popper: () => true,
};

export type PopoverSlots = typeof usePopoverSlots;

export const usePopContentSlots = {
  /**
   * 默认渲染内容
   */
  default: () => true,
};

export type PopContentSlots = typeof usePopContentSlots;
