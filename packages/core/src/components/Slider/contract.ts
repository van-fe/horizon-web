import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize } from '../_shared/choice';
import { isChoiceSize } from '../_shared/choice';
import { getPrecision, remainderValue, subValue } from '../../utils/number';

export const SLIDER_TONES = ['primary', 'info', 'success', 'warning', 'danger'] as const;
export const SLIDER_TOOLTIP_PLACEMENTS = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'top',
  'bottom',
  'right',
  'left',
] as const;

export type SliderTone = (typeof SLIDER_TONES)[number];
export type SliderTooltipPlacement = (typeof SLIDER_TOOLTIP_PLACEMENTS)[number];
export type SliderRangeValue = readonly [number, number];
export type SliderValue = number | SliderRangeValue;
export type SliderTooltipFormatter = (value: number) => string;

export interface SliderCommonProps {
  value?: SliderValue;
  defaultValue?: SliderValue;
  disabled?: boolean;
  size?: ChoiceSize;
  max?: number;
  min?: number;
  step?: number;
  showSeparators?: boolean;
  tone?: SliderTone;
  color?: string;
  range?: boolean;
  trackClickable?: boolean;
  showInput?: boolean;
  keyboard?: boolean;
  showTooltip?: boolean;
  tooltipPlacement?: SliderTooltipPlacement;
  formatTooltip?: SliderTooltipFormatter;
}

export interface SliderEventMap<FocusEvent = unknown> {
  change: [value: SliderValue];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}

export type SliderRegionMap = EmptyComponentApi;

export interface SliderCommandMap {
  focus: () => void;
}

export interface SliderNormalizedValue {
  first: number;
  second: number;
  value: SliderValue;
}

export interface SliderProgress {
  left: number;
  width: number;
}

export const SLIDER_DEFAULTS = Object.freeze({
  defaultValue: 0,
  disabled: false,
  size: 'medium',
  max: 100,
  min: 0,
  step: 1,
  showSeparators: false,
  tone: 'primary',
  range: false,
  trackClickable: true,
  showInput: false,
  keyboard: true,
  showTooltip: true,
  tooltipPlacement: 'top',
} as const);

export function isSliderNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isSliderValue(value: unknown): value is SliderValue {
  return (
    isSliderNumber(value) ||
    (Array.isArray(value) && value.length === 2 && value.every(isSliderNumber))
  );
}

export function isSliderStep(value: unknown): value is number {
  return isSliderNumber(value) && value > 0;
}

export function isSliderTone(value: unknown): value is SliderTone {
  return SLIDER_TONES.includes(value as SliderTone);
}

export function isSliderTooltipPlacement(value: unknown): value is SliderTooltipPlacement {
  return SLIDER_TOOLTIP_PLACEMENTS.includes(value as SliderTooltipPlacement);
}

export function normalizeSliderBounds(min: number, max: number): [number, number] {
  const safeMin = isSliderNumber(min) ? min : SLIDER_DEFAULTS.min;
  const safeMax = isSliderNumber(max) ? max : SLIDER_DEFAULTS.max;
  return safeMin <= safeMax ? [safeMin, safeMax] : [safeMax, safeMin];
}

export function clampSliderValue(value: number, min: number, max: number): number {
  const [lower, upper] = normalizeSliderBounds(min, max);
  return Math.min(Math.max(isSliderNumber(value) ? value : lower, lower), upper);
}

export function correctSliderValue(
  value: number,
  min: number,
  max: number,
  step: number,
  nearest = false,
): number {
  const [lower, upper] = normalizeSliderBounds(min, max);
  const safeStep = isSliderStep(step) ? step : SLIDER_DEFAULTS.step;
  const clamped = clampSliderValue(value, lower, upper);
  let remainder = remainderValue(subValue(clamped, lower), safeStep);
  if (nearest && remainder > safeStep / 2) remainder -= safeStep;
  const corrected = Number((clamped - remainder).toFixed(getPrecision(safeStep)));
  return clampSliderValue(corrected, lower, upper);
}

