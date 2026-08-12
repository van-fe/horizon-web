import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createAnchorScrollController,
  getAnchorCustomOffset,
  getAnchorOffsetTop,
  resolveAnchorHashTarget,
  resolveAnchorScrollTarget,
  scanAnchorHeadings,
} from '..';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  document.body.innerHTML = '';
});

describe('Anchor Web Core', () => {
  it('resolves containers and decoded hash targets safely', () => {
    const host = document.createElement('div');
    host.id = 'anchor-host';
    const target = document.createElement('section');
    target.id = 'encoded heading';
    document.body.append(host, target);
    expect(resolveAnchorScrollTarget('#anchor-host', document)).toBe(host);
    expect(resolveAnchorScrollTarget('[', document)).toBe(window);
    expect(resolveAnchorHashTarget('#encoded%20heading', document)).toBe(target);
    expect(resolveAnchorHashTarget('invalid', document)).toBeNull();
  });

  it('measures offsets and performs cancellable scrolling', () => {
    vi.useFakeTimers();
    const host = document.createElement('div');
    const target = document.createElement('section');
    document.body.append(host, target);
    host.getBoundingClientRect = () => ({ top: 20, height: 200 }) as DOMRect;
    target.getBoundingClientRect = () => ({ top: 120, height: 40 }) as DOMRect;
    Object.defineProperty(host, 'scrollTop', { configurable: true, value: 10 });
    const scrollTo = vi.fn();
    host.scrollTo = scrollTo;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const done = vi.fn();
    const controller = createAnchorScrollController(host);
    controller.scrollTo(30, 'auto', done);
    expect(getAnchorOffsetTop(target, host)).toBe(100);
    expect(getAnchorCustomOffset('center', target, host)).toBe(80);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 30, behavior: 'auto' });
    vi.advanceTimersByTime(50);
    expect(done).toHaveBeenCalledOnce();
    controller.destroy();
  });

  it('scans grouped selectors in document order', () => {
    const root = document.createElement('main');
    root.innerHTML = '<h1 id="intro">Intro</h1><div><h2>Details</h2></div><h1>End</h1>';
    document.body.append(root);
    expect(scanAnchorHeadings(root, [['h1', '.missing'], 'h2'])).toEqual([
      {
        id: 'intro',
        title: 'Intro',
        children: [{ id: 'Details', title: 'Details', children: [] }],
      },
      { id: 'End', title: 'End', children: [] },
    ]);
  });
});
