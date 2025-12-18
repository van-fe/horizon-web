import type { SlotsType } from 'vue';
export const useContainerSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type ContainerSlots = typeof useContainerSlots;

export const useAsideSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type AsideSlots = typeof useAsideSlots;

export const useFooterSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type FooterSlots = typeof useFooterSlots;

export const useHeaderSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type HeaderSlots = typeof useHeaderSlots;

export const useMainSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type MainSlots = typeof useMainSlots;
