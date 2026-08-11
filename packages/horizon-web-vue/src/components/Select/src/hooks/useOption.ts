import type { ComputedRef, Ref, Reactive } from 'vue';
import { computed, nextTick, provide, ref, unref, watch, reactive } from 'vue';
import {
  HSelectAddOptionInjectKey,
  HSelectFocusedOptionValueInjectKey,
  HSelectPickOptionInjectKey,
  HSelectRemoveOptionInjectKey,
  HSelectVisibleOptionsInjectKey,
  type SelectCollectedOptionData,
} from '../utils/injectKeys';
import type { OptionProps, SelectProps } from '../composables/useProps';
import {
  ComponentClassBlock,
  isDefined,
  isNil,
  isObject,
  type HorizonWebSetupContext,
} from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import {
  unwrapValueFormattedValue,
  isEqualIgnoreCtx,
  isModelValueMatchingOption,
  isOptionChecked,
  isValueFormatWrapped,
  removeValueFormatMetadata,
} from '../utils/valueFormat';
import type {
  ModelValueType,
  ModelValueSingleType,
  HSelectFilterFunction,
  SelectDomRefs,
} from '../utils/types';
import { transformOptionList } from './useVirtualList';

export default function useOption(
  props: SelectProps,
  context: HorizonWebSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    domRefs: SelectDomRefs;
    optionsMap: Reactive<Map<OptionProps['value'], SelectCollectedOptionData<'option'>>>;
    focusedOptionValue: Ref<OptionProps['value'] | undefined>;
    prevOptionValue: ModelValueType;
    isFilterable: ComputedRef<boolean>;
    filterMethod: ComputedRef<HSelectFilterFunction>;
    filterInputValue: Ref<string>;
    inputValue: Ref<string>;
    modelValueSet: Ref<Set<ModelValueSingleType>>;
    presetModelValueSet: Ref<Set<ModelValueSingleType>>;
    changeIsAddValue: Ref<boolean>;
    isDisabled: ComputedRef<boolean>;
    handleConfirm: (hidePopper: boolean, manual: boolean) => void;
    setPopperVisible: (visible: boolean) => void;
    delInput: (inputValue: string, manual: boolean, hidePopper: boolean) => void;
    judgeWhetherInputCanFocus: () => void;
  },
) {
  const classHelper = new ComponentClassBlock('select');

  const tempCreateOptions = ref<string[]>([]);
  const savedOptions = new Map<ModelValueSingleType, SelectCollectedOptionData<'option'>>();

  const visibleOptions = computed(() => {
    let tempVisibleOptions: Array<SelectCollectedOptionData<'option'>> = Array.from(
      options.optionsMap.values(),
    );

    if ((options.isFilterable.value || props.allowCreate) && options.filterInputValue.value) {
      tempVisibleOptions = tempVisibleOptions.filter(option =>
        options.filterMethod.value(options.filterInputValue.value.trim(), {
          ...option.props,
          ...option.attrs,
        }),
      );
    }

    if (props.panelFilterOption) {
      tempVisibleOptions = tempVisibleOptions.filter(option =>
        options.filterMethod.value(
          props.useBuildInPanelFilter
            ? options.filterInputValue.value
            : props.panelFilterInputValue.trim(),
          {
            ...option.props,
            ...option.attrs,
          },
        ),
      );
    }

    if (!props.selectedVisible) {
      tempVisibleOptions = tempVisibleOptions.filter(
        option =>
          !isOptionChecked(
            options.modelValueSet.value,
            option.props.value,
            props.valueFormat ? () => getFormattedOptionValue(option) : undefined,
          ),
      );
    }

    return tempVisibleOptions;
  });

  watch(
    () => props.options,
    list => {
      if (isDefined(list)) {
        options.optionsMap.clear();
        transformOptionList(props, {
          presetModelValueSet: options.presetModelValueSet,
          isDisabled: options.isDisabled,
        }).value.forEach(item =>
          options.optionsMap.set(item.props.value!, item as SelectCollectedOptionData<'option'>),
        );
      }
    },
    {
      immediate: true,
    },
  );

  function getFormattedOptionValue(option: SelectCollectedOptionData<'option'>) {
    return props.valueFormat!({ ...option.props, ...option.attrs });
  }

  function getOptionDataByValue(value: ModelValueSingleType | undefined) {
    const unwrappedValue = unwrapValueFormattedValue(value);

    if (isNil(unwrappedValue)) return unwrappedValue;

    const optionList = Array.from(options.optionsMap.values());
    const directlyMatchedOption =
      options.optionsMap.get(unwrappedValue) ??
      optionList.find(option => isEqualIgnoreCtx(option.props.value, unwrappedValue));

    if (directlyMatchedOption) return directlyMatchedOption;

    if (props.valueFormat && typeof value !== 'undefined') {
      const publicModelValue = removeValueFormatMetadata(value);
      const formattedMatchedOption = optionList.find(option =>
        isEqualIgnoreCtx(publicModelValue, getFormattedOptionValue(option)),
      );

      if (formattedMatchedOption) return formattedMatchedOption;
    }

    return isObject(unwrappedValue) && 'value' in unwrappedValue
      ? optionList.find(option => isEqualIgnoreCtx(option.props.value, unwrappedValue.value))
      : undefined;
  }

  function findModelValueIndex(setData: Set<ModelValueSingleType>, value: ModelValueSingleType) {
    const setValues = Array.from(setData.values());

    if (setValues.length === 0) return -1;

    const optionData = getOptionDataByValue(value);
    const canonicalValue = (optionData?.props.value ??
      unwrapValueFormattedValue(value)) as OptionProps['value'];
    const directlyMatchedIndex = setValues.findIndex(curr =>
      isEqualIgnoreCtx(unwrapValueFormattedValue(curr), canonicalValue),
    );

    if (directlyMatchedIndex >= 0) return directlyMatchedIndex;

    const shouldCompareFormattedValue = setValues.some(
      curr => isObject(curr) && !isValueFormatWrapped(curr),
    );
    const formattedOptionValue =
      shouldCompareFormattedValue && optionData && props.valueFormat
        ? getFormattedOptionValue(optionData)
        : undefined;

    return setValues.findIndex(curr =>
      isModelValueMatchingOption(
        curr,
        canonicalValue,
        formattedOptionValue ? { value: formattedOptionValue } : undefined,
      ),
    );
  }

  function isModelValueSetHasValue(
    setData: Set<ModelValueSingleType>,
    value: ModelValueSingleType,
  ) {
    return findModelValueIndex(setData, value) >= 0;
  }

  function modelValueSetDeleteValue(
    setData: Set<ModelValueSingleType>,
    value: ModelValueSingleType,
  ) {
    const setValues = Array.from(setData.values());
    const matchedIndex = findModelValueIndex(setData, value);

    return matchedIndex >= 0 ? setData.delete(setValues[matchedIndex]) : false;
  }

  function pickOption(
    value: ModelValueSingleType,
    singleChooseHide = true,
    forcePick = false,
    evt?: MouseEvent,
    singlePickToClear = false,
  ) {
    const optionData = getOptionDataByValue(value);
    const canonicalValue = optionData?.props.value ?? value;

    if (optionData) {
      if (optionData.props.disabled) return;

      savedOptions.set(canonicalValue, optionData);
    }

    evt?.preventDefault();

    options.prevOptionValue = canonicalValue;

    if (!props.multiple) {
      if (singlePickToClear) {
        if (isModelValueSetHasValue(options.presetModelValueSet.value, canonicalValue)) {
          options.changeIsAddValue.value = false;
          options.presetModelValueSet.value = new Set();
        } else {
          options.changeIsAddValue.value = true;
          options.presetModelValueSet.value = new Set([canonicalValue]);
        }
      } else {
        options.changeIsAddValue.value = true;

        if (!isModelValueSetHasValue(options.presetModelValueSet.value, canonicalValue)) {
          options.presetModelValueSet.value = new Set([canonicalValue]);
        }
      }

      if (!props.needConfirm || forcePick) {
        options.handleConfirm(singleChooseHide, false);
      }
    } else {
      if (isModelValueSetHasValue(options.presetModelValueSet.value, canonicalValue)) {
        options.changeIsAddValue.value = false;
        modelValueSetDeleteValue(options.presetModelValueSet.value, canonicalValue);
        context.emit('deselect', canonicalValue);

        if (!props.reserveKeyword || props.reserveKeyword === 'reserve-special') {
          options.delInput('', true, false);
        }
      } else {
        options.changeIsAddValue.value = true;
        if (props.multipleLimit > options.presetModelValueSet.value.size) {
          options.presetModelValueSet.value.add(canonicalValue);
        }

        if (props.reserveKeyword !== true) {
          options.delInput('', true, false);
        }
      }

      if (!props.needConfirm || forcePick) {
        options.handleConfirm(false, false);
      }
    }
  }

  async function onClickCreateOption() {
    const createValue = options.inputValue.value;

    const createAndPickOption = () => {
      tempCreateOptions.value.push(createValue);
      void nextTick(() => {
        pickOption(createValue, !props.multiple);
        options.inputValue.value = '';
        options.filterInputValue.value = '';

        if (props.multiple || props.needConfirm) {
          options.judgeWhetherInputCanFocus();
        } else {
          options.setPopperVisible(false);
        }
      });
    };

    if (props.beforeCreate) {
      Promise.resolve(
        props.beforeCreate(
          createValue,
          new Map(
            Array.from(options.optionsMap.entries()).map(([key, value]) => [key, value.props]),
          ),
        ),
      )
        .then(res => {
          if (res !== false) {
            createAndPickOption();
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          // do nothing
        });
    } else {
      createAndPickOption();
    }
  }

  function addOption(value: SelectCollectedOptionData<'option' | 'option-group'>) {
    if (value.type === 'option') {
      const val = value as SelectCollectedOptionData<'option'>;
      options.optionsMap.set(val.props.value, reactive(val));
    } else {
      for (const [, val] of value.children?.entries() ?? []) {
        options.optionsMap.set(val.props.value, reactive(val));
      }
    }
  }

  function removeOption(optionValue: OptionProps['value']) {
    options.optionsMap.delete(optionValue);
  }

  function focusOnFirstModelValue() {
    const firstModelValue = Array.from(options.modelValueSet.value.values()).at(0);

    options.focusedOptionValue.value =
      getOptionDataByValue(firstModelValue)?.props.value ??
      unwrapValueFormattedValue(firstModelValue) ??
      undefined;
  }

  function getAllOptionsInDom() {
    // mount order is not equal to dom order
    return Array.from(
      options.domRefs.pickerDomRef.value
        ?.popoverDom()
        .querySelectorAll(
          `.${classHelper.block}-option:not(.is-hide):not(.is-disabled)`,
        ) as HTMLElement[],
    )
      .sort((a, b) => {
        const aParent = a?.parentElement;
        const bParent = b?.parentElement;

        if (aParent === bParent) {
          return Number(a?.style?.order ?? 0) - Number(b?.style?.order ?? 0);
        } else {
          const viewWrapperChildren = Array.from(
            options.domRefs.scrollbarDomRef.value?.viewRef?.children ?? [],
          );

          return (
            Math.max(aParent ? viewWrapperChildren.indexOf(aParent) : 1, 1) -
            Math.max(bParent ? viewWrapperChildren.indexOf(bParent) : 1, 1)
          );
        }
      })
      .map(optionEl => {
        return Array.from(options.optionsMap.values()).find(curr => unref(curr.el) === optionEl)!;
      });
  }

  provide(HSelectAddOptionInjectKey, addOption);
  provide(HSelectRemoveOptionInjectKey, removeOption);
  provide(HSelectFocusedOptionValueInjectKey, options.focusedOptionValue);
  provide(HSelectVisibleOptionsInjectKey, visibleOptions);
  provide(HSelectPickOptionInjectKey, pickOption);

  return {
    visibleOptions,
    savedOptions,
    getOptionDataByValue,
    addOption,
    removeOption,
    pickOption,
    isModelValueSetHasValue,
    modelValueSetDeleteValue,
    tempCreateOptions,
    onClickCreateOption,
    focusOnFirstModelValue,
    getAllOptionsInDom,
  };
}
