import { describe, expect, test, vi } from 'vitest';
import {
  customScrollTo,
  debounce,
  getCustomOffset,
  getOffsetTop,
  getScrollTop,
} from '../src/utils/base';
import { deepSearch, genListByDomList } from '../src/utils/extra';

describe('Anchor utilities', () => {
  test('debounces calls and preserves the receiver and latest arguments', () => {
    vi.useFakeTimers();
    const callback = vi.fn(function (this: { value: number }, amount: number) {
      return this.value + amount;
    });
    const receiver = { value: 2, run: debounce(callback, 20) };

    receiver.run(1);
    receiver.run(3);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(20);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.instances[0]).toBe(receiver);
    expect(callback).toHaveBeenCalledWith(3);
    vi.useRealTimers();
  });

  test('scrolls an element and completes after the resulting scroll settles', () => {
    vi.useFakeTimers();
    const container = document.createElement('div');
    Object.defineProperty(container, 'scrollTop', { value: 13, writable: true });
    const scrollTo = vi.fn();
    container.scrollTo = scrollTo;
    const callback = vi.fn();
    const requestAnimationFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(handler => {
        handler(0);
        return 1;
      });

    customScrollTo(91, { behavior: 'auto', scrollContainer: container, callback });

    expect(scrollTo).toHaveBeenNthCalledWith(1, { top: 13 });
    expect(scrollTo).toHaveBeenNthCalledWith(2, { top: 91, behavior: 'auto' });
    container.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);

    customScrollTo(0, { scrollContainer: null });
    requestAnimationFrame.mockRestore();
    vi.useRealTimers();
  });

  test('calculates element and viewport offsets', () => {
    const container = document.createElement('div');
    const target = document.createElement('div');
    container.getBoundingClientRect = () => ({ top: 20, height: 200 }) as DOMRect;
    target.getBoundingClientRect = () => ({ top: 70, height: 40 }) as DOMRect;
    Object.defineProperty(container, 'scrollTop', { value: 25, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 17,
      configurable: true,
    });

    expect(getOffsetTop(target, container)).toBe(50);
    expect(getOffsetTop(target, window)).toBe(70 - document.documentElement.clientTop);
    expect(getScrollTop(container)).toBe(25);
    expect(getScrollTop(window)).toBe(17);
    expect(getCustomOffset(12, target, container)).toBe(12);
    expect(getCustomOffset('start', target, container)).toBe(0);
    expect(getCustomOffset('center', target, container)).toBe(80);
    expect(getCustomOffset('end', target, container)).toBe(160);
    expect(getCustomOffset('invalid' as 'start', target, container)).toBe(0);
    expect(getCustomOffset('center', target, window)).toBe(window.innerHeight / 2 - 20);
    expect(getCustomOffset('end', target, null)).toBe(window.innerHeight - 40);
  });

  test('deeply finds headings and builds nested navigation items', () => {
    const root = document.createElement('section');
    root.innerHTML = [
      '<div><h2 id="first">First</h2><h3>Child</h3></div>',
      '<h2 id="second">Second</h2>',
    ].join('');
    const found = deepSearch(root, element => {
      if (element.tagName === 'H2') return 0;
      if (element.tagName === 'H3') return 1;
      return -1;
    });

    expect(found.map(item => item.level)).toEqual([0, 1, 0]);
    const list = genListByDomList(found);
    expect(list).toEqual([
      expect.objectContaining({
        id: 'first',
        title: 'First',
        children: [expect.objectContaining({ id: 'Child', title: 'Child' })],
      }),
      expect.objectContaining({ id: 'second', title: 'Second' }),
    ]);
    expect(root.querySelector('h3')?.id).toBe('Child');
  });

  test('fills missing hierarchy levels and handles empty and placeholder nodes', () => {
    const heading = document.createElement('h4');
    heading.textContent = 'Deep';
    const nested = genListByDomList([{ dom: heading, level: 2 }]);
    expect(nested[0].children?.[0].children?.[0]).toEqual(
      expect.objectContaining({ id: 'Deep', title: 'Deep' }),
    );
    expect(genListByDomList([])).toEqual([]);
    expect(genListByDomList([{ level: 0 }])).toEqual([
      { id: undefined, title: undefined, children: [] },
    ]);
  });
});
