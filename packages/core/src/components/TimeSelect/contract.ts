import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export type TimeSelectValue = string | null | undefined;

export interface TimeSelectCommonProps {
  /** 受控时间值，固定为 HH:mm。@en Controlled time value in HH:mm format. */
  value?: TimeSelectValue;
  /** 非受控初始值。@en Initial uncontrolled value. */
  defaultValue?: TimeSelectValue;
  /** 是否禁用。@en Whether selection is disabled. */
  disabled?: boolean;
  /** 是否允许输入筛选。@en Whether text filtering is enabled. */
  editable?: boolean;
  /** 是否可清空。@en Whether the value can be cleared. */
  clearable?: boolean;
  /** 起始时间。@en Start time. */
  start?: string;
  /** 结束时间。@en End time. */
  end?: string;
  /** 时间步长。@en Time step. */
  step?: string;
  /** 是否包含结束时间。@en Whether the end time is included. */
  includeEndTime?: boolean;
  /** 最小可选时间。@en Minimum selectable time. */
  minTime?: string;
  /** 最大可选时间。@en Maximum selectable time. */
  maxTime?: string;
  /** 展示格式。@en Display format. */
  format?: string;
}

export interface TimeSelectEventMap {
  /** 时间值变化。@en Time value changed. */
  valueChange: [value: TimeSelectValue];
  /** 获得焦点。@en Received focus. */
  focus: [];
  /** 失去焦点。@en Lost focus. */
  blur: [];
  /** 值被清空。@en Value cleared. */
  clear: [];
  /** 面板显隐变化。@en Popup visibility changed. */
  openChange: [open: boolean];
}

export interface TimeSelectRegionMap {
  /** 空状态。@en Empty state. */
  empty: EmptyComponentApi;
  /** 面板头部。@en Popup header. */
  panelHeader: EmptyComponentApi;
  /** 面板底部。@en Popup footer. */
  panelFooter: EmptyComponentApi;
}

export interface TimeSelectCommandMap {
  /** 聚焦输入。@en Focuses the input. */
  focus: () => void;
  /** 使输入失焦。@en Blurs the input. */
  blur: () => void;
  /** 清空当前值。@en Clears the current value. */
  clear: () => void;
  /** 打开面板。@en Opens the popup. */
  open: () => void;
  /** 关闭面板。@en Closes the popup. */
  close: () => void;
}

export const TIME_SELECT_DEFAULTS = Object.freeze({
  disabled: false,
  editable: true,
  clearable: true,
  start: '09:00',
  end: '18:00',
  step: '00:30',
  includeEndTime: false,
  format: 'HH:mm',
} as const satisfies Required<
  Omit<TimeSelectCommonProps, 'defaultValue' | 'maxTime' | 'minTime' | 'value'>
>);

export function isTimeSelectClockValue(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{2}:\d{2}$/.test(value)) return false;
  const [hours, minutes] = value.split(':').map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function isTimeSelectValue(value: unknown): value is TimeSelectValue {
  return value == null || isTimeSelectClockValue(value);
}

export function isTimeSelectStep(value: unknown): value is string {
  return isTimeSelectClockValue(value) && value !== '00:00';
}

export const timeSelectApiContract = defineComponentApiContract<
  TimeSelectCommonProps,
  TimeSelectEventMap,
  TimeSelectRegionMap,
  TimeSelectCommandMap
>({
  defaults: TIME_SELECT_DEFAULTS,
  validators: {
    value: isTimeSelectClockValue,
    defaultValue: isTimeSelectClockValue,
    start: isTimeSelectClockValue,
    end: isTimeSelectClockValue,
    step: isTimeSelectStep,
    minTime: isTimeSelectClockValue,
    maxTime: isTimeSelectClockValue,
  },
});
