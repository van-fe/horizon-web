import { describe, expect, it } from 'vitest';
import {
  BACKTOP_DEFAULTS,
  backtopApiContract,
  backtopManifest,
  isBacktopDistance,
  resolveBacktopEasedProgress,
  resolveBacktopScrollOffset,
  resolveBacktopVisibility,
} from '..';

describe('Backtop contract and algorithms', () => {
  it('defines stable defaults, validators and manifest commands', () => {
    expect(BACKTOP_DEFAULTS).toEqual({ visibilityHeight: 400, bottom: 120, right: 24 });
    expect(isBacktopDistance(0)).toBe(true);
    expect(isBacktopDistance(24)).toBe(true);
    expect(isBacktopDistance(-1)).toBe(false);
    expect(isBacktopDistance(Number.NaN)).toBe(false);
    expect(backtopApiContract.validators?.right?.(24)).toBe(true);
    expect(backtopManifest.contract.exposes.map(field => field.name)).toEqual([
      'scrollToTop',
      'focus',
    ]);
  });

  it('resolves visibility at the exact threshold', () => {
    expect(resolveBacktopVisibility(99, 100)).toBe(false);
    expect(resolveBacktopVisibility(100, 100)).toBe(true);
    expect(resolveBacktopVisibility(-10, -20)).toBe(true);
  });

  it('clamps progress and resolves a monotonic scroll offset', () => {
    expect(resolveBacktopEasedProgress(-1)).toBe(0);
    expect(resolveBacktopEasedProgress(0.5)).toBe(0.5);
    expect(resolveBacktopEasedProgress(2)).toBe(1);
    expect(resolveBacktopScrollOffset(500, 0)).toBe(500);
    expect(resolveBacktopScrollOffset(500, 0.5)).toBe(250);
    expect(resolveBacktopScrollOffset(500, 1)).toBe(0);
    expect(resolveBacktopScrollOffset(-20, 0.5)).toBe(0);
  });
});
