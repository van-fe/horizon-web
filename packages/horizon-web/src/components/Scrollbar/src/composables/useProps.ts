import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useScrollbarProps = declarePropType({
  /**
   * 尺寸
   * `medium` 适用于页面、抽屉、弹窗、容器中
   * `small` 适用于下拉弹层、编辑器中
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
    default: 'medium',
  },
  /**
   * 滚动条高度
    * @en Configuration for height.
   */
  height: {
    type: [String, Number],
  },
  /**
   * 滚动条最大高度
    * @en Configuration for max height.
   */
  maxHeight: {
    type: [String, Number],
  },
  /**
   * 是否使用原生滚动条
    * @en Configuration for native.
   */
  native: {
    type: Boolean,
    default: false,
  },
  /**
   * 包裹容器的自定义样式
    * @en Configuration for wrap style.
   */
  wrapStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 包裹容器的类名
    * @en Configuration for wrap class.
   */
  wrapClass: {
    type: String,
  },
  /**
   * 视窗容器的自定义样式
    * @en Configuration for view style.
   */
  viewStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 视窗容器的类名
    * @en Configuration for view class.
   */
  viewClass: {
    type: String,
  },
  /**
   * 是否不响应父级容器的尺寸变化，以减少性能问题
    * @en Configuration for no resize.
   */
  noResize: {
    type: Boolean,
    default: false,
  },
  /**
   * 视图的元素标签
    * @en Configuration for tag.
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * 是否总是显示滚动条
    * @en Configuration for always.
   */
  always: {
    type: Boolean,
    default: false,
  },
  /**
   * 滚动条轨道的最小尺寸
    * @en Configuration for min size.
   */
  minSize: {
    type: Number,
    default: 20,
  },
  /**
   * 滚动条轨道层级
    * @en Configuration for z index.
   */
  zIndex: {
    type: [Number, String] as PropType<
      number | 'auto' | 'inherit' | 'initial' | 'unset' | `var(${string})`
    >,
    default: 1,
  },
  /**
   * 更新延迟毫秒
   * 容器有出现动画时需要设置，否则滚动条高度不正确
    * @en Configuration for update delay.
   */
  updateDelay: {
    type: Number,
    default: 400,
  },
  /**
   * 水平滚动条是否可见
    * @en Configuration for horizontal visible.
   */
  horizontalVisible: {
    type: Boolean,
    default: true,
  },
  /**
   * 垂直滚动条是否可见
    * @en Configuration for vertical visible.
   */
  verticalVisible: {
    type: Boolean,
    default: true,
  },
  /**
   * 轨道首尾边距
   * 对于垂直滚动条，是 上下 间距
   * 对于水平滚动条，是 左右 间距
   * 传入数字，即 上下左右 都是此值
   * 传入数组，即按照 [[上，下]，[左，右]] 的顺序
    * @en Configuration for track begin end spacing.
   */
  trackBeginEndSpacing: {
    type: [Number, Array] as PropType<number | [[number, number], [number, number]]>,
    default: 0,
  },
  /**
   * 是否根据轨道首尾边距判断而禁止滚动
    * @en Configuration for prevent scroll by track begin end spacing.
   */
  preventScrollByTrackBeginEndSpacing: {
    type: Boolean,
    default: true,
  },
  /**
   * 滚动条是否粘性定位
    * @en Configuration for track sticky.
   */
  trackSticky: {
    type: Boolean,
    default: true,
  },
});

export type ScrollbarProps = ExtractPropTypes<typeof useScrollbarProps>;
