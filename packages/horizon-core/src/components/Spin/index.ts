export interface SpinTimerRuntime {
  setTimeout(callback: () => void, delay: number): unknown;
  clearTimeout(handle: unknown): void;
}

export interface SpinVisibilityControllerOptions {
  spinning: boolean;
  delay: number;
  onVisibleChange(visible: boolean): void;
  timerRuntime?: SpinTimerRuntime;
}

export interface SpinVisibilityController {
  update(spinning: boolean, delay: number): void;
  destroy(): void;
}

const defaultTimerRuntime: SpinTimerRuntime = {
  setTimeout: (callback, delay) => globalThis.setTimeout(callback, delay),
  clearTimeout: handle => globalThis.clearTimeout(handle as ReturnType<typeof setTimeout>),
};

/**
 * 管理加载指示器延迟显示和过期计时器清理。
 * @en Manages delayed indicator visibility and stale timer cleanup.
 */
export function createSpinVisibilityController(
  options: SpinVisibilityControllerOptions,
): SpinVisibilityController {
  const timerRuntime = options.timerRuntime ?? defaultTimerRuntime;
  let timer: unknown;
  let destroyed = false;
  let spinning = options.spinning;

  const clear = () => {
    if (timer !== undefined) timerRuntime.clearTimeout(timer);
    timer = undefined;
  };

  const update = (nextSpinning: boolean, delay: number) => {
    spinning = nextSpinning;
    clear();
    if (!nextSpinning) {
      options.onVisibleChange(false);
      return;
    }
    if (delay <= 0) {
      options.onVisibleChange(true);
      return;
    }
    timer = timerRuntime.setTimeout(() => {
      timer = undefined;
      if (!destroyed && spinning) options.onVisibleChange(true);
    }, delay);
  };

  update(options.spinning, options.delay);

  return {
    update,
    destroy() {
      destroyed = true;
      spinning = false;
      clear();
    },
  };
}
