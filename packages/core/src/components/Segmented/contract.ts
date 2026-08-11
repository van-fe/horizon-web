import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const SEGMENTED_SIZES = ['mini', 'small', 'medium', 'large', 'huge'] as const;

export type SegmentedSize = (typeof SEGMENTED_SIZES)[number];
export type SegmentedValue = string | number;

export interface SegmentedCommonProps {
  value?: SegmentedValue;
  defaultValue?: SegmentedValue;
  size?: SegmentedSize;
  scrollable?: boolean;
  focusable?: boolean;
  arrow?: boolean;
  block?: boolean;
}

export interface SegmentedItemCommonProps {
  value: SegmentedValue;
  label?: SegmentedValue;
  disabled?: boolean;
}

export interface SegmentedEventMap {
  change: [value: SegmentedValue];
}

export interface SegmentedItemEventMap {
  click: [value: SegmentedValue];
}

export interface SegmentedItemRegionContext {
  selected: boolean;
  value: SegmentedValue;
}

export interface SegmentedRegionMap {
  content: EmptyComponentApi;
}

export interface SegmentedItemRegionMap {
  content: SegmentedItemRegionContext;
  icon: EmptyComponentApi;
}

export interface SegmentedCommandMap {
  focus: () => void;
}

export const SEGMENTED_DEFAULTS = Object.freeze({
  size: 'medium',
  scrollable: false,
  focusable: false,
  arrow: false,
  block: false,
} as const);

export const SEGMENTED_ITEM_DEFAULTS = Object.freeze({ disabled: false } as const);

export function isSegmentedValue(value: unknown): value is SegmentedValue {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

export function isSegmentedSize(value: unknown): value is SegmentedSize {
  return SEGMENTED_SIZES.includes(value as SegmentedSize);
}

export function resolveSegmentedValue(
  value: SegmentedValue | undefined,
  defaultValue: SegmentedValue | undefined,
): SegmentedValue | undefined {
  return value ?? defaultValue;
}

export function nextSegmentedIndex(
  currentIndex: number,
  itemCount: number,
  key: string,
): number | undefined {
  if (itemCount <= 0) return undefined;
  if (key === 'Home') return 0;
  if (key === 'End') return itemCount - 1;
  if (key === 'ArrowRight') return (Math.max(currentIndex, -1) + 1) % itemCount;
  if (key === 'ArrowLeft') return (Math.max(currentIndex, 0) - 1 + itemCount) % itemCount;
  return undefined;
}

export const segmentedApiContract = defineComponentApiContract<
  SegmentedCommonProps,
  SegmentedEventMap,
  SegmentedRegionMap,
  SegmentedCommandMap
>({
  defaults: SEGMENTED_DEFAULTS,
  validators: { value: isSegmentedValue, defaultValue: isSegmentedValue, size: isSegmentedSize },
});

export const segmentedItemApiContract = defineComponentApiContract<
  SegmentedItemCommonProps,
  SegmentedItemEventMap,
  SegmentedItemRegionMap
>({
  defaults: SEGMENTED_ITEM_DEFAULTS,
  validators: { value: isSegmentedValue },
});
