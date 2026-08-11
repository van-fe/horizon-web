import { describe, expect, it, vi } from 'vitest';
import {
  DIALOG_DEFAULTS,
  DialogController,
  dialogApiContract,
  dialogManifest,
  isDialogButtonOptions,
  isDialogIconColor,
  isDialogOffset,
  isDialogSize,
  isDialogZIndex,
  resolveDialogOpenState,
} from '..';

describe('Dialog contract', () => {
  it('defines stable defaults, validators and manifest fields', () => {
    expect(DIALOG_DEFAULTS).toMatchObject({
      defaultOpen: false,
      size: 'medium',
      mask: true,
      maskClose: true,
      escClose: true,
      closeButton: true,
      destroyOnClose: false,
      lockScroll: true,
      draggable: false,
    });
    expect(Object.isFrozen(DIALOG_DEFAULTS.okButtonProps)).toBe(true);
    expect(isDialogSize('huge')).toBe(true);
    expect(isDialogSize('extra-large')).toBe(false);
    expect(isDialogOffset('12vh')).toBe(true);
    expect(isDialogOffset(120)).toBe(true);
    expect(isDialogOffset(Number.NaN)).toBe(false);
    expect(isDialogIconColor(['red', 'blue'])).toBe(true);
    expect(isDialogIconColor(['red', 1])).toBe(false);
    expect(isDialogButtonOptions(false)).toBe(true);
    expect(isDialogButtonOptions({ disabled: true })).toBe(true);
    expect(isDialogButtonOptions(null)).toBe(false);
    expect(isDialogZIndex(1000)).toBe(true);
    expect(isDialogZIndex(Number.POSITIVE_INFINITY)).toBe(false);
    expect(dialogApiContract.validators?.size?.('small')).toBe(true);
    expect(dialogManifest.contract.slots.map(field => field.name)).toEqual([
      'content',
      'title',
      'footer',
    ]);
    expect(dialogManifest.contract.exposes.map(field => field.name)).toEqual(['open', 'close']);
  });

  it('resolves open state without mutating the input', () => {
    const state = { open: true, closePending: true };
    expect(resolveDialogOpenState(state, { open: false, reason: 'escape' })).toEqual({
      state: { open: false, closePending: false },
      changed: true,
      reason: 'escape',
    });
    expect(state).toEqual({ open: true, closePending: true });
    expect(resolveDialogOpenState(state, { open: true, reason: 'controlled' }).changed).toBe(false);
  });
});

describe('DialogController', () => {
  it('manages uncontrolled open state and reports reasons', () => {
    const onOpenChange = vi.fn();
    const controller = new DialogController({ onOpenChange });

    expect(controller.requestOpen()).toBe(true);
    expect(controller.snapshot.open).toBe(true);
    expect(controller.requestClose('mask')).toBe('closed');
    expect(controller.snapshot.open).toBe(false);
    expect(onOpenChange.mock.calls).toEqual([
      [true, { reason: 'imperative' }],
      [false, { reason: 'mask' }],
    ]);
    expect(controller.requestClose('escape')).toBe('ignored');
  });

  it('waits for callback-style close guard authorization and deduplicates requests', () => {
    let authorize!: () => void;
    const pendingChanges: boolean[] = [];
    const onOpenChange = vi.fn();
    const beforeClose = vi.fn((close: () => void) => {
      authorize = close;
    });
    const controller = new DialogController({
      defaultOpen: true,
      beforeClose,
      onOpenChange,
      onClosePendingChange: pending => pendingChanges.push(pending),
    });

    expect(controller.requestClose('cancel')).toBe('pending');
    expect(controller.snapshot).toEqual({ open: true, closePending: true });
    expect(controller.requestClose('escape')).toBe('ignored');
    expect(beforeClose).toHaveBeenCalledOnce();
    authorize();
    expect(controller.snapshot).toEqual({ open: false, closePending: false });
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'cancel' });
    expect(pendingChanges).toEqual([true, false]);
    authorize();
    expect(onOpenChange).toHaveBeenCalledOnce();
  });

  it('reports synchronously authorized guards as closed', () => {
    const controller = new DialogController({
      defaultOpen: true,
      beforeClose: close => close(),
    });
    expect(controller.requestClose('close-button')).toBe('closed');
    expect(controller.snapshot.open).toBe(false);
  });

  it('invalidates a stale close callback when the request is cancelled', () => {
    let authorize!: () => void;
    const onOpenChange = vi.fn();
    const controller = new DialogController({
      defaultOpen: true,
      beforeClose: close => {
        authorize = close;
      },
      onOpenChange,
    });

    controller.requestClose('mask');
    expect(controller.cancelCloseRequest()).toBe(true);
    expect(controller.cancelCloseRequest()).toBe(false);
    authorize();
    expect(controller.snapshot.open).toBe(true);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('emits requested changes without mutating controlled open state', () => {
    const onOpenChange = vi.fn();
    const controller = new DialogController({ open: true, onOpenChange });

    expect(controller.requestClose('escape')).toBe('closed');
    expect(controller.snapshot.open).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'escape' });
    controller.setOptions({ open: false });
    expect(controller.snapshot.open).toBe(false);
    controller.setOptions({ open: true });
    expect(controller.snapshot.open).toBe(true);
    expect(onOpenChange).toHaveBeenCalledOnce();
  });

  it('resets pending state and rethrows guard errors', () => {
    const error = new Error('guard failed');
    const pending = vi.fn();
    const controller = new DialogController({
      defaultOpen: true,
      beforeClose: () => {
        throw error;
      },
      onClosePendingChange: pending,
    });

    expect(() => controller.requestClose()).toThrow(error);
    expect(controller.snapshot).toEqual({ open: true, closePending: false });
    expect(pending.mock.calls).toEqual([[true], [false]]);
  });

  it('can replace and remove a close guard dynamically', () => {
    const controller = new DialogController({ defaultOpen: true, beforeClose: () => undefined });
    expect(controller.requestClose()).toBe('pending');
    controller.cancelCloseRequest();
    controller.setOptions({ beforeClose: undefined });
    expect(controller.requestClose()).toBe('closed');
  });
});
