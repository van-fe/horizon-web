import type { SlotsType } from 'vue';
export const useCardSlots = Object as SlotsType<{
  /**
   * 卡片内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 顶部内容
    * @en Custom content for the header slot.
   */
  header?: {};
  /**
   * 底部内容
    * @en Custom content for the footer slot.
   */
  footer?: {};
}>;

export type CardSlots = typeof useCardSlots;
