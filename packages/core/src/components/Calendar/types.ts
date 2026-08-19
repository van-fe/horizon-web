export type CalendarMode = 'month' | 'year' | 'week' | 'day';
export type CalendarDateType = 'full' | 'only-current';
export type CalendarHourFormat = '24' | '12';
export type CalendarValue = Date | number | string;
export type CalendarPinFlagType = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'pill';

/** Product-neutral schedule data. Renderers may extend it with native content. */
export interface CalendarPinFlag<Title = unknown, DateValue = CalendarValue> {
  id?: string;
  title?: Title;
  type?: CalendarPinFlagType;
  startAt: DateValue;
  endAt?: DateValue;
  clickable?: boolean;
  tooltip?: string | boolean;
  color?: string;
  background?: string;
  showTime?: boolean;
  [key: string]: unknown;
}

export const CALENDAR_MODES = Object.freeze<readonly CalendarMode[]>([
  'month',
  'year',
  'week',
  'day',
]);

export const CALENDAR_DEFAULTS = Object.freeze({
  mode: 'month' as CalendarMode,
  modeSwitchable: false,
  modeSwitchableList: ['year', 'month', 'week'] as readonly CalendarMode[],
  defaultStartHour: 8,
  format: 'YYYY-MM-DD',
  dateType: 'full' as CalendarDateType,
  hourFormat: '12' as CalendarHourFormat,
  pickable: false,
  enableCreatePinFlags: false,
  createFlagCanThroughDisabledRange: true,
  pinFlags: [] as readonly CalendarPinFlag[],
  pinFlagsShowTime: false,
  showSpacingBetweenFlags: true,
  autoFit: false,
  currentTimeLine: true,
});

export const isCalendarMode = (value: unknown): value is CalendarMode =>
  typeof value === 'string' && CALENDAR_MODES.includes(value as CalendarMode);
export const isCalendarModeList = (value: unknown): value is readonly CalendarMode[] =>
  Array.isArray(value) && value.every(isCalendarMode);
export const isCalendarDateType = (value: unknown): value is CalendarDateType =>
  value === 'full' || value === 'only-current';
export const isCalendarHourFormat = (value: unknown): value is CalendarHourFormat =>
  value === '12' || value === '24';
export const isCalendarStartHour = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 23;
export function isCalendarValue(value: unknown): value is CalendarValue {
  return value instanceof Date
    ? Number.isFinite(value.getTime())
    : typeof value === 'number'
      ? Number.isFinite(value)
      : typeof value === 'string' && value.trim().length > 0;
}
