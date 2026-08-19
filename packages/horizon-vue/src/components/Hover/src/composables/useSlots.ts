import type { SlotsType, VNode } from 'vue';
import type { Arrayable } from '@aurora/utils';
import type { ComponentRegionContext, HoverRegionMap } from '@aurora/core';

export const useHoverSlots = Object as SlotsType<{
  /**
   * 默认渲染插槽
   * @param hover 是否可见
   * @en Custom content for the default slot.
   */
  default?: (val: ComponentRegionContext<HoverRegionMap, 'content'>) => Arrayable<VNode>;
}>;

export type HoverSlots = typeof useHoverSlots;
