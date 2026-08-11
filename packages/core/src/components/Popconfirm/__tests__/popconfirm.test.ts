import { describe, expect, it, vi } from 'vitest';
import {
  POPCONFIRM_DEFAULTS,
  PopconfirmController,
  isPopconfirmPlacement,
  popconfirmApiContract,
  popconfirmManifest,
  resolvePopconfirmOpenState,
} from '..';

describe('Popconfirm contract', () => {
  it('defines stable defaults, validators and manifest fields', () => {
    expect(POPCONFIRM_DEFAULTS).toMatchObject({
      defaultOpen: false,
      disabled: false,
      placement: 'top',
    });
    expect(Object.isFrozen(POPCONFIRM_DEFAULTS.confirmButtonProps)).toBe(true);
    expect(isPopconfirmPlacement('bottom-end')).toBe(true);
    expect(isPopconfirmPlacement('right-start')).toBe(false);
    expect(popconfirmApiContract.validators?.placement?.('left')).toBe(true);
    expect(popconfirmManifest.contract.props.map(field => field.name)).toContain('beforeConfirm');
    expect(popconfirmManifest.contract.exposes.map(field => field.name)).toEqual(['open', 'close']);
  });

  it('resolves open state without mutating the input', () => {
    const state = { open: false, disabled: false, pending: false };
    expect(resolvePopconfirmOpenState(state, { open: true, reason: 'trigger' })).toEqual({
      state: { open: true, disabled: false, pending: false },
      changed: true,
      reason: 'trigger',
    });
    expect(state.open).toBe(false);
    expect(
      resolvePopconfirmOpenState(
        { open: false, disabled: true, pending: false },
        { open: true, reason: 'trigger' },
      ),
    ).toMatchObject({ changed: false, reason: 'disabled', state: { open: false } });
  });
});

describe('PopconfirmController', () => {
  it('manages uncontrolled state and closes when disabled', () => {
    const onOpenChange = vi.fn();
    const controller = new PopconfirmController({ onOpenChange });

    expect(controller.requestOpen()).toBe(true);
    expect(controller.snapshot.open).toBe(true);
    expect(controller.toggle()).toBe(true);
    expect(controller.snapshot.open).toBe(false);
    controller.requestOpen();
    controller.setDisabled(true);
    expect(controller.snapshot).toMatchObject({ disabled: true, open: false, pending: false });
    expect(controller.requestOpen()).toBe(false);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'disabled' });
  });

  it('emits requested changes without mutating a controlled open state', () => {
    const onOpenChange = vi.fn();
    const controller = new PopconfirmController({ open: false, onOpenChange });

    expect(controller.requestOpen('imperative')).toBe(true);
    expect(controller.snapshot.open).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'imperative' });

    controller.setOptions({ open: true });
    expect(controller.snapshot.open).toBe(true);
    controller.requestClose('escape');
    expect(controller.snapshot.open).toBe(true);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'escape' });
  });

  it('preserves callbacks when dynamic options are updated partially', () => {
    const onOpenChange = vi.fn();
    const controller = new PopconfirmController({ onOpenChange });

    controller.setOptions({ disabled: false, beforeConfirm: () => true });
    controller.requestOpen();

    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'trigger' });
  });

  it('prevents or confirms through an async guard and deduplicates requests', async () => {
    let resolveGuard!: (value: boolean) => void;
    const beforeConfirm = vi.fn(
      () =>
        new Promise<boolean>(resolve => {
          resolveGuard = resolve;
        }),
    );
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();
    const pendingChanges: boolean[] = [];
    const controller = new PopconfirmController<string>({
      defaultOpen: true,
      beforeConfirm,
      onConfirm,
      onOpenChange,
      onPendingChange: pending => pendingChanges.push(pending),
    });

    const first = controller.confirm('first');
    await expect(controller.confirm('duplicate')).resolves.toEqual({ status: 'ignored' });
    expect(controller.snapshot.pending).toBe(true);
    resolveGuard(false);
    await expect(first).resolves.toEqual({ status: 'prevented' });
    expect(controller.snapshot).toMatchObject({ open: true, pending: false });

    controller.setOptions({ beforeConfirm: () => true });
    await expect(controller.confirm('confirmed')).resolves.toEqual({ status: 'confirmed' });
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onConfirm).toHaveBeenCalledWith('confirmed');
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'confirm' });
    expect(controller.snapshot.open).toBe(false);
    expect(pendingChanges).toEqual([true, false, true, false]);
  });

  it('reports guard failures while keeping the popover open', async () => {
    const error = new Error('blocked');
    const controller = new PopconfirmController({
      defaultOpen: true,
      beforeConfirm: () => Promise.reject(error),
    });

    await expect(controller.confirm({})).resolves.toEqual({ status: 'rejected', error });
    expect(controller.snapshot).toMatchObject({ open: true, pending: false });
  });

  it('cancels a stale pending confirmation', async () => {
    let resolveGuard!: (value: boolean) => void;
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const controller = new PopconfirmController<string>({
      defaultOpen: true,
      beforeConfirm: () =>
        new Promise<boolean>(resolve => {
          resolveGuard = resolve;
        }),
      onConfirm,
      onCancel,
    });

    const confirmation = controller.confirm('confirm');
    expect(controller.cancel('cancel')).toBe(true);
    resolveGuard(true);
    await expect(confirmation).resolves.toEqual({ status: 'ignored' });
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledWith('cancel');
    expect(controller.snapshot).toMatchObject({ open: false, pending: false });
  });
});
