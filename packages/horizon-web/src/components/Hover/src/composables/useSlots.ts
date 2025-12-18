import type { SlotsType, VNode } from 'vue';
import type { Arrayable } from '@aurora/shared';

export const useHoverSlots = Object as SlotsType<{
  /**
   * 默认渲染插槽
   * @param hover: 是否可见
   */
  default?: (val: { hover: boolean }) => Arrayable<VNode>;
}>;

export type HoverSlots = typeof useHoverSlots;
