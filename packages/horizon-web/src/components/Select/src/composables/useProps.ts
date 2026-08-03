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
   * @en Configuration for model value.
   */
  modelValue: {
    type: [String, Number, Boolean, Array, Object] as PropType<ModelValueType>,
    default: undefined,
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
    default: false,
  },
  /**
   * 触发方式
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
   * 是否发送到 body 节点
   * @en Configuration for to body.
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
   * 选中 `modelValue` 的格式化处理方法
   * @param propsAndAttrs `h-option` 的 props 和 attrs
   * @paramEn propsAndAttrs The props and attrs value.
   * @en Configuration for value format.
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
   * 给 popover 的额外参数
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
    default: true,
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
   * 是否多选
   * @en Configuration for multiple.
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选限制个数
   * @en Configuration for multiple limit.
   */
  multipleLimit: {
    type: Number,
    default: Infinity,
  },
  /**
   * 是否可以筛选
   * @en Configuration for filterable.
   */
  filterable: {
    type: Boolean,
    default: false,
  },
  /**
   * 筛选过滤方法
   * @en Configuration for filter method.
   */
  filterMethod: {
    type: Function as PropType<HSelectFilterFunction>,
  },
  /**
   * 默认过滤方法中，是否同时对 `option.description` 也过滤判断
   * 如果 `option.description` 是 vNode，此设置无效
   * @en Configuration for description filterable.
   */
  descriptionFilterable: {
    type: Boolean,
    default: true,
  },
  /**
   * 在下拉面板中启用过滤，实现需要自己定义
   * **请不要与 `filterable` 同时使用，否则会出现问题**
   * true: 使用默认过滤方法: option.label.toLowerCase() === input.toLowerCase()
   * 函数: input 是输入内容，option 标识每一项的参数（构成为 props & attrs)
   * @en Configuration for panel filter option.
   */
  panelFilterOption: {
    type: [Boolean, Function] as PropType<boolean | HSelectFilterFunction>,
    default: false,
  },
  /**
   * 下拉面板中用来过滤的输入的文字
   * @en Configuration for panel filter input value.
   */
  panelFilterInputValue: {
    type: String,
    default: '',
  },
  /**
   * 是否启用内置的面板过滤组件
   * @en Configuration for use build in panel filter.
   */
  useBuildInPanelFilter: {
    type: Boolean,
    default: false,
  },
  /**
   * 面板输入框的占位文字
   * 默认使用国际化的 "请搜索"
   * @en Configuration for panel input placeholder.
   */
  panelInputPlaceholder: {
    type: String,
  },
  /**
   * 是否允许创建新条目
   * 只有在 `filterable = true` 时才有效
   * @en Configuration for allow create.
   */
  allowCreate: {
    type: Boolean,
    default: false,
  },
  /**
   * 在 `allowCreate` 开启后，是否允许创建新条目
   * @param createValue 当前创建的值
   * @paramEn createValue The create value value.
   * @param optionMap 是所有选项的 Map
   * @paramEn optionMap The option map value.
   * @en Configuration for before create.
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
   * @en Configuration for collapse tags.
   */
  collapseTags: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选模式下，是否悬浮在 +N 上显示选择的内容
   * @en Configuration for collapse tags tooltip.
   */
  collapseTagsTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选模式下，自己控制显示的标签个数，超出这个个数将会被折叠
   * @en Configuration for max collapse tags.
   */
  maxCollapseTags: {
    type: Number,
  },
  /**
   * 尽量让标签填满容器
   * @en Configuration for collapse tags fill up.
   */
  collapseTagsFillUp: {
    type: Boolean,
    default: true,
  },
  /**
   * 折叠的标签的 props，可以自定义 `+N` 的 `tag` 的样式
   * @en Configuration for collapsed tags props.
   */
  collapsedTagsProps: {
    type: Object as PropType<Partial<TagProps>>,
  },
  /**
   * 是否显示选中标识
   * @en Configuration for show selected icon.
   */
  showSelectedIcon: {
    type: Boolean,
    default: false,
  },
  /**
   * 选中标识的图标
   * @en Configuration for selected icon.
   */
  selectedIcon: {
    type: IconPropType,
    default: () => IconCheck,
  },
  /**
   * 是否启用全选功能
   * @en Configuration for use check all.
   */
  useCheckAll: {
    type: Boolean,
    default: false,
  },
  /**
   * 全选后是否只展示 “所有” 的标签
   * @en Configuration for use check all summary.
   */
  useCheckAllSummary: {
    type: Boolean,
    default: false,
  },
  /**
   * 可以自定义在全选后展示的标签文字
   * 默认使用国际化
   * @en Configuration for check all summary text.
   */
  checkAllSummaryText: {
    type: String,
  },
  /**
   * 是否在全选时，统计选择的数量
   * @en Configuration for use check all count.
   */
  useCheckAllCount: {
    type: Boolean,
    default: false,
  },
  /**
   * 全选统计考虑过滤后的数量
   * @en Configuration for check all count consider filter.
   */
  checkAllCountConsiderFilter: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示已选择的选项
   * 设置为 `false` 时，会自动隐藏已选择的选项
   * @en Configuration for selected visible.
   */
  selectedVisible: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义下拉按钮
   * 可以传入 `a-icon` 的 `name`，也可以直接是 `svg`
   * 如果传入 `false`，即不展示图标
   * @en Configuration for dropdown icon.
   */
  dropdownIcon: {
    type: IconMaybeFalsyPropType,
    default: undefined,
  },

  /**
   * 自定义 Select 样式
   * @en Configuration for external select style.
   */
  externalSelectStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },

  /**
   * 自定义 Select class
   * @en Configuration for external select class.
   */
  externalSelectClass: {
    type: String,
    default: '',
  },

  /**
   * 自定义面板样式
   * @en Configuration for external panel style.
   */
  externalPanelStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 自定义面板 class
   * @en Configuration for external panel class.
   */
  externalPanelClass: {
    type: String,
    default: undefined,
  },
  /**
   * 是否启用远程搜索
   * @en Configuration for show search.
   */
  showSearch: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在远程搜索+无选项时，默认隐藏面板
   * @en Configuration for hide panel when show search and empty list.
   */
  hidePanelWhenShowSearchAndEmptyList: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否处于加载中
   * @en Configuration for loading.
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载时自定义文案，默认为空
   * @en Configuration for option loading text.
   */
  optionLoadingText: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 选项的文本超出最大展示行数
   * @en Configuration for option max lines.
   */
  optionMaxLines: {
    type: Number,
    default: 1,
  },
  /**
   * 是否将已选择的选项置顶
   * 只有在重新打开面板时才会排序
   * @en Configuration for selected option order to top.
   */
  selectedOptionOrderToTop: {
    type: Boolean,
    default: false,
  },
  /**
   * 如果没有匹配到 `label` 是否直接展示 `value`
   * @en Configuration for show value un match.
   */
  showValueUnMatch: {
    type: Boolean,
    default: true,
  },
  /**
   * 输入框的状态
   * @en Configuration for input status.
   */
  inputStatus: {
    type: String as PropType<PickerInputStatusType>,
    default: 'normal',
  },
  /**
   * 默认值，可以在 `modelValue` 为空时，自动赋值一个指定值
   * 如果希望设置为 `undefined`，则需要传递一个 `Symbol.for('undefined')`，否则仍会使用默认值
   * @en Configuration for initial value.
   */
  initialValue: {
    type: [Object, String, Number, Array, Boolean, null, Symbol] as PropType<
      object | string | number | Array<any> | boolean | null | symbol
    >,
    default: HSelectInitialValueUndefined,
  },
  /**
   * 是否使用多选统计
   * @en Configuration for use statistic.
   */
  useStatistic: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选统计的前置文字
   * 默认使用国际化（选项）
   * @en Configuration for statistic text.
   */
  statisticText: {
    type: String,
  },
  /**
   * 多选统计是否在悬浮时显示已选项
   * @en Configuration for statistic show tooltip.
   */
  statisticShowTooltip: {
    type: Boolean,
    default: true,
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
   * `h-option` 中 `description` 的位置
   * @en Configuration for description position.
   */
  descriptionPosition: {
    type: String as PropType<'right' | 'bottom'>,
    default: 'right',
  },
  /**
   * 选项集合
   * 虚拟滚动时，会忽略 `slots.default` 插槽的内容，并且对于自定义 `option` 的所有插槽都将不予使用，只会按照 `label` `description` 渲染
   * 虚拟滚动是 `beta` 版，有时会遇到某些元素无法载入而留空的问题
   * `description-position` 无法特殊指定，只能直接在 `h-select` 上设置
   * @en Configuration for options.
   */
  options: {
    type: Array as PropType<
      Array<PartialRequired<Omit<OptionProps, 'maxLines' | 'descriptionPosition'>, 'value'>>
    >,
  },
  /**
   * 只有在传入 `options` 后，才会默认启用虚拟滚动
   * 如果不希望使用虚拟滚动，则传入 `false` 即可
   * @en Configuration for use virtual scroll.
   */
  useVirtualScroll: {
    type: Boolean,
    default: true,
  },
  /**
   * 输入触发事件的频率
   * 请谨慎设置，防止触发过快或过慢导致非预期的问题
   * @en Configuration for input emit frequency.
   */
  inputEmitFrequency: {
    type: Number,
    default: 200,
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
   * 在允许过滤、远程搜索，且是多选时，在勾选选项后是否保留输入的文字
   * `true`: 正选反选都保留
   * `false`: 正选反选都不保留
   * `'reserve-deselect'`: 仅在反选时保留
   * `'reserve-special'`: 不保留关键字，但对过滤的内容仍然保留，只有用户手动清空输入文字或失焦输入框后，才会改变过滤内容
   * @en Configuration for reserve keyword.
   */
  reserveKeyword: {
    type: [Boolean, String] as PropType<boolean | 'reserve-deselect' | 'reserve-special'>,
    default: true,
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
   * @en Configuration for tooltip show after.
   */
  tooltipShowAfter: {
    type: Number,
    default: 100,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
   * @en Configuration for tooltip hide after.
   */
  tooltipHideAfter: {
    type: Number,
    default: 200,
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
   * 是否在开启虚拟滚动时，允许 `option` 撑开面板
   * @en Configuration for expand panel by children.
   */
  expandPanelByChildren: {
    type: Boolean,
    default: false,
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
   * 是否在面板中展示已选标签
   * @en Configuration for show tags in panel.
   */
  showTagsInPanel: {
    type: Boolean,
    default: false,
  },
});

export const useOptionProps = declarePropType({
  /**
   * 是否禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 选项的值
   * @en Configuration for value.
   */
  value: {
    type: [String, Number, Boolean, Object, Symbol],
    required: true,
  },
  /**
   * 选项的展示内容
   * @en Configuration for label.
   */
  label: {
    type: [String, Number] as PropType<string | number>,
  },
  /**
   * 辅助说明文字或 VNode 节点
   * @en Configuration for description.
   */
  description: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 文本超出最大展示行数
   * @en Configuration for max lines.
   */
  maxLines: {
    type: Number,
  },
  /**
   * `h-option` 中 `description` 的位置
   * @en Configuration for description position.
   */
  descriptionPosition: {
    type: String as PropType<'right' | 'bottom'>,
  },
});

export const useOptionGroupProps = declarePropType({
  /**
   * 分组名称
   * 如果不设置此项，则采用分割线进行分组
   * @en Configuration for label.
   */
  label: {
    type: String,
  },

  /**
   * 禁用分组中所有选项
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
  },
});

export type SelectProps = ExtractPropTypes<typeof useSelectProps>;
export type OptionProps = ExtractPropTypes<typeof useOptionProps>;
export type OptionGroupProps = ExtractPropTypes<typeof useOptionGroupProps>;
