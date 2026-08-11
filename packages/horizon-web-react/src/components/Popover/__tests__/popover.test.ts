import type { ReactElement } from 'react';
import { act, createElement as h, createRef } from 'react';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { PopContent, Popover } from '..';
import type { PopoverHandle } from '..';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

afterEach(() => {
  vi.useRealTimers();
});

afterAll(() =>
  document.querySelectorAll('[data-popover-test-portal]').forEach(node => node.remove()),
);

function trigger(label = 'Details'): ReactElement {
  return h('button', null, label);
}

describe('React Popover', () => {
  it('opens from click with dialog ownership and inherited PopContent theme', async () => {
    const onOpenChange = vi.fn();
    const onShow = vi.fn();
    await render(
      h(
        Popover,
        {
          content: h(PopContent, null, 'Context details'),
          onOpenChange,
          onShow,
          theme: 'dark',
          trigger: 'click',
        },
        trigger(),
      ),
    );
    const button = getContainer().querySelector('button')!;
    await click(button);
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(dialog.textContent).toContain('Context details');
    expect(button.getAttribute('aria-controls')).toBe(dialog.id);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(dialog.querySelector('.h-popover__popcontent')?.classList.contains('is-dark')).toBe(
      true,
    );
    expect(dialog.dataset.popperPlacement).toBeTruthy();
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'click' });
    expect(onShow).toHaveBeenCalledOnce();

    await click(button);
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'click' });
  });

  it('keeps controlled state authoritative', async () => {
    const onOpenChange = vi.fn();
    await render(
      h(Popover, { content: 'Controlled', onOpenChange, open: false, trigger: 'click' }, trigger()),
    );
    await click(getContainer().querySelector('button')!);
    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'click' });
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('honors hover delays and keeps the pointer path enterable', async () => {
    vi.useFakeTimers();
    await render(
      h(Popover, { content: 'Hovered', hideDelay: 20, showDelay: 20, trigger: 'hover' }, trigger()),
    );
    const button = getContainer().querySelector('button')!;
    await dispatch(button, new MouseEvent('mouseover', { bubbles: true }));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    await act(async () => vi.advanceTimersByTimeAsync(20));
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!;
    await dispatch(button, new MouseEvent('mouseout', { bubbles: true }));
    await dispatch(dialog, new MouseEvent('mouseover', { bubbles: true }));
    await act(async () => vi.advanceTimersByTimeAsync(20));
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    await dispatch(dialog, new MouseEvent('mouseout', { bubbles: true }));
    await act(async () => vi.advanceTimersByTimeAsync(20));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('dismisses on the configured outside event and restores focus on Escape', async () => {
    await render(
      h(Popover, { content: 'Dismiss me', hideEvent: 'mouseup', trigger: 'click' }, trigger()),
    );
    const button = getContainer().querySelector<HTMLButtonElement>('button')!;
    await click(button);
    await dispatch(document.body, new MouseEvent('click', { bubbles: true }));
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    await dispatch(document.body, new MouseEvent('mouseup', { bubbles: true }));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    await click(button);
    await dispatch(document, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(button);
  });

  it('supports portals, masks, persistent content and imperative commands', async () => {
    const portal = document.createElement('section');
    portal.dataset.popoverTestPortal = '';
    document.body.append(portal);
    const ref = createRef<PopoverHandle>();
    await render(
      h(
        Popover,
        {
          content: h(PopContent, null, 'Persistent'),
          destroyOnHide: false,
          mask: { enable: true },
          portalContainer: portal,
          ref,
          trigger: 'manual',
        },
        trigger('Manual'),
      ),
    );
    expect(portal.querySelector('[role="dialog"]')?.hasAttribute('hidden')).toBe(true);
    await act(async () => ref.current?.open());
    expect(portal.querySelector('[role="dialog"]')?.hasAttribute('hidden')).toBe(false);
    expect(portal.querySelector('.h-popover__mask')).not.toBeNull();
    expect(ref.current?.reference).toBe(getContainer().querySelector('button'));
    expect(ref.current?.floating).toBe(portal.querySelector('[role="dialog"]'));
    await act(async () => ref.current?.updatePosition());
    await act(async () => ref.current?.close());
    expect(portal.querySelector('[role="dialog"]')?.hasAttribute('hidden')).toBe(true);
  });
});
