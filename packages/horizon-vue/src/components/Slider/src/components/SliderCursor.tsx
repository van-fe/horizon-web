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
import { HSliderGetTrackSizeInjectedKey, HSliderPropsInjectedKey } from '../utils/injectedKeys';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, getClientXY } from '@aurora/utils';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import type { SliderCursorEmits } from '../composables/useEmits';
import { useSliderCursorEmits } from '../composables/useEmits';
import type { Position } from '@vueuse/core';
import { useDraggable } from '@vueuse/core';
import { getCorrectedValue } from '../utils/valueMethods';
import { useSliderCursorSlots } from '../composables/useSlots';
import type { SliderCursorSlots } from '../composables/useSlots';
import type { SliderCursorExposes } from '../composables/useExposes';
import { useSliderCursorExposes } from '../composables/useExposes';
import {
  getSliderKeyboardValue,
  getSliderProgress,
  getSliderValueFromPosition,
} from '@aurora/core';
import { focusSliderThumb } from '@aurora/horizon-core';

export default defineComponent({
  name: 'SliderCursor',
  components: {
    HTooltip,
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
    {
      emit,
      expose,
    }: HorizonWebSetupContext<SliderCursorEmits, SliderCursorSlots, SliderCursorExposes>,
  ) {
    const classHelper = new ComponentClassBlock('slider');

    const tooltipRef = ref<(typeof HTooltip & { updateTooltip: Function }) | null>(null);
    const cursorRef = ref<HTMLElement | null>(null);

    const parentProps = inject(HSliderPropsInjectedKey)!;
    const getTrackSize = inject(HSliderGetTrackSizeInjectedKey)!;

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
    const tooltipVisible = computed(() =>
      parentProps.tooltipEnable ? isDuringDragging.value : false,
    );

    /**
     * methods
     */
    function updateCursorPosition() {
      const cursorWidth = cursorRef.value?.clientWidth || 24;
      const progress = getSliderProgress(
        currentValue.value,
        parentProps.min,
        parentProps.min,
        parentProps.max,
        false,
      );
      cursorToLeft.value = `calc(${progress.width}% - ${cursorWidth / 2}px)`;
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
      const { width: trackWidth, left: trackLeft } = getTrackSize();
      updateCurrentValue(
        getSliderValueFromPosition(
          clientX,
          trackLeft,
          trackWidth,
          parentProps.min,
          parentProps.max,
          parentProps.step,
        ),
        true,
      );
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
        case 'ArrowDown':
          evt.preventDefault();
          onPressArrowLeft();
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          evt.preventDefault();
          onPressArrowRight();
          break;
        case 'Home':
        case 'End': {
          const value = getSliderKeyboardValue(
            currentValue.value,
            evt.code,
            parentProps.min,
            parentProps.max,
            parentProps.step,
          );
          if (value !== undefined) {
            evt.preventDefault();
            updateCurrentValue(value);
          }
          break;
        }
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
      clearKeyDownTimer();
      reduceValue();
      keyDownTimer = setInterval(reduceValue, 200);
    }

    function onPressArrowRight() {
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
      focus: () => focusSliderThumb(cursorRef.value),
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
      clearKeyDownTimer();
      cursorRef.value?.removeEventListener('mouseenter', onMouseEnter);
      cursorRef.value?.removeEventListener('mouseleave', onMouseLeave);
    });

    return () => (
      <HTooltip
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
          role="slider"
          aria-valuemin={parentProps.min}
          aria-valuemax={parentProps.max}
          aria-valuenow={currentValue.value}
          aria-disabled={parentProps.disabled}
          aria-orientation="horizontal"
          tabindex={parentProps.disabled ? -1 : 0}
          style={{ left: cursorToLeft.value }}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeydown={onKeyDown}
          onKeyup={onKeyUp}
        />
      </HTooltip>
    );
  },
});
