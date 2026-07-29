import type { SlotsType } from 'vue';

export const useAlertSlots = Object as SlotsType<{
  /**
   * 展示的内容
    * @en Custom content for the default slot.
   */
  default?: {},
}>;

export type AlertSlots = typeof useAlertSlots;
