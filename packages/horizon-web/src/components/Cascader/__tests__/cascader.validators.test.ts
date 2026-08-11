import { describe, expect, test } from 'vitest';
import { useCascaderEmits, useCascaderSearchPanelEmits } from '../src/composables/useEmits';

describe('Cascader emit validators', () => {
  test('accepts and rejects every payload-bearing public event boundary', () => {
    const mouse = new MouseEvent('click');
    const event = new Event('scroll');
    const option = { label: 'Leaf', value: 'leaf' } as never;

    expect(useCascaderEmits['update:modelValue']([])).toBe(true);
    expect(useCascaderEmits['update:modelValue'](null)).toBe(true);
    expect(useCascaderEmits.dropdownVisibleChange(true)).toBe(true);
    expect(useCascaderEmits.dropdownVisibleChange('true' as never)).toBe(false);
    expect(useCascaderEmits.focus()).toBe(true);
    expect(useCascaderEmits.blur()).toBe(true);
    expect(useCascaderEmits.input('leaf')).toBe(true);
    expect(useCascaderEmits.input(1 as never)).toBe(false);
    expect(useCascaderEmits['update:options']([])).toBe(true);
    expect(useCascaderEmits['update:options']({} as never)).toBe(false);
    expect(useCascaderEmits.search('leaf')).toBe(true);
    expect(useCascaderEmits.search(null as never)).toBe(false);
    expect(useCascaderEmits.change(true, option)).toBe(true);
    expect(useCascaderEmits.change(undefined, undefined)).toBe(true);
    expect(useCascaderEmits.change('true' as never, option)).toBe(false);
    expect(useCascaderEmits.clear()).toBe(true);
    expect(useCascaderEmits.select(['root', 'leaf'], option)).toBe(true);
    expect(useCascaderEmits.select(null as never, null as never)).toBe(true);
    expect(useCascaderEmits.select('leaf' as never, option)).toBe(false);
    expect(useCascaderEmits.deselect(['root', 'leaf'], option)).toBe(true);
    expect(useCascaderEmits.deselect([], undefined)).toBe(true);
    expect(useCascaderEmits.modify([['root', 'leaf']], false, option)).toBe(true);
    expect(useCascaderEmits.modify(null, undefined, undefined)).toBe(true);
    expect(useCascaderEmits.modify('leaf' as never, true, option)).toBe(false);
    expect(useCascaderEmits.confirm([])).toBe(true);
    expect(useCascaderEmits.confirm('leaf' as never)).toBe(false);
    expect(useCascaderEmits.cancel(null)).toBe(true);
    expect(useCascaderEmits.panelReachBottom(event, option)).toBe(true);
    expect(useCascaderEmits.panelReachBottom(undefined, null)).toBe(true);
    expect(useCascaderEmits.panelReachBottom({} as Event, option)).toBe(false);
    expect(useCascaderEmits.click(mouse)).toBe(true);
    expect(useCascaderEmits.click(event as MouseEvent)).toBe(false);
    expect(useCascaderSearchPanelEmits.confirm()).toBe(true);
  });
});
