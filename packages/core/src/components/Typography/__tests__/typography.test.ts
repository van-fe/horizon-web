import { describe, expect, it } from 'vitest';
import {
  isTypographyEllipsis,
  isTypographyLevel,
  resolveTypographyEllipsisLines,
  resolveTypographyTag,
  TYPOGRAPHY_DEFAULTS,
  typographyApiContract,
} from '..';

describe('Typography contract', () => {
  it('owns shared defaults and validators', () => {
    expect(typographyApiContract.defaults).toBe(TYPOGRAPHY_DEFAULTS);
    expect(isTypographyLevel(6)).toBe(true);
    expect(isTypographyLevel(7)).toBe(false);
    expect(isTypographyEllipsis(true)).toBe(true);
    expect(isTypographyEllipsis(2)).toBe(true);
    expect(isTypographyEllipsis(0)).toBe(false);
  });

  it('resolves semantic tags and ellipsis lines', () => {
    expect(resolveTypographyTag('span')).toBe('span');
    expect(resolveTypographyTag('span', 2)).toBe('h2');
    expect(resolveTypographyEllipsisLines(false)).toBe(0);
    expect(resolveTypographyEllipsisLines(true)).toBe(1);
    expect(resolveTypographyEllipsisLines(3)).toBe(3);
  });
});
