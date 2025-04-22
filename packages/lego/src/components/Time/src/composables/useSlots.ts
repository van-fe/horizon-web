import { isObject } from '@nio-fe/shared';

export const useTimeSlots = {
  /**
   * 默认的渲染
   */
  default: (val: { dd?: number; hh?: number; mm?: number; ss: number }) => isObject(val),
};

export type TimeSlots = typeof useTimeSlots;
