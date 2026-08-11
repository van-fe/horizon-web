import type { SlotsType } from 'vue';
export const useAvatarSlots = Object as SlotsType<{
  /**
   * 自定义头像展示内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 图片类头像加载失败自定义插槽
    * @en Custom content for the error slot.
   */
  error?: {};
}>;

export type AvatarSlots = typeof useAvatarSlots;
