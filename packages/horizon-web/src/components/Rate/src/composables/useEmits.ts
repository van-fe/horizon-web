import { isNumber } from '@aurora/utils';

export const useRateEmits = {
  /**
   *  更新 `modelValue`
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: number) => isNumber(value),
  /**
   * 当变化时触发
   * @param value 变化后的值
   * @paramEn value The value value.
    * @en Emitted when change changes.
   */
  change: (value: number) => isNumber(value),
  /**
   * 失焦时触发
   * @param evt 失焦事件
   * @paramEn evt The evt value.
    * @en Emitted when blur changes.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};

export type RateEmits = typeof useRateEmits;
