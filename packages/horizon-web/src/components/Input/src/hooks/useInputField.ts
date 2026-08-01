import { computed, nextTick, ref, watch } from 'vue';
import type { ComputedRef } from 'vue';

/** Owns the native input/textarea references and focus state. */
export function useInputField(isDisabled: ComputedRef<boolean>) {
  const focused = ref(false);
  const inputRef = ref<HTMLInputElement | null>(null);
  const textareaRef = ref<HTMLTextAreaElement | null>(null);
  const inputOrTextarea = computed(() => inputRef.value || textareaRef.value);

  function focus() {
    nextTick(() => inputOrTextarea.value?.focus());
  }

  function blur() {
    inputOrTextarea.value?.blur();
  }

  function select() {
    inputOrTextarea.value?.select();
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
