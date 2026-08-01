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
   * @en Configuration for model value.
   */
  modelValue: {
    type: [String, Object] as PropType<string | null>,
    default: undefined,
  },
  /**
   * 是否禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否正在加载中
   * @en Configuration for loading.
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载中文案，默认为空
   * @en Configuration for loading text.
   */
  loadingText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 是否可清空输入框
   * @en Configuration for clearable.
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否启用小箭头
   * @en Configuration for arrow.
   */
  arrow: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发方式
   * `never`: 即不需要 `popper`
   * @en Configuration for trigger.
   */
  trigger: {
    type: String as PropType<'hover' | 'click' | 'never'>,
    default: 'click',
  },
  /**
   * 放置位置
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
   * panel 与 input 距离
   * @en Configuration for distance.
   */
  distance: {
    type: Number,
    default: 4,
  },
  /**
   * panel 与 input 距离
   * @en Configuration for skidding.
   */
  skidding: {
    type: Number,
  },
  /**
   * 是否发送到 body 节点
   * @en Configuration for to body.
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否可输入
   * @en Configuration for inputable.
   */
  inputable: {
    type: Boolean,
    default: false,
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
   * 选择器样式
   * `normal`: 基础样式
   * `emphasize`: 面性样式
   * `no-border`: 无边框样式
   * @en Configuration for input style.
   */
  inputStyle: {
    type: String as PropType<PickerInputStyleType>,
    default: 'normal',
  },
  /**
   * 尺寸
   * @default 'medium'
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
  },
  /**
   * 下拉图标
   * @en Configuration for dropdown icon.
   */
  dropdownIcon: {
    type: IconMaybeFalsyPropType,
    default: IconArrowDown,
  },
  /**
   * 下拉图标是否自动旋转
   * @en Configuration for dropdown icon can turned.
   */
  dropdownIconCanTurned: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否保留尾部图标空间
   * 如果不使用 `dropdown-icon` 和 `clearable` 会占用位置
   * 如果这两个值有切换，需要保留空间，防止有空间大小改变
   * @en Configuration for preserve suffix icon space.
   */
  preserveSuffixIconSpace: {
    type: Boolean,
    default: true,
  },
  /**
   * 加载中图标
   * @en Configuration for loading icon.
   */
  loadingIcon: {
    type: IconNullablePropType,
    default: IconLoadingLine,
  },
  /**
   * 选中 `modelValue` 的格式化处理方法
   * @en Configuration for value format.
   */
  valueFormat: {
    type: Function as PropType<(modelValue: ModelValueType) => string | VNode>,
  },
  /**
   * 占位符，默认使用国际化配置
   * @en Configuration for placeholder.
   */
  placeholder: {
    type: String,
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
   * 确认按钮是否禁用
   * @en Configuration for confirm disabled.
   */
  confirmDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认按钮是否禁用
   * @en Configuration for cancel disabled.
   */
  cancelDisabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认区域是否需要确定按钮
   * @en Configuration for confirm need confirm.
   */
  confirmNeedConfirm: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认区域是否需要取消按钮
   * @en Configuration for confirm need cancel.
   */
  confirmNeedCancel: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认区域是否需要清空按钮
   * @en Configuration for confirm need clear.
   */
  confirmNeedClear: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认区域尺寸
   * @en Configuration for confirm area size.
   */
  confirmAreaSize: {
    type: String as PropType<'medium' | 'small'>,
    default: 'medium',
  },
  /**
   * 确认区域 `padding`
   * @en Configuration for confirm area padding.
   */
  confirmAreaPadding: {
    type: [String, Number],
  },
  /**
   * 清空按钮文本，默认使用国际化配置
   * @en Configuration for clear btn text.
   */
  clearBtnText: {
    type: String,
  },
  /**
   * 面板 class
   * @en Configuration for panel class.
   */
  panelClass: {
    type: [String, Array] as PropType<string | string[]>,
  },
  /**
   * 面板 style
   * @en Configuration for panel style.
   */
  panelStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },
  /**
   * 空时显示文字，默认使用国际化配置
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
   * 选择器状态
   * @en Configuration for input status.
   */
  inputStatus: {
    type: String as PropType<PickerInputStatusType>,
    default: 'normal',
  },
  /**
   * 面板状态
   * @en Configuration for panel status.
   */
  panelStatus: {
    type: String as PropType<PickerPanelStatusType>,
    default: 'normal',
  },
  /**
   * 给 popover 的额外参数
   * @en Configuration for popover options.
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
  /**
   * 下拉框宽度是否与输入框相同
   * `'fit-content'`: 根据内容自适应
   * `true`: 与输入框宽度相同
   * `false`: 使用 `min-width` 设置下拉框的宽度
   * @en Configuration for fit input width.
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: true,
  },
  /**
   * 自定义面板宽度
   * @en Configuration for panel width.
   */
  panelWidth: {
    type: [String, Number],
  },
  /**
   * 自定义面板最小宽度
   * @en Configuration for panel min width.
   */
  panelMinWidth: {
    type: [String, Number],
  },
  /**
   * 自定义面板最大宽度
   * @en Configuration for panel max width.
   */
  panelMaxWidth: {
    type: [String, Number],
  },
  /**
   * 自定义输入框宽度
   * @en Configuration for picker width.
   */
  pickerWidth: {
    type: [String, Number],
  },
  /**
   * 自定义输入框最小宽度
   * @en Configuration for picker min width.
   */
  pickerMinWidth: {
    type: [String, Number],
  },
  /**
   * 自定义输入框最大宽度
   * @en Configuration for picker max width.
   */
  pickerMaxWidth: {
    type: [String, Number],
  },
  /**
   * 鼠标悬浮后多久显示 `popper`
   * 仅在 `trigger = hover` 时有效
   * @en Configuration for hover show delay.
   */
  hoverShowDelay: {
    type: Number,
    default: 0,
  },
  /**
   * 鼠标移出后后多久隐藏 `popper`
   * 仅在 `trigger = hover` 时有效
   * @en Configuration for hover hide delay.
   */
  hoverHideDelay: {
    type: Number,
    default: 200,
  },
  /**
   * 是否隐藏 `input` 元素
   * @en Configuration for hide input.
   */
  hideInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 输入文字是否是搜索
   * @en Configuration for input is searching.
   */
  inputIsSearching: {
    type: Boolean,
    default: false,
  },
  /**
   * `modelValue` 是否视为 `placeholder`
   * @en Configuration for model value regard as placeholder.
   */
  modelValueRegardAsPlaceholder: {
    type: Boolean,
    default: false,
  },
  /**
   * 弹出层是否可展示
   * @en Configuration for popper can be displayed.
   */
  popperCanBeDisplayed: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否用适应文字长度的 `input`
   * @en Configuration for use fit content input.
   */
  useFitContentInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 设置自适应文字长度的 `input` 的最小宽度
   * @en Configuration for fit content input min width.
   */
  fitContentInputMinWidth: {
    type: [String, Number],
    default: 1,
  },
  /**
   * 启用面板上的 `input`
   * 此时所有和输入有关的 `props` 都会启用此 `input`
   * @en Configuration for use panel input.
   */
  usePanelInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 面板上的 `input` 的占位文字
   * @en Configuration for panel input placeholder.
   */
  panelInputPlaceholder: {
    type: String,
  },
  /**
   * 面板上的 `input` 的前置 `icon`
   * @en Configuration for panel input prefix icon.
   */
  panelInputPrefixIcon: {
    type: IconMaybeFalsyPropType,
  },
  /**
   * 搜索 `icon`
   * 如果不需要搜索 `icon`，则设置为 `false`
   * @en Configuration for search icon.
   */
  searchIcon: {
    type: IconMaybeFalsyPropType,
    default: () => IconSearch,
  },
  /**
   * HTML 的 tabindex
   * @en Configuration for tab index.
   */
  tabIndex: {
    type: Number,
    default: undefined,
  },
  /**
   * 触发器上的前缀图标
   * @en Configuration for picker prefix icon.
   */
  pickerPrefixIcon: {
    type: IconMaybeFalsyPropType,
  },
  /**
   * 是否仅展示弹窗内容
   * @en Configuration for show popover content only.
   */
  showPopoverContentOnly: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在内容为空时隐藏内容
   * @en Configuration for hide content inner when empty.
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
