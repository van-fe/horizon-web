export const useTooltipEmits = {
  /**
   * 显示时触发
    * @en Emitted when show changes.
   */
  show: () => true,
  /**
   * 隐藏时触发
    * @en Emitted when hide changes.
   */
  hide: () => true,
};

export type TooltipEmits = typeof useTooltipEmits;
