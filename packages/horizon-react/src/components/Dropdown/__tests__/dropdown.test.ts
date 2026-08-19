import type { ReactElement } from 'react';
import { createElement as h, createRef } from 'react';
import { afterAll, describe, expect, it, vi } from 'vitest';
import {
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownMenu,
  DropdownSubmenu,
  type DropdownHandle,
} from '..';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

afterAll(() => document.querySelectorAll('[data-dropdown-portal]').forEach(node => node.remove()));

function menu(onPress = vi.fn()): ReactElement {
  return h(
    DropdownMenu,
    null,
    h(DropdownItem, { command: 'edit', onPress }, 'Edit'),
    h(DropdownItem, { disabled: true }, 'Disabled'),
  );
}

describe('React Dropdown', () => {
  it('opens from click, emits commands and closes after activation', async () => {
    const onCommand = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(
        Dropdown,
        { menu: menu(), onCommand, onOpenChange, trigger: 'click' },
        h('button', null, 'Actions'),
      ),
    );
    const trigger = getContainer().querySelector<HTMLButtonElement>('button')!;
    await click(trigger);
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(document.querySelector('[role="menu"]')).not.toBeNull();
    await click(document.querySelector<HTMLButtonElement>('[role="menuitem"]')!);
    expect(onCommand).toHaveBeenCalledWith('edit');
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'click' });
  });

  it('uses keyboard navigation and skips disabled items', async () => {
    const ref = createRef<DropdownHandle>();
    await render(
      h(
        Dropdown,
        { defaultOpen: true, menu: menu(), ref, trigger: 'manual' },
        h('button', null, 'Open'),
      ),
    );
    ref.current?.focusFirst();
    const items = document.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
    expect(document.activeElement).toBe(items[0]);
    await dispatch(
      getContainer().firstElementChild!,
      new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }),
    );
    expect(document.activeElement).toBe(items[0]);
  });

  it('renders grouped and nested menu content', async () => {
    await render(
      h(
        Dropdown,
        {
          defaultOpen: true,
          menu: h(
            DropdownMenu,
            null,
            h(DropdownGroup, { title: 'File' }, h(DropdownItem, null, 'New')),
            h(DropdownSubmenu, {
              submenu: h(DropdownItem, null, 'Child'),
              title: 'More',
              trigger: 'click',
            }),
          ),
          trigger: 'manual',
        },
        h('button', null, 'Open'),
      ),
    );
    expect(document.querySelector('[role="group"]')?.textContent).toContain('File');
    const submenu = Array.from(
      document.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'),
    ).find(item => item.textContent?.includes('More'))!;
    await click(submenu);
    expect(document.body.textContent).toContain('Child');
  });

  it('positions context menus in a custom portal', async () => {
    const portal = document.createElement('section');
    portal.dataset.dropdownPortal = '';
    document.body.append(portal);
    await render(
      h(
        Dropdown,
        { menu: menu(), portalContainer: portal, trigger: 'context-menu' },
        h('button', null, 'Context'),
      ),
    );
    await dispatch(
      getContainer().querySelector('button')!,
      new MouseEvent('contextmenu', { bubbles: true, clientX: 32, clientY: 48 }),
    );
    expect(portal.textContent).toContain('Edit');
    expect(portal.firstElementChild?.getAttribute('style')).toContain('translate(32px, 48px)');

    await dispatch(document.body, new MouseEvent('click', { bubbles: true }));
    expect(portal.textContent).not.toContain('Edit');
  });

  it('closes a context menu with Escape and restores trigger focus', async () => {
    await render(
      h(Dropdown, { menu: menu(), trigger: 'context-menu' }, h('button', null, 'Context')),
    );
    const trigger = getContainer().querySelector<HTMLButtonElement>('button')!;
    await dispatch(
      trigger,
      new MouseEvent('contextmenu', { bubbles: true, clientX: 32, clientY: 48 }),
    );
    await dispatch(document.body, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelector('[role="menu"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
