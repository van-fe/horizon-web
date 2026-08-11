import { describe, expect, it } from 'vitest';
import { reorderTabsKeys, resolveTabsCloseValue, resolveTabsNavigationIndex } from '..';

describe('Tabs contract', () => {
  it('resolves roving keyboard targets', () => {
    expect(resolveTabsNavigationIndex(0, 'ArrowRight', 3)).toBe(1);
    expect(resolveTabsNavigationIndex(0, 'ArrowLeft', 3)).toBe(2);
    expect(resolveTabsNavigationIndex(1, 'Home', 3)).toBe(0);
    expect(resolveTabsNavigationIndex(1, 'End', 3)).toBe(2);
    expect(resolveTabsNavigationIndex(0, 'Home', 0)).toBeUndefined();
  });

  it('selects a neighboring tab when the active item closes', () => {
    expect(resolveTabsCloseValue('one', 'one', ['one', 'two', 'three'])).toBe('two');
    expect(resolveTabsCloseValue('two', 'two', ['one', 'two', 'three'])).toBe('three');
    expect(resolveTabsCloseValue('three', 'three', ['one', 'two', 'three'])).toBe('two');
    expect(resolveTabsCloseValue('one', 'two', ['one', 'two'])).toBe('one');
  });

  it('reorders without mutating input or accepting invalid indexes', () => {
    const keys = ['one', 'two', 'three'] as const;
    expect(reorderTabsKeys(keys, 0, 2)).toEqual(['three', 'two', 'one']);
    expect(reorderTabsKeys(keys, -1, 2)).toEqual(keys);
    expect(reorderTabsKeys(keys, 1, 1)).toEqual(keys);
    expect(keys).toEqual(['one', 'two', 'three']);
  });
});
