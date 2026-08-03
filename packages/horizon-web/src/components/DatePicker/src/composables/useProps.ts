import type { Component, CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType, IconPropType } from '~/utils/useIcon';
import { IconClose, IconSwapRight } from '@aurora/icon';
import type {
  HDatePickerAccessDatetimeType,
  HDatePickerDisabledDateMethodType,
  HDatePickerDisabledTimeMethodType,
  HDatePickerShortcutsType,
  HDatePickerShowDateTooltipType,
  HDatePickerShowTimeTooltipType,
  HDatePickerShowDotType,
  HDatePickerSupportType,
} from '../utils/types';
import type { Dayjs } from 'dayjs';

export const useDatePickerProps = declarePropType({
  /**
   * 双向绑定值
    * @en Configuration for model value.
   */
  modelValue: {
    type: [Date, String, Number, Object, Array] as PropType<
      | HDatePickerAccessDatetimeType
      | [HDatePickerAccessDatetimeType, HDatePickerAccessDatetimeType]
    >,
  },
  /**
   * 面板类型
   * 支持: 'year'、'month'、'week'、'date'、'datetime'、'date-minutes'、'date-seconds'、'date-range'、'month-range'、'year-range'、'datetime-range'、'date-minutes-range'、'date-seconds-range'
   * 以及其上的所有小驼峰写法和除去短横线的全小写写法
   * @enum default 'year' | 'month' | 'week' | 'date' | 'datetime' | 'date-minutes' | 'date-seconds' | 'date-range' | 'month-range' | 'year-range' | 'datetime-range' | 'date-minutes-range' | 'date-seconds-range' ｜ 'dateminutes' | 'dateMinutes' | 'dateseconds' | 'dateSeconds' | 'daterange' | 'dateRange' | 'monthrange' | 'monthRange' | 'yearrange' | 'yearRange' | datetimerange' | 'datetimeRange' | 'dateminutesrange' | 'dateMinutesRange' | 'datesecondsrange' | 'dateSecondsRange'
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<HDatePickerSupportType>,
    default: 'date',
  },
  /**
   * 是否禁用
    * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否可清空输入框
    * @en Configuration for clearable.
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * 触发方式
    * @en Configuration for trigger.
   */
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  /**
   * 面板弹出位置
    * @en Configuration for placement.
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
    * @en Configuration for to body.
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 输入样式
    * @en Configuration for input style.
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },
  /**
   * 尺寸
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  /**
   * 非范围选择占位内容，默认使用国际化配置
    * @en Configuration for placeholder.
   */
  placeholder: {
    type: String,
  },
  /**
   * 时间范围开始占位内容，默认使用国际化配置
    * @en Configuration for start placeholder.
   */
  startPlaceholder: {
    type: String,
  },
  /**
   * 时间范围结束占位内容，默认使用国际化配置
    * @en Configuration for end placeholder.
   */
  endPlaceholder: {
    type: String,
  },
  /**
   * 在隐藏后是否销毁面板
    * @en Configuration for destroy on hide.
   */
  destroyOnHide: {
    type: Boolean,
    default: false,
  },
  /**
   * 给 `popover` 的额外参数
   * @en Additional options passed to the popover.
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
  /**
   * 下拉框宽度是否与输入框相同
    * @en Configuration for fit input width.
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: 'fit-content',
  },
  /**
   * 鼠标悬浮后多久显示 popper
   * 仅在 trigger = hover 时有效
    * @en Configuration for hover show delay.
   */
  hoverShowDelay: {
    type: Number,
    default: 200,
  },
  /**
   * 鼠标移出后后多久隐藏 popper
   * 仅在 trigger = hover 时有效
    * @en Configuration for hover hide delay.
   */
  hoverHideDelay: {
    type: Number,
    default: 0,
  },
  /**
   * 输入框是否允许输入
    * @en Configuration for inputable.
   */
  inputable: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认输入的方式，默认按回车确认输入值
   * 如果传入 `'blur'`，会在失焦或按下回车时确认输入值
    * @en Configuration for confirm type.
   */
  confirmType: {
    type: String as PropType<'enter' | 'blur'>,
    default: 'enter',
  },
  /**
   * 在范围选择时，确认用户输入的方式，默认按回车确认输入值
   * 如果传入 `'blur'`，会在失焦或按下回车时确认输入值
    * @en Configuration for time picker confirm type.
   */
  timePickerConfirmType: {
    type: String as PropType<'enter' | 'blur'>,
    default: 'enter',
  },
  /**
   * 是否只读
    * @en Configuration for readonly.
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 选项列表最大高度
    * @en Configuration for option list max height.
   */
  optionListMaxHeight: {
    type: [String, Number],
    default: '256',
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
    * @en Configuration for tooltip show after.
   */
  tooltipShowAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
    * @en Configuration for tooltip hide after.
   */
  tooltipHideAfter: {
    type: Number,
    default: 0,
  },
  /**
   * 时间选择框宽度尺寸
    * @en Configuration for panel width.
   */
  panelWidth: {
    type: String,
  },
  /**
   * 在范围选择时，是否只渲染一个面板
    * @en Configuration for single panel.
   */
  singlePanel: {
    type: Boolean,
    default: false,
  },
  /**
   * 在范围选择时，是否只渲染一个触发器
    * @en Configuration for single trigger.
   */
  singleTrigger: {
    type: Boolean,
    default: false,
  },
  /**
   * 时间范围选择起止隔符
    * @en Configuration for range separator.
   */
  rangeSeparator: {
    type: [String, Object] as PropType<string | Component | VNode>,
    default: IconSwapRight,
  },
  /**
   * 时间范围选择面板起止隔符
    * @en Configuration for range panel separator.
   */
  rangePanelSeparator: {
    type: [String, Object] as PropType<string | Component | VNode>,
    default: '-',
  },
  /**
   * 时间步长，单位为分钟，在 `type = 'time'` 时有效
    * @en Configuration for time step.
   */
  timeStep: {
    type: Number,
    default: 30,
  },
  /**
   * 小时步长，在 `type = 'minutes' or 'seconds'` 时有效
    * @en Configuration for hour step.
   */
  hourStep: {
    type: Number,
    default: 1,
  },
  /**
   * 分钟步长，在 `type = 'minutes' or 'seconds'` 时有效
    * @en Configuration for minute step.
   */
  minuteStep: {
    type: Number,
    default: 1,
  },
  /**
   * 秒步长，在 `type = 'seconds'` 时有效
    * @en Configuration for second step.
   */
  secondStep: {
    type: Number,
    default: 1,
  },
  /**
   * 开始时间
    * @en Configuration for time start at.
   */
  timeStartAt: {
    type: String,
    default: '00:00:00',
  },
  /**
   * 结束时间
    * @en Configuration for time end at.
   */
  timeEndAt: {
    type: String,
    default: '23:59:59',
  },
  /**
   * 设置禁选日期
   * 详见类型定义
    * @en Configuration for disabled date.
   */
  disabledDate: {
    type: Function as PropType<HDatePickerDisabledDateMethodType>,
  },
  /**
   * 设置禁选时间
   * 详见类型定义
    * @en Configuration for disabled time.
   */
  disabledTime: {
    type: Function as PropType<HDatePickerDisabledTimeMethodType>,
  },
  /**
   * 在时间范围选择时，设置开始的禁选时间
    * @en Configuration for begin disabled time.
   */
  beginDisabledTime: {
    type: Function as PropType<HDatePickerDisabledTimeMethodType>,
  },
  /**
   * 在时间范围选择时，设置结束的禁选时间
    * @en Configuration for end disabled time.
   */
  endDisabledTime: {
    type: Function as PropType<HDatePickerDisabledTimeMethodType>,
  },
  /**
   * 弹出层样式
    * @en Configuration for panel style.
   */
  panelStyle: {
    type: [String, Object] as PropType<CSSProperties>,
  },
  /**
   * 弹出层类名
    * @en Configuration for panel class.
   */
  panelClass: {
    type: String,
  },
  /**
   * 输入框显示值的格式，默认根据 `type` 自动设置
    * @en Configuration for format.
   */
  format: {
    type: String,
  },
  /**
   * 绑定值的格式，不指定则使用 `Dayjs` 对象
    * @en Configuration for value format.
   */
  valueFormat: {
    type: String,
  },
  /**
   * 前缀图标
   * 在 `input-style = 'normal' or 'emphasize'` 时，默认 `IconTime`
   * 在 `input-style = 'no-border` 时，默认 `false`
    * @en Configuration for prefix icon.
   */
  prefixIcon: {
    type: IconMaybeFalsyPropType,
    default: undefined,
  },
  /**
   * 后缀图标
    * @en Configuration for suffix icon.
   */
  suffixIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /**
   * 清空图标
    * @en Configuration for clear icon.
   */
  clearIcon: {
    type: IconPropType,
    default: IconClose,
  },
  /**
   * 当显示位置的空间不够时 设置时间面板的默认显示位置顺序
    * @en Configuration for fallback placements.
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
    * @en Configuration for prevent overflow.
   */
  preventOverflow: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义日期单元格文案
   * @param type 面板类型
   * @paramEn type The type value.
   * @param value 当前单元格日期
   * @paramEn value The value value.
   * @param rawText 原始展示文字
   * @paramEn rawText The raw text value.
   * @return 如果不更改，返回 undefined | null 即可
    * @en Configuration for format date cell text.
   */
  formatDateCellText: {
    type: Function as PropType<
      (type: 'year' | 'month' | 'day', value: Dayjs, rawText: string) => string
    >,
    required: false,
  },
  /**
   * 自定义时间单元格文案
    * @en Configuration for format time cell text.
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
   * @paramEn value The value value.
   * @param text 原本展示文字，如果是范围选择且有两个输入框，则是数组
   * @paramEn text The text value.
   * @return 展示的文字。如果是范围选择且有两个输入框，则需要返回数组，否则直接返回字符串
    * @en Configuration for format trigger text.
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
    * @en Configuration for need confirm.
   */
  needConfirm: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认按钮文本，默认使用国际化配置
    * @en Configuration for confirm button text.
   */
  confirmButtonText: {
    type: String,
  },
  /**
   * 展示取消按钮
    * @en Configuration for show cancel button.
   */
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 取消按钮文本，默认使用国际化配置
    * @en Configuration for cancel button text.
   */
  cancelButtonText: {
    type: String,
  },
  /**
   * 确认按钮的属性设置
    * @en Configuration for confirm button props.
   */
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
  /**
   * 取消按钮的属性设置
    * @en Configuration for cancel button props.
   */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
  /**
   * 输入框状态
    * @en Configuration for input status.
   */
  inputStatus: {
    type: String as PropType<'error'>,
    required: false,
  },
  /**
   * 时间范围时，前后时间是否联动，即前时间小于后时间，大于后时间的时间不可选
    * @en Configuration for is link panels.
   */
  isLinkPanels: {
    type: Boolean,
    default: true,
  },
  /**
   * 在面板底部显示【此刻】
    * @en Configuration for show now.
   */
  showNow: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示非当前面板所在年、月、日的日期格子
   * 对于 `year` `yearRange` `week` 强制显示
    * @en Configuration for show before after date.
   */
  showBeforeAfterDate: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在悬浮时显示日期
    * @en Configuration for hover to display value.
   */
  hoverToDisplayValue: {
    type: Boolean,
    default: true,
  },
  /**
   * 快捷选项
    * @en Configuration for shortcuts.
   */
  shortcuts: {
    type: Array as PropType<HDatePickerShortcutsType[]>,
  },
  /**
   * 是否固定显示6行日期
    * @en Configuration for fixed six rows.
   */
  fixedSixRows: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许在日期面板上显示年的切换按钮
    * @en Configuration for show year button.
   */
  showYearButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 日期格子显示提示文字的方法
    * @en Configuration for show date tooltip.
   */
  showDateTooltip: {
    type: Function as PropType<HDatePickerShowDateTooltipType>,
  },
  /**
   * 月格子显示提示文字的方法
    * @en Configuration for show month tooltip.
   */
  showMonthTooltip: {
    type: Function as PropType<HDatePickerShowDateTooltipType>,
  },
  /**
   * 年格子显示提示文字的方法
    * @en Configuration for show year tooltip.
   */
  showYearTooltip: {
    type: Function as PropType<HDatePickerShowDateTooltipType>,
  },
  /**
   * 时间格子显示提示文字的方法
    * @en Configuration for show time tooltip.
   */
  showTimeTooltip: {
    type: Function as PropType<HDatePickerShowTimeTooltipType>,
  },
  /**
   * 面板展示的日期，默认为当前日期
   * 如果是 `string` 类型，可以无需考虑国际化问题，即填写 `YYYY-MM-DD` 格式的字符串即可
   * 类型详见【类型定义】
    * @en Configuration for panel show date.
   */
  panelShowDate: {
    type: [String, Number, Object, Array] as PropType<
      | HDatePickerAccessDatetimeType
      | [HDatePickerAccessDatetimeType, HDatePickerAccessDatetimeType]
    >,
  },
  /**
   * 默认时间
   * 如果是 `string` 类型，则格式为 `HH:mm:ss` 或 `HH:mm`
    * @en Configuration for default time.
   */
  defaultTime: {
    type: [String, Number, Object, Array] as PropType<
      | HDatePickerAccessDatetimeType
      | [HDatePickerAccessDatetimeType, HDatePickerAccessDatetimeType]
    >,
  },
  /**
   * 是否在日期格子下显示圆点标识
    * @en Configuration for show dot.
   */
  showDot: {
    type: Function as PropType<HDatePickerShowDotType>,
  },
  /**
   * 弹窗最小宽度
   * 普通选择: 160
   * 范围选择: 180
    * @en Configuration for panel min width.
   */
  panelMinWidth: {
    type: [String, Number],
  },
  /**
   * 弹窗最大宽度
    * @en Configuration for panel max width.
   */
  panelMaxWidth: {
    type: [String, Number],
    default: 'fit-content',
  },
  /**
   * 输入框最小宽度
    * @en Configuration for picker min width.
   */
  pickerMinWidth: {
    type: [String, Number],
  },
  /**
   * 输入框最大宽度
    * @en Configuration for picker max width.
   */
  pickerMaxWidth: {
    type: [String, Number],
  },
  /**
   * 一周开始的星期
   * 0为周日
    * @en Configuration for first day of week.
   */
  firstDayOfWeek: {
    type: Number as PropType<0 | 1 | 2 | 3 | 4 | 5 | 6>,
    default: 0,
  },
  /**
   * 是否显示头部
    * @en Configuration for show header.
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * 默认值
   * 可以在清空时，指定为 null
   * 默认为 undefined
    * @en Configuration for initial value.
   */
  initialValue: {
    type: Object as PropType<null>,
    default: undefined,
  },
  /**
   * 是否仅展示弹窗内容
    * @en Configuration for show popover content only.
   */
  showPopoverContentOnly: {
    type: Boolean,
    default: false,
  },
});

export const useDatePickerDatePanelProps = declarePropType({
  /**
   * 开始日期
    * @en Configuration for start date.
   */
  startDate: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 结束日期
    * @en Configuration for end date.
   */
  endDate: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 开始时间
    * @en Configuration for start time.
   */
  startTime: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 结束时间
    * @en Configuration for end time.
   */
  endTime: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 预览日期
    * @en Configuration for preview date.
   */
  previewDate: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 预览时间
    * @en Configuration for preview time.
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 面板展示的日期
    * @en Configuration for start panel show date.
   */
  startPanelShowDate: {
    type: Object as PropType<Dayjs>,
    required: true,
  },
  /**
   * 面板展示的日期
    * @en Configuration for end panel show date.
   */
  endPanelShowDate: {
    type: Object as PropType<Dayjs>,
    required: true,
  },
  /**
   * 禁用之前的时间
    * @en Configuration for disabled before.
   */
  disabledBefore: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 禁用之后的时间
    * @en Configuration for disabled after.
   */
  disabledAfter: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 面板类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'single' | 'start' | 'end'>,
    required: true,
  },
  /**
   * 选择器类型
    * @en Configuration for picker type.
   */
  pickerType: {
    type: String as PropType<'year' | 'month' | 'day'>,
    required: true,
  },
  /**
   * 是否是范围选择器
    * @en Configuration for is range.
   */
  isRange: {
    type: Boolean,
    required: true,
  },
});

