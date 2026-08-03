import type { SlotsType } from 'vue';
export const useStepsSlots = Object as SlotsType<{
  /**
   * 默认插槽
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type StepsSlots = typeof useStepsSlots;

export const useStepSlots = Object as SlotsType<{
  /**
   * 标题内容
    * @en Custom content for the title slot.
   */
  title?: {};
  /**
   * 副标题
    * @en Custom content for the subtitle slot.
   */
  subtitle?: {};
  /**
   * 描述内容
    * @en Custom content for the description slot.
   */
  description?: {};
  /**
   * 自定义图标区域
    * @en Custom content for the icon slot.
   */
  icon?: {};
}>;

export type StepSlots = typeof useStepSlots;
