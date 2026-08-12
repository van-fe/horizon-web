import type { TimeParts } from '@aurora/core';
import type { SlotsType } from 'vue';

export const useTimeSlots = Object as SlotsType<{
  /**
   * 默认的渲染
   * @en Custom content for the default slot.
   */
  default?: TimeParts;
}>;

export type TimeSlots = typeof useTimeSlots;
