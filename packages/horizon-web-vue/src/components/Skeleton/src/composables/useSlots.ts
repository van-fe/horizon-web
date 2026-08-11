import type { SlotsType } from 'vue';
export const useSkeletonSlots = Object as SlotsType<{
  /**
   * 真实DOM
    * @en Custom content for the default slot.
   */
  default?: {};

  /**
   * 骨架屏DOM
    * @en Custom content for the loading template slot.
   */
  loadingTemplate?: {};
}>;

export type SkeletonSlots = typeof useSkeletonSlots;
