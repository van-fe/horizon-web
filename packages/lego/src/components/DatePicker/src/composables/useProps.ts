import { declarePropType } from '@nio-fe/shared';
import type { ExtractPropTypes, PropType } from 'vue';
import type { ButtonProps } from '../../../Button/src/composables/useProps';
import type { Dayjs } from 'dayjs';

export type ModelValueType = Date | string | number | null | (Date | string | number | null)[];
export type DatePickerType =
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'datetime'
  | 'dateminutes'
  | 'dateseconds'
  | 'daterange'
  | 'monthrange'
  | 'yearrange'
  | 'datetimerange'
  | 'dateminutesrange'
  | 'datesecondsrange'
  | 'panel';

export const usePickOptionsProps = declarePropType({
  /**
   * 开始时间 仅type为'datetime'有效
   */
  start: {
    type: String,
    default: '09:00',
  },

  /**
   * 间隔时间 仅type为'datetime'有效
   */
  step: {
    type: String,
    default: '00:30',
  },

  /**
   * 结束时间 仅type为'datetime'有效
   */
  end: {
    type: String,
    default: '18:00',
  },

  /**
   * 分钟间隔时间 仅type为'dateminutes'和'dateseconds'有效
   */
  minutesStep: {
    type: Number,
    default: 1,
  },

  /**
   * 秒钟间隔时间 仅type为'dateseconds'有效
   */
  secondsStep: {
    type: Number,
    default: 1,
  },

  /**
   * 自定义小时列，不设置，默认0-23小时 仅type为'dateminutes、dateseconds'有效，类型为：string｜number[]
   */
  selectableHours: {
    type: Array,
    default: [],
  },

  /**
   * 自定义分钟列，不设置，默认0-59分钟 仅type为'dateminutes、dateseconds'有效，类型为：string｜number[]
   */
  selectableMinutes: {
    type: Array,
    default: [],
  },

  /**
   * 自定义秒钟列，不设置，默认0-59秒钟 仅type为'dateseconds'有效，类型为：string｜number[]
   */
  selectableSeconds: {
    type: Array,
    default: [],
  },
});
export type PickerOptionsProps = ExtractPropTypes<typeof usePickOptionsProps>;

