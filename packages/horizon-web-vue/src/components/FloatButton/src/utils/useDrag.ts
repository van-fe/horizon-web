import type { FloatButtonPosition } from '@aurora/core';
import type { FloatButtonDragController, FloatButtonDragDetails } from '@aurora/horizon-web-core';
import { createFloatButtonDragController } from '@aurora/horizon-web-core';
import type { MaybeRef } from '@aurora/utils';
import type { Ref } from 'vue';
import { computed, onBeforeUnmount, readonly, ref, unref, watch } from 'vue';

export interface UseDragOption {
  disabled?: MaybeRef<boolean>;
  initialValue?: MaybeRef<FloatButtonPosition>;
  onStart?: (position: FloatButtonPosition, event: PointerEvent) => void | false;
  onMove?: (position: FloatButtonPosition, event: PointerEvent) => void;
  onEnd?: (position: FloatButtonPosition, event: PointerEvent) => void;
}

export default function useDrag(target: Ref<HTMLElement | null>, options?: UseDragOption) {
  const initial = unref(options?.initialValue);
  const position = ref<FloatButtonPosition>({ x: initial?.x ?? 0, y: initial?.y ?? 0 });
  const isDragging = ref(false);
  let controller: FloatButtonDragController | null = null;

  const destroyController = () => {
    controller?.destroy();
    controller = null;
    isDragging.value = false;
  };
  const updateFromDetails = (details: FloatButtonDragDetails) => {
    position.value = { x: details.position.left, y: details.position.top };
  };
  const setupController = (element: HTMLElement | null) => {
    destroyController();
    if (!element) return;
    controller = createFloatButtonDragController(element, {
      disabled: () => unref(options?.disabled) ?? false,
      onStart(details, event) {
        updateFromDetails(details);
        if (options?.onStart?.(position.value, event) === false) return false;
        isDragging.value = true;
      },
      onMove(details, event) {
        updateFromDetails(details);
        options?.onMove?.(position.value, event);
      },
      onEnd(details, event) {
        updateFromDetails(details);
        isDragging.value = false;
        options?.onEnd?.(position.value, event);
      },
    });
  };

  watch(target, setupController, { immediate: true, flush: 'post' });
  onBeforeUnmount(destroyController);

  return {
    isDragging: readonly(isDragging),
    x: computed(() => position.value.x),
    y: computed(() => position.value.y),
    style: computed(() => ({ left: `${position.value.x}px`, top: `${position.value.y}px` })),
    updatePosition(nextPosition: MaybeRef<FloatButtonPosition>) {
      position.value = { ...unref(nextPosition) };
    },
  };
}
