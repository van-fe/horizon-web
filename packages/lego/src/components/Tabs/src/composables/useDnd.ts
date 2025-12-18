import type { LegoSetupContext } from '@nio-fe/shared';
import { ref, toRef, type ToRefs } from 'vue';
import { type TabsEmits } from './useEmits';
import type { NTabValue, TabsProps } from './useProps';
import type { TabsSlots } from './useSlots';

export interface UseDndOptions extends TabsProps {
  keys: NTabValue[];
}

export function useDnd(
  options: ToRefs<UseDndOptions>,
  context: LegoSetupContext<TabsEmits, TabsSlots>,
) {
  const dragging = ref(false);
  const moveKey = ref<NTabValue>();
  const overKey = ref<NTabValue>();

  const onDragstart = (key: NTabValue, evt: DragEvent) => {
    dragging.value = true;
    moveKey.value = key;
    evt.dataTransfer!.dropEffect = 'move';
    evt.dataTransfer!.effectAllowed = 'move';
  };

  const onDrag = (key: NTabValue, evt: DragEvent) => {
    // todo
  };
  const onDragend = (key: NTabValue, evt: DragEvent) => {
    dragging.value = false;
    moveKey.value = undefined;
  };

  const onDragenter = (key: NTabValue, evt: DragEvent) => {
    // todo
  };
  const onDragover = (key: NTabValue, evt: DragEvent) => {
    // 启用 drop 事件
    evt.preventDefault();
    overKey.value = key;
  };
  const onDragleave = (key: NTabValue, evt: DragEvent) => {
    // todo
  };

  const onDrop = (key: NTabValue, evt: DragEvent) => {
    const el = evt.currentTarget as HTMLElement;
    if (!el.draggable) return;

    const currentKey = moveKey.value!;
    const targetKey = overKey.value!;
    if (currentKey === targetKey) return;

    const cloneKeys = options.keys.value.slice();
    const current = cloneKeys.indexOf(currentKey);
    const target = cloneKeys.indexOf(targetKey);
    // 交换位置
    [cloneKeys[current], cloneKeys[target]] = [cloneKeys[target], cloneKeys[current]];

    context.emit('sort', current, target, cloneKeys);
    options.keys.value = cloneKeys;
  };

  const createDraggable = (key: NTabValue) => ({
    onDragstart: (evt: DragEvent) => onDragstart(key, evt),
    onDragover: (evt: DragEvent) => onDragover(key, evt),
    onDrag: (evt: DragEvent) => onDrag(key, evt),
    onDragend: (evt: DragEvent) => onDragend(key, evt),
    onDrop: (evt: DragEvent) => onDrop(key, evt),
    onDragenter: (evt: DragEvent) => onDragenter(key, evt),
    onDragleave: (evt: DragEvent) => onDragleave(key, evt),
  });

  return { createDraggable, dragging, moveKey, overKey, draggable: toRef(options, 'draggable') };
}

export type UseDndResult = ReturnType<typeof useDnd>;
