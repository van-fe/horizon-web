import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider, PageHeader } from '../../../index';
import { click, getContainer, render } from '../../../__tests__/harness';

describe('React PageHeader', () => {
  it('renders semantic fallback content, divider, actions and a forwarded ref', async () => {
    const ref = createRef<HTMLElement>();
    await render(
      h(PageHeader, {
        ref,
        title: 'Accessibility audit',
        content: 'Owner: Mira',
        breadcrumb: 'Workspace / Audit',
        tags: 'In review',
        actions: h('button', { type: 'button' }, 'Request review'),
      }),
    );

    expect(ref.current?.tagName).toBe('HEADER');
    expect(ref.current?.classList.contains('has-divider')).toBe(true);
    expect(ref.current?.querySelector('h1')?.textContent).toBe('Accessibility audit');
    expect(ref.current?.querySelector('.h-page-header__breadcrumb')?.textContent).toBe(
      'Workspace / Audit',
    );
    expect(ref.current?.querySelector('.h-page-header__inner--content')?.textContent).toBe(
      'Owner: Mira',
    );
    expect(ref.current?.querySelector('.h-page-header__extra')?.textContent).toBe('Request review');
  });

  it('uses provider back label, emits back and supports hiding the action', async () => {
    const onBack = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { pageHeaderLabels: { back: 'Return to projects' } },
        h(PageHeader, { title: 'Project', onBack }),
      ),
    );
    const action = getContainer().querySelector(
      'button[aria-label="Return to projects"]',
    ) as HTMLButtonElement;
    expect(action).not.toBeNull();
    await click(action);
    expect(onBack).toHaveBeenCalledOnce();

    await render(h(PageHeader, { title: 'Project', showBack: false, useDivider: false }));
    expect(getContainer().querySelector('.h-page-header__back')).toBeNull();
    expect(getContainer().querySelector('.h-page-header')?.classList.contains('has-divider')).toBe(
      false,
    );
  });

  it('honors complete-region precedence and supports narrow long content', async () => {
    await render(
      h(
        'div',
        { style: { width: '390px' } },
        h(
          PageHeader,
          {
            title: 'Fallback',
            header: h('h2', { 'data-test': 'custom-header' }, 'Custom header'),
            titleContainer: h('h3', { 'data-test': 'unused-title' }, 'Unused'),
            tags: h('span', { 'data-test': 'unused-tags' }, 'Unused tag'),
            description: 'Description'.repeat(80),
            actions: 'Action'.repeat(40),
          },
          'Body'.repeat(100),
        ),
      ),
    );
    const root = getContainer().querySelector('.h-page-header') as HTMLElement;
    expect(root.querySelector('[data-test="custom-header"]')?.textContent).toBe('Custom header');
    expect(root.querySelector('[data-test="unused-title"]')).toBeNull();
    expect(root.querySelector('[data-test="unused-tags"]')).toBeNull();
    expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
  });
});
