import { ref } from 'vue';
import type { InputNumberUserInput, InputNumberValue } from '../types';
import useCursor from '../utils/useCursor';

/** Owns native input references, focus state and cursor restoration. */
export function useInputNumberField() {
  const inputDomRef = ref<HTMLInputElement | null>(null);
  const isFocused = ref(false);
  const userInput = ref<InputNumberUserInput>(null);
  const { recordCursor, restoreCursor } = useCursor(inputDomRef, isFocused);

  function focus() {
    inputDomRef.value?.focus();
  }

  function blur() {
    inputDomRef.value?.blur();
  }

  function syncInvalidInput(value: InputNumberValue) {
    if (inputDomRef.value && Number.isNaN(Number(inputDomRef.value.value))) {
      inputDomRef.value.value = value as unknown as string;
    }
  }

  return {
    blur,
    focus,
    inputDomRef,
    isFocused,
    recordCursor,
    restoreCursor,
    syncInvalidInput,
    userInput,
  };
}

export type InputNumberFieldController = ReturnType<typeof useInputNumberField>;
