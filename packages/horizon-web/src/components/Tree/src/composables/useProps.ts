import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type {
  HTreeData,
  HTreeExtendsData,
  HTreeFilterMethodType,
  HTreeHighlightMethod,
  HTreeDynamicLoadMethod,
  HTreeNodeDataWithLevel,
} from '../utils/types';
import type { InputProps } from '~/components/Input/src/composables/useProps';
import type { BaseTreeData } from '~/utils/useTree/types';
import { IconMaybeFalsyPropType, IconNullablePropType, IconPropType } from '~/utils/useIcon';
import { IconDragForm, IconTriangleRightFilled } from '@aurora/icon';
import type Tree from '~/utils/useTree/index';

export const useTreeProps = declarePropType({
  /**
   * @invisible
   * 可能由 tree-select 传入
   * @en Configuration for tree helper.
   */
  treeHelper: {
    type: Object as PropType<Tree<HTreeData, HTreeExtendsData>>,
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
   * 大小
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
  },
  /**
   * 是否将整棵树禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否开启过滤
   * @en Configuration for filterable.
   */
  filterable: {
    type: Boolean,
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
   * 过滤方法
   * @en Configuration for filter method.
   */
  filterMethod: {
    type: Function as PropType<HTreeFilterMethodType>,
  },
  /**
   * 内置输入框过滤的值，可以双向绑定
   * @en Configuration for filter value.
   */
  filterValue: {
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
   * 过滤的输入框的传参
   * @en Configuration for filter input props.
   */
  filterInputProps: {
    type: Object as PropType<Partial<InputProps>>,
  },
  /**
   * 过滤输入的文字，用于自定义搜索框时使用
   * @en Configuration for filter input value.
   */
  filterInputValue: {
    type: String,
  },
  /**
   * 是否在启用过滤时，隐藏过滤的输入框
   * @en Configuration for hide filter input.
   */
  hideFilterInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否自动展开搜索子树
   * @en Configuration for expand filtered tree.
   */
  expandFilteredTree: {
    type: Boolean,
    default: true,
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
   * 树组件的高度
   * @en Configuration for height.
   */
  height: {
    type: [Number, String],
  },
  /**
   * 树组件的最大高度
   * @en Configuration for max height.
   */
  maxHeight: {
    type: [Number, String],
  },
  /**
   * 是否启用虚拟滚动，需同时配置 `height` 或 `maxHeight`
   * @en Configuration for use virtual scroll.
   */
  useVirtualScroll: {
    type: Boolean,
    default: false,
  },
  /**
   * 同 `h-virtual-scroller` 的 `buffer`
   * 如果 `maxHeight` 设置了 `calc` 或 `var` 或带百分比的字符串，需要特别指定这个值
   * @en Configuration for virtual scroll buffer.
   */
  virtualScrollBuffer: {
    type: Number,
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
   * 展开的节点
   * @en Configuration for expand values.
   */
  expandValues: {
    type: Array as PropType<Array<string | number>>,
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
   * 是否是多选
   * @en Configuration for multiple.
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选上限
   * @en Configuration for multiple limit.
   */
  multipleLimit: {
    type: Number,
    default: Infinity,
  },
  /**
   * 选中的树节点
   * @en Configuration for selected values.
   */
  selectedValues: {
    type: Array as PropType<Array<string | number>>,
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
   * 在过滤结果为空时，展示的文字
   * 默认使用国际化
   * @en Configuration for empty text.
   */
  emptyText: {
    type: String,
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
  // /**
  //  * 是否允许更改拖拽节点的父节点
  //  * 即指允许在该节点的父节点下进行排序
  //  */
  // dragToDifferentParent: {
  //   type: Boolean,
  //   default: true,
  // },
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
   * @en Configuration for expand wrapper by children.
   */
  expandWrapperByChildren: {
    type: Boolean,
    default: false,
  },
});

export const useTreeItemProps = declarePropType({
  /**
   * 子节点数据
   * @en Configuration for value.
   */
  value: {
    type: Object as PropType<HTreeExtendsData>,
    required: true,
  },
  /**
   * 相邻级节点间的水平缩进
   * @en Configuration for indent.
   */
  indent: {
    type: Number,
    default: 0,
  },
  /**
   * @invisible
   * 是否是影子节点
   * 用于拖拽
   * @en Configuration for shadow.
   */
  shadow: {
    type: Boolean,
    default: false,
  },
});

export type TreeProps = ExtractPropTypes<typeof useTreeProps>;
export type TreeItemProps = ExtractPropTypes<typeof useTreeItemProps>;
