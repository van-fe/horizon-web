import type { SelectProps } from '../composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import { watch, type Ref, nextTick, inject } from 'vue';
import type { ModelValueSingleType, ModelValueType } from '../utils/types';
import { HSelectInitialValueUndefined } from '../utils/types';
import { isEmpty, isEqualLoose } from '../utils/utils';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default function useDataProcess(
  props: SelectProps,
  context: HorizonWebSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    modelValueSet: Ref<Set<ModelValueSingleType>>;
    presetModelValueSet: Ref<Set<ModelValueSingleType>>;
    resetRenderedTags: () => void;
    reserveNumberOfModelValues: () => boolean;
    getFormattedModelValue: (modelValueSet: Set<ModelValueSingleType>) => ModelValueSingleType[];
    consumeModelValueSetFromProps: (value: Set<ModelValueSingleType>) => boolean;
    emitChange: (emptyInputValue?: boolean, inputVal?: string, modelValue?: ModelValueType) => void;
  },
) {
  const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

  watch(
    options.modelValueSet,
    value => {
      if (options.consumeModelValueSetFromProps(value)) return;

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
      if (props.initialValue === HSelectInitialValueUndefined) {
        modelValue = props.multiple ? [] : undefined;
      } else {
        modelValue =
          props.initialValue === Symbol.for('undefined') ? undefined : props.initialValue;
      }
    }

    if (!isEqualLoose(modelValue, props.modelValue)) {
      context.emit('update:modelValue', modelValue);

      void nextTick(() => {
        options.emitChange(true, '', modelValue);
        formItemTrigger?.('change');
      });
    }
  }

  return {
    updateModelValue,
  };
}
