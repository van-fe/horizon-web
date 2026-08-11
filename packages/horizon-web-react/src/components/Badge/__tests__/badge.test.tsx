import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { Badge } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Badge', () => {
  it('caps numeric content with the shared formatter', async () => {
    await render(
      h(Badge, { badgeLabel: '10 unread messages', content: 10, numMax: 9, type: 'num' }, 'Inbox'),
    );

    const badge = getContainer().querySelector('.h-badge')!;
    const content = badge.querySelector('.h-badge__content')!;
    expect(badge.classList.contains('h-badge--num')).toBe(true);
    expect(content.textContent).toBe('9+');
    expect(content.getAttribute('aria-label')).toBe('10 unread messages');
  });

  it('supports hidden, icon, position and offset modes', async () => {
    await render(h(Badge, { hidden: true }, 'Target'));
    expect(getContainer().querySelector('.h-badge__content')).toBeNull();

    await render(
      h(
        Badge,
        {
          align: 'outer',
          bottom: true,
          icon: h('span', { 'data-icon': true }, '!'),
          offset: { bottom: '4px', right: '6px' },
          type: 'icon',
        },
        'Target',
      ),
    );
    const badge = getContainer().querySelector('.h-badge')!;
    const content = badge.querySelector('.h-badge__content') as HTMLElement;
    expect(badge.classList.contains('h-badge--bottom')).toBe(true);
    expect(badge.classList.contains('h-badge--outer')).toBe(true);
    expect(content.querySelector('[data-icon]')?.textContent).toBe('!');
    expect(content.style.bottom).toBe('4px');
    expect(content.style.right).toBe('6px');
  });

  it('marks decorative badges as hidden from assistive technology', async () => {
    await render(h(Badge, { content: 3, type: 'num' }, 'Target'));
    expect(getContainer().querySelector('.h-badge__content')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });
});
