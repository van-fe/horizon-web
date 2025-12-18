import type { SlotsType } from 'vue';
export const useFloatButtonSlots = Object as SlotsType<{
  /**
   * 图标
   */
  icon?: {};
  /**
   * 描述文字
   */
  description?: {};
}>;

export const useFloatButtonGroupSlots = Object as SlotsType<{
  /**
   * 默认插槽
   */
  default?: {};
}>;

export type FloatButtonSlots = typeof useFloatButtonSlots;
export type FloatButtonGroupSlots = typeof useFloatButtonGroupSlots;
