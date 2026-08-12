import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createAutoCompleteInputScheduler } from '..';

describe('AutoComplete input scheduler', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('commits only the latest scheduled value and supports flush', () => {
    const onCommit = vi.fn();
    const scheduler = createAutoCompleteInputScheduler({ delay: 20, onCommit });
    scheduler.schedule('a');
    scheduler.schedule('ab');
    vi.advanceTimersByTime(19);
    expect(onCommit).not.toHaveBeenCalled();
    scheduler.flush();
    expect(onCommit).toHaveBeenCalledWith('ab');
    scheduler.destroy();
  });

  it('cancels pending work and ignores work after destroy', () => {
    const onCommit = vi.fn();
    const scheduler = createAutoCompleteInputScheduler({ delay: 10, onCommit });
    scheduler.schedule('cancelled');
    scheduler.cancel();
    vi.runAllTimers();
    expect(onCommit).not.toHaveBeenCalled();
    scheduler.schedule('destroyed');
    scheduler.destroy();
    vi.runAllTimers();
    scheduler.schedule('ignored');
    expect(onCommit).not.toHaveBeenCalled();
  });

  it('commits synchronously when delay is zero', () => {
    const onCommit = vi.fn();
    const scheduler = createAutoCompleteInputScheduler({ onCommit });
    scheduler.schedule('now');
    expect(onCommit).toHaveBeenCalledWith('now');
  });
});
