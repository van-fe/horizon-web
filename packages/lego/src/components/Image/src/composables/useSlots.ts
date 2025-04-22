export const useImageSlots = {
  /**
   * 图片加载成功后的内容，会覆盖显示于图片上层
   */
  default: () => true,
  /**
   * 图片占位图，会在图片加载中显示
   */
  placeholder: () => true,
  /**
   * 图片加载失败后的内容
   */
  error: () => true,
  /**
   * 图片加载成功后的内容，鼠标移上图片后会覆盖显示于图片上层
   */
  hover: () => true,
};

export type ImageSlots = typeof useImageSlots;

export const useImageListSlots = {
  /**
   * 图片列表的内容，除了 `n-image` 之外的内容会被忽略
   */
  default: () => true,
  /**
   * 自定义溢出内容
   */
  limit: () => true,
};

export type ImageListSlots = typeof useImageListSlots;
