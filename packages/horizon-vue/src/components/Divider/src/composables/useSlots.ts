import type { SlotsType } from 'vue';
import type { ComponentRegionContext, DividerRegionMap } from '@aurora/core';

export const useDividerSlots = Object as SlotsType<{
  /**
   * 分割线内的文字
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<DividerRegionMap, 'title'>;
}>;

export type DividerSlots = typeof useDividerSlots;
