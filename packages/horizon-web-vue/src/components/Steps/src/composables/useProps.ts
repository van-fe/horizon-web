import type { ExtractPropTypes, PropType } from 'vue';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  StepCommonProps,
  StepsBeforeChange,
  StepsCommonProps,
  StepsDirection,
  StepsLabelAlign,
  StepsLabelPlacement,
  StepsSize,
  StepsStatus,
} from '@aurora/core';
import {
  isStepsDirection,
  isStepsIndex,
  isStepsLabelAlign,
  isStepsLabelPlacement,
  isStepsSize,
  isStepsStatus,
  STEP_DEFAULTS,
  STEPS_DEFAULTS,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';

type StepVueProps = StepCommonProps<string, string, string>;
type StepsVueProps = AdaptComponentApiShape<
  StepsCommonProps<StepVueProps>,
  { value: 'modelValue' },
  'defaultValue'
>;

export const useStepProps = declarePropType({
  /** 标题。 @en Step title. */
  title: {
    type: String,
    default: STEP_DEFAULTS.title,
  },
  /** 副标题。 @en Step subtitle. */
  subtitle: {
    type: String,
    required: false,
  },
  /** 步骤的详情描述。 @en Step description. */
  description: {
    type: String,
    default: STEP_DEFAULTS.description,
  },
  /** 显式步骤索引，用于动态步骤。 @en Explicit step index used by dynamic steps. */
  index: {
    type: Number,
    required: false,
    validator: isStepsIndex,
  },
  /** 覆盖父级可点击设置。 @en Overrides the parent clickability. */
  clickable: {
    type: Boolean,
    default: undefined,
  },
  /** 禁用步骤交互。 @en Disables step interaction. */
  disabled: {
    type: Boolean,
    default: STEP_DEFAULTS.disabled,
  },
} satisfies ComponentRendererPropDefinitions<StepVueProps>);

export const useStepsProps = declarePropType({
  /** 当前步骤。 @en Current step. */
  modelValue: {
    type: Number,
    default: STEPS_DEFAULTS.defaultValue,
    validator: isStepsIndex,
  },
  /** 步骤条方向。 @en Steps orientation. */
  direction: {
    type: String as PropType<StepsDirection>,
    default: STEPS_DEFAULTS.direction,
    validator: isStepsDirection,
  },
  /** 标签相对节点的放置方式。 @en Label placement relative to the node. */
  labelPlacement: {
    type: String as PropType<StepsLabelPlacement>,
    default: STEPS_DEFAULTS.labelPlacement,
    validator: isStepsLabelPlacement,
  },
  /** 组件尺寸；未设置时继承 Application。 @en Component size; inherits Application when omitted. */
  size: {
    type: String as PropType<StepsSize>,
    required: false,
    validator: isStepsSize,
  },
  /** 当前步骤状态。 @en Status of the current step. */
  status: {
    type: String as PropType<StepsStatus>,
    default: STEPS_DEFAULTS.status,
    validator: isStepsStatus,
  },
  /** 使用点状节点。 @en Uses dot nodes. */
  progressDot: {
    type: Boolean,
    default: STEPS_DEFAULTS.progressDot,
  },
  /** 允许步骤交互。 @en Allows step interaction. */
  clickable: {
    type: Boolean,
    default: STEPS_DEFAULTS.clickable,
  },
  /** 点击后自动更新当前步骤。 @en Clicking automatically updates the current step. */
  controllable: {
    type: Boolean,
    default: STEPS_DEFAULTS.controllable,
  },
  /** 自动索引的起始值。 @en Starting value for automatic indexes. */
  initial: {
    type: Number,
    default: STEPS_DEFAULTS.initial,
    validator: isStepsIndex,
  },
  /** 水平布局中的标签对齐方式。 @en Label alignment in horizontal layouts. */
  labelAlign: {
    type: String as PropType<StepsLabelAlign>,
    default: STEPS_DEFAULTS.labelAlign,
    validator: isStepsLabelAlign,
  },
  /**
   * 切换步骤前的异步守卫。
   * @en Async guard invoked before changing steps.
   */
  beforeChange: {
    type: Function as PropType<StepsBeforeChange<StepVueProps>>,
    required: false,
  },
} satisfies ComponentRendererPropDefinitions<StepsVueProps>);

export type StepsProps = ExtractPropTypes<typeof useStepsProps>;
export type StepProps = ExtractPropTypes<typeof useStepProps>;
