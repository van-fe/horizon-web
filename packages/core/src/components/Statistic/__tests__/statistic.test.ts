import { describe, expect, it, vi } from 'vitest';
import {
  formatStatisticValue,
  isStatisticPrecision,
  STATISTIC_DEFAULTS,
  statisticApiContract,
} from '..';

describe('Statistic contract', () => {
  it('owns defaults and precision validation', () => {
    expect(statisticApiContract.defaults).toBe(STATISTIC_DEFAULTS);
    expect(isStatisticPrecision(2)).toBe(true);
    expect(isStatisticPrecision(21)).toBe(false);
  });
  it('formats numeric, string and custom values', () => {
    expect(formatStatisticValue({ value: 1234.5, locale: 'en-US', precision: 2 })).toBe('1,234.50');
    expect(formatStatisticValue({ value: 'N/A' })).toBe('N/A');
    const formatter = vi.fn(() => 'custom');
    expect(formatStatisticValue({ value: 2, formatter })).toBe('custom');
  });
});
