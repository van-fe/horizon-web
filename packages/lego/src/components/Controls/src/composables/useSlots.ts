export const useControlsSlots = {
  /**
   * 默认插槽
   */
  default: () => true,
};

export const useControlSlots = {
  /**
   * 控制器文字
   */
  text: () => true,
};

export type ControlsSlots = typeof useControlsSlots;
export type ControlSlots = typeof useControlSlots;
