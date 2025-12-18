import type { Ref } from 'vue';
import { unref, computed, ref, watch, readonly } from 'vue';
import type { Position } from '@vueuse/core';
import type { MaybeRef } from '@nio-fe/shared';
import { getClientXY, isDefined } from '@nio-fe/shared';

export interface UseDragOption {
  disabled?: MaybeRef<boolean>;
  initialValue?: MaybeRef<Position>;
  onStart?: (position: Position, event: MouseEvent) => void | false;
  onMove?: (position: Position, event: MouseEvent) => void;
  onEnd?: (position: Position, event: MouseEvent) => void;
}

export default function (target: Ref<HTMLElement | null>, options?: UseDragOption) {
  watch(target, val => {
    if (val) {
      val.addEventListener('mousedown', onMouseDown);
    }
  });

  watch(
    () => options?.disabled,
    val => {
      if (isDefined(unref(val))) {
        target.value?.removeEventListener('mousedown', onMouseDown);
      }
    },
  );

  const isDragging = ref(false);
  const x = ref(unref(options?.initialValue)?.x ?? 0);
  const y = ref(unref(options?.initialValue)?.y ?? 0);
  const xDiff = ref(0);
  const yDiff = ref(0);

  const position = computed(() => ({
    x: x.value - xDiff.value,
    y: y.value - yDiff.value,
  }));

  function initialDiff() {
    xDiff.value = 0;
    yDiff.value = 0;
  }

  function updatePosition(evt: MouseEvent) {
    ({ clientX: x.value, clientY: y.value } = getClientXY(evt));
  }

  function onMouseDown(evt: MouseEvent) {
    evt.preventDefault();
    updatePosition(evt);
    const rect = target.value!.getBoundingClientRect();

    xDiff.value = x.value - rect.x;
    yDiff.value = y.value - rect.y;

    if (options?.onStart?.(position.value, evt) !== false) {
      isDragging.value = true;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  function onMouseMove(evt: MouseEvent) {
    if (isDragging.value) {
      evt.preventDefault();
      updatePosition(evt);

      options?.onMove?.(position.value, evt);
    }
  }

  function onMouseUp(evt: MouseEvent) {
    if (isDragging.value) {
      evt.preventDefault();
      updatePosition(evt);

      options?.onEnd?.(position.value, evt);

      isDragging.value = false;

      initialDiff();
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  return {
    isDragging: readonly(isDragging),
    x: computed(() => position.value.x),
    y: computed(() => position.value.y),
    style: computed(() => ({ left: position.value.x + 'px', top: position.value.y + 'px' })),
    updatePosition(pos: MaybeRef<Position>) {
      initialDiff();
      ({ x: x.value, y: y.value } = unref(pos));
    },
  };
}
