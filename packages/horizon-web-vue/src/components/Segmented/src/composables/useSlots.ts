import type { SlotsType } from 'vue';
import type { SegmentedItemRegionContext } from '@aurora/core';

export const useSegmentedSlots = Object as SlotsType<{
  /**
   * 容器，使用 `h-segmented-item` 填充
   * @en Custom content for the default slot.
   **/
  default?: {};
}>;

export type SegmentedSlots = typeof useSegmentedSlots;

export const useSegmentedItemSlots = Object as SlotsType<{
  /**
   * 自定义选项卡
   * @en Custom content for the default slot.
   */
  default?: SegmentedItemRegionContext & {
    state: boolean;
    activeKey: SegmentedItemRegionContext['value'];
  };

  /**
   * 自定义 icon
   * @en Custom content for the icon slot.
   **/
  icon?: {};
}>;

export type SegmentedItemSlots = typeof useSegmentedItemSlots;
