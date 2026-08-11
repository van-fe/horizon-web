import type { Arrayable } from '@aurora/utils';
import type { SlotsType, VNode } from 'vue';

export const useCarouselSlots = Object as SlotsType<{
  /**
   * 默认插槽，用于放置 `h-carousel-item`
   * @en Default slot for `h-carousel-item` components.
   */
  default?: () => Arrayable<VNode>;
  /**
   * 上一个按钮的自定义图标
   * @en Custom icon for the previous button.
   */
  previous?: () => Arrayable<VNode>;
  /**
   * 下一个按钮的自定义图标
   * @en Custom icon for the next button.
   */
  next?: () => Arrayable<VNode>;
  /**
   * 自定义指示器内容
   * @param index 指示器对应的索引
   * @param active 是否为当前激活项
   * @param label 轮播项标签
   * @paramEn index Indicator slide index.
   * @paramEn active Whether the indicator is active.
   * @paramEn label Slide label.
   * @en Custom indicator content.
   */
  indicator?: (index: number, active: boolean, label?: string | number) => Arrayable<VNode>;
}>;

export const useCarouselItemSlots = Object as SlotsType<{
  /**
   * 轮播项内容
   * @en Slide content.
   */
  default?: () => Arrayable<VNode>;
}>;

export type CarouselSlots = typeof useCarouselSlots;
export type CarouselItemSlots = typeof useCarouselItemSlots;
