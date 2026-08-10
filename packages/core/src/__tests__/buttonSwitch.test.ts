import { describe, expect, it, vi } from 'vitest';
import {
  buttonActionTestVectors,
  ButtonAsyncActionGuard,
  getButtonState,
  getSwitchState,
  resolveButtonAction,
  resolveControllableValue,
  resolveSwitchChange,
  switchStateTestVectors,
} from '..';

describe('Button state protocol', () => {
  it.each(buttonActionTestVectors)('$name', ({ input, expected }) => {
    expect(resolveButtonAction(input)).toBe(expected);
  });

  it('prevents duplicate asynchronous actions and exposes derived state', async () => {
    const guard = new ButtonAsyncActionGuard();
    let resolveAction!: () => void;
    const action = vi.fn(() => new Promise<void>(resolve => (resolveAction = resolve)));

    const first = guard.run(action);
    expect(getButtonState({ pending: guard.pending, asyncState: 'loading' })).toMatchObject({
      loading: true,
      interactive: false,
    });
    await expect(guard.run(action)).resolves.toEqual({ status: 'ignored' });

    resolveAction();
    await expect(first).resolves.toEqual({ status: 'completed' });
    expect(action).toHaveBeenCalledOnce();
  });
});

describe('Switch state protocol', () => {
  it.each(switchStateTestVectors)('$name', ({ input, interactive }) => {
    expect(getSwitchState(input).interactive).toBe(interactive);
  });

  it('supports controlled and uncontrolled initial values', () => {
    expect(resolveControllableValue(true, false)).toBe(true);
    expect(resolveControllableValue(undefined, true)).toBe(true);
  });

  it('accepts, rejects, and isolates guarded transitions', async () => {
    await expect(
      Promise.resolve(resolveSwitchChange({ value: false, beforeChange: true })),
    ).resolves.toMatchObject({ accepted: true, value: true, reason: 'toggle' });
    await expect(
      Promise.resolve(resolveSwitchChange({ value: false, beforeChange: () => false })),
    ).resolves.toMatchObject({ accepted: false, value: false, reason: 'guard-rejected' });
    await expect(
      resolveSwitchChange({ value: false, beforeChange: () => Promise.reject(new Error('stop')) }),
    ).resolves.toMatchObject({ accepted: false, value: false, reason: 'guard-error' });
  });
});
