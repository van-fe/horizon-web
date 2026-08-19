import type { SlotsType } from 'vue';
export const useWatermarkSlots = Object as SlotsType<{
  /**
   * 自定义渲染
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type WatermarkSlots = typeof useWatermarkSlots;
