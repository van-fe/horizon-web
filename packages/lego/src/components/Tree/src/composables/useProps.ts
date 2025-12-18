import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';
import type {
  NTreeData,
  NTreeExtendsData,
  NTreeFilterMethodType,
  NTreeHighlightMethod,
  NTreeDynamicLoadMethod,
  NTreeNodeDataWithLevel,
  NTreeFilterType,
} from '../utils/types';
import type { InputProps } from '~/components/Input/src/composables/useProps';
import type { BaseTreeData } from '~/utils/useTree/types';
import { IconMaybeFalsyPropType, IconNullablePropType, IconPropType } from '~/utils/useIcon';
import { IconDragForm, IconTriangleRightFilled } from '@nio-fe/icon';
import type Tree from '~/utils/useTree/index';

export const useTreeProps = declarePropType({
  /**
   * @invisible
   * 可能由 tree-select 传入
   */
  treeHelper: {
    type: Object as PropType<Tree<NTreeData, NTreeExtendsData>>,
  },
  /**
   * 树结构数据，具备响应式，在使用中如果你改变了整个变量的引用，将会导致组件的重新渲染
   */
  treeData: {
    type: Array as PropType<NTreeData[]>,
    default: () => [],
  },
  /**
   * 尺寸大小
   * @deprecated size
   */
  itemSize: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
  },
  /**
   * 大小
   * @version 2.3.5
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
  },
  /**
   * 是否将整棵树禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否开启过滤，并进行设置
   * @deprecated filterable / filterMethod / highlightMethod / expandFilteredTree
   */
  filter: {
    type: [Boolean, Object] as PropType<boolean | NTreeFilterType>,
  },
  /**
   * 是否开启过滤
   * @version 2.3.5
   */
  filterable: {
    type: Boolean,
  },
  /**
   * 过滤时是否隐藏子节点
   * @version 2.10.0
   */
  filterToHideChildren: {
    type: Boolean,
    default: true,
  },
  /**
   * 过滤方法
   * @version 2.3.5
   */
  filterMethod: {
    type: Function as PropType<NTreeFilterMethodType>,
  },
  /**
   * 内置输入框过滤的值，可以双向绑定
   * @version 2.12.15-alpha.3
   */
  filterValue: {
    type: String,
  },
  /**
   * 高亮处理方法
   * 需要注意的是，高亮处理方法仅对 treeData 中数据的 `label` 为字符串时处理；如果是一个渲染函数，则直接渲染此函数而不做任何处理
   * @version 2.3.5
   */
  highlightMethod: {
    type: Function as PropType<NTreeHighlightMethod>,
  },
  /**
   * 过滤的输入框的传参
   * @version 2.3.5
   */
  filterInputProps: {
    type: Object as PropType<Partial<InputProps>>,
  },
  /**
   * 过滤输入的文字，用于自定义搜索框时使用
   * @version 2.3.5
   */
  filterInputValue: {
    type: String,
  },
  /**
   * 是否在启用过滤时，隐藏过滤的输入框
   * @version 2.3.5
   */
  hideFilterInput: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否自动展开搜索子树
   * @version 2.3.5
   */
  expandFilteredTree: {
    type: Boolean,
    default: true,
  },
  /**
   * 字段映射
   * 不支持动态修改
   */
  fieldMap: {
    type: Object as PropType<Partial<Record<keyof BaseTreeData, keyof BaseTreeData | string>>>,
  },
  /**
   * 树组件的高度
   * @version 2.3.5; 2.7.0 支持 string
   */
  height: {
    type: [Number, String],
  },
  /**
   * 树组件的最大高度
   * @version 2.3.5; 2.7.0 支持 string
   */
  maxHeight: {
    type: [Number, String],
  },
  /**
   * 是否启用虚拟滚动，需同时配置 `height` 或 `maxHeight`
   * @version 2.3.5
   */
  useVirtualScroll: {
    type: Boolean,
    default: false,
  },
  /**
   * 同 `n-virtual-scroller` 的 `buffer`
   * 如果 `maxHeight` 设置了 `calc` 或 `var` 或带百分比的字符串，需要特别指定这个值
   * @version 2.7.0
   */
  virtualScrollBuffer: {
    type: Number,
  },
  /**
   * 所有有 `tooltip` 的地方，在悬浮后延迟多少毫秒显示 `tooltip`
   * @version 2.3.5
   */
  tooltipShowAfter: {
    type: Number,
    default: 100,
  },
  /**
   * 所有有 `tooltip` 的地方，在显示后延迟多少毫秒移除 `tooltip`
   * @version 2.3.5
   */
  tooltipHideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 展开的节点
   */
  expandValues: {
    type: Array as PropType<Array<string | number>>,
  },
  /**
   * 折叠时 `icon`
   */
  foldIcon: {
    type: IconPropType,
    default: IconTriangleRightFilled,
  },
  /**
   * 展开时 `icon`
   * 如果希望在切换展开折叠时，使用动画顺时针旋转 `90°`，则此处留空即可
   */
  expandIcon: {
    type: IconPropType,
  },
  /**
   * 是否在点击节点的时候展开或者收缩节点，为 false 时，则只有点箭头图标的时候才会展开或者收缩节点
   */
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  /**
   * 前缀 `icon`
   * @version 2.3.5 增加 `svg icon` 对象支持
   */
  prefixIcon: {
    type: IconNullablePropType,
  },
  /**
   * 是否严格的遵循父子不互相关联的做法
   */
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否是多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * 多选上限
   */
  multipleLimit: {
    type: Number,
    default: Infinity,
  },
  /**
   * 选中的树节点
   */
  selectedValues: {
    type: Array as PropType<Array<string | number>>,
  },
  /**
   * 是否在点击节点时选中节点
   * 此配置仅影响多选——只有在点击复选框时才会选中节点
   */
  checkOnClickNode: {
    type: Boolean,
    default: false,
  },
  /**
   * 对于多选：是否在点击叶子节点时进行选择，任意有子级的节点点击仍受 `checkOnClickNode` 控制
   * 对于单选：只有在 `showRadio = true` 时，此配置才有效，否则无论如何都会点击选中
   * @version 2.3.5
   */
  checkOnClickLeaf: {
    type: Boolean,
    default: true,
  },
  /**
   * 选中强调样式
   * @version 2.0.5
   */
  stress: {
    type: Boolean,
    default: false,
  },
  /**
   * 在过滤结果为空时，展示的文字
   * 默认使用国际化
   * @version 2.3.5
   */
  emptyText: {
    type: String,
  },
  /**
   * 动态加载数据方法
   * @deprecated dynamicLoad
   */
  dynamicLoadData: {
    type: Function as PropType<NTreeDynamicLoadMethod>,
  },
  /**
   * 动态加载数据方法
   * @version 2.3.5
   */
  dynamicLoad: {
    type: Function as PropType<NTreeDynamicLoadMethod>,
  },
  /**
   * 是否默认展开全部
   */
  isDefaultExpandAll: {
    type: Boolean,
    default: false,
  },
  /**
   * 展开子节点的时候是否默认展开父节点
   */
  isDefaultExpandParent: {
    type: Boolean,
    default: true,
  },
  /**
   * 根节点 `class` 类名
   */
  rootClassName: {
    type: String,
  },
  /**
   * 根节点 `style` 对象
   */
  rootStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 过滤输入框 `placeholder`
   */
  searchInputPlaceholder: {
    type: String,
  },
  /**
   * 相邻级节点间的水平缩进，单位为像素
   */
  indent: {
    type: Number,
    default: 24,
  },
  /**
   * 是否显示 tooltip
   */
  tooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * 禁用状态下是否可以通过父节点的选中改变禁用节点，默认状态下不受父节点影响
   */
  parentEffectDisabledChild: {
    type: Boolean,
    default: false,
  },
  /**
   * 节点前是否添加 `Checkbox` 复选框，单选场景下默认没有，多选场景下默认添加
   * @deprecated showCheckbox/showRadio
   */
  checkable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 多选时是否使用 `checkbox` 组件
   * @version 2.3.5
   */
  showCheckbox: {
    type: Boolean,
    default: true,
  },
  /**
   * 单选时是否使用 `radio` 组件
   * @version 2.3.5
   */
  showRadio: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否允许拖拽排序
   * @version 2.3.5
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 拖拽的 `icon`
   * 如果不需要则设置 `false`
   * @version 2.3.5
   */
  draggableIcon: {
    type: IconMaybeFalsyPropType,
    default: IconDragForm,
  },
  /**
   * 不允许拖拽的 `icon`
   * 在树数据里设置了 `draggable: false` 时会显示此图标
   * @version latest
   */
  undraggableIcon: {
    type: IconMaybeFalsyPropType,
    default: false,
  },
  /**
   * 拖拽图标是否始终显示
   * 默认只有在鼠标悬浮在节点上时显示
   * @version 2.12.10
   */
  draggableIconAlwaysVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只能在拖拽图标上拖拽
   * @version 2.3.5
   */
  dragOnHandler: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否允许拖拽到叶子节点上并创建子级
   * @version 2.3.5
   */
  dragToLeaf: {
    type: Boolean,
    default: true,
  },
  // /**
  //  * 是否允许更改拖拽节点的父节点
  //  * 即指允许在该节点的父节点下进行排序
  //  * @version 2.12.10
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
   * @version 2.3.5
   */
  beforeDrop: {
    type: Function as PropType<
      (
        current: NTreeNodeDataWithLevel,
        target: NTreeNodeDataWithLevel | null,
        prev: NTreeNodeDataWithLevel | null,
      ) => Awaited<boolean>
    >,
  },
  /**
   * 是否显示连线
   * @version 2.12.4
   */
  showLine: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在开启虚拟滚动时，允许子元素撑开容器
   * @version 2.12.5
   */
  expandWrapperByChildren: {
    type: Boolean,
    default: false,
  },
});

export const useTreeItemProps = declarePropType({
  /**
   * 子节点数据
   */
  value: {
    type: Object as PropType<NTreeExtendsData>,
    required: true,
  },
  /**
   * 相邻级节点间的水平缩进
   */
  indent: {
    type: Number,
    default: 0,
  },
  /**
   * @invisible
   * 是否是影子节点
   * 用于拖拽
   */
  shadow: {
    type: Boolean,
    default: false,
  },
});

export type TreeProps = ExtractPropTypes<typeof useTreeProps>;
export type TreeItemProps = ExtractPropTypes<typeof useTreeItemProps>;
