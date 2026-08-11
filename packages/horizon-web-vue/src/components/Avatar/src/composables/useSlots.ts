import type { SlotsType } from 'vue';
import type { AvatarRegionMap, ComponentRegionContext } from '@aurora/core';

export const useAvatarSlots = Object as SlotsType<{
  /**
   * 自定义头像展示内容
   * @en Custom content for the default slot.
   */
  default?: ComponentRegionContext<AvatarRegionMap, 'content'>;
  /**
   * 图片类头像加载失败自定义插槽
   * @en Custom content for the error slot.
   */
  error?: ComponentRegionContext<AvatarRegionMap, 'fallback'>;
}>;

export type AvatarSlots = typeof useAvatarSlots;
