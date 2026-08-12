import type { SlotsType } from 'vue';
import type { ComponentRegionContext, GridItemRegionMap, GridRegionMap } from '@aurora/core';
export const useGridSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<GridRegionMap, 'content'>;
}>;

export type GridSlots = typeof useGridSlots;

export const useGridItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<GridItemRegionMap, 'content'>;
}>;

export type GridItemSlots = typeof useGridItemSlots;
