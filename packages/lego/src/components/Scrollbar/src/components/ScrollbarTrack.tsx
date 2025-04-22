import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { cls, ComponentClassBlock, isBoolean, isNumber, sizeUnitTransform } from '@nio-fe/shared';
import { NScrollbarViewSizeInjectKey } from '../utils/injectKeys';
import type { Position } from '@vueuse/core';
import { useDraggable } from '@vueuse/core';

export default defineComponent({
  name: 'ScrollbarTrack',
  props: {
    vertical: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    skewing: {
      type: Number,
      required: true,
    },
    zIndex: {
      type: Number,
      required: true,
    },
  },
  emits: {
    setScrollTop: (top: number) => isNumber(top),
    setScrollLeft: (left: number) => isNumber(left),
    setDragging: (status: boolean) => isBoolean(status),
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('scrollbar');

    const trackRef = ref<HTMLDivElement | null>(null);
    const thumbRef = ref<HTMLDivElement | null>(null);

    const viewSize = inject(NScrollbarViewSizeInjectKey)!;

    const style = computed(() => {
      if (props.vertical) {
        return {
          height: sizeUnitTransform(props.size),
          transform: `translateY(${sizeUnitTransform(props.position)})`,
        };
      } else {
        return {
          width: sizeUnitTransform(props.size),
          transform: `translateX(${sizeUnitTransform(props.position)})`,
        };
      }
    });

    function handleDrag({ x, y }: Position, event: PointerEvent) {
      const trackRect = trackRef.value!.getBoundingClientRect();

      if (props.vertical) {
        const top = y - trackRect.top + props.skewing;
        emit('setScrollTop', (top / trackRect.height) * viewSize.value.height);
      } else {
        const left = x - trackRect.left + props.skewing;
        emit('setScrollLeft', (left / trackRect.width) * viewSize.value.width);
      }

      if (event.type === 'pointermove') {
        emit('setDragging', true);
      } else {
        emit('setDragging', false);
      }
    }

    onMounted(() => {
      useDraggable(thumbRef, {
        onMove: handleDrag,
        onEnd: handleDrag,
      });
    });

    return () => (
      <div
        ref={trackRef}
        class={cls(
          classHelper.e('track'),
          classHelper.is('vertical', props.vertical),
          classHelper.is('horizon', !props.vertical),
        )}
        style={{ zIndex: props.zIndex }}
      >
        <div ref={thumbRef} class={cls(classHelper.em('track', 'thumb'))} style={style.value} />
      </div>
    );
  },
});
