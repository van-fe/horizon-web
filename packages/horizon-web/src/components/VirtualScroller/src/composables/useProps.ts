import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useVirtualScrollerProps = declarePropType({
  /**
   * 用于展示的数据
    * @en Configuration for items.
   */
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true,
  },

  /**
   * 如果项目的高度（或水平模式下的宽度）未知，则使用最小尺寸。
    * @en Configuration for min item size.
   */
  minItemSize: {
    type: [Number, String],
    required: true,
  },

  /**
   * 指定传入items的row-key
    * @en Configuration for key field.
   */
  keyField: {
    type: String,
    default: 'id',
    required: false,
  },

  /**
   * 组件滚动方向, 默认值为 vertical
    * @en Configuration for direction.
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
    required: false,
  },

  /**
   * 自定义滚动容器的元素类型
    * @en Configuration for list tag.
   */
  listTag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div',
    required: false,
  },

  /**
   * 自定义 用来包裹滚动项目的元素类型
    * @en Configuration for item tag.
   */
  itemTag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div',
    required: false,
  },
  /**
   * 尺寸
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
  },

  /**
   * 滚动容器高度
    * @en Configuration for scroller height.
   */
  scrollerHeight: {
    type: [Number, String],
    required: false,
  },

  /**
   * 滚动容器最大高度
    * @en Configuration for scroller max height.
   */
  scrollerMaxHeight: {
    type: [Number, String],
    required: false,
  },
  /**
   * (default: false): 是否开启每次更新虚拟滚动条内容时都会发出“update”事件（可能会影响性能）。
    * @en Configuration for emit update.
   */
  emitUpdate: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * (default: 0):每次更新列表状态后, 对列表重新排序的延迟时间
    * @en Configuration for update interval.
   */
  updateInterval: {
    type: Number,
    default: 0,
    required: false,
  },
  /**
   * (default: 200) 设置可视区域外多少像素, 开始预渲染节点
    * @en Configuration for buffer.
   */
  buffer: {
    type: Number,
    default: 200,
    required: false,
  },
  /**
   * 是否根据子元素的宽高撑开父容器
   * 开启会影响性能，请酌情使用
    * @en Configuration for expand wrapper by children.
   */
  expandWrapperByChildren: {
    type: Boolean,
    default: false,
  },
});

