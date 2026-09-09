import type { VNode } from 'vue';
import type { AdaptComponentApiShape, TagGroupRegionMap, TagRegionMap } from '@aurora/core';
import { tagGroupManifest, tagManifest } from '@aurora/core';
import { createVueSlotsFromManifest } from '~/utils/componentManifest';
import type { TagProps } from './useProps';

type TagVueSlots = AdaptComponentApiShape<TagRegionMap, { content: 'default' }>;
type TagGroupVueSlots = AdaptComponentApiShape<TagGroupRegionMap, { content: 'default' }>;

export const useTagSlots = createVueSlotsFromManifest<{
  default?: TagVueSlots['default'];
  icon?: (color?: string) => VNode[];
  avatar?: TagVueSlots['avatar'];
  tooltipContent?: TagVueSlots['tooltipContent'];
}>(tagManifest.contract.slots, { rename: { content: 'default' } });

export const useTagGroupSlots = createVueSlotsFromManifest<{
  default?: TagGroupVueSlots['default'];
  createText?: (tags: TagProps[]) => VNode[];
  create?: (tags: TagProps[]) => VNode[];
  prepend?: TagGroupVueSlots['prepend'];
  append?: TagGroupVueSlots['append'];
  prefix?: TagGroupVueSlots['prefix'];
  suffix?: TagGroupVueSlots['suffix'];
}>(tagGroupManifest.contract.slots, { rename: { content: 'default' } });

export type TagSlots = typeof useTagSlots;
export type TagGroupSlots = typeof useTagGroupSlots;
