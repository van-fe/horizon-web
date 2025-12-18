export const useTooltipEmits = {
  /**
   * 显示时触发
   */
  show: () => true,
  /**
   * 隐藏时触发
   */
  hide: () => true,
};

export type TooltipEmits = typeof useTooltipEmits;
