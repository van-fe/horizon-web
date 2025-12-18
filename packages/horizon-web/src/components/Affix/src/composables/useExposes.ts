import type { ExtractExposeTypes, ExposeType } from '@aurora/shared';

export const useAffixExposes = {
  /**
   * 在存在多层滚动容器时，外层容器滚动后，需要用此更新位置
   */
  updatePosition: Function as ExposeType<() => void>,
};

export type AffixExposes = ExtractExposeTypes<typeof useAffixExposes>;
