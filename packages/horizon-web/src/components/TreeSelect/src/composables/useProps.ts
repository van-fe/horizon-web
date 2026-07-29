import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { TagProps } from '~/components/Tag/src/composables/useProps';
import type { PickerInputStatusType } from '~/components/Picker/src/composables/useProps';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';
import { IconMaybeFalsyPropType, IconNullablePropType, IconPropType } from '~/utils/useIcon';
import type {
  HTreeData,
  HTreeDynamicLoadMethod,
  HTreeFilterMethodType,
  HTreeFilterType,
  HTreeHighlightMethod,
  HTreeNodeDataWithLevel,
  HTreeUuidType,
} from '~/components/Tree/src/utils/types';
import { IconCheck, IconDragForm, IconTriangleRightFilled } from '@aurora/icon';
import type { BaseTreeData } from '~/utils/useTree/types';
import type { HTreeSelectModelValueType } from '../utils/types';

export const useTreeSelectProps = declarePropType({
  /**
   * 选中项绑定的值
    * @en Configuration for model value.
   */
  modelValue: {
    type: [Array, String] as PropType<HTreeSelectModelValueType>,
  },
  /**
   * 触发方式
    * @en Configuration for trigger.
   */
  trigger: {
    type: String as PropType<'hover' | 'click'>,
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
   * @deprecated inputStyle
    * @en Configuration for select style.
   */
  selectStyle: {
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
   * 下拉面板高度，也是设置树组件的高度
    * @en Configuration for height.
   */
  height: {
    type: Number,
  },
  /**
   * 下拉面板最大高度，也是设置树组件的最大高度
    * @en Configuration for max height.
   */
  maxHeight: {
    type: [String, Number],
    default: 256,
  },
  /**
   * 是否启用虚拟滚动，需同时配置 `treeHeight` 或 `treeMaxHeight`
    * @en Configuration for use virtual scroll.
   */
  useVirtualScroll: {
    type: Boolean,
    default: false,
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
   * search panel 宽度
    * @en Configuration for search panel width.
   */
  searchPanelWidth: {
    type: [Number, String] as PropType<string | number>,
    default: '',
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
   * 树形面板尺寸
    * @en Configuration for tree size.
   */
  treeSize: {
    type: String as PropType<'large' | 'medium' | 'small' | 'huge'>,
    required: false,
  },
  /**
   * 树形面板宽度
    * @en Configuration for tree width.
   */
  treeWidth: {
    type: String,
  },
  /**
   * 树结构数据，具备响应式，在使用中如果你改变了整个变量的引用，将会导致组件的重新渲染
    * @en Configuration for tree data.
   */
  treeData: {
    type: Array as PropType<HTreeData[]>,
    default: () => [],
  },
  /**
   * 尺寸大小
   * @deprecated size
    * @en Configuration for item size.
   */
  itemSize: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
  },
  /**
   * 是否开启过滤，并进行设置
   * @deprecated filterable
    * @en Configuration for filter.
   */
  filter: {
    type: [Boolean, Object] as PropType<boolean | HTreeFilterType>,
  },
  /**
   * 是否开启过滤
    * @en Configuration for filterable.
   */
  filterable: {
    type: Boolean,
  },
  /**
   * 过滤方法
    * @en Configuration for filter method.
   */
  filterMethod: {
    type: Function as PropType<HTreeFilterMethodType>,
  },
  /**
   * 过滤时是否隐藏子节点
    * @en Configuration for filter to hide children.
   */
  filterToHideChildren: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在选项列表中使用过滤功能
    * @en Configuration for panel filterable.
   */
  panelFilterable: {
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
   * 高亮处理方法
   * 需要注意的是，高亮处理方法仅对 treeData 中数据的 `label` 为字符串时处理；如果是一个渲染函数，则直接渲染此函数而不做任何处理
    * @en Configuration for highlight method.
   */
  highlightMethod: {
    type: Function as PropType<HTreeHighlightMethod>,
  },
  /**
   * 是否自动展开搜索子树
   * 默认为 `true`
    * @en Configuration for expand filtered tree.
   */
  expandFilteredTree: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 字段映射
   * 不支持动态修改
    * @en Configuration for field map.
   */
  fieldMap: {
    type: Object as PropType<Partial<Record<keyof BaseTreeData, keyof BaseTreeData | string>>>,
  },
  /**
   * 展开的节点
    * @en Configuration for expand values.
   */
  expandValues: {
    type: Array as PropType<HTreeUuidType[]>,
  },
  /**
   * 折叠时 `icon`
    * @en Configuration for fold icon.
   */
  foldIcon: {
    type: IconPropType,
    default: IconTriangleRightFilled,
  },
  /**
   * 展开时 `icon`
   * 如果希望在切换展开折叠时，使用动画顺时针旋转 `90°`，则此处留空即可
    * @en Configuration for expand icon.
   */
  expandIcon: {
    type: IconPropType,
  },
  /**
   * 是否在点击节点的时候展开或者收缩节点，为 false 时，则只有点箭头图标的时候才会展开或者收缩节点
    * @en Configuration for expand on click node.
   */
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  /**
   * 前缀 `icon`
    * @en Configuration for prefix icon.
   */
  prefixIcon: {
    type: IconNullablePropType,
  },
  /**
   * 是否严格的遵循父子不互相关联的做法
    * @en Configuration for check strictly.
   */
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  /**
   * 选中的树节点
    * @en Configuration for selected values.
   */
  selectedValues: {
    type: Array as PropType<HTreeUuidType[]>,
    default: () => [],
  },
  /**
   * 是否在点击节点时选中节点
   * 此配置仅影响多选——只有在点击复选框时才会选中节点
    * @en Configuration for check on click node.
   */
  checkOnClickNode: {
    type: Boolean,
    default: false,
  },
  /**
   * 对于多选：是否在点击叶子节点时进行选择，任意有子级的节点点击仍受 `checkOnClickNode` 控制
   * 对于单选：只有在 `showRadio = true` 时，此配置才有效，否则无论如何都会点击选中
    * @en Configuration for check on click leaf.
   */
  checkOnClickLeaf: {
    type: Boolean,
    default: true,
  },
  /**
   * 选中强调样式
    * @en Configuration for stress.
   */
  stress: {
    type: Boolean,
    default: false,
  },
  /**
   * 动态加载数据方法
   * @deprecated dynamicLoad
    * @en Configuration for dynamic load data.
   */
  dynamicLoadData: {
    type: Function as PropType<HTreeDynamicLoadMethod>,
  },
  /**
   * 动态加载数据方法
    * @en Configuration for dynamic load.
   */
  dynamicLoad: {
    type: Function as PropType<HTreeDynamicLoadMethod>,
  },
  /**
   * 是否默认展开全部
    * @en Configuration for is default expand all.
   */
  isDefaultExpandAll: {
    type: Boolean,
    default: false,
  },
  /**
   * 展开子节点的时候是否默认展开父节点
    * @en Configuration for is default expand parent.
   */
  isDefaultExpandParent: {
    type: Boolean,
    default: true,
  },
  /**
   * 根节点 `class` 类名
    * @en Configuration for root class name.
   */
  rootClassName: {
    type: String,
  },
  /**
   * 根节点 `style` 对象
    * @en Configuration for root style.
   */
  rootStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 过滤输入框 `placeholder`
    * @en Configuration for search input placeholder.
   */
  searchInputPlaceholder: {
    type: String,
  },
  /**
   * 相邻级节点间的水平缩进，单位为像素
    * @en Configuration for indent.
   */
  indent: {
    type: Number,
    default: 24,
  },
  /**
   * 是否显示 tooltip
    * @en Configuration for tooltip.
   */
  tooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * 禁用状态下是否可以通过父节点的选中改变禁用节点，默认状态下不受父节点影响
    * @en Configuration for parent effect disabled child.
   */
  parentEffectDisabledChild: {
    type: Boolean,
    default: false,
  },
  /**
   * 节点前是否添加 `Checkbox` 复选框，单选场景下默认没有，多选场景下默认添加
   * @deprecated showCheckbox/showRadio
    * @en Configuration for checkable.
   */
  checkable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 多选时是否使用 `checkbox` 组件
    * @en Configuration for show checkbox.
   */
  showCheckbox: {
    type: Boolean,
    default: true,
  },
  /**
   * 单选时是否使用 `radio` 组件
    * @en Configuration for show radio.
   */
  showRadio: {
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
   * 是否显示连线
    * @en Configuration for show line.
   */
  showLine: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在开启虚拟滚动时，允许子元素撑开容器
   * @deprecated expandPanelByChildren
    * @en Configuration for expand wrapper by children.
   */
  expandWrapperByChildren: {
    type: Boolean,
  },
  /**
   * 是否在开启虚拟滚动时，允许子元素撑开容器
    * @en Configuration for expand panel by children.
   */
  expandPanelByChildren: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许拖拽排序
    * @en Configuration for draggable.
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 拖拽的 `icon`
   * 如果不需要则设置 `false`
    * @en Configuration for draggable icon.
   */
  draggableIcon: {
    type: IconMaybeFalsyPropType,
    default: IconDragForm,
  },
  /**
   * 不允许拖拽的 `icon`
   * 在树数据里设置了 `draggable: false` 时会显示此图标
    * @en Configuration for undraggable icon.
   */
  undraggableIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /**
   * 拖拽图标是否始终显示
   * 默认只有在鼠标悬浮在节点上时显示
    * @en Configuration for draggable icon always visible.
   */
  draggableIconAlwaysVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只能在拖拽图标上拖拽
    * @en Configuration for drag on handler.
   */
  dragOnHandler: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否允许拖拽到叶子节点上并创建子级
    * @en Configuration for drag to leaf.
   */
  dragToLeaf: {
    type: Boolean,
    default: true,
  },
  /**
   * 在放置节点前的回调
   * 可以在此时机拦截节点的移动
   * `current`: 代表当前移动的节点
   * `target`: 代表移动目标，确认后会移动到目标子级下。如果为 `null` ，则代表根节点
   * `prev`: 在确认后，会移动到该节点之后。如果为 `null`，则代表会移动到 `target` 下的第一个节点
    * @en Configuration for before drop.
   */
  beforeDrop: {
    type: Function as PropType<
      (
        current: HTreeNodeDataWithLevel,
        target: HTreeNodeDataWithLevel | null,
        prev: HTreeNodeDataWithLevel | null,
      ) => Awaited<boolean>
    >,
  },
});

export type TreeSelectProps = ExtractPropTypes<typeof useTreeSelectProps>;
