import { isBoolean, isNumber, isString } from '@aurora/utils';

export const useRadioEmits = {
  /**
   * 绑定值变化时触发的事件
   * @param value 选中的 value 值
   */
  change: (value: string | number | boolean) =>
    isString(value) || isNumber(value) || isBoolean(value),
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: string | number | boolean) =>
    isString(value) || isNumber(value) || isBoolean(value),
  /**
   * 失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};

export type RadioEmits = typeof useRadioEmits;
