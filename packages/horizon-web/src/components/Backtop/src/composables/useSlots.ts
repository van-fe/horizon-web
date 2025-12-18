import type { SlotsType } from 'vue';
export const useBacktopSlots = Object as SlotsType<{
  /**
   * 回到顶部的按钮内容
   */
  default?: {};
}>;

export type BacktopSlots = typeof useBacktopSlots;
