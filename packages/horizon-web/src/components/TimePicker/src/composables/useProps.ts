import type { Component, CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType, IconPropType } from '~/utils/useIcon';
import { IconClose, IconSwapRight } from '@aurora/icon';
import type {
  NTimePickerDisabledTimeMethodType,
  NTimePickerShowTimeTooltipType,
} from '../utils/types';
import type { ConfigType, Dayjs } from 'dayjs';

export const useTimePickerProps = declarePropType({
  /**
   * 双向绑定值
   */
  modelValue: {
    type: [Date, String, Number, Object, Array] as PropType<ConfigType | [ConfigType, ConfigType]>,
  },
  /**
   * 面板类型
   * `time`：只显示到 时
   * `minutes`：只显示到 分
   * `seconds`：只显示到 秒
   */
  type: {
    type: String as PropType<'time' | 'minutes' | 'seconds'>,
    default: 'minutes',
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
    type: String as PropType<'click' | 'hover' | 'never'>,
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
   * 空状态文字，默认使用国际化配置
   */
  emptyText: {
    type: [String, Object] as PropType<string | VNode>,
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
    default: 296,
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
   * 是否为时间范围选择
   */
  isRange: {
    type: Boolean,
    default: false,
  },
  /**
   * 在时间范围选择时，是否只渲染一个触发器
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
    default: IconSwapRight,
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
  startAt: {
    type: String,
    default: '00:00:00',
  },
  /**
   * 结束时间
   */
  endAt: {
    type: String,
    default: '23:59:59',
  },
  /**
   * 设置禁选时间
   * 详见类型定义
   */
  disabledTime: {
    type: Function as PropType<NTimePickerDisabledTimeMethodType>,
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
   * 时间单元格是否展示tooltip，参数为当前时间 `Dayjs` 对象，返回对象：show是否展示，content展示内容
   */
  showTimeTooltip: {
    type: Function as PropType<NTimePickerShowTimeTooltipType>,
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
    default: false,
  },
  /**
   * 自定义单元格文案
   */
  formatCellText: {
    type: Function as PropType<
      (type: 'hours' | 'minutes' | 'seconds' | 'time', value: string) => string
    >,
    required: false,
  },
  /**
   * 自定义触发器文案
   */
  formatTriggerText: {
    type: Function as PropType<(value: Dayjs, text: string) => string>,
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
   * 时间框宽度
   */
  width: {
    type: [String, Number],
  },
  /**
   * 时间选择框宽度尺寸
   */
  panelWidth: {
    type: [String, Number],
  },
  /**
   * 弹窗最小宽度
   */
  panelMinWidth: {
    type: [String, Number],
    default: 273,
  },
  /**
   * 弹窗最大宽度
   */
  panelMaxWidth: {
    type: [String, Number],
    default: 360,
  },
  /**
   * 输入框最小宽度
   * 普通选择: 160
   * 范围选择: 180
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
   * 是否在悬浮时显示时间
   */
  hoverToDisplayValue: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否保留后缀 icon 的空间
   * @invisible 内部使用
   */
  preserveSuffixIconSpace: {
    type: Boolean,
    default: true,
  },
  /**
   * 预览时间
   * @invisible date-picker 内部使用
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
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

export const useTimePickerTimePanelProps = declarePropType({
  /**
   * 输入值
   */
  modelValue: {
    type: [Date, String, Number, Object] as PropType<Dayjs | null>,
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
    type: String as PropType<'start' | 'end'>,
  },
  /**
   * 日期类型
   */
  dateType: {
    type: String as PropType<TimePickerProps['type']>,
    required: true,
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
  startAt: {
    type: String,
    default: '00:00:00',
  },
  /**
   * 结束时间
   */
  endAt: {
    type: String,
    default: '23:59:59',
  },
  /**
   * 选项列表最大高度
   */
  optionListMaxHeight: {
    type: [String, Number],
  },
  /**
   * 自定义单元格文案
   */
  formatCellText: {
    type: Function as PropType<
      (type: 'hours' | 'minutes' | 'seconds' | 'time', value: string) => string
    >,
  },
  /**
   * 设置禁选时间
   * 详见类型定义
   */
  disabledTime: {
    type: Function as PropType<NTimePickerDisabledTimeMethodType>,
  },
  /**
   * 面板是否可见
   */
  panelVisible: {
    type: Boolean,
    required: true,
  },
  /**
   * 显示时间提示文字方法
   */
  showTimeTooltip: {
    type: Function as PropType<NTimePickerShowTimeTooltipType>,
  },
  /**
   * 预览时间
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
   */
  tooltipShowAfter: {
    type: Number,
    required: true,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
   */
  tooltipHideAfter: {
    type: Number,
    required: true,
  },
  /**
   * 是否在点击前一列时，自动确认后面的时间列的时间
   * 主要提供给 date-picker 使用
   */
  confirmRestTimeColumnWhenClickPrev: {
    type: Boolean,
    default: false,
  },
});

export type TimePickerProps = ExtractPropTypes<typeof useTimePickerProps>;
export type TimePickerTimePanelProps = ExtractPropTypes<typeof useTimePickerTimePanelProps>;
