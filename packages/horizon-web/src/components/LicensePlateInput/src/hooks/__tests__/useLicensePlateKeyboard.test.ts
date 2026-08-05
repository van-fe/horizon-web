import { describe, expect, test } from 'vitest';
import {
  getLicensePlateKeyboardKeys,
  removeLicensePlateCharacter,
  sanitizeLicensePlateInput,
} from '../useLicensePlateKeyboard';

describe('useLicensePlateKeyboard helpers', () => {
  const provinces = ['京', '沪', '粤'];

  test('sanitizes pasted values by plate position', () => {
    expect(sanitizeLicensePlateInput(' 沪 iA·12-3O45 ', provinces)).toBe('沪A12345');
    expect(sanitizeLicensePlateInput('粤bd12345extra', provinces)).toBe('粤BD12345');
    expect(sanitizeLicensePlateInput('浙A12345', provinces)).toBe('');
  });

  test('returns position-specific keyboard layouts', () => {
    expect(getLicensePlateKeyboardKeys(0, provinces)).toEqual(provinces);
    expect(getLicensePlateKeyboardKeys(1, provinces)).toContain('A');
    expect(getLicensePlateKeyboardKeys(1, provinces)).not.toContain('0');
    expect(getLicensePlateKeyboardKeys(2, provinces)).toContain('0');
    expect(getLicensePlateKeyboardKeys(2, provinces)).not.toContain('挂');
    expect(getLicensePlateKeyboardKeys(6, provinces)).toContain('挂');
  });

  test('clears the whole plate when removing the province', () => {
    expect(removeLicensePlateCharacter('京A12345', 0)).toEqual({
      value: '',
      activeIndex: 0,
      provinceRemoved: true,
    });
    expect(removeLicensePlateCharacter('京A12345', 6)).toEqual({
      value: '京A1234',
      activeIndex: 6,
      provinceRemoved: false,
    });
  });
});
