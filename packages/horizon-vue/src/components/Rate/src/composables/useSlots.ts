import type { SlotsType } from 'vue';
import type { RateIconRegionContext } from '@aurora/core';
export const useRateSlots = Object as SlotsType<{
  /**
   * 自定义评分图标
   * @en Custom content for the default slot.
   */
  default?: RateIconRegionContext;
}>;

export type RateSlots = typeof useRateSlots;
