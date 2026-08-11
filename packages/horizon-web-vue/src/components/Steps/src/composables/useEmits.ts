import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  StepEventMap,
  StepsEventMap,
} from '@aurora/core';
import { isStepsIndex } from '@aurora/core';

type StepsVueEventMap = AdaptComponentApiShape<
  StepsEventMap,
  {},
  never,
  { 'update:modelValue': [index: number]; 'update:current': [index: number] }
>;

export const useStepEmits = {
  /**
   * 激活可交互步骤。
   * @param evt 点击或键盘事件
   * @paramEn evt Click or keyboard event.
   * @param index 步骤索引
   * @paramEn index Step index.
   * @en Emitted when an interactive step is activated.
   */
  click: (evt: Event, index: number) => evt instanceof Event && isStepsIndex(index),
} satisfies ComponentEventValidators<StepEventMap<Event>>;

export type StepEmits = typeof useStepEmits;

export const useStepsEmits = {
  /** 更新绑定值。 @en Updates the bound value. */
  'update:modelValue': isStepsIndex,
  /** 更新历史 `current` 绑定别名。 @en Updates the legacy `current` binding alias. */
  'update:current': isStepsIndex,
  /**
   * 当前步骤发生变化。
   * @param current 当前步骤索引
   * @paramEn current Current step index.
   * @en Emitted when the current step changes.
   */
  change: isStepsIndex,
} satisfies ComponentEventValidators<StepsVueEventMap>;

export type StepsEmits = typeof useStepsEmits;
