import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createBacktopScrollController,
  getBacktopScrollOffset,
  resolveBacktopTarget,
  setBacktopScrollOffset,
} from '..';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('Backtop Web Core', () => {
  function createScrollableTarget(): HTMLDivElement {
    const target = document.createElement('div');
    target.style.cssText = 'height: 40px; overflow: auto;';
    const content = document.createElement('div');
    content.style.height = '1000px';
    target.appendChild(content);
    document.body.appendChild(target);
    return target;
  }

  it('resolves targets and falls back for missing or invalid selectors', () => {
    const element = createScrollableTarget();
    element.id = 'scroll-target';
    document.body.appendChild(element);
    expect(resolveBacktopTarget('#scroll-target', document)).toBe(element);
    expect(resolveBacktopTarget('#missing', document)).toBe(window);
    expect(resolveBacktopTarget('[', document)).toBe(window);
  });

  it('reads and writes element offsets', () => {
    const element = createScrollableTarget();
    element.scrollTop = 42;
    expect(getBacktopScrollOffset(element)).toBe(42);
    setBacktopScrollOffset(element, 12);
    expect(element.scrollTop).toBe(12);
  });

  it('debounces visibility and scrolls to zero', async () => {
    vi.useFakeTimers();
    const target = createScrollableTarget();
    const onVisibilityChange = vi.fn();
    const controller = createBacktopScrollController(target, {
      debounce: 20,
      duration: 0,
      getVisibilityHeight: () => 100,
      onVisibilityChange,
    });
    expect(onVisibilityChange).toHaveBeenLastCalledWith(false);
    target.scrollTop = 120;
    target.dispatchEvent(new Event('scroll'));
    expect(onVisibilityChange).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(20);
    expect(onVisibilityChange).toHaveBeenLastCalledWith(true);
    controller.scrollToTop();
    expect(target.scrollTop).toBe(0);
    expect(onVisibilityChange).toHaveBeenLastCalledWith(false);
    controller.destroy();
  });

  it('cancels pending work when destroyed', async () => {
    vi.useFakeTimers();
    const target = createScrollableTarget();
    const onVisibilityChange = vi.fn();
    const controller = createBacktopScrollController(target, {
      debounce: 30,
      getVisibilityHeight: () => 10,
      onVisibilityChange,
    });
    target.scrollTop = 100;
    target.dispatchEvent(new Event('scroll'));
    controller.destroy();
    await vi.advanceTimersByTimeAsync(40);
    expect(onVisibilityChange).toHaveBeenCalledTimes(1);
  });
});
