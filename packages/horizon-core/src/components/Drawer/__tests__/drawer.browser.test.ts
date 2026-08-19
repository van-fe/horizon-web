import { afterEach, describe, expect, it, vi } from 'vitest';
import { createDrawerResizeController } from '..';

describe('Drawer browser primitives', () => {
  afterEach(() => document.body.replaceChildren());

  it('resizes horizontal drawers and applies a maximum extent', () => {
    const panel = document.createElement('div');
    const handle = document.createElement('div');
    panel.append(handle);
    document.body.append(panel);
    Object.defineProperty(panel, 'clientWidth', { configurable: true, value: 320 });
    const onResize = vi.fn();
    const controller = createDrawerResizeController(handle, panel, {
      placement: 'left',
      maximum: 360,
      onResize,
    });

    handle.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientX: 100, pointerId: 1 }),
    );
    document.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, clientX: 180, pointerId: 1 }),
    );
    expect(onResize).toHaveBeenLastCalledWith(360);
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }));
    controller.destroy();
  });

  it('uses the vertical axis and ignores hidden or non-primary starts', () => {
    const panel = document.createElement('div');
    const handle = document.createElement('div');
    panel.append(handle);
    document.body.append(panel);
    Object.defineProperty(panel, 'clientHeight', { configurable: true, value: 200 });
    const onResize = vi.fn();
    const controller = createDrawerResizeController(handle, panel, {
      placement: 'bottom',
      onResize,
    });

    handle.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 1, clientY: 100, pointerId: 2 }),
    );
    panel.hidden = true;
    handle.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientY: 100, pointerId: 3 }),
    );
    expect(onResize).not.toHaveBeenCalled();
    panel.hidden = false;
    handle.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 0, clientY: 100, pointerId: 4 }),
    );
    document.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, clientY: 140, pointerId: 4 }),
    );
    expect(onResize).toHaveBeenLastCalledWith(160);
    controller.destroy();
  });
});
