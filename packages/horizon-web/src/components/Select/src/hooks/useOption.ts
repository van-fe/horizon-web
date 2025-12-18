import type { ComputedRef, Ref, Reactive } from 'vue';
import { computed, nextTick, provide, ref, unref, watch, reactive } from 'vue';
import {
  NSelectAddOptionInjectKey,
  NSelectFocusedOptionValueInjectKey,
  NSelectPickOptionInjectKey,
  NSelectRemoveOptionInjectKey,
  NSelectVisibleOptionsInjectKey,
  type SelectCollectedOptionData,
} from '../utils/injectKeys';
import type { OptionProps, SelectProps } from '../composables/useProps';
import {
  ComponentClassBlock,
  isDefined,
  isNil,
  isObject,
  type LegoSetupContext,
} from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectExposes } from '../composables/useExposes';
import { unwrapValueFormattedValue, isEqualIgnoreCtx } from '../utils/valueFormat';
import type {
  ModelValueType,
  ModelValueSingleType,
  NSelectFilterFunction,
  SelectDomRefs,
} from '../utils/types';
import { transformOptionList } from './useVirtualList';

export default function useOption(
  props: SelectProps,
  context: LegoSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    domRefs: SelectDomRefs;
    optionsMap: Reactive<Map<OptionProps['value'], SelectCollectedOptionData<'option'>>>;
    focusedOptionValue: Ref<OptionProps['value'] | undefined>;
    prevOptionValue: ModelValueType;
    isFilterable: ComputedRef<boolean>;
    filterMethod: ComputedRef<NSelectFilterFunction>;
    filterInputValue: Ref<string>;
    inputValue: Ref<string>;
    modelValueSet: Ref<Set<OptionProps['value']>>;
    presetModelValueSet: Ref<Set<OptionProps['value']>>;
    changeIsAddValue: Ref<boolean>;
    isDisabled: ComputedRef<boolean>;
    isModelValueSetHasValue: (
      setData: Set<ModelValueSingleType>,
      value: ModelValueSingleType,
    ) => boolean;
    modelValueSetDeleteValue: (
      setData: Set<ModelValueSingleType>,
      value: ModelValueSingleType,
    ) => void;
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
        option => !options.modelValueSet.value.has(option.props.value),
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

  function getOptionDataByValue(value: ModelValueSingleType | undefined) {
    const unwrappedValue = unwrapValueFormattedValue(value);
    if (isObject(unwrappedValue)) {
      return Array.from(options.optionsMap.values()).find(option => {
        return (
          isEqualIgnoreCtx(option.props.value, unwrappedValue) ||
          ('value' in unwrappedValue
            ? isEqualIgnoreCtx(option.props.value, unwrappedValue.value)
            : false)
        );
      });
    } else {
      return isNil(unwrappedValue) ? unwrappedValue : options.optionsMap.get(unwrappedValue);
    }
  }

  function pickOption(
    value: ModelValueSingleType,
    singleChooseHide = true,
    forcePick = false,
    evt?: MouseEvent,
    singlePickToClear = false,
  ) {
    const optionData = getOptionDataByValue(value);

    if (optionData) {
      if (optionData.props.disabled) return;

      savedOptions.set(value, optionData);
    }

    evt?.preventDefault();

    options.prevOptionValue = value;

    if (!props.multiple) {
      if (singlePickToClear) {
        if (options.isModelValueSetHasValue(options.presetModelValueSet.value, value)) {
          options.changeIsAddValue.value = false;
          options.presetModelValueSet.value = new Set();
        } else {
          options.changeIsAddValue.value = true;
          options.presetModelValueSet.value = new Set([value]);
        }
      } else {
        options.changeIsAddValue.value = true;

        if (!options.isModelValueSetHasValue(options.presetModelValueSet.value, value)) {
          options.presetModelValueSet.value = new Set([value]);
        }
      }

      if (!(props.needDropdownConfirm ?? props.needConfirm) || forcePick) {
        options.handleConfirm(singleChooseHide, false);
      }
    } else {
      if (options.isModelValueSetHasValue(options.presetModelValueSet.value, value)) {
        options.changeIsAddValue.value = false;
        options.modelValueSetDeleteValue(options.presetModelValueSet.value, value);
        context.emit('deselect', value);

        if (!props.reserveKeyword || props.reserveKeyword === 'reserve-special') {
          options.delInput('', true, false);
        }
      } else {
        options.changeIsAddValue.value = true;
        if (props.multipleLimit > options.presetModelValueSet.value.size) {
          options.presetModelValueSet.value.add(value);
        }

        if (props.reserveKeyword !== true) {
          options.delInput('', true, false);
        }
      }

      if (!(props.needDropdownConfirm || props.needConfirm) || forcePick) {
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

        if (
          (props.multiple || props.needDropdownConfirm) ??
          props.needConfirm ??
          props.needConfirm
        ) {
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
    options.focusedOptionValue.value = Array.from(options.modelValueSet.value.values()).at(0);
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

  provide(NSelectAddOptionInjectKey, addOption);
  provide(NSelectRemoveOptionInjectKey, removeOption);
  provide(NSelectFocusedOptionValueInjectKey, options.focusedOptionValue);
  provide(NSelectVisibleOptionsInjectKey, visibleOptions);
  provide(NSelectPickOptionInjectKey, pickOption);

  return {
    visibleOptions,
    savedOptions,
    getOptionDataByValue,
    addOption,
    removeOption,
    pickOption,
    tempCreateOptions,
    onClickCreateOption,
    focusOnFirstModelValue,
    getAllOptionsInDom,
  };
}
