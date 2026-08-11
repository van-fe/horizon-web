import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider } from '../../../provider';
import { click, dispatch, render } from '../../../__tests__/harness';
import { Dialog, type DialogHandle } from '..';

describe('React Dialog', () => {
  it('uses provider labels, confirms without closing and cancels through the controller', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { dialogLabels: { ok: 'Save', cancel: 'Keep', close: 'Dismiss', dialog: 'Modal' } },
        h(
          Dialog,
          { defaultOpen: true, onCancel, onOk, onOpenChange, title: 'Edit item' },
          'Dialog body',
        ),
      ),
    );
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(dialog.getAttribute('aria-labelledby')).toBeTruthy();
    expect(document.activeElement).toBe(dialog);
    const buttons = dialog.querySelectorAll('button');
    expect(Array.from(buttons, button => button.textContent?.trim())).toEqual(['', 'Keep', 'Save']);

    await click(buttons[2]);
    expect(onOk).toHaveBeenCalledOnce();
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    await click(buttons[1]);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'cancel' });
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.querySelector<HTMLElement>('[role="dialog"]')!.hidden).toBe(true);
  });

  it('waits for callback-style beforeClose authorization and deduplicates requests', async () => {
    let authorize!: () => void;
    const beforeClose = vi.fn((close: () => void) => {
      authorize = close;
    });
    const onClosePendingChange = vi.fn();
    const ref = createRef<DialogHandle>();
    await render(
      h(Dialog, {
        beforeClose,
        defaultOpen: true,
        onClosePendingChange,
        ref,
        title: 'Guarded',
      }),
    );
    await act(async () => {
      ref.current?.close();
      ref.current?.close();
    });
    expect(beforeClose).toHaveBeenCalledOnce();
    expect(document.querySelector('[role="dialog"]')).toHaveAttribute('aria-busy', 'true');
    await act(async () => authorize());
    expect(onClosePendingChange).toHaveBeenLastCalledWith(false);
    expect(document.querySelector<HTMLElement>('[role="dialog"]')!.hidden).toBe(true);
  });

  it('keeps controlled state owned by the caller and exposes commands', async () => {
    const onOpenChange = vi.fn();
    const ref = createRef<DialogHandle>();
    await render(h(Dialog, { onOpenChange, open: true, ref, title: 'Controlled' }));
    await act(async () => ref.current?.close());
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'imperative' });
    expect(ref.current?.dialog?.hidden).toBe(false);
    expect(() => ref.current?.focus()).not.toThrow();
  });

  it('dismisses only the topmost dialog on Escape and maintains scroll locking', async () => {
    await render(
      h(
        'div',
        null,
        h(Dialog, { defaultOpen: true, title: 'Parent' }),
        h(Dialog, { defaultOpen: true, title: 'Child' }),
      ),
    );
    expect(document.body).toHaveAttribute('data-popup-parent-hidden');
    expect(document.querySelectorAll('[role="dialog"]:not([hidden])')).toHaveLength(2);
    await dispatch(document, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelectorAll('[role="dialog"]:not([hidden])')).toHaveLength(1);
    expect(document.body).toHaveAttribute('data-popup-parent-hidden');
    await dispatch(document, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelectorAll('[role="dialog"]:not([hidden])')).toHaveLength(0);
    expect(document.body).not.toHaveAttribute('data-popup-parent-hidden');
  });

  it('reports mask dismissal and provides an accessible fallback name', async () => {
    const onMaskClick = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(Dialog, { ariaLabel: 'Preferences', defaultOpen: true, onMaskClick, onOpenChange }),
    );
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(dialog).toHaveAttribute('aria-label', 'Preferences');
    const mask = document.querySelector<HTMLElement>('.h-dialog__mask')!;
    await dispatch(mask, new PointerEvent('pointerdown', { bubbles: true }));
    expect(onMaskClick).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'mask' });
  });

  it('unmounts closed content when destroyOnClose is enabled', async () => {
    const ref = createRef<DialogHandle>();
    await render(
      h(Dialog, { defaultOpen: true, destroyOnClose: true, ref, title: 'Disposable' }, 'State'),
    );
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    await act(async () => ref.current?.close());
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('restores focus across the default Portal lifecycle', async () => {
    const ref = createRef<DialogHandle>();
    await render(
      h(
        'div',
        null,
        h('button', { autoFocus: true }, 'Before dialog'),
        h(Dialog, { defaultOpen: true, ref, title: 'Portal dialog' }),
      ),
    );
    const before = document.querySelector<HTMLButtonElement>('button')!;
    expect(document.activeElement).toBe(ref.current?.dialog);
    await act(async () => ref.current?.close());
    expect(document.activeElement).toBe(before);
  });
});
