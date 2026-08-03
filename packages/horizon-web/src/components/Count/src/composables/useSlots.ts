import type { SlotsType } from 'vue';
export const useCountSlots = Object as SlotsType<{
  /**
   * 前缀内容
    * @en Custom content for the prefix slot.
   */
  prefix?: {};
  /**
   * 后缀内容
    * @en Custom content for the suffix slot.
   */
  suffix?: {};
}>;

export type CountSlots = typeof useCountSlots;
