export const useGuideSlots = {
  /**
   * 默认展示插槽，可以放 `guide-item` 组件
   */
  default: () => true,
};

export const useGuideItemSlots = {
  /**
   * 标题插槽
   */
  title: () => true,
  /**
   * 配图插槽
   */
  image: () => true,
  /**
   * 正文插槽
   */
  content: () => true,
};

export type GuideSlots = typeof useGuideSlots;
export type GuideItemSlots = typeof useGuideItemSlots;
