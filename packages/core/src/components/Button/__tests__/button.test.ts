import { describe, expect, it, vi } from 'vitest';
import { buttonActionTestVectors } from '../../../testing';
import { ButtonAsyncActionGuard, getButtonState, resolveButtonAction } from '..';

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
