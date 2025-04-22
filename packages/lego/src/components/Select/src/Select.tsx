import type { VNode } from 'vue';
import {
  unref,
  computed,
  defineComponent,
  inject,
  nextTick,
  provide,
  reactive,
  ref,
  shallowRef,
  toRefs,
  watch,
  onBeforeUnmount,
  cloneVNode,
  Fragment,
} from 'vue';
import {
  ComponentClassBlock,
  cls,
  useNamespace,
  isNil,
  isObject,
  isDefined,
  safelyGetEventTarget,
  cssVariableKey,
  flattenVNodes,
} from '@nio-fe/shared';
import type { LegoSetupContext, LegoComponentInstance } from '@nio-fe/shared';
import {
  NSelectInitialValueUndefined,
  NSelectValueFormatSymbol,
  useSelectProps,
} from './composables/useProps';
import { useSelectEmits } from './composables/useEmits';
import { useSelectSlots } from './composables/useSlots';
import { useSelectExposes } from './composables/useExposes';
import type {
  SelectProps,
  OptionProps,
  NSelectFilterFunction,
  ModelValueSingleType,
  ModelValueType,
} from './composables/useProps';
import type { SelectEmits } from './composables/useEmits';
import type { SelectSlots } from './composables/useSlots';
import type { SelectExposes } from './composables/useExposes';
import { NPicker } from '~/components/Picker';
import type { SelectCollectedOptionData } from './utils/injectKeys';
import {
  NSelectAddOptionInjectKey,
  NSelectEmitsInjectKey,
  NSelectFilterInputValueInjectKey,
  NSelectFocusedOptionValueInjectKey,
  NSelectInputValueInjectKey,
  NSelectModelValueInjectKey,
  NSelectMouseOverOptionInjectKey,
  NSelectPickOptionInjectKey,
  NSelectPopperVisibleInjectKey,
  NSelectPresetModelValueInjectKey,
  NSelectPropsInjectKey,
  NSelectRemoveOptionInjectKey,
  NSelectSlotsInjectKey,
  NSelectVisibleOptionsInjectKey,
} from './utils/injectKeys';
import { NScrollbar } from '~/components/Scrollbar';
import { NTagGroup, NTag } from '~/components/Tag';
import useSize from '~/utils/useSize';
import debounce from 'lodash/debounce';
import { clamp } from '@vueuse/core';
import NPickerFitContentInput from '~/components/Picker/src/components/NPickerFitContentInput';
import {
  unwrapValueFormattedValue,
  isValueFormatWrapped,
  isEqualIgnoreCtx,
} from './utils/valueFormat';
import { NCheckbox } from '~/components/Checkbox';
import useLocaleLang from '~/utils/useLocaleLang';
import NOption from './Option';
import {
  NFormItemErrorInjectedKey,
  NFormItemTriggerInjectedKey,
  NFormDisabledInjectedKey,
} from '~/components/Form';
import { isEmpty, isEqualLoose } from './utils/utils';
import VirtualScrollList from './components/VirtualScrollList';
import { transformOptionList } from './utils/useVirtualList';
import throttle from 'lodash/throttle';
import type { PickerExposes } from '~/components/Picker/src/composables/useExposes';
import type { ScrollbarExposes } from '~/components/Scrollbar/src/composables/useExposes';
import useCheckAll from '~/components/Select/src/hooks/useCheckAll';
import { NPopContent, NPopover } from '~/components/Popover';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';

