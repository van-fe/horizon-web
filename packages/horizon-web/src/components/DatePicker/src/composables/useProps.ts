import type { Component, CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType, IconPropType } from '~/utils/useIcon';
import { IconClose, IconSwapRight } from '@aurora/icon';
import type {
  NDatePickerAccessDatetimeType,
  NDatePickerDisabledDateMethodType,
  NDatePickerDisabledTimeMethodType,
  NDatePickerShortcutsType,
  NDatePickerShowDateTooltipType,
  NDatePickerShowTimeTooltipType,
  NDatePickerShowDotType,
  NDatePickerSupportType,
} from '../utils/types';
import type { Dayjs } from 'dayjs';

export const useDatePickerProps = declarePropType({
  /**
   * 双向绑定值
   */
  modelValue: {
    type: [Date, String, Number, Object, Array] as PropType<
      | NDatePickerAccessDatetimeType
      | [NDatePickerAccessDatetimeType, NDatePickerAccessDatetimeType]
    >,
  },
  /**
   * 面板类型
   * 支持: 'year'、'month'、'week'、'date'、'datetime'、'date-minutes'、'date-seconds'、'date-range'、'month-range'、'year-range'、'datetime-range'、'date-minutes-range'、'date-seconds-range'
   * 以及其上的所有小驼峰写法和除去短横线的全小写写法
   * @enum default 'year' | 'month' | 'week' | 'date' | 'datetime' | 'date-minutes' | 'date-seconds' | 'date-range' | 'month-range' | 'year-range' | 'datetime-range' | 'date-minutes-range' | 'date-seconds-range' ｜ 'dateminutes' | 'dateMinutes' | 'dateseconds' | 'dateSeconds' | 'daterange' | 'dateRange' | 'monthrange' | 'monthRange' | 'yearrange' | 'yearRange' | datetimerange' | 'datetimeRange' | 'dateminutesrange' | 'dateMinutesRange' | 'datesecondsrange' | 'dateSecondsRange'
   */
  type: {
    type: String as PropType<NDatePickerSupportType>,
    default: 'date',
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否可清空输入框
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * 触发方式
   */
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  /**
   * 面板弹出位置
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
   * 是否发送到 `body` 节点
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 输入样式
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  /**
   * 非范围选择占位内容，默认使用国际化配置
   */
  placeholder: {
    type: String,
  },
  /**
   * 时间范围开始占位内容，默认使用国际化配置
   */
  startPlaceholder: {
    type: String,
  },
  /**
   * 时间范围结束占位内容，默认使用国际化配置
   */
  endPlaceholder: {
    type: String,
  },
  /**
   * 在隐藏后是否销毁面板
   */
  destroyOnHide: {
    type: Boolean,
    default: false,
  },
  /**
   * 给 `popover` 的额外参数
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
  /**
   * 下拉框宽度是否与输入框相同
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: 'fit-content',
  },
  /**
   * 鼠标悬浮后多久显示 popper
   * 仅在 trigger = hover 时有效
   */
  hoverShowDelay: {
    type: Number,
    default: 200,
  },
  /**
   * 鼠标移出后后多久隐藏 popper
   * 仅在 trigger = hover 时有效
   */
  hoverHideDelay: {
    type: Number,
    default: 0,
  },
  /**
   * 输入框是否允许输入
   */
  inputable: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认输入的方式，默认按回车确认输入值
   * 如果传入 `'blur'`，会在失焦或按下回车时确认输入值
   * @version 2.12.7
   */
  confirmType: {
    type: String as PropType<'enter' | 'blur'>,
    default: 'enter',
  },
  /**
   * 在范围选择时，确认用户输入的方式，默认按回车确认输入值
   * 如果传入 `'blur'`，会在失焦或按下回车时确认输入值
   * @version 2.12.7
   */
  timePickerConfirmType: {
    type: String as PropType<'enter' | 'blur'>,
    default: 'enter',
  },
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 选项列表最大高度
   */
  optionListMaxHeight: {
    type: [String, Number],
    default: '256',
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
   */
  tooltipShowAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
   */
  tooltipHideAfter: {
    type: Number,
    default: 0,
  },
  /**
   * 时间选择框宽度尺寸
   */
  panelWidth: {
    type: String,
  },
  /**
   * 在范围选择时，是否只渲染一个面板
   */
  singlePanel: {
    type: Boolean,
    default: false,
  },
  /**
   * 在范围选择时，是否只渲染一个触发器
   */
  singleTrigger: {
    type: Boolean,
    default: false,
  },
  /**
   * 时间范围选择起止隔符
   */
  rangeSeparator: {
    type: [String, Object] as PropType<string | Component | VNode>,
    default: IconSwapRight,
  },
  /**
   * 时间范围选择面板起止隔符
   */
  rangePanelSeparator: {
    type: [String, Object] as PropType<string | Component | VNode>,
    default: '-',
  },
  /**
   * 时间步长，单位为分钟，在 `type = 'time'` 时有效
   */
  timeStep: {
    type: Number,
    default: 30,
  },
  /**
   * 小时步长，在 `type = 'minutes' or 'seconds'` 时有效
   */
  hourStep: {
    type: Number,
    default: 1,
  },
  /**
   * 分钟步长，在 `type = 'minutes' or 'seconds'` 时有效
   */
  minuteStep: {
    type: Number,
    default: 1,
  },
  /**
   * 秒步长，在 `type = 'seconds'` 时有效
   */
  secondStep: {
    type: Number,
    default: 1,
  },
  /**
   * 开始时间
   */
  timeStartAt: {
    type: String,
    default: '00:00:00',
  },
  /**
   * 结束时间
   */
  timeEndAt: {
    type: String,
    default: '23:59:59',
  },
  /**
   * 设置禁选日期
   * 详见类型定义
   */
  disabledDate: {
    type: Function as PropType<NDatePickerDisabledDateMethodType>,
  },
  /**
   * 设置禁选时间
   * 详见类型定义
   */
  disabledTime: {
    type: Function as PropType<NDatePickerDisabledTimeMethodType>,
  },
  /**
   * 在时间范围选择时，设置开始的禁选时间
   */
  beginDisabledTime: {
    type: Function as PropType<NDatePickerDisabledTimeMethodType>,
  },
  /**
   * 在时间范围选择时，设置结束的禁选时间
   */
  endDisabledTime: {
    type: Function as PropType<NDatePickerDisabledTimeMethodType>,
  },
  /**
   * 弹出层样式
   */
  panelStyle: {
    type: [String, Object] as PropType<CSSProperties>,
  },
  /**
   * 弹出层类名
   */
  panelClass: {
    type: String,
  },
  /**
   * 输入框显示值的格式，默认根据 `type` 自动设置
   */
  format: {
    type: String,
  },
  /**
   * 绑定值的格式，不指定则使用 `Dayjs` 对象
   */
  valueFormat: {
    type: String,
  },
  /**
   * 前缀图标
   * 在 `input-style = 'normal' or 'emphasize'` 时，默认 `IconTime`
   * 在 `input-style = 'no-border` 时，默认 `false`
   */
  prefixIcon: {
    type: IconMaybeFalsyPropType,
    default: undefined,
  },
  /**
   * 后缀图标
   */
  suffixIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /**
   * 清空图标
   */
  clearIcon: {
    type: IconPropType,
    default: IconClose,
  },
  /**
   * 当显示位置的空间不够时 设置时间面板的默认显示位置顺序
   */
  fallbackPlacements: {
    type: Array as PropType<PopoverProps['fallbackPlacements']>,
    default: [
      'top-start',
      'bottom-end',
      'top-end',
      'right-start',
      'left-start',
      'right-end',
      'left-end',
      'auto-start',
      'auto-end',
    ],
  },
  /**
   * 是否阻止 `popper` 超出边界
   */
  preventOverflow: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义日期单元格文案
   * @param type 面板类型
   * @param value 当前单元格日期
   * @param rawText 原始展示文字
   * @return 如果不更改，返回 undefined | null 即可
   */
  formatDateCellText: {
    type: Function as PropType<
      (type: 'year' | 'month' | 'day', value: Dayjs, rawText: string) => string
    >,
    required: false,
  },
  /**
   * 自定义时间单元格文案
   */
  formatTimeCellText: {
    type: Function as PropType<
      (type: 'hours' | 'minutes' | 'seconds' | 'time', value: string) => string
    >,
    required: false,
  },
  /**
   * 自定义触发器文案
   * @param value 当前展示的日期，对于 `hover` 时的日期也会传入，如果是范围选择，则是数组
   * @param text 原本展示文字，如果是范围选择且有两个输入框，则是数组
   * @return 展示的文字。如果是范围选择且有两个输入框，则需要返回数组，否则直接返回字符串
   */
  formatTriggerText: {
    type: Function as PropType<
      (
        value: Dayjs | undefined | null | [Dayjs | undefined | null, Dayjs | undefined | null],
        text: string | undefined | [string, string],
      ) => string | [string, string]
    >,
    required: false,
  },
  /**
   * 是否需要确认
   */
  needConfirm: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认按钮文本，默认使用国际化配置
   */
  confirmButtonText: {
    type: String,
  },
  /**
   * 展示取消按钮
   */
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 取消按钮文本，默认使用国际化配置
   */
  cancelButtonText: {
    type: String,
  },
  /**
   * 确认按钮的属性设置
   */
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
  /**
   * 取消按钮的属性设置
   */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
  /**
   * 输入框状态
   */
  inputStatus: {
    type: String as PropType<'error'>,
    required: false,
  },
  /**
   * 时间范围时，前后时间是否联动，即前时间小于后时间，大于后时间的时间不可选
   */
  isLinkPanels: {
    type: Boolean,
    default: true,
  },
  /**
   * 在面板底部显示【此刻】
   */
  showNow: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示非当前面板所在年、月、日的日期格子
   * 对于 `year` `yearRange` `week` 强制显示
   */
  showBeforeAfterDate: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在悬浮时显示日期
   */
  hoverToDisplayValue: {
    type: Boolean,
    default: true,
  },
  /**
   * 快捷选项
   */
  shortcuts: {
    type: Array as PropType<NDatePickerShortcutsType[]>,
  },
  /**
   * 是否固定显示6行日期
   */
  fixedSixRows: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许在日期面板上显示年的切换按钮
   */
  showYearButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 日期格子显示提示文字的方法
   */
  showDateTooltip: {
    type: Function as PropType<NDatePickerShowDateTooltipType>,
  },
  /**
   * 月格子显示提示文字的方法
   */
  showMonthTooltip: {
    type: Function as PropType<NDatePickerShowDateTooltipType>,
  },
  /**
   * 年格子显示提示文字的方法
   */
  showYearTooltip: {
    type: Function as PropType<NDatePickerShowDateTooltipType>,
  },
  /**
   * 时间格子显示提示文字的方法
   */
  showTimeTooltip: {
    type: Function as PropType<NDatePickerShowTimeTooltipType>,
  },
  /**
   * 面板展示的日期，默认为当前日期
   * 如果是 `string` 类型，可以无需考虑国际化问题，即填写 `YYYY-MM-DD` 格式的字符串即可
   * 类型详见【类型定义】
   */
  panelShowDate: {
    type: [String, Number, Object, Array] as PropType<
      | NDatePickerAccessDatetimeType
      | [NDatePickerAccessDatetimeType, NDatePickerAccessDatetimeType]
    >,
  },
  /**
   * 默认时间
   * 如果是 `string` 类型，则格式为 `HH:mm:ss` 或 `HH:mm`
   */
  defaultTime: {
    type: [String, Number, Object, Array] as PropType<
      | NDatePickerAccessDatetimeType
      | [NDatePickerAccessDatetimeType, NDatePickerAccessDatetimeType]
    >,
  },
  /**
   * 是否在日期格子下显示圆点标识
   */
  showDot: {
    type: Function as PropType<NDatePickerShowDotType>,
  },
  /**
   * 弹窗最小宽度
   * 普通选择: 160
   * 范围选择: 180
   */
  panelMinWidth: {
    type: [String, Number],
  },
  /**
   * 弹窗最大宽度
   */
  panelMaxWidth: {
    type: [String, Number],
    default: 'fit-content',
  },
  /**
   * 输入框最小宽度
   */
  pickerMinWidth: {
    type: [String, Number],
  },
  /**
   * 输入框最大宽度
   */
  pickerMaxWidth: {
    type: [String, Number],
  },
  /**
   * 一周开始的星期
   * 0为周日
   */
  firstDayOfWeek: {
    type: Number as PropType<0 | 1 | 2 | 3 | 4 | 5 | 6>,
    default: 0,
  },
  /**
   * 是否显示头部
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * 默认值
   * 可以在清空时，指定为 null
   * 默认为 undefined
   * @version 2.12.10
   */
  initialValue: {
    type: Object as PropType<null>,
    default: undefined,
  },
  /**
   * 是否仅展示弹窗内容
   * @version 2.12.13
   */
  showPopoverContentOnly: {
    type: Boolean,
    default: false,
  },
});

export const useDatePickerDatePanelProps = declarePropType({
  /**
   * 开始日期
   */
  startDate: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 结束日期
   */
  endDate: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 开始时间
   */
  startTime: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 结束时间
   */
  endTime: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 预览日期
   */
  previewDate: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 预览时间
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 面板展示的日期
   */
  startPanelShowDate: {
    type: Object as PropType<Dayjs>,
    required: true,
  },
  /**
   * 面板展示的日期
   */
  endPanelShowDate: {
    type: Object as PropType<Dayjs>,
    required: true,
  },
  /**
   * 禁用之前的时间
   */
  disabledBefore: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 禁用之后的时间
   */
  disabledAfter: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 面板类型
   */
  type: {
    type: String as PropType<'single' | 'start' | 'end'>,
    required: true,
  },
  /**
   * 选择器类型
   */
  pickerType: {
    type: String as PropType<'year' | 'month' | 'day'>,
    required: true,
  },
  /**
   * 是否是范围选择器
   */
  isRange: {
    type: Boolean,
    required: true,
  },
});

export const useDatePickerDatePanelComponentsProps = declarePropType({
  /**
   * 开始日期
   */
  startDate: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 结束日期
   */
  endDate: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 开始时间
   */
  startTime: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 结束时间
   */
  endTime: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 预览日期
   */
  previewDate: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 预览时间
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 面板展示的日期
   */
  panelShowDate: {
    type: Object as PropType<Dayjs>,
    required: true,
  },
  /**
   * 禁用之前的时间
   */
  disabledBefore: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 禁用之后的时间
   */
  disabledAfter: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 面板类型
   */
  type: {
    type: String as PropType<'single' | 'start' | 'end'>,
    required: true,
  },
  /**
   * 选择器类型
   */
  pickerType: {
    type: String as PropType<'year' | 'month' | 'day'>,
    required: true,
  },
  /**
   * 是否是范围选择器
   */
  isRange: {
    type: Boolean,
    required: true,
  },
});

export const useDatePickerDatetimeTriggerHeaderProps = declarePropType({
  /**
   * 日期
   */
  date: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 时间
   */
  time: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 预览时间
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 日期占位文字
   */
  datePlaceholder: {
    type: String,
  },
  /**
   * 时间占位文字
   */
  timePlaceholder: {
    type: String,
  },
  /**
   * 禁用之前的时间
   */
  disabledBefore: {
    type: Object as PropType<Dayjs | null>,
  },
  /**
   * 禁用之后的时间
   */
  disabledAfter: {
    type: Object as PropType<Dayjs | null>,
  },
  /**
   * 面板类型
   */
  type: {
    type: String as PropType<'start' | 'end'>,
    required: true,
  },
});

export type DatePickerProps = ExtractPropTypes<typeof useDatePickerProps>;
export type DatePickerDatePanelProps = ExtractPropTypes<typeof useDatePickerDatePanelProps>;
export type DatePickerDatePanelComponentsProps = ExtractPropTypes<
  typeof useDatePickerDatePanelComponentsProps
>;
export type DatePickerDatetimeTriggerHeaderProps = ExtractPropTypes<
  typeof useDatePickerDatetimeTriggerHeaderProps
>;
