import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';
import { HorizonWebProvider } from '../../../provider';
import { Link } from '../index';

describe('React Link', () => {
  it('renders native navigation and every content region', async () => {
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    await render(
      h(
        Link,
        {
          href: '/guide',
          onClick,
          prefix: h('span', { 'data-prefix': true }, 'Before'),
          suffix: h('span', { 'data-suffix': true }, 'After'),
          target: '_blank',
          underline: 'always',
        },
        'Guide',
      ),
    );
    const container = getContainer();
    const link = container.querySelector('a')!;

    expect(link.getAttribute('href')).toBe('/guide');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.classList).toContain('has-underline', 'is-underline-always');
    expect(container.querySelector('[data-prefix]')?.textContent).toBe('Before');
    expect(container.querySelector('[data-suffix]')?.textContent).toBe('After');
    await click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('supports keyboard activation for action links', async () => {
    const onClick = vi.fn();
    await render(h(Link, { onClick }, 'Run action'));
    const action = getContainer().querySelector('a')!;

    expect(action.getAttribute('role')).toBe('button');
    expect(action.tabIndex).toBe(0);
    action.focus();
    await dispatch(
      action,
      new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: ' ' }),
    );
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('keeps disabled and loading links inert', async () => {
    const onClick = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { linkLabels: { loading: 'Working' } },
        h(Link, { href: '/guide', loading: true, onClick }, 'Guide'),
        h(Link, { disabled: true, onClick }, 'Disabled'),
      ),
    );
    const links = getContainer().querySelectorAll('a');
    const loading = links[0]!;
    const disabled = links[1]!;

    expect(loading.getAttribute('href')).toBeNull();
    expect(loading.getAttribute('aria-busy')).toBe('true');
    expect(loading.textContent).toContain('Working');
    expect(loading.querySelector('.h-link__loading-icon.h-loading-icon')).not.toBeNull();
    expect(disabled.getAttribute('aria-disabled')).toBe('true');
    await click(loading);
    await click(disabled);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('uses provider route resolution and navigation', async () => {
    const navigate = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { navigate, resolveHref: () => '/resolved' },
        h(Link, { replace: true, to: { name: 'guide' } }, 'Router guide'),
      ),
    );
    const link = getContainer().querySelector('a')!;

    expect(link.getAttribute('href')).toBe('/resolved');
    await click(link);
    expect(navigate).toHaveBeenCalledWith({ name: 'guide' }, { replace: true });
  });

  it('scrolls an anchor and exposes its native root ref', async () => {
    const target = document.createElement('div');
    target.id = 'react-link-scroll';
    document.body.append(target);
    Object.defineProperty(target, 'scrollTop', { configurable: true, value: 20 });
    const scroll = vi.fn();
    Object.defineProperty(target, 'scroll', { configurable: true, value: scroll });
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ top: 5 } as DOMRect);
    const ref = createRef<HTMLAnchorElement | HTMLSpanElement>();
    await render(
      h(
        Link,
        { anchor: 'react-link-anchor', anchorOffset: 10, ref, scrollTarget: target },
        'Anchor section',
      ),
    );
    vi.spyOn(ref.current!, 'getBoundingClientRect').mockReturnValue({ top: 40 } as DOMRect);

    await click(getContainer().querySelector('.h-link__anchor')!);
    expect(scroll).toHaveBeenCalledWith({ top: 45, behavior: 'smooth' });
    expect(window.location.hash).toBe('#react-link-anchor');
    expect(ref.current?.tagName).toBe('SPAN');
    target.remove();
    window.history.replaceState(null, '', window.location.pathname);
  });
});
