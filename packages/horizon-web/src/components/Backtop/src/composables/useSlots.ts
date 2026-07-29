import type { SlotsType } from 'vue';
export const useBacktopSlots = Object as SlotsType<{
  /**
   * 回到顶部的按钮内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type BacktopSlots = typeof useBacktopSlots;
