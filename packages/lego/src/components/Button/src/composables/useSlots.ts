export const useButtonSlots = {
  /**
   * 默认文字插槽
   */
  default: () => true,
  /**
   * `icon` 插槽
   */
  icon: () => true,
  /**
   * 后缀插槽
   */
  suffix: () => true,
};

export const useButtonGroupSlots = {
  /**
   * 默认插槽，用来放置 `n-button`
   */
  default: () => true,
};

export type ButtonSlots = typeof useButtonSlots;
export type ButtonGroupSlots = typeof useButtonGroupSlots;
