import { afterEach, describe, expect, it } from 'vitest';
import { focusDropdownItem, getEnabledDropdownItems } from '..';

afterEach(() => document.body.replaceChildren());

describe('Dropdown browser primitives', () => {
  it('filters disabled items and wraps focus', () => {
    const menu = document.createElement('div');
    menu.innerHTML = `
      <button role="menuitem">One</button>
      <button role="menuitem" aria-disabled="true">Disabled</button>
      <button role="menuitem">Three</button>
    `;
    document.body.append(menu);
    const items = getEnabledDropdownItems(menu);
    expect(items).toHaveLength(2);
    expect(focusDropdownItem(menu, 'ArrowDown')).toBe(items[0]);
    expect(document.activeElement).toBe(items[0]);
    expect(focusDropdownItem(menu, 'ArrowUp', items[0])).toBe(items[1]);
    expect(focusDropdownItem(menu, 'Home', items[1])).toBe(items[0]);
    expect(focusDropdownItem(menu, 'End', items[0])).toBe(items[1]);
  });
});
