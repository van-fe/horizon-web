import type { SlotsType } from 'vue';
import type { AdaptComponentApiShape, PopContentRegionMap, PopoverRegionMap } from '@aurora/core';

type PopoverVueSlots = AdaptComponentApiShape<
  PopoverRegionMap,
  { trigger: 'reference'; content: 'popper' }
>;
type PopContentVueSlots = AdaptComponentApiShape<PopContentRegionMap, { content: 'default' }>;

export const usePopoverSlots = Object as SlotsType<{
  /** 触发元素。 @en Trigger element. */
  reference?: PopoverVueSlots['reference'];
  /** 浮层内容。 @en Floating content. */
  popper?: PopoverVueSlots['popper'];
}>;
export type PopoverSlots = typeof usePopoverSlots;

export const usePopContentSlots = Object as SlotsType<{
  /** 内容。 @en Content. */
  default?: PopContentVueSlots['default'];
}>;
export type PopContentSlots = typeof usePopContentSlots;
