import { Decimal } from 'decimal.js';
import { isNil } from '@aurora/utils';
import type { InputNumberValue } from '../types';

export function toInputNumberEmitValue(value: InputNumberValue, stringMode: boolean) {
  if (isNil(value)) return null;
  try {
    if (new Decimal(value).isNaN()) return null;
    if (stringMode) return value.toString();
    return Decimal.isDecimal(value) ? value.toNumber() : value as string | number;
  } catch {
    return null;
  }
}

export function toInputNumberDecimal(value: InputNumberValue) {
  if (isNil(value) || value === '') return null;
  try {
    const decimal = new Decimal(value);
    return decimal.isNaN() ? null : decimal;
  } catch {
    return null;
  }
}

export function sanitizeBlurValue(value: string) {
  return value.replace(/[^\d.-]+/g, '').replace(/^[-+](?!\d)/, '');
}
