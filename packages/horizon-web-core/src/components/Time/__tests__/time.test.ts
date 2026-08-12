import { describe, expect, it, vi } from 'vitest';
import { createTimeController } from '..';

function createRuntime() {
  let now = 0;
  let callback: (() => void) | undefined;
  return {
    runtime: {
      now: () => now,
      setTimeout: (next: () => void) => ((callback = next), 1),
      clearTimeout: vi.fn(() => (callback = undefined)),
    },
    advance(ms: number) {
      now += ms;
      const next = callback;
      callback = undefined;
      next?.();
    },
  };
}
describe('createTimeController', () => {
  it('counts down with drift correction and finishes once', () => {
    const harness = createRuntime();
    const onChange = vi.fn();
    const onFinished = vi.fn();
    createTimeController({ duration: 3, onChange, onFinished, timerRuntime: harness.runtime });
    harness.advance(2100);
    expect(onChange).toHaveBeenLastCalledWith({ ss: 1 });
    harness.advance(1000);
    expect(onFinished).toHaveBeenCalledOnce();
  });
  it('counts forward and destroys pending work', () => {
    const harness = createRuntime();
    const onChange = vi.fn();
    const controller = createTimeController({
      duration: 2,
      forward: true,
      onChange,
      onFinished: vi.fn(),
      timerRuntime: harness.runtime,
    });
    harness.advance(1200);
    expect(onChange).toHaveBeenLastCalledWith({ ss: 1 });
    controller.destroy();
    expect(harness.runtime.clearTimeout).toHaveBeenCalledOnce();
  });
  it('publishes calculative values without scheduling', () => {
    const harness = createRuntime();
    const onChange = vi.fn();
    createTimeController({
      duration: 3661,
      calculative: true,
      onChange,
      onFinished: vi.fn(),
      timerRuntime: harness.runtime,
    });
    expect(onChange).toHaveBeenCalledWith({ hh: 1, mm: 1, ss: 1 });
  });
});
