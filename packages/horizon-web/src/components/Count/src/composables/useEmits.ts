import { isNumber } from '@aurora/utils';
export const useCountEmits = {
  /**
   * 显示内容变化
   * @param value 当前变化的值
   */
  change: (value: number) => isNumber(value),
};

export type CountEmits = typeof useCountEmits;
