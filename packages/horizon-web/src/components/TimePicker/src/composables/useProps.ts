import type { Component, CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType, IconPropType } from '~/utils/useIcon';
import { IconClose, IconSwapRight } from '@aurora/icon';
import type {
  HTimePickerDisabledTimeMethodType,
  HTimePickerShowTimeTooltipType,
} from '../utils/types';
import type { ConfigType, Dayjs } from 'dayjs';

export const useTimePickerProps = declarePropType({
  /**
   * 双向绑定值
    * @en Configuration for model value.
   */
  modelValue: {
    type: [Date, String, Number, Object, Array] as PropType<ConfigType | [ConfigType, ConfigType]>,
  },
  /**
   * 面板类型
   * `time`：只显示到 时
   * `minutes`：只显示到 分
   * `seconds`：只显示到 秒
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'time' | 'minutes' | 'seconds'>,
    default: 'minutes',
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
    type: String as PropType<'click' | 'hover' | 'never'>,
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
   * 空状态文字，默认使用国际化配置
    * @en Configuration for empty text.
   */
  emptyText: {
    type: [String, Object] as PropType<string | VNode>,
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
    * @en Configuration for popover options.
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
    default: 296,
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
   * 是否为时间范围选择
    * @en Configuration for is range.
   */
  isRange: {
    type: Boolean,
    default: false,
  },
  /**
   * 在时间范围选择时，是否只渲染一个触发器
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
    default: IconSwapRight,
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
    * @en Configuration for start at.
   */
  startAt: {
    type: String,
    default: '00:00:00',
  },
  /**
   * 结束时间
    * @en Configuration for end at.
   */
  endAt: {
    type: String,
    default: '23:59:59',
  },
  /**
   * 设置禁选时间
   * 详见类型定义
    * @en Configuration for disabled time.
   */
  disabledTime: {
    type: Function as PropType<HTimePickerDisabledTimeMethodType>,
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
   * 时间单元格是否展示tooltip，参数为当前时间 `Dayjs` 对象，返回对象：show是否展示，content展示内容
    * @en Configuration for show time tooltip.
   */
  showTimeTooltip: {
    type: Function as PropType<HTimePickerShowTimeTooltipType>,
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
    default: false,
  },
  /**
   * 自定义单元格文案
    * @en Configuration for format cell text.
   */
  formatCellText: {
    type: Function as PropType<
      (type: 'hours' | 'minutes' | 'seconds' | 'time', value: string) => string
    >,
    required: false,
  },
  /**
   * 自定义触发器文案
    * @en Configuration for format trigger text.
   */
  formatTriggerText: {
    type: Function as PropType<(value: Dayjs, text: string) => string>,
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
   * 时间框宽度
    * @en Configuration for width.
   */
  width: {
    type: [String, Number],
  },
  /**
   * 时间选择框宽度尺寸
    * @en Configuration for panel width.
   */
  panelWidth: {
    type: [String, Number],
  },
  /**
   * 弹窗最小宽度
    * @en Configuration for panel min width.
   */
  panelMinWidth: {
    type: [String, Number],
    default: 273,
  },
  /**
   * 弹窗最大宽度
    * @en Configuration for panel max width.
   */
  panelMaxWidth: {
    type: [String, Number],
    default: 360,
  },
  /**
   * 输入框最小宽度
   * 普通选择: 160
   * 范围选择: 180
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
   * 是否在悬浮时显示时间
    * @en Configuration for hover to display value.
   */
  hoverToDisplayValue: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否保留后缀 icon 的空间
   * @invisible 内部使用
    * @en Configuration for preserve suffix icon space.
   */
  preserveSuffixIconSpace: {
    type: Boolean,
    default: true,
  },
  /**
   * 预览时间
   * @invisible date-picker 内部使用
    * @en Configuration for preview time.
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
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

export const useTimePickerTimePanelProps = declarePropType({
  /**
   * 输入值
    * @en Configuration for model value.
   */
  modelValue: {
    type: [Date, String, Number, Object] as PropType<Dayjs | null>,
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
    type: String as PropType<'start' | 'end'>,
  },
  /**
   * 日期类型
    * @en Configuration for date type.
   */
  dateType: {
    type: String as PropType<TimePickerProps['type']>,
    required: true,
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
    * @en Configuration for start at.
   */
  startAt: {
    type: String,
    default: '00:00:00',
  },
  /**
   * 结束时间
    * @en Configuration for end at.
   */
  endAt: {
    type: String,
    default: '23:59:59',
  },
  /**
   * 选项列表最大高度
    * @en Configuration for option list max height.
   */
  optionListMaxHeight: {
    type: [String, Number],
  },
  /**
   * 自定义单元格文案
    * @en Configuration for format cell text.
   */
  formatCellText: {
    type: Function as PropType<
      (type: 'hours' | 'minutes' | 'seconds' | 'time', value: string) => string
    >,
  },
  /**
   * 设置禁选时间
   * 详见类型定义
    * @en Configuration for disabled time.
   */
  disabledTime: {
    type: Function as PropType<HTimePickerDisabledTimeMethodType>,
  },
  /**
   * 面板是否可见
    * @en Configuration for panel visible.
   */
  panelVisible: {
    type: Boolean,
    required: true,
  },
  /**
   * 显示时间提示文字方法
    * @en Configuration for show time tooltip.
   */
  showTimeTooltip: {
    type: Function as PropType<HTimePickerShowTimeTooltipType>,
  },
  /**
   * 预览时间
    * @en Configuration for preview time.
   */
  previewTime: {
    type: Object as PropType<Dayjs>,
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
    * @en Configuration for tooltip show after.
   */
  tooltipShowAfter: {
    type: Number,
    required: true,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
    * @en Configuration for tooltip hide after.
   */
  tooltipHideAfter: {
    type: Number,
    required: true,
  },
  /**
   * 是否在点击前一列时，自动确认后面的时间列的时间
   * 主要提供给 date-picker 使用
    * @en Configuration for confirm rest time column when click prev.
   */
  confirmRestTimeColumnWhenClickPrev: {
    type: Boolean,
    default: false,
  },
});

export type TimePickerProps = ExtractPropTypes<typeof useTimePickerProps>;
export type TimePickerTimePanelProps = ExtractPropTypes<typeof useTimePickerTimePanelProps>;
