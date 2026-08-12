import { describe, expect, it, vi } from 'vitest';
import { createPickerDismissableLayer, createPickerDomAdapter } from '..';

describe('Picker DOM primitives', () => {
  it('coordinates focus, containment, floating replacement and cleanup', () => {
    const before = document.createElement('button');
    const trigger = document.createElement('input');
    const floating = document.createElement('div');
    const option = document.createElement('button');
    floating.append(option);
    document.body.append(before, trigger, floating);
    before.focus();

    const adapter = createPickerDomAdapter({ trigger, floating });
    adapter.focus();
    expect(document.activeElement).toBe(trigger);
    expect(adapter.contains(option)).toBe(true);
    expect(adapter.contains(document.body)).toBe(false);
    adapter.blur();
    expect(document.activeElement).not.toBe(trigger);
    adapter.restoreFocus();
    expect(document.activeElement).toBe(before);

    const replacement = document.createElement('section');
    adapter.setFloating(replacement);
    expect(adapter.floating).toBe(replacement);
    adapter.destroy();
    expect(adapter.contains(trigger)).toBe(false);
    expect(adapter.floating).toBeNull();
    before.remove();
    trigger.remove();
    floating.remove();
  });

  it('dismisses only outside pointer and Escape and removes listeners', () => {
    const trigger = document.createElement('button');
    const floating = document.createElement('div');
    const outside = document.createElement('button');
    document.body.append(trigger, floating, outside);
    const onDismiss = vi.fn();
    const cleanup = createPickerDismissableLayer({ floating, reference: trigger, onDismiss });

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    floating.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onDismiss).not.toHaveBeenCalled();
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onDismiss).toHaveBeenCalledWith('outside-pointer');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(onDismiss).toHaveBeenLastCalledWith('escape');
    cleanup();
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onDismiss).toHaveBeenCalledTimes(2);
    trigger.remove();
    floating.remove();
    outside.remove();
  });
});
