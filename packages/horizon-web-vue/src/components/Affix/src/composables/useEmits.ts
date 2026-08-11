import type { AffixEventMap, ComponentEventValidators } from '@aurora/core';
import { isBoolean } from '@aurora/utils';

export const useAffixEmits = {
  /** 固定状态变化。 @en Affixed state changed. */
  change: (affixed: boolean) => isBoolean(affixed),
} satisfies ComponentEventValidators<AffixEventMap>;

export type AffixEmits = typeof useAffixEmits;
