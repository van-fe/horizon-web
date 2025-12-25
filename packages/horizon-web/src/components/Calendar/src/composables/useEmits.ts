import { isObject, isString } from '@aurora/utils';
import type { HCalendarPinFlag } from '../utils/types';
import type { Dayjs } from 'dayjs';
import { isDayjs } from 'dayjs';

export const useCalendarEmits = {
  /**
   * 当当前日期变化时响应
   * @param date 当前日期
   */
  'update:modelValue': (date: string) => isString(date),
  /**
   * 当 `pinFlags` 变化时触发
   * @param pinFlags 更改后的 `pinFlags`
   */
  'update:pinFlags': (pinFlags: HCalendarPinFlag[]) => Array.isArray(pinFlags),
  /**
   * 当 `mode` 变化时触发
   * @param mode `month` | `year` | `week` | `day`
   */
  'update:mode': (mode: 'month' | 'year' | 'week' | 'day') => isString(mode),
  /**
   * 当当前日期变化时响应
   * @param date 根据 `format` 做的格式转换后的日期
   * @param type 当前日历类型
   * @param rawDate 原始Dayjs对象
   */
  change: (date: string, type: 'month' | 'year' | 'week' | 'day', rawDate: Dayjs) =>
    isString(date) && isString(type) && isDayjs(rawDate),
  /**
   * 当日期被点击时触发，只有当 `clickable = true` 后点击日期才可以被触发
   * @param date 根据 `format` 做的格式转换后的日期
   * @param type 当前日历类型
   * @param rawDate 原始Dayjs对象
   */
  dateClick: (date: string, type: 'month' | 'year' | 'week' | 'day', rawDate: Dayjs) =>
    isString(date) && isString(type) && isDayjs(rawDate),
  /**
   * 当日历类型切换后时触发
   * @param date 根据 `format` 做的格式转换后的日期
   * @param type 当前日历类型
   * @param rawDate 原始Dayjs对象
   */
  typeChange: (date: string, type: 'month' | 'year' | 'week' | 'day', rawDate: Dayjs) =>
    isString(date) && isString(type) && isDayjs(rawDate),
  /**
   * 当横幅被点击时触发
   * @param pinFlag
   */
  pinFlagClick: (pinFlag: HCalendarPinFlag) => isObject(pinFlag),
  /**
   * 点击切换上一个切换时触发
   * @param prevDate 切换后的日期时间
   * @param type 当前日历类型
   * @param rawDate 原始Dayjs对象
   */
  prevClick: (prevDate: string, type: 'month' | 'year' | 'week' | 'day', rawDate: Dayjs) =>
    isString(prevDate) && isString(type) && isDayjs(rawDate),
  /**
   * 点击切换下一个时触发
   * @param nextDate 切换后的日期时间
   * @param type 当前日历类型
   * @param rawDate 原始Dayjs对象
   */
  nextClick: (nextDate: string, type: 'month' | 'year' | 'week' | 'day', rawDate: Dayjs) =>
    isString(nextDate) && isString(type) && isDayjs(rawDate),
};

export type CalendarEmits = typeof useCalendarEmits;
