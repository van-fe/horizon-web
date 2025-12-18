import type { SlotsType } from 'vue';
export const useAffixSlots = Object as SlotsType<{
  /**
   * 需要用固钉固定的元素
   */
  default?: {},
}>

export type AffixSlots = typeof useAffixSlots;
