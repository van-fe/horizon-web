import { describe, expect, it } from 'vitest';
import {
  isCollapseActivationKey,
  isCollapseItemActive,
  normalizeCollapseValue,
  resolveCollapseInitialValue,
  toggleCollapseValue,
} from '..';

describe('Collapse contract', () => {
  it('normalizes accordion and multi-panel values', () => {
    expect(normalizeCollapseValue(['a', 'b'], true)).toBe('a');
    expect(normalizeCollapseValue('a', false)).toEqual(['a']);
    expect(normalizeCollapseValue(['a', 'a'], false)).toEqual(['a']);
    expect(normalizeCollapseValue(undefined, false)).toEqual([]);
  });

  it('toggles values without mutating the input', () => {
    const value = ['a', 'b'] as const;
    expect(toggleCollapseValue(value, 'a', false)).toEqual(['b']);
    expect(toggleCollapseValue(value, 'c', false)).toEqual(['a', 'b', 'c']);
    expect(value).toEqual(['a', 'b']);
    expect(toggleCollapseValue('a', 'a', true)).toBeUndefined();
    expect(toggleCollapseValue(undefined, 'b', true)).toBe('b');
  });

  it('resolves active state and expand-all defaults', () => {
    expect(isCollapseItemActive(['a'], 'a', false)).toBe(true);
    expect(isCollapseItemActive('a', 'a', true)).toBe(true);
    expect(
      resolveCollapseInitialValue(
        ['a'],
        [{ name: 'a' }, { name: 'b' }, { name: 'c', disabled: true }],
        false,
        true,
      ),
    ).toEqual(['a', 'b']);
  });

  it('recognizes native activation keys', () => {
    expect(isCollapseActivationKey('Enter')).toBe(true);
    expect(isCollapseActivationKey(' ')).toBe(true);
    expect(isCollapseActivationKey('Escape')).toBe(false);
  });
});
