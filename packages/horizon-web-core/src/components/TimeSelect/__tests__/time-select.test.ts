import { describe, expect, test } from 'vitest';
import { formatTimeSelectLabel } from '..';

describe('TimeSelect Web Core', () => {
  test('formats display labels without changing the shared value', () => {
    expect(formatTimeSelectLabel(12 * 60 + 15, 'hh:mm A')).toBe('12:15 PM');
    expect(formatTimeSelectLabel(9 * 60 + 5)).toBe('09:05');
  });
});
