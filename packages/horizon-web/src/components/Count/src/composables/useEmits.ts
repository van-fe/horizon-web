import { isNumber } from '@aurora/utils';
export const useCountEmits = {
  /**
   * 显示内容变化
   * @param value 当前变化的值
   * @paramEn value The value value.
    * @en Emitted when change changes.
   */
  change: (value: number) => isNumber(value),
};

export type CountEmits = typeof useCountEmits;
