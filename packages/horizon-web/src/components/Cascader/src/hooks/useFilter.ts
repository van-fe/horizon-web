import { computed, provide, ref, watch } from 'vue';
import { isObject, type HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderEmits } from '../composables/useEmits';
import type { CascaderSlots } from '../composables/useSlots';
import type { CascaderExposes } from '../composables/useExposes';
import type { HCascaderExtendOption, HCascaderFilterFunction } from '../utils/types';
import {
  HCascaderInputStringInjectKey,
  HCascaderPopperVisibleInjectKey,
  HCascaderVisibleOptionsInjectKey,
} from '../utils/injectKeys';

export default function useFilter(
  props: CascaderProps,
  context: HorizonWebSetupContext<CascaderEmits, CascaderSlots, CascaderExposes>,
  options: {
    optionList: Readonly<{ value: HCascaderExtendOption[] }>;
  },
) {
  const inputValue = ref('');
  const popperVisible = ref(false);

  const useFilter = computed(() => !!props.filter || props.filterable);
  const inputable = computed(() => useFilter.value);
  const isReadonly = computed(() => !(inputable.value && popperVisible.value));
  const inputValueMerged = computed(() => inputValue.value || props.panelFilterInputValue);

  const filterMethod = computed(() => {
    const defaultFilterMethod: HCascaderFilterFunction = (input, paths) =>
      paths.at(-1)?.label.toLowerCase().includes(input.toLowerCase()) || false;

    if (props.filter) {
      return typeof props.filter === 'boolean' ? defaultFilterMethod : props.filter.filter;
    }

    if (props.filterable) {
      return props.filterMethod ?? defaultFilterMethod;
    }

    if (props.panelFilterOption) {
      return typeof props.panelFilterOption === 'boolean'
        ? defaultFilterMethod
        : props.panelFilterOption;
    }

    return defaultFilterMethod;
  });

  const filterResultLimit = computed(
    () => (isObject(props.filter) && props.filter.limit) || props.filterMaxResult,
  );
  const sortResultMethod = computed(
    () => (isObject(props.filter) && props.filter.sort) || props.filterResultSort,
  );

  const visibleOptions = computed(() => {
    let result = options.optionList.value;

    if (!props.checkStrictly) {
      result = result.filter(item => item.isLeaf);
    }

    if (useFilter.value && inputValue.value) {
      result = result.filter(option =>
        filterMethod.value(
          inputValue.value.trim(),
          option.paths.map(pathOption => ({
            label: pathOption.fullPathLabel,
            value: pathOption.value,
            option: pathOption,
          })),
        ),
      );
    }

    if (props.panelFilterOption) {
      result = result.filter(option =>
        filterMethod.value(
          props.useBuildInPanelFilter ? inputValue.value : props.panelFilterInputValue.trim(),
          option.paths.map(pathOption => ({
            label: pathOption.fullPathLabel,
            value: pathOption.value,
            option: pathOption,
          })),
        ),
      );
    }

    if (sortResultMethod.value) {
      result.sort((a, b) => sortResultMethod.value!(a, b, inputValueMerged.value));
    }

    return result.slice(0, filterResultLimit.value);
  });

  const panelStatus = computed(() =>
    (visibleOptions.value.length === 0 && !!inputValueMerged.value) || props.options.length === 0
      ? 'empty'
      : 'normal',
  );

  watch(inputValue, value => {
    context.emit('input', value);
  });
  watch(popperVisible, value => {
    context.emit('dropdownVisibleChange', value);
  });

  provide(HCascaderInputStringInjectKey, inputValueMerged);
  provide(HCascaderPopperVisibleInjectKey, popperVisible);
  provide(HCascaderVisibleOptionsInjectKey, visibleOptions);

  return {
    inputValue,
    popperVisible,
    useFilter,
    inputable,
    isReadonly,
    inputValueMerged,
    filterMethod,
    visibleOptions,
    panelStatus,
  };
}
