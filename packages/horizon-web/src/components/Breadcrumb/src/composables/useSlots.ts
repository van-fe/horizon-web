import type { SlotsType } from 'vue';
export const useBreadcrumbSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 分隔符
    * @en Custom content for the separator slot.
   */
  separator?: {};
}>;

export type BreadcrumbSlots = typeof useBreadcrumbSlots;

export const useBreadcrumbItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 分隔符
    * @en Custom content for the separator slot.
   */
  separator?: {};
}>;

export type BreadcrumbItemSlots = typeof useBreadcrumbItemSlots;
