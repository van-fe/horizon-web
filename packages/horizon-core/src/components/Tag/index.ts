export interface TagPressTracker {
  destroy(): void;
}

export interface TagCloseVisibilityController {
  enter(equally: boolean, clickable: boolean): void;
  leave(): void;
  cancelPending(): void;
  destroy(): void;
}

/** Owns delayed close-action visibility for equal-size Tags. */
export function createTagCloseVisibilityController(options: {
  getDelay: () => number;
  onVisibleChange: (visible: boolean) => void;
  ownerWindow?: Pick<Window, 'setTimeout' | 'clearTimeout'>;
}): TagCloseVisibilityController {
  let cancelTimer: (() => void) | undefined;
  let destroyed = false;
  const cancelPending = () => {
    cancelTimer?.();
    cancelTimer = undefined;
  };
  return {
    enter(equally, clickable) {
      if (destroyed) return;
      cancelPending();
      if (!equally) return;
      if (!clickable) {
        options.onVisibleChange(true);
        return;
      }
      const show = () => {
        cancelTimer = undefined;
        if (!destroyed) options.onVisibleChange(true);
      };
      if (options.ownerWindow) {
        const timer = options.ownerWindow.setTimeout(show, Math.max(0, options.getDelay()));
        cancelTimer = () => options.ownerWindow?.clearTimeout(timer);
      } else {
        const timer = globalThis.setTimeout(show, Math.max(0, options.getDelay()));
        cancelTimer = () => globalThis.clearTimeout(timer);
      }
    },
    leave() {
      cancelPending();
      if (!destroyed) options.onVisibleChange(false);
    },
    cancelPending,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelPending();
    },
  };
}

/** Owns the document mouseup listener used by pressed Tag visuals. */
export function createTagPressTracker(
  owner: HTMLElement,
  onPressedChange: (pressed: boolean) => void,
): TagPressTracker {
  const ownerDocument = owner.ownerDocument;
  let destroyed = false;
  let pressed = true;
  onPressedChange(true);
  const release = () => {
    if (!pressed) return;
    pressed = false;
    ownerDocument.removeEventListener('mouseup', release);
    onPressedChange(false);
  };
  ownerDocument.addEventListener('mouseup', release);
  return {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      ownerDocument.removeEventListener('mouseup', release);
      if (pressed) {
        pressed = false;
        onPressedChange(false);
      }
    },
  };
}

export interface TagCollapseControllerOptions {
  getContainer: () => Pick<HTMLElement, 'clientHeight' | 'clientWidth' | 'scrollWidth'> | null;
  getItemCount: () => number;
  getVisibleCount: () => number;
  setVisibleCount: (count: number) => void;
  afterRender: () => void | Promise<void>;
  getMinDisplayed?: () => number | undefined;
  onLinesChange?: (lines: number) => void;
  onOverflowChange?: (overflowing: boolean) => void;
  requestFrame?: (callback: FrameRequestCallback) => number;
  cancelFrame?: (handle: number) => void;
}

export interface TagResizeObserverHandle {
  destroy(): void;
}

/** Observes Tag or TagGroup geometry with an idempotent browser-owned cleanup. */
export function observeTagResize(
  element: Element,
  onResize: ResizeObserverCallback,
): TagResizeObserverHandle {
  const OwnerResizeObserver = element.ownerDocument.defaultView?.ResizeObserver ?? ResizeObserver;
  const observer = new OwnerResizeObserver(onResize);
  observer.observe(element);
  let destroyed = false;
  return {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      observer.disconnect();
    },
  };
}

export interface TagCollapseController {
  readonly calculating: boolean;
  calculate(): Promise<void>;
  destroy(): void;
}

/** Owns iterative Horizon TagGroup overflow measurement across renderer commits. */
export function createTagCollapseController(
  options: TagCollapseControllerOptions,
): TagCollapseController {
  let destroyed = false;
  let calculating = false;
  let pending: Promise<void> | undefined;
  let frame = 0;
  let resolveFrame: (() => void) | undefined;
  const requestFrame = options.requestFrame ?? (callback => requestAnimationFrame(callback));
  const cancelFrame = options.cancelFrame ?? (handle => cancelAnimationFrame(handle));
  const waitForRender = async () => {
    await options.afterRender();
    await new Promise<void>(resolve => {
      resolveFrame = resolve;
      frame = requestFrame(() => {
        frame = 0;
        resolveFrame = undefined;
        resolve();
      });
    });
  };
  const run = async () => {
    const container = options.getContainer();
    if (!container || destroyed) return;
    const itemCount = Math.max(0, options.getItemCount());
    const minimum = options.getMinDisplayed?.();
    if (minimum !== undefined) {
      options.setVisibleCount(Math.max(0, Math.min(itemCount, Math.trunc(minimum))));
      await options.afterRender();
    } else {
      let visible = Math.max(0, Math.min(itemCount, options.getVisibleCount()));
      if (visible === 0 && itemCount > 0) {
        visible = 1;
        options.setVisibleCount(visible);
        await waitForRender();
      }
      while (!destroyed && visible < itemCount && container.scrollWidth <= container.clientWidth) {
        visible += 1;
        options.setVisibleCount(visible);
        await waitForRender();
      }
      while (!destroyed && container.scrollWidth > container.clientWidth && visible > 1) {
        visible -= 1;
        options.setVisibleCount(visible);
        await waitForRender();
      }
    }
    if (destroyed) return;
    options.onLinesChange?.(Math.max(1, Math.floor(container.clientHeight / 24)));
    options.onOverflowChange?.(options.getVisibleCount() < itemCount);
  };
  return {
    get calculating() {
      return calculating;
    },
    calculate() {
      if (destroyed) return Promise.resolve();
      if (pending) return pending;
      calculating = true;
      pending = run().finally(() => {
        calculating = false;
        pending = undefined;
      });
      return pending;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (frame) cancelFrame(frame);
      frame = 0;
      resolveFrame?.();
      resolveFrame = undefined;
    },
  };
}
