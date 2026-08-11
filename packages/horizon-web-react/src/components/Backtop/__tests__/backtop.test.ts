import { act, createElement as h, createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider } from '../../../provider';
import { click, getContainer, render } from '../../../__tests__/harness';
import { Backtop, type BacktopHandle } from '..';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('React Backtop', () => {
  function createScrollableTarget(): HTMLDivElement {
    const target = document.createElement('div');
    target.style.cssText = 'height: 40px; overflow: auto;';
    const content = document.createElement('div');
    content.style.height = '1000px';
    target.appendChild(content);
    document.body.appendChild(target);
    return target;
  }

  it('appears at the threshold with semantic content and configured offsets', async () => {
    vi.useFakeTimers();
    const target = createScrollableTarget();
    await render(
      h(
        HorizonWebProvider,
        { backtopLabels: { button: 'Return to start' } },
        h(Backtop, { bottom: 20, right: 30, target, visibilityHeight: 100 }, 'Top'),
      ),
    );
    expect(getContainer().querySelector('.h-backtop')).toBeNull();
    target.scrollTop = 100;
    target.dispatchEvent(new Event('scroll'));
    await act(async () => vi.advanceTimersByTimeAsync(300));
    const button = getContainer().querySelector<HTMLButtonElement>('.h-backtop')!;
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', 'Return to start');
    expect(button).toHaveTextContent('Top');
    expect(button.style.bottom).toBe('20px');
    expect(button.style.right).toBe('30px');
  });

  it('scrolls the configured element and reports the native click', async () => {
    vi.useFakeTimers();
    const target = createScrollableTarget();
    const onClick = vi.fn();
    await render(h(Backtop, { onClick, target: () => target, visibilityHeight: 10 }));
    target.scrollTop = 500;
    target.dispatchEvent(new Event('scroll'));
    await act(async () => vi.advanceTimersByTimeAsync(300));
    await click(getContainer().querySelector('.h-backtop')!);
    await act(async () => vi.advanceTimersByTimeAsync(600));
    expect(target.scrollTop).toBe(0);
    expect(onClick.mock.calls[0][0].nativeEvent).toBeInstanceOf(MouseEvent);
  });

  it('exposes scroll and focus commands', async () => {
    vi.useFakeTimers();
    const target = createScrollableTarget();
    const ref = createRef<BacktopHandle>();
    await render(h(Backtop, { ref, target, visibilityHeight: 1 }));
    target.scrollTop = 20;
    target.dispatchEvent(new Event('scroll'));
    await act(async () => vi.advanceTimersByTimeAsync(300));
    act(() => ref.current?.focus());
    expect(document.activeElement).toBe(ref.current?.element);
    act(() => ref.current?.scrollToTop());
    await act(async () => vi.advanceTimersByTimeAsync(600));
    expect(target.scrollTop).toBe(0);
  });
});
