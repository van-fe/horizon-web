import type { SlotsType } from 'vue';
export const usePopoverSlots = Object as SlotsType<{
  /**
   * 触发的元素
   */
  reference?: {};
  /**
   * 弹出元素内容的插槽
   */
  popper?: {};
}>;

export type PopoverSlots = typeof usePopoverSlots;

export const usePopContentSlots = Object as SlotsType<{
  /**
   * 默认渲染内容
   */
  default?: {};
}>;

export type PopContentSlots = typeof usePopContentSlots;
