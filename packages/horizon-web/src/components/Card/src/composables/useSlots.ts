import type { SlotsType } from 'vue';
export const useCardSlots = Object as SlotsType<{
  /**
   * 卡片内容
   */
  default?: {};
  /**
   * 顶部内容
   */
  header?: {};
  /**
   * 底部内容
   */
  footer?: {};
}>;

export type CardSlots = typeof useCardSlots;
