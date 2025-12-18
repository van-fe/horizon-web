import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import { NSliderGetTrackSizeInjectedKey, NSliderPropsInjectedKey } from '../utils/injectedKeys';
import type { LegoSetupContext } from '@aurora/shared';
import { ComponentClassBlock, getClientXY, getPrecision } from '@aurora/shared';
import round from 'lodash/round';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import type { SliderCursorEmits } from '../composables/useEmits';
import { useSliderCursorEmits } from '../composables/useEmits';
import type { Position } from '@vueuse/core';
import { useDraggable } from '@vueuse/core';
import { getCorrectedValue } from '../utils/valueMethods';
import { useSliderCursorSlots } from '../composables/useSlots';
import type { SliderCursorSlots } from '../composables/useSlots';
import type { SliderCursorExposes } from '../composables/useExposes';
import { useSliderCursorExposes } from '../composables/useExposes';

export default defineComponent({
  name: 'SliderCursor',
  components: {
    NTooltip,
  },
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: useSliderCursorEmits,
  slots: useSliderCursorSlots,
  exposes: useSliderCursorExposes,
  setup(
    props,
    { emit, expose }: LegoSetupContext<SliderCursorEmits, SliderCursorSlots, SliderCursorExposes>,
  ) {
    const classHelper = new ComponentClassBlock('slider');

    const tooltipRef = ref<(typeof NTooltip & { updateTooltip: Function }) | null>(null);
    const cursorRef = ref<HTMLElement | null>(null);

    const parentProps = inject(NSliderPropsInjectedKey)!;
    const getTrackSize = inject(NSliderGetTrackSizeInjectedKey)!;

    const isDuringDragging = ref(false);
    const cursorToLeft = ref('0px');

    /**
     * model-value
     */
    const currentValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      val => {
        updateCurrentValue(val);
      },
    );

    watch(currentValue, val => {
      emit('update:modelValue', val);
    });

    /**
     * computed value
     */
    const precision = computed(() => getPrecision(parentProps.step));
    const tooltipVisible = computed(() =>
      parentProps.tooltipEnable ? isDuringDragging.value : false,
    );

    /**
     * methods
     */
    function updateCursorPosition() {
      const cursorWidth = cursorRef.value?.clientWidth || 24;

      cursorToLeft.value = `calc(${
        ((currentValue.value - parentProps.min) / (parentProps.max - parentProps.min)) * 100
      }% - ${cursorWidth / 2}px)`;
    }

    function updateCurrentValue(val: number, enableCorrect = false) {
      const temp = getCorrectedValue(val, parentProps, enableCorrect);

      if (temp !== currentValue.value) {
        currentValue.value = temp;

        nextTick(() => {
          tooltipRef.value?.updateTooltip();
        });

        emit('update:modelValue', currentValue.value);
        updateCursorPosition();
      }
    }

    function handleCursorDrag(position: Position, event: MouseEvent | TouchEvent) {
      if (parentProps.disabled) return;

      isDuringDragging.value = true;
      const { clientX } = getClientXY(event);
      const cursorWidth = cursorRef.value?.offsetWidth || 24;

      const { width: trackWidth, left: trackLeft } = getTrackSize();

      if (clientX > trackLeft + trackWidth) {
        updateCurrentValue(parentProps.max);
      } else if (clientX < trackLeft) {
        updateCurrentValue(parentProps.min);
      } else {
        const left = Math.min(
          Math.max(cursorWidth / 2, clientX - trackLeft),
          trackWidth - cursorWidth / 2,
        );

        const percent = round((left / trackWidth) * 100, precision.value) / 100;

        updateCurrentValue(percent * (parentProps.max - parentProps.min) + parentProps.min, true);
      }
    }

    function increaseValue() {
      updateCurrentValue(currentValue.value + parentProps.step);
    }

    function reduceValue() {
      updateCurrentValue(currentValue.value - parentProps.step);
    }

    /**
     * events
     */

    let isFocus = false;

    function onMouseEnter() {
      if (parentProps.disabled) return;
      isDuringDragging.value = true;
    }

    function onMouseLeave() {
      if (!isFocus) {
        isDuringDragging.value = false;
      }
    }
    function onFocus(evt: FocusEvent) {
      isFocus = true;
      isDuringDragging.value = true;
      emit('focus', evt);
    }

    function onBlur(evt: FocusEvent) {
      isFocus = false;
      isDuringDragging.value = false;
      clearKeyDownTimer();
      emit('blur', evt);
    }

    let keyDownTimer: ReturnType<typeof setTimeout> | null = null;

    function onKeyDown(evt: KeyboardEvent) {
      if (!parentProps.keyboardEnable || parentProps.disabled) return;

      switch (evt.code) {
        case 'ArrowLeft':
          onPressArrowLeft();
          break;
        case 'ArrowRight':
          onPressArrowRight();
          break;
      }
    }

    function onKeyUp() {
      clearKeyDownTimer();
    }

    function clearKeyDownTimer() {
      if (keyDownTimer !== null) {
        clearTimeout(keyDownTimer);
        keyDownTimer = null;
      }
    }

    function onPressArrowLeft() {
      if (parentProps.disabled) return;
      clearKeyDownTimer();
      reduceValue();
      keyDownTimer = setInterval(reduceValue, 200);
    }

    function onPressArrowRight() {
      if (parentProps.disabled) return;
      clearKeyDownTimer();
      increaseValue();
      keyDownTimer = setInterval(increaseValue, 200);
    }

    /**
     * exposes
     */
    expose({
      updateCursorPosition,
      updateCurrentValue,
    });

    onMounted(() => {
      if (cursorRef.value) {
        cursorRef.value?.addEventListener('mouseenter', onMouseEnter);
        cursorRef.value?.addEventListener('mouseleave', onMouseLeave);

        useDraggable(cursorRef.value, {
          onMove: handleCursorDrag,
          onEnd: handleCursorDrag,
        });

        requestAnimationFrame(() => {
          updateCursorPosition();
        });
      }
    });

    onBeforeUnmount(() => {
      cursorRef.value?.removeEventListener('mouseenter', onMouseEnter);
      cursorRef.value?.removeEventListener('mouseleave', onMouseLeave);
    });

    return () => (
      <NTooltip
        content={
          parentProps.tooltipFormatter
            ? parentProps.tooltipFormatter(currentValue.value)
            : currentValue.value.toString()
        }
        placement={parentProps.tooltipPlacement}
        trigger="manual"
        visible={tooltipVisible.value}
        enterable={true}
        ref={tooltipRef}
      >
        <div
          class={classHelper.e('cursor')}
          ref={cursorRef}
          tabindex={0}
          style={{ left: cursorToLeft.value }}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeydown={onKeyDown}
          onKeyup={onKeyUp}
        />
      </NTooltip>
    );
  },
});
