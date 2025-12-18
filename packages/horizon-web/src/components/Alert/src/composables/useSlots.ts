import type { SlotsType } from 'vue';

export const useAlertSlots = Object as SlotsType<{
  /**
   * 展示的内容
   */
  default?: {},
}>;

export type AlertSlots = typeof useAlertSlots;
