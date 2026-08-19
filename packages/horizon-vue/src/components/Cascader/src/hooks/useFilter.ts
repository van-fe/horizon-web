import { computed, provide, ref, watch } from 'vue';
import type { CascaderFilterFunction } from '@aurora/core';
import { defaultCascaderFilter, filterCascaderOptions } from '@aurora/core';
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
import { toCoreCascaderOption, toCoreCascaderOptions } from '../utils/coreAdapter';

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
  const inputable = computed(() => useFilter.value || props.inputAble);
  const isReadonly = computed(() => !(inputable.value && popperVisible.value));
  const inputValueMerged = computed(() => inputValue.value || props.panelFilterInputValue);

  const filterMethod = computed(() => {
    const defaultFilterMethod: HCascaderFilterFunction = (input, paths) =>
      defaultCascaderFilter(
        input,
        paths.map(path => ({ ...path, option: toCoreCascaderOption(path.option) })),
      );

    if (props.filter) {
      return typeof props.filter === 'boolean' ? defaultFilterMethod : props.filter.filter;
    }

    if (props.filterable) {
      return props.filterMethod ?? defaultFilterMethod;
    }

    if (props.panelFilterOption) {
      return defaultFilterMethod;
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
    const sourceInput = props.panelFilterOption
      ? props.useBuildInPanelFilter
        ? inputValue.value
        : props.panelFilterInputValue
      : useFilter.value
        ? inputValue.value
        : '';
    const { options: coreOptions, cache } = toCoreCascaderOptions(options.optionList.value);
    const reverse = new Map(
      Array.from(cache, ([vueOption, coreOption]) => [coreOption, vueOption]),
    );
    return filterCascaderOptions(coreOptions, {
      input: sourceInput,
      checkStrictly: props.checkStrictly,
      filter: ((input, paths) =>
        filterMethod.value(
          input,
          paths.map(path => ({
            label: path.label,
            value: path.value,
            option: reverse.get(path.option as never)!,
          })),
        )) as CascaderFilterFunction,
      sort: sortResultMethod.value
        ? (left, right, input) =>
            sortResultMethod.value!(
              reverse.get(left as never)!,
              reverse.get(right as never)!,
              input,
            )
        : undefined,
      limit: filterResultLimit.value,
    })
      .map(option => reverse.get(option))
      .filter((option): option is HCascaderExtendOption => !!option);
  });

  const panelStatus = computed(() =>
    (visibleOptions.value.length === 0 && !!inputValueMerged.value) ||
    (props.options?.length ?? 0) === 0
      ? 'empty'
      : 'normal',
  );

  watch(inputValue, value => {
    context.emit('input', value);
    if (useFilter.value) context.emit('search', value);
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
