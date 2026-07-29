import type { ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { TagProps } from '~/components/Tag/src/composables/useProps';
import { IconMaybeFalsyPropType, IconPropType } from '~/utils/useIcon';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import type { PickerInputStatusType } from '~/components/Picker/src/composables/useProps';
import type {
  HCascaderOption,
  HCascaderExtendOption,
  ModelValueType,
  HCascaderDynamicLoadNode,
  HCascaderSearchParams,
  HCascaderFilterFunction,
  HCascaderFilterSortFunction,
} from '../utils/types';
import { IconCheck } from '@aurora/icon';
import type { LoadingOptions } from '~/directives/v-loading/src/composables/useOptions';

/**
 * Cascader 组件参数
 */
export const useCascaderProps = declarePropType({
  /**
   * 选中项绑定的值
    * @en Configuration for model value.
   */
  modelValue: {
    type: Array as PropType<ModelValueType>,
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
   * 是否支持清除
    * @en Configuration for clearable.
   */
  clearable: {
    type: Boolean,
    default: false,
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
   * 是否折叠
   * @deprecated collapseTags
    * @en Configuration for collapse.
   */
  collapse: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 是否折叠
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
   * 选中项的展示方式
   * `'fullPath'`: 会展示完整的层级
   * `'leaf'`: 只展示叶子节点
    * @en Configuration for show checked strategy.
   */
  showCheckedStrategy: {
    type: String as PropType<'fullPath' | 'leaf'>,
    default: 'fullPath',
  },
  /**
   * 路径分隔符，用于在 input 中展示
    * @en Configuration for path separator.
   */
  pathSeparator: {
    type: String,
    default: '/',
  },
  /**
   * 是否严格的遵守父子节点**不互相关联**
   * `true`: 不相互关联，即可以点选任意节点
   * `false`: 相互关联，只能点选到叶子节点
    * @en Configuration for check strictly.
   */
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  /**
   * 在开启了 `checkStrictly` 后，选择非叶子节点后，是否严格的遵守父子节点**不互相关联**进行展开
   * `true`: 不进行传递展开
   * `false`: 会展开当前非叶子节点的子级
    * @en Configuration for expand strictly.
   */
  expandStrictly: {
    type: Boolean,
    default: true,
  },
  /**
   * 占位内容
    * @en Configuration for placeholder.
   */
  placeholder: {
    type: String,
  },

  /**
   * 触发器尺寸
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    required: false,
  },

  /**
   * 触发器样式
    * @en Configuration for cascader style.
   */
  cascaderStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'noborder'>,
  },

  /**
   * 触发器样式
    * @en Configuration for input style.
   */
  inputStyle: {
    type: String as PropType<'normal' | 'emphasize' | 'no-border'>,
    default: 'normal',
  },

  /**
   * 作用在 popper 上的自定义 class name
    * @en Configuration for popper class name.
   */
  popperClassName: {
    type: String,
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
   * 给 popover 的额外参数
    * @en Configuration for popover options.
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },

  /**
   * 默认值，可以在 `modelValue` 为空时，自动赋值一个指定值
    * @en Configuration for initial value.
   */
  initialValue: {
    type: [Array, null, Symbol] as PropType<Array<string | number> | null | undefined | symbol>,
    default: () => [],
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
   * 是否将 popper 渲染到 body 上
    * @en Configuration for to body.
   */
  toBody: {
    type: Boolean,
    default: true,
  },

  /**
   * 触发器最大高度
    * @en Configuration for max height.
   */
  maxHeight: {
    type: [String, Number],
    default: 256,
  },
  /**
   * 可选数据源，具体字段见 HCascaderOption 参数说明
    * @en Configuration for options.
   */
  options: {
    type: Array as PropType<HCascaderOption[]>,
    required: true,
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
   * 多选限制数量
    * @en Configuration for multiple limit.
   */
  multipleLimit: {
    type: Number,
    default: Infinity,
  },

  /**
   * 次级菜单展开方式
    * @en Configuration for expand trigger.
   */
  expandTrigger: {
    type: String as PropType<'hover' | 'click'>,
    default: 'click',
  },

  /**
   * 次级菜单展开图标，一般传入 icon name
    * @en Configuration for expand icon.
   */
  expandIcon: {
    type: IconPropType,
    required: false,
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
   * 动态加载 options
    * @en Configuration for dynamic load.
   */
  dynamicLoad: {
    type: Function as PropType<(node: HCascaderDynamicLoadNode) => Promise<HCascaderOption[]>>,
  },

  /**
   * 自定义单选场景下选中项图标，只对叶子节点起作用
   * 默认：<AIcon name="check" />
    * @en Configuration for selected icon.
   */
  selectedIcon: {
    type: IconPropType,
    required: false,
  },

  /**
   * 空状态展示文案
   * @deprecated emptyText
    * @en Configuration for empty content.
   */
  emptyContent: {
    type: String,
  },

  /**
   * 空状态展示文案，默认使用国际化
    * @en Configuration for empty text.
   */
  emptyText: {
    type: String,
  },

  /**
   * 是否使用过滤功能
   * SearchParams 具体类型见下表
    * @en Configuration for filter.
   */
  filter: {
    type: [Object, Boolean] as PropType<boolean | HCascaderSearchParams>,
    default: false,
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
    type: Function as PropType<HCascaderFilterFunction>,
  },

  /**
   * 设置触发器为可输入状态，当 filter 不为 false 时，该属性会失效，输入之后会触发 input 事件，通常可以用于自定义 option 筛选的场景
    * @en Configuration for input able.
   */
  inputAble: {
    type: Boolean,
    default: false,
  },

  /**
   * search panel 宽度
    * @en Configuration for search panel width.
   */
  searchPanelWidth: {
    type: [Number, String] as PropType<string | number>,
    default: '',
  },

  /**
   * 确认选中
   * @deprecated needConfirm
    * @en Configuration for confirm.
   */
  confirm: {
    type: [Boolean, Object] as PropType<
      | boolean
      | {
          enterName: string;
          cancelName: string;
        }
    >,
    default: undefined,
  },
  /**
   * 是否需要确认选中
    * @en Configuration for need confirm.
   */
  needConfirm: {
    type: Boolean,
    default: false,
  },
  /**
   * 确认按钮文字，默认使用国际化
   * @deprecated confirmButtonText
    * @en Configuration for confirm btn text.
   */
  confirmBtnText: {
    type: String,
  },
  /**
   * 确认按钮文字，默认使用国际化
    * @en Configuration for confirm button text.
   */
  confirmButtonText: {
    type: String,
  },
  /**
   * 取消按钮文字，默认使用国际化
   * @deprecated cancelButtonText
    * @en Configuration for cancel btn text.
   */
  cancelBtnText: {
    type: String,
  },
  /**
   * 取消按钮文字，默认使用国际化
    * @en Configuration for cancel button text.
   */
  cancelButtonText: {
    type: String,
  },
  /**
   * options 字段映射，给定一个字段映射规则以达到在 option 中覆盖默认指定字段名称的目的
    * @en Configuration for field map.
   */
  fieldMap: {
    type: Object as PropType<
      Partial<Record<keyof HCascaderOption, keyof HCascaderOption | string>>
    >,
  },
  /**
   * 过滤后最大展示结果数量
    * @en Configuration for filter max result.
   */
  filterMaxResult: {
    type: Number,
    default: 50,
  },
  /**
   * 过滤后结果的排序函数
    * @en Configuration for filter result sort.
   */
  filterResultSort: {
    type: Function as PropType<HCascaderFilterSortFunction>,
  },
  /**
   * 是否在选项列表中使用过滤功能
    * @en Configuration for panel filter option.
   */
  panelFilterOption: {
    type: Boolean,
    default: false,
  },

  /**
   * 选项列表过滤的输入框内容
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
   * 单选状态是否显示radio
    * @en Configuration for show radio.
   */
  showRadio: {
    type: Boolean,
    default: false,
  },
  /**
   * 最大单个选项文字宽度,false则不限制
   * todo
    * @en Configuration for max panel item width.
   */
  maxPanelItemWidth: {
    type: [Number, Boolean],
    default: 254,
  },
  /**
   * 当设置了`maxPanelItemWidth`时，是否显示tooltip,`false` 则会自动换行
   * todo
    * @en Configuration for show tooltip.
   */
  showTooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * 弹出位置
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
   * 当原本的显示位置空间不够时，是否允许 popper 显示到对面的位置	boolean
    * @en Configuration for flip.
   */
  flip: {
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
   * 选项的文本超出最大展示行数
    * @en Configuration for option max lines.
   */
  optionMaxLines: {
    type: Number,
    default: 1,
  },
  /**
   * 搜索 `icon`
   * 如果不需要搜索 `icon`，则设置为 `false`
    * @en Configuration for search icon.
   */
  searchIcon: {
    type: IconMaybeFalsyPropType,
    default: () => IconCheck,
  },
  /**
   * 在过滤情况下，下拉框宽度是否与输入框相同
   * 若为
    * @en Configuration for fit input width.
   */
  fitInputWidth: {
    type: [Boolean, String] as PropType<boolean | 'fit-content'>,
    default: true,
  },
  /**
   * 在允许过滤且是多选时，在勾选选项后是否保留输入的文字
   * `true`: 正选反选都保留
   * `false`: 正选反选都不保留
   * `'reserve-deselect'`: 仅在反选时保留
    * @en Configuration for reserve keyword.
   */
  reserveKeyword: {
    type: [Boolean, String] as PropType<boolean | 'reserve-deselect'>,
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
   * 是否在过滤时启用全选功能
    * @en Configuration for use filter check all.
   */
  useFilterCheckAll: {
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
   * 是否使用虚拟滚动
    * @en Configuration for use virtual scroll.
   */
  useVirtualScroll: {
    type: Boolean,
    default: false,
  },
  /**
   * 面板是否处于加载中，也可以传入 `v-loading` 可接受的参数值
    * @en Configuration for panels loading.
   */
  panelsLoading: {
    type: [Boolean, Object] as PropType<boolean | LoadingOptions>,
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
   * 是否在面板中展示选中项的标签
    * @en Configuration for show tags in panel.
   */
  showTagsInPanel: {
    type: Boolean,
    default: false,
  },
});
export type CascaderProps = ExtractPropTypes<typeof useCascaderProps>;

export const useCascaderItemProp = declarePropType({
  /**
   * 值
    * @en Configuration for value.
   */
  value: {
    type: [String, Number],
    required: true,
  },
  /**
   * 展示文字
    * @en Configuration for label.
   */
  label: {
    type: [String, Function] as PropType<string | ((option: HCascaderExtendOption) => VNode)>,
  },
  /**
   * 层级
    * @en Configuration for level.
   */
  level: {
    type: Number,
    default: 0,
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
   * 是否是叶子节点
    * @en Configuration for is leaf.
   */
  isLeaf: {
    type: Boolean,
    default: false,
  },
  /**
   * 转化后的节点信息
    * @en Configuration for extends option.
   */
  extendsOption: {
    type: Object as PropType<HCascaderExtendOption>,
    required: true,
  },
  /**
   * 如果可展开时是否展开
   * @invisible 内部变量
    * @en Configuration for expand.
   */
  expand: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否使用由父级到当前子级的 label 展示
   * @invisible 内部变量
    * @en Configuration for during filter.
   */
  duringFilter: {
    type: Boolean,
    default: undefined,
  },
});

export type CascaderItemProps = ExtractPropTypes<typeof useCascaderItemProp>;
