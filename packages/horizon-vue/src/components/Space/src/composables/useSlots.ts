import type { SlotsType } from 'vue';
import type { ComponentRegionContext, SpaceRegionMap } from '@aurora/core';

export const useSpaceSlots = Object as SlotsType<{
  /**
   * 默认插槽
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<SpaceRegionMap, 'content'>;
  /**
   * 自定义分隔符
   * @en Custom content for the separator slot.
   */
  separator?: ComponentRegionContext<SpaceRegionMap, 'separator'>;
}>;

export type SpaceSlots = typeof useSpaceSlots;

export const useSpaceItemSlots = Object as SlotsType<{
  /**
   * 默认插槽
   * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type SpaceItemSlots = typeof useSpaceItemSlots;
