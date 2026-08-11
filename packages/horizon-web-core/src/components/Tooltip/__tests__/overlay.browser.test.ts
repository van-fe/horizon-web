import { afterEach, describe, expect, it, vi } from 'vitest';
import { createDismissableLayer } from '../dismissableLayer';
import { applyRovingTabIndex, createFocusScope, moveRovingFocus } from '../focus';
import { resolvePortalContainer } from '../portal';
import { createPositioner } from '../positioner';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('web overlay primitives', () => {
  it('positions a floating element and updates placement metadata', async () => {
    const reference = document.createElement('button');
    const floating = document.createElement('div');
    Object.defineProperty(floating, 'offsetWidth', { configurable: true, value: 80 });
    Object.defineProperty(floating, 'offsetHeight', { configurable: true, value: 30 });
    reference.getBoundingClientRect = () => ({
      x: 20,
      y: 2,
      top: 2,
      right: 60,
      bottom: 22,
      left: 20,
      width: 40,
      height: 20,
      toJSON: () => ({}),
    });
    document.body.append(reference, floating);

    const positioner = createPositioner(reference, floating, {
      placement: 'top',
      distance: 6,
      autoUpdate: false,
    });
    const snapshot = await positioner.update();

    expect(snapshot.placement).toBe('bottom');
    expect(floating.dataset.popperPlacement).toBe('bottom');
    expect(floating.style.position).toBe('fixed');
    positioner.destroy();
  });

  it('dismisses only the top layer and respects trigger branches', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    const trigger = document.createElement('button');
    const outside = document.createElement('button');
    document.body.append(parent, child, trigger, outside);
    const parentDismiss = vi.fn();
    const childDismiss = vi.fn();
    const parentLayer = createDismissableLayer({ node: parent, onDismiss: parentDismiss });
    const childLayer = createDismissableLayer({
      node: child,
      branches: [trigger],
      onDismiss: childDismiss,
    });

    trigger.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(childDismiss).not.toHaveBeenCalled();
    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(childDismiss).toHaveBeenCalledWith('outside-pointer');
    expect(parentDismiss).not.toHaveBeenCalled();

    childLayer.destroy();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(parentDismiss).toHaveBeenCalledWith('escape');
    parentLayer.destroy();
  });

  it('traps, cycles, and restores focus', () => {
    const before = document.createElement('button');
    const scopeNode = document.createElement('div');
    const first = document.createElement('button');
    const last = document.createElement('button');
    scopeNode.append(first, last);
    document.body.append(before, scopeNode);
    before.focus();
    const scope = createFocusScope(scopeNode);

    scope.activate();
    expect(document.activeElement).toBe(first);
    last.focus();
    last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(document.activeElement).toBe(first);
    scope.deactivate();
    expect(document.activeElement).toBe(before);
  });

  it('supports roving focus and SSR-safe portal resolution', () => {
    const items = [document.createElement('button'), document.createElement('button')];
    applyRovingTabIndex(items, 1);
    expect(items.map(item => item.tabIndex)).toEqual([-1, 0]);
    expect(moveRovingFocus(items, 1, 'next')).toBe(0);
    expect(resolvePortalContainer(undefined, null)).toBeUndefined();
    expect(resolvePortalContainer('body', document)).toBe(document.body);
  });
});
