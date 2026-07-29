import type { SlotsType } from 'vue';

export const useButtonSlots = Object as SlotsType<{
  /**
   * 默认文字插槽
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * `icon` 插槽
    * @en Custom content for the icon slot.
   */
  icon?: {};
  /**
   * 后缀插槽
    * @en Custom content for the suffix slot.
   */
  suffix?: {};
}>;

export const useButtonGroupSlots = Object as SlotsType<{
  /**
   * 默认插槽，用来放置 `n-button`
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type ButtonSlots = typeof useButtonSlots;
export type ButtonGroupSlots = typeof useButtonGroupSlots;
