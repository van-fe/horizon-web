import { describe, expect, it } from 'vitest';
import {
  AVATAR_DEFAULTS,
  avatarApiContract,
  getAvatarInitials,
  isAvatarFit,
  isAvatarSize,
  isAvatarType,
} from '..';

describe('Avatar contract', () => {
  it('creates initials', () => {
    expect(getAvatarInitials('Ada Lovelace')).toBe('AL');
    expect(getAvatarInitials('Aurora')).toBe('AU');
  });

  it('owns defaults and runtime validators for both renderers', () => {
    expect(avatarApiContract.defaults).toBe(AVATAR_DEFAULTS);
    expect(isAvatarSize('smedium')).toBe(true);
    expect(isAvatarSize(40)).toBe(true);
    expect(isAvatarSize('huge')).toBe(false);
    expect(isAvatarFit('scale-down')).toBe(true);
    expect(isAvatarFit('stretch')).toBe(false);
    expect(isAvatarType('work')).toBe(true);
    expect(isAvatarType('team')).toBe(false);
  });
});
