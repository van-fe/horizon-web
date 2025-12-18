import type { ComputedRef, Ref, Reactive } from 'vue';
import { computed } from 'vue';
import type { SelectCollectedOptionData } from '../utils/injectKeys';
import type { OptionProps, SelectProps } from '../composables/useProps';
import type { ModelValueSingleType } from '../utils/types';

export default function useCheckAll(
  props: SelectProps,
  options: {
    optionsMap: Reactive<Map<OptionProps['value'], SelectCollectedOptionData<'option'>>>;
    visibleOptions: ComputedRef<Array<SelectCollectedOptionData<'option'>>>;
    presetModelValueSet: Ref<Set<ModelValueSingleType>>;
    needConfirm: ComputedRef<boolean>;
    handleConfirm: (hidePopper: boolean, manual: boolean) => void;
  },
) {
  const canBeCheckedOptions = computed(() =>
    options.visibleOptions.value.filter(curr => !curr.disabled),
  );

  const filteredCheckedCount = computed(
    () => options.visibleOptions.value.filter(curr => curr.active).length,
  );

  const isCheckAll = computed(
    () => filteredCheckedCount.value === options.visibleOptions.value.length,
  );

  const isIndeterminate = computed(() => !isCheckAll.value && filteredCheckedCount.value > 0);

  const checkAllCountShowText = computed(() => {
    if (props.useCheckAllCount) {
      if (props.checkAllCountConsiderFilter) {
        return filteredCheckedCount.value > 0
          ? `${filteredCheckedCount.value}/${options.visibleOptions.value.length}`
          : options.visibleOptions.value.length.toString();
      } else {
        return options.presetModelValueSet.value.size > 0
          ? `${options.presetModelValueSet.value.size}/${options.optionsMap.size}`
          : options.optionsMap.size.toString();
      }
    } else {
      return '';
    }
  });

  const isCheckAllTextActive = computed(() => {
    if (props.checkAllCountConsiderFilter) {
      return filteredCheckedCount.value > 0;
    } else {
      return options.presetModelValueSet.value.size > 0;
    }
  });

  function toggleCheckAll() {
    if (
      canBeCheckedOptions.value.length > 0 &&
      canBeCheckedOptions.value.every(curr => curr.active)
    ) {
      canBeCheckedOptions.value.forEach(option => {
        options.presetModelValueSet.value.delete(option.props.value);
      });
    } else {
      canBeCheckedOptions.value.forEach(option => {
        options.presetModelValueSet.value.add(option.props.value);
      });
    }

    if (!options.needConfirm.value) {
      options.handleConfirm(false, false);
    }
  }

  return {
    isCheckAll,
    isIndeterminate,
    checkAllCountShowText,
    isCheckAllTextActive,
    toggleCheckAll,
  };
}
