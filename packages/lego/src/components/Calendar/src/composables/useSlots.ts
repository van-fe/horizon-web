import { isBoolean, isString } from '@nio-fe/shared';
import type { Dayjs } from 'dayjs';
import { isDayjs } from 'dayjs';

export const useCalendarSlots = {
  /**
   * 头部区域
   */
  header: () => true,
  /**
   * 切换上下月的区域
   * @param date 根据 `format` 做的格式转换后的当前日期
   * @param rawDate 原始Dayjs对象
   */
  switchDate: (date: string, rawDate: Dayjs) => isString(date) && isDayjs(rawDate),
  /**
   * 日期格子内容，如果使用了此插槽，则 `dateCellTitle`、`dateCellAppend` 将忽略
   * 此外，`pinFlag` 做占位的区域也不会被渲染，所以需要结合使用横幅的日历请勿使用此插槽
   * @param date 根据 `format` 做的格式转换后的当前日期
   * @param rawDate 原始Dayjs对象
   */
  dateCell: (date: string, rawDate: Dayjs) => isString(date) && isDayjs(rawDate),
  /**
   * 日期格子中显示日子的内容
   * @param date 根据 `format` 做的格式转换后的当前日期
   * @param rawDate 原始Dayjs对象
   */
  dateCellTitle: (date: string, rawDate: Dayjs) => isString(date) && isDayjs(rawDate),
  /**
   * 日期格子附加内容
   * @param date 根据 `format` 做的格式转换后的当前日期
   * @param rawDate 原始Dayjs对象
   */
  dateCellAppend: (date: string, rawDate: Dayjs) => isString(date) && isDayjs(rawDate),
  /**
   * 在年历模式下，渲染在头部的插槽
   * @param rawDate 当月第一天的 `Dayjs` 对象
   */
  monthHeader: (rawDate: Dayjs) => isDayjs(rawDate),
  /**
   * 在周历模式下，渲染在头部的插槽
   * @param date 根据 `format` 做的格式转换后的当前日期
   * @param rawDate 原始Dayjs对象
   * @param isToday 是否是当前所在天
   */
  weekDayHeader: (date: string, rawDate: Dayjs, isToday: boolean) =>
    isString(date) && isDayjs(rawDate) && isBoolean(isToday),
  /**
   * 在日历模式下，渲染在头部的插槽
   * @param date 根据 `format` 做的格式转换后的当前日期
   * @param rawDate 原始Dayjs对象
   * @param isToday 是否是当前所在天
   */
  dayHeader: (date: string, rawDate: Dayjs, isToday: boolean) =>
    isString(date) && isDayjs(rawDate) && isBoolean(isToday),
  /**
   * 时区显示插槽
   * @param timezone 当前时区偏移量
   * @param date 根据 `format` 做的格式转换后的当前日期
   * @param rawDate 原始Dayjs对象
   */
  timezone: (timezone: number, date: string, rawDate: Dayjs) => isString(date) && isDayjs(rawDate),
};

export type CalendarSlots = typeof useCalendarSlots;
