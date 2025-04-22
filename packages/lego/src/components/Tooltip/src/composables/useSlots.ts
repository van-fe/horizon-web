export const useTooltipSlots = {
  /**
   * 被 `tooltip` 包裹的 `dom`
   */
  default: () => true,
  /**
   * 弹出框内容
   */
  content: () => true,
};

export type TooltipSlots = typeof useTooltipSlots;
