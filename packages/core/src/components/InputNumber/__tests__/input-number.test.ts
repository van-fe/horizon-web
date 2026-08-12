import { describe, expect, it } from 'vitest';
import {
  areInputNumberValuesEqual,
  canStepInputNumber,
  formatInputNumberDisplay,
  inputNumberApiContract,
  normalizePartialInputNumber,
  sanitizeInputNumberBlurText,
  sanitizeInputNumberText,
  stepInputNumberValue,
  toInputNumberOutput,
  verifyInputNumberValue,
} from '..';

describe('InputNumber core', () => {
  it('defines defaults and validators', () => {
    expect(inputNumberApiContract.defaults.controlsPosition).toBe('right');
    expect(inputNumberApiContract.validators.precision?.(0)).toBe(true);
    expect(inputNumberApiContract.validators.precision?.(-1)).toBe(false);
  });

  it('sanitizes editable number text', () => {
    expect(sanitizeInputNumberText('€-1.2.3-')).toBe('-1.23');
    expect(normalizePartialInputNumber('.5')).toBe('0.5');
    expect(normalizePartialInputNumber('-')).toBeNull();
    expect(sanitizeInputNumberBlurText('￥ -12.5 元')).toBe('-12.5');
  });

  it('clamps, rounds, steps and preserves string precision', () => {
    expect(toInputNumberOutput(verifyInputNumberValue(12, { max: 10 }), false)).toBe(10);
    expect(
      toInputNumberOutput(verifyInputNumberValue(3, { step: 2, stepStrictly: true }), false),
    ).toBe(4);
    expect(
      toInputNumberOutput(verifyInputNumberValue('1.20', { precision: 2, stringMode: true }), true),
    ).toBe('1.20');
    expect(toInputNumberOutput(stepInputNumberValue('0.1', 'up', { step: 0.2 }), true)).toBe('0.3');
    expect(formatInputNumberDisplay('1.2', 3, true)).toBe('1.200');
  });

  it('compares nullable values and resolves boundaries', () => {
    expect(areInputNumberValuesEqual(null, '')).toBe(true);
    expect(areInputNumberValuesEqual('1.0', 1)).toBe(false);
    expect(canStepInputNumber(10, 'up', { max: 10 })).toBe(false);
    expect(canStepInputNumber(0, 'down', { min: 0 })).toBe(false);
  });
});
