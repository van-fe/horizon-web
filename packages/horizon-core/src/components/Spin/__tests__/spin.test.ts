import { describe, expect, it, vi } from 'vitest';
import { createSpinVisibilityController } from '..';

describe('createSpinVisibilityController', () => {
  it('shows immediately without a delay and hides synchronously', () => {
    const changes: boolean[] = [];
    const controller = createSpinVisibilityController({
      spinning: true,
      delay: 0,
      onVisibleChange: visible => changes.push(visible),
    });
    controller.update(false, 0);
    expect(changes).toEqual([true, false]);
    controller.destroy();
  });

  it('cancels stale delayed visibility and cleans up on destroy', () => {
    vi.useFakeTimers();
    const changes: boolean[] = [];
    const controller = createSpinVisibilityController({
      spinning: true,
      delay: 50,
      onVisibleChange: visible => changes.push(visible),
    });
    controller.update(false, 0);
    vi.advanceTimersByTime(60);
    expect(changes).toEqual([false]);

    controller.update(true, 50);
    controller.destroy();
    vi.advanceTimersByTime(60);
    expect(changes).toEqual([false]);
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });

  it('does not hide an indicator that is already visible when delay changes', () => {
    vi.useFakeTimers();
    const changes: boolean[] = [];
    const controller = createSpinVisibilityController({
      spinning: true,
      delay: 0,
      onVisibleChange: visible => changes.push(visible),
    });
    controller.update(true, 50);
    expect(changes).toEqual([true]);
    vi.advanceTimersByTime(50);
    expect(changes).toEqual([true, true]);
    controller.destroy();
    vi.useRealTimers();
  });
});
