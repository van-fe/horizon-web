export const useAvatarSlots = {
  /**
   * 自定义头像展示内容
   */
  default: () => true,
  /**
   * 图片类头像加载失败自定义插槽
   */
  error: () => true,
};

export type AvatarSlots = typeof useAvatarSlots;
