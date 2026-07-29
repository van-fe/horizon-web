import type { CheckboxUnionType } from '../utils/types';
import { isBoolean, isNumber, isString } from '@aurora/utils';

export const useCheckboxEmits = {
  /**
   * 绑定值变化时触发的事件
   * @param value 复选框的值
   * @paramEn value The value value.
    * @en Emitted when change changes.
   */
  change: (value: CheckboxUnionType | CheckboxUnionType[] | boolean) =>
    Array.isArray(value) || isString(value) || isNumber(value) || isBoolean(value),
  /**
   *  更新 `modelValue`
    * @en Emitted when update:model value changes.
   */
  'update:modelValue': (value: Array<CheckboxUnionType> | CheckboxUnionType) =>
    Array.isArray(value) || isString(value) || isNumber(value) || isBoolean(value),
  /**
   * 当失焦时触发
   * @param evt 失焦事件
   * @paramEn evt The evt value.
    * @en Emitted when blur changes.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 点击事件
   * @param evt 鼠标事件
   * @paramEn evt The evt value.
    * @en Emitted when click changes.
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type CheckboxEmits = typeof useCheckboxEmits;
