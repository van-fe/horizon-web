import type { InputNumberProps } from '../composables/useProps';
import type { InputNumberEmit } from '../types';
import { useFormControl } from '~/components/Form/src/hooks/useFormControl';
import { useInputNumberField } from './useInputNumberField';
import { useInputNumberInput } from './useInputNumberInput';
import { useInputNumberStepper } from './useInputNumberStepper';
import { useInputNumberValue } from './useInputNumberValue';

/** Composes the focused InputNumber controllers exposed to the view. */
export function useInputNumber(props: Readonly<InputNumberProps>, emit: InputNumberEmit) {
  const { formError, isDisabled, notifyFormItem } = useFormControl(() => props.disabled);
  const field = useInputNumberField();
  const value = useInputNumberValue(props, emit, {
    isFocused: field.isFocused,
    notifyChange: () => void notifyFormItem('change'),
    syncInvalidInput: field.syncInvalidInput,
    userInput: field.userInput,
  });
  const input = useInputNumberInput(
    props,
    emit,
    field,
    value,
    () => void notifyFormItem('blur'),
  );
  const stepper = useInputNumberStepper(props, emit, isDisabled, value);

  return {
    blur: field.blur,
    decreaseValue: stepper.decreaseValue,
    enableIncrease: stepper.enableIncrease,
    enableReduce: stepper.enableReduce,
    focus: field.focus,
    formError,
    formattedValue: value.formattedValue,
    handleBlur: input.handleBlur,
    handleClear: input.handleClear,
    handleClickStep: stepper.handleClickStep,
    handleFocus: input.handleFocus,
    handleInput: input.handleInput,
    handleKeydown: stepper.handleKeydown,
    handleLongPress: stepper.handleLongPress,
    handleWheel: input.handleWheel,
    increaseValue: stepper.increaseValue,
    inputDomRef: field.inputDomRef,
    isDisabled,
    isFocused: field.isFocused,
    localValue: value.localValue,
  };
}

export type InputNumberController = ReturnType<typeof useInputNumber>;
