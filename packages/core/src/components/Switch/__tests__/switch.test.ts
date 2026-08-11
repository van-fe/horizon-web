import { describe, expect, it } from 'vitest';
import { switchStateTestVectors } from '../../../testing';
import { getSwitchState, resolveControllableValue, resolveSwitchChange } from '..';

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
