import { describe, expect, it, vi } from 'vitest';
import { createDescriptionsResizeController } from '..';

describe('createDescriptionsResizeController', () => {
  it('publishes initial and observed widths and disconnects cleanly', () => {
    const node = document.createElement('div');
    let width = 390;
    vi.spyOn(node, 'getBoundingClientRect').mockImplementation(() => ({ width }) as DOMRect);
    let notify = () => {};
    const disconnect = vi.fn();
    class Observer {
      constructor(callback: ResizeObserverCallback) {
        notify = () =>
          callback(
            [{ contentRect: { width } as DOMRectReadOnly } as ResizeObserverEntry],
            this as unknown as ResizeObserver,
          );
      }
      observe() {}
      disconnect = disconnect;
      unobserve() {}
    }
    const values: number[] = [];
    const controller = createDescriptionsResizeController(node, {
      onResize: value => values.push(value),
      ResizeObserver: Observer as unknown as typeof ResizeObserver,
    });
    width = 760;
    notify();
    controller.destroy();
    width = 1176;
    notify();
    expect(values).toEqual([390, 760]);
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('supports runtimes without ResizeObserver', () => {
    const node = document.createElement('div');
    vi.spyOn(node, 'getBoundingClientRect').mockReturnValue({ width: 456 } as DOMRect);
    const onResize = vi.fn();
    const controller = createDescriptionsResizeController(node, {
      onResize,
      ResizeObserver: class {
        observe() {}
        disconnect() {}
        unobserve() {}
      } as unknown as typeof ResizeObserver,
    });
    expect(onResize).toHaveBeenCalledWith(456);
    controller.update();
    expect(onResize).toHaveBeenCalledTimes(2);
    controller.destroy();
  });
});
