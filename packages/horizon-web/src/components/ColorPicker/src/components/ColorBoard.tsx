import { defineComponent, inject, onMounted, ref, watch } from 'vue';
import { ComponentClassBlock, getClientXY } from '@aurora/utils';
import type { Position } from '@vueuse/core';
import { useDraggable, clamp } from '@vueuse/core';
import { ColorPickerCurrentValue } from '../utils/InjectedKeys';

export default defineComponent({
  name: 'ColorBoard',
  setup() {
    const colorBoardWrapperRef = ref<HTMLElement | null>(null);
    const colorBoardRef = ref<HTMLElement | null>(null);
    const colorCursorRef = ref<HTMLElement | null>(null);
    const classHelper = new ComponentClassBlock('color-picker-panel__color-board');
    const currentValue = inject(ColorPickerCurrentValue);
    const cursorPosition = ref({
      x: 0,
      y: 0,
    });
    const { isDragging: isCursorDragging } = useDraggable(colorBoardWrapperRef, {
      onMove: handleDrag,
      onEnd: handleDrag,
    });

    watch(
      () => currentValue?.currentActiveColorTarget?.color.value,
      () => {
        updateCursorPosition();
      },
    );

    function updateCursorPosition() {
      if (isCursorDragging.value) return;
      const rect = colorBoardRef.value!.getBoundingClientRect();
      const saturation = currentValue?.currentActiveColorTarget?.color.get('saturation') || 0;
      const value = currentValue?.currentActiveColorTarget?.color.get('value') || 0;
      const cursorWidth = colorCursorRef.value?.offsetWidth || 18;

      cursorPosition.value.x = (saturation / 100) * (rect.width || 232) - cursorWidth / 2;
      cursorPosition.value.y = ((100 - value) / 100) * (rect.height || 160) - cursorWidth / 2;
    }

    function handleDrag(position: Position, event: MouseEvent | TouchEvent) {
      const rect = colorBoardWrapperRef.value!.getBoundingClientRect();
      const { clientX, clientY } = getClientXY(event);
      const cursorWidth = colorCursorRef.value?.offsetWidth || 18;

      let left = clientX - rect.x;
      let top = clientY - rect.y;

      left = clamp(left, 0, rect.width || 232);
      top = clamp(top, 0, rect.height || 160);

      cursorPosition.value.x = left - cursorWidth / 2;
      cursorPosition.value.y = top - cursorWidth / 2;

      currentValue?.currentActiveColorTarget?.color.set(
        {
          saturation: (left / (rect.width || 232)) * 100,
          value: 100 - (top / (rect.height || 160)) * 100,
        },
        true,
      );
    }

    onMounted(() => {
      setTimeout(() => {
        updateCursorPosition();
      });
    });

    return () => (
      <div ref={colorBoardWrapperRef} class={classHelper.e('wrapper')}>
        <div
          ref={colorBoardRef}
          class={classHelper.block}
          style={{
            background: `hsl(${currentValue?.currentActiveColorTarget?.color.get(
              'hue',
            )}, 100%, 50%)`,
          }}
          onMouseup={(evt: MouseEvent) => evt.stopPropagation()}
        >
          <div class={classHelper.m('white')}></div>
          <div class={classHelper.m('black')}></div>
        </div>
        <div
          ref={colorCursorRef}
          class={classHelper.m('cursor')}
          style={{
            top: cursorPosition.value.y + 'px',
            left: cursorPosition.value.x + 'px',
            background: currentValue?.currentActiveColorTarget?.color.valueWithoutAlpha,
          }}
          draggable={false}
        />
      </div>
    );
  },
});
