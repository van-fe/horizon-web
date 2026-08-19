import type { SlotsType } from 'vue';
export const useTooltipSlots = Object as SlotsType<{
  /**
   * 被 `tooltip` 包裹的 `dom`
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 弹出框内容
    * @en Custom content for the content slot.
   */
  content?: {};
}>;

export type TooltipSlots = typeof useTooltipSlots;
