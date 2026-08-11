import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const AFFIX_POSITIONS = ['top', 'bottom'] as const;
export type AffixPosition = (typeof AFFIX_POSITIONS)[number];

export interface AffixCommonProps<Target = unknown> {
  /** 与固定边界的像素偏移。 @en Pixel offset from the affix boundary. */
  offset?: number;
  /** 固定到顶部或底部。 @en Pins content to the top or bottom edge. */
  position?: AffixPosition;
  /** 滚动边界目标。 @en Scroll-boundary target. */
  target?: Target;
  /** 固定状态下的层级。 @en Stacking level while affixed. */
  zIndex?: number;
}

export interface AffixEventMap {
  /** 固定状态发生变化。 @en Affixed state changed. */
  change: [affixed: boolean];
}

export interface AffixRegionMap {
  /** 被固定的内容。 @en Content that becomes affixed. */
  content: EmptyComponentApi;
}

export interface AffixCommandMap {
  /** 立即重新计算固定位置。 @en Immediately recalculates the affixed position. */
  updatePosition: () => void;
}

export const AFFIX_DEFAULTS = Object.freeze({
  offset: 0,
  position: 'top',
} as const satisfies Partial<AffixCommonProps>);

export function isAffixPosition(value: unknown): value is AffixPosition {
  return AFFIX_POSITIONS.includes(value as AffixPosition);
}

export function isAffixOffset(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isAffixZIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export const affixApiContract = defineComponentApiContract<
  AffixCommonProps,
  AffixEventMap,
  AffixRegionMap,
  AffixCommandMap
>({
  defaults: AFFIX_DEFAULTS,
  validators: {
    offset: isAffixOffset,
    position: isAffixPosition,
    zIndex: isAffixZIndex,
  },
});
