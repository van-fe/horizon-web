import { default as VirtualScroller } from './src/VirtualScroller';
import { default as RecycleScroller } from './src/RecycleScroller';
import { default as VirtualScrollerItem } from './src/VirtualScrollerItem';
import type { HRecycleScrollerInstance } from './src/composables/useProps';

import { withInstall, withNoopInstall } from '@aurora/utils';

// https://vue-virtual-scroller-demo.netlify.app/dynamic

export const HVirtualScroller = withInstall(VirtualScroller, {
  VirtualScrollerItem,
});
export const HVirtualScrollerItem = withNoopInstall(VirtualScrollerItem);
export const HRecycleScroller = withInstall(RecycleScroller);

export type { HRecycleScrollerInstance };

export default HVirtualScroller;
