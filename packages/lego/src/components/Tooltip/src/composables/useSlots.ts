import type { SlotsType } from 'vue';
export const useTooltipSlots = Object as SlotsType<{
  /**
   * 被 `tooltip` 包裹的 `dom`
   */
  default?: {};
  /**
   * 弹出框内容
   */
  content?: {};
}>;

export type TooltipSlots = typeof useTooltipSlots;
