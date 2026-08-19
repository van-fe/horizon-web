import type { Ref } from 'vue';
import { watch, nextTick, provide, computed } from 'vue';
import type { OptionProps, SelectProps } from '../composables/useProps';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import { ComponentClassBlock, isDefined, type HorizonWebSetupContext } from '@aurora/utils';
import { type ModelValueSingleType, type SelectDomRefs } from '../utils/types';
import { HSelectPopperVisibleInjectKey, type SelectCollectedOptionData } from '../utils/injectKeys';
import useLocaleLang from '~/utils/useLocaleLang';
import {
  isValueFormatWrapped,
  unwrapValueFormattedValue,
  wrapValueFormattedValue,
} from '../utils/valueFormat';

export default function usePanel(
  props: SelectProps,
  context: HorizonWebSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    domRefs: SelectDomRefs;
    popperVisible: Ref<boolean>;
    modelValueSet: Ref<Set<ModelValueSingleType>>;
    presetModelValueSet: Ref<Set<ModelValueSingleType>>;
    inputValue: Ref<string>;
    filterInputValue: Ref<string>;
    isInputable: Ref<boolean>;
    focusedOptionValue: Ref<OptionProps['value'] | undefined>;
    visibleOptions: Ref<SelectCollectedOptionData<'option'>[]>;
    focusOnFirstModelValue: () => void;
    judgeWhetherInputCanFocus: () => void;
    getOptionDataByValue: (
      value: OptionProps['value'] | undefined,
    ) => SelectCollectedOptionData<'option'> | undefined | null;
  },
) {
  const prevScrollTop = 0;
  let prevSelectedValue: ModelValueSingleType | null = null;
  let prevSelectedLabel: string = '';

  const shouldPickerCanBeFocused = computed(
    () => props.multiple && options.modelValueSet.value.size > 0 && props.panelFilterOption,
  );

  const panelStatus = computed(() => {
    if (options.visibleOptions.value.length === 0 && !props.allowCreate) {
      return 'empty';
    }

    return 'normal';
  });

  const inputDisplayValue = computed<string | undefined>(() => {
    if (props.multiple) {
      if (props.useStatistic && options.modelValueSet.value.size > 0) {
        return props.statisticText
          ? `${props.statisticText} (${options.modelValueSet.value.size})`
          : options.modelValueSet.value.size === 1
            ? `${useLocaleLang('select.statistic').value} (${options.modelValueSet.value.size})`
            : `${useLocaleLang('select.statistics').value} (${options.modelValueSet.value.size})`;
      } else {
        if (
          options.isInputable.value &&
          options.inputValue.value &&
          options.modelValueSet.value.size === 0
        ) {
          return options.inputValue.value;
        } else {
          return options.modelValueSet.value.size > 0
            ? [...options.modelValueSet.value.values()]
                .map(val => options.getOptionDataByValue(val)?.props.label)
                .filter(isDefined)
                .join('、')
            : '';
        }
      }
    } else {
      if (
        options.isInputable.value &&
        options.inputValue.value &&
        options.modelValueSet.value.size === 0
      ) {
        return options.inputValue.value;
      } else {
        const value = options.modelValueSet.value.values().next().value as OptionProps['value'];
        const unwrapValue = unwrapValueFormattedValue(value)!;
        const option = options.getOptionDataByValue(value);

        if (!option) {
          if (unwrapValue === prevSelectedValue) {
            return prevSelectedLabel;
          } else if (props.showValueUnMatch) {
            // Empty string is considered valuable. Because the option.value may be empty string
            if (unwrapValue === '') {
              return ' ';
            } else return unwrapValue?.toString();
          }
        }

        prevSelectedValue = unwrapValue;
        prevSelectedLabel = option?.props.label?.toString() ?? '';

        return prevSelectedLabel;
      }
    }
  });

  watch(options.popperVisible, val => {
    context.emit('dropdownVisibleChange', val);

    if (val && props.destroyOnHide) {
      nextTick(() => {
        options.domRefs.scrollbarDomRef.value?.setScrollTop(prevScrollTop);
      });
    }

    if (val) {
      options.presetModelValueSet.value = new Set(options.modelValueSet.value.values());
      options.judgeWhetherInputCanFocus();

      void nextTick(() => {
        options.focusOnFirstModelValue();
      });

      if (isDefined(props.options)) {
        setTimeout(() => {
          options.domRefs.virtualScrollListDomRef.value?.scrollToActiveModelValue();
        });
      } else {
        const firstModelValue = options.modelValueSet.value.values().next()
          .value as OptionProps['value'];

        setTimeout(() => {
          const optionData = options.getOptionDataByValue(firstModelValue);
          if (optionData) {
            const optionClassBlock = new ComponentClassBlock('select-option');
            (options.domRefs.scrollbarDomRef.value?.viewRef as HTMLElement)
              ?.querySelector(
                `.${optionClassBlock.block}[data-value="${optionData.props.value.toString()}"]`,
              )
              ?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
          }
        }, 400);
      }
    } else {
      options.inputValue.value = '';
      options.filterInputValue.value = '';
      options.focusedOptionValue.value = undefined;
    }

    if (options.isInputable.value && props.multiple) {
      void nextTick(() => {
        options.domRefs.tagGroupDomRef.value?.doCollapseCalculate();
      });
    }
  });

  function getFormattedModelValue(modelValueSet: Set<ModelValueSingleType>) {
    let values = Array.from(modelValueSet.values());

    if (props.valueFormat) {
      values = values.map(curr => {
        if (isValueFormatWrapped(curr)) {
          return curr;
        }

        const tempData = options.getOptionDataByValue(curr);

        if (!tempData) return curr;

        const formattedValue = props.valueFormat!({ ...tempData?.props, ...tempData?.attrs });

        return wrapValueFormattedValue(formattedValue, tempData.props.value);
      });
    }

    return values;
  }

  provide(HSelectPopperVisibleInjectKey, options.popperVisible);

  return {
    inputDisplayValue,
    prevScrollTop,
    panelStatus,
    shouldPickerCanBeFocused,
    getFormattedModelValue,
  };
}
