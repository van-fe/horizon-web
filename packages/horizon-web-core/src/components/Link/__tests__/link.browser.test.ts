import { afterEach, describe, expect, it, vi } from 'vitest';
import { calculateLinkAnchorScrollTop, resolveLinkScrollTarget, scrollLinkAnchor } from '../index';

afterEach(() => {
  document.body.replaceChildren();
  window.history.replaceState(null, '', window.location.pathname);
});

describe('Link browser primitives', () => {
  it('calculates scroll coordinates', () => {
    expect(calculateLinkAnchorScrollTop(80, 10, 30, 12)).toBe(88);
  });

  it('resolves selector and direct element targets', () => {
    const target = document.createElement('div');
    target.id = 'link-target';
    document.body.append(target);

    expect(resolveLinkScrollTarget('#link-target')).toBe(target);
    expect(resolveLinkScrollTarget(target)).toBe(target);
    expect(resolveLinkScrollTarget('#missing')).toBeNull();
  });

  it('scrolls smoothly and updates the hash', () => {
    const link = document.createElement('span');
    const target = document.createElement('div');
    target.id = 'link-scroll-target';
    document.body.append(target, link);
    Object.defineProperty(target, 'scrollTop', { configurable: true, value: 20 });
    vi.spyOn(link, 'getBoundingClientRect').mockReturnValue({ top: 90 } as DOMRect);
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ top: 10 } as DOMRect);
    const scroll = vi.fn();
    Object.defineProperty(target, 'scroll', { configurable: true, value: scroll });

    expect(
      scrollLinkAnchor({
        anchor: 'api',
        link,
        target: '#link-scroll-target',
        offset: 15,
      }),
    ).toBe(true);
    expect(scroll).toHaveBeenCalledWith({ top: 85, behavior: 'smooth' });
    expect(window.location.hash).toBe('#api');
  });

  it('returns false when a selector cannot be resolved', () => {
    const link = document.createElement('span');
    expect(scrollLinkAnchor({ anchor: 'missing', link, target: '#missing' })).toBe(false);
  });
});
