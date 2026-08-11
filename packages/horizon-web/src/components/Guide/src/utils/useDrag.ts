import { onBeforeUnmount, onMounted, watchEffect, type ComputedRef, type Ref } from 'vue';

export const useDrag = (
  itemDomRef: Ref<HTMLElement | null>,
  targetRef: Ref<HTMLElement | null>,
  draggable: ComputedRef<boolean>,
) => {
  let activeMousemove: ((event: MouseEvent) => void) | undefined;
  let activeMouseup: (() => void) | undefined;

  const stopDragging = () => {
    document.body.style.cursor = 'default';
    if (activeMousemove) {
      document.removeEventListener('mousemove', activeMousemove);
      activeMousemove = undefined;
    }
    if (activeMouseup) {
      document.removeEventListener('mouseup', activeMouseup);
      activeMouseup = undefined;
    }
  };

  const onMouseenter = () => {
    document.body.style.cursor = 'move';
  };

  const onMouseleave = () => {
    document.body.style.cursor = 'default';
  };

  const onMousedown = (event: MouseEvent) => {
    const item = itemDomRef.value;
    const target = targetRef.value;
    if (!item || !target) {
      return;
    }

    stopDragging();
    const downX = event.clientX;
    const downY = event.clientY;
    const transform = item.style.transform;
    const translate = transform.match(
      /translate(?:3d)?\(\s*(-?\d+(?:\.\d+)?)px\s*,\s*(-?\d+(?:\.\d+)?)px/,
    );
    const offsetX = transform.includes('%')
      ? -item.offsetWidth / 2
      : Number(translate?.[1] ?? 0);
    const offsetY = transform.includes('%')
      ? -item.offsetHeight / 2
      : Number(translate?.[2] ?? 0);

    const targetRect = target.getBoundingClientRect();
    const minLeft = -targetRect.left + offsetX;
    const minTop = -targetRect.top + offsetY;
    const maxLeft = document.documentElement.clientWidth - targetRect.right + offsetX;
    const maxTop = document.documentElement.clientHeight - targetRect.bottom + offsetY;

    activeMousemove = moveEvent => {
      const moveX = Math.min(Math.max(offsetX + moveEvent.clientX - downX, minLeft), maxLeft);
      const moveY = Math.min(Math.max(offsetY + moveEvent.clientY - downY, minTop), maxTop);

      if (itemDomRef.value) {
        itemDomRef.value.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };
    activeMouseup = stopDragging;
    document.addEventListener('mousemove', activeMousemove);
    document.addEventListener('mouseup', activeMouseup);
  };

  const onDraggable = () => {
    const target = targetRef.value;
    if (itemDomRef.value && target) {
      target.addEventListener('mousedown', onMousedown);
      target.addEventListener('mouseenter', onMouseenter);
      target.addEventListener('mouseleave', onMouseleave);
    }
  };

  const offDraggable = () => {
    const target = targetRef.value;
    if (target) {
      target.removeEventListener('mousedown', onMousedown);
      target.removeEventListener('mouseenter', onMouseenter);
      target.removeEventListener('mouseleave', onMouseleave);
    }
    stopDragging();
  };

  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable();
      } else {
        offDraggable();
      }
    });
  });

  onBeforeUnmount(offDraggable);
};
