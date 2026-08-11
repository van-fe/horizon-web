import { describe, expect, it } from 'vitest';
import {
  getRateItemStatus,
  getRateKeyboardValue,
  isRateCount,
  isRateSize,
  isRateValue,
  normalizeRateValue,
  RATE_DEFAULTS,
  rateApiContract,
  resolveRateTooltip,
} from '..';

describe('Rate contract', () => {
  it('owns defaults and validators', () => {
    expect(rateApiContract.defaults).toBe(RATE_DEFAULTS);
    expect(isRateCount(5)).toBe(true);
    expect(isRateCount(0)).toBe(false);
    expect(isRateValue(2.5)).toBe(true);
    expect(isRateValue(Number.NaN)).toBe(false);
    expect(isRateSize('medium')).toBe(true);
    expect(isRateSize(24)).toBe(true);
  });

  it('normalizes values and item states', () => {
    expect(normalizeRateValue(2.7, 5, true)).toBe(2.5);
    expect(normalizeRateValue(8, 5, false)).toBe(5);
    expect(getRateItemStatus(1.5, 1)).toBe('full');
    expect(getRateItemStatus(1.5, 2)).toBe('half');
    expect(getRateItemStatus(1.5, 3)).toBe('void');
  });

  it('resolves keyboard changes and tooltip labels', () => {
    expect(getRateKeyboardValue(2, 'ArrowRight', 5, true)).toBe(2.5);
    expect(getRateKeyboardValue(2, 'Home', 5, false)).toBe(0);
    expect(getRateKeyboardValue(2, 'KeyA', 5, false)).toBeUndefined();
    expect(resolveRateTooltip(2, 3, ['Low', 'Medium', 'High'])).toBe('Medium');
    expect(resolveRateTooltip(2, 3, ['Only one'])).toBe(2);
  });
});
