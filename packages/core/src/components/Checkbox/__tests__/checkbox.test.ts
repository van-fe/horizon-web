import { describe, expect, it } from 'vitest';
import { getCheckboxChecked, isCheckboxValue, toggleCheckboxValue } from '../contract';

describe('Checkbox contract', () => {
  it('validates scalar and list values', () => {
    expect(isCheckboxValue(true)).toBe(true);
    expect(isCheckboxValue(['one', 2, false])).toBe(true);
    expect(isCheckboxValue(['one', null])).toBe(false);
  });

  it('toggles boolean and custom true/false values', () => {
    expect(toggleCheckboxValue(false, '')).toEqual({ value: true, checked: true });
    expect(toggleCheckboxValue('off', '', 'on', 'off')).toEqual({ value: 'on', checked: true });
    expect(toggleCheckboxValue('on', '', 'on', 'off')).toEqual({ value: 'off', checked: false });
  });

  it('adds and removes group options without mutating the source', () => {
    const source = ['kept'] as const;
    expect(toggleCheckboxValue(source, 'added')).toEqual({
      value: ['kept', 'added'],
      checked: true,
    });
    expect(source).toEqual(['kept']);
    expect(toggleCheckboxValue(['kept', 'added'], 'added')).toEqual({
      value: ['kept'],
      checked: false,
    });
  });

  it('resolves checked state using the effective checked value', () => {
    expect(getCheckboxChecked(['one'], 'one')).toBe(true);
    expect(getCheckboxChecked('yes', '', 'yes')).toBe(true);
    expect(getCheckboxChecked(false, '')).toBe(false);
  });
});
