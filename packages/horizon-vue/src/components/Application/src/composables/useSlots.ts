import type { SlotsType } from 'vue';
import type { ApplicationRegionMap, ComponentRegionContext } from '@aurora/core';
export const useApplicationSlots = Object as SlotsType<{
  /**
   * 子元素插槽
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<ApplicationRegionMap, 'content'>;
}>;

export type ApplicationSlots = typeof useApplicationSlots;
