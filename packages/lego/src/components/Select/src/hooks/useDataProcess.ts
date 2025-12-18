import type { SelectProps } from '../composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import { watch, type Ref, nextTick, inject } from 'vue';
import type { ModelValueSingleType, ModelValueType } from '../utils/types';
import { NSelectInitialValueUndefined } from '../utils/types';
import { isEmpty, isEqualLoose } from '../utils/utils';
import { NFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default function useDataProcess(
  props: SelectProps,
  context: LegoSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    modelValueSet: Ref<Set<ModelValueSingleType>>;
    presetModelValueSet: Ref<Set<ModelValueSingleType>>;
    resetRenderedTags: () => void;
    reserveNumberOfModelValues: () => boolean;
    getFormattedModelValue: (modelValueSet: Set<ModelValueSingleType>) => ModelValueSingleType[];
    emitChange: (emptyInputValue?: boolean, inputVal?: string) => void;
  },
) {
  let prevEmitModelValue: ModelValueType = props.modelValue;

  const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

  watch(
    options.modelValueSet,
    () => {
      updateModelValue();
    },
    {
      deep: true,
    },
  );

  watch(
    () => props.multiple,
    val => {
      if (!val) {
        if (!options.reserveNumberOfModelValues()) {
          updateModelValue();
        }
      } else {
        updateModelValue();
      }
    },
  );

  function updateModelValue() {
    const transformedValue = options.getFormattedModelValue(options.modelValueSet.value);

    let modelValue: ModelValueType = props.multiple ? transformedValue : transformedValue[0];

    if (isEmpty(modelValue)) {
      if (props.initialValue === NSelectInitialValueUndefined) {
        modelValue = props.multiple ? [] : undefined;
      } else {
        modelValue =
          props.initialValue === Symbol.for('undefined') ? undefined : props.initialValue;
      }
    }

    if (!isEqualLoose(modelValue, prevEmitModelValue)) {
      context.emit('update:modelValue', modelValue);

      void nextTick(() => {
        options.emitChange(true);
        formItemTrigger?.('change');
      });

      prevEmitModelValue = modelValue;
    }
  }

  return {
    updateModelValue,
  };
}
