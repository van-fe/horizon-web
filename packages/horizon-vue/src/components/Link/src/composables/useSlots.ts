import type { Slot, SlotsType } from 'vue';
import type { AdaptComponentApiShape, LinkRegionMap } from '@aurora/core';

type LinkVueSlots = AdaptComponentApiShape<LinkRegionMap, { content: 'default' }>;

export const useLinkSlots = Object as SlotsType<{
  /** 默认内容。@en Main content. */
  [Name in keyof LinkVueSlots]?: Slot;
}>;

export type LinkSlots = typeof useLinkSlots;
