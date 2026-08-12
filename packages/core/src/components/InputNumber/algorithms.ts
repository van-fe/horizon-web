import Decimal from 'decimal.js';
import type { InputNumberStepDirection } from './contract';

export type InputNumberNumericValue = Decimal.Value | null | undefined;

export interface InputNumberNumericOptions {
  min?: number | string;
  max?: number | string;
  step?: number;
  stepStrictly?: boolean;
  precision?: number;
  stringMode?: boolean;
}

export function sanitizeInputNumberText(input: string): string {
  let result = input.replace(/[^\d.-]/g, '').replace(/(?!^)-/g, '');
  const parts = result.split('.');
  if (parts.length > 2) result = `${parts[0]}.${parts.slice(1).join('')}`;
  return result.startsWith('-.') ? result.replace(/^-\./, '-0.') : result;
}

export function normalizePartialInputNumber(input: string | number): string | number | null {
  const value = input.toString();
  if (value.startsWith('.')) return `0${value}`;
  return value === '-' ? null : input;
}

export function sanitizeInputNumberBlurText(value: string): string {
  return value.replace(/[^\d.-]+/g, '').replace(/^[-+](?!\d)/, '');
}

export function toInputNumberDecimal(value: InputNumberNumericValue): Decimal | null {
  if (value === null || value === undefined || value === '') return null;
  try {
    const decimal = new Decimal(value);
    return decimal.isNaN() ? null : decimal;
  } catch {
    return null;
  }
}

export function toInputNumberOutput(
  value: InputNumberNumericValue,
  stringMode = false,
): number | string | null {
  if (value === null || value === undefined || value === '') return null;
  try {
    const decimal = Decimal.isDecimal(value) ? value : new Decimal(value);
    if (decimal.isNaN()) return null;
    if (stringMode) return typeof value === 'string' ? value : decimal.toString();
    return Decimal.isDecimal(value) || typeof value === 'bigint' ? decimal.toNumber() : value;
  } catch {
    return null;
  }
}

export function areInputNumberValuesEqual(
  a: InputNumberNumericValue,
  b: InputNumberNumericValue,
): boolean {
  if (a === null || a === undefined) return b === null || b === undefined || b === '';
  if (b === null || b === undefined) return a === '';
  return a.toString() === b.toString();
}

export function verifyInputNumberValue(
  value: InputNumberNumericValue,
  options: InputNumberNumericOptions = {},
): Decimal | string | null | undefined {
  if (value === '' || value === null || value === undefined) return value;
  let result = toInputNumberDecimal(value);
  if (!result) return null;
  const min = new Decimal(options.min ?? -Infinity);
  const max = new Decimal(options.max ?? Infinity);
  const precision = options.precision;
  const boundedMin =
    precision === undefined ? min : new Decimal(min.toFixed(precision, Decimal.ROUND_DOWN));
  const boundedMax =
    precision === undefined ? max : new Decimal(max.toFixed(precision, Decimal.ROUND_DOWN));
  if (boundedMax.greaterThanOrEqualTo(boundedMin)) result = result.clamp(boundedMin, boundedMax);
  if (options.stepStrictly) result = result.toNearest(options.step ?? 1);
  if (precision === undefined) return result;
  const fixed = result.toFixed(precision);
  return options.stringMode ? fixed : new Decimal(fixed);
}

export function stepInputNumberValue(
  value: InputNumberNumericValue,
  direction: InputNumberStepDirection,
  options: InputNumberNumericOptions = {},
): Decimal | string | null | undefined {
  const current = toInputNumberDecimal(value) ?? new Decimal(0);
  const next = direction === 'up' ? current.add(options.step ?? 1) : current.sub(options.step ?? 1);
  return verifyInputNumberValue(next, options);
}

export function canStepInputNumber(
  value: InputNumberNumericValue,
  direction: InputNumberStepDirection,
  options: InputNumberNumericOptions = {},
): boolean {
  if (value === null || value === undefined || value === '') return true;
  const verified =
    toInputNumberDecimal(verifyInputNumberValue(value, options) ?? 0) ?? new Decimal(0);
  return direction === 'up'
    ? new Decimal(options.max ?? Infinity).greaterThan(verified)
    : new Decimal(options.min ?? -Infinity).lessThan(verified);
}

export function formatInputNumberDisplay(
  value: InputNumberNumericValue,
  precision?: number,
  stringMode = false,
): string | number {
  const decimal = toInputNumberDecimal(value);
  if (!decimal) return '';
  if (precision === undefined) return decimal.toString();
  const fixed = decimal.toFixed(precision);
  return stringMode ? fixed : Number(fixed);
}
