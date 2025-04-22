import type {
  ModelValueType,
  DatePickerPickType,
  ObjectMapType,
} from '~/components/DatePicker/src/composables/useProps';
import type { ConfigType } from 'dayjs';
import { isNumber, isObject, isString, isBoolean, isNull } from '@nio-fe/shared';
import dayjs from './dayjs';

export const useDatePickerEmits = {
  /**
   *  更新 `modelValue`
   */
  'update:modelValue': (value: ModelValueType) =>
    isNull(value) ||
    isString(value) ||
    isNumber(value) ||
    Array.isArray(value) ||
    dayjs(value as ConfigType).isValid(),
  /**
   * 用户点击时触发
   * @param value 日期对象
   */
  pick: (value: DatePickerPickType) => Array.isArray(value) || isObject(value),
  /**
   * 用户确认选定的值变化时触发
   * @param value 组件绑定值
   */
  change: (value: ModelValueType) =>
    isNull(value) ||
    isString(value) ||
    isNumber(value) ||
    Array.isArray(value) ||
    dayjs(value as ConfigType).isValid(),
  /**
   * input获得焦点时触发
   * @param event 事件
   */
  focus: (event: Event) => event instanceof Event,
  /**
   * input失去焦点时触发
   * @param event 事件
   */
  blur: (event: Event) => event instanceof Event,
  /**
   * popper visible变化时触发
   * @param value visible值
   */
  popperChange: (value: boolean) => isBoolean(value),
  /**
   * shortcut click时触发
   * @param value 配置的每一项
   * @version 2.9.5
   */
  shortcutClick: (value: ObjectMapType) => isObject(value),
};

export type DatePickerEmits = typeof useDatePickerEmits;
