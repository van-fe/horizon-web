import type { SlotsType } from 'vue';
export const useDescriptionsSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};

  /**
   * 标题
    * @en Custom content for the title slot.
   */
  title?: {};
}>;

export type DescriptionsSlots = typeof useDescriptionsSlots;

export const useDescriptionItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};

  /**
   * Label 内容
    * @en Custom content for the label slot.
   */
  label?: {};
}>;

export type DescriptionItemSlots = typeof useDescriptionItemSlots;
