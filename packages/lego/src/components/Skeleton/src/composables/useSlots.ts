export const useSkeletonSlots = {
  /**
   * 真实DOM
   */
  default: () => true,

  /**
   * 骨架屏DOM
   */
  loadingTemplate: () => true,
};

export type SkeletonSlots = typeof useSkeletonSlots;
