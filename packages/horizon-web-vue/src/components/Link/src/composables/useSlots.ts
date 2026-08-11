import type { SlotsType } from 'vue';
export const useLinkSlots = Object as SlotsType<{
  /**
   * 默认展示内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 前缀
    * @en Custom content for the prefix slot.
   */
  prefix?: {};
  /**
   * 后缀
    * @en Custom content for the suffix slot.
   */
  suffix?: {};
}>;

export type LinkSlots = typeof useLinkSlots;
