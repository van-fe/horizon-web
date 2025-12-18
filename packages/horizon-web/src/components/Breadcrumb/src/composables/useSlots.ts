import type { SlotsType } from 'vue';
export const useBreadcrumbSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 分隔符
   */
  separator?: {};
}>;

export type BreadcrumbSlots = typeof useBreadcrumbSlots;

export const useBreadcrumbItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 分隔符
   */
  separator?: {};
}>;

export type BreadcrumbItemSlots = typeof useBreadcrumbItemSlots;
