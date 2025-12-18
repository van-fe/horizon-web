import type { Dayjs } from 'dayjs';
import { isDayjs } from 'dayjs';
import { isBoolean, isNil, isString } from '@nio-fe/shared';
import type { SingleOrArrayPickerDataType } from '../utils/types';

export const useTimePickerEmits = {
  /**
   * 更新日期
   * @param val 当前选择的日期或日期范围
   * @param triggerType 触发方式
   */
  'update:modelValue': (
    val: SingleOrArrayPickerDataType<Dayjs | string | undefined | null>,
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) =>
    (isDayjs(val) || isString(val) || Array.isArray(val) || isNil(val)) &&
    ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览时间
   * @param val 预览时间
   * @invisible
   */
  'update:previewTime': (val: Dayjs | undefined) => isNil(val) || isDayjs(val),
  /**
   * 当 `model-value` 变化时触发
   * @param val 变化的 `model-value` 值
   */
  change: (val: SingleOrArrayPickerDataType<Dayjs | string | undefined | null>) =>
    isDayjs(val) || isString(val) || Array.isArray(val) || isNil(val),
  /**
   * 当用户选择时间时触发
   * @param val 选择的日期
   * @param type 当前选择器类型
   */
  pick: (val: Dayjs, type: 'time' | 'hour' | 'minute' | 'second') =>
    isDayjs(val) && ['time', 'hour', 'minute', 'second'].includes(type),
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
   * 点击时触发
   * @param evt 点击事件
   * @version 2.12.15-alpha.3
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const useTimePickerTimePanelEmit = {
  /**
   * 更新日期
   * @param val 当前值
   * @param triggerType 触发方式
   */
  'update:modelValue': (val: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') =>
    isDayjs(val) && ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览时间
   * @param val 预览时间
   * @invisible
   */
  'update:previewTime': (val: Dayjs | undefined) => isNil(val) || isDayjs(val),
};

export const useTimePickerTimeColumnPanelEmit = {
  /**
   * 更新值
   * @param val 当前值
   * @param triggerType 触发方式
   */
  'update:modelValue': (val: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') =>
    isDayjs(val) && ['click', 'input', 'confirmable-input'].includes(triggerType),
  /**
   * 更新预览时间
   * @param val 预览时间
   * @invisible
   */
  'update:previewTime': (val: Dayjs | undefined) => isNil(val) || isDayjs(val),
};

export type TimePickerEmits = typeof useTimePickerEmits;
export type TimePickerTimePanelEmits = typeof useTimePickerTimePanelEmit;
export type TimePickerTimeColumnPanelEmits = typeof useTimePickerTimeColumnPanelEmit;
