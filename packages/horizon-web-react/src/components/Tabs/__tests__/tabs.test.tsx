import type { ReactElement } from 'react';
import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Tab, Tabs } from '../../../index';
import type { TabsHandle } from '..';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

function item(value: string, extra = {}): ReactElement {
  return h(Tab, { label: value.toUpperCase(), value, ...extra });
}

describe('React Tabs', () => {
  it('renders tab semantics, appearance and controlled selection callbacks', async () => {
    const onChange = vi.fn();
    const onClick = vi.fn();
    await render(
      h(
        Tabs,
        { className: 'consumer-tabs', onChange, size: 'large', value: 'one', variant: 'card' },
        item('one'),
        item('two', { onClick }),
        item('disabled', { disabled: true }),
      ),
    );
    const root = getContainer().querySelector('[role="tablist"]')!;
    const one = root.querySelector<HTMLElement>('[data-tab-key="one"]')!;
    const two = root.querySelector<HTMLElement>('[data-tab-key="two"]')!;

    expect(root.classList.contains('h-tabs--card')).toBe(true);
    expect(root.classList.contains('h-tabs--large')).toBe(true);
    expect(root.classList.contains('consumer-tabs')).toBe(true);
    expect(one.getAttribute('aria-selected')).toBe('true');
    expect(root.querySelector('[data-tab-key="disabled"]')?.getAttribute('aria-disabled')).toBe(
      'true',
    );
    await click(two);
    expect(onClick).toHaveBeenCalledWith('two');
    expect(onChange).toHaveBeenCalledWith('two');
    expect(one.getAttribute('aria-selected')).toBe('true');
  });

  it('handles uncontrolled state, rejected guards and stale async guards', async () => {
    const onChange = vi.fn();
    await render(
      h(
        Tabs,
        { beforeChange: async () => false, defaultValue: 'one', onChange },
        item('one'),
        item('two'),
      ),
    );
    await click(getContainer().querySelector('[data-tab-key="two"]')!);
    expect(onChange).not.toHaveBeenCalled();
    expect(
      getContainer().querySelector('[data-tab-key="one"]')?.getAttribute('aria-selected'),
    ).toBe('true');

    const gate = Promise.withResolvers<boolean>();
    await render(
      h(
        Tabs,
        { beforeChange: () => gate.promise, onChange, value: 'one' },
        item('one'),
        item('two'),
      ),
    );
    await click(getContainer().querySelector('[data-tab-key="two"]')!);
    await render(h(Tabs, { value: 'external' }, item('one'), item('two')));
    gate.resolve(true);
    await Promise.resolve();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('supports roving keyboard navigation while skipping disabled tabs', async () => {
    const onChange = vi.fn();
    await render(
      h(
        Tabs,
        { defaultValue: 'one', onChange },
        item('one'),
        item('disabled', { disabled: true }),
        item('two'),
      ),
    );
    const one = getContainer().querySelector<HTMLElement>('[data-tab-key="one"]')!;
    one.focus();
    await dispatch(one, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    expect(document.activeElement).toBe(getContainer().querySelector('[data-tab-key="two"]'));
    expect(onChange).toHaveBeenCalledWith('two');
  });

  it('supports editable actions, close fallback and the focus ref', async () => {
    const onAdd = vi.fn();
    const onChange = vi.fn();
    const onClose = vi.fn();
    const tabsRef = createRef<TabsHandle>();
    await render(
      h(
        Tabs,
        { defaultValue: 'one', editable: true, onAdd, onChange, onClose, ref: tabsRef },
        item('one', { closable: true }),
        item('two', { closable: true }),
      ),
    );

    await click(getContainer().querySelector('[aria-label="Close ONE"]')!);
    expect(onClose).toHaveBeenCalledWith('one');
    expect(onChange).toHaveBeenCalledWith('two');
    await click(getContainer().querySelector('[aria-label="Add tab"]')!);
    expect(onAdd).toHaveBeenCalledOnce();
    tabsRef.current?.focus('two');
    expect(document.activeElement).toBe(getContainer().querySelector('[data-tab-key="two"]'));
    expect(tabsRef.current?.root?.getAttribute('role')).toBe('tablist');
  });

  it('reports drag reordering and renders custom regions', async () => {
    const onSort = vi.fn();
    await render(
      h(
        Tabs,
        {
          draggable: true,
          extra: ({ size }) => h('strong', { 'data-extra': true }, size),
          onSort,
          size: 'medium',
        },
        h(Tab, { icon: h('span', { 'data-icon': true }, '★'), value: 'one' }, ({ active }) =>
          h('span', { 'data-custom': true }, active ? 'Active' : 'Inactive'),
        ),
        item('two'),
      ),
    );
    const one = getContainer().querySelector<HTMLElement>('[data-tab-key="one"]')!;
    const two = getContainer().querySelector<HTMLElement>('[data-tab-key="two"]')!;
    const transfer = new DataTransfer();
    await dispatch(one, new DragEvent('dragstart', { bubbles: true, dataTransfer: transfer }));
    await dispatch(two, new DragEvent('dragover', { bubbles: true, cancelable: true }));
    await dispatch(two, new DragEvent('drop', { bubbles: true }));
    expect(onSort).toHaveBeenCalledWith(0, 1, ['two', 'one']);
    expect(getContainer().querySelector('[data-extra]')?.textContent).toBe('medium');
    expect(getContainer().querySelector('[data-icon]')?.textContent).toBe('★');
    expect(getContainer().querySelector('[data-custom]')?.textContent).toBe('Inactive');
  });

  it('shows overflow arrows for long tab sets', async () => {
    await render(h(Tabs, { arrow: true }, ...['a', 'b', 'c', 'd', 'e'].map(key => item(key))));
    expect(getContainer().querySelector('[aria-label="Scroll tabs backward"]')).not.toBeNull();
    expect(getContainer().querySelector('[aria-label="Scroll tabs forward"]')).not.toBeNull();
  });
});
