import { afterEach, describe, expect, it, vi } from 'vitest';
import { bodyScrollLock } from '../../../utils';
import { createDialogInteractionLayer } from '..';

describe('Dialog browser primitives', () => {
  afterEach(() => {
    bodyScrollLock.reset(document);
    document.body.replaceChildren();
  });

  it('traps focus and restores the previously focused element', () => {
    const trigger = document.createElement('button');
    const dialog = document.createElement('div');
    const first = document.createElement('button');
    const last = document.createElement('button');
    dialog.append(first, last);
    document.body.append(trigger, dialog);
    trigger.focus();

    const layer = createDialogInteractionLayer(dialog);
    layer.activate();
    expect(document.activeElement).toBe(first);
    expect(document.body).toHaveAttribute('data-popup-parent-hidden');

    last.focus();
    last.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }));
    expect(document.activeElement).toBe(first);

    layer.deactivate();
    expect(document.activeElement).toBe(trigger);
    expect(document.body).not.toHaveAttribute('data-popup-parent-hidden');
  });

  it('supports an unlocked layer and idempotent lifecycle calls', () => {
    const dialog = document.createElement('div');
    document.body.append(dialog);
    const layer = createDialogInteractionLayer(dialog, { lockScroll: false, trap: false });

    layer.activate();
    layer.activate();
    expect(document.body).not.toHaveAttribute('data-popup-parent-hidden');
    layer.deactivate();
    layer.deactivate();
    expect(bodyScrollLock.current).toBe(0);
  });

  it('dismisses only the topmost dialog layer', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    document.body.append(parent, child);
    const dismissParent = vi.fn();
    const dismissChild = vi.fn();
    const parentLayer = createDialogInteractionLayer(parent, {
      onDismiss: dismissParent,
      restoreFocus: false,
    });
    const childLayer = createDialogInteractionLayer(child, {
      onDismiss: dismissChild,
      restoreFocus: false,
    });

    parentLayer.activate();
    childLayer.activate();
    document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(dismissChild).toHaveBeenCalledWith('escape');
    expect(dismissParent).not.toHaveBeenCalled();

    childLayer.deactivate();
    document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(dismissParent).toHaveBeenCalledWith('escape');
    parentLayer.deactivate();
  });
});
