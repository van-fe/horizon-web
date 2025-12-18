import type { SlotsType } from 'vue';
export const useStepsSlots = Object as SlotsType<{
  /**
   * 默认插槽
   */
  default?: {};
}>;

export type StepsSlots = typeof useStepsSlots;

export const useStepSlots = Object as SlotsType<{
  /**
   * 标题内容
   */
  title?: {};
  /**
   * 副标题
   * @version 2.0.5
   */
  subtitle?: {};
  /**
   * 描述内容
   */
  description?: {};
  /**
   * 自定义图标区域
   * @version 1.6.1
   */
  icon?: {};
}>;

export type StepSlots = typeof useStepSlots;
