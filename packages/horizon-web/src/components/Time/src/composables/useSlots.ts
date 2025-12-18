import type { SlotsType } from 'vue';

export const useTimeSlots = Object as SlotsType<{
  /**
   * 默认的渲染
   */
  default?: { dd?: number; hh?: number; mm?: number; ss: number },
}>

export type TimeSlots = typeof useTimeSlots;
