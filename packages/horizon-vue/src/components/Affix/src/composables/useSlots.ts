import type { AdaptComponentApiShape, AffixRegionMap } from '@aurora/core';
import type { SlotsType } from 'vue';

type AffixVueSlots = AdaptComponentApiShape<AffixRegionMap, { content: 'default' }>;
export const useAffixSlots = Object as SlotsType<{
  /**
   * 需要用固钉固定的元素
   * @en Custom content for the default slot.
   */
  default?: AffixVueSlots['default'];
}>;

export type AffixSlots = typeof useAffixSlots;
