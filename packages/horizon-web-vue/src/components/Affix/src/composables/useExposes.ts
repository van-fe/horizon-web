import type { AffixCommandMap } from '@aurora/core';
import type { ExtractExposeTypes, ExposeType } from '@aurora/utils';

export const useAffixExposes = {
  /**
   * 主动重新计算固定位置
   * @en Recalculates the affixed position immediately.
   */
  updatePosition: Function as ExposeType<AffixCommandMap['updatePosition']>,
};

export type AffixExposes = ExtractExposeTypes<typeof useAffixExposes>;
