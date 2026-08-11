import type { SlotsType } from 'vue';
import type {
  AdaptComponentApiShape,
  TabContentRegionContext,
  TabRegionMap,
  TabsRegionMap,
} from '@aurora/core';

type TabsVueSlots = AdaptComponentApiShape<TabsRegionMap, { content: 'default' }>;
type TabVueSlots = AdaptComponentApiShape<
  TabRegionMap,
  {},
  'content',
  { default: Omit<TabContentRegionContext, 'active'> & { state: boolean } }
>;

export const useTabsSlots = Object as SlotsType<{
  default?: TabsVueSlots['default'];
  extra?: TabsVueSlots['extra'];
}>;
export type TabsSlots = typeof useTabsSlots;

export const useTabSlots = Object as SlotsType<{
  default?: TabVueSlots['default'];
  icon?: TabVueSlots['icon'];
}>;
export type TabSlots = typeof useTabSlots;
