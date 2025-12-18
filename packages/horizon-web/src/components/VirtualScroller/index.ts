import { default as VirtualScroller } from './src/VirtualScroller';
import { default as RecycleScroller } from './src/RecycleScroller';
import { default as VirtualScrollerItem } from './src/VirtualScrollerItem';
import type { NRecycleScrollerInstance } from './src/composables/useProps';

import { withInstall, withNoopInstall } from '@aurora/utils';

// https://vue-virtual-scroller-demo.netlify.app/dynamic

export const NVirtualScroller = withInstall(VirtualScroller, {
  VirtualScrollerItem,
});
export const NVirtualScrollerItem = withNoopInstall(VirtualScrollerItem);
export const NRecycleScroller = withInstall(RecycleScroller);

export type { NRecycleScrollerInstance };

export default NVirtualScroller;
