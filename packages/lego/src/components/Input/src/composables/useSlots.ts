export const useInputSlots = {
  /**
   * 输入框头部内容
   */
  prefix: () => true,
  /**
   * 输入框尾部内容
   */
  suffix: () => true,
  /**
   * 输入框前置内容
   */
  prepend: () => true,
  /**
   * 输入框后置内容
   */
  append: () => true,
};

export type InputSlots = typeof useInputSlots;
