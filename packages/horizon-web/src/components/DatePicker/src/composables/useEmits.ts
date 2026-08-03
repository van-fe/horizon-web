import type { Dayjs } from 'dayjs';
import { isDayjs } from 'dayjs';
import { isBoolean, isNil, isObject, isString, isUndefined } from '@aurora/utils';
import type { HDatePickerShortcutsType } from '../utils/types';

export const useDatePickerEmits = {
  /**
   * 更新日期 | undefined | null
   * @param val 当前选择的日期或日期范围
   * @paramEn val The selected date or date range.
    * @en Emitted when update:model value changes.
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
   * @paramEn startDatetime The start datetime value.
   * @param endDatetime 开始预览日期时间
   * @paramEn endDatetime The end datetime value.
   * @invisible
    * @en Emitted when update:preview date changes.
   */
  'update:previewDate': (
    startDatetime: Dayjs | undefined | null,
    endDatetime: Dayjs | undefined | null,
  ) => isDayjs(startDatetime) || isNil(startDatetime) || isDayjs(endDatetime) || isNil(endDatetime),
  /**
   * 当 `model-value` 变化时触发
   * @en Emitted when `model-value` changes.
   * @param val 变化的 `model-value` 值
   * @paramEn val The changed `model-value`.
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
   * @en Emitted when the user picks a date.
   * @param val 选择的日期，如果是范围选择，则是数组
   * @paramEn val The selected date, or an array for range selection.
   */
  pick: (val: Dayjs | undefined | null | [Dayjs | undefined | null, Dayjs | undefined | null]) =>
    isDayjs(val) || isNil(val) || Array.isArray(val),
  /**
   * 输入时触发
   * @en Emitted while the user is typing.
   * @param val 输入的文字
   * @paramEn val The val value.
   * @param evt 输入事件
   * @paramEn evt The evt value.
   */
  input: (val: string, evt: Event) => isString(val) && evt instanceof Event,
  /**
   * 聚焦时触发
   * @en Emitted when the input receives focus.
   */
  focus: () => true,
  /**
   * 失焦时触发
   * @en Emitted when the input loses focus.
   */
  blur: () => true,
  /**
   * 清空时触发
   * @en Emitted when the value is cleared.
   */
  clear: () => true,
  /**
   * 点击确定时触发
   * @en Emitted when the user clicks Confirm.
   */
  confirm: () => true,
  /**
   * 点击取消时触发
   * @en Emitted when the user clicks Cancel.
   */
  cancel: () => true,
  /**
   * 下拉面板显隐通知
   * @en Emitted when the dropdown visibility changes.
   * @param visible 是否显示
   * @paramEn visible The visible value.
   */
  dropdownVisibleChange: (visible: boolean) => isBoolean(visible),
  /**
   * 快捷选择点击时触发
   * @en Emitted when a shortcut is clicked.
   * @param shortcut 当前点击的快捷选项
   * @paramEn shortcut The shortcut value.
   */
  shortcutClick: (shortcut: HDatePickerShortcutsType) => isObject(shortcut),
};

export const useDatePickerDatePanelEmit = {
  /**
   * 更新日期
   * @param vals 日期，如果不是范围，则只传第一个值
   * @paramEn vals The vals value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
    * @en Emitted when update:date changes.
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
   * @paramEn vals The vals value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
    * @en Emitted when update:time changes.
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
   * @paramEn val The val value.
    * @en Emitted when update:preview date changes.
   */
  'update:previewDate': (val: Dayjs | undefined) => isDayjs(val) || isUndefined(val),
  /**
   * 更新预览时间
   * @param val 时间
   * @paramEn val The val value.
    * @en Emitted when update:preview time changes.
   */
  'update:previewTime': (val: Dayjs | undefined) => isDayjs(val) || isUndefined(val),
  /**
   * 更新面板展示的日期
   * @param val 当前值
   * @paramEn val The val value.
    * @en Emitted when update:panel show date changes.
   */
  'update:panelShowDate': (val: Dayjs) => isDayjs(val),
  /**
   * 更新面板选择器类型
   * @param type 类型
   * @paramEn type The type value.
    * @en Emitted when update:picker type changes.
   */
  'update:pickerType': (type: 'year' | 'month' | 'day') => isString(type),
};

export const useDatePickerDatePanelTriggerHeaderEmit = {
  /**
   * 更新时间
   * @param val 时间
   * @paramEn val The val value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
    * @en Emitted when update:time changes.
   */
  'update:time': (
    val: Dayjs | undefined | null,
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) =>
    (isDayjs(val) || isNil(val)) && ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览时间
   * @param val 时间
   * @paramEn val The val value.
    * @en Emitted when update:preview time changes.
   */
  'update:previewTime': (val: Dayjs | undefined) => isDayjs(val) || isUndefined(val),
};

export const useDatePickerDatePanelComponentsEmit = {
  /**
   * 点击日期格子
   * @param date 日期
   * @paramEn date The date value.
   * @param triggerType 触发方式
   * @paramEn triggerType The trigger type value.
   * @param type 日期类型，非必要不传
   * @paramEn type The type value.
    * @en Emitted when click date cell changes.
   */
  clickDateCell: (date: Dayjs, triggerType: 'click' | 'input', type?: 'start' | 'end') =>
    isDayjs(date) &&
    ['click', 'input'].includes(triggerType) &&
    ((type && ['start', 'end'].includes(type)) || isNil(type)),
  /**
   * 悬浮日期格子
   * @param date 日期
   * @paramEn date The date value.
    * @en Emitted when hover date cell changes.
   */
  hoverDateCell: (date: Dayjs | undefined) => isDayjs(date) || isUndefined(date),
  /**
   * 更新面板展示的日期
   * @param val 当前值
   * @paramEn val The val value.
    * @en Emitted when update:panel show date changes.
   */
  'update:panelShowDate': (val: Dayjs) => isDayjs(val),
  /**
   * 更新面板选择器类型
   * @param type 类型
   * @paramEn type The type value.
    * @en Emitted when update:picker type changes.
   */
  'update:pickerType': (type: 'year' | 'month' | 'day') => isString(type),
};

export type DatePickerEmits = typeof useDatePickerEmits;
export type DatePickerDatePanelEmits = typeof useDatePickerDatePanelEmit;
export type DatePickerDatePanelTriggerHeaderEmits =
  typeof useDatePickerDatePanelTriggerHeaderEmit;
export type DatePickerTimePanelComponentsEmits = typeof useDatePickerDatePanelComponentsEmit;
