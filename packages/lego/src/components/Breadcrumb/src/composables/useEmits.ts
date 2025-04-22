import type { BreadcrumbItem } from './useProps';

export const useBreadcrumbEmits = {
  /**
   * 点击子元素后触发
   * @param itemProp 子元素的 `prop`
   * @param e 点击事件或键盘事件
   */
  itemClick: (itemProp: BreadcrumbItem, e: Event) => e instanceof Event,
};

export type BreadcrumbEmits = typeof useBreadcrumbEmits;

export const useBreadcrumbItemEmits = {
  /**
   * 点击后触发
   * @param e 点击事件
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
};

export type BreadcrumbItemEmits = typeof useBreadcrumbItemEmits;
