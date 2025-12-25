import type { SlotsType } from 'vue';
import type { HSegmentedValue } from './useProps';

export const useSegmentedSlots = Object as SlotsType<{
  /**
   * 容器，使用 `n-segmented-item` 填充
   **/
  default?: {};
}>;

export type SegmentedSlots = typeof useSegmentedSlots;

export const useSegmentedItemSlots = Object as SlotsType<{
  /**
   * 自定义选项卡
   */
  default?: { state: boolean; activeKey: HSegmentedValue };

  /**
   * 自定义 icon
   **/
  icon?: {};
}>;

export type SegmentedItemSlots = typeof useSegmentedItemSlots;
