import { createElement as h } from 'react';
import { act } from 'react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { click, getContainer, render } from '../../../__tests__/harness';
import { Breadcrumb, BreadcrumbItem, HorizonWebProvider } from '../../../index';

describe('React Breadcrumb', () => {
  it('renders data items, shared presentation defaults and item callbacks', async () => {
    const onItemClick = vi.fn();
    const first = { text: 'Workspace', clickable: true };
    await render(
      h(Breadcrumb, {
        items: [first, { text: 'Components' }, { text: 'Breadcrumb' }],
        onItemClick,
        separator: '→',
        size: 'small',
        title: true,
      }),
    );
    const container = getContainer();
    const nav = container.querySelector('nav')!;
    const itemRoots = container.querySelectorAll('[data-breadcrumb-item]');

    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    expect(nav.classList).toContain('h-breadcrumb--small');
    expect(itemRoots).toHaveLength(3);
    expect(itemRoots[0]?.querySelector('.h-breadcrumb-item__suffix')?.textContent).toBe('→');
    expect(itemRoots[2]?.querySelector('.h-breadcrumb-item__text')?.classList).toContain(
      'h-breadcrumb-item__title',
    );

    await click(itemRoots[0]!.querySelector('button')!);
    expect(onItemClick).toHaveBeenCalledOnce();
    expect(onItemClick.mock.calls[0]?.[0]).toBe(first);
    expect(onItemClick.mock.calls[0]?.[1].nativeEvent).toBeInstanceOf(MouseEvent);
  });

  it('uses native keyboard activation and the provider navigation adapter', async () => {
    const navigate = vi.fn();
    const onActionClick = vi.fn();
    const onItemClick = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { navigate, resolveHref: to => `/resolved/${String(to)}` },
        h(
          Breadcrumb,
          { onItemClick },
          h(BreadcrumbItem, { clickable: true, onClick: onActionClick }, 'Action'),
          h(BreadcrumbItem, { replace: true, to: 'settings' }, 'Settings'),
          h(BreadcrumbItem, null, 'Current'),
        ),
      ),
    );
    const container = getContainer();
    const action = container.querySelector('button')!;
    const link = container.querySelector('a')!;

    action.focus();
    await act(async () => userEvent.keyboard('{Enter}'));
    expect(onActionClick).toHaveBeenCalledOnce();
    expect(onItemClick).toHaveBeenCalledOnce();
    expect(link.getAttribute('href')).toBe('/resolved/settings');

    await click(link);
    expect(navigate).toHaveBeenCalledWith('settings', { replace: true });
    expect(onItemClick).toHaveBeenCalledTimes(2);
  });

  it('supports composed content and item-level separators', async () => {
    await render(
      h(
        Breadcrumb,
        { separator: '/' },
        h(BreadcrumbItem, { separator: h('b', { 'data-separator': true }, '·') }, 'Workspace'),
        h(BreadcrumbItem, null, h('strong', { 'data-content': true }, 'Current')),
      ),
    );
    const container = getContainer();

    expect(container.querySelector('[data-content]')?.textContent).toBe('Current');
    expect(container.querySelector('[data-separator]')?.textContent).toBe('·');
  });

  it('collapses measured overflow into an accessible menu and restores after growth', async () => {
    const items = [
      { text: 'Workspace' },
      { text: 'Customer research programme', clickable: true },
      { text: 'Accessibility findings' },
      { text: 'Release verification', clickable: true },
      { text: 'Current page' },
    ];

    await render(
      h('div', { style: { width: '120px' } }, h(Breadcrumb, { displayType: 'ellipsis', items })),
    );
    await act(async () => {
      await vi.waitFor(() => {
        expect(getContainer().querySelector('summary')).not.toBeNull();
      });
    });

    const summary = getContainer().querySelector('summary')!;
    expect(summary.getAttribute('aria-label')).toBe('Show collapsed breadcrumb items');
    await click(summary);
    expect(getContainer().querySelector('[data-breadcrumb-menu]')).not.toBeNull();

    await render(
      h('div', { style: { width: '1200px' } }, h(Breadcrumb, { displayType: 'ellipsis', items })),
    );
    await act(async () => {
      await vi.waitFor(() => {
        expect(getContainer().querySelector('summary')).toBeNull();
      });
    });
  });

  it('warns and remains on-page when a route has no navigation adapter or href', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    await render(h(Breadcrumb, { items: [{ text: 'Missing', to: '/missing' }] }));

    await click(getContainer().querySelector('a')!);
    expect(warn).toHaveBeenCalledWith(
      'BreadcrumbItem requires a navigation adapter for the `to` prop.',
    );
    warn.mockRestore();
  });
});
