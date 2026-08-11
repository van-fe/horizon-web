import { describe, expect, it } from 'vitest';
import {
  COUNT_DEFAULTS,
  countApiContract,
  countStepValue,
  formatCountNumber,
  nextCountValue,
} from '..';

describe('Count contract', () => {
  it('owns defaults and step semantics', () => {
    expect(countApiContract.defaults).toBe(COUNT_DEFAULTS);
    expect(countStepValue(2)).toBe(100);
    expect(nextCountValue(95, 100, 1)).toBe(100);
  });
  it('formats grouped, decimal and negative values', () => {
    expect(formatCountNumber(12345.6, ',', 3, 2)).toBe('12,345.60');
    expect(formatCountNumber(-12345, '_', 3, 0)).toBe('-12_345');
  });
});
