import type { SlotsType } from 'vue';
export const useEmptySlots = Object as SlotsType<{
  /**
   * 自定义底部内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 自定义图片
    * @en Custom content for the image slot.
   */
  image?: {};
  /**
   * 自定义描述
    * @en Custom content for the description slot.
   */
  description?: {};
}>;

export type EmptySlots = typeof useEmptySlots;
