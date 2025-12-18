import type { VNode } from 'vue';
import {
  cloneVNode,
  computed,
  defineComponent,
  Fragment,
  inject,
  nextTick,
  provide,
  ref,
  toRefs,
  watch,
} from 'vue';
import type { LegoComponentInstance, LegoSetupContext } from '@nio-fe/shared';
import {
  cls,
  ComponentClassBlock,
  cssVariableKey,
  flattenVNodes,
  isNil,
  isObject,
  useNamespace,
} from '@nio-fe/shared';
import type { CascaderProps } from './composables/useProps';
import { useCascaderProps } from './composables/useProps';
import type { CascaderEmits } from './composables/useEmits';
import { useCascaderEmits } from './composables/useEmits';
import type { CascaderSlots } from './composables/useSlots';
import { useCascaderSlots } from './composables/useSlots';
import type { CascaderExposes, CascaderPanelsExposes } from './composables/useExposes';
import { useCascaderExposes } from './composables/useExposes';
import NPicker from '~/components/Picker/src/Picker';
import {
  NCascaderChosenOptionListInjectKey,
  NCascaderEmitsInjectKey,
  NCascaderInputStringInjectKey,
  NCascaderIsOutOfLimitInjectKey,
  NCascaderModelValueInjectKey,
  NCascaderModifyOptionChildrenListInjectKey,
  NCascaderOptionListInjectKey,
  NCascaderOptionListMapInjectKey,
  NCascaderPickOptionInjectKey,
  NCascaderPopperVisibleInjectKey,
  NCascaderPresetModelValueInjectKey,
  NCascaderPropsInjectKey,
  NCascaderRegisterVNodeGetterInjectKey,
  NCascaderSlotsInjectKey,
  NCascaderTreeHelperInjectKey,
  NCascaderVisibleOptionsInjectKey,
} from './utils/injectKeys';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import NTag from '~/components/Tag/src/Tag';
import NTagGroup from '~/components/Tag/src/TagGroup';
import useSize from '~/utils/useSize';
import debounce from 'lodash/debounce';
import NPickerFitContentInput from '~/components/Picker/src/components/NPickerFitContentInput';
import useLocaleLang from '~/utils/useLocaleLang';
import {
  NFormItemErrorInjectedKey,
  NFormItemTriggerInjectedKey,
  NFormDisabledInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { isEmpty } from '~/components/Select/src/utils/utils';
import CascaderPanels from './components/CascaderPanels';
import type {
  NCascaderExtendOption,
  NCascaderUuidType,
  NCascaderOption,
  ModelValueType,
  NCascaderFilterFunction,
  ModelValueSingleType,
} from './utils/types';
import {
  getTreeDataOriginData,
  transformModelValue,
  transformUuidToModelValue,
} from './utils/useOptions';
import Tree from '~/utils/useTree/index';
import { nanoid } from 'nanoid';
import type {
  PickerExposes,
  PickerFitContentInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type { TagGroupExposes } from '~/components/Tag/src/composables/useExposes';
import { isEqualLoose } from './utils/utils';
import type { JSX } from 'vue/jsx-runtime';
import useHighlight from './hooks/useHighlight';

export default defineComponent({
  name: `${useNamespace()}Cascader`,
  desc: '当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择',
  components: {
    NPicker,
    NScrollbar,
    NTagGroup,
    NTag,
    NPickerFitContentInput,
    CascaderPanels,
  },
  props: useCascaderProps,
  emits: useCascaderEmits,
  slots: useCascaderSlots,
  exposes: useCascaderExposes,
  setup(
    props: CascaderProps,
    { emit, slots, expose }: LegoSetupContext<CascaderEmits, CascaderSlots, CascaderExposes>,
  ) {
    const classHelper = new ComponentClassBlock('cascader');

    const {
      size,
      collapse: collapseRef,
      collapseTags: collapseTagsRef,
      cascaderStyle: cascaderStyleRef,
      inputStyle: inputStyleRef,
      fieldMap: fieldMappingRef,
      filter: filterRef,
      filterable: filterableRef,
      filterMethod: filterMethodRef,
      filterMaxResult: filterMaxResultRef,
      filterResultSort: filterResultSortRef,
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
      confirm: confirmRef,
      needConfirm: needConfirmRef,
      confirmBtnText: confirmBtnTextRef,
      cancelBtnText: cancelBtnTextRef,
      emptyContent: optionEmptyTextRef,
      emptyText: emptyTextRef,
      collapseTagsTooltip: collapseTagsTooltipRef,
      maxCollapseTags: maxCollapseTagsRef,
      useCheckAllSummary: useCheckAllSummaryRef,
      checkAllSummaryText: checkAllSummaryTextRef,
      collapseTagsFillUp: collapseTagsFillUpRef,
      collapsedTagsProps: collapsedTagsPropsRef,
      dropdownIcon: dropdownIconRef,
      optionMaxLines: optionMaxLinesRef,
      inputStatus: inputStatusRef,
      popperClassName: popperClassNameRef,
      popoverOptions: popoverOptionsRef,
      initialValue: initialValueRef,
      hoverShowDelay: hoverShowDelayRef,
      hoverHideDelay: hoverHideDelayRef,
      useStatistic: useStatisticRef,
      statisticText: statisticTextRef,
      options: optionsRef,
      inputEmitFrequency: inputEmitFrequencyRef,
      showCheckedStrategy: showCheckedStrategyRef,
      checkStrictly: checkStrictlyRef,
      pathSeparator: pathSeparatorRef,
      fitInputWidth: fitInputWidthRef,
      reserveKeyword: reserveKeywordRef,
      tooltipShowAfter: tooltipShowAfterRef,
      tooltipHideAfter: tooltipHideAfterRef,
      fitContentInputMinWidth: fitContentInputMinWidthRef,
    } = toRefs(props);

    /**
     * dom ref
     */
    const pickerDomRef = ref<null | LegoComponentInstance<typeof NPicker, PickerExposes>>(null);
    const filterInputDomRef = ref<null | LegoComponentInstance<
      typeof NPickerFitContentInput,
      PickerFitContentInputExposes
    >>(null);
    const tagGroupDomRef = ref<null | LegoComponentInstance<typeof NTagGroup, TagGroupExposes>>(
      null,
    );
    const cascaderPanelsDomRef = ref<null | LegoComponentInstance<
      typeof CascaderPanels,
      CascaderPanelsExposes
    >>(null);

    /**
     * other ref value
     */
    const sizeRef = useSize(size, 'medium');
    const useCollapse = computed(() => collapseRef?.value ?? collapseTagsRef.value);

    // form-item validate trigger
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    const nFormError = inject(NFormItemErrorInjectedKey, ref(''));
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);

    const isDisabled = computed(() => disabledRef?.value ?? formDisabled?.value ?? false);

    const needConfirm = computed(() =>
      isObject(confirmRef?.value) ? true : (confirmRef?.value ?? needConfirmRef.value),
    );

    const confirmBtnText = computed(
      () =>
        (isObject(confirmRef?.value) ? confirmRef?.value?.enterName : undefined) ??
        confirmBtnTextRef?.value,
    );

    const cancelBtnText = computed(
      () =>
        (isObject(confirmRef?.value) ? confirmRef?.value?.cancelName : undefined) ??
        cancelBtnTextRef?.value,
    );

    const inputValueMerged = computed(() => inputValue.value || panelFilterInputValueRef.value);
    provide(NCascaderInputStringInjectKey, inputValueMerged);

    /**
     * visible deal
     */
    const popperVisible = ref(false);

    provide(NCascaderPopperVisibleInjectKey, popperVisible);

    watch(popperVisible, val => {
      emit('dropdownVisibleChange', val);
      emit('panelVisibleChange', val);
    });

    function manualControlPopperVisible(visible: boolean) {
      if (visible) {
        pickerDomRef.value?.showPopover();
      } else {
        pickerDomRef.value?.hidePopover();
      }
    }

    const isHideInput = computed(() => {
      if (multipleRef.value) {
        if (useStatisticRef.value && modelValueSet.value.size > 0) {
          return false;
        } else if (!useFilter.value) {
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
    const useFilter = computed(() => !!filterRef?.value || filterableRef.value);
    const filterMethod = computed(() => {
      const defaultFilterMethod: NCascaderFilterFunction = (input, paths) => {
        return paths.at(-1)?.label.toLowerCase().includes(input.toLowerCase()) || false;
      };

      if (filterRef?.value) {
        return typeof filterRef?.value === 'boolean'
          ? defaultFilterMethod
          : filterRef?.value.filter;
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

    const filterResultLimit = computed(
      () => (isObject(filterRef?.value) && filterRef?.value.limit) || filterMaxResultRef.value,
    );

    const sortResultMethod = computed(
      () => (isObject(filterRef?.value) && filterRef.value.sort) || filterResultSortRef?.value,
    );

    const inputValue = ref('');
    const inputable = computed(() => useFilter.value);
    const isReadonly = computed(() => !(inputable.value && popperVisible.value));
    const isDuringComposition = ref(false);

    let modifiedType: undefined | boolean = undefined;
    let modifiedOption: undefined | NCascaderExtendOption = undefined;

    function emitSelectOrDeselect() {
      modifiedType
        ? emit('select', modifiedOption?.path, modifiedOption)
        : emit('deselect', modifiedOption?.path, modifiedOption);
    }

    watch(inputValue, val => {
      emit('input', val);
    });

    const visibleOptions = computed(() => {
      let tempVisibleOptions: Array<NCascaderExtendOption> = optionList.value;

      if (!checkStrictlyRef.value) {
        tempVisibleOptions = tempVisibleOptions.filter(item => item.isLeaf);
      }

      if (useFilter.value && inputValue.value) {
        tempVisibleOptions = tempVisibleOptions.filter(option =>
          filterMethod.value?.(
            inputValue.value.trim(),
            option.paths.map(option => ({
              label: option.fullPathLabel,
              value: option.value,
              option,
            })),
          ),
        );
      }

      if (panelFilterOptionRef.value) {
        tempVisibleOptions = tempVisibleOptions.filter(option =>
          filterMethod.value?.(
            useBuildInPanelFilterRef.value
              ? inputValue.value
              : panelFilterInputValueRef.value.trim(),
            option.paths.map(option => ({
              label: option.fullPathLabel,
              value: option.value,
              option,
            })),
          ),
        );
      }

      if (sortResultMethod.value) {
        tempVisibleOptions.sort((a, b) => sortResultMethod.value!(a, b, inputValueMerged.value));
      }

      return tempVisibleOptions.slice(0, filterResultLimit.value);
    });

    provide(NCascaderVisibleOptionsInjectKey, visibleOptions);

    const handleInput = (evt: Event) => {
      const target = (evt.composedPath?.()?.[0] ?? evt.target) as HTMLInputElement;
      delInputDebounced(target.value);
    };

    const delInput = (value: string, controlPopperVisible = true) => {
      inputValue.value = value;

      nextTick(() => {
        if (!popperVisible.value && controlPopperVisible) {
          manualControlPopperVisible(true);
        }
      });
    };

    const delInputDebounced = debounce(delInput, inputEmitFrequencyRef.value);

    function onCompositionStart() {
      isDuringComposition.value = true;
    }

    function onCompositionEnd() {
      isDuringComposition.value = false;
    }

    function onTagGroupSuffixInputFocus(evt: FocusEvent) {
      pickerDomRef.value?.handleInputFocus(evt);
    }

    function onTagGroupSuffixInputBlur(evt: FocusEvent) {
      if (
        evt.relatedTarget &&
        !pickerDomRef.value?.wrapperDom().contains(evt.relatedTarget) &&
        !pickerDomRef.value?.popoverDom().contains(evt.relatedTarget)
      ) {
        manualControlPopperVisible(false);
      }

      pickerDomRef.value?.handleInputBlur(evt);
    }

    function handleClear() {
      if (multipleRef.value) {
        for (const value of Array.from(modelValueSet.value.values())) {
          const option = optionListMap.value.get(value);
          if (
            !option?.disabled &&
            (checkStrictlyRef.value || (!checkStrictlyRef.value && !option?.passingDisabled))
          ) {
            modelValueSet.value.delete(value);
          }
        }
      } else {
        modelValueSet.value.clear();
      }

      delInput('', false);
      emit('clear');
    }

    const isCascaderFocus = ref(false);
    const isInputFocus = ref(false);

    function handleInputFocus() {
      isInputFocus.value = true;
    }

    function handleInputBlur() {
      isInputFocus.value = false;
    }

    function handleFocus() {
      isCascaderFocus.value = true;
      emit('focus');
    }

    function handleBlur() {
      isCascaderFocus.value = false;
      emit('blur');

      nextTick(() => {
        formItemTrigger?.('blur');
      });
    }

    function focusInput() {
      filterInputDomRef.value?.focus();
      pickerDomRef.value?.focus();
    }

    function judgeWhetherInputCanFocus() {
      void nextTick(() => {
        if (
          (inputable.value || ((multipleRef.value || confirmRef?.value) ?? needConfirmRef.value)) &&
          popperVisible.value
        ) {
          void nextTick(() => {
            focusInput();
          });
        }
      });
    }

    function handleClick(evt: MouseEvent) {
      judgeWhetherInputCanFocus();
      emit('click', evt);
    }

    /**
     * collect options
     */
    const optionList = ref<NCascaderExtendOption[]>([]);
    const optionListMap = ref(new Map<NCascaderUuidType, NCascaderExtendOption>());
    provide(NCascaderOptionListInjectKey, optionList);
    provide(NCascaderOptionListMapInjectKey, optionListMap);
    provide(
      NCascaderChosenOptionListInjectKey,
      computed(() =>
        Array.from(presetModelValueSet.value.values())
          .map(uuid => optionListMap.value.get(uuid))
          .filter(item => !!item),
      ),
    );

    provide(NCascaderRegisterVNodeGetterInjectKey, (uuid, getter) => {
      const target = optionListMap.value.get(uuid);

      if (target) {
        target.vNodeGetter = getter;
      }
    });

    function modifyOptionChildrenList(node: NCascaderExtendOption, children: NCascaderOption[]) {
      const tempInstance = new Tree(
        children,
        fieldMappingRef?.value ?? {},
        option => (!!option.groupLabel ? nanoid() : option.path.join(' / ')),
        node,
        node.level + 1,
      );

      node.children = children;
      node.transformedChildren = tempInstance.transformedTreeData.value;

      tempInstance.flattenTreeData.value.forEach(data => {
        optionListMap.value.set(data._uuid as string, data);
      });

      emit('update:options', getTreeDataOriginData(Array.from(optionListMap.value.values())));
    }

    provide(NCascaderModifyOptionChildrenListInjectKey, modifyOptionChildrenList);

    const tree = new Tree<NCascaderOption, NCascaderExtendOption>(
      optionsRef.value,
      fieldMappingRef?.value ?? {},
      option => (!!option.groupLabel ? nanoid() : option.path.join(' / ')),
    );

    provide(NCascaderTreeHelperInjectKey, tree);

    watch(
      optionsRef,
      val => {
        if (val) {
          tree.setTreeData(val);
          optionList.value = tree.flattenTreeData.value;
          optionListMap.value = tree.flattenTreeDataMapping.value as Map<
            string,
            NCascaderExtendOption
          >;
        } else {
          optionListMap.value.clear();
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    /**
     * model value collect
     */
    const modelValue = ref<ModelValueType>();
    const modelValueSet = ref(new Set<NCascaderUuidType>());
    const presetModelValueSet = ref(new Set<NCascaderUuidType>());

    const isOutOfLimit = computed(() =>
      multipleRef.value ? multipleLimitRef.value <= presetModelValueSet.value.size : false,
    );

    watch(
      modelValue,
      newValue => {
        if (!isEqualLoose(newValue, modelValueRef?.value)) {
          emit('update:modelValue', newValue);
          emit('modify', newValue, modifiedType, modifiedOption);

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
      const transformedValue: (string | number)[][] = Array.from(modelValueSet.value.values()).map(
        uuid => {
          const target = tree.flattenTreeDataMapping.value.get(uuid);

          return target ? target.path : uuid.toString().split(' / ');
        },
      );

      const value = multipleRef.value ? transformedValue : transformedValue[0];

      if (isEmpty(value)) {
        modelValue.value = initialValueRef.value as Exclude<CascaderProps['initialValue'], symbol>;
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

    function getShowLabel(uuid: NCascaderUuidType) {
      const option = optionListMap.value.get(uuid);

      if (showCheckedStrategyRef.value === 'fullPath') {
        return (
          option?.uuidPath
            .map(uuid => {
              const target = optionListMap.value.get(uuid as string);

              return target?.stringLabel ?? (target?.label as string as string) ?? '';
            })
            .join(` ${pathSeparatorRef.value} `) ?? uuid
        );
      } else {
        return (
          option?.stringLabel ??
          (option?.label as string) ??
          uuid.toString().split(' / ').at(-1) ??
          ''
        );
      }
    }

    // in order to prevent optionList changed after the showValue is empty
    let prevSelectedValue: NCascaderUuidType | null = null;
    let prevSelectedLabel: string = '';

    const showValue = computed(() => {
      if (props.multiple) {
        if (useStatisticRef.value && modelValueSet.value.size > 0) {
          return statisticTextRef?.value
            ? `${statisticTextRef?.value} (${modelValueSet.value.size})`
            : modelValueSet.value.size <= 1
              ? (useLocaleLang('cascader.statistic').value as string)
              : `${useLocaleLang('cascader.statistics').value} (${modelValueSet.value.size})`;
        } else if (inputable.value && inputValue.value && modelValueSet.value.size === 0) {
          return inputValue.value;
        } else {
          return modelValueSet.value.size > 0 ? ' ' : '';
        }
      } else {
        if (inputable.value && inputValue.value && modelValueSet.value.size === 0) {
          return inputValue.value;
        } else {
          const value = modelValueSet.value.values().next().value as NCascaderUuidType;
          const option = optionListMap.value.get(value);

          if (!option) {
            if (value === prevSelectedValue) {
              return prevSelectedLabel;
            } else {
              return showCheckedStrategyRef.value === 'fullPath'
                ? value
                : (value?.toString().split(' / ').at(-1) ?? value);
            }
          }

          prevSelectedValue = value;
          prevSelectedLabel = getShowLabel(value).toString();

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
      }

      if (inputable.value && multipleRef.value) {
        void nextTick(() => {
          tagGroupDomRef.value?.doCollapseCalculate();
        });
      }
    });

    function pickOption(
      uuid: NCascaderUuidType,
      singleChooseHide = true,
      forcePick = false,
      emitChange = true,
      singlePickToClear = false,
    ) {
      let hasChangedValue = false;

      const optionData = optionListMap.value.get(uuid);

      modifiedOption = optionData;

      if (optionData?.disabled || (!checkStrictlyRef.value && optionData?.passingDisabled)) return;

      if (optionData?.selectable === false) return;

      // 父节点 + 父子级关联：自己不可以直接被勾选，只能更改子节点状态从而改变自身
      // 但需要抛出 change 事件
      if (optionData && !optionData?.isLeaf && !checkStrictlyRef.value) {
        return;
      }

      if (multipleRef.value) {
        if (presetModelValueSet.value.has(uuid)) {
          presetModelValueSet.value.delete(uuid);
          modifiedType = false;
          hasChangedValue = true;

          if (!reserveKeywordRef.value) {
            delInput('');
          }
        } else {
          if (isOutOfLimit.value) {
            return;
          }

          presetModelValueSet.value.add(uuid);
          modifiedType = true;
          hasChangedValue = true;

          if (!reserveKeywordRef.value || reserveKeywordRef.value === 'reserve-deselect') {
            delInput('');
          }
        }
      } else {
        if (singlePickToClear) {
          hasChangedValue = true;
          if (presetModelValueSet.value.has(uuid)) {
            modifiedType = false;
            presetModelValueSet.value.delete(uuid);
          } else {
            modifiedType = true;
            presetModelValueSet.value.add(uuid);
          }
        } else {
          modifiedType = true;

          if (!presetModelValueSet.value.has(uuid)) {
            hasChangedValue = true;
            presetModelValueSet.value = new Set([uuid]);
          }
        }
      }

      if (!(confirmRef?.value ?? needConfirmRef.value) || forcePick) {
        confirmHandle(multipleRef.value ? false : singleChooseHide);
      }

      judgeWhetherInputCanFocus();

      if (emitChange && hasChangedValue) {
        emit('change', modifiedType, optionData);
      }

      setTimeout(() => {
        tagGroupDomRef.value?.doCollapseCalculate();
      }, 500);
    }

    function confirmHandle(hidePopper = true, isTriggerByConfirmClick = false) {
      modelValueSet.value = new Set(presetModelValueSet.value.values());

      hidePopper && manualControlPopperVisible(false);

      if (!hidePopper) {
        judgeWhetherInputCanFocus();
      }

      emitSelectOrDeselect();

      if (isTriggerByConfirmClick) {
        emit(
          'confirmEnter',
          transformUuidToModelValue(
            Array.from(presetModelValueSet.value.values()),
            multipleRef.value,
          ),
        );
        emit(
          'confirm',
          transformUuidToModelValue(
            Array.from(presetModelValueSet.value.values()),
            multipleRef.value,
          ),
        );
      }
    }

    function cancelHandle() {
      manualControlPopperVisible(false);
      emit(
        'confirmCancel',
        transformUuidToModelValue(
          Array.from(presetModelValueSet.value.values()),
          multipleRef.value,
        ),
      );
      emit(
        'cancel',
        transformUuidToModelValue(
          Array.from(presetModelValueSet.value.values()),
          multipleRef.value,
        ),
      );
    }

    watch(checkStrictlyRef, val => {
      if (!val) {
        modelValueSet.value.forEach((uuid, _, set) => {
          const option = optionListMap.value.get(uuid);

          if (option && !option.isLeaf) {
            set.delete(option._uuid as string);
          }
        });
      }
    });

    watch([optionList, checkStrictlyRef, isDisabled, useCheckAllSummaryRef], () => {
      resetRenderedTags();
    });

    provide(NCascaderModelValueInjectKey, modelValueSet);
    provide(NCascaderPresetModelValueInjectKey, presetModelValueSet);
    provide(NCascaderPickOptionInjectKey, pickOption);
    provide(NCascaderIsOutOfLimitInjectKey, isOutOfLimit);

    const renderedModelValueTags = ref<Array<VNode | JSX.Element>>([]);
    const presetRenderedModelValueTags = ref<Array<VNode | JSX.Element>>([]);
    // To prevent optionList changes that cause already selected options to fail to render
    const prevRenderedModelValueTags = new Map<NCascaderUuidType, VNode | JSX.Element>();

    function getShouldRenderedTags(fromValueSet: Set<NCascaderUuidType> = modelValueSet.value) {
      return Array.from(fromValueSet.values())
        .map(uuid => {
          const option = optionListMap.value.get(uuid);

          if (!option) {
            return (
              prevRenderedModelValueTags.get(uuid) ?? (
                <NTag
                  clickable={false}
                  closable={true}
                  disabled={isDisabled.value}
                  tooltip={{ toBody: false }}
                  onClose={() => pickOption(uuid, true, true, true, true)}
                >
                  {getShowLabel(uuid)}
                </NTag>
              )
            );
          }

          const res = slots.tagRender?.({ ...option, label: option.fullPathLabel }) ?? (
            <NTag
              clickable={false}
              closable={
                !option?.disabled &&
                !isDisabled.value &&
                (checkStrictlyRef.value || (!checkStrictlyRef.value && !option.passingDisabled))
              }
              disabled={option?.disabled || isDisabled.value}
              tooltip={{ toBody: false }}
              onClose={() => pickOption(uuid, true, true, true, true)}
            >
              {getShowLabel(uuid)}
            </NTag>
          );

          prevRenderedModelValueTags.set(uuid, res as VNode | JSX.Element);

          return res;
        })
        .filter(curr => !!curr) as Array<VNode | JSX.Element>;
    }

    function resetRenderedTags() {
      if (
        useCheckAllSummaryRef.value &&
        optionListMap.value.size > 0 &&
        (checkStrictlyRef.value
          ? Array.from(optionListMap.value.keys()).every(uuid => modelValueSet.value.has(uuid))
          : Array.from(optionListMap.value.entries()).every(
              ([uuid, node]) => !node.isLeaf || (node.isLeaf && modelValueSet.value.has(uuid)),
            ))
      ) {
        renderedModelValueTags.value = [
          <NTag clickable={false} closable={true} disabled={isDisabled.value} onClose={handleClear}>
            {checkAllSummaryTextRef?.value ?? useLocaleLang('select.all', 'All').value}
          </NTag>,
        ] as Array<VNode>;
        return;
      }

      renderedModelValueTags.value = getShouldRenderedTags();

      // remove selected option in prevRenderedModelValueTags
      for (const optValue of prevRenderedModelValueTags.keys()) {
        if (!modelValueSet.value.has(optValue)) {
          prevRenderedModelValueTags.delete(optValue);
        }
      }
    }

    watch(
      () => modelValueRef?.value,
      val => {
        if (isNil(val)) {
          modelValueSet.value.clear();
        } else {
          modelValueSet.value = new Set(transformModelValue(val));
        }
      },
      {
        immediate: true,
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

    const panelStatus = computed(() => {
      if (
        (visibleOptions.value.length === 0 && !!inputValueMerged.value) ||
        optionsRef.value.length === 0
      ) {
        return 'empty';
      }

      return 'normal';
    });

    useHighlight();

    /**
     * normal provide
     */
    provide(NCascaderPropsInjectKey, props);
    provide(NCascaderEmitsInjectKey, emit);
    provide(NCascaderSlotsInjectKey, slots);

    expose({
      confirmHandle,
      cancelHandle,
      enterHandle: confirmHandle,
      exposeConfirm: {
        enterHandle: confirmHandle,
        cancelHandle,
        confirmHandle,
      },
      setInputAble: focusInput,
      changePanelVisible: manualControlPopperVisible,
      focusOption: (valuePath: ModelValueSingleType[]) =>
        cascaderPanelsDomRef.value?.focusOption(valuePath),
      inputChange: (value: string | null) => {
        inputValue.value = value || '';
      },
      clear: handleClear,
      renderedModelValueTags,
      focus: () => {
        pickerDomRef.value?.focus();
      },
      blur: () => {
        pickerDomRef.value?.forceBlur();
      },
    });

    return () => (
      <NPicker
        ref={pickerDomRef}
        size={sizeRef.value}
        modelValue={showValue.value?.toString?.()}
        hideInput={isHideInput.value}
        class={cls(classHelper.block, classHelper.is('inputable', inputable.value))}
        inputable={!isReadonly.value}
        inputIsSearching={useFilter.value}
        inputStatus={!!nFormError?.value ? 'error' : inputStatusRef.value}
        disabled={isDisabled.value}
        clearable={clearableRef.value}
        trigger={triggerRef.value}
        placement={placementRef.value}
        toBody={toBodyRef.value}
        placeholder={
          placeholderRef?.value ?? (useLocaleLang('cascader.placeholder').value as string)
        }
        needConfirm={needConfirm.value}
        confirmButtonText={confirmBtnText.value}
        cancelButtonText={cancelBtnText.value}
        emptyText={optionEmptyTextRef?.value ?? emptyTextRef?.value}
        hoverShowDelay={hoverShowDelayRef.value}
        hoverHideDelay={hoverHideDelayRef.value}
        inputStyle={
          cascaderStyleRef?.value
            ? cascaderStyleRef.value === 'noborder'
              ? 'no-border'
              : cascaderStyleRef.value
            : inputStyleRef.value
        }
        panelStatus={panelStatus.value}
        modelValueRegardAsPlaceholder={
          !multipleRef.value && inputable.value && modelValueSet.value.size > 0
        }
        dropdownIcon={dropdownIconRef?.value}
        panelClass={popperClassNameRef?.value}
        popoverOptions={popoverOptionsRef?.value}
        useFitContentInput={true}
        usePanelInput={useBuildInPanelFilterRef.value}
        panelInputPlaceholder={
          panelInputPlaceholderRef?.value ??
          (useLocaleLang('cascader.pleaseSearch').value as string)
        }
        fitInputWidth={
          !!inputValueMerged.value
            ? fitInputWidthRef.value
            : panelStatus.value === 'empty'
              ? true
              : 'fit-content'
        }
        fitContentInputMinWidth={fitContentInputMinWidthRef?.value}
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
        onConfirm={() => confirmHandle(true, true)}
        onCancel={cancelHandle}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      >
        {{
          panelEmpty: slots.empty ?? slots.emptyRender ?? slots.optionEmptyRender,
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
          panelConfirmLeft: slots.panelConfirmLeft,
          panelSuffix: slots.panelFooterRender,
          panelConfirm: slots.confirmRender,
          picker: slots.selectRender,
          pickerOuter: slots.default
            ? () => slots.default?.({ visible: popperVisible })
            : undefined,
          pickerPrefix: () => {
            if (multipleRef.value) {
              if (modelValueSet.value.size > 0) {
                return (
                  !useStatisticRef.value && (
                    <NTagGroup
                      ref={tagGroupDomRef}
                      class={classHelper.em('tag-group', 'normal', !!slots.tagRender)}
                      collapse={useCollapse.value}
                      tooltipRenderType="full"
                      collapseUseTooltip={collapseTagsTooltipRef.value}
                      minDisplayed={maxCollapseTagsRef?.value}
                      fillUp={collapseTagsFillUpRef.value}
                      size={sizeRef.value}
                      tooltipShowAfter={tooltipShowAfterRef.value}
                      tooltipHideAfter={tooltipHideAfterRef.value}
                      collapseTagProps={{
                        clickable: false,
                        ...collapsedTagsPropsRef?.value,
                      }}
                      popperInnerClass={classHelper.em('tag-group', 'popper')}
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
                            v-show={
                              multipleRef.value &&
                              modelValueSet.value.size > 0 &&
                              inputable.value &&
                              popperVisible.value
                            }
                            v-model={inputValue.value}
                            minWidth={fitContentInputMinWidthRef?.value}
                            onInput={handleInput}
                            onFocus={onTagGroupSuffixInputFocus}
                            onBlur={onTagGroupSuffixInputBlur}
                            onCompositionStart={onCompositionStart}
                            onCompositionEnd={onCompositionEnd}
                          />
                        ),
                        append: () => (
                          <input
                            class={cls(classHelper.is('input-placeholder'))}
                            tabindex="0"
                            unselectable="on"
                            onFocus={onTagGroupSuffixInputFocus}
                            onBlur={onTagGroupSuffixInputBlur}
                          />
                        ),
                      }}
                    </NTagGroup>
                  )
                );
              }
            } else {
              if (slots.tagRender && modelValueSet.value.size > 0) {
                const option = optionListMap.value.get(modelValueSet.value.values().next().value!);

                return option
                  ? slots.tagRender?.({ ...option, label: option.fullPathLabel })
                  : undefined;
              }
            }

            return undefined;
          },
          default: () => (
            <div class={classHelper.e('panel-content')}>
              <CascaderPanels
                ref={cascaderPanelsDomRef}
                inputValue={inputValue.value}
                isFocusing={isCascaderFocus.value}
                duringInput={!!inputValueMerged.value}
                onSwitchPanelStatus={status => manualControlPopperVisible(status)}
                onConfirm={confirmHandle}
                style={{ [cssVariableKey('cascader-max-line--item')]: optionMaxLinesRef.value }}
              />
            </div>
          ),
        }}
      </NPicker>
    );
  },
});