export function normalizeSliderValue(
  value: SliderValue | readonly number[] | undefined,
  range: boolean,
  min: number,
  max: number,
  step: number,
  correctStep = true,
): SliderNormalizedValue {
  const [lower, upper] = normalizeSliderBounds(min, max);
  const list = Array.isArray(value) ? value : undefined;
  const firstSource = list?.[0] ?? (isSliderNumber(value) ? value : lower);
  const secondSource = range ? (list?.length === 2 ? list[1] : upper) : lower;
  const normalize = (item: number): number =>
    correctStep
      ? correctSliderValue(item, lower, upper, step, true)
      : clampSliderValue(item, lower, upper);
  const first = normalize(firstSource ?? lower);
  const second = normalize(secondSource ?? upper);
  if (!range) return { first, second: lower, value: first };
  const start = Math.min(first, second);
  const end = Math.max(first, second);
  return { first, second, value: [start, end] };
}

export function getSliderProgress(
  first: number,
  second: number,
  min: number,
  max: number,
  range: boolean,
): SliderProgress {
  const [lower, upper] = normalizeSliderBounds(min, max);
  const span = upper - lower;
  if (span <= 0) return { left: 0, width: 0 };
  const firstPercent = ((clampSliderValue(first, lower, upper) - lower) / span) * 100;
  if (!range) return { left: 0, width: firstPercent };
  const secondPercent = ((clampSliderValue(second, lower, upper) - lower) / span) * 100;
  return {
    left: Math.min(firstPercent, secondPercent),
    width: Math.abs(firstPercent - secondPercent),
  };
}

export function getSliderSeparatorPercents(min: number, max: number, step: number): number[] {
  const [lower, upper] = normalizeSliderBounds(min, max);
  if (!isSliderStep(step) || upper <= lower) return [];
  const count = Math.max(0, Math.ceil((upper - lower) / step) - 1);
  return Array.from({ length: count }, (_, index) =>
    Math.min(100, (((index + 1) * step) / (upper - lower)) * 100),
  );
}

export function getClosestSliderThumb(value: number, first: number, second: number): 0 | 1 {
  return Math.abs(value - first) <= Math.abs(value - second) ? 0 : 1;
}

export function getSliderValueFromPosition(
  clientX: number,
  trackLeft: number,
  trackWidth: number,
  min: number,
  max: number,
  step: number,
): number {
  const [lower, upper] = normalizeSliderBounds(min, max);
  if (!isSliderNumber(trackWidth) || trackWidth <= 0) return lower;
  const ratio = Math.min(1, Math.max(0, (clientX - trackLeft) / trackWidth));
  return correctSliderValue(lower + ratio * (upper - lower), lower, upper, step, true);
}

export function getSliderKeyboardValue(
  value: number,
  key: string,
  min: number,
  max: number,
  step: number,
): number | undefined {
  const [lower, upper] = normalizeSliderBounds(min, max);
  if (key === 'Home') return lower;
  if (key === 'End') return upper;
  if (key === 'ArrowRight' || key === 'ArrowUp')
    return correctSliderValue(value + step, lower, upper, step);
  if (key === 'ArrowLeft' || key === 'ArrowDown')
    return correctSliderValue(value - step, lower, upper, step);
  return undefined;
}

export const sliderApiContract = defineComponentApiContract<
  SliderCommonProps,
  SliderEventMap,
  SliderRegionMap,
  SliderCommandMap
>({
  defaults: SLIDER_DEFAULTS,
  validators: {
    value: isSliderValue,
    defaultValue: isSliderValue,
    size: isChoiceSize,
    max: isSliderNumber,
    min: isSliderNumber,
    step: isSliderStep,
    tone: isSliderTone,
    tooltipPlacement: isSliderTooltipPlacement,
  },
});
