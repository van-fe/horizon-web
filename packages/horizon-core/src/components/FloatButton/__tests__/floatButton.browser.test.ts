import { afterEach, describe, expect, it, vi } from 'vitest';
import { createFloatButtonDragController } from '..';

function pointer(type: string, init: PointerEventInit): PointerEvent {
  return new PointerEvent(type, { bubbles: true, isPrimary: true, ...init });
}

describe('FloatButton browser primitives', () => {
  afterEach(() => document.body.replaceChildren());

  it('reports pointer positions and the complete drag lifecycle', () => {
    const target = document.createElement('button');
    document.body.append(target);
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 24,
      top: 32,
      right: 64,
      bottom: 72,
      width: 40,
      height: 40,
      x: 24,
      y: 32,
      toJSON: () => ({}),
    });
    const onStart = vi.fn();
    const onMove = vi.fn();
    const onEnd = vi.fn();
    const controller = createFloatButtonDragController(target, { onStart, onMove, onEnd });

    target.dispatchEvent(
      pointer('pointerdown', { button: 0, clientX: 30, clientY: 40, pointerId: 1 }),
    );
    expect(controller.dragging).toBe(true);
    document.dispatchEvent(pointer('pointermove', { clientX: 80, clientY: 100, pointerId: 1 }));
    expect(onStart).toHaveBeenCalledWith(
      expect.objectContaining({ position: { left: 24, top: 32 }, delta: { x: 0, y: 0 } }),
      expect.any(PointerEvent),
    );
    expect(onMove).toHaveBeenCalledWith(
      expect.objectContaining({ position: { left: 74, top: 92 }, delta: { x: 50, y: 60 } }),
      expect.any(PointerEvent),
    );
    document.dispatchEvent(pointer('pointerup', { clientX: 90, clientY: 110, pointerId: 1 }));
    expect(onEnd).toHaveBeenCalledWith(
      expect.objectContaining({ position: { left: 84, top: 102 }, delta: { x: 60, y: 70 } }),
      expect.any(PointerEvent),
    );
    expect(controller.dragging).toBe(false);
    controller.destroy();
  });

  it('supports dynamic disablement, start rejection and primary-button filtering', () => {
    const target = document.createElement('button');
    document.body.append(target);
    let disabled = true;
    const onStart = vi.fn(() => false);
    const controller = createFloatButtonDragController(target, {
      disabled: () => disabled,
      onStart,
    });

    target.dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 1 }));
    expect(onStart).not.toHaveBeenCalled();
    disabled = false;
    target.dispatchEvent(pointer('pointerdown', { button: 1, pointerId: 2 }));
    target.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        isPrimary: false,
        pointerId: 3,
      }),
    );
    expect(onStart).not.toHaveBeenCalled();
    target.dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 4 }));
    expect(onStart).toHaveBeenCalledOnce();
    expect(controller.dragging).toBe(false);
    controller.destroy();
  });

  it('removes document listeners when destroyed during a drag', () => {
    const target = document.createElement('button');
    document.body.append(target);
    const onMove = vi.fn();
    const onEnd = vi.fn();
    const controller = createFloatButtonDragController(target, { onMove, onEnd });
    target.dispatchEvent(pointer('pointerdown', { button: 0, pointerId: 1 }));
    controller.destroy();
    document.dispatchEvent(pointer('pointermove', { clientX: 10, pointerId: 1 }));
    document.dispatchEvent(pointer('pointerup', { clientX: 10, pointerId: 1 }));
    expect(onMove).not.toHaveBeenCalled();
    expect(onEnd).not.toHaveBeenCalled();
  });
});
