import { describe, expect, it, vi } from 'vitest';
import { DialogController } from '../../Dialog';
import {
  DRAWER_DEFAULTS,
  DrawerController,
  drawerApiContract,
  drawerManifest,
  isDrawerPlacement,
  isDrawerSize,
  isHorizontalDrawerPlacement,
  isVerticalDrawerPlacement,
  resizeDrawerExtent,
  resolveDrawerLockScroll,
  resolveDrawerPresetExtent,
} from '..';

describe('Drawer contract', () => {
  it('defines stable defaults, validators and manifest fields', () => {
    expect(DRAWER_DEFAULTS).toMatchObject({
      defaultOpen: false,
      placement: 'right',
      size: 'medium',
      mask: true,
      maskClosable: true,
      escClosable: true,
      closable: true,
      footer: true,
      header: true,
      okButton: true,
      cancelButton: true,
      sizeDraggable: false,
      loading: false,
      destroyOnClose: true,
    });
    expect(isDrawerPlacement('bottom')).toBe(true);
    expect(isDrawerPlacement('center')).toBe(false);
    expect(isDrawerSize('40%')).toBe(true);
    expect(isDrawerSize(320)).toBe(true);
    expect(isDrawerSize(Number.NaN)).toBe(false);
    expect(drawerApiContract.validators?.placement?.('left')).toBe(true);
    expect(drawerManifest.contract.slots.map(field => field.name)).toEqual([
      'content',
      'title',
      'header',
      'footer',
    ]);
    expect(drawerManifest.contract.exposes.map(field => field.name)).toEqual(['open', 'close']);
  });

  it('resolves axes, scroll locking and directional resizing', () => {
    expect(isHorizontalDrawerPlacement('left')).toBe(true);
    expect(isHorizontalDrawerPlacement('top')).toBe(false);
    expect(isVerticalDrawerPlacement('bottom')).toBe(true);
    expect(isVerticalDrawerPlacement('right')).toBe(false);
    expect(resolveDrawerLockScroll(undefined, true)).toBe(true);
    expect(resolveDrawerLockScroll(undefined, false)).toBe(false);
    expect(resolveDrawerLockScroll(false, true)).toBe(false);
    expect(resizeDrawerExtent(300, 100, 140, 'left')).toBe(340);
    expect(resizeDrawerExtent(300, 100, 140, 'right')).toBe(260);
    expect(resizeDrawerExtent(200, 100, 135, 'top')).toBe(235);
    expect(resizeDrawerExtent(200, 100, 135, 'bottom')).toBe(165);
    expect(resizeDrawerExtent(20, 100, 200, 'right')).toBe(8);
  });

  it('preserves the established responsive preset grid', () => {
    expect(resolveDrawerPresetExtent('small', 390)).toBe(320);
    expect(resolveDrawerPresetExtent('medium', 1281)).toBe(472);
    expect(resolveDrawerPresetExtent('large', 1600)).toBe(948);
  });
});

describe('DrawerController', () => {
  it('reuses DialogController state ownership without a guard', () => {
    const onOpenChange = vi.fn();
    const controller = new DrawerController({ defaultOpen: true, onOpenChange });
    expect(controller).toBeInstanceOf(DialogController);
    expect(controller.requestClose('cancel')).toBe('closed');
    expect(controller.snapshot.open).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'cancel' });
  });

  it('allows void or true results and vetoes false results', () => {
    const allowVoid = new DrawerController({ defaultOpen: true, beforeClose: () => undefined });
    expect(allowVoid.requestClose('mask')).toBe('closed');
    expect(allowVoid.snapshot.open).toBe(false);

    const allowTrue = new DrawerController({ defaultOpen: true, beforeClose: () => true });
    expect(allowTrue.requestClose('escape')).toBe('closed');

    const veto = new DrawerController({ defaultOpen: true, beforeClose: () => false });
    expect(veto.requestClose('close-button')).toBe('ignored');
    expect(veto.snapshot).toEqual({ open: true, closePending: false });
  });

  it('awaits an asynchronous result and deduplicates close requests', async () => {
    let resolveGuard!: (value: boolean) => void;
    const onOpenChange = vi.fn();
    const pending = vi.fn();
    const controller = new DrawerController({
      defaultOpen: true,
      beforeClose: () =>
        new Promise<boolean>(resolve => {
          resolveGuard = resolve;
        }),
      onOpenChange,
      onClosePendingChange: pending,
    });

    expect(controller.requestClose('mask')).toBe('pending');
    expect(controller.requestClose('escape')).toBe('ignored');
    resolveGuard(true);
    await Promise.resolve();
    await Promise.resolve();
    expect(controller.snapshot).toEqual({ open: false, closePending: false });
    expect(onOpenChange).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'mask' });
    expect(pending.mock.calls).toEqual([[true], [false]]);
  });

  it('keeps the drawer open when an async guard returns false or rejects', async () => {
    const veto = new DrawerController({
      defaultOpen: true,
      beforeClose: () => Promise.resolve(false),
    });
    expect(veto.requestClose()).toBe('pending');
    await Promise.resolve();
    await Promise.resolve();
    expect(veto.snapshot).toEqual({ open: true, closePending: false });

    const rejected = new DrawerController({
      defaultOpen: true,
      beforeClose: () => Promise.reject(new Error('veto')),
    });
    expect(rejected.requestClose()).toBe('pending');
    await Promise.resolve();
    await Promise.resolve();
    expect(rejected.snapshot).toEqual({ open: true, closePending: false });
  });

  it('invalidates a pending guard when controlled state closes externally', async () => {
    let resolveGuard!: (value: boolean) => void;
    const onOpenChange = vi.fn();
    const controller = new DrawerController({
      open: true,
      beforeClose: () =>
        new Promise<boolean>(resolve => {
          resolveGuard = resolve;
        }),
      onOpenChange,
    });
    controller.requestClose('mask');
    controller.syncOpen(false);
    resolveGuard(true);
    await Promise.resolve();
    await Promise.resolve();
    expect(controller.snapshot).toEqual({ open: false, closePending: false });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('treats synchronous guard errors as a veto', () => {
    const controller = new DrawerController({
      defaultOpen: true,
      beforeClose: () => {
        throw new Error('veto');
      },
    });
    expect(controller.requestClose()).toBe('ignored');
    expect(controller.snapshot).toEqual({ open: true, closePending: false });
  });
});
