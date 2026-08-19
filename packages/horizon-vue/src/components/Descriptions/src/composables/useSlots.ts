import type { SlotsType } from 'vue';

export const useDescriptionsSlots = Object as SlotsType<{
  /** 描述项。 @en Description items. */
  default?: {};
  /** 自定义标题。 @en Custom title. */
  title?: {};
}>;
export type DescriptionsSlots = typeof useDescriptionsSlots;

export const useDescriptionItemSlots = Object as SlotsType<{
  /** 自定义值。 @en Custom value. */
  default?: {};
  /** 自定义标签。 @en Custom label. */
  label?: {};
}>;
export type DescriptionItemSlots = typeof useDescriptionItemSlots;
