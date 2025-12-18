import type { CheckboxUnionType } from '../utils/types';
import { isBoolean, isNumber, isString } from '@aurora/utils';

export const useCheckboxEmits = {
  /**
   * 绑定值变化时触发的事件
   * @param value 复选框的值
   */
  change: (value: CheckboxUnionType | CheckboxUnionType[] | boolean) =>
    Array.isArray(value) || isString(value) || isNumber(value) || isBoolean(value),
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: Array<CheckboxUnionType> | CheckboxUnionType) =>
    Array.isArray(value) || isString(value) || isNumber(value) || isBoolean(value),
  /**
   * 当失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 点击事件
   * @param evt 鼠标事件
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type CheckboxEmits = typeof useCheckboxEmits;