export const useDatePickerDatePanelComponentsProps = declarePropType({
  /**
   * 开始日期
    * @en Configuration for start date.
   */
  startDate: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 结束日期
    * @en Configuration for end date.
   */
  endDate: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 开始时间
    * @en Configuration for start time.
   */
  startTime: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 结束时间
    * @en Configuration for end time.
   */
  endTime: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 预览日期
    * @en Configuration for preview date.
   */
  previewDate: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 预览时间
    * @en Configuration for preview time.
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 面板展示的日期
    * @en Configuration for panel show date.
   */
  panelShowDate: {
    type: Object as PropType<Dayjs>,
    required: true,
  },
  /**
   * 禁用之前的时间
    * @en Configuration for disabled before.
   */
  disabledBefore: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 禁用之后的时间
    * @en Configuration for disabled after.
   */
  disabledAfter: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 面板类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'single' | 'start' | 'end'>,
    required: true,
  },
  /**
   * 选择器类型
    * @en Configuration for picker type.
   */
  pickerType: {
    type: String as PropType<'year' | 'month' | 'day'>,
    required: true,
  },
  /**
   * 是否是范围选择器
    * @en Configuration for is range.
   */
  isRange: {
    type: Boolean,
    required: true,
  },
});

export const useDatePickerDatetimeTriggerHeaderProps = declarePropType({
  /**
   * 日期
    * @en Configuration for date.
   */
  date: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 时间
    * @en Configuration for time.
   */
  time: {
    type: Object as PropType<Dayjs | undefined | null>,
  },
  /**
   * 预览时间
    * @en Configuration for preview time.
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 日期占位文字
    * @en Configuration for date placeholder.
   */
  datePlaceholder: {
    type: String,
  },
  /**
   * 时间占位文字
    * @en Configuration for time placeholder.
   */
  timePlaceholder: {
    type: String,
  },
  /**
   * 禁用之前的时间
    * @en Configuration for disabled before.
   */
  disabledBefore: {
    type: Object as PropType<Dayjs | null>,
  },
  /**
   * 禁用之后的时间
    * @en Configuration for disabled after.
   */
  disabledAfter: {
    type: Object as PropType<Dayjs | null>,
  },
  /**
   * 面板类型
    * @en Configuration for type.
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
