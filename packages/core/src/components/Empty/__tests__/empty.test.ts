import { describe, expect, it } from 'vitest';
import { EMPTY_DEFAULTS, emptyApiContract, isEmptySize } from '..';

describe('Empty contract', () => {
  it('owns size defaults and validation', () => {
    expect(emptyApiContract.defaults).toBe(EMPTY_DEFAULTS);
    expect(isEmptySize('large')).toBe(true);
    expect(isEmptySize(180)).toBe(true);
    expect(isEmptySize(0)).toBe(false);
  });
});
