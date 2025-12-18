import type { SlotsType } from 'vue';

export const useButtonSlots = Object as SlotsType<{
  /**
   * 默认文字插槽
   */
  default?: {};
  /**
   * `icon` 插槽
   */
  icon?: {};
  /**
   * 后缀插槽
   */
  suffix?: {};
}>;

export const useButtonGroupSlots = Object as SlotsType<{
  /**
   * 默认插槽，用来放置 `n-button`
   */
  default?: {};
}>;

export type ButtonSlots = typeof useButtonSlots;
export type ButtonGroupSlots = typeof useButtonGroupSlots;
