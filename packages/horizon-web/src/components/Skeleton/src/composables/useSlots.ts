import type { SlotsType } from 'vue';
export const useSkeletonSlots = Object as SlotsType<{
  /**
   * 真实DOM
   */
  default?: {};

  /**
   * 骨架屏DOM
   */
  loadingTemplate?: {};
}>;

export type SkeletonSlots = typeof useSkeletonSlots;
