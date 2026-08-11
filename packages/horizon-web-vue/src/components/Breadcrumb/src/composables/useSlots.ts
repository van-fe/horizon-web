import type { SlotsType } from 'vue';
import type {
  AdaptComponentApiShape,
  BreadcrumbItemRegionMap,
  BreadcrumbRegionMap,
} from '@aurora/core';

type BreadcrumbVueSlots = AdaptComponentApiShape<BreadcrumbRegionMap, { content: 'default' }>;
type BreadcrumbItemVueSlots = AdaptComponentApiShape<
  BreadcrumbItemRegionMap,
  { content: 'default' }
>;

export const useBreadcrumbSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: BreadcrumbVueSlots['default'];
  /**
   * 分隔符
   * @en Custom content for the separator slot.
   */
  separator?: BreadcrumbVueSlots['separator'];
}>;

export type BreadcrumbSlots = typeof useBreadcrumbSlots;

export const useBreadcrumbItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: BreadcrumbItemVueSlots['default'];
  /**
   * 分隔符
   * @en Custom content for the separator slot.
   */
  separator?: BreadcrumbItemVueSlots['separator'];
}>;

export type BreadcrumbItemSlots = typeof useBreadcrumbItemSlots;
