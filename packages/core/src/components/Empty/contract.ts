import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const EMPTY_SIZES = ['small', 'medium', 'large'] as const;
export type EmptyPresetSize = (typeof EMPTY_SIZES)[number];
export type EmptySize = EmptyPresetSize | number;

export interface EmptyCommonProps {
  image?: string;
  size?: EmptySize;
  description?: string;
}

export type EmptyEventMap = EmptyComponentApi;
export interface EmptyRegionMap {
  footer: EmptyComponentApi;
  image: EmptyComponentApi;
  description: EmptyComponentApi;
}
export type EmptyCommandMap = EmptyComponentApi;

export const EMPTY_DEFAULTS = Object.freeze({ size: 'medium' } as const);

export function isEmptySize(value: unknown): value is EmptySize {
  return (
    (typeof value === 'number' && Number.isFinite(value) && value > 0) ||
    EMPTY_SIZES.includes(value as EmptyPresetSize)
  );
}

export const emptyApiContract = defineComponentApiContract<
  EmptyCommonProps,
  EmptyEventMap,
  EmptyRegionMap,
  EmptyCommandMap
>({
  defaults: EMPTY_DEFAULTS,
  validators: { size: isEmptySize },
});
