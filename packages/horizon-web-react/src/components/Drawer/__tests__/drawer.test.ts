import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider } from '../../../provider';
import { click, dispatch, render } from '../../../__tests__/harness';
import { Drawer, type DrawerHandle } from '..';

describe('React Drawer', () => {
  it('uses provider labels, keeps OK open and closes through Cancel', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { drawerLabels: { ok: 'Apply', cancel: 'Keep', close: 'Dismiss', drawer: 'Panel' } },
        h(
          Drawer,
          { defaultOpen: true, onCancel, onOk, onOpenChange, title: 'Edit item' },
          'Drawer body',
        ),
      ),
    );
    const drawer = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(document.activeElement).toBe(drawer);
    expect(drawer).toHaveAttribute('aria-labelledby');
    expect(drawer).toHaveClass('h-drawer--right');
    const buttons = drawer.querySelectorAll('button');
    expect(Array.from(buttons, button => button.textContent?.trim())).toEqual([
      '',
      'Keep',
      'Apply',
    ]);

    await click(buttons[2]);
    expect(onOk).toHaveBeenCalledOnce();
    expect(drawer.hidden).toBe(false);
    await click(buttons[1]);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'cancel' });
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('deduplicates asynchronous guards and exposes the pending state', async () => {
    let resolveGuard!: (value: boolean) => void;
    const beforeClose = vi.fn(
      () =>
        new Promise<boolean>(resolve => {
          resolveGuard = resolve;
        }),
    );
    const ref = createRef<DrawerHandle>();
    await render(h(Drawer, { beforeClose, defaultOpen: true, ref, title: 'Guarded' }));
    await act(async () => {
      ref.current?.close();
      ref.current?.close();
    });
    expect(beforeClose).toHaveBeenCalledOnce();
    expect(ref.current?.drawer).toHaveAttribute('aria-busy', 'true');
    await act(async () => resolveGuard(false));
    expect(ref.current?.drawer).not.toHaveAttribute('aria-busy');
    expect(ref.current?.drawer?.hidden).toBe(false);
  });

  it('keeps controlled state owned by the caller and exposes commands', async () => {
    const onOpenChange = vi.fn();
    const ref = createRef<DrawerHandle>();
    await render(h(Drawer, { onOpenChange, open: true, ref, title: 'Controlled' }));
    await act(async () => ref.current?.close());
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'imperative' });
    expect(ref.current?.drawer?.hidden).toBe(false);
    expect(() => ref.current?.focus()).not.toThrow();
  });

  it('always reports mask clicks and gates closing with maskClosable', async () => {
    const onMaskClick = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(Drawer, {
        ariaLabel: 'Preferences',
        defaultOpen: true,
        maskClosable: false,
        onMaskClick,
        onOpenChange,
      }),
    );
    const drawer = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(drawer).toHaveAttribute('aria-label', 'Preferences');
    await click(document.querySelector<HTMLElement>('.h-drawer__mask')!);
    expect(onMaskClick).toHaveBeenCalledOnce();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(drawer.hidden).toBe(false);
  });

  it('dismisses only the topmost drawer and reference-counts scroll locking', async () => {
    await render(
      h(
        'div',
        null,
        h(Drawer, { defaultOpen: true, title: 'Parent' }),
        h(Drawer, { defaultOpen: true, title: 'Child' }),
      ),
    );
    expect(document.body).toHaveAttribute('data-popup-parent-hidden');
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(2);
    await dispatch(document, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    expect(document.body).toHaveAttribute('data-popup-parent-hidden');
    await dispatch(document, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(0);
    expect(document.body).not.toHaveAttribute('data-popup-parent-hidden');
  });

  it('updates the inherited scroll lock without leaking focus or counters', async () => {
    await render(h(Drawer, { defaultOpen: true, mask: true, title: 'Dynamic lock' }));
    let drawer = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(document.body).toHaveAttribute('data-popup-parent-hidden');
    expect(document.activeElement).toBe(drawer);

    await render(
      h(Drawer, { defaultOpen: true, lockScroll: false, mask: true, title: 'Dynamic lock' }),
    );
    drawer = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(document.body).not.toHaveAttribute('data-popup-parent-hidden');
    expect(document.activeElement).toBe(drawer);

    await render(
      h(Drawer, { defaultOpen: true, lockScroll: true, mask: false, title: 'Dynamic lock' }),
    );
    expect(document.body).toHaveAttribute('data-popup-parent-hidden');
    await render(
      h(Drawer, { defaultOpen: true, lockScroll: false, mask: false, title: 'Dynamic lock' }),
    );
    expect(document.body).not.toHaveAttribute('data-popup-parent-hidden');
  });

  it('resolves placement, preset and custom extents', async () => {
    await render(h(Drawer, { defaultOpen: true, placement: 'bottom', size: 'small' }));
    let drawer = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(drawer).toHaveClass('h-drawer--bottom');
    expect(drawer.style.height).toBe('320px');
    expect(drawer.style.width).toBe('100%');

    await render(h(Drawer, { defaultOpen: true, placement: 'left', size: '45%' }));
    drawer = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(drawer.style.width).toBe('45%');
    expect(drawer.style.height).toBe('100%');
  });

  it('resizes through the shared pointer controller', async () => {
    await render(
      h(Drawer, {
        defaultOpen: true,
        placement: 'left',
        portal: false,
        size: 320,
        sizeDraggable: true,
      }),
    );
    const drawer = document.querySelector<HTMLElement>('[role="dialog"]')!;
    Object.defineProperty(drawer, 'clientWidth', { configurable: true, value: 320 });
    const handle = document.querySelector<HTMLElement>('.h-drawer__draggable')!;
    await dispatch(
      handle,
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: 100, pointerId: 1 }),
    );
    await dispatch(
      document,
      new PointerEvent('pointermove', { bubbles: true, clientX: 140, pointerId: 1 }),
    );
    expect(drawer.style.width).toBe('360px');
  });
});
