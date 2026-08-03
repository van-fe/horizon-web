import { ref, toRef, watch } from 'vue';
import type { InputProps } from '../composables/useProps';
import type { InputEmit } from '../types';

/** Owns local/model value synchronization and change-session tracking. */
export function useInputValue(props: Readonly<InputProps>, emit: InputEmit) {
  const modelValue = toRef(props, 'modelValue');
  const localValue = ref(modelValue.value);
  let valueAtFocus = localValue.value;

  function setLocalValue(value: string) {
    localValue.value = value;
  }

  function beginChangeSession() {
    valueAtFocus = localValue.value;
  }

  function emitChange() {
    if (valueAtFocus === localValue.value) return;
    valueAtFocus = localValue.value;
    emit('change', localValue.value);
  }

  watch(modelValue, setLocalValue);

  return {
    beginChangeSession,
    emitChange,
    localValue,
    modelValue,
    setLocalValue,
  };
}

export type InputValueController = ReturnType<typeof useInputValue>;
