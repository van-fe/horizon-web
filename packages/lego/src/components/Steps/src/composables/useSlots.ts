export const useStepsSlots = {
  /**
   * 默认插槽
   */
  default: () => true,
};

export type StepsSlots = typeof useStepsSlots;

export const useStepSlots = {
  /**
   * 标题内容
   */
  title: () => true,
  /**
   * 副标题
   * @version 2.0.5
   */
  subtitle: () => true,
  /**
   * 描述内容
   */
  description: () => true,
  /**
   * 自定义图标区域
   * @version 1.6.1
   */
  icon: () => true,
};

export type StepSlots = typeof useStepSlots;
