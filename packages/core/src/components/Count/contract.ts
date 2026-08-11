import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export interface CountCommonProps {
  startValue?: number;
  endValue: number;
  decimal?: number;
  step?: number;
  autoPlay?: boolean;
  delay?: number;
  separator?: string;
  extent?: number;
  prefix?: string;
  suffix?: string;
}
export interface CountEventMap {
  change: [value: number];
}
export interface CountRegionMap {
  prefix: EmptyComponentApi;
  suffix: EmptyComponentApi;
}
export type CountCommandMap = EmptyComponentApi;
export const COUNT_DEFAULTS = Object.freeze({
  startValue: 0,
  endValue: 0,
  decimal: 0,
  step: 0,
  autoPlay: true,
  delay: 300,
  separator: ',',
  extent: 3,
} as const);

export function isCountDecimal(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 20;
}
export function isCountDelay(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 4;
}
export function isCountExtent(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}
export function countStepValue(step: number): number {
  return 10 ** step;
}
export function nextCountValue(current: number, end: number, step: number): number {
  return Math.min(end, current + countStepValue(step));
}
export function formatCountNumber(
  number: number,
  separator: string = COUNT_DEFAULTS.separator,
  extent: number = COUNT_DEFAULTS.extent,
  decimal: number = COUNT_DEFAULTS.decimal,
): string {
  const [signedInteger, fraction] = number.toFixed(decimal).split('.');
  const negative = signedInteger.startsWith('-');
  const integer = negative ? signedInteger.slice(1) : signedInteger;
  const groups: string[] = [];
  for (let end = integer.length; end > 0; end -= extent)
    groups.unshift(integer.slice(Math.max(0, end - extent), end));
  return `${negative ? '-' : ''}${groups.join(separator)}${fraction === undefined ? '' : `.${fraction}`}`;
}
export const countApiContract = defineComponentApiContract<
  CountCommonProps,
  CountEventMap,
  CountRegionMap,
  CountCommandMap
>({
  defaults: COUNT_DEFAULTS,
  validators: { decimal: isCountDecimal, delay: isCountDelay, extent: isCountExtent },
});
