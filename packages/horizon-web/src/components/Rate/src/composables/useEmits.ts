import { isNumber } from '@aurora/shared';

export const useRateEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: number) => isNumber(value),
  /**
   * 当变化时触发
   * @param value 变化后的值
   */
  change: (value: number) => isNumber(value),
  /**
   * 失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};

export type RateEmits = typeof useRateEmits;
