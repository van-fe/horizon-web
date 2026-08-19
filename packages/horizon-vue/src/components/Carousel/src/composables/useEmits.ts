export const useCarouselEmits = {
  /**
   * 激活项索引变化时触发，用于 `v-model`
   * @param index 新的激活项索引
   * @paramEn index New active slide index.
   * @en Emitted to update the controlled active index.
   */
  'update:modelValue': (index: number) => Number.isInteger(index) && index >= 0,
  /**
   * 轮播项切换时触发
   * @param current 当前激活项索引
   * @param previous 上一个激活项索引
   * @paramEn current Current active slide index.
   * @paramEn previous Previous active slide index.
   * @en Emitted after the active slide changes.
   */
  change: (current: number, previous: number) =>
    Number.isInteger(current) && current >= 0 && Number.isInteger(previous) && previous >= 0,
};

export type CarouselEmits = typeof useCarouselEmits;