export default defineComponent({
  name: `${useNamespace()}Select`,
  desc: '当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项',
  components: {
    NPicker,
    NScrollbar,
    NTagGroup,
    NTag,
    NPickerFitContentInput,
    NCheckbox,
    NOption,
    VirtualScrollList,
  },
  props: useSelectProps,
  emits: useSelectEmits,
  slots: useSelectSlots,
  exposes: useSelectExposes,
  setup(
    props: SelectProps,
    { emit, slots, expose }: LegoSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  ) {
    const classHelper = new ComponentClassBlock('select');

    const propRefs = toRefs(props);

    const {
      size,
      collapse: collapseRef,
      collapseTags: collapseTagsRef,
      selectStyle: selectStyleRef,
      inputStyle: inputStyleRef,
      filterOption: filterOptionRef,
      filterable: filterableRef,
      filterMethod: filterMethodRef,
      descriptionFilterable: descriptionFilterableRef,
      panelFilterOption: panelFilterOptionRef,
      panelFilterInputValue: panelFilterInputValueRef,
      useBuildInPanelFilter: useBuildInPanelFilterRef,
      panelInputPlaceholder: panelInputPlaceholderRef,
      multiple: multipleRef,
      multipleLimit: multipleLimitRef,
      modelValue: modelValueRef,
      disabled: disabledRef,
      clearable: clearableRef,
      trigger: triggerRef,
      placement: placementRef,
      toBody: toBodyRef,
      placeholder: placeholderRef,
      needDropdownConfirm: needDropdownConfirmRef,
      needConfirm: needConfirmRef,
      dropdownConfirmBtnText: dropdownConfirmBtnTextRef,
      confirmBtnText: confirmBtnTextRef,
      dropdownCancelBtnText: dropdownCancelBtnTextRef,
      cancelBtnText: cancelBtnTextRef,
      optionEmptyText: optionEmptyTextRef,
      emptyText: emptyTextRef,
      destroyOnHide: destroyOnHideRef,
      fitInputWidth: fitInputWidthRef,
      collapseTagsTooltip: collapseTagsTooltipRef,
      maxCollapseTags: maxCollapseTagsRef,
      collapseTagsFillUp: collapseTagsFillUpRef,
      collapsedTagsProps: collapsedTagsPropsRef,
      selectedVisible: selectedVisibleRef,
      dropdownIcon: dropdownIconRef,
      customSelectIcon: customSelectIconRef,
      valueFormat: valueFormatRef,
      externalPanelStyle: externalPanelStyleRef,
      externalPanelClass: externalPanelClassRef,
      useCheckAll: useCheckAllRef,
      useCheckAllSummary: useCheckAllSummaryRef,
      checkAllSummaryText: checkAllSummaryTextRef,
      showSearch: showSearchRef,
      allowCreate: allowCreateRef,
      beforeCreate: beforeCreateRef,
      optionListLoading: optionListLoadingRef,
      loading: loadingRef,
      optionLoadingText: optionLoadingTextRef,
      optionMaxLines: optionMaxLinesRef,
      showValueUnMatch: showValueUnMatchRef,
      inputStatus: inputStatusRef,
      popperClassName: popperClassNameRef,
      externalSelectStyle: externalSelectStyleRef,
      externalSelectClass: externalSelectClassRef,
      externalOptionClass: externalOptionClassRef,
      externalOptionStyle: externalOptionStyleRef,
      popoverOptions: popoverOptionsRef,
      initialValue: initialValueRef,
      hoverShowDelay: hoverShowDelayRef,
      hoverHideDelay: hoverHideDelayRef,
      useStatistic: useStatisticRef,
      statisticText: statisticTextRef,
      optionListMaxHeight: optionListMaxHeightRef,
      compatibility: compatibilityRef,
      options: optionsRef,
      useVirtualScroll: useVirtualScrollRef,
      inputEmitFrequency: inputEmitFrequencyRef,
      hidePanelWhenShowSearchAndEmptyList: hidePanelWhenShowSearchAndEmptyListRef,
      searchIcon: searchIconRef,
      reserveKeyword: reserveKeywordRef,
      tooltipShowAfter: tooltipShowAfterRef,
      tooltipHideAfter: tooltipHideAfterRef,
      fitContentInputMinWidth: fitContentInputMinWidthRef,
    } = propRefs;

    /**
     * dom ref
     */
    const pickerDomRef = ref<null | LegoComponentInstance<typeof NPicker, PickerExposes>>(null);
    const scrollbarDomRef = ref<null | LegoComponentInstance<typeof NScrollbar, ScrollbarExposes>>(
      null,
    );
    const filterInputDomRef = ref<null | typeof NPickerFitContentInput>(null);
    const tagGroupDomRef = ref<null | typeof NTagGroup>(null);
    const virtualScrollListDomRef = ref<null | typeof VirtualScrollList>(null);

    /**
     * other ref value
     */
    const sizeRef = useSize(size, 'medium');
    const useCollapse = computed(() => collapseRef?.value ?? collapseTagsRef.value);

    // form-item validate trigger
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    const nFormError = inject(NFormItemErrorInjectedKey, ref(''));

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabledRef?.value ?? formDisabled?.value ?? false);

    /**
     * visible deal
     */
    const popperVisible = ref(false);
    let prevScrollTop = 0;

    watch(popperVisible, val => {
      emit('dropdownVisibleChange', val);

      if (val && destroyOnHideRef.value) {
        nextTick(() => {
          scrollbarDomRef.value?.setScrollTop(prevScrollTop);
        });
      }

      if (val) {
        void nextTick(() => {
          focusOnFirstModelValue();
        });

        if (isDefined(optionsRef?.value)) {
          setTimeout(() => {
            virtualScrollListDomRef.value?.scrollToActiveModelValue();
          });
        } else {
          const firstModelValue = modelValueSet.value.values().next().value;
          setTimeout(() => {
            const optionData = getOptionDataByValue(firstModelValue);
            if (optionData) {
              const optionClassBlock = new ComponentClassBlock('select-option');
              (scrollbarDomRef.value?.viewRef as HTMLElement)
                ?.querySelector(
                  `.${optionClassBlock.block}[data-value="${optionData.props.value.toString()}"]`,
                )
                ?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
        }
      }

      if (!val) {
        focusedOptionValue.value = undefined;
      }
    });

    provide(NSelectPopperVisibleInjectKey, popperVisible);

    function onScroll(position: { scrollLeft: number; scrollTop: number }) {
      prevScrollTop = position.scrollTop;
    }

    function manualControlPopperVisible(visible: boolean) {
      if (visible) {
        pickerDomRef.value?.show();
      } else {
        pickerDomRef.value?.hide();
        setTimeout(() => {
          blurInput();
        });
      }
    }

    const isHideInput = computed(() => {
      if (multipleRef.value) {
        if (useStatisticRef.value && modelValueSet.value.size > 0) {
          return true;
        } else if (!(useFilter.value || allowCreateRef.value)) {
          if (renderedModelValueTags.value.length > 0) {
            return true;
          }
        } else {
          if (modelValueSet.value.size > 0) {
            return true;
          }
        }
      } else {
        if (slots.tagRender && modelValueSet.value.size > 0) {
          return true;
        }
      }

      return false;
    });

    /**
     * filter method
     */
    const useFilter = computed(() => !!filterOptionRef?.value || filterableRef.value);
    const filterMethod = computed<NSelectFilterFunction>(() => {
      const defaultFilterMethod = (
        input: string,
        option: OptionProps & Record<string, unknown>,
      ) => {
        return (
          option.label?.toString().toLowerCase().includes(input.toLowerCase()) ||
          (descriptionFilterableRef.value &&
            typeof option.description === 'string' &&
            option.description.toLowerCase().includes(input.toLowerCase())) ||
          false
        );
      };

      if (filterOptionRef?.value) {
        return typeof filterOptionRef?.value === 'boolean'
          ? defaultFilterMethod
          : filterOptionRef?.value;
      }

      if (filterableRef.value) {
        return filterMethodRef?.value ? filterMethodRef.value : defaultFilterMethod;
      }

      if (panelFilterOptionRef.value) {
        return typeof panelFilterOptionRef?.value === 'boolean'
          ? defaultFilterMethod
          : panelFilterOptionRef?.value;
      }

      return defaultFilterMethod;
    });

    const inputValue = ref('');
    const filterInputValue = ref('');
    const inputable = computed(
      () => useFilter.value || showSearchRef.value || allowCreateRef.value,
    );
    const isDuringComposition = ref(false);
    const isCreateOptionVisible = computed(() => {
      if (allowCreateRef.value) {
        if (inputValue.value) {
          return !Array.from(optionList.values()).some(
            curr => curr.props.label?.toString().trim() === inputValue.value.trim(),
          );
        } else return optionList.size === 0;
      } else {
        return false;
      }
    });

    let prevOptionValue: ModelValueType = undefined;
    let changeIsAddValue = true;

    function emitChange(emptyInputValue = false, inputVal = inputValue.value) {
      if (compatibilityRef.value) {
        if (changeIsAddValue) {
          emit('change', emptyInputValue ? null : inputVal ?? null, prevOptionValue);
        }
      } else {
        emit('change', emptyInputValue ? null : inputVal, modelValue.value);
      }
    }

    watch(inputValue, val => {
      if (allowCreateRef.value) {
        focusedOptionValue.value = val;
      }

      emit('input', val);
    });

    const tempCreateOptions = ref<string[]>([]);

    const visibleOptions = computed(() => {
      let tempVisibleOptions: Array<SelectCollectedOptionData<'option'>> = Array.from(
        optionList.values(),
      );

      if ((useFilter.value || allowCreateRef.value) && filterInputValue.value) {
        tempVisibleOptions = tempVisibleOptions.filter(option =>
          filterMethod.value(filterInputValue.value.trim(), { ...option.props, ...option.attrs }),
        );
      }

      if (panelFilterOptionRef.value) {
        tempVisibleOptions = tempVisibleOptions.filter(option =>
          filterMethod.value(
            useBuildInPanelFilterRef.value
              ? filterInputValue.value
              : panelFilterInputValueRef.value.trim(),
            {
              ...option.props,
              ...option.attrs,
            },
          ),
        );
      }

      if (!selectedVisibleRef.value) {
        tempVisibleOptions = tempVisibleOptions.filter(
          option => !modelValueSet.value.has(option.props.value),
        );
      }

      return tempVisibleOptions;
    });

    provide(NSelectVisibleOptionsInjectKey, visibleOptions);

    async function onClickCreateOption() {
      const createValue = inputValue.value;

      const createAndPickOption = () => {
        tempCreateOptions.value.push(createValue);
        void nextTick(() => {
          pickOption(createValue, !multipleRef.value);
          inputValue.value = '';
          filterInputValue.value = '';

          if ((multipleRef.value || needDropdownConfirmRef?.value) ?? needConfirmRef.value) {
            judgeWhetherInputCanFocus();
          } else {
            manualControlPopperVisible(false);
          }
        });
      };

      if (beforeCreateRef?.value) {
        Promise.resolve(
          beforeCreateRef.value(
            createValue,
            new Map(Array.from(optionList.entries()).map(([key, value]) => [key, value.props])),
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

    const handleInput = (evt: Event) => {
      const target = safelyGetEventTarget(evt) as HTMLInputElement;
      delInputDebounced(target.value);
    };

    function delInput(
      value: string,
      switchPopperVisible = true,
      manual = true,
      emitChangeEvent = true,
    ) {
      if (isDuringComposition.value) return;

      if (value !== inputValue.value && emitChangeEvent) {
        emitChange(!value, value);
      }

      inputValue.value = value;
      changeIsAddValue = true;

      if (manual || (!manual && reserveKeywordRef.value !== 'reserve-special')) {
        filterInputValue.value = value;

        if (showSearchRef.value) {
          emit('search', value);
        }
      }

      nextTick(() => {
        if (!popperVisible.value && switchPopperVisible) {
          manualControlPopperVisible(true);
        }
      });
    }

    const delInputDebounced = debounce(delInput, inputEmitFrequencyRef.value);

    function onCompositionStart() {
      isDuringComposition.value = true;
    }

    function onCompositionEnd() {
      isDuringComposition.value = false;
    }

    const shouldTagAppendInputExists = computed(
      () => multipleRef.value && modelValueSet.value.size > 0 && inputable.value,
    );

    const shouldPickerCanBeFocused = computed(
      () => multipleRef.value && modelValueSet.value.size > 0 && panelFilterOptionRef.value,
    );

    function onTagGroupSuffixInputFocus(evt: FocusEvent) {
      pickerDomRef.value?.handleInputFocus(evt);
    }

    function onTagGroupSuffixInputBlur(evt: FocusEvent) {
      if (
        evt.relatedTarget &&
        !pickerDomRef.value?.wrapperDom().contains(evt.relatedTarget as Node) &&
        !pickerDomRef.value?.popoverDom().contains(evt.relatedTarget as Node)
      ) {
        manualControlPopperVisible(false);
      }

      pickerDomRef.value?.handleInputBlur(evt);
    }

    function handleClear(evt?: MouseEvent) {
      evt?.preventDefault();
      let modelValueHasChanged = false;

      if (multipleRef.value) {
        for (const value of Array.from(modelValueSet.value.values())) {
          const option = getOptionDataByValue(value);
          if (!option?.props?.disabled) {
            modelValueHasChanged = true;
            modelValueSet.value.delete(option?.props?.value ?? value);
          }
        }
      } else {
        if (modelValueSet.value.size > 0) modelValueHasChanged = true;

        modelValueSet.value.clear();
      }

      delInput('', false, true, !modelValueHasChanged);
      emit('clear');
    }

    const isInputFocus = ref(false);
    const isSelectFocus = ref(false);
    // This value is set for some element which should be visibled before select focused
    const isSelectWillBeActivated = ref(false);

    function handleInputFocus() {
      isInputFocus.value = true;
    }

    function handleInputBlur() {
      isInputFocus.value = false;
    }

    function handleFocus() {
      isSelectFocus.value = true;
      emit('focus');
    }

    function handleBlur() {
      isSelectFocus.value = false;
      isSelectWillBeActivated.value = false;
      emit('blur');

      nextTick(() => {
        formItemTrigger?.('blur');
      });
    }

    function focusInput() {
      filterInputDomRef.value?.focus();
      pickerDomRef.value?.focus();
    }

    function blurInput() {
      filterInputDomRef.value?.blur();
      pickerDomRef.value?.blur();
    }

    function judgeWhetherInputCanFocus() {
      setTimeout(() => {
        if (
          (inputable.value ||
            ((multipleRef.value || needDropdownConfirmRef?.value) ?? needConfirmRef.value)) &&
          (popperVisible.value || showSearchRef.value)
        ) {
          void nextTick(() => {
            focusInput();
          });
        }
      });
    }

    function handleClick(evt: MouseEvent) {
      isSelectWillBeActivated.value = true;
      judgeWhetherInputCanFocus();
      emit('click', evt);
    }

    provide(NSelectInputValueInjectKey, inputValue);
    provide(NSelectFilterInputValueInjectKey, filterInputValue);

    /**
     * collect options
     */
    const optionList = reactive(
      new Map<OptionProps['value'], SelectCollectedOptionData<'option'>>(),
    );

    function addOption(value: SelectCollectedOptionData<'option' | 'option-group'>) {
      if (value.type === 'option') {
        const val = value as SelectCollectedOptionData<'option'>;
        optionList.set(val.props.value, val);
      } else {
        for (const [, val] of value.children?.entries() ?? []) {
          optionList.set(val.props.value, val);
        }
      }
    }

    function removeOption(optionValue: OptionProps['value']) {
      optionList.delete(optionValue);
    }

    provide(NSelectAddOptionInjectKey, addOption);
    provide(NSelectRemoveOptionInjectKey, removeOption);

    /**
     * model value collect
     */
    const modelValue = ref<ModelValueType>();
    const modelValueSet = ref(new Set<ModelValueSingleType>());
    const presetModelValueSet = ref(new Set<ModelValueSingleType>());

    watch(
      () => optionsRef?.value,
      list => {
        if (isDefined(list)) {
          optionList.clear();
          transformOptionList(props, {
            presetModelValueSet,
            isDisabled,
          }).forEach(item =>
            optionList.set(item.props.value!, item as SelectCollectedOptionData<'option'>),
          );
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      modelValue,
      newValue => {
        if (!isEqualLoose(newValue, modelValueRef?.value)) {
          emit('update:modelValue', newValue);

          emitChange(true);

          void nextTick(() => {
            formItemTrigger?.('change');
          });
        }
      },
      {
        deep: true,
      },
    );

    function updateModelValue() {
      const transformedValue = getFormattedModelValue(modelValueSet.value);

      const value = multipleRef.value ? transformedValue : transformedValue[0];

      if (isEmpty(value)) {
        if (initialValueRef?.value === NSelectInitialValueUndefined) {
          modelValue.value = multipleRef.value ? [] : undefined;
        } else {
          modelValue.value =
            initialValueRef.value === Symbol.for('undefined') ? undefined : initialValueRef.value;
        }
      } else {
        modelValue.value = value;
      }
    }

    watch(
      modelValueSet,
      val => {
        presetModelValueSet.value = new Set(val);

        resetRenderedTags();
        updateModelValue();
      },
      {
        deep: true,
      },
    );

    watch(
      presetModelValueSet,
      val => {
        presetRenderedModelValueTags.value = getShouldRenderedTags(val);
      },
      {
        deep: true,
      },
    );

    watch(multipleRef, val => {
      if (!val) {
        if (!reserveNumberOfModelValues()) {
          updateModelValue();
        }
      } else {
        updateModelValue();
      }
    });

    watch(
      multipleLimitRef,
      val => {
        reserveNumberOfModelValues(val);
      },
      {
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

    // in order to prevent optionList changed after the showValue is empty
    let prevSelectedValue: ModelValueSingleType | null = null;
    let prevSelectedLabel: string = '';

    const showValue = computed<string | undefined>(() => {
      if (props.multiple) {
        if (useStatisticRef.value && modelValueSet.value.size > 0) {
          return statisticTextRef?.value
            ? `${statisticTextRef?.value} (${modelValueSet.value.size})`
            : modelValueSet.value.size === 1
              ? `${useLocaleLang('select.statistic').value} (${modelValueSet.value.size})`
              : `${useLocaleLang('select.statistics').value} (${modelValueSet.value.size})`;
        } else {
          if (inputable.value && inputValue.value && modelValueSet.value.size === 0) {
            return inputValue.value;
          } else {
            return modelValueSet.value.size > 0 ? ' ' : '';
          }
        }
      } else {
        if (inputable.value && inputValue.value && modelValueSet.value.size === 0) {
          return inputValue.value;
        } else {
          const value = modelValueSet.value.values().next().value;
          const unwrapValue = unwrapValueFormattedValue(value)!;
          const option = getOptionDataByValue(value);

          if (!option) {
            if (unwrapValue === prevSelectedValue) {
              return prevSelectedLabel;
            } else if (showValueUnMatchRef.value) {
              // Empty string is considered valuable. Because the option.value may be empty string
              if (value === '') {
                return ' ';
              } else return value?.toString();
            }
          }

          prevSelectedValue = unwrapValue;
          prevSelectedLabel = option?.props.label?.toString() ?? '';

          return prevSelectedLabel;
        }
      }
    });

    watch(popperVisible, val => {
      if (val) {
        presetModelValueSet.value = new Set(modelValueSet.value.values());

        if (val) {
          judgeWhetherInputCanFocus();
        }
      } else {
        inputValue.value = '';
        filterInputValue.value = '';
      }

      if (inputable.value && multipleRef.value) {
        void nextTick(() => {
          tagGroupDomRef.value?.doCollapseCalculate();
        });
      }
    });

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

    const savedOptions = new Map<ModelValueSingleType, SelectCollectedOptionData<'option'>>();

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

      prevOptionValue = value;

      if (!multipleRef.value) {
        if (singlePickToClear) {
          if (isModelValueSetHasValue(presetModelValueSet.value, value)) {
            changeIsAddValue = false;
            presetModelValueSet.value = new Set();
          } else {
            changeIsAddValue = true;
            presetModelValueSet.value = new Set([value]);
          }
        } else {
          changeIsAddValue = true;

          if (!isModelValueSetHasValue(presetModelValueSet.value, value)) {
            presetModelValueSet.value = new Set([value]);
          }
        }

        if (!(needDropdownConfirmRef?.value ?? needConfirmRef.value) || forcePick) {
          handleConfirm(singleChooseHide, false);
        }
      } else {
        if (isModelValueSetHasValue(presetModelValueSet.value, value)) {
          changeIsAddValue = false;
          modelValueSetDeleteValue(presetModelValueSet.value, value);
          emit('deselect', value);

          if (!reserveKeywordRef.value || reserveKeywordRef.value === 'reserve-special') {
            delInput('', true, false);
          }
        } else {
          changeIsAddValue = true;
          if (multipleLimitRef.value > presetModelValueSet.value.size) {
            presetModelValueSet.value.add(value);
          }

          if (reserveKeywordRef.value !== true) {
            delInput('', true, false);
          }
        }

        if (!(needDropdownConfirmRef?.value || needConfirmRef.value) || forcePick) {
          handleConfirm(false, false);
        }
      }
    }

    function handleConfirm(hidePopper = true, manual = true) {
      modelValueSet.value = new Set(presetModelValueSet.value.values());

      if (manual) {
        prevOptionValue = Array.from(modelValueSet.value.values());
      }

      hidePopper && manualControlPopperVisible(false);

      if (!hidePopper) {
        judgeWhetherInputCanFocus();
      }
    }

    function handleCancel() {
      manualControlPopperVisible(false);

      emit('cancel');
    }

    function getOptionDataByValue(value: ModelValueSingleType | undefined) {
      const unwrappedValue = unwrapValueFormattedValue(value);
      if (isObject(unwrappedValue)) {
        return Array.from(optionList.values()).find(option => {
          return (
            isEqualIgnoreCtx(option.props.value, unwrappedValue) ||
            ('value' in unwrappedValue
              ? isEqualIgnoreCtx(option.props.value, unwrappedValue.value)
              : false)
          );
        });
      } else {
        return isNil(unwrappedValue) ? unwrappedValue : optionList.get(unwrappedValue);
      }
    }

    watch(optionList, () => {
      resetRenderedTags();
    });

    provide(NSelectModelValueInjectKey, modelValueSet);
    provide(NSelectPresetModelValueInjectKey, presetModelValueSet);
    provide(NSelectPickOptionInjectKey, pickOption);

    const renderedModelValueTags = ref<Array<VNode | JSX.Element>>([]);
    const presetRenderedModelValueTags = ref<Array<VNode | JSX.Element>>([]);
    // To prevent optionList changes that cause already selected options to fail to render
    const prevRenderedModelValueTags = new Map<ModelValueSingleType, VNode | JSX.Element>();

    function getShouldRenderedTags(fromValueSet: Set<ModelValueSingleType> = modelValueSet.value) {
      return Array.from(fromValueSet.values())
        .map(optValue => {
          const option = getOptionDataByValue(optValue);

          if (!option) {
            return (
              prevRenderedModelValueTags.get(optValue) ??
              (showValueUnMatchRef.value
                ? slots.tagRender?.({
                    value: optValue,
                  } as OptionProps & Record<string, unknown>) ?? (
                    <NTag
                      clickable={false}
                      closable={true}
                      disabled={isDisabled.value}
                      onClose={evt => pickOption(optValue, true, true, evt, true)}
                    >
                      {optValue}
                    </NTag>
                  )
                : undefined)
            );
          }

          const res = slots.tagRender?.({
            ...option.props,
            ...option.attrs,
          }) ?? (
            <NTag
              clickable={false}
              closable={!option?.props.disabled}
              disabled={option?.props.disabled || isDisabled.value}
              onClose={() => pickOption(optValue, true, true, undefined, true)}
            >
              {option?.props.label ??
                option?.slots.innerRender?.({
                  ...option?.props,
                  ...option?.attrs,
                  active: option?.active.value ?? false,
                }) ??
                option?.slots.label?.({
                  ...option?.props,
                  ...option?.attrs,
                  active: option?.active.value ?? false,
                })}
            </NTag>
          );

          prevRenderedModelValueTags.set(optValue, res as VNode | JSX.Element);

          return res;
        })
        .filter(curr => !!curr) as Array<VNode | JSX.Element>;
    }

    function getSelectedOptionsPopoverRender(reference: VNode, props: Partial<PopoverProps> = {}) {
      return (
        <NPopover {...props}>
          {{
            popper: () => (
              <NPopContent style={{ maxWidth: '320px' }}>
                <NScrollbar maxHeight={152} size="small">
                  <NTagGroup
                    ref={tagGroupDomRef}
                    collapse={false}
                    tooltipRenderType="full"
                    size={sizeRef.value}
                    disabled={isDisabled.value}
                    tooltipShowAfter={tooltipShowAfterRef.value}
                    tooltipHideAfter={tooltipHideAfterRef.value}
                    collapseTagProps={{
                      clickable: false,
                      ...collapsedTagsPropsRef?.value,
                    }}
                  >
                    {getShouldRenderedTags()}
                  </NTagGroup>
                </NScrollbar>
              </NPopContent>
            ),
            reference: () => reference,
          }}
        </NPopover>
      );
    }

    function resetRenderedTags() {
      if (
        useCheckAllSummaryRef.value &&
        !Array.from(optionList.keys()).some(curr => !modelValueSet.value.has(curr))
      ) {
        renderedModelValueTags.value = [
          getSelectedOptionsPopoverRender(
            <NTag
              clickable={false}
              closable={true}
              disabled={isDisabled.value}
              onClose={handleClear}
            >
              {checkAllSummaryTextRef?.value ?? useLocaleLang('select.all').value}
            </NTag>,
            {
              disabled: !collapseTagsTooltipRef.value,
            },
          ),
        ] as Array<VNode>;
        return;
      }

      renderedModelValueTags.value = getShouldRenderedTags();

      // remove deselected option in prevRenderedModelValueTags
      for (const optValue of prevRenderedModelValueTags.keys()) {
        if (!modelValueSet.value.has(optValue)) {
          prevRenderedModelValueTags.delete(optValue);
        }
      }
    }

    watch(useCheckAllSummaryRef, () => {
      resetRenderedTags();
    });

    function getFormattedModelValue(modelValueSet: Set<ModelValueSingleType>) {
      let values = Array.from(modelValueSet.values());

      if (valueFormatRef?.value) {
        values = values.map(curr => {
          if (isValueFormatWrapped(curr)) {
            return curr;
          }

          const tempData = getOptionDataByValue(curr);

          const formattedValue = valueFormatRef.value!({ ...tempData?.props, ...tempData?.attrs });

          formattedValue[NSelectValueFormatSymbol] = curr;

          return formattedValue;
        });
      }

      return values;
    }

    watch(
      () => modelValueRef?.value,
      val => {
        if (isNil(val)) {
          modelValueSet.value.clear();
        } else {
          if (multipleRef.value) {
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

    const panelStatus = computed(() => {
      if (visibleOptions.value.length === 0 && !allowCreateRef.value) {
        return 'empty';
      }

      return 'normal';
    });

    /******* keyboard up down to focus option *******/
    const focusedOptionValue = ref<OptionProps['value']>();
    provide(NSelectFocusedOptionValueInjectKey, focusedOptionValue);

    function focusOnFirstModelValue() {
      focusedOptionValue.value = Array.from(modelValueSet.value.values()).at(0);
    }

    function getAllOptionsInDom() {
      // mount order is not equal to dom order
      return Array.from(
        pickerDomRef.value
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
            const viewWrapperChildren = Array.from(scrollbarDomRef.value?.viewRef?.children ?? []);

            return (
              Math.max(aParent ? viewWrapperChildren.indexOf(aParent) : 1, 1) -
              Math.max(bParent ? viewWrapperChildren.indexOf(bParent) : 1, 1)
            );
          }
        })
        .map(optionEl => {
          return Array.from(optionList.values()).find(curr => unref(curr.el) === optionEl)!;
        });
    }

    const focusOnOptionByKeyboard = throttle((evt: KeyboardEvent) => {
      const options = isDefined(optionsRef?.value)
        ? visibleOptions.value.filter(curr => curr.props.disabled !== true)
        : getAllOptionsInDom();

      if (focusedOptionValue.value === undefined) {
        focusedOptionValue.value =
          Array.from(modelValueSet.value.values()).at(0) ??
          (isCreateOptionVisible.value ? inputValue.value : undefined);
      }

      let index = options.findIndex(value => value.props.value === focusedOptionValue.value);

      if (evt.key === 'ArrowUp') {
        index -= 1;
      } else if (evt.key === 'ArrowDown') {
        index += 1;
      }

      let min = 0;

      if (isCreateOptionVisible.value) {
        min--;
      }

      if (useCheckAllRef.value) {
        min--;
      }

      const aimIndex = index;
      index = clamp(index, min, Math.max(options.length - 1, min));

      // virtual scroll
      if (isDefined(optionsRef?.value)) {
        virtualScrollListDomRef.value?.scrollToIndex(index, true);
      }

      if (index === -2 && useCheckAllRef.value) {
        focusedOptionValue.value = '__checkAll';
      } else if (index === -1) {
        if (useCheckAllRef.value && !isCreateOptionVisible.value) {
          focusedOptionValue.value = '__checkAll';
        }

        if (isCreateOptionVisible.value) {
          focusedOptionValue.value = inputValue.value;
        }
      } else {
        focusedOptionValue.value = options[index]?.props?.value;
      }

      if (aimIndex > index && !loadingRef.value) {
        emit('optionListReachBottom', evt);
      }
    }, 100);

    watch(isSelectFocus, val => {
      if (val) {
        window.addEventListener('keydown', handleKeydown);
      } else {
        window.removeEventListener('keydown', handleKeydown);
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeydown);
    });

    function handleKeydown(evt: KeyboardEvent) {
      if (['ArrowUp', 'ArrowDown'].includes(evt.key) && popperVisible.value) {
        evt.preventDefault();

        focusOnOptionByKeyboard(evt);
      }

      if (evt.key === 'Enter') {
        evt.preventDefault();
        if (isDisabled.value) return;

        if (popperVisible.value && !isDuringComposition.value) {
          if (focusedOptionValue.value && optionList.has(focusedOptionValue.value)) {
            if (isCreateOptionVisible.value && focusedOptionValue.value === inputValue.value) {
              onClickCreateOption();
            } else if (useCheckAllRef.value && focusedOptionValue.value === '__checkAll') {
              toggleCheckAll();
            } else {
              pickOption(focusedOptionValue.value, false);

              if (!multipleRef.value) {
                manualControlPopperVisible(false);
              }
            }
          }
        } else {
          manualControlPopperVisible(true);
        }

        if ((multipleRef.value || needDropdownConfirmRef?.value) ?? needConfirmRef.value) {
          judgeWhetherInputCanFocus();
        }
      }

      if (
        evt.key === 'Backspace' &&
        inputable.value &&
        inputValue.value?.length === 0 &&
        !isDuringComposition.value &&
        panelFilterOptionRef.value === false &&
        multipleRef.value
      ) {
        if (modelValueSet.value.size > 0) {
          pickOption(Array.from(modelValueSet.value.values()).at(-1)!, true, true);
        }
      }

      if (evt.key === 'Escape') {
        manualControlPopperVisible(false);
      }
    }

    function onMouseOverOption(value: OptionProps['value']) {
      focusedOptionValue.value = value;
    }

    provide(NSelectMouseOverOptionInjectKey, onMouseOverOption);

    function onReachBottom(evt?: Event) {
      if (!loadingRef.value) emit('optionListReachBottom', evt, filterInputValue.value);
    }

    const needConfirm = computed(() => needDropdownConfirmRef?.value ?? needConfirmRef.value);

    const {
      isCheckAll,
      isIndeterminate,
      checkAllCountShowText,
      isCheckAllTextActive,
      toggleCheckAll,
    } = useCheckAll(propRefs, {
      optionList,
      visibleOptions,
      presetModelValueSet,
      needConfirm,
      handleConfirm,
    });

    /**
     * normal provide
     */
    provide(NSelectPropsInjectKey, props);
    provide(NSelectEmitsInjectKey, emit);
    provide(NSelectSlotsInjectKey, slots);

    expose({
      confirmHandle: handleConfirm,
      cancelHandle: handleCancel,
      setInputAble: focusInput,
      changePanelVisible: manualControlPopperVisible,
      focusOption: (optionValue?: OptionProps['value']) => (focusedOptionValue.value = optionValue),
      clear: handleClear,
      renderedModelValueTags,
      focus: () => {
        pickerDomRef.value?.focus();
      },
      blur: () => {
        pickerDomRef.value?.forceBlur();
      },
    });

    // Because of when jsx mode on, the default options can't be mounted correctly. (VUE bug)
    // So SELECT should render slots to a shallowRef value to correct the behavior.
    const defaultSlotContent = shallowRef();
    function renderDefaultSlot(slots: LegoSetupContext<{}, SelectSlots>['slots']) {
      defaultSlotContent.value = slots.default?.();
    }

    return () => {
      renderDefaultSlot(slots);
      return (
        <NPicker
          ref={pickerDomRef}
          size={sizeRef.value}
          modelValue={showValue.value}
          hideInput={isHideInput.value}
          class={cls(
            classHelper.block,
            externalSelectClassRef?.value,
            classHelper.has('check-all', useCheckAllRef.value),
            classHelper.is('inputable', inputable.value),
          )}
          inputable={inputable.value}
          inputIsSearching={useFilter.value || showSearchRef.value}
          inputStatus={!!nFormError?.value ? 'error' : inputStatusRef.value}
          disabled={isDisabled.value}
          clearable={clearableRef.value}
          trigger={triggerRef.value}
          placement={placementRef.value}
          toBody={toBodyRef.value}
          placeholder={placeholderRef?.value}
          popperCanBeDisplayed={
            showSearchRef.value && hidePanelWhenShowSearchAndEmptyListRef.value
              ? optionList.size > 0 || !!filterInputValue.value
              : true
          }
          needConfirm={needConfirm.value}
          confirmButtonText={
            dropdownConfirmBtnTextRef?.value ?? confirmBtnTextRef?.value ?? props.confirmButtonText
          }
          cancelButtonText={
            dropdownCancelBtnTextRef?.value ?? cancelBtnTextRef?.value ?? props.cancelButtonText
          }
          emptyText={optionEmptyTextRef?.value ?? emptyTextRef?.value}
          destroyOnHide={destroyOnHideRef.value}
          fitInputWidth={fitInputWidthRef.value}
          hoverShowDelay={hoverShowDelayRef.value}
          hoverHideDelay={hoverHideDelayRef.value}
          inputStyle={
            selectStyleRef?.value
              ? selectStyleRef.value === 'noborder'
                ? 'no-border'
                : selectStyleRef.value
              : inputStyleRef.value
          }
          panelStatus={panelStatus.value}
          modelValueRegardAsPlaceholder={
            !multipleRef.value && inputable.value && modelValueSet.value.size > 0
          }
          dropdownIcon={customSelectIconRef?.value ?? dropdownIconRef?.value}
          panelStyle={externalOptionStyleRef?.value ?? externalPanelStyleRef?.value}
          panelClass={[
            externalOptionClassRef?.value ??
              popperClassNameRef?.value ??
              externalPanelClassRef?.value,
            classHelper.e('panel'),
          ]}
          loading={optionListLoadingRef?.value || loadingRef.value}
          loadingText={optionLoadingTextRef?.value}
          popoverOptions={popoverOptionsRef?.value}
          useFitContentInput={true}
          usePanelInput={useBuildInPanelFilterRef.value}
          panelInputPlaceholder={
            panelInputPlaceholderRef?.value ??
            (useLocaleLang('select.pleaseSearch').value as string)
          }
          searchIcon={searchIconRef?.value}
          fitContentInputMinWidth={fitContentInputMinWidthRef?.value}
          style={externalSelectStyleRef?.value}
          tabIndex={shouldPickerCanBeFocused.value ? 0 : undefined}
          showPopoverContentOnly={props.showPopoverContentOnly}
          hideContentInnerWhenEmpty={true}
          onClick={handleClick}
          onClear={handleClear}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInputFocus={handleInputFocus}
          onInputBlur={handleInputBlur}
          onInput={handleInput}
          onShow={() => (popperVisible.value = true)}
          onHide={() => (popperVisible.value = false)}
          onConfirm={() => {
            handleConfirm();
            emit('confirm');
          }}
          onCancel={handleCancel}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
        >
          {{
            panelEmpty: slots.empty ?? slots.optionEmptyRender,
            panelPrefix: () => (
              <Fragment>
                {slots.panelHeaderRender?.()}
                {props.showTagsInPanel && presetRenderedModelValueTags.value.length > 0 && (
                  <div class={classHelper.e('panel-tags')}>
                    <NScrollbar maxHeight={104}>
                      <NTagGroup collapse={false}>
                        {flattenVNodes(presetRenderedModelValueTags.value)}
                      </NTagGroup>
                    </NScrollbar>
                  </div>
                )}
              </Fragment>
            ),
            panelSuffix: slots.panelFooterRender,
            panelConfirm: slots.dropConfirmRender,
            pickerContainer: slots.selectRender,
            pickerInner: slots.pickerInner,
            pickerOuter: slots.pickerOuter,
            picker: slots.picker,
            panelConfirmLeft: slots.panelConfirmLeft,
            pickerPrefix: () => {
              if (multipleRef.value) {
                if (modelValueSet.value.size > 0) {
                  if (useStatisticRef.value) {
                    return getSelectedOptionsPopoverRender(
                      <span class={new ComponentClassBlock('picker').em('input', 'static-text')}>
                        {showValue.value}
                      </span>,
                      {
                        disabled: !props.statisticShowTooltip,
                        distance: 12,
                      },
                    );
                  } else {
                    return (
                      <NTagGroup
                        ref={tagGroupDomRef}
                        collapse={useCollapse.value}
                        tooltipRenderType="full"
                        collapseUseTooltip={collapseTagsTooltipRef.value}
                        minDisplayed={maxCollapseTagsRef?.value}
                        fillUp={collapseTagsFillUpRef.value}
                        size={sizeRef.value}
                        disabled={isDisabled.value}
                        tooltipShowAfter={tooltipShowAfterRef.value}
                        tooltipHideAfter={tooltipHideAfterRef.value}
                        collapseTagProps={{
                          clickable: false,
                          ...collapsedTagsPropsRef?.value,
                        }}
                      >
                        {{
                          default: () =>
                            props.showTagsInPanel
                              ? flattenVNodes(renderedModelValueTags.value).map(tag =>
                                  cloneVNode(tag, {
                                    closable: false,
                                  }),
                                )
                              : renderedModelValueTags.value,
                          suffix: () => (
                            <NPickerFitContentInput
                              ref={filterInputDomRef}
                              v-show={shouldTagAppendInputExists.value}
                              modelValue={inputValue.value}
                              minWidth={fitContentInputMinWidthRef?.value}
                              onInput={handleInput}
                              onFocus={onTagGroupSuffixInputFocus}
                              onBlur={onTagGroupSuffixInputBlur}
                              onCompositionStart={onCompositionStart}
                              onCompositionEnd={onCompositionEnd}
                            />
                          ),
                        }}
                      </NTagGroup>
                    );
                  }
                }
              } else {
                if (slots.tagRender && modelValueSet.value.size > 0) {
                  const modelValue = modelValueSet.value.values().next().value;
                  const optValue =
                    getOptionDataByValue(modelValue) ?? savedOptions.get(modelValue!);

                  return (
                    <div
                      class={cls(
                        classHelper.em('tag-render', 'single'),
                        classHelper.is(
                          'inputting',
                          inputable.value &&
                            (popperVisible.value ||
                              (showSearchRef.value && (isInputFocus.value || isSelectFocus.value))),
                        ),
                      )}
                    >
                      <div
                        v-show={!inputValue.value}
                        class={classHelper.em('tag-render', 'instance')}
                      >
                        {slots.tagRender?.(
                          optValue ? { ...optValue.props, ...optValue.attrs } : undefined,
                        )}
                      </div>
                      {inputable.value && (
                        <NPickerFitContentInput
                          ref={filterInputDomRef}
                          v-model={inputValue.value}
                          onInput={handleInput}
                          onFocus={onTagGroupSuffixInputFocus}
                          onBlur={onTagGroupSuffixInputBlur}
                          onCompositionStart={onCompositionStart}
                          onCompositionEnd={onCompositionEnd}
                        />
                      )}
                    </div>
                  );
                }
              }

              return undefined;
            },
            default: () => (
              <div class={classHelper.e('panel-content')}>
                {multipleRef.value && useCheckAllRef.value && (
                  <div
                    class={cls(
                      classHelper.e('check-all'),
                      classHelper.is('focus', focusedOptionValue.value === '__checkAll'),
                    )}
                    onClick={toggleCheckAll}
                  >
                    <NCheckbox modelValue={isCheckAll.value} indeterminate={isIndeterminate.value}>
                      <span
                        class={cls(
                          classHelper.e('check-all-label'),
                          classHelper.is('active', isCheckAllTextActive.value),
                        )}
                      >
                        <span class={classHelper.em('check-all-label', 'text')}>
                          {useLocaleLang('select.checkAll').value}
                        </span>

                        {props.useCheckAllCount && (
                          <span class={classHelper.em('check-all-label', 'count')}>
                            ({checkAllCountShowText.value})
                          </span>
                        )}
                      </span>
                    </NCheckbox>
                  </div>
                )}
                {isCreateOptionVisible.value && (
                  <div
                    class={cls(
                      classHelper.e('create-option'),
                      classHelper.is('focus', focusedOptionValue.value === inputValue.value),
                    )}
                    style={{ [cssVariableKey('select-max-line--option')]: optionMaxLinesRef.value }}
                    onClick={onClickCreateOption}
                  >
                    <div class={classHelper.em('create-option', 'prefix')}>
                      {useLocaleLang('select.create').value}
                    </div>
                    <div class={classHelper.em('create-option', 'content')}>{inputValue.value}</div>
                  </div>
                )}
                {optionsRef?.value && useVirtualScrollRef.value ? (
                  <VirtualScrollList ref={virtualScrollListDomRef} onReachBottom={onReachBottom} />
                ) : (
                  <NScrollbar
                    ref={scrollbarDomRef}
                    maxHeight={optionListMaxHeightRef.value}
                    size="small"
                    viewClass={cls(
                      classHelper.em('option-list', 'scrollbar'),
                      classHelper.is('empty', visibleOptions.value.length === 0),
                      classHelper.has('panel-input', useBuildInPanelFilterRef.value),
                    )}
                    onScroll={onScroll}
                    onReachBottom={onReachBottom}
                  >
                    {defaultSlotContent.value}
                    {optionsRef?.value?.map(val => <NOption {...val} />)}
                    {tempCreateOptions.value.map(val => (
                      <NOption value={val} label={val} />
                    ))}
                  </NScrollbar>
                )}
              </div>
            ),
          }}
        </NPicker>
      );
    };
  },
});
