import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type { InputNumberProps } from '../composables/useProps';
import type { InputNumberEmit, InputNumberStepDirection } from '../types';
import type { InputNumberValueController } from './useInputNumberValue';
import { useLongPress } from './useLongPress';

/** Owns step controls, keyboard mapping and long-press interaction. */
export function useInputNumberStepper(
  props: Readonly<InputNumberProps>,
  emit: InputNumberEmit,
  isDisabled: ComputedRef<boolean>,
  value: InputNumberValueController,
) {
  const enableReduce = computed(() => value.canStep('down'));
  const enableIncrease = computed(() => value.canStep('up'));
  const longPress = useLongPress({ interval: () => props.langPressFrequency });

  function isStepBlocked(direction: InputNumberStepDirection) {
    const enabled = direction === 'up' ? enableIncrease.value : enableReduce.value;
    return isDisabled.value || props.readonly || !enabled;
  }

  function applyStep(direction: InputNumberStepDirection) {
    if (isStepBlocked(direction)) return;
    value.step(direction);
  }

  function increaseValue() {
    applyStep('up');
  }

  function decreaseValue() {
    applyStep('down');
  }

  function handleClickStep(event: Event) {
    const direction = (event.currentTarget as HTMLElement)?.dataset.triggerType;
    applyStep(direction === 'up' ? 'up' : 'down');
  }

  function handleLongPress(event: MouseEvent, direction: InputNumberStepDirection) {
    if (!props.enableLangPress || isStepBlocked(direction)) return;
    longPress.start(event, () => applyStep(direction));
  }

  function handleKeydown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown'].includes(event.code)) event.preventDefault();

    if (props.controlsPosition === 'between') {
      if (event.code === 'ArrowRight') increaseValue();
      else if (event.code === 'ArrowLeft') decreaseValue();
    } else if (event.code === 'ArrowUp') increaseValue();
    else if (event.code === 'ArrowDown') decreaseValue();

    emit('keydown', event);
  }

  return {
    decreaseValue,
    enableIncrease,
    enableReduce,
    handleClickStep,
    handleKeydown,
    handleLongPress,
    increaseValue,
  };
}
