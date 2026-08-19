import { act, createElement as h } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Time } from '../../../index';
import { getContainer, render } from '../../../__tests__/harness';

afterEach(() => vi.useRealTimers());
describe('React Time', () => {
  it('renders a timer and forwards its ref', async () => {
    let root: HTMLDivElement | null = null;
    await render(
      h(Time, { ref: value => (root = value), calculative: true, time: 10, endTime: 15 }),
    );
    expect(root?.textContent).toBe('00:00:05');
    expect(root?.getAttribute('role')).toBe('timer');
  });
  it('counts down and finishes once', async () => {
    vi.useFakeTimers();
    const onFinished = vi.fn();
    await render(h(Time, { time: 1, onFinished }));
    await act(async () => vi.advanceTimersByTimeAsync(1000));
    expect(getContainer().textContent).toBe('00:00:00');
    expect(onFinished).toHaveBeenCalledOnce();
  });
  it('counts forward and renders contextual content', async () => {
    vi.useFakeTimers();
    await render(h(Time, { forward: true }, ({ ss }) => h('span', null, `${ss} seconds`)));
    await act(async () => vi.advanceTimersByTimeAsync(1000));
    expect(getContainer().textContent).toBe('1 seconds');
  });
});
