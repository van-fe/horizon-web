import { describe, expect, test } from 'vitest';
import {
  isEqualIgnoreCtx,
  isOptionChecked,
  isValueHasCtx,
  removeObjectCtx,
} from '../src/utils/valueFormat';
import { isEqualLoose } from '../src/utils/utils';

describe('Cascader value contracts', () => {
  test('compares values without Vue context metadata', () => {
    const context = { component: 'scope' };
    const withContext = { value: 'leaf', label: 'Leaf', _ctx: context };
    const plain = { value: 'leaf', label: 'Leaf' };

    expect(isValueHasCtx(withContext)).toBe(true);
    expect(isValueHasCtx(plain)).toBe(false);
    expect(isValueHasCtx(null)).toBe(false);
    expect(removeObjectCtx(withContext)).toEqual(plain);
    expect(withContext._ctx).toBe(context);
    expect(removeObjectCtx('leaf')).toBe('leaf');
    expect(isEqualIgnoreCtx(withContext, plain)).toBe(true);
    expect(isEqualIgnoreCtx(plain, plain)).toBe(true);
    expect(isEqualIgnoreCtx(withContext, { value: 'other', label: 'Leaf' })).toBe(false);
  });

  test('checks primitive and numeric option values in sets', () => {
    const selected = new Set<string | number>(['leaf', 2]);
    expect(isOptionChecked(selected, 'leaf')).toBe(true);
    expect(isOptionChecked(selected, 2)).toBe(true);
    expect(isOptionChecked(selected, '2')).toBe(false);
  });

  test('uses documented loose equality for empty and primitive model values', () => {
    expect(isEqualLoose(undefined, null)).toBe(true);
    expect(isEqualLoose([], null)).toBe(true);
    expect(isEqualLoose(['1', 2], [1, '2'])).toBe(true);
    expect(isEqualLoose([1], [2])).toBe(false);
    expect(isEqualLoose([['1']], [[1]])).toBe(true);
    expect(isEqualLoose([{ value: 1 }] as never, [{ value: 1 }] as never)).toBe(true);
  });
});
