import { type Position, useDraggable as useCoreDraggable, useElementBounding } from '@vueuse/core';
import { computed, type CSSProperties, ref, type ToRefs } from 'vue';
import { type DialogProps } from './useProps';

export function useDraggable(props: ToRefs<DialogProps>) {
  const el = ref<HTMLElement>();
  const movableElement = ref<HTMLElement>();

  const { x: cx, y: cy, update } = useElementBounding(movableElement);
  const hasMoved = ref(false);
  const position = ref<Position>({ x: 0, y: 0 });
  const { isDragging } = useCoreDraggable(movableElement, {
    initialValue: position,
    handle: el,
    preventDefault: true,
    onStart: (_, evt) => {
      const openDraggable = props.draggable.value && props.visible.value && evt.button === 0;
      if (!openDraggable) return false;

      if (!hasMoved.value) {
        hasMoved.value = true;
        update();
        position.value = { x: cx.value, y: cy.value };
      }
    },
    onMove: ({ x, y }) => {
      position.value = { x, y };
    },
  });

  const dialogStyle = computed<CSSProperties>(() => {
    if (!hasMoved.value) return {};
    return {
      transform: 'none',
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
      right: 'auto',
    };
  });

  const notifyDialogClosed = () => {
    hasMoved.value = false;
  };

  return {
    hasMoved,
    movableElement,
    dragging: isDragging,
    draggleHandle: el,
    dialogStyle,
    notifyDialogClosed,
  };
}
