import type { SlotsType } from 'vue';
import type { AdaptComponentApiShape, StepRegionMap, StepsRegionMap } from '@aurora/core';

type StepsVueSlots = AdaptComponentApiShape<StepsRegionMap, { content: 'default' }>;

export const useStepsSlots = Object as SlotsType<{
  /** 步骤条目。 @en Step items. */
  default?: StepsVueSlots['default'];
}>;

export type StepsSlots = typeof useStepsSlots;

export const useStepSlots = Object as SlotsType<{
  /** 标题内容。 @en Title content. */
  title?: StepRegionMap['title'];
  /** 副标题内容。 @en Subtitle content. */
  subtitle?: StepRegionMap['subtitle'];
  /** 描述内容。 @en Description content. */
  description?: StepRegionMap['description'];
  /** 节点图标内容。 @en Node icon content. */
  icon?: StepRegionMap['icon'];
}>;

export type StepSlots = typeof useStepSlots;
