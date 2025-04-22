export const useInputNumberSlots = {
  /**
   * 输入框头部内容
   */
  prefix: () => true,
  /**
   * 输入框尾部内容
   */
  suffix: () => true,
  /**
   * 前部增加插槽
   * @version 2.0.0-beta.6
   */
  prepend: () => true,
  /**
   * 后部增加插槽
   * @version 2.0.0-beta.6
   */
  append: () => true,
};

export type InputNumberSlots = typeof useInputNumberSlots;
