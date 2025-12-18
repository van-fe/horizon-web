import type { SlotsType } from 'vue';
export const useEmptySlots = Object as SlotsType<{
  /**
   * 自定义底部内容
   */
  default?: {};
  /**
   * 自定义图片
   */
  image?: {};
  /**
   * 自定义描述
   */
  description?: {};
}>;

export type EmptySlots = typeof useEmptySlots;
