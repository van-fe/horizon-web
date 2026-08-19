import { watch } from 'vue';
import { safelyGetEventTarget } from '@aurora/utils';
import type { InputNumberProps } from '../composables/useProps';
import type { InputNumberEmit } from '../types';
import { formatInputForNumber, sanitizeInput } from '../utils/inputHelper';
import { sanitizeBlurValue, toInputNumberDecimal } from '../utils/value';
import type { InputNumberFieldController } from './useInputNumberField';
import type { InputNumberValueController } from './useInputNumberValue';

/** Owns native input parsing and focus/wheel/clear events. */
export function useInputNumberInput(
  props: Readonly<InputNumberProps>,
  emit: InputNumberEmit,
  field: InputNumberFieldController,
  value: InputNumberValueController,
  notifyBlur: () => void,
) {
  function parseValue(rawValue: string) {
    const parsedValue = props.parser ? props.parser(rawValue) : rawValue;
    return {
      decimal: toInputNumberDecimal(parsedValue),
      parsedValue,
    };
  }

  function handleInput(event: Event) {
    field.recordCursor();
    const target = safelyGetEventTarget(event) as HTMLInputElement;
    const rawValue = sanitizeInput(target.value);
    const parsedValue = props.parser ? props.parser(rawValue) : rawValue;
    field.userInput.value = parsedValue;

    const normalizedValue = formatInputForNumber(parsedValue);
    const decimal = toInputNumberDecimal(normalizedValue);
    emit('input', value.toEmittedValue(decimal));
    value.setCurrentValue(decimal);
  }

  function handleFocus(event: FocusEvent) {
    field.isFocused.value = true;
    emit('focus', event);
  }

  function handleBlur(event: FocusEvent) {
    field.isFocused.value = false;

    if (field.inputDomRef.value) {
      const rawValue = sanitizeBlurValue(field.inputDomRef.value.value);
      const { decimal } = parseValue(rawValue);
      value.emitChange(value.setCurrentValue(decimal));
      value.syncLocalValueFromModel();
    }

    field.userInput.value = null;
    emit('blur', event);
    notifyBlur();
  }

  function handleWheel(event: WheelEvent) {
    if (field.isFocused.value) {
      event.stopPropagation();
      if (!props.wheelToChange) event.preventDefault();
    }
    emit('wheel', event);
  }

  function handleClear() {
    value.setCurrentValue(null);
    emit('clear');
    value.emitChange(null);
    field.focus();
  }

  watch(value.formattedValue, formattedValue => {
    if (props.formatter) field.restoreCursor(formattedValue.toString());
  });

  return {
    handleBlur,
    handleClear,
    handleFocus,
    handleInput,
    handleWheel,
  };
}
