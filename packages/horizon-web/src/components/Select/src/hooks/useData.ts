import type { Ref, VNode } from 'vue';
import { provide, reactive, ref, toRaw, watch } from 'vue';
import type { OptionProps, SelectProps } from '../composables/useProps';
import { isNil, type HorizonWebSetupContext } from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import type { SelectCollectedOptionData } from '../utils/injectKeys';
import { HSelectModelValueInjectKey, HSelectPresetModelValueInjectKey } from '../utils/injectKeys';
import type { ModelValueType, ModelValueSingleType } from '../utils/types';
import { HSelectValueFormatSymbol } from '../utils/types';
import type { JSX } from 'vue/jsx-runtime';

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
  const modelValueSetsFromProps = new WeakSet<Set<ModelValueSingleType>>();
  let initialModelValueHasSynced = false;

  watch(
    () => props.modelValue,
    val => {
      let nextModelValueSet: Set<ModelValueSingleType>;

      if (isNil(val)) {
        nextModelValueSet = new Set();
      } else if (props.multiple) {
        nextModelValueSet = new Set(Array.isArray(val) ? val : [val]);
      } else {
        nextModelValueSet = new Set([val]);
      }

      if (initialModelValueHasSynced) {
        modelValueSetsFromProps.add(toRaw(nextModelValueSet));
      }

      modelValueSet.value = nextModelValueSet;
      initialModelValueHasSynced = true;
    },
    {
      immediate: true,
      deep: true,
    },
  );

  function consumeModelValueSetFromProps(value: Set<ModelValueSingleType>) {
    const rawValue = toRaw(value);
    const isFromProps = modelValueSetsFromProps.has(rawValue);

    if (isFromProps) {
      modelValueSetsFromProps.delete(rawValue);
    }

    return isFromProps;
  }

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

  /**
   * emit change event
   * @param emptyInputValue boolean
   * @paramEn emptyInputValue The empty input value value.
   * @param inputVal inputValue.value
   * @paramEn inputVal The input val value.
   * @param modelValue 当前模型值
   * @paramEn modelValue The current model value.
   */
  function emitChange(emptyInputValue = false, inputVal = '', modelValue = props.modelValue) {
    context.emit('change', emptyInputValue ? null : inputVal, modelValue);
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
    reserveNumberOfModelValues,
    consumeModelValueSetFromProps,
    HSelectValueFormatSymbol,
  };
}
