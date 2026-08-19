import type { SlotsType } from 'vue';
export const useGuideSlots = Object as SlotsType<{
  /**
   * 默认展示插槽，可以放 `guide-item` 组件
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export const useGuideItemSlots = Object as SlotsType<{
  /**
   * 标题插槽
    * @en Custom content for the title slot.
   */
  title?: {};
  /**
   * 配图插槽
    * @en Custom content for the image slot.
   */
  image?: {};
  /**
   * 正文插槽
    * @en Custom content for the content slot.
   */
  content?: {};
}>;

export type GuideSlots = typeof useGuideSlots;
export type GuideItemSlots = typeof useGuideItemSlots;
