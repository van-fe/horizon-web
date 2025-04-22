import type { NSegmentedValue } from './useProps';

export const useSegmentedSlots = {
  /**
   * 容器，使用 `n-segmented-item` 填充
   **/
  default: () => true,
};

export type SegmentedSlots = typeof useSegmentedSlots;

export const useSegmentedItemSlots = {
  /**
   * 自定义选项卡
   */
  default: ({ state, activeKey }: { state: boolean; activeKey: NSegmentedValue }) => true,

  /**
   * 自定义 icon
   **/
  icon: () => true,
};

export type SegmentedItemSlots = typeof useSegmentedItemSlots;
