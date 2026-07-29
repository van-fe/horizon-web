import type { SlotsType } from 'vue';
export const useFloatButtonSlots = Object as SlotsType<{
  /**
   * 图标
    * @en Custom content for the icon slot.
   */
  icon?: {};
  /**
   * 描述文字
    * @en Custom content for the description slot.
   */
  description?: {};
}>;

export const useFloatButtonGroupSlots = Object as SlotsType<{
  /**
   * 默认插槽
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type FloatButtonSlots = typeof useFloatButtonSlots;
export type FloatButtonGroupSlots = typeof useFloatButtonGroupSlots;
