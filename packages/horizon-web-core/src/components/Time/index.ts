import { splitTimeDuration } from '@aurora/core';
import type { TimeParts } from '@aurora/core';

export interface TimeTimerRuntime {
  now(): number;
  setTimeout(callback: () => void, delay: number): unknown;
  clearTimeout(handle: unknown): void;
}
export interface TimeControllerOptions {
  duration: number;
  forward?: boolean;
  calculative?: boolean;
  onChange(parts: TimeParts): void;
  onFinished(): void;
  timerRuntime?: TimeTimerRuntime;
}
export interface TimeController {
  destroy(): void;
}
const defaultTimerRuntime: TimeTimerRuntime = {
  now: () => Date.now(),
  setTimeout: (callback, delay) => globalThis.setTimeout(callback, delay),
  clearTimeout: handle => globalThis.clearTimeout(handle as ReturnType<typeof setTimeout>),
};

/** Runs a drift-aware countdown or elapsed timer and owns all timer cleanup. */
export function createTimeController(options: TimeControllerOptions): TimeController {
  const runtime = options.timerRuntime ?? defaultTimerRuntime;
  const duration = Math.max(0, Math.trunc(options.duration));
  const startedAt = runtime.now();
  let lastValue = options.forward ? 0 : duration;
  let timer: unknown;
  let destroyed = false;
  let finished = false;
  const publish = (value: number) => {
    if (value === lastValue && timer !== undefined) return;
    lastValue = value;
    options.onChange(splitTimeDuration(value));
  };
  const schedule = () => {
    timer = runtime.setTimeout(tick, 1000);
  };
  const tick = () => {
    timer = undefined;
    if (destroyed) return;
    const elapsed = Math.max(0, Math.floor((runtime.now() - startedAt) / 1000));
    if (options.forward) {
      publish(elapsed);
      schedule();
      return;
    }
    const remaining = Math.max(0, duration - elapsed);
    publish(remaining);
    if (remaining === 0) {
      if (!finished) {
        finished = true;
        options.onFinished();
      }
      return;
    }
    schedule();
  };
  options.onChange(splitTimeDuration(lastValue));
  if (!options.calculative) {
    if (!options.forward && duration === 0) {
      finished = true;
      options.onFinished();
    } else schedule();
  }
  return {
    destroy() {
      destroyed = true;
      if (timer !== undefined) runtime.clearTimeout(timer);
      timer = undefined;
    },
  };
}
