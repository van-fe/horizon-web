import { nextTick, ref } from 'vue';
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
  focusHandle: (key: HSortableListItemKey) => void;
}

export interface HSortableListReorderResult {
  oldIndex: number;
  newIndex: number;
  item: any;
  list: any[];
}

export interface HSortableListSortMeta {
  event: DragEvent;
  sourceItem: any;
  targetItem: any;
  position: HSortableListDropPosition;
}

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

  const getKey = (item: any, index: number) =>
    getSortableListItemKey(item, index, options.itemKey.value);
  const isItemDisabled = (item: any, index: number) =>
    options.disabled.value || getSortableListItemDisabled(item, index, options.itemDisabled.value);

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

  return {
    draggingKey,
    dropTarget,
    getKey,
    isItemDisabled,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onHandleKeydown,
    move,
  };
}
