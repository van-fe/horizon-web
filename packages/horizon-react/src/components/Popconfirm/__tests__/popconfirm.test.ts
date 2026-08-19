import { act, createElement as h, createRef } from 'react';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider } from '../../../provider';
import { Popconfirm, type PopconfirmHandle } from '..';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

afterAll(() =>
  document.querySelectorAll('[data-popconfirm-test-portal]').forEach(node => node.remove()),
);

describe('React Popconfirm', () => {
  it('opens, confirms and restores trigger focus', async () => {
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();
    await render(
      h(
        Popconfirm,
        { onConfirm, onOpenChange, title: 'Delete this item?' },
        h('button', null, 'Delete'),
      ),
    );
    const trigger = getContainer().querySelector<HTMLButtonElement>('button')!;
    await click(trigger);
    const dialog = document.querySelector<HTMLElement>('[role="alertdialog"]')!;
    expect(dialog.getAttribute('aria-labelledby')).toBeTruthy();
    expect(document.activeElement?.textContent).toContain('Cancel');
    await click(dialog.querySelector<HTMLButtonElement>('[data-popconfirm-action="confirm"]')!);
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(document.querySelector('[role="alertdialog"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'confirm' });
  });

  it('keeps open when an asynchronous guard prevents confirmation', async () => {
    const guard = vi.fn().mockResolvedValue(false);
    const buttonPress = vi.fn();
    const onOpenChange = vi.fn();
    const ref = createRef<PopconfirmHandle>();
    await render(
      h(
        Popconfirm,
        {
          beforeConfirm: guard,
          confirmButtonProps: { onClick: buttonPress },
          defaultOpen: true,
          onOpenChange,
          ref,
          title: 'Continue?',
        },
        h('button', null, 'Open'),
      ),
    );
    expect(ref.current?.dialog).not.toBeNull();
    const confirm = ref.current!.dialog!.querySelector<HTMLButtonElement>(
      '[data-popconfirm-action="confirm"]',
    )!;
    expect(confirm.disabled).toBe(false);
    await click(confirm);
    await Promise.resolve();
    expect(buttonPress).toHaveBeenCalledOnce();
    expect(guard).toHaveBeenCalledOnce();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(document.querySelector('[role="alertdialog"]')).not.toBeNull();
  });

  it('deduplicates pending confirmation and reports guard errors', async () => {
    let rejectGuard!: (error: Error) => void;
    const guard = vi.fn(
      () =>
        new Promise<boolean>((_resolve, reject) => {
          rejectGuard = reject;
        }),
    );
    const onConfirmError = vi.fn();
    const ref = createRef<PopconfirmHandle>();
    await render(
      h(
        Popconfirm,
        { beforeConfirm: guard, defaultOpen: true, onConfirmError, ref, title: 'Continue?' },
        h('button', null, 'Open'),
      ),
    );
    expect(ref.current?.dialog).not.toBeNull();
    const confirm = ref.current!.dialog!.querySelector<HTMLButtonElement>(
      '[data-popconfirm-action="confirm"]',
    )!;
    await click(confirm);
    await click(confirm);
    expect(guard).toHaveBeenCalledOnce();
    expect(confirm.getAttribute('aria-busy')).toBe('true');
    await act(async () => {
      rejectGuard(new Error('blocked'));
      await Promise.resolve();
    });
    expect(onConfirmError).toHaveBeenCalledWith(expect.objectContaining({ message: 'blocked' }));
    expect(document.querySelector('[role="alertdialog"]')).not.toBeNull();
  });

  it('cancels, uses provider labels and respects button props', async () => {
    const onCancel = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { popconfirmLabels: { cancel: 'Keep', confirm: 'Remove' } },
        h(
          Popconfirm,
          {
            cancelButtonProps: { disabled: true },
            defaultOpen: true,
            onCancel,
            title: 'Delete?',
          },
          h('button', null, 'Open'),
        ),
      ),
    );
    const cancel = document.querySelector<HTMLButtonElement>('[data-popconfirm-action="cancel"]')!;
    const confirm = document.querySelector<HTMLButtonElement>(
      '[data-popconfirm-action="confirm"]',
    )!;
    expect(cancel.textContent).toContain('Keep');
    expect(cancel.disabled).toBe(true);
    expect(confirm.textContent).toContain('Remove');
    await click(confirm);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('supports controlled state, disabled state, portal and commands', async () => {
    const portal = document.createElement('section');
    portal.dataset.popconfirmTestPortal = '';
    document.body.append(portal);
    const onOpenChange = vi.fn();
    const ref = createRef<PopconfirmHandle>();
    await render(
      h(
        Popconfirm,
        {
          onOpenChange,
          open: false,
          portalContainer: portal,
          ref,
          title: 'Proceed?',
        },
        h('button', null, 'Open'),
      ),
    );
    await click(getContainer().querySelector('button')!);
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'trigger' });
    expect(portal.querySelector('[role="alertdialog"]')).toBeNull();
    ref.current?.open();
    expect(onOpenChange).toHaveBeenLastCalledWith(true, { reason: 'imperative' });
  });

  it('closes on Escape and returns focus through Popover', async () => {
    await render(
      h(Popconfirm, { defaultOpen: true, title: 'Proceed?' }, h('button', null, 'Open')),
    );
    const trigger = getContainer().querySelector<HTMLButtonElement>('button')!;
    await dispatch(document.body, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelector('[role="alertdialog"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
