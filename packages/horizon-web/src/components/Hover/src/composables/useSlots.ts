import type { SlotsType, VNode } from 'vue';
import type { Arrayable } from '@aurora/utils';

export const useHoverSlots = Object as SlotsType<{
  /**
   * 默认渲染插槽
   * @param hover: 是否可见
    * @en Custom content for the default slot.
   */
  default?: (val: { hover: boolean }) => Arrayable<VNode>;
}>;

export type HoverSlots = typeof useHoverSlots;
