import type { SlotsType } from 'vue';
export const useCheckboxSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type CheckboxSlots = typeof useCheckboxSlots;

export const useCheckboxButtonSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type CheckboxButtonSlots = typeof useCheckboxButtonSlots;

export const useCheckboxGroupSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type CheckboxGroupSlots = typeof useCheckboxGroupSlots;
