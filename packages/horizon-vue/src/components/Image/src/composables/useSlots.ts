import type { SlotsType } from 'vue';
export const useImageSlots = Object as SlotsType<{
  /**
   * 图片加载成功后的内容，会覆盖显示于图片上层
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 图片占位图，会在图片加载中显示
    * @en Custom content for the placeholder slot.
   */
  placeholder?: {};
  /**
   * 图片加载失败后的内容
    * @en Custom content for the error slot.
   */
  error?: {};
  /**
   * 图片加载成功后的内容，鼠标移上图片后会覆盖显示于图片上层
    * @en Custom content for the hover slot.
   */
  hover?: {};
}>;

export type ImageSlots = typeof useImageSlots;

export const useImageListSlots = Object as SlotsType<{
  /**
   * 图片列表的内容，除了 `h-image` 之外的内容会被忽略
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 自定义溢出内容
    * @en Custom content for the limit slot.
   */
  limit?: {};
}>;

export type ImageListSlots = typeof useImageListSlots;
