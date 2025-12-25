import type { CSSProperties, ExtractPropTypes, PropType, VNode, StyleValue } from 'vue';
import type { Awaitable, PartialRequired } from '@aurora/utils';
import { declarePropType } from '@aurora/utils';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType, IconPropType } from '~/utils/useIcon';
import { IconCheck, IconSearch } from '@aurora/icon';
import type { TagProps } from '~/components/Tag/src/composables/useProps';
import type {
  PickerInputStatusType,
  PickerInputStyleType,
} from '~/components/Picker/src/composables/useProps';
import type {
  ModelValueType,
  ModelValueFormattedType,
  HSelectFilterFunction,
} from '../utils/types';
import { HSelectInitialValueUndefined } from '../utils/types';

export const useSelectProps = declarePropType({
  /**
   * value 值
   */
  modelValue: {
    type: [String, Number, Boolean, Array, Object] as PropType<ModelValueType>,
    default: undefined,
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
    default: false,
  },
  /**
   * 触发方式
   * @version 2.1.0
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
   * 是否发送到 body 节点
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 选择器输入框样式
   * `normal`: 基础样式
   * `emphasize`: 面性样式
   * `no-border`: 无边框样式
   * `noborder`: 请改用 `no-border`
   * @deprecated inputStyle
   */
  selectStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border' | 'noborder'>,
  },
  /**
   * 选择器输入框样式
   * `normal`: 基础样式
   * `emphasize`: 面性样式
   * `no-border`: 无边框样式
   * @version 2.2.0
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
   * 选中 `modelValue` 的格式化处理方法
   * @param propsAndAttrs `n-option` 的 props 和 attrs
   */
  valueFormat: {
    type: Function as PropType<
      (
        propsAndAttrs: Partial<OptionProps> & Record<string, unknown>,
      ) => ModelValueFormattedType & Record<string, unknown>
    >,
  },
  /**
   * 占位符，默认使用国际化配置
   */
  placeholder: {
    type: String,
  },
  /**
   * 是否需要确认
   * @deprecated needConfirm
   */
  needDropdownConfirm: {
    type: Boolean,
    default: undefined,
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
   * @deprecated confirmBtnText
   */
  dropdownConfirmBtnText: {
    type: String,
  },
  /**
   * 确认按钮文本，默认使用国际化配置
   * @deprecated confirmButtonText
   */
  confirmBtnText: {
    type: String,
  },
  /**
   * 确认按钮文本，默认使用国际化配置
   * @version 2.12.8
   */
  confirmButtonText: {
    type: String,
  },
  /**
   * 取消按钮文本，默认使用国际化配置
   * @deprecated confirmBtnText
   */
  dropdownCancelBtnText: {
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
   * 取消按钮文本，默认使用国际化配置
   * @version 2.12.8
   */
  cancelButtonText: {
    type: String,
  },
  /**
   * 空时显示文字，默认使用国际化配置
   * @deprecated emptyText
   */
  optionEmptyText: {
    type: String,
  },
  /**
   * 空时显示文字，默认使用国际化配置
   * @version 2.1.0
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
   * 给 popover 的额外参数
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
  /**
   * 下拉框宽度是否与输入框相同
   * @version 2.0.7
   * @version 2.12.10 支持 fit-content
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: true,
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
   * 是否多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选限制个数
   */
  multipleLimit: {
    type: Number,
    default: Infinity,
  },
  /**
   * 是否可以筛选
   * @version 2.1.0
   */
  filterable: {
    type: Boolean,
    default: false,
  },
  /**
   * 筛选过滤方法
   * @version 2.1.0
   */
  filterMethod: {
    type: Function as PropType<HSelectFilterFunction>,
  },
  /**
   * 默认过滤方法中，是否同时对 `option.description` 也过滤判断
   * 如果 `option.description` 是 vNode，此设置无效
   * @version 2.1.0
   */
  descriptionFilterable: {
    type: Boolean,
    default: true,
  },
  /**
   * 筛选过滤设置
   * false: 不启用过滤
   * true: 使用默认过滤方法: option.label.toLowerCase() === input.toLowerCase()
   * 函数: input 是输入内容，option 标识每一项的参数（构成为 props & attrs)
   * @deprecated filterable / filterMethod
   */
  filterOption: {
    type: [Boolean, Function] as PropType<boolean | HSelectFilterFunction>,
    default: undefined,
  },
  /**
   * 在下拉面板中启用过滤，实现需要自己定义
   * **请不要与 `filterOption` `filterable` 同时使用，否则会出现问题**
   * true: 使用默认过滤方法: option.label.toLowerCase() === input.toLowerCase()
   * 函数: input 是输入内容，option 标识每一项的参数（构成为 props & attrs)
   */
  panelFilterOption: {
    type: [Boolean, Function] as PropType<boolean | HSelectFilterFunction>,
    default: false,
  },
  /**
   * 下拉面板中用来过滤的输入的文字
   */
  panelFilterInputValue: {
    type: String,
    default: '',
  },
  /**
   * 是否启用内置的面板过滤组件
   * @version 2.2.0
   */
  useBuildInPanelFilter: {
    type: Boolean,
    default: false,
  },
  /**
   * 面板输入框的占位文字
   * 默认使用国际化的 "请搜索"
   */
  panelInputPlaceholder: {
    type: String,
  },
  /**
   * 是否允许创建新条目
   * 只有在 `filterable = true` 时才有效
   */
  allowCreate: {
    type: Boolean,
    default: false,
  },
  /**
   * 在 `allowCreate` 开启后，是否允许创建新条目
   * @param createValue 当前创建的值
   * @param optionMap 是所有选项的 Map
   */
  beforeCreate: {
    type: Function as PropType<
      (
        createValue: string,
        optionMap: Map<OptionProps['value'], OptionProps>,
      ) => Awaitable<boolean | void>
    >,
  },
  /**
   * 多选模式下，是否折叠选中项
   * @deprecated collapse-tags
   */
  collapse: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 多选模式下，是否折叠选中项
   * @version 2.1.0
   */
  collapseTags: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选模式下，是否悬浮在 +N 上显示选择的内容
   * @version 2.1.0
   */
  collapseTagsTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选模式下，自己控制显示的标签个数，超出这个个数将会被折叠
   * @version 2.1.0
   */
  maxCollapseTags: {
    type: Number,
  },
  /**
   * 尽量让标签填满容器
   * @version 2.1.0
   * @version 2.4.0 默认开启
   */
  collapseTagsFillUp: {
    type: Boolean,
    default: true,
  },
  /**
   * 折叠的标签的 props，可以自定义 `+N` 的 `tag` 的样式
   * @version 2.1.0
   */
  collapsedTagsProps: {
    type: Object as PropType<Partial<TagProps>>,
  },
  /**
   * 是否显示选中标识
   */
  showSelectedIcon: {
    type: Boolean,
    default: false,
  },
  /**
   * 选中标识的图标
   * @version 2.1.0 支持 Component 对象
   */
  selectedIcon: {
    type: IconPropType,
    default: () => IconCheck,
  },
  /**
   * 是否启用全选功能
   * @version 2.1.0
   */
  useCheckAll: {
    type: Boolean,
    default: false,
  },
  /**
   * 全选后是否只展示 “所有” 的标签
   * @version 2.1.0
   */
  useCheckAllSummary: {
    type: Boolean,
    default: false,
  },
  /**
   * 可以自定义在全选后展示的标签文字
   * 默认使用国际化
   * @version 2.1.0
   */
  checkAllSummaryText: {
    type: String,
  },
  /**
   * 是否在全选时，统计选择的数量
   * @version 2.12.8
   */
  useCheckAllCount: {
    type: Boolean,
    default: false,
  },
  /**
   * 全选统计考虑过滤后的数量
   */
  checkAllCountConsiderFilter: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示已选择的选项
   * 设置为 `false` 时，会自动隐藏已选择的选项
   */
  selectedVisible: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义下拉按钮
   * 可以传入 `a-icon` 的 `name`，也可以直接是 `svg`
   * 如果传入 `false`，即不展示图标
   * @deprecated dropdownIcon
   */
  customSelectIcon: {
    type: IconMaybeFalsyPropType,
    default: undefined,
  },
  /**
   * 自定义下拉按钮
   * 可以传入 `a-icon` 的 `name`，也可以直接是 `svg`
   * 如果传入 `false`，即不展示图标
   * @version 2.1.0
   */
  dropdownIcon: {
    type: IconMaybeFalsyPropType,
    default: undefined,
  },

  /**
   * 自定义 Select 样式
   */
  externalSelectStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },

  /**
   * 自定义 Select class
   */
  externalSelectClass: {
    type: String,
    default: '',
  },

  /**
   * 自定义 Option 面板样式
   * @deprecated externalPanelStyle
   */
  externalOptionStyle: {
    type: Object as PropType<StyleValue>,
  },

  /**
   * 自定义 Option 面板 class
   * @deprecated externalPanelClass
   */
  externalOptionClass: {
    type: String,
    default: undefined,
  },
  /**
   * 自定义面板样式
   * @version 2.2.0
   */
  externalPanelStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 自定义面板 class
   * @version 2.2.0
   */
  externalPanelClass: {
    type: String,
    default: undefined,
  },
  /**
   * 是否启用远程搜索
   */
  showSearch: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在远程搜索+无选项时，默认隐藏面板
   */
  hidePanelWhenShowSearchAndEmptyList: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否处于加载中
   * @deprecated loading
   */
  optionListLoading: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否处于加载中
   * @version 2.2.0
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载时自定义文案，默认为空
   */
  optionLoadingText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 选项的文本超出最大展示行数
   * @version 2.1.0
   */
  optionMaxLines: {
    type: Number,
    default: 1,
  },
  /**
   * 是否将已选择的选项置顶
   * 只有在重新打开面板时才会排序
   */
  selectedOptionOrderToTop: {
    type: Boolean,
    default: false,
  },
  /**
   * 如果没有匹配到 `label` 是否直接展示 `value`
   */
  showValueUnMatch: {
    type: Boolean,
    default: true,
  },
  /**
   * 输入框的状态
   */
  inputStatus: {
    type: String as PropType<PickerInputStatusType>,
    default: 'normal',
  },
  /**
   * 弹出层 `class`
   * @deprecated externalPanelClass
   */
  popperClassName: {
    type: String,
    default: undefined,
  },
  /**
   * 默认值，可以在 `modelValue` 为空时，自动赋值一个指定值
   * 如果希望设置为 `undefined`，则需要传递一个 `Symbol.for('undefined')`，否则仍会使用默认值
   * @version 2.1.0
   */
  initialValue: {
    type: [Object, String, Number, Array, Boolean, null, Symbol] as PropType<
      object | string | number | Array<any> | boolean | null | symbol
    >,
    default: HSelectInitialValueUndefined,
  },
  /**
   * 是否使用多选统计
   * @version 2.1.0
   */
  useStatistic: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选统计的前置文字
   * 默认使用国际化（选项）
   * @version 2.1.0
   */
  statisticText: {
    type: String,
  },
  /**
   * 多选统计是否在悬浮时显示已选项
   * @version 2.12.8
   */
  statisticShowTooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * 选项列表最大高度
   * @version 2.1.0
   */
  optionListMaxHeight: {
    type: [String, Number],
    default: 296,
  },
  /**
   * 是否向下兼容 `2.1.0` 之前版本的 `break-change`
   * 目前涉及到的有：
   * - 多选情况下，取消选择某 `option` 也会触发 `change` 事件
   * - `change` 事件的第二个参数会与当前 `modelValue` 一致，不再只是返回当前变更的 `option.value`
   * @version 2.1.0
   */
  compatibility: {
    type: Boolean,
    default: false,
  },
  /**
   * `n-option` 中 `description` 的位置
   * @version 2.2.0
   */
  descriptionPosition: {
    type: String as PropType<'right' | 'bottom'>,
    default: 'right',
  },
  /**
   * 选项集合
   * 虚拟滚动时，会忽略 `slots.default` 插槽的内容，并且对于自定义 `option` 的所有插槽都将不予使用，只会按照 `label` `description` 渲染
   * 虚拟滚动是 `beta` 版，有时会遇到某些元素无法载入而留空的问题
   * `description-position` 无法特殊指定，只能直接在 `n-select` 上设置
   * @version 2.2.0
   */
  options: {
    type: Array as PropType<
      Array<PartialRequired<Omit<OptionProps, 'maxLines' | 'descriptionPosition'>, 'value'>>
    >,
  },
  /**
   * 只有在传入 `options` 后，才会默认启用虚拟滚动
   * 如果不希望使用虚拟滚动，则传入 `false` 即可
   * @version 2.7.0
   */
  useVirtualScroll: {
    type: Boolean,
    default: true,
  },
  /**
   * 输入触发事件的频率
   * 请谨慎设置，防止触发过快或过慢导致非预期的问题
   * @version 2.2.0
   */
  inputEmitFrequency: {
    type: Number,
    default: 200,
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
   * 在允许过滤、远程搜索，且是多选时，在勾选选项后是否保留输入的文字
   * `true`: 正选反选都保留
   * `false`: 正选反选都不保留
   * `'reserve-deselect'`: 仅在反选时保留
   * `'reserve-special'`: 不保留关键字，但对过滤的内容仍然保留，只有用户手动清空输入文字或失焦输入框后，才会改变过滤内容
   * @version 2.3.0
   */
  reserveKeyword: {
    type: [Boolean, String] as PropType<boolean | 'reserve-deselect' | 'reserve-special'>,
    default: true,
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
   * @version 2.3.0
   */
  tooltipShowAfter: {
    type: Number,
    default: 100,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
   * @version 2.3.0
   */
  tooltipHideAfter: {
    type: Number,
    default: 200,
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
   * 是否在开启虚拟滚动时，允许 `option` 撑开面板
   * @version 2.12.10
   */
  expandPanelByChildren: {
    type: Boolean,
    default: false,
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
   * 是否在面板中展示已选标签
   * @version 2.12.15
   */
  showTagsInPanel: {
    type: Boolean,
    default: false,
  },
});

export const useOptionProps = declarePropType({
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 选项的值
   */
  value: {
    type: [String, Number, Boolean, Object, Symbol],
    required: true,
  },
  /**
   * 选项的展示内容
   */
  label: {
    type: [String, Number] as PropType<string | number>,
  },
  /**
   * 辅助说明文字或 VNode 节点
   * @version 2.1.0
   */
  description: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 文本超出最大展示行数
   */
  maxLines: {
    type: Number,
  },
  /**
   * `n-option` 中 `description` 的位置
   * @version 2.2.0
   */
  descriptionPosition: {
    type: String as PropType<'right' | 'bottom'>,
  },
});

export const useOptionGroupProps = declarePropType({
  /**
   * 分组名称
   * 如果不设置此项，则采用分割线进行分组
   */
  label: {
    type: String,
  },

  /**
   * 禁用分组中所有选项
   */
  disabled: {
    type: Boolean,
  },
});

export type SelectProps = ExtractPropTypes<typeof useSelectProps>;
export type OptionProps = ExtractPropTypes<typeof useOptionProps>;
export type OptionGroupProps = ExtractPropTypes<typeof useOptionGroupProps>;
