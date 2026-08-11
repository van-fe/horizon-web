import { ref } from 'vue';
import { safelyGetEventTarget } from '@aurora/utils';
import type { InputEmit } from '../types';
import type { InputFieldController } from './useInputField';
import type { InputValueController } from './useInputValue';

interface InputEventNotifications {
  blur: () => void;
  change: () => void;
}

/** Owns native input, keyboard and IME event behavior. */
export function useInputEvents(
  emit: InputEmit,
  field: InputFieldController,
  value: InputValueController,
  notify: InputEventNotifications,
) {
  const isComposing = ref(false);

  function handleInput(event: Event) {
    if (isComposing.value) return;
    const target = safelyGetEventTarget(event) as HTMLInputElement;
    value.setLocalValue(target.value);
    emit('update:modelValue', target.value);
    emit('input', target.value, event);
    notify.change();
  }

  function handleFocus(event: FocusEvent) {
    field.focused.value = true;
    value.beginChangeSession();
    emit('focus', event);
  }

  function handleBlur(event: FocusEvent) {
    field.focused.value = false;
    value.emitChange();
    emit('blur', event);
    notify.blur();
  }

  function handleClear(event: MouseEvent) {
    value.setLocalValue('');
    emit('update:modelValue', '');
    emit('input', '', event);
    value.emitChange();
    emit('clear');
    field.focus();
    notify.change();
  }

  function handleKeyDown(event: KeyboardEvent) {
    emit('keydown', event);
  }

  function handleKeyPress(event: KeyboardEvent) {
    emit('keypress', event);
  }

  function handleKeyUp(event: KeyboardEvent) {
    emit('keyup', event);
  }

  function handleCompositionStart(event: CompositionEvent) {
    emit('compositionstart', event);
    isComposing.value = true;
  }

  function handleCompositionUpdate(event: CompositionEvent) {
    emit('compositionupdate', event);
  }

  function handleCompositionEnd(event: CompositionEvent) {
    emit('compositionend', event);
    if (!isComposing.value) return;
    isComposing.value = false;
    handleInput(event);
  }

  return {
    handleBlur,
    handleClear,
    handleCompositionEnd,
    handleCompositionStart,
    handleCompositionUpdate,
    handleFocus,
    handleInput,
    handleKeyDown,
    handleKeyPress,
    handleKeyUp,
  };
}
