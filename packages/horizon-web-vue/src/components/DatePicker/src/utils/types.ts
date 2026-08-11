import type { ConfigType, Dayjs } from 'dayjs';
import type { Ref } from 'vue';
import type {
  HorizonWebComponentInstance,
  KebabCaseToCamelCase,
  KebabCaseToLowerCase,
} from '@aurora/utils';
import type { DatePickerDatePanelExposes } from '../composables/useExposes';
import type HPicker from '~/components/Picker/src/Picker';
import type {
  PickerExposes,
  PickerPureInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type HPickerPureInput from '~/components/Picker/src/components/PickerPureInput';
import type DatePanel from '../components/DatePanel';

export type GetableType<T> = T | (() => T);

export type SingleOrArrayPickerDataType<T> = T | [T, T];

export type HDatePickerBaseSupportType =
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'datetime'
  | 'date-minutes'
  | 'date-seconds'
  | 'date-range'
  | 'month-range'
  | 'year-range'
  | 'datetime-range'
  | 'date-minutes-range'
  | 'date-seconds-range';

export type HDatePickerTypeFormat<T extends string> =
  | T
  | KebabCaseToCamelCase<T>
  | KebabCaseToLowerCase<T>;

/**
 * date-picker support the HDatePickerBaseSupportType, and its lowercase and camelcase.
 */
export type HDatePickerSupportType = HDatePickerTypeFormat<HDatePickerBaseSupportType>;

/**
 * Accept date(time) type
 * support basic type: string | number | Dayjs | Date | null | undefined
 * support dayjs plugin type:
 * - objectSupport(@import('dayjs/plugin/objectSupport'))
 * - arraySupport(@import('dayjs/plugin/arraySupport'))
 */
export type HDatePickerAccessDatetimeType = ConfigType;

/**
 * Disable date judgment method
 * @param date Current date
 * @return boolean Whether to disabled current date
 */
export type HDatePickerDisabledDateMethodType = (date: Dayjs) => boolean;

/**
 * Disable time judgment method
 * @param time Current time
 * @return boolean Whether to disabled current time
 */
export type HDatePickerDisabledTimeMethodType = (time: Dayjs) => boolean;

/**
 * Whether to show dot under the date number
 * @param date Current date cell dayjs object
 * @param panelType The type of current show panel
 * @return boolean Whether to have a dot under the date number
 */
export type HDatePickerShowDotType = (
  date: Dayjs,
  panelType: 'year' | 'month' | 'day',
) => boolean;

/**
 * Shortcuts config
 */
export interface HDatePickerShortcutsType {
  /**
   * The label of shortcuts
   */
  label: string;
  /**
   * The value of these shortcuts. It can be a static value or a function to return them.
   */
  value: GetableType<SingleOrArrayPickerDataType<Dayjs>>;
}

/**
 * Whether to show tooltip on date cell and its tooltip content
 */
export type HDatePickerShowDateTooltipType = (date: Dayjs) => {
  show: boolean;
  content?: string;
};

/**
 * Whether to show tooltip on time cell and its tooltip content.
 * It's as same as HTimePicker's show-time-tooltip.
 */
export type HDatePickerShowTimeTooltipType = (
  time: Dayjs,
  timeType: 'time' | 'hour' | 'minute' | 'second',
) => {
  show: boolean;
  content?: string;
};

/**
 * Custom render date cell's grid type
 */
export interface HDatePickerDateCellType {
  /**
   * current dayjs object
   */
  date: Dayjs;
  /**
   * the text default to show
   */
  text: string | undefined;
  /**
   * the index of current panel. Including the date not in current month/10-years
   */
  index: number;
  /**
   * is this date is today
   */
  isToday: boolean;
  /**
   * is this date is not in current month/10-years
   */
  isNotCurrent: boolean;
  /**
   * is this date is in current month/10-years
   */
  isCurrent: boolean;
  /**
   * is this date is selected
   */
  isSelected: boolean;
  /**
   * is this date is disabled
   */
  isDisabled?: boolean;
  /**
   * is this date in range
   */
  isRange: boolean;
  /**
   * is this date in range and is the start of the range
   */
  isBegin: boolean;
  /**
   * is this date in range and is the end of the range
   */
  isEnd: boolean;
  /**
   * is this date is the current month/10-years last date
   */
  isCurrentLastDate: boolean;
  /**
   * is this date has dot to mark
   */
  hasDot: boolean;
  /**
   * the tooltip setting by user
   */
  tooltip?: {
    content?: string;
    show: boolean;
  };
}

export interface HDatePickerDomRefs {
  startDatePanelsDomRef: Ref<
    HorizonWebComponentInstance<typeof DatePanel, DatePickerDatePanelExposes> | undefined
  >;
  endDatePanelsDomRef: Ref<
    HorizonWebComponentInstance<typeof DatePanel, DatePickerDatePanelExposes> | undefined
  >;
  pickerDomRef: Ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes> | undefined>;
  startInputDomRef: Ref<
    HorizonWebComponentInstance<typeof HPickerPureInput, PickerPureInputExposes> | undefined
  >;
  endInputDomRef: Ref<
    HorizonWebComponentInstance<typeof HPickerPureInput, PickerPureInputExposes> | undefined
  >;
}
