import type { Dayjs } from 'dayjs';
import { isDayjs } from 'dayjs';
import { isBoolean, isNil, isObject, isString, isUndefined } from '@aurora/utils';
import type { NDatePickerShortcutsType } from '../utils/types';

export const useDatePickerEmits = {
  /**
   * 更新日期 | undefined | null
   * @param val 当前选择的日期或日期范围
   */
  'update:modelValue': (
    val:
      | Dayjs
      | string
      | [Dayjs | string | undefined | null, Dayjs | string | undefined | null]
      | undefined
      | null,
  ) => isDayjs(val) || isString(val) || Array.isArray(val) || isNil(val),
  /**
   * 更新预览日期
   * @param startDatetime 开始预览日期时间
   * @param endDatetime 开始预览日期时间
   * @invisible
   */
  'update:previewDate': (
    startDatetime: Dayjs | undefined | null,
    endDatetime: Dayjs | undefined | null,
  ) => isDayjs(startDatetime) || isNil(startDatetime) || isDayjs(endDatetime) || isNil(endDatetime),
  /**
   * 当 `model-value` 变化时触发
   * @param val 变化的 `model-value` 值
   */
  change: (
    val:
      | Dayjs
      | string
      | [Dayjs | string | undefined | null, Dayjs | string | undefined | null]
      | undefined
      | null,
  ) => isDayjs(val) || isString(val) || Array.isArray(val) || isNil(val),
  /**
   * 当用户选择日期时触发
   * @param val 选择的日期，如果是范围选择，则是数组
   */
  pick: (val: Dayjs | undefined | null | [Dayjs | undefined | null, Dayjs | undefined | null]) =>
    isDayjs(val) || isNil(val) || Array.isArray(val),
  /**
   * 输入时触发
   * @param val 输入的文字
   * @param evt 输入事件
   */
  input: (val: string, evt: Event) => isString(val) && evt instanceof Event,
  /**
   * 聚焦时触发
   */
  focus: () => true,
  /**
   * 失焦时触发
   */
  blur: () => true,
  /**
   * 清空时触发
   */
  clear: () => true,
  /**
   * 点击确定时触发
   */
  confirm: () => true,
  /**
   * 点击取消时触发
   */
  cancel: () => true,
  /**
   * 下拉面板显隐通知
   * @param visible 是否显示
   */
  dropdownVisibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 快捷选择点击时触发
   * @param shortcut 当前点击的快捷选项
   */
  shortcutClick: (shortcut: NDatePickerShortcutsType) => isObject(shortcut),
};

export const useDatePickerDatePanelEmit = {
  /**
   * 更新日期
   * @param vals 日期，如果不是范围，则只传第一个值
   * @param triggerType 触发方式
   */
  'update:date': (
    vals: [Dayjs | undefined | null, Dayjs | undefined | null],
    triggerType: 'click' | 'input',
  ) =>
    (isDayjs(vals[0]) || isNil(vals[0]) || isDayjs(vals[1]) || isNil(vals[1])) &&
    ['click', 'input'].includes(triggerType),
  /**
   * 更新时间
   * @param vals 时间，如果不是范围，则只传第一个值
   * @param triggerType 触发方式
   */
  'update:time': (
    vals: [Dayjs | undefined | null, Dayjs | undefined | null],
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) =>
    (isDayjs(vals[0]) || isNil(vals[0]) || isDayjs(vals[1]) || isNil(vals[1])) &&
    ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览日期
   * @param val 日期
   */
  'update:previewDate': (val: Dayjs | undefined) => isDayjs(val) || isUndefined(val),
  /**
   * 更新预览时间
   * @param val 时间
   */
  'update:previewTime': (val: Dayjs | undefined) => isDayjs(val) || isUndefined(val),
  /**
   * 更新面板展示的日期
   * @param val 当前值
   */
  'update:panelShowDate': (val: Dayjs) => isDayjs(val),
  /**
   * 更新面板选择器类型
   * @param type 类型
   */
  'update:pickerType': (type: 'year' | 'month' | 'day') => isString(type),
};

export const useDatePickerDatePanelTriggerHeaderEmit = {
  /**
   * 更新时间
   * @param val 时间
   * @param triggerType 触发方式
   */
  'update:time': (
    val: Dayjs | undefined | null,
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) =>
    (isDayjs(val) || isNil(val)) && ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览时间
   * @param val 时间
   */
  'update:previewTime': (val: Dayjs | undefined) => isDayjs(val) || isUndefined(val),
};

export const useDatePickerDatePanelComponentsEmit = {
  /**
   * 点击日期格子
   * @param date 日期
   * @param triggerType 触发方式
   * @param type 日期类型，非必要不传
   */
  clickDateCell: (date: Dayjs, triggerType: 'click' | 'input', type?: 'start' | 'end') =>
    isDayjs(date) &&
    ['click', 'input'].includes(triggerType) &&
    ((type && ['start', 'end'].includes(type)) || isNil(type)),
  /**
   * 悬浮日期格子
   * @param date 日期
   */
  hoverDateCell: (date: Dayjs | undefined) => isDayjs(date) || isUndefined(date),
  /**
   * 更新面板展示的日期
   * @param val 当前值
   */
  'update:panelShowDate': (val: Dayjs) => isDayjs(val),
  /**
   * 更新面板选择器类型
   * @param type 类型
   */
  'update:pickerType': (type: 'year' | 'month' | 'day') => isString(type),
};

export type DatePickerEmits = typeof useDatePickerEmits;
export type DatePickerDatePanelEmits = typeof useDatePickerDatePanelEmit;
export type DatePickerDatePanelTriggerHeaderEmits =
  typeof useDatePickerDatePanelTriggerHeaderEmit;
export type DatePickerTimePanelComponentsEmits = typeof useDatePickerDatePanelComponentsEmit;
