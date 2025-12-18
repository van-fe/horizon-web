import type { SlotsType } from 'vue';
export const useGuideSlots = Object as SlotsType<{
  /**
   * 默认展示插槽，可以放 `guide-item` 组件
   */
  default?: {};
}>;

export const useGuideItemSlots = Object as SlotsType<{
  /**
   * 标题插槽
   */
  title?: {};
  /**
   * 配图插槽
   */
  image?: {};
  /**
   * 正文插槽
   */
  content?: {};
}>;

export type GuideSlots = typeof useGuideSlots;
export type GuideItemSlots = typeof useGuideItemSlots;
