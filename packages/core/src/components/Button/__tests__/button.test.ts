import { describe, expect, it, vi } from 'vitest';
import { buttonActionTestVectors } from '../../../testing';
import {
  BUTTON_DEFAULTS,
  buttonApiContract,
  buttonGroupManifest,
  buttonManifest,
  createButtonAction,
  getButtonState,
  isButtonAsyncState,
  isButtonBorderStyle,
  isButtonSize,
  isButtonTarget,
  isButtonVariant,
  resolveButtonAction,
} from '..';

describe('Button contract', () => {
  it.each(buttonActionTestVectors)('$name', ({ input, expected }) => {
    expect(resolveButtonAction(input)).toBe(expected);
  });

  it('publishes defaults, validators and both manifests', () => {
    expect(buttonApiContract.defaults).toBe(BUTTON_DEFAULTS);
    expect(isButtonVariant('danger')).toBe(true);
    expect(isButtonVariant('warning')).toBe(false);
    expect(isButtonSize('small')).toBe(true);
    expect(isButtonSize('tiny')).toBe(false);
    expect(isButtonBorderStyle('dashed')).toBe(true);
    expect(isButtonBorderStyle('double')).toBe(false);
    expect(isButtonTarget('_blank')).toBe(true);
    expect(isButtonTarget('popup')).toBe(false);
    expect(isButtonAsyncState('loading')).toBe(true);
    expect(isButtonAsyncState('pending')).toBe(false);
    expect(buttonManifest.contract.props.map(field => field.name)).toContain('asyncAction');
    expect(buttonGroupManifest.contract.props.map(field => field.name)).toEqual([
      'variant',
      'size',
    ]);
  });

  it('derives disabled, loading and interaction state', () => {
    expect(getButtonState({ pending: true, asyncState: 'loading' })).toEqual({
      disabled: false,
      loading: true,
      pending: true,
      interactive: false,
    });
    expect(getButtonState({ pending: true, asyncState: 'disabled' }).disabled).toBe(true);
    expect(getButtonState({ disabled: true, loading: true }).interactive).toBe(false);
  });
});

describe('createButtonAction', () => {
  it('prevents duplicate actions and notifies state subscribers', async () => {
    const controller = createButtonAction();
    const listener = vi.fn();
    const unsubscribe = controller.subscribe(listener);
    let resolveAction!: () => void;
    const action = vi.fn(() => new Promise<void>(resolve => (resolveAction = resolve)));

    const first = controller.run(action);
    expect(controller.getState()).toEqual({ pending: true });
    await expect(controller.run(action)).resolves.toEqual({ status: 'ignored' });

    resolveAction();
    await expect(first).resolves.toEqual({ status: 'completed' });
    expect(controller.getState()).toEqual({ pending: false });
    expect(listener).toHaveBeenCalledTimes(2);
    expect(action).toHaveBeenCalledOnce();

    unsubscribe();
    controller.destroy();
  });

  it('returns rejected actions without leaking the rejection', async () => {
    const controller = createButtonAction();
    const error = new Error('failed');
    await expect(controller.run(() => Promise.reject(error))).resolves.toEqual({
      status: 'rejected',
      error,
    });
    expect(controller.getState().pending).toBe(false);
  });

  it('invalidates late results on destroy and supports lifecycle replay', async () => {
    const controller = createButtonAction();
    let resolveAction!: () => void;
    const result = controller.run(() => new Promise<void>(resolve => (resolveAction = resolve)));

    controller.destroy();
    resolveAction();
    await expect(result).resolves.toEqual({ status: 'stale' });
    await expect(controller.run(() => undefined)).resolves.toEqual({ status: 'ignored' });

    controller.activate();
    await expect(controller.run(() => undefined)).resolves.toEqual({ status: 'completed' });
    controller.destroy();
    controller.destroy();
  });
});
