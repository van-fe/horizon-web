import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type {
  HSortableListItemDisabledGetter,
  HSortableListItemKey,
  HSortableListItemKeyGetter,
} from '../composables/useProps';
import type { HSortableListSortContext, HSortableListSortTrigger } from '../composables/useEmits';

export type HSortableListDropPosition = 'before' | 'after';

interface HSortableListDropTarget {
  key: HSortableListItemKey;
  position: HSortableListDropPosition;
}

interface UseSortableListOptions {
  items: Ref<any[]>;
  disabled: Ref<boolean>;
  itemKey: Ref<string | HSortableListItemKeyGetter>;
  itemDisabled: Ref<string | HSortableListItemDisabledGetter | undefined>;
  onSort: (context: HSortableListSortContext, meta?: HSortableListSortMeta) => void;
  onDragStart: (event: DragEvent, item: any, index: number, key: HSortableListItemKey) => void;
  onDragEnd: (event: DragEvent, item: any, index: number, key: HSortableListItemKey) => void;
  onPointerStart?: (
    event: PointerEvent,
    item: any,
    index: number,
    key: HSortableListItemKey,
  ) => void;
  onPointerEnd?: (event: PointerEvent, item: any, index: number, key: HSortableListItemKey) => void;
  focusHandle: (key: HSortableListItemKey) => void;
  animated?: Ref<boolean>;
}

export interface HSortableListReorderResult {
  oldIndex: number;
  newIndex: number;
  item: any;
  list: any[];
}

export interface HSortableListSortMeta {
  event: DragEvent | PointerEvent;
  sourceItem: any;
  targetItem: any;
  position: HSortableListDropPosition;
}

export const H_SORTABLE_LIST_FLIP_OPTIONS: KeyframeAnimationOptions = {
  duration: 220,
  easing: 'cubic-bezier(0.2, 0, 0, 1)',
};

export function getSortableListItemKey(
  item: any,
  index: number,
  itemKey: string | HSortableListItemKeyGetter,
): HSortableListItemKey {
  return typeof itemKey === 'function' ? itemKey(item, index) : item?.[itemKey];
}

export function getSortableListItemDisabled(
  item: any,
  index: number,
  itemDisabled?: string | HSortableListItemDisabledGetter,
) {
  if (!itemDisabled) return false;
  return typeof itemDisabled === 'function' ? itemDisabled(item, index) : !!item?.[itemDisabled];
}

export function moveSortableListItem(
  items: any[],
  oldIndex: number,
  newIndex: number,
): HSortableListReorderResult | undefined {
  if (
    oldIndex < 0 ||
    oldIndex >= items.length ||
    newIndex < 0 ||
    newIndex >= items.length ||
    oldIndex === newIndex
  ) {
    return;
  }

  const list = items.slice();
  const [item] = list.splice(oldIndex, 1);
  list.splice(newIndex, 0, item);

  return { oldIndex, newIndex, item, list };
}

export function reorderSortableListItem(
  items: any[],
  sourceKey: HSortableListItemKey,
  targetKey: HSortableListItemKey,
  position: HSortableListDropPosition,
  itemKey: string | HSortableListItemKeyGetter,
): HSortableListReorderResult | undefined {
  const oldIndex = items.findIndex(
    (item, index) => getSortableListItemKey(item, index, itemKey) === sourceKey,
  );
  const targetIndex = items.findIndex(
    (item, index) => getSortableListItemKey(item, index, itemKey) === targetKey,
  );

  if (oldIndex < 0 || targetIndex < 0 || oldIndex === targetIndex) return;

  const list = items.slice();
  const [item] = list.splice(oldIndex, 1);
  const adjustedTargetIndex = list.findIndex(
    (current, index) => getSortableListItemKey(current, index, itemKey) === targetKey,
  );
  const newIndex = adjustedTargetIndex + (position === 'after' ? 1 : 0);

  if (newIndex === oldIndex) return;

  list.splice(newIndex, 0, item);
  return { oldIndex, newIndex, item, list };
}

