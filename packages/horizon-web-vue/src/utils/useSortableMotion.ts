import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { Ref, WatchSource } from 'vue';

export interface SortableMotionOffset {
  x: number;
  y: number;
}

interface UseSortableMotionOptions<TKey extends string | number> {
  keys: WatchSource<readonly TKey[]>;
  animated?: Ref<boolean>;
  onPointerMove?: (event: PointerEvent, offset: SortableMotionOffset) => void;
  onPointerEnd?: (event: PointerEvent) => void;
  onPointerCancel?: (event: PointerEvent) => void;
}

export const SORTABLE_MOTION_FLIP_OPTIONS: KeyframeAnimationOptions = {
  duration: 220,
  easing: 'cubic-bezier(0.2, 0, 0, 1)',
};

export default function useSortableMotion<TKey extends string | number>(
  options: UseSortableMotionOptions<TKey>,
) {
  const dragOffset = ref<SortableMotionOffset>({ x: 0, y: 0 });
  const itemElements = new Map<TKey, HTMLElement>();
  let positionsBeforeSort: Map<TKey, number> | undefined;
  let pointerActive = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let previousUserSelect = '';

  const shouldAnimate = () =>
    options.animated?.value !== false &&
    !(
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );

  function setItemElement(key: TKey, element: HTMLElement | null) {
    if (element) itemElements.set(key, element);
    else itemElements.delete(key);
  }

  function getItemElement(key: TKey) {
    return itemElements.get(key);
  }

  function capturePositions() {
    if (!shouldAnimate() || itemElements.size === 0) return;
    positionsBeforeSort = new Map(
      [...itemElements].map(([key, element]) => [key, element.getBoundingClientRect().top]),
    );
  }

  function clearCapturedPositions() {
    positionsBeforeSort = undefined;
  }

  watch(
    options.keys,
    async () => {
      const previousPositions = positionsBeforeSort;
      positionsBeforeSort = undefined;
      if (!previousPositions) return;

      await nextTick();
      itemElements.forEach((element, key) => {
        const previousTop = previousPositions.get(key);
        if (previousTop === undefined || typeof element.animate !== 'function') return;

        const offset = previousTop - element.getBoundingClientRect().top;
        if (Math.abs(offset) < 1) return;

        element.animate(
          [{ transform: `translateY(${offset}px)` }, { transform: 'translateY(0)' }],
          SORTABLE_MOTION_FLIP_OPTIONS,
        );
      });
    },
    { flush: 'post' },
  );

  function removePointerListeners() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerCancel);
  }

  function stopPointerDrag() {
    if (!pointerActive) return;
    pointerActive = false;
    removePointerListeners();
    if (typeof document !== 'undefined') document.body.style.userSelect = previousUserSelect;
    dragOffset.value = { x: 0, y: 0 };
  }

  function onPointerMove(event: PointerEvent) {
    if (!pointerActive) return;
    event.preventDefault();
    const offset = {
      x: event.clientX - pointerStartX,
      y: event.clientY - pointerStartY,
    };
    dragOffset.value = offset;
    options.onPointerMove?.(event, offset);
  }

  function onPointerUp(event: PointerEvent) {
    if (!pointerActive) return;
    try {
      options.onPointerEnd?.(event);
    } finally {
      stopPointerDrag();
    }
  }

  function onPointerCancel(event: PointerEvent) {
    if (!pointerActive) return;
    try {
      options.onPointerCancel?.(event);
    } finally {
      stopPointerDrag();
    }
  }

  function startPointerDrag(event: PointerEvent) {
    stopPointerDrag();
    pointerActive = true;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;

    if (typeof document !== 'undefined') {
      previousUserSelect = document.body.style.userSelect;
      document.body.style.userSelect = 'none';
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerCancel);
    }
  }

  onBeforeUnmount(stopPointerDrag);

  return {
    dragOffset,
    setItemElement,
    getItemElement,
    capturePositions,
    clearCapturedPositions,
    startPointerDrag,
    stopPointerDrag,
  };
}
