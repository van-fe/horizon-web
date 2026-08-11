import { defineComponentApiContract } from '../_shared/api';

export const RATE_PRESET_SIZES = ['small', 'medium', 'large'] as const;

export type RatePresetSize = (typeof RATE_PRESET_SIZES)[number];
export type RateSize = RatePresetSize | number;
export type RateTooltip = string | number;
export type RateItemStatus = 'full' | 'half' | 'void';

export interface RateCommonProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  half?: boolean;
  showTooltip?: boolean;
  tooltip?: readonly RateTooltip[];
  readOnly?: boolean;
  disabled?: boolean;
  size?: RateSize;
  color?: string;
  voidColor?: string;
  disabledColor?: string;
  gutter?: number;
}

export interface RateEventMap<BlurEvent = unknown> {
  change: [value: number];
  blur: [event: BlurEvent];
}

export interface RateIconRegionContext {
  index: number;
  status: RateItemStatus;
  value: number;
}

export interface RateRegionMap {
  icon: RateIconRegionContext;
}

export interface RateCommandMap {
  focus: () => void;
}

export const RATE_DEFAULTS = Object.freeze({
  defaultValue: 3,
  count: 5,
  half: false,
  showTooltip: false,
  tooltip: [] as readonly RateTooltip[],
  readOnly: false,
  disabled: false,
  gutter: 5,
} as const);

export function isRateValue(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isRateCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

export function isRateSize(value: unknown): value is RateSize {
  return (
    (typeof value === 'number' && Number.isFinite(value) && value > 0) ||
    RATE_PRESET_SIZES.includes(value as RatePresetSize)
  );
}

export function isRateGutter(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export function normalizeRateValue(value: number, count: number, half: boolean): number {
  const clamped = Math.max(0, Math.min(count, Number.isFinite(value) ? value : 0));
  return half ? Math.round(clamped * 2) / 2 : Math.round(clamped);
}

export function getRateItemStatus(value: number, index: number): RateItemStatus {
  if (value >= index) return 'full';
  if (value + 0.5 === index) return 'half';
  return 'void';
}

export function getRateKeyboardValue(
  value: number,
  key: string,
  count: number,
  half: boolean,
): number | undefined {
  const step = half ? 0.5 : 1;
  if (key === 'Home') return 0;
  if (key === 'End') return count;
  if (key === 'ArrowRight' || key === 'ArrowUp')
    return normalizeRateValue(value + step, count, half);
  if (key === 'ArrowLeft' || key === 'ArrowDown')
    return normalizeRateValue(value - step, count, half);
  return undefined;
}

export function resolveRateTooltip(
  value: number,
  count: number,
  tooltip: readonly RateTooltip[],
): RateTooltip {
  return tooltip.length === count ? (tooltip[Math.ceil(value) - 1] ?? value) : value;
}

export const rateApiContract = defineComponentApiContract<
  RateCommonProps,
  RateEventMap,
  RateRegionMap,
  RateCommandMap
>({
  defaults: RATE_DEFAULTS,
  validators: {
    value: isRateValue,
    defaultValue: isRateValue,
    count: isRateCount,
    size: isRateSize,
    gutter: isRateGutter,
  },
});
