import type { AdaptComponentApiShape, BacktopRegionMap } from '@aurora/core';
import type { SlotsType } from 'vue';

type BacktopVueSlots = AdaptComponentApiShape<BacktopRegionMap, { content: 'default' }>;

export const useBacktopSlots = Object as SlotsType<{
  /**
   * 回到顶部的按钮内容
   * @en Custom content for the default slot.
   */
  default?: BacktopVueSlots['default'];
}>;

export type BacktopSlots = typeof useBacktopSlots;
