import type { SlotsType } from 'vue';
export const useCountSlots = Object as SlotsType<{
  /**
   * 前缀内容
   */
  prefix?: {};
  /**
   * 后缀内容
   */
  suffix?: {};
}>;

export type CountSlots = typeof useCountSlots;