export const useRecycleScrollerProps = declarePropType({
  /**
   * 用于展示的数据
    * @en Configuration for items.
   */
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true,
  },

  /**
   * 指定传入items的row-key
    * @en Configuration for key field.
   */
  keyField: {
    type: String,
    default: 'id',
    required: false,
  },
  /**
   * (default: 'type')用于区分列表中不同种类组件的字段。 对于每种不同的类型，将创建一个回收项目池。
    * @en Configuration for type field.
   */
  typeField: {
    type: String,
    default: 'type',
    required: false,
  },
  /**
   * 用于在可变大小模式下获取项目大小的字段。
    * @en Configuration for size field.
   */
  sizeField: {
    type: String,
    default: 'size',
  },
  /**
   * 页面模式扩展了虚拟滚动器并使用页面视口来计算哪些项目是可见的。 这样，您就可以在前后带有 HTML 元素（如页眉和页脚）的大页面中使用它。
    * @en Configuration for page mode.
   */
  pageMode: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 组件滚动方向, 默认值为 vertical
    * @en Configuration for direction.
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'vertical',
    required: false,
  },

  /**
   * 自定义滚动容器的元素类型
    * @en Configuration for list tag.
   */
  listTag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div',
    required: false,
  },

  /**
   * 自定义 用来包裹滚动项目的元素类型
    * @en Configuration for item tag.
   */
  itemTag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div',
    required: false,
  },

  /**
   * 为 滚动容器 添加样式名称
    * @en Configuration for list class.
   */
  listClass: {
    type: String,
    default: '',
    required: false,
  },

  /**
   * 为每个项目添加样式名称
    * @en Configuration for item class.
   */
  itemClass: {
    type: String,
    default: '',
    required: false,
  },

  /**
   * 网格模式时, 列的数量
    * @en Configuration for grid items.
   */
  gridItems: {
    type: Number,
    default: undefined,
    required: false,
  },

  /**
   * 网格模式时, 单个网格的 宽和高
    * @en Configuration for item size.
   */
  itemSize: {
    type: Number,
    default: null,
    required: false,
  },

  /**
   * 网格模式时, 单个网格的备用尺寸. 他的权重比itemSize高, 可以配合itemSize属性实现宽高不相等的网格
    * @en Configuration for item secondary size.
   */
  itemSecondarySize: {
    type: Number,
    default: undefined,
    required: false,
  },

  /**
   * 如果项目的高度（或水平模式下的宽度）未知，则使用最小尺寸。
    * @en Configuration for min item size.
   */
  minItemSize: {
    type: [Number, String],
    default: null,
    required: false,
  },

  /**
   * (default: 200) 设置可视区域外多少像素, 开始预渲染节点
    * @en Configuration for buffer.
   */
  buffer: {
    type: Number,
    default: 200,
    required: false,
  },

  /**
   * (default: false): 是否开启每次更新虚拟滚动条内容时都会发出“update”事件（可能会影响性能）。
    * @en Configuration for emit update.
   */
  emitUpdate: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * (default: 0):每次更新列表状态后, 对列表重新排序的延迟时间
    * @en Configuration for update interval.
   */
  updateInterval: {
    type: Number,
    default: 0,
    required: false,
  },

  /**
   * (default: false): 是否在hover时 为 item添加hover样式. 如果需要, 请覆盖is-hover来定义具体样式
    * @en Configuration for skip hover.
   */
  skipHover: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 滚动容器高度
    * @en Configuration for scroller height.
   */
  scrollerHeight: {
    type: [Number, String],
    required: false,
  },

  /**
   * 滚动容器最大高度
    * @en Configuration for scroller max height.
   */
  scrollerMaxHeight: {
    type: [Number, String],
    required: false,
  },
  /**
   * 滚动时的额外选项
    * @en Configuration for scroll option.
   */
  scrollOption: {
    type: Object as PropType<ScrollOptions>,
  },
  /**
   * 尺寸
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
  },
  /**
   * 是否根据子元素的宽高撑开父容器
   * 开启会影响性能，请酌情使用
    * @en Configuration for expand wrapper by children.
   */
  expandWrapperByChildren: {
    type: Boolean,
    default: false,
  },
});

export const useVirtualScrollerItemProps = declarePropType({
  /**
   * 数据源, 只能是NVirtualScroller组件default插槽提供的数据
    * @en Configuration for item.
   */
  item: {
    type: Object,
    default: () => ({}),
    required: true,
  },

  /**
   * 开启对item属性的深度监听, 以重新计算尺寸(不推荐, 性能不好)
    * @en Configuration for watch data.
   */
  watchData: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 由RecycleScroller提供, 标记该项目为活动状态.避免不必要的尺寸计算
    * @en Configuration for active.
   */
  active: {
    type: Boolean,
    default: true,
    required: false,
  },

  /**
   * simpleArray模式下, index作为数据主键
    * @en Configuration for index.
   */
  index: {
    type: Number,
    default: undefined,
    required: false,
  },

  /**
   * 指明会影响尺寸变化的字段, 比watchData高效. 此处指定的数据变化会导致尺寸重新计算
    * @en Configuration for size dependencies.
   */
  sizeDependencies: {
    type: Array,
    default: null,
    required: false,
  },

  /**
   * 项目尺寸变化后, 是否发送resize事件
    * @en Configuration for emit resize.
   */
  emitResize: {
    type: Boolean,
    default: false,
    required: false,
  },

  /**
   * 用来渲染VirtualScrollerItem根元素的html类型, 默认为div
    * @en Configuration for tag.
   */
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div',
    required: false,
  },
});

export type VirtualScrollerProps = ExtractPropTypes<typeof useVirtualScrollerProps>;
export type VirtualScrollerItemProps = ExtractPropTypes<typeof useVirtualScrollerItemProps>;
export type RecycleScrollerProps = ExtractPropTypes<typeof useRecycleScrollerProps>;
export interface HRecycleScrollerInstance {
  scrollToItem: (index: number) => void;
  getRootEl: () => HTMLDivElement | null;
}
