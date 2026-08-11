import type { SlotsType } from 'vue';
export const usePopoverSlots = Object as SlotsType<{
  /**
   * 触发的元素
    * @en Custom content for the reference slot.
   */
  reference?: {};
  /**
   * 弹出元素内容的插槽
    * @en Custom content for the popper slot.
   */
  popper?: {};
}>;

export type PopoverSlots = typeof usePopoverSlots;

export const usePopContentSlots = Object as SlotsType<{
  /**
   * 默认渲染内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type PopContentSlots = typeof usePopContentSlots;
