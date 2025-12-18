import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useScrollbarProps = declarePropType({
  /**
   * 尺寸
   * `medium` 适用于页面、抽屉、弹窗、容器中
   * `small` 适用于下拉弹层、编辑器中
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
    default: 'medium',
  },
  /**
   * 滚动条高度
   */
  height: {
    type: [String, Number],
  },
  /**
   * 滚动条最大高度
   */
  maxHeight: {
    type: [String, Number],
  },
  /**
   * 是否使用原生滚动条
   */
  native: {
    type: Boolean,
    default: false,
  },
  /**
   * 包裹容器的自定义样式
   */
  wrapStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 包裹容器的类名
   */
  wrapClass: {
    type: String,
  },
  /**
   * 视窗容器的自定义样式
   */
  viewStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 视窗容器的类名
   */
  viewClass: {
    type: String,
  },
  /**
   * 是否不响应父级容器的尺寸变化，以减少性能问题
   */
  noResize: {
    type: Boolean,
    default: false,
  },
  /**
   * 视图的元素标签
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * 是否总是显示滚动条
   */
  always: {
    type: Boolean,
    default: false,
  },
  /**
   * 滚动条轨道的最小尺寸
   */
  minSize: {
    type: Number,
    default: 20,
  },
  /**
   * 滚动条轨道层级
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
   * @version 2.12.3
   */
  updateDelay: {
    type: Number,
    default: 400,
  },
  /**
   * 水平滚动条是否可见
   * @version latest
   */
  horizontalVisible: {
    type: Boolean,
    default: true,
  },
  /**
   * 垂直滚动条是否可见
   * @version latest
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
   * @version latest
   */
  trackBeginEndSpacing: {
    type: [Number, Array] as PropType<number | [[number, number], [number, number]]>,
    default: 0,
  },
  /**
   * 是否根据轨道首尾边距判断而禁止滚动
   * @version latest
   */
  preventScrollByTrackBeginEndSpacing: {
    type: Boolean,
    default: true,
  },
  /**
   * 滚动条是否粘性定位
   * @version latest
   */
  trackSticky: {
    type: Boolean,
    default: true,
  },
});

export type ScrollbarProps = ExtractPropTypes<typeof useScrollbarProps>;
