import type { DraggableOptions } from './composables/useOptions';
import { useDraggableOptions } from './composables/useOptions';
import type { DirectiveBinding } from 'vue';
import { defineDirective } from '@aurora/utils';

const draggableMethod = (el: HTMLElement, binding: DirectiveBinding<Partial<DraggableOptions>>) => {
  const {
    enabled = true,
    position = 'absolute',
    onMoveStart,
    onMove,
    onMoveEnd,
  } = binding.value || {};

  // 鼠标按下
  const moveStart = (event: MouseEvent) => {
    if (!enabled || event.which === 3) {
      return;
    }
    event.preventDefault();
    //TODO: el.__initX = xxx;
    el.dataset.state = JSON.stringify({
      isMouseDowned: true,
      initX: event.clientX,
      initY: event.clientY,
    });
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', moveEnd);
    if (onMoveStart) {
      onMoveStart(event);
    }
  };

  // 鼠标移动
  const move = (event: MouseEvent) => {
    event.preventDefault();
    const { isMouseDowned, initX, initY } = JSON.parse(el.dataset.state as string);
    if (isMouseDowned) {
      const offsetX = initX - event.clientX;
      const offsetY = initY - event.clientY;
      el.dataset.state = JSON.stringify({
        isMouseDowned: true,
        initX: event.clientX,
        initY: event.clientY,
      });
      el.style.position = position;
      el.style.top = `${el.offsetTop - offsetY}px`;
      el.style.left = `${el.offsetLeft - offsetX}px`;
      if (onMove) {
        onMove(event.clientX, event.clientY, event);
      }
      return false;
    }
  };

  // 鼠标松开
  const moveEnd = (event: MouseEvent) => {
    event.preventDefault();
    el.dataset.state = JSON.stringify({
      isMouseDowned: false,
      initX: event.clientX,
      initY: event.clientY,
    });
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', moveEnd);
    if (onMoveEnd) {
      onMoveEnd(event);
    }
  };

  if (enabled) {
    el.style.cursor = 'move';
    el.style.cursor = 'grab';
    (el as any).draggableListener = moveStart;
    el.addEventListener('mousedown', moveStart);
  } else {
    el.style.cursor = '';
    el.removeEventListener('mousedown', (el as any).draggableListener);
  }
};

export default defineDirective<HTMLElement, typeof useDraggableOptions>({
  name: 'draggable',
  options: useDraggableOptions,
  desc: '允许自由移动元素',
  mounted: draggableMethod,
  updated: draggableMethod,
});
