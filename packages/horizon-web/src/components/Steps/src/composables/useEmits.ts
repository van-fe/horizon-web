import { isNumber } from '@aurora/utils';

export const useStepEmits = {
  /**
   * step 点击触发
   * @param evt 点击事件或键盘事件
   * @paramEn evt The evt value.
   * @param index 当前元素下标
   * @paramEn index The index value.
    * @en Emitted when click changes.
   */
  click: (evt: Event, index: number) => evt instanceof Event && isNumber(index),
};

export type StepEmits = typeof useStepEmits;

export const useStepsEmits = {
  /**
   *  更新 `modelValue`
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (index: number) => isNumber(index),
  /**
   * 更新 `current` 时通知
   * @param index 当前下标
   * @paramEn index The index value.
    * @en Emitted when update:current changes.
   */
  'update:current': (index: number) => isNumber(index),
  /**
   * 当步骤变化时触发
   * @param current 当前步骤下标
   * @paramEn current The current value.
    * @en Emitted when change changes.
   */
  change: (current: number) => isNumber(current),
};

export type StepsEmits = typeof useStepsEmits;
