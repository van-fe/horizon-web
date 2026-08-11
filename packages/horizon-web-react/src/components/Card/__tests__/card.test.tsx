import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { Card } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Card', () => {
  it('renders shared defaults, title and body semantics', async () => {
    await render(h(Card, { title: 'Account' }, h('p', null, 'Profile')));

    const card = getContainer().querySelector('.h-card') as HTMLElement;
    expect(card.tagName).toBe('SECTION');
    expect(card.classList.contains('h-card--medium')).toBe(true);
    expect(card.classList.contains('is-border')).toBe(true);
    expect(card.querySelector('header')?.textContent).toBe('Account');
    expect(card.querySelector('.h-card__content')?.textContent).toBe('Profile');
  });

  it('renders custom regions and dividers without a title', async () => {
    await render(
      h(
        Card,
        {
          bottomDivider: true,
          footer: h('button', null, 'Save'),
          header: h('strong', null, 'Custom'),
          radius: 'none',
          topDivider: true,
        },
        'Body',
      ),
    );

    const card = getContainer().querySelector('.h-card') as HTMLElement;
    expect(card.classList.contains('h-card--none')).toBe(true);
    expect(card.querySelector('strong')?.textContent).toBe('Custom');
    expect(card.querySelectorAll('.h-card__divider')).toHaveLength(2);
    expect(card.querySelector('footer')?.textContent).toBe('Save');
  });
});
