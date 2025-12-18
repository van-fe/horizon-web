import type { SlotsType } from 'vue';
export const useResultSlots = Object as SlotsType<{
  /**
   * 自定义图标
   */
  icon?: {};
  /**
   * 自定义标题
   */
  title?: {};
  /**
   * 自定义二级标题
   */
  subtitle?: {};
  /**
   * 自定义底部额外区域
   */
  extra?: {};
}>;

export type ResultSlots = typeof useResultSlots;