export const useDatePickerProps = declarePropType({
  /** 绑定值 */
  modelValue: {
    type: [Date, String, Number, Array] as PropType<ModelValueType>,
    default: '',
  },
  /** 显示类型 */
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
  },
  /**
   * inputStyle属性
   * @version 2.4.0
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },
  /** 日期选择框高度尺寸 */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    required: false,
  },
  /** 日期选择框宽度尺寸,例如100%,400,400px */
  width: {
    type: String,
    default: '',
  },
  /** 触发器input数量，仅对daterange日期范围有效 */
  triggerNumber: {
    type: Number,
    default: 2,
  },
  /** 面板数量，仅对daterange日期范围有效 */
  panelNumber: {
    type: Number,
    default: 2,
  },
  /** 单月模式占位内容 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 双月模式开始占位内容 */
  startPlaceholder: {
    type: String,
    default: '',
  },
  /** 双月模式结束占位内容 */
  endPlaceholder: {
    type: String,
    default: '',
  },
  /** 输入框显示值的格式，默认值见demo示例中 DatePicker 支持日期格式 */
  format: {
    type: String,
    default: '',
  },
  /** 绑定值的格式，不指定则为 Date 对象 */
  valueFormat: {
    type: String,
    default: '',
  },
  /** 自定义输入框显示文案 */
  formatTriggerText: {
    type: Function as PropType<(value: ModelValueType, text: string) => string | string[]>,
    required: false,
  },
  /** 输入框是否只读 */
  inputReadonly: {
    type: Boolean,
    default: false,
  },
  /** 是否显示清除按钮 */
  clearable: {
    type: Boolean,
    default: true,
  },
  /** 日期组件是否禁用 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 设置禁选日期，参数为当前 Date 对象，需要返回 Boolean */
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    required: false,
  },
  /** 是否隐藏已设置禁用的日期，即，不可点击月年按钮切换，去选择禁用的月份 和disabledDate配合使用*/
  disabledSwitchButton: {
    type: Boolean,
    default: false,
  },
  /** 设置禁选时间，参数为当前时间对象{years, months, date, hours, minutes, seconds}，需要返回 Boolean，注意：旧参数`year,month,day`继续保留，后期大版本会废弃，强烈建议使用`years, months, date` */
  disabledTime: {
    type: Function as PropType<(panelTime: PanelTimeType) => boolean>,
    required: false,
  },
  /** 设置禁选时间，只对日期时间范围有效，参数为当前时间对象{year, month, day, hours, minutes, seconds}，需要返回 Boolean */
  beginDisabledTime: {
    type: Function as PropType<(panelTime: PanelTimeType, placement: string) => boolean>,
  },
  endDisabledTime: {
    type: Function as PropType<(panelTime: PanelTimeType, placement: string) => boolean>,
  },
  /** 显示前后月日期 */
  showBeforeAfterDate: {
    type: Boolean,
    default: false,
  },
  /** 日期面板是否固定显示6行日期 */
  fixedSixRows: {
    type: Boolean,
    default: false,
  },
  /** 设置显示dot，参数为当前 Date 对象，需要返回 Boolean */
  showDot: {
    type: Function as PropType<(date: Date) => boolean>,
    required: false,
  },
  /** 日期范围选择时分隔符 */
  rangeSeparator: {
    type: String,
    default: '',
  },
  /** 是否显示底部操作按钮，日期选择时默认隐藏，日期时间选择时一直显示 */
  showFooter: {
    type: Boolean,
    default: false,
  },
  /** 日期时间参数，详细说明见PickerOptions Props */
  pickerOptions: {
    type: Object as PropType<PickerOptionsProps>,
    default() {
      return {
        start: '00:00',
        step: '00:30',
        end: '23:30',
        minutesStep: 1,
        secondsStep: 1,
        selectableHours: [],
        selectableMinutes: [],
        selectableSeconds: [],
      };
    },
  },
  /** 日期选择时，周起始日期 0-6 默认周日开始 */
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
  /** 日期单元格是否展示tooltip，参数为当前 Date 对象 */
  showDateTooltip: {
    type: Function as PropType<(date: Date) => { show: boolean; content: string }>,
    required: false,
  },
  /** 时间单元格是否展示tooltip，参数为当前时间对象{year, month, day, hours, minutes, seconds}，返回对象：show是否展示，content展示内容*/
  showTimeTooltip: {
    type: Function as PropType<(panelTime: PanelTimeType) => { show: boolean; content: string }>,
    required: false,
  },
  /** 日期面板自定义类名 */
  popperClass: {
    type: String,
    default: '',
  },
  /** 是否显示年月切换操作按钮 */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /** 设置快捷选项，需要传入数组对象 [{ label: string, value: date / function }] */
  shortcuts: {
    type: Array,
    default: () => [],
  },
  /** 设置前缀图标 */
  prefixIcon: {
    type: String,
    default: 'calendar',
  },
  /** 设置清除图标 */
  suffixIcon: {
    type: String,
    default: 'close_filled',
  },
  /** 设置选择器打开时默认面板日期 */
  defaultPickerValue: {
    type: [Date, Array] as PropType<Date | Date[]>,
  },
  /** 日期选择器时设置选中日期后的默认具体时刻，1.String类型，形如：'23:59:59'或者['00:00:00', '23:59:59']；2.date类型，形如：new Date(2023, 1, 1, 12, 0, 0)或者[new Date(2023, 1, 1, 12, 0, 0), new Date(2023, 1, 1, 8, 0, 0)]；日期时间时选中日期后默认选中具体时刻；日期范围时，设置选择日期的默认具体时刻。不设置，默认为00:00:00*/
  defaultTime: {
    type: [String, Date, Array] as PropType<string | Date | string[] | Date[]>,
  },
  /**
   * 日期面板弹出位置
   * @version 2.8.2
   */
  placement: {
    type: String as PropType<
      | 'auto'
      | 'auto-start'
      | 'auto-end'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'right-start'
      | 'right-end'
      | 'left-start'
      | 'left-end'
      | 'top'
      | 'bottom'
      | 'right'
      | 'left'
    >,
    default: 'bottom-start',
  },
  /**
   * 当显示位置的空间不够时 设置日期面板的默认显示位置顺序
   */
  fallbackPlacements: {
    type: Array as PropType<Array<'top' | 'bottom' | 'right' | 'left' | 'auto'>>,
    default: ['top', 'bottom', 'right', 'left', 'auto'],
  },
  /**
   * 是否阻止 `popper` 超出边界
   * @version 2.8.2
   */
  preventOverflow: {
    type: Boolean,
    default: false,
  },
  /** 是否显示此刻/今天按钮 */
  showNow: {
    type: Boolean,
    default: true,
  },
  /** 是否显示取消按钮 */
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  /** 确认按钮的文本内容 */
  confirmButtonText: {
    type: String,
    required: false,
  },
  /** 取消按钮的文本内容 */
  cancelButtonText: {
    type: String,
    required: false,
  },
  /** 确认按钮的属性设置，参考button组件props */
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        type: 'primary',
        size: 'mini',
      };
    },
  },
  /** 取消按钮的属性设置，参考button组件props */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        type: 'normal',
        size: 'mini',
      };
    },
  },
  /** 输入框状态 */
  inputStatus: {
    type: String as PropType<'error'>,
    required: false,
  },
  /**
   * 是否将弹出层挂载在 `body` 上
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /** popper是否为嵌入模式 */
  showEmbed: {
    type: Boolean,
    default: false,
  },
  /** 是否显示年份切换按钮 */
  showYearButton: {
    type: Boolean,
    default: true,
  },
  /** 选择月份范围时，解除两个面板联动 */
  unlinkPanels: {
    type: Boolean,
    default: false,
  },
  /** 是否支持 鼠标hover在日期单元格时，输入框显示此时的日期
   * @version 2.9.0
   */
  isHoverDisplayValue: {
    type: Boolean,
    default: false,
  },
});
export const useDateContentProps = {
  panelDate: {
    type: [Date, String],
  },
  rangeStoreList: {
    type: Array,
    default() {
      return [];
    },
  },
};
export const usePanelContentProps = {
  picker: {
    type: [Array, Date, String] as PropType<Date | string | (Date | string)[]>,
  },
  panelDate: {
    type: [Date, String],
  },
  rightPanelDate: {
    type: [Date, String],
  },
  rangeStore: {
    type: Object as PropType<RangeStoreType>,
    default() {
      return {
        list: [],
        selecting: false,
      };
    },
  },
  isFooter: Boolean,
  rangeHeaderVisible: Boolean,
};
export const useRangeHeaderProps = {
  rangeStore: {
    type: Object as PropType<RangeStoreType>,
    default() {
      return {
        list: [],
        selecting: false,
      };
    },
  },
  isUseInitModel: {
    type: Boolean,
    default: true,
  },
};
export const usePanelFooterProps = {
  showNow: Boolean,
  nowButtonText: {
    type: String,
    default: '',
  },
  confirmDisabled: Boolean,
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  confirmButtonText: {
    type: String,
    required: false,
  },
  cancelButtonText: {
    type: String,
    required: false,
  },
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        type: 'primary',
        size: 'small',
      };
    },
  },
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        plain: true,
        size: 'small',
      };
    },
  },
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    required: false,
  },
  disabledTime: {
    type: Function as PropType<(panelTime: PanelTimeType) => boolean>,
    required: false,
  },
};
export const usePanelTriggerProps = {
  /** 输入框状态 */
  visible: {
    type: Boolean as PropType<boolean>,
    required: false,
  },
  /** 输入框状态 */
  inputStatus: {
    type: String as PropType<'error'>,
    required: false,
  },
};

export type DatePickerProps = ExtractPropTypes<typeof useDatePickerProps>;

export interface DateGridType {
  $date: Dayjs;
  date: Date;
  text: number | string | undefined;
  index?: number;
  isToday?: boolean;
  isNotCurrent?: boolean;
  isCurrent?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isBegin?: boolean;
  isEnd?: boolean;
  isRange?: boolean;
  isCurrentLastDay?: boolean;
  isDot?: boolean;
  tooltip?: {
    content: string;
    show: boolean;
  };
}

export interface ObjectMapType {
  [key: string]: any;
}
export interface PanelTimeType {
  years?: number | undefined;
  months?: number | undefined;
  date?: number | undefined;
  year?: number | undefined;
  month?: number | undefined;
  day?: number | undefined;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
  milliseconds?: number | undefined;
}

export interface FooterSlotsParamsType {
  disabled: boolean;
}

export interface RangeStoreType {
  list: (Date | string)[];
  selecting: boolean;
}

export type DatePickerPickType = PanelTimeType | PanelTimeType[];
