import type { SlotsType } from 'vue';
export const useAvatarSlots = Object as SlotsType<{
  /**
   * 自定义头像展示内容
   */
  default?: {};
  /**
   * 图片类头像加载失败自定义插槽
   */
  error?: {};
}>;

export type AvatarSlots = typeof useAvatarSlots;
