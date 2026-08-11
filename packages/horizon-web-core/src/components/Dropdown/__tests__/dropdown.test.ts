import { describe, expect, it } from 'vitest';
import { resolveDropdownContextMenuPosition } from '..';

describe('Dropdown Web Core', () => {
  it('normalizes context menu coordinates', () => {
    expect(resolveDropdownContextMenuPosition(12, 24)).toEqual({ position: 'fixed', x: 12, y: 24 });
    expect(resolveDropdownContextMenuPosition(Number.NaN, Number.POSITIVE_INFINITY)).toEqual({
      position: 'fixed',
      x: 0,
      y: 0,
    });
  });
});
