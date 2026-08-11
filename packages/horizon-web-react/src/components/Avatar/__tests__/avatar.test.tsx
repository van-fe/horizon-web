import { createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Avatar } from '../../../index';
import { dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Avatar', () => {
  it('renders shared size, type and initials semantics', async () => {
    await render(h(Avatar, { size: 40, src: 'Ada Lovelace', type: 'work' }));

    const avatar = getContainer().querySelector('.h-avatar') as HTMLElement;
    expect(avatar.classList.contains('h-avatar--work')).toBe(true);
    expect(avatar.style.width).toBe('40px');
    expect(avatar.style.height).toBe('40px');
    expect(avatar.textContent).toBe('AL');
  });

  it('renders an image group and caps it at nine members', async () => {
    const sources = Array.from({ length: 11 }, (_, index) => `/member-${index}.png`);
    await render(h(Avatar, { src: sources }));

    const images = getContainer().querySelectorAll('.h-avatar__group-img');
    expect(images).toHaveLength(9);
    expect(images[0].getAttribute('src')).toBe('/member-0.png');
  });

  it('exposes native image accessibility and fallback behavior', async () => {
    const onError = vi.fn();
    await render(
      h(Avatar, {
        alt: 'Ada Lovelace',
        fallback: h('span', null, 'Image unavailable'),
        fit: 'contain',
        onError,
        src: '/missing.png',
      }),
    );

    const image = getContainer().querySelector('img') as HTMLImageElement;
    expect(image.alt).toBe('Ada Lovelace');
    expect(image.style.objectFit).toBe('contain');
    await dispatch(image, new Event('error'));
    expect(onError).toHaveBeenCalledOnce();
    expect(getContainer().textContent).toContain('Image unavailable');
  });

  it('prefers explicit content and icon regions', async () => {
    await render(h(Avatar, { icon: h('span', null, 'I') }, h('strong', null, 'Custom')));
    expect(getContainer().querySelector('strong')?.textContent).toBe('Custom');

    await render(h(Avatar, { icon: h('span', null, 'I') }));
    expect(getContainer().querySelector('.h-avatar__icon')?.textContent).toBe('I');
  });
});
