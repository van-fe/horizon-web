import type { SlotsType } from 'vue';
export const useDescriptionsSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};

  /**
   * 标题
   */
  title?: {};
}>;

export type DescriptionsSlots = typeof useDescriptionsSlots;

export const useDescriptionItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};

  /**
   * Label 内容
   */
  label?: {};
}>;

export type DescriptionItemSlots = typeof useDescriptionItemSlots;
