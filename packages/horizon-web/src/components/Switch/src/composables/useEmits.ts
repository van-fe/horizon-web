import { isBoolean } from '@aurora/utils';

export const useSwitchEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: boolean) => isBoolean(value),
  /**
   * 当开关状态变化时触发
   * @param value 变化后的值
   */
  change: (value: boolean) => isBoolean(value),
  /**
   * 失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};

export type SwitchEmits = typeof useSwitchEmits;
