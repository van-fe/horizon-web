import { afterEach, describe, expect, it, vi } from 'vitest';
import { createInputNumberLongPressController } from '..';

describe('InputNumber browser primitives', () => {
  afterEach(() => vi.useRealTimers());

  it('repeats until the matching pointer finishes', () => {
    vi.useFakeTimers();
    const target = document.createElement('button');
    document.body.append(target);
    const onRepeat = vi.fn();
    const controller = createInputNumberLongPressController({
      delay: 100,
      interval: 20,
      onRepeat,
    });
    target.addEventListener('pointerdown', event => controller.start(event));
    target.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, button: 0, isPrimary: true, pointerId: 4 }),
    );
    vi.advanceTimersByTime(145);
    expect(onRepeat).toHaveBeenCalledTimes(3);
    document.dispatchEvent(new PointerEvent('pointerup', { pointerId: 4 }));
    vi.advanceTimersByTime(100);
    expect(onRepeat).toHaveBeenCalledTimes(3);
    controller.destroy();
    target.remove();
  });

  it('ignores non-primary pointers and cleans active listeners on destroy', () => {
    vi.useFakeTimers();
    const onRepeat = vi.fn();
    const controller = createInputNumberLongPressController({ onRepeat });
    controller.start(new PointerEvent('pointerdown', { button: 1, isPrimary: true, pointerId: 1 }));
    vi.advanceTimersByTime(1000);
    expect(onRepeat).not.toHaveBeenCalled();
    controller.start(new PointerEvent('pointerdown', { button: 0, isPrimary: true, pointerId: 2 }));
    controller.destroy();
    vi.advanceTimersByTime(1000);
    expect(onRepeat).not.toHaveBeenCalled();
  });
});
