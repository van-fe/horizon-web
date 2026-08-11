import { describe, expect, it } from 'vitest';
import {
  DROPDOWN_DEFAULTS,
  DROPDOWN_ITEM_DEFAULTS,
  DROPDOWN_SUBMENU_DEFAULTS,
  getNextDropdownItemIndex,
  isDropdownAlign,
  isDropdownSize,
  isDropdownSubmenuTrigger,
  isDropdownTheme,
  isDropdownTrigger,
  normalizeDropdownTrigger,
  resolveDropdownPlacement,
} from '..';

describe('Dropdown contract', () => {
  it('defines stable defaults and validators', () => {
    expect(DROPDOWN_DEFAULTS).toMatchObject({
      align: 'left',
      distance: 4,
      hideDelay: 100,
      showDelay: 200,
      trigger: 'hover',
    });
    expect(DROPDOWN_ITEM_DEFAULTS.divided).toBe(false);
    expect(DROPDOWN_SUBMENU_DEFAULTS.trigger).toBe('hover');
    expect(isDropdownTheme('midnight')).toBe(true);
    expect(isDropdownTrigger('context-menu')).toBe(true);
    expect(isDropdownSize('medium')).toBe(true);
    expect(isDropdownAlign('center')).toBe(true);
    expect(isDropdownSubmenuTrigger('manual')).toBe(false);
  });

  it('resolves alignment and legacy context menu triggers', () => {
    expect(resolveDropdownPlacement(undefined, 'left')).toBe('bottom-start');
    expect(resolveDropdownPlacement(undefined, 'center')).toBe('bottom');
    expect(resolveDropdownPlacement(undefined, 'right')).toBe('bottom-end');
    expect(resolveDropdownPlacement('top-start', 'right')).toBe('top-start');
    expect(normalizeDropdownTrigger('contextMenu')).toBe('context-menu');
  });

  it('moves through enabled item indexes with wrapping', () => {
    expect(getNextDropdownItemIndex(0, 0, 'ArrowDown')).toBe(-1);
    expect(getNextDropdownItemIndex(3, -1, 'ArrowDown')).toBe(0);
    expect(getNextDropdownItemIndex(3, -1, 'ArrowUp')).toBe(2);
    expect(getNextDropdownItemIndex(3, 0, 'ArrowUp')).toBe(2);
    expect(getNextDropdownItemIndex(3, 2, 'ArrowDown')).toBe(0);
    expect(getNextDropdownItemIndex(3, 1, 'Home')).toBe(0);
    expect(getNextDropdownItemIndex(3, 1, 'End')).toBe(2);
  });
});
