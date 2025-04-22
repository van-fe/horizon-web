import { isNumber, isObject, isString, isBoolean, isNull } from '@nio-fe/shared';
import dayjs from '~/components/DatePicker/src/composables/dayjs';
import type { ModelValueType, PickerTimeType } from './useProps';
import type { ConfigType } from 'dayjs';

export const useTimePickerEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: ModelValueType) =>
    isNull(value) ||
    isString(value) ||
    isNumber(value) ||
    isObject(value) ||
    Array.isArray(value) ||
    dayjs(value as ConfigType).isValid(),
  /**
   * 当时间改变时触发
   * @param value 时间值
   */
  change: (value: ModelValueType) =>
    isNull(value) ||
    isString(value) ||
    isObject(value) ||
    Array.isArray(value) ||
    dayjs(value as ConfigType).isValid(),
  /**
   * 当选择器聚焦时触发
   * @param evt 聚焦事件
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 当选择器失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 当时间选中时触发
   * @param value 时间值
   * @param type 类型
   */
  pick: (value: number | string, type: string) =>
    (isString(value) || isNumber(value)) && isString(type),
  /**
   * 当时间改变时触发
   * @param value 时间值
   */
  changePanelTime: (value: PickerTimeType) =>
    isObject(value) || isNull(value) || Array.isArray(value),
  /**
   * popper visible变化时触发
   * @param value visible值
   */
  popperChange: (value: boolean) => isBoolean(value),
};

export type TimePickerEmits = typeof useTimePickerEmits;
