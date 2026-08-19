import type { SlotsType } from 'vue';
import type { BadgeRegionMap, ComponentRegionContext } from '@aurora/core';

export const useBadgeSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<BadgeRegionMap, 'content'>;
}>;

export type BadgeSlots = typeof useBadgeSlots;
