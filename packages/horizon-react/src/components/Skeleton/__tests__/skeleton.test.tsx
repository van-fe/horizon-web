import { createElement as h } from 'react';
import { describe, expect, it } from 'vitest';
import { Skeleton, SkeletonItem } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

describe('React Skeleton', () => {
  it('renders the animated default placeholder while loading', async () => {
    await render(h(Skeleton));

    const root = getContainer().querySelector('.h-skeleton') as HTMLElement;
    expect(root.getAttribute('aria-busy')).toBe('true');
    expect(root.querySelector('.h-skeleton__animated')).not.toBeNull();
    expect(root.querySelectorAll('.h-skeleton__item__text')).toHaveLength(3);
  });

  it('switches between a custom placeholder and loaded content', async () => {
    await render(
      h(Skeleton, { animated: false, placeholder: h(SkeletonItem, { shape: 'avatar' }) }, 'Ready'),
    );
    expect(getContainer().querySelector('.h-skeleton__item__avatar')).not.toBeNull();
    expect(getContainer().querySelector('.h-skeleton__animated')).toBeNull();

    await render(h(Skeleton, { loading: false }, h('strong', null, 'Ready')));
    expect(getContainer().querySelector('.h-skeleton')?.getAttribute('aria-busy')).toBe('false');
    expect(getContainer().querySelector('.h-skeleton__content')?.textContent).toBe('Ready');
  });
});
