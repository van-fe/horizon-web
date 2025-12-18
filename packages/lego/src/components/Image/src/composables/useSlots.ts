import type { SlotsType } from 'vue';
export const useImageSlots = Object as SlotsType<{
  /**
   * 图片加载成功后的内容，会覆盖显示于图片上层
   */
  default?: {};
  /**
   * 图片占位图，会在图片加载中显示
   */
  placeholder?: {};
  /**
   * 图片加载失败后的内容
   */
  error?: {};
  /**
   * 图片加载成功后的内容，鼠标移上图片后会覆盖显示于图片上层
   */
  hover?: {};
}>;

export type ImageSlots = typeof useImageSlots;

export const useImageListSlots = Object as SlotsType<{
  /**
   * 图片列表的内容，除了 `n-image` 之外的内容会被忽略
   */
  default?: {};
  /**
   * 自定义溢出内容
   */
  limit?: {};
}>;

export type ImageListSlots = typeof useImageListSlots;
