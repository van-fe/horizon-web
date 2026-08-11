import { describe, expect, it } from 'vitest';
import {
  BADGE_DEFAULTS,
  badgeApiContract,
  formatBadgeContent,
  isBadgeAlign,
  isBadgeType,
} from '..';

describe('Badge contract', () => {
  it('caps counts', () => {
    expect(formatBadgeContent(3, 9)).toBe(3);
    expect(formatBadgeContent(10, 9)).toBe('9+');
  });

  it('owns defaults and runtime validators for both renderers', () => {
    expect(badgeApiContract.defaults).toBe(BADGE_DEFAULTS);
    expect(isBadgeType('icon')).toBe(true);
    expect(isBadgeType('text')).toBe(false);
    expect(isBadgeAlign('fix-left')).toBe(true);
    expect(isBadgeAlign('bottom')).toBe(false);
  });
});
