import type { SlotsType } from 'vue';
export const useControlsSlots = Object as SlotsType<{
  /**
   * 默认插槽
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export const useControlSlots = Object as SlotsType<{
  /**
   * 控制器文字
    * @en Custom content for the text slot.
   */
  text?: {};
}>;

export type ControlsSlots = typeof useControlsSlots;
export type ControlSlots = typeof useControlSlots;
