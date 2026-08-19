export interface DescriptionsResizeObserverOptions {
  onResize(width: number): void;
  ResizeObserver?: typeof ResizeObserver;
}

export interface DescriptionsResizeController {
  update(): void;
  destroy(): void;
}

/** Observes a descriptions root and publishes its current content width. */
export function createDescriptionsResizeController(
  node: HTMLElement,
  options: DescriptionsResizeObserverOptions,
): DescriptionsResizeController {
  let destroyed = false;
  const publish = (width: number) => {
    if (!destroyed) options.onResize(width);
  };
  const update = () => publish(node.getBoundingClientRect().width);
  const Observer = options.ResizeObserver ?? globalThis.ResizeObserver;
  const observer = Observer
    ? new Observer(entries =>
        publish(entries[0]?.contentRect.width ?? node.getBoundingClientRect().width),
      )
    : undefined;
  observer?.observe(node);
  update();
  return {
    update,
    destroy() {
      destroyed = true;
      observer?.disconnect();
    },
  };
}
