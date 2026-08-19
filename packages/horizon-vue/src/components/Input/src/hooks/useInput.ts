import type { InputProps } from '../composables/useProps';
import type { InputEmit } from '../types';
import { useFormControl } from '~/components/Form/src/hooks/useFormControl';
import { useInputEvents } from './useInputEvents';
import { useInputField } from './useInputField';
import { useInputLayout } from './useInputLayout';
import { useInputValue } from './useInputValue';

/** Composes focused Input controllers for the render component. */
export function useInput(props: Readonly<InputProps>, emit: InputEmit) {
  const { formError, isDisabled, notifyFormItem } = useFormControl(() => props.disabled);
  const field = useInputField(isDisabled);
  const value = useInputValue(props, emit);
  const events = useInputEvents(emit, field, value, {
    blur: () => void notifyFormItem('blur'),
    change: () => void notifyFormItem('change'),
  });
  const layout = useInputLayout(props, field, value);

  return {
    autoSizeStyle: layout.autoSizeStyle,
    blur: field.blur,
    checkedType: layout.checkedType,
    focus: field.focus,
    focused: field.focused,
    formError,
    handleBlur: events.handleBlur,
    handleClear: events.handleClear,
    handleCompositionEnd: events.handleCompositionEnd,
    handleCompositionStart: events.handleCompositionStart,
    handleCompositionUpdate: events.handleCompositionUpdate,
    handleFocus: events.handleFocus,
    handleInput: events.handleInput,
    handleKeyDown: events.handleKeyDown,
    handleKeyPress: events.handleKeyPress,
    handleKeyUp: events.handleKeyUp,
    handleToggleShowPassword: layout.handleToggleShowPassword,
    iconSize: layout.iconSize,
    inputRef: field.inputRef,
    isDisabled,
    isOutOfExceeded: layout.isOutOfExceeded,
    limitCountStyle: layout.limitCountStyle,
    localValue: value.localValue,
    placeholder: layout.placeholder,
    select: field.select,
    showPassword: layout.showPassword,
    sizeRef: layout.sizeRef,
    textareaRef: field.textareaRef,
  };
}

export type InputController = ReturnType<typeof useInput>;
