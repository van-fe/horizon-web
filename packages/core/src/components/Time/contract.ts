import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export type TimeValue = Date | number | string;
export interface TimeParts {
  /** 完整天数。 @en Complete days. */
  dd?: number;
  /** 不足一天的小时数。 @en Hours remaining after complete days. */
  hh?: number;
  /** 不足一小时的分钟数。 @en Minutes remaining after complete hours. */
  mm?: number;
  /** 不足一分钟的秒数。 @en Seconds remaining after complete minutes. */
  ss: number;
}
export interface TimeCommonProps {
  /** 时长或开始时间，支持 Date、秒数和毫秒时间戳。 @en Duration or start time as a Date, seconds, or a millisecond timestamp. */
  time?: TimeValue;
  /** 绝对结束时间。 @en Absolute end time. */
  endTime?: TimeValue;
  /** 是否从零开始正向计时。 @en Whether to count upwards from zero. */
  forward?: boolean;
  /** 是否静态展示 time 与 endTime 的差值。 @en Whether to show the static difference between time and endTime. */
  calculative?: boolean;
}
export interface TimeEventMap {
  /** 倒计时归零。 @en The countdown reached zero. */
  finished: [];
}
export interface TimeRegionMap {
  /** 自定义时间内容。 @en Custom time content. */
  content: TimeParts;
}
export type TimeCommandMap = EmptyComponentApi;
export const TIME_DEFAULTS = Object.freeze({
  time: 10,
  endTime: 0,
  forward: false,
  calculative: false,
} as const satisfies Required<TimeCommonProps>);

export function isTimeValue(value: unknown): value is TimeValue {
  if (value instanceof Date) return Number.isFinite(value.getTime());
  return (typeof value === 'number' || typeof value === 'string') && Number.isFinite(Number(value));
}
export function normalizeTimeValue(value: TimeValue): number {
  if (value instanceof Date) return value.getTime();
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return String(Math.abs(Math.trunc(numeric))).length >= 13 ? numeric : numeric * 1000;
}
export function resolveTimeDurationSeconds(
  {
    time = TIME_DEFAULTS.time,
    endTime = TIME_DEFAULTS.endTime,
    calculative = false,
  }: TimeCommonProps,
  now = Date.now(),
): number {
  const start = normalizeTimeValue(time);
  const end = normalizeTimeValue(endTime);
  if (calculative && Number(time) !== 0 && Number(endTime) !== 0)
    return Math.round(Math.abs(end - start) / 1000);
  return Math.round((Number(endTime) !== 0 ? end - now : start) / 1000);
}
export function splitTimeDuration(duration: number): TimeParts {
  let remaining = Math.max(0, Math.trunc(duration));
  const ss = remaining % 60;
  remaining = (remaining - ss) / 60;
  if (remaining < 1) return { ss };
  const mm = remaining % 60;
  remaining = (remaining - mm) / 60;
  if (remaining < 1) return { mm, ss };
  const hh = remaining % 24;
  remaining = (remaining - hh) / 24;
  return remaining < 1 ? { hh, mm, ss } : { dd: remaining, hh, mm, ss };
}
export function formatTimeParts(parts: TimeParts): string {
  const pad = (value = 0) => String(value).padStart(2, '0');
  return `${pad(parts.hh)}:${pad(parts.mm)}:${pad(parts.ss)}`;
}
export const timeApiContract = defineComponentApiContract<
  TimeCommonProps,
  TimeEventMap,
  TimeRegionMap,
  TimeCommandMap
>({
  defaults: TIME_DEFAULTS,
  validators: { time: isTimeValue, endTime: isTimeValue },
});
