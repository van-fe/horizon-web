import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { Decimal } from 'decimal.js';
import { isDefined, isNil } from '@aurora/utils';
import type { InputNumberProps } from '../composables/useProps';
import type {
  InputNumberEmit,
  InputNumberStepDirection,
  InputNumberUserInput,
  InputNumberValue,
} from '../types';
import ValueHandler from '../utils/setValue';
import { toInputNumberEmitValue } from '../utils/value';

interface InputNumberValueDependencies {
  isFocused: Ref<boolean>;
  notifyChange: () => void;
  syncInvalidInput: (value: InputNumberValue) => void;
  userInput: Ref<InputNumberUserInput>;
}

/** Owns numeric verification, formatting and model synchronization. */
export function useInputNumberValue(
  props: Readonly<InputNumberProps>,
  emit: InputNumberEmit,
  dependencies: InputNumberValueDependencies,
) {
  const { isFocused, notifyChange, syncInvalidInput, userInput } = dependencies;
  const valueHandler = new ValueHandler(props);
  const localValue = ref<InputNumberValue>(null);
  const beforeChangeValue = ref<InputNumberValue>(null);

  const displayValue = computed(() => {
    if (userInput.value !== null) return userInput.value;

    const currentValue = localValue.value;
    if (isNil(currentValue) || currentValue === '' || new Decimal(currentValue).isNaN()) return '';

    if (isDefined(props.precision)) {
      const result = new Decimal(currentValue).toFixed(props.precision);
      return props.stringMode ? result : Number(result);
    }
    return currentValue.toString();
  });

  const formattedValue = computed(() =>
    props.formatter
      ? props.formatter(displayValue.value, {
          userTyping: userInput.value !== null,
          input: userInput.value?.toString(),
        })
      : displayValue.value,
  );

  function toEmittedValue(value: InputNumberValue) {
    return toInputNumberEmitValue(value, props.stringMode);
  }

  function verifyValue(value: InputNumberValue) {
    return valueHandler.verifyValue(value);
  }

  function setCurrentValue(value: InputNumberValue) {
    const oldValue = localValue.value;
    const newValue = verifyValue(value) ?? null;
    if (ValueHandler.maybeNumberIsEqual(oldValue, newValue)) return newValue;

    localValue.value = null;
    emit('update:modelValue', toEmittedValue(newValue));
    localValue.value = newValue;
    syncInvalidInput(localValue.value);
    return newValue;
  }

  function emitChange(value: InputNumberValue) {
    if (ValueHandler.maybeNumberIsEqual(value, beforeChangeValue.value)) return;

    beforeChangeValue.value = value;
    emit('change', toEmittedValue(isNil(value) ? null : new Decimal(value)));
    notifyChange();
  }

  function syncLocalValueFromModel() {
    if (localValue.value !== props.modelValue) {
      beforeChangeValue.value = localValue.value = props.modelValue;
    }
  }

  function canStep(direction: InputNumberStepDirection) {
    if (isNil(props.modelValue) || props.modelValue === '') return true;
    const verifiedValue = verifyValue(props.modelValue) ?? 0;
    return direction === 'up'
      ? valueHandler.maxRef.value.gt(verifiedValue)
      : valueHandler.minRef.value.lt(verifiedValue);
  }

  function step(direction: InputNumberStepDirection) {
    userInput.value = null;
    const currentValue = new Decimal(localValue.value || 0);
    const nextValue = direction === 'up'
      ? currentValue.add(props.step)
      : currentValue.sub(props.step);

    localValue.value = verifyValue(nextValue);
    emit('update:modelValue', toEmittedValue(localValue.value));
    emitChange(toEmittedValue(localValue.value));
    syncLocalValueFromModel();
  }

  watch(
    () => props.modelValue,
    value => {
      const verifiedValue = verifyValue(value);
      if (!ValueHandler.maybeNumberIsEqual(localValue.value, verifiedValue)) {
        beforeChangeValue.value = verifiedValue;
      }
      localValue.value = isNil(value) || value === '' ? value : new Decimal(value);
      if (!isFocused.value) setCurrentValue(value);
    },
    { immediate: true },
  );

  watch(
    () => [props.min, props.max],
    () => valueHandler.updateMinMax(),
    { immediate: true },
  );
  watch(() => props.precision, () => setCurrentValue(localValue.value));

  return {
    canStep,
    emitChange,
    formattedValue,
    localValue,
    setCurrentValue,
    step,
    syncLocalValueFromModel,
    toEmittedValue,
  };
}

export type InputNumberValueController = ReturnType<typeof useInputNumberValue>;
