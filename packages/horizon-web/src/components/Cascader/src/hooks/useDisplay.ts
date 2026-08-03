import { computed } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderSlots } from '../composables/useSlots';
import type { HCascaderExtendOption, HCascaderUuidType } from '../utils/types';
import useLocaleLang from '~/utils/useLocaleLang';

export default function useDisplay(
  props: CascaderProps,
  slots: HorizonWebSetupContext<{}, CascaderSlots>['slots'],
  options: {
    modelValueSet: Readonly<{ value: Set<HCascaderUuidType> }>;
    optionListMap: Readonly<{
      value: Map<HCascaderUuidType, HCascaderExtendOption>;
    }>;
    inputValue: Readonly<{ value: string }>;
    inputable: Readonly<{ value: boolean }>;
    useFilter: Readonly<{ value: boolean }>;
    renderedModelValueTags: Readonly<{ value: unknown[] }>;
    getShowLabel: (uuid: HCascaderUuidType) => string | number;
  },
) {
  let prevSelectedValue: HCascaderUuidType | null = null;
  let prevSelectedLabel = '';

  const showValue = computed(() => {
    if (props.multiple) {
      if (props.useStatistic && options.modelValueSet.value.size > 0) {
        return props.statisticText
          ? `${props.statisticText} (${options.modelValueSet.value.size})`
          : options.modelValueSet.value.size <= 1
            ? (useLocaleLang('cascader.statistic').value as string)
            : `${useLocaleLang('cascader.statistics').value} (${options.modelValueSet.value.size})`;
      }

      if (
        options.inputable.value &&
        options.inputValue.value &&
        options.modelValueSet.value.size === 0
      ) {
        return options.inputValue.value;
      }

      return options.modelValueSet.value.size > 0 ? ' ' : '';
    }

    if (
      options.inputable.value &&
      options.inputValue.value &&
      options.modelValueSet.value.size === 0
    ) {
      return options.inputValue.value;
    }

    const value = options.modelValueSet.value.values().next().value as
      | HCascaderUuidType
      | undefined;

    if (value === undefined) return '';

    const option = options.optionListMap.value.get(value);
    if (!option) {
      return value === prevSelectedValue ? prevSelectedLabel : options.getShowLabel(value);
    }

    prevSelectedValue = value;
    prevSelectedLabel = options.getShowLabel(value).toString();
    return prevSelectedLabel;
  });

  const isHideInput = computed(() => {
    if (props.multiple) {
      if (props.useStatistic && options.modelValueSet.value.size > 0) {
        return false;
      }

      if (!options.useFilter.value) {
        return options.renderedModelValueTags.value.length > 0;
      }

      return options.modelValueSet.value.size > 0;
    }

    return !!slots.tagRender && options.modelValueSet.value.size > 0;
  });

  return {
    showValue,
    isHideInput,
  };
}
