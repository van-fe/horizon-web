import type { Ref, VNode } from 'vue';
import { provide, ref, watch, reactive } from 'vue';
import type { OptionProps, SelectProps } from '../composables/useProps';
import { isNil, type HorizonWebSetupContext } from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import { isEqualLoose } from '../utils/utils';
import type { SelectCollectedOptionData } from '../utils/injectKeys';
import { HSelectModelValueInjectKey, HSelectPresetModelValueInjectKey } from '../utils/injectKeys';
import { unwrapValueFormattedValue } from '../utils/valueFormat';
import type { ModelValueType, ModelValueSingleType } from '../utils/types';
import type { JSX } from 'vue/jsx-runtime';
import { HSelectValueFormatSymbol } from '../utils/types';

export default function useData(
  props: SelectProps,
  context: HorizonWebSetupContext<SelectEmits, SelectSlots, SelectExposes>,
) {
  const modelValueSet = ref(new Set<ModelValueSingleType>());
  const presetModelValueSet = ref(new Set<ModelValueSingleType>());
  const inputValue = ref('');
  const filterInputValue = ref('');
  const popperVisible = ref(false);
  const prevOptionValue: ModelValueType = undefined;
  const optionsMap = reactive(new Map<OptionProps['value'], SelectCollectedOptionData<'option'>>());
  const focusedOptionValue = ref<OptionProps['value']>();
  const renderedModelValueTags: Ref<Array<VNode | JSX.Element>> = ref([]);
  const changeIsAddValue = ref(false);

  watch(
    () => props.modelValue,
    val => {
      if (isNil(val)) {
        modelValueSet.value.clear();
      } else {
        if (props.multiple) {
          if (Array.isArray(val)) {
            modelValueSet.value = new Set(val);
          } else {
            modelValueSet.value = new Set([val]);
          }
        } else {
          modelValueSet.value = new Set([val]);
        }
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watch(
    () => props.multipleLimit,
    val => {
      reserveNumberOfModelValues(val);
    },
    {
      immediate: true,
    },
  );

  watch(
    modelValueSet,
    val => {
      presetModelValueSet.value = new Set(val);
    },
    {
      deep: true,
      immediate: true,
    },
  );

  function reserveNumberOfModelValues(reserveAmount = 1) {
    if (reserveAmount === Infinity || reserveAmount >= modelValueSet.value.size) {
      return false;
    }

    if (reserveAmount <= 0) {
      modelValueSet.value.clear();
      return false;
    }

    let count = 0;

    for (const item of modelValueSet.value.values()) {
      if (count < reserveAmount) {
        count++;
        continue;
      }
      modelValueSet.value.delete(item);
      count++;
    }

    return true;
  }

  function isModelValueSetHasValue(
    setData: Set<ModelValueSingleType>,
    value: ModelValueSingleType,
  ) {
    if (setData.has(value)) {
      return true;
    } else {
      return Array.from(setData.values()).some(
        curr => unwrapValueFormattedValue(curr) === unwrapValueFormattedValue(value),
      );
    }
  }

  function modelValueSetDeleteValue(
    setData: Set<ModelValueSingleType>,
    value: ModelValueSingleType,
  ) {
    if (setData.has(value)) {
      return setData.delete(value);
    } else {
      for (const setDataItem of Array.from(setData.values())) {
        if (
          isEqualLoose(unwrapValueFormattedValue(setDataItem), unwrapValueFormattedValue(value))
        ) {
          return setData.delete(setDataItem);
        }
      }
    }
  }

  /**
   * emit change event
   * @param emptyInputValue boolean
   * @param inputVal inputValue.value
   */
  function emitChange(emptyInputValue = false, inputVal = '') {
    if (props.compatibility) {
      if (changeIsAddValue.value) {
        context.emit('change', emptyInputValue ? null : (inputVal ?? null), prevOptionValue);
      }
    } else {
      context.emit('change', emptyInputValue ? null : inputVal, props.modelValue);
    }
  }

  provide(HSelectModelValueInjectKey, modelValueSet);
  provide(HSelectPresetModelValueInjectKey, presetModelValueSet);

  return {
    modelValueSet,
    presetModelValueSet,
    inputValue,
    filterInputValue,
    popperVisible,
    prevOptionValue,
    optionsMap,
    focusedOptionValue,
    renderedModelValueTags,
    changeIsAddValue,
    emitChange,
    isModelValueSetHasValue,
    modelValueSetDeleteValue,
    reserveNumberOfModelValues,
    HSelectValueFormatSymbol,
  };
}
