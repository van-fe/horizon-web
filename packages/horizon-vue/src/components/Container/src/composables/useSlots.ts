import type { SlotsType } from 'vue';
import type { ComponentRegionContext, ContainerRegionMap, LayoutRegionMap } from '@aurora/core';
export const useContainerSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<ContainerRegionMap, 'content'>;
}>;

export type ContainerSlots = typeof useContainerSlots;

export const useAsideSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<LayoutRegionMap, 'content'>;
}>;

export type AsideSlots = typeof useAsideSlots;

export const useFooterSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<LayoutRegionMap, 'content'>;
}>;

export type FooterSlots = typeof useFooterSlots;

export const useHeaderSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<LayoutRegionMap, 'content'>;
}>;

export type HeaderSlots = typeof useHeaderSlots;

export const useMainSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<LayoutRegionMap, 'content'>;
}>;

export type MainSlots = typeof useMainSlots;
