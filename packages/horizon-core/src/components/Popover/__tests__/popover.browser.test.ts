import { afterEach, describe, expect, it } from 'vitest';
import {
  createPopoverDismissableLayer,
  createPopoverPositioner,
  syncPopoverReferenceSize,
} from '..';

afterEach(() => document.body.replaceChildren());

describe('Popover browser primitives', () => {
  it('syncs reference dimensions and positions the floating surface', async () => {
    const reference = document.createElement('button');
    const floating = document.createElement('div');
    reference.getBoundingClientRect = () =>
      ({ top: 40, right: 160, bottom: 80, left: 60, width: 100, height: 40 }) as DOMRect;
    Object.defineProperties(floating, {
      offsetWidth: { configurable: true, value: 100 },
      offsetHeight: { configurable: true, value: 40 },
    });
    document.body.append(reference, floating);

    syncPopoverReferenceSize(reference, floating, { sameWidth: true, sameHeight: true });
    expect(floating.style.width).toBe('100px');
    expect(floating.style.height).toBe('40px');

    const positioner = createPopoverPositioner(reference, floating, {
      placement: 'bottom',
      distance: 8,
      autoUpdate: false,
    });
    const snapshot = await positioner.update();
    expect(snapshot.placement).toBe('bottom');
    expect(floating.dataset.popperPlacement).toBe('bottom');
    positioner.destroy();
  });

  it('uses min-width without forcing width', () => {
    const reference = document.createElement('span');
    const floating = document.createElement('div');
    reference.getBoundingClientRect = () => ({ width: 72, height: 20 }) as DOMRect;
    floating.style.width = '18rem';
    syncPopoverReferenceSize(reference, floating, { sameWidth: true, setMinWidth: true });
    expect(floating.style.width).toBe('18rem');
    expect(floating.style.minWidth).toBe('72px');
  });

  it('preserves caller-owned dimensions when no size strategy manages them', () => {
    const reference = document.createElement('span');
    const floating = document.createElement('div');
    floating.style.width = '22rem';
    floating.style.minWidth = '10rem';
    floating.style.height = '14rem';
    syncPopoverReferenceSize(reference, floating, {});
    expect(floating.style.width).toBe('22rem');
    expect(floating.style.minWidth).toBe('10rem');
    expect(floating.style.height).toBe('14rem');
  });

  it('dismisses on the configured outside event and Escape', () => {
    const reference = document.createElement('button');
    const floating = document.createElement('div');
    const outside = document.createElement('button');
    document.body.append(reference, floating, outside);
    const reasons: string[] = [];
    const destroy = createPopoverDismissableLayer({
      reference,
      floating,
      eventName: 'mouseup',
      onDismiss: reason => reasons.push(reason),
    });
    reference.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    outside.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(reasons).toEqual(['outside-pointer', 'escape']);
    destroy();
  });
});
