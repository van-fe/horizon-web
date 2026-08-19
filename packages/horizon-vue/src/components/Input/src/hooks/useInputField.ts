import { computed, nextTick, ref, watch } from 'vue';
import type { ComputedRef } from 'vue';
import { blurInputElement, focusInputElement, selectInputElement } from '@aurora/horizon-core';

/** Owns the native input/textarea references and focus state. */
export function useInputField(isDisabled: ComputedRef<boolean>) {
  const focused = ref(false);
  const inputRef = ref<HTMLInputElement | null>(null);
  const textareaRef = ref<HTMLTextAreaElement | null>(null);
  const inputOrTextarea = computed(() => inputRef.value || textareaRef.value);

  function focus() {
    nextTick(() => focusInputElement(inputOrTextarea.value));
  }

  function blur() {
    blurInputElement(inputOrTextarea.value);
  }

  function select() {
    selectInputElement(inputOrTextarea.value);
  }

  watch(isDisabled, disabled => {
    if (disabled) focused.value = false;
  });

  return {
    blur,
    focus,
    focused,
    inputRef,
    select,
    textareaRef,
  };
}

export type InputFieldController = ReturnType<typeof useInputField>;
