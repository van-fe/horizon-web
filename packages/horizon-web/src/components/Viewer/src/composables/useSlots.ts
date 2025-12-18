import type { SlotsType } from 'vue';
export const useViewerSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type ViewerSlots = typeof useViewerSlots;
