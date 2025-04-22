export const useFloatButtonSlots = {
  /**
   * 图标
   */
  icon: () => true,
  /**
   * 描述文字
   */
  description: () => true,
};

export const useFloatButtonGroupSlots = {
  /**
   * 默认插槽
   */
  default: () => true,
};

export type FloatButtonSlots = typeof useFloatButtonSlots;
export type FloatButtonGroupSlots = typeof useFloatButtonGroupSlots;
