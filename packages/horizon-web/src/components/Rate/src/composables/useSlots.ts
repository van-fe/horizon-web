import type { SlotsType } from 'vue';
export const useRateSlots = Object as SlotsType<{
  /**
   * 自定义评分图标
   */
  default?: {};
}>;

export type RateSlots = typeof useRateSlots;
