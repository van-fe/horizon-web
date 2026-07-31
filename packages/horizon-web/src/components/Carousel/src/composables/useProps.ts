import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export type HCarouselDirection = 'horizontal' | 'vertical';
export type HCarouselEffect = 'slide' | 'fade';
export type HCarouselArrow = 'always' | 'hover' | 'never';
export type HCarouselIndicatorPosition = 'inside' | 'outside' | 'none';
export type HCarouselTrigger = 'click' | 'hover';

export const useCarouselProps = declarePropType({
  /**
   * 当前激活项的索引，支持 `v-model`
   * @en Index of the active slide. Supports `v-model`.
   */
  modelValue: {
    type: Number,
    required: false,
  },
  /**
   * 非受控模式下初始激活项的索引
   * @en Initial active slide index in uncontrolled mode.
   */
  initialIndex: {
    type: Number,
    default: 0,
    validator: (value: number) => Number.isInteger(value) && value >= 0,
  },
  /**
   * 走马灯内容区域高度
   * @en Height of the carousel viewport.
   */
  height: {
    type: [String, Number],
    default: '240px',
  },
  /**
   * 是否自动轮播
   * @en Whether to rotate slides automatically.
   */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /**
   * 自动轮播间隔，单位为毫秒
   * @en Autoplay interval in milliseconds.
   */
  interval: {
    type: Number,
    default: 3000,
    validator: (value: number) => Number.isFinite(value) && value > 0,
  },
  /**
   * 是否循环播放
   * @en Whether navigation wraps around at either end.
   */
  loop: {
    type: Boolean,
    default: true,
  },
  /**
   * 轮播方向
   * @en Direction in which slides move.
   */
  direction: {
    type: String as PropType<HCarouselDirection>,
    default: 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value),
  },
  /**
   * 切换动画效果
   * @en Transition effect used when slides change.
   */
  effect: {
    type: String as PropType<HCarouselEffect>,
    default: 'slide',
    validator: (value: string) => ['slide', 'fade'].includes(value),
  },
  /**
   * 切换箭头的显示时机
   * @en When previous and next arrows are displayed.
   */
  arrow: {
    type: String as PropType<HCarouselArrow>,
    default: 'hover',
    validator: (value: string) => ['always', 'hover', 'never'].includes(value),
  },
  /**
   * 指示器的位置
   * @en Position of slide indicators.
   */
  indicatorPosition: {
    type: String as PropType<HCarouselIndicatorPosition>,
    default: 'inside',
    validator: (value: string) => ['inside', 'outside', 'none'].includes(value),
  },
  /**
   * 指示器切换的触发方式；无论此配置为何，键盘用户都可点击指示器
   * @en Pointer trigger for indicators. Indicators remain keyboard-activatable in either mode.
   */
  trigger: {
    type: String as PropType<HCarouselTrigger>,
    default: 'click',
    validator: (value: string) => ['click', 'hover'].includes(value),
  },
  /**
   * 鼠标悬停时是否暂停自动轮播
   * @en Whether autoplay pauses while the pointer is over the carousel.
   */
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
  /**
   * 焦点进入时是否暂停自动轮播；暂停后需由用户主动恢复
   * @en Whether focus entering the carousel pauses autoplay until the user resumes it.
   */
  pauseOnFocus: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否启用方向键、Home 和 End 键切换
   * @en Whether arrow, Home and End keyboard navigation is enabled.
   */
  keyboard: {
    type: Boolean,
    default: true,
  },
  /**
   * 触摸滑动触发切换的最小距离，单位为像素；设为 `0` 可关闭触摸切换
   * @en Minimum swipe distance in pixels. Set to `0` to disable touch navigation.
   */
  swipeThreshold: {
    type: Number,
    default: 40,
    validator: (value: number) => Number.isFinite(value) && value >= 0,
  },
  /**
   * 走马灯的无障碍名称
   * @en Accessible name for the carousel region.
   */
  ariaLabel: {
    type: String,
    required: false,
  },
});

export const useCarouselItemProps = declarePropType({
  /**
   * 轮播项名称，可传给 `setActiveItem` 定位该项
   * @en Unique slide name accepted by `setActiveItem`.
   */
  name: {
    type: [String, Number],
    required: false,
  },
  /**
   * 轮播项标签，用于指示器和无障碍描述
   * @en Slide label used by indicators and assistive technology.
   */
  label: {
    type: [String, Number],
    required: false,
  },
});

export type CarouselProps = ExtractPropTypes<typeof useCarouselProps>;
export type CarouselItemProps = ExtractPropTypes<typeof useCarouselItemProps>;
