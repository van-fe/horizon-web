import type { SlotsType } from 'vue';
export const useWatermarkSlots = Object as SlotsType<{
  /**
   * 自定义渲染
   */
  default?: {};
}>;

export type WatermarkSlots = typeof useWatermarkSlots;
