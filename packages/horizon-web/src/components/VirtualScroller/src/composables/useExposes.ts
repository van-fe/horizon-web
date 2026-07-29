import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
export const useVirtualScrollerExposes = {
  /**
   * 使组件滚动到指定索引值位置;
    * @en Controls scroll to item.
   */
  scrollToItem: Function as ExposeType<(index: number) => void>,

  /**
   * 使列表滚动到结尾
    * @en Controls scroll to bottom.
   */
  scrollToBottom: Function as ExposeType<() => void>,
};
export const useVirtualScrollerItemExposes = {};
export const useRecycleScrollerExposes = {
  /**
   * 使组件滚动到指定索引值位置;
    * @en Controls scroll to item.
   */
  scrollToItem: Function as ExposeType<(index: number) => void>,

  /**
   * 获取组件的根元素实例
    * @en Controls get root el.
   */
  getRootEl: Function as ExposeType<() => HTMLDivElement | null>,
};

export type VirtualScrollerExposes = ExtractExposeTypes<typeof useVirtualScrollerExposes>;
export type VirtualScrollerItemExposes = ExtractExposeTypes<typeof useVirtualScrollerItemExposes>;
export type RecycleScrollerExposes = ExtractExposeTypes<typeof useRecycleScrollerExposes>;
