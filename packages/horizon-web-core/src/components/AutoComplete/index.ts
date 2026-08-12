export interface AutoCompleteInputSchedulerOptions {
  delay?: number;
  onCommit(value: string): void;
}

export interface AutoCompleteInputScheduler {
  schedule(value: string): void;
  flush(): void;
  cancel(): void;
  destroy(): void;
}

/** Browser-timer scheduler used by both renderers for cancellable search input. */
export function createAutoCompleteInputScheduler(
  options: AutoCompleteInputSchedulerOptions,
): AutoCompleteInputScheduler {
  let delay = Math.max(0, options.delay ?? 0);
  let pending: string | undefined;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let destroyed = false;

  const cancel = () => {
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = undefined;
    pending = undefined;
  };

  const flush = () => {
    if (destroyed || pending === undefined) return;
    const value = pending;
    cancel();
    options.onCommit(value);
  };

  return {
    schedule(value) {
      if (destroyed) return;
      cancel();
      pending = value;
      if (delay === 0) flush();
      else timeout = setTimeout(flush, delay);
    },
    flush,
    cancel,
    destroy() {
      destroyed = true;
      delay = 0;
      cancel();
    },
  };
}
