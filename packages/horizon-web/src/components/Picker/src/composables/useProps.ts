import type { CSSProperties, ExtractPropTypes, PropType, StyleValue, VNode } from 'vue';
import { declarePropType, isDefined, isNil } from '@aurora/utils';
import { IconMaybeFalsyPropType, IconNullablePropType } from '~/utils/useIcon';
import { IconArrowDown, IconLoadingLine, IconSearch } from '@aurora/icon';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export type ModelValueType =
  | string
  | number
  | boolean
  | object
  | undefined
  | null
  | Array<string | number | boolean | object>;
export type PickerInputStatusType = 'normal' | 'error' | 'warning' | 'success';
export type PickerPanelStatusType = 'normal' | 'empty' | 'loading';
export type PickerStatusType = 'panel-hide' | 'panel-visible' | 'loading' | 'empty';
export type PickerInputStyleType = 'normal' | 'emphasize' | 'no-border';

export const isModelValue = (val: unknown): val is ModelValueType => isDefined(val) || isNil(val);

export const usePickerProps = declarePropType({
  /**
   * 显示在 input 中的内容
   */
  modelValue: {
    type: [String, Object] as PropType<string | null>,
    default: undefined,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否正在加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载中文案，默认为空
   */
  loadingText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 是否可清空输入框
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否启用小箭头
   */
  arrow: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发方式
   * `never`: 即不需要 `popper`
   */
  trigger: {
    type: String as PropType<'hover' | 'click' | 'never'>,
    default: 'click',
  },
  /**
   * 放置位置
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
   * panel 与 input 距离
   */
  distance: {
    type: Number,
    default: 4,
  },
  /**
   * panel 与 input 距离
   */
  skidding: {
    type: Number,
  },
  /**
   * 是否发送到 body 节点
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否可输入
   */
  inputable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只读
   * @version 2.12.6
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 选择器样式
   * `normal`: 基础样式
   * `emphasize`: 面性样式
   * `no-border`: 无边框样式
   */
  inputStyle: {
    type: String as PropType<PickerInputStyleType>,
    default: 'normal',
  },
  /**
   * 尺寸
   * @default 'medium'
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  /**
   * 下拉图标
   */
  dropdownIcon: {
    type: IconMaybeFalsyPropType,
    default: IconArrowDown,
  },
  /**
   * 下拉图标是否自动旋转
   */
  dropdownIconCanTurned: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否保留尾部图标空间
   * 如果不使用 `dropdown-icon` 和 `clearable` 会占用位置
   * 如果这两个值有切换，需要保留空间，防止有空间大小改变
   * @version 2.12.6
   */
  preserveSuffixIconSpace: {
    type: Boolean,
    default: true,
  },
  /**
   * 加载中图标
   */
  loadingIcon: {
    type: IconNullablePropType,
    default: IconLoadingLine,
  },
  /**
   * 选中 `modelValue` 的格式化处理方法
   */
  valueFormat: {
    type: Function as PropType<(modelValue: ModelValueType) => string | VNode>,
  },
  /**
   * 占位符，默认使用国际化配置
   */
  placeholder: {
    type: String,
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
   * @deprecated confirmButtonText
   */
  confirmBtnText: {
    type: String,
  },
  /**
   * 取消按钮文本，默认使用国际化配置
   * @deprecated cancelButtonText
   */
  cancelBtnText: {
    type: String,
  },
  /**
   * 确认按钮文本，默认使用国际化配置
   * @version 2.12.6
   */
  confirmButtonText: {
    type: String,
  },
  /**
   * 取消按钮文本，默认使用国际化配置
   * @version 2.12.6
   */
  cancelButtonText: {
    type: String,
  },
  /**
   * 确认按钮的属性设置
   * @version 2.12.6
   */
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
  /**
   * 取消按钮的属性设置
   * @version 2.12.6
   */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
  },
  /**
   * 确认按钮是否禁用
   * @version 2.12.6
   */
  confirmDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认按钮是否禁用
   * @version 2.12.6
   */
  cancelDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认区域是否需要确定按钮
   * @version 2.3.0
   */
  confirmNeedConfirm: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认区域是否需要取消按钮
   * @version 2.3.0
   */
  confirmNeedCancel: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认区域是否需要清空按钮
   * @version 2.3.0
   */
  confirmNeedClear: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认区域尺寸
   * @version 2.3.0
   */
  confirmAreaSize: {
    type: String as PropType<'medium' | 'small'>,
    default: 'medium',
  },
  /**
   * 确认区域 `padding`
   * @version 2.3.0
   */
  confirmAreaPadding: {
    type: [String, Number],
  },
  /**
   * 清空按钮文本，默认使用国际化配置
   * @version 2.3.0
   */
  clearBtnText: {
    type: String,
  },
  /**
   * 面板 class
   */
  panelClass: {
    type: [String, Array] as PropType<string | string[]>,
  },
  /**
   * 面板 style
   */
  panelStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },
  /**
   * 空时显示文字，默认使用国际化配置
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
   * 选择器状态
   */
  inputStatus: {
    type: String as PropType<PickerInputStatusType>,
    default: 'normal',
  },
  /**
   * 面板状态
   */
  panelStatus: {
    type: String as PropType<PickerPanelStatusType>,
    default: 'normal',
  },
  /**
   * 给 popover 的额外参数
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
  /**
   * 下拉框宽度是否与输入框相同
   * `'fit-content'`: 根据内容自适应
   * `true`: 与输入框宽度相同
   * `false`: 使用 `min-width` 设置下拉框的宽度
   * @version 2.3.0 增加 `fit-content`
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: true,
  },
  /**
   * 自定义面板宽度
   * @version 2.4.3
   */
  panelWidth: {
    type: [String, Number],
  },
  /**
   * 自定义面板最小宽度
   * @version 2.12.6
   */
  panelMinWidth: {
    type: [String, Number],
  },
  /**
   * 自定义面板最大宽度
   * @version 2.12.6
   */
  panelMaxWidth: {
    type: [String, Number],
  },
  /**
   * 自定义输入框宽度
   * @version 2.4.3
   */
  pickerWidth: {
    type: [String, Number],
  },
  /**
   * 自定义输入框最小宽度
   * @version 2.12.6
   */
  pickerMinWidth: {
    type: [String, Number],
  },
  /**
   * 自定义输入框最大宽度
   * @version 2.12.6
   */
  pickerMaxWidth: {
    type: [String, Number],
  },
  /**
   * 鼠标悬浮后多久显示 `popper`
   * 仅在 `trigger = hover` 时有效
   */
  hoverShowDelay: {
    type: Number,
    default: 0,
  },
  /**
   * 鼠标移出后后多久隐藏 `popper`
   * 仅在 `trigger = hover` 时有效
   */
  hoverHideDelay: {
    type: Number,
    default: 200,
  },
  /**
   * 是否隐藏 `input` 元素
   */
  hideInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 输入文字是否是搜索
   */
  inputIsSearching: {
    type: Boolean,
    default: false,
  },
  /**
   * `modelValue` 是否视为 `placeholder`
   */
  modelValueRegardAsPlaceholder: {
    type: Boolean,
    default: false,
  },
  /**
   * 弹出层是否可展示
   */
  popperCanBeDisplayed: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否用适应文字长度的 `input`
   */
  useFitContentInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 设置自适应文字长度的 `input` 的最小宽度
   * @version 2.6.0
   */
  fitContentInputMinWidth: {
    type: [String, Number],
    default: 1,
  },
  /**
   * 启用面板上的 `input`
   * 此时所有和输入有关的 `props` 都会启用此 `input`
   */
  usePanelInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 面板上的 `input` 的占位文字
   */
  panelInputPlaceholder: {
    type: String,
  },
  /**
   * 面板上的 `input` 的前置 `icon`
   * @version 2.3.5
   */
  panelInputPrefixIcon: {
    type: IconMaybeFalsyPropType,
  },
  /**
   * 搜索 `icon`
   * 如果不需要搜索 `icon`，则设置为 `false`
   * @version 2.3.0
   */
  searchIcon: {
    type: IconMaybeFalsyPropType,
    default: () => IconSearch,
  },
  /**
   * HTML 的 tabindex
   * @version 2.11.0
   */
  tabIndex: {
    type: Number,
    default: undefined,
  },
  /**
   * 触发器上的前缀图标
   * @version 2.12.6
   */
  pickerPrefixIcon: {
    type: IconMaybeFalsyPropType,
  },
  /**
   * 是否仅展示弹窗内容
   * @version 2.12.13
   */
  showPopoverContentOnly: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在内容为空时隐藏内容
   * @version 2.12.15-alpha.3
   */
  hideContentInnerWhenEmpty: {
    type: Boolean,
    default: false,
  },
});

export const usePickerPureInputProps = declarePropType({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
  },
  readonly: {
    type: Boolean,
  },
  placeholder: {
    type: String,
  },
  style: {
    type: Object as PropType<CSSProperties>,
  },
  tabindex: {
    type: [Number, String],
    default: '0',
  },
  autocomplete: {
    type: String,
  },
  unselectable: {
    type: String as PropType<'on' | 'off'>,
  },
  minWidth: {
    type: [String, Number],
  },
});

export type PickerProps = ExtractPropTypes<typeof usePickerProps>;
export type PickerPureInputProps = ExtractPropTypes<typeof usePickerPureInputProps>;
