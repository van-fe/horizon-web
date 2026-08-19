/** Framework-free pointer coordinates exposed to Calendar renderers. */
export interface CalendarPointerPoint {
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number;
}

export type CalendarSelectionEvent = PointerEvent | MouseEvent;

export interface CalendarPointerSelectionOptions<Value> {
  owner: HTMLElement;
  autoStart?: boolean;
  canStart?: (event: CalendarSelectionEvent) => boolean;
  resolveValue: (event: CalendarSelectionEvent, point: CalendarPointerPoint) => Value | undefined;
  onStart?: (value: Value, event: CalendarSelectionEvent) => boolean | void;
  onMove?: (value: Value, event: CalendarSelectionEvent) => void;
  onCommit?: (value: Value, event: CalendarSelectionEvent) => void;
  onCancel?: (event?: CalendarSelectionEvent) => void;
}

export interface CalendarPointerSelectionController {
  readonly selecting: boolean;
  start(event: CalendarSelectionEvent): boolean;
  cancel(): void;
  destroy(): void;
}

/** Owns the desktop pointer/mouse lifecycle while leaving Calendar values renderer-defined. */
export function createCalendarPointerSelection<Value>(
  options: CalendarPointerSelectionOptions<Value>,
): CalendarPointerSelectionController {
  const { owner } = options;
  const ownerDocument = owner.ownerDocument;
  let pointerId: number | 'mouse' | undefined;
  let originX = 0;
  let originY = 0;
  let lastValue: Value | undefined;
  let destroyed = false;

  const point = (event: CalendarSelectionEvent): CalendarPointerPoint => ({
    clientX: event.clientX,
    clientY: event.clientY,
    offsetX: event.clientX - originX,
    offsetY: event.clientY - originY,
  });
  const removeListeners = () => {
    ownerDocument.removeEventListener('pointermove', move);
    ownerDocument.removeEventListener('pointerup', commit);
    ownerDocument.removeEventListener('pointercancel', cancelFromEvent);
    ownerDocument.documentElement.removeEventListener('mousemove', move);
    ownerDocument.documentElement.removeEventListener('mouseup', commit);
    ownerDocument.documentElement.removeEventListener('mouseleave', cancelFromEvent);
  };
  const clear = () => {
    removeListeners();
    if (typeof pointerId === 'number' && owner.hasPointerCapture?.(pointerId)) {
      try {
        owner.releasePointerCapture(pointerId);
      } catch {
        // A detached owner can release capture before cleanup.
      }
    }
    pointerId = undefined;
    lastValue = undefined;
  };
  const tracked = (event: CalendarSelectionEvent) =>
    pointerId === 'mouse'
      ? !('pointerId' in event)
      : 'pointerId' in event && event.pointerId === pointerId;
  const move = (event: CalendarSelectionEvent) => {
    if (!tracked(event)) return;
    const value = options.resolveValue(event, point(event));
    if (value === undefined) return;
    lastValue = value;
    options.onMove?.(value, event);
  };
  const commit = (event: CalendarSelectionEvent) => {
    if (!tracked(event)) return;
    const value = options.resolveValue(event, point(event)) ?? lastValue;
    clear();
    if (value !== undefined) options.onCommit?.(value, event);
    else options.onCancel?.(event);
  };
  const cancelFromEvent = (event: CalendarSelectionEvent) => {
    if (!tracked(event)) return;
    clear();
    options.onCancel?.(event);
  };
  const start = (event: CalendarSelectionEvent) => {
    const isPointer = 'pointerId' in event;
    if (
      destroyed ||
      pointerId !== undefined ||
      (event.button !== undefined && event.button !== 0) ||
      (isPointer && !event.isPrimary) ||
      options.canStart?.(event) === false
    )
      return false;
    originX = event.clientX;
    originY = event.clientY;
    const value = options.resolveValue(event, point(event));
    if (value === undefined || options.onStart?.(value, event) === false) return false;
    pointerId = isPointer ? event.pointerId : 'mouse';
    lastValue = value;
    if (typeof pointerId === 'number') {
      try {
        owner.setPointerCapture?.(pointerId);
      } catch {
        // Pointer capture is an enhancement; document listeners remain authoritative.
      }
      ownerDocument.addEventListener('pointermove', move);
      ownerDocument.addEventListener('pointerup', commit);
      ownerDocument.addEventListener('pointercancel', cancelFromEvent);
    } else {
      ownerDocument.documentElement.addEventListener('mousemove', move);
      ownerDocument.documentElement.addEventListener('mouseup', commit);
      ownerDocument.documentElement.addEventListener('mouseleave', cancelFromEvent);
    }
    return true;
  };
  const startFromOwner = (event: PointerEvent) => start(event);
  if (options.autoStart !== false) owner.addEventListener('pointerdown', startFromOwner);

  return {
    get selecting() {
      return pointerId !== undefined;
    },
    start,
    cancel() {
      if (pointerId === undefined) return;
      clear();
      options.onCancel?.();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (options.autoStart !== false) owner.removeEventListener('pointerdown', startFromOwner);
      if (pointerId !== undefined) {
        clear();
        options.onCancel?.();
      }
    },
  };
}

export interface CalendarTimelineScroller {
  scrollToHour(hour: number, behavior?: ScrollBehavior): boolean;
  destroy(): void;
}

/** Creates the desktop timeline scroll hook shared by week and day renderers. */
export function createCalendarTimelineScroller(options: {
  getScroller: () => Pick<HTMLElement, 'scrollTo'> | null | undefined;
  getHourHeight: () => number;
}): CalendarTimelineScroller {
  let destroyed = false;
  return {
    scrollToHour(hour, behavior = 'auto') {
      if (destroyed || !Number.isFinite(hour)) return false;
      const scroller = options.getScroller();
      const hourHeight = options.getHourHeight();
      if (!scroller || !Number.isFinite(hourHeight) || hourHeight <= 0) return false;
      const top = Math.max(0, Math.min(24, hour)) * hourHeight;
      scroller.scrollTo(behavior === 'auto' ? { top } : { top, behavior });
      return true;
    },
    destroy() {
      destroyed = true;
    },
  };
}
