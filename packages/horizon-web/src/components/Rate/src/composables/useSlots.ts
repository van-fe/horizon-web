import type { SlotsType } from 'vue';
export const useRateSlots = Object as SlotsType<{
  /**
   * 自定义评分图标
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type RateSlots = typeof useRateSlots;
