import type { HorizonWebSetupContext } from '@aurora/utils';
import { ref, toRef, type ToRefs } from 'vue';
import { type TabsEmits } from './useEmits';
import type { HTabValue, TabsProps } from './useProps';
import type { TabsSlots } from './useSlots';

export interface UseDndOptions extends TabsProps {
  keys: HTabValue[];
}

export function useDnd(
  options: ToRefs<UseDndOptions>,
  context: HorizonWebSetupContext<TabsEmits, TabsSlots>,
) {
  const dragging = ref(false);
  const moveKey = ref<HTabValue>();
  const overKey = ref<HTabValue>();

  const onDragstart = (key: HTabValue, evt: DragEvent) => {
    dragging.value = true;
    moveKey.value = key;
    evt.dataTransfer!.dropEffect = 'move';
    evt.dataTransfer!.effectAllowed = 'move';
  };

  const onDrag = (key: HTabValue, evt: DragEvent) => {
    // todo
  };
  const onDragend = (key: HTabValue, evt: DragEvent) => {
    dragging.value = false;
    moveKey.value = undefined;
  };

  const onDragenter = (key: HTabValue, evt: DragEvent) => {
    // todo
  };
  const onDragover = (key: HTabValue, evt: DragEvent) => {
    // 启用 drop 事件
    evt.preventDefault();
    overKey.value = key;
  };
  const onDragleave = (key: HTabValue, evt: DragEvent) => {
    // todo
  };

  const onDrop = (key: HTabValue, evt: DragEvent) => {
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

  const createDraggable = (key: HTabValue) => ({
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
