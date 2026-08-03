import type { SlotsType } from 'vue';
export const useApplicationSlots = Object as SlotsType<{
  /**
   * 子元素插槽
    * @en Custom content for the default slot.
   */
  default?: {},
}>

export type ApplicationSlots = typeof useApplicationSlots;
