import type { SlotsType } from 'vue';
export const useLinkSlots = Object as SlotsType<{
  /**
   * 默认展示内容
   */
  default?: {};
  /**
   * 前缀
   */
  prefix?: {};
  /**
   * 后缀
   */
  suffix?: {};
}>;

export type LinkSlots = typeof useLinkSlots;