export default function useSortableList(options: UseSortableListOptions) {
  const draggingKey = ref<HSortableListItemKey>();
  const dropTarget = ref<HSortableListDropTarget>();
  const dragOffsetY = ref(0);
  const itemElements = new Map<HSortableListItemKey, HTMLElement>();
  let positionsBeforeSort: Map<HSortableListItemKey, number> | undefined;
  let pointerStartY = 0;
  let pointerDraggedItem: any;
  let pointerDraggedIndex = -1;
  let previousUserSelect = '';

  const getKey = (item: any, index: number) =>
    getSortableListItemKey(item, index, options.itemKey.value);
  const isItemDisabled = (item: any, index: number) =>
    options.disabled.value || getSortableListItemDisabled(item, index, options.itemDisabled.value);

  const shouldAnimate = () =>
    options.animated?.value !== false &&
    !(
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );

  function setItemElement(key: HSortableListItemKey, element: HTMLElement | null) {
    if (element) itemElements.set(key, element);
    else itemElements.delete(key);
  }

  function capturePositions() {
    if (!shouldAnimate() || itemElements.size === 0) return;
    positionsBeforeSort = new Map(
      [...itemElements].map(([key, element]) => [key, element.getBoundingClientRect().top]),
    );
  }

  watch(
    () => options.items.value.map((item, index) => getKey(item, index)),
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
          H_SORTABLE_LIST_FLIP_OPTIONS,
        );
      });
    },
    { flush: 'post' },
  );

  function clearDropTarget() {
    dropTarget.value = undefined;
  }

  function clearDragState() {
    draggingKey.value = undefined;
    clearDropTarget();
  }

  function emitSort(
    result: HSortableListReorderResult,
    trigger: HSortableListSortTrigger,
    meta?: HSortableListSortMeta,
  ) {
    options.onSort({ ...result, trigger }, meta);
  }

  function onDragStart(event: DragEvent, item: any, index: number) {
    if (isItemDisabled(item, index)) {
      event.preventDefault();
      return;
    }

    const key = getKey(item, index);
    draggingKey.value = key;
    event.dataTransfer?.setData('text/plain', String(key));
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
    options.onDragStart(event, item, index, key);
  }

  function onDragOver(event: DragEvent, item: any, index: number) {
    if (draggingKey.value === undefined || isItemDisabled(item, index)) return;

    const key = getKey(item, index);
    const rect = (event.currentTarget as HTMLElement | null)?.getBoundingClientRect();
    const position: HSortableListDropPosition =
      rect && event.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
    const result = reorderSortableListItem(
      options.items.value,
      draggingKey.value,
      key,
      position,
      options.itemKey.value,
    );

    if (!result) {
      clearDropTarget();
      return;
    }

    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    dropTarget.value = { key, position };
  }

  function onDragLeave(event: DragEvent, item: any, index: number) {
    if (
      dropTarget.value?.key === getKey(item, index) &&
      !(event.currentTarget as HTMLElement | null)?.contains(event.relatedTarget as Node | null)
    ) {
      clearDropTarget();
    }
  }

  function onDrop(event: DragEvent, item: any, index: number) {
    const target = dropTarget.value;
    if (draggingKey.value === undefined || !target || target.key !== getKey(item, index)) return;

    const result = reorderSortableListItem(
      options.items.value,
      draggingKey.value,
      target.key,
      target.position,
      options.itemKey.value,
    );

    if (result) {
      event.preventDefault();
      capturePositions();
      emitSort(result, 'drag', {
        event,
        sourceItem: options.items.value[result.oldIndex],
        targetItem: item,
        position: target.position,
      });
    }
    clearDropTarget();
  }

  function onDragEnd(event: DragEvent, item: any, index: number) {
    const key = getKey(item, index);
    clearDragState();
    options.onDragEnd(event, item, index, key);
  }

  function removePointerListeners() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerCancel);
  }

  function stopPointerDragging(event?: PointerEvent, emitEnd = false) {
    const item = pointerDraggedItem;
    const index = pointerDraggedIndex;
    const key = draggingKey.value;

    removePointerListeners();
    if (typeof document !== 'undefined') document.body.style.userSelect = previousUserSelect;
    pointerDraggedItem = undefined;
    pointerDraggedIndex = -1;
    dragOffsetY.value = 0;
    clearDragState();

    if (emitEnd && event && item !== undefined && index >= 0 && key !== undefined) {
      options.onPointerEnd?.(event, item, index, key);
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (draggingKey.value === undefined) return;
    event.preventDefault();
    dragOffsetY.value = event.clientY - pointerStartY;

    const candidates = options.items.value
      .map((item, index) => ({
        item,
        key: getKey(item, index),
        element: itemElements.get(getKey(item, index)),
      }))
      .filter(
        (candidate): candidate is { item: any; key: HSortableListItemKey; element: HTMLElement } =>
          candidate.key !== draggingKey.value && !!candidate.element,
      )
      .map(candidate => ({ ...candidate, bounds: candidate.element.getBoundingClientRect() }))
      .sort((left, right) => left.bounds.top - right.bounds.top);

    let nextTarget: HSortableListDropTarget | undefined;
    for (const candidate of candidates) {
      if (event.clientY < candidate.bounds.top + candidate.bounds.height / 2) {
        nextTarget = { key: candidate.key, position: 'before' };
        break;
      }
    }

    const lastCandidate = candidates[candidates.length - 1];
    if (!nextTarget && lastCandidate) {
      nextTarget = { key: lastCandidate.key, position: 'after' };
    }

    if (
      dropTarget.value?.key !== nextTarget?.key ||
      dropTarget.value?.position !== nextTarget?.position
    ) {
      dropTarget.value = nextTarget;
    }
  }

  function onPointerUp(event: PointerEvent) {
    const sourceKey = draggingKey.value;
    const target = dropTarget.value;

    if (sourceKey !== undefined && target) {
      const result = reorderSortableListItem(
        options.items.value,
        sourceKey,
        target.key,
        target.position,
        options.itemKey.value,
      );

      if (result) {
        capturePositions();
        emitSort(result, 'drag', {
          event,
          sourceItem: options.items.value[result.oldIndex],
          targetItem: options.items.value.find((item, index) => getKey(item, index) === target.key),
          position: target.position,
        });
      }
    }

    stopPointerDragging(event, true);
  }

  function onPointerCancel(event: PointerEvent) {
    stopPointerDragging(event, true);
  }

  function onPointerDown(
    event: PointerEvent,
    item: any,
    index: number,
    ignoreInteractiveTarget = false,
  ) {
    if (event.button !== 0 || isItemDisabled(item, index)) return;

    if (
      ignoreInteractiveTarget &&
      event.target instanceof Element &&
      event.target.closest(
        'a, button, input, select, textarea, [contenteditable="true"], [role="button"]',
      )
    ) {
      return;
    }

    event.preventDefault();
    stopPointerDragging();

    const key = getKey(item, index);
    pointerStartY = event.clientY;
    pointerDraggedItem = item;
    pointerDraggedIndex = index;
    draggingKey.value = key;
    dropTarget.value = undefined;
    dragOffsetY.value = 0;

    if (typeof document !== 'undefined') {
      previousUserSelect = document.body.style.userSelect;
      document.body.style.userSelect = 'none';
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerCancel);
    }
    options.onPointerStart?.(event, item, index, key);
  }

  function move(
    oldIndex: number,
    newIndex: number,
    trigger: HSortableListSortTrigger = 'keyboard',
  ) {
    if (options.disabled.value) return;
    const item = options.items.value[oldIndex];
    if (!item || isItemDisabled(item, oldIndex)) return;

    const result = moveSortableListItem(options.items.value, oldIndex, newIndex);
    if (!result) return;

    capturePositions();
    emitSort(result, trigger);
    const key = getKey(item, oldIndex);
    nextTick(() => options.focusHandle(key));
  }

  function onHandleKeydown(event: KeyboardEvent, item: any, index: number) {
    if (isItemDisabled(item, index)) return;

    let newIndex: number | undefined;
    if (event.key === 'ArrowUp') newIndex = index - 1;
    if (event.key === 'ArrowDown') newIndex = index + 1;
    if (event.key === 'Home') newIndex = 0;
    if (event.key === 'End') newIndex = options.items.value.length - 1;
    if (newIndex === undefined || newIndex < 0 || newIndex >= options.items.value.length) return;

    event.preventDefault();
    move(index, newIndex);
  }

  onBeforeUnmount(() => stopPointerDragging());

  return {
    draggingKey,
    dropTarget,
    dragOffsetY,
    getKey,
    isItemDisabled,
    setItemElement,
    onPointerDown,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onHandleKeydown,
    move,
  };
}
