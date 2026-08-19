import { describe, expect, it } from 'vitest';
import { resolveMaskRootStyle } from '..';

describe('resolveMaskRootStyle', () => {
  it('keeps visible masks interactive', () => {
    expect(resolveMaskRootStyle(true, 4)).toEqual({
      opacity: 1,
      pointerEvents: 'auto',
      zIndex: 4,
    });
  });

  it('makes hidden masks transparent and non-interactive', () => {
    expect(resolveMaskRootStyle(false, 12)).toEqual({
      opacity: 0,
      pointerEvents: 'none',
      zIndex: 12,
    });
  });
});
