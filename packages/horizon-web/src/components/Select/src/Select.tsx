import {
  defineComponent,
  inject,
  provide,
  ref,
  shallowRef,
  cloneVNode,
  Fragment,
  toRef,
} from 'vue';
import {
  ComponentClassBlock,
  cls,
  useNamespace,
  cssVariableKey,
  flattenVNodes,
} from '@aurora/utils';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import { useSelectProps } from './composables/useProps';
import { useSelectEmits } from './composables/useEmits';
import { useSelectSlots } from './composables/useSlots';
import { useSelectExposes } from './composables/useExposes';
import type { SelectProps } from './composables/useProps';
import type { SelectEmits } from './composables/useEmits';
import type { SelectSlots } from './composables/useSlots';
import type { SelectExposes, SelectVirtualScrollListExposes } from './composables/useExposes';
import HPicker from '~/components/Picker/src/Picker';
import {
  HSelectEmitsInjectKey,
  HSelectPropsInjectKey,
  HSelectSlotsInjectKey,
} from './utils/injectKeys';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import HTagGroup from '~/components/Tag/src/TagGroup';
import useSize from '~/utils/useSize';
import HPickerFitContentInput from '~/components/Picker/src/components/PickerFitContentInput';
import HCheckbox from '~/components/Checkbox/src/Checkbox';
import useLocaleLang from '~/utils/useLocaleLang';
import HOption from './Option';
import { HFormItemErrorInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import VirtualScrollList from './components/VirtualScrollList';
import type {
  PickerExposes,
  PickerFitContentInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type { ScrollbarExposes } from '~/components/Scrollbar/src/composables/useExposes';
import useCheckAll from './hooks/useCheckAll';
import type { TagGroupExposes } from '~/components/Tag/src/composables/useExposes';
import useInput from './hooks/useInput';
import useOption from './hooks/useOption';
import useData from './hooks/useData';
import useTagRender from './hooks/useTagRender';
import usePanel from './hooks/usePanel';
import useCompatibleProp from './hooks/useCompatibleProp';
import useEvents from './hooks/useEvents';
import useDataProcess from './hooks/useDataProcess';
import useConfirm from './hooks/useConfirm';
import type { SelectDomRefs } from './utils/types';
import useExposes from './hooks/useExposes';
import useHighlight from './hooks/useHighlight';

export default defineComponent({
  name: `${useNamespace()}Select`,
  desc: '当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项',
  props: useSelectProps,
  emits: useSelectEmits,
  slots: useSelectSlots,
  exposes: useSelectExposes,
  setup(props: SelectProps, context: HorizonWebSetupContext<SelectEmits, SelectSlots, SelectExposes>) {
    const classHelper = new ComponentClassBlock('select');

    /**
     * dom ref
     */
    const domRefs: SelectDomRefs = {
      pickerDomRef: ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes>>(),
      scrollbarDomRef: ref<HorizonWebComponentInstance<typeof HScrollbar, ScrollbarExposes>>(),
      filterInputDomRef:
        ref<HorizonWebComponentInstance<typeof HPickerFitContentInput, PickerFitContentInputExposes>>(),
      tagGroupDomRef: ref<HorizonWebComponentInstance<typeof HTagGroup, TagGroupExposes>>(),
      virtualScrollListDomRef:
        ref<HorizonWebComponentInstance<typeof VirtualScrollList, SelectVirtualScrollListExposes>>(),
    };

    const {
      needConfirm,
      useCollapse,
      isDisabled,
      isFilterable,
      isInputable,
      confirmButtonText,
      cancelButtonText,
      emptyText,
      inputStyle,
      dropdownIcon,
      panelStyle,
      loading,
      panelClass,
    } = useCompatibleProp(props);

    const size = toRef(props, 'size');
    const sizeRef = useSize(size, 'medium');

    // form-item validate trigger
    const nFormError = inject(HFormItemErrorInjectedKey, undefined);

    function setPopperVisible(visible: boolean) {
      if (visible) {
        domRefs.pickerDomRef.value?.show();
      } else {
        domRefs.pickerDomRef.value?.hide();

        setTimeout(() => {
          domRefs.filterInputDomRef.value?.blur();
          domRefs.pickerDomRef.value?.blur();
        });
      }
    }

    const {
      modelValueSet,
      presetModelValueSet,
      inputValue,
      filterInputValue,
      popperVisible,
      focusedOptionValue,
      renderedModelValueTags,
      changeIsAddValue,
      emitChange,
      optionsMap,
      prevOptionValue,
      isModelValueSetHasValue,
      modelValueSetDeleteValue,
      reserveNumberOfModelValues,
    } = useData(props, context);

    const {
      isCreateOptionVisible,
      isInputShouldHide,
      filterMethod,
      judgeWhetherInputCanFocus,
      delInput,
      delInputDebounced,
      focusInput,
    } = useInput(props, context, {
      domRefs,
      inputValue,
      filterInputValue,
      popperVisible,
      optionsMap,
      focusedOptionValue,
      modelValueSet,
      renderedModelValueTags,
      isFilterable,
      isInputable,
      emitChange,
      changeIsAddValue,
      setPopperVisible,
    });

    const { handleConfirm, handleCancel } = useConfirm(props, context, {
      modelValueSet,
      presetModelValueSet,
      prevOptionValue,
      setPopperVisible,
      judgeWhetherInputCanFocus,
    });

    const {
      visibleOptions,
      getOptionDataByValue,
      pickOption,
      tempCreateOptions,
      onClickCreateOption,
      focusOnFirstModelValue,
      getAllOptionsInDom,
      savedOptions,
    } = useOption(props, context, {
      domRefs,
      optionsMap,
      focusedOptionValue,
      prevOptionValue,
      isFilterable,
      filterMethod,
      filterInputValue,
      inputValue,
      modelValueSet,
      presetModelValueSet,
      changeIsAddValue,
      isDisabled,
      isModelValueSetHasValue,
      modelValueSetDeleteValue,
      handleConfirm,
      setPopperVisible,
      delInput,
      judgeWhetherInputCanFocus,
    });

    const {
      inputDisplayValue,
      panelStatus,
      prevScrollTop,
      shouldPickerCanBeFocused,
      getFormattedModelValue,
    } = usePanel(props, context, {
      domRefs,
      popperVisible,
      modelValueSet,
      presetModelValueSet,
      inputValue,
      filterInputValue,
      isInputable,
      focusedOptionValue,
      visibleOptions,
      focusOnFirstModelValue,
      judgeWhetherInputCanFocus,
      getOptionDataByValue,
    });

    const {
      isCheckAll,
      isIndeterminate,
      checkAllCountShowText,
      isCheckAllTextActive,
      toggleCheckAll,
    } = useCheckAll(props, {
      optionsMap,
      visibleOptions,
      presetModelValueSet,
      needConfirm,
      handleConfirm,
    });

    const {
      handleClick,
      handleClear,
      handleFocus,
      handleBlur,
      handleInputFocus,
      handleInputBlur,
      handleInput,
      onCompositionStart,
      onCompositionEnd,
      onReachBottom,
      onScroll,
      isSelectFocus,
      isInputFocus,
      onTagGroupSuffixInputFocus,
      onTagGroupSuffixInputBlur,
    } = useEvents(props, context, {
      domRefs,
      inputValue,
      isInputable,
      filterInputValue,
      modelValueSet,
      presetModelValueSet,
      prevOptionValue,
      prevScrollTop,
      optionsMap,
      visibleOptions,
      isDisabled,
      focusedOptionValue,
      isCreateOptionVisible,
      getOptionDataByValue,
      pickOption,
      toggleCheckAll,
      onClickCreateOption,
      popperVisible,
      setPopperVisible,
      changeIsAddValue,
      emitChange,
      judgeWhetherInputCanFocus,
      getAllOptionsInDom,
      delInput,
      delInputDebounced,
    });

    const {
      presetRenderedModelValueTags,
      resetRenderedTags,
      shouldTagAppendInputExists,
      getSelectedOptionsPopoverRender,
    } = useTagRender(props, context, {
      domRefs,
      renderedModelValueTags,
      sizeRef,
      modelValueSet,
      presetModelValueSet,
      optionsMap,
      getOptionDataByValue,
      isDisabled,
      isInputable,
      handleClear,
      pickOption,
      getFormattedModelValue,
    });

    useDataProcess(props, context, {
      modelValueSet,
      presetModelValueSet,
      resetRenderedTags,
      getFormattedModelValue,
      reserveNumberOfModelValues,
      emitChange,
    });

    useExposes(context, {
      handleConfirm,
      handleCancel,
      focusInput,
      manualControlPopperVisible: setPopperVisible,
      focusedOptionValue,
      handleClear,
      renderedModelValueTags,
      domRefs,
    });

    /**
     * highlight
     */
    useHighlight();

    /**
     * normal provide
     */
    provide(HSelectPropsInjectKey, props);
    provide(HSelectEmitsInjectKey, context.emit);
    provide(HSelectSlotsInjectKey, context.slots);

    // Because of when jsx mode on, the default options can't be mounted correctly. (VUE bug)
    // So SELECT should render slots to a shallowRef value to correct the behavior.
    const defaultSlotContent = shallowRef();
    function renderDefaultSlot(slots: HorizonWebSetupContext<{}, SelectSlots>['slots']) {
      defaultSlotContent.value = slots.default?.();
    }

    return () => {
      renderDefaultSlot(context.slots);
      return (
        <HPicker
          ref={domRefs.pickerDomRef}
          size={sizeRef.value}
          modelValue={inputDisplayValue.value}
          hideInput={isInputShouldHide.value}
          class={cls(
            classHelper.block,
            props.externalSelectClass,
            classHelper.has('check-all', props.useCheckAll),
            classHelper.is('inputable', isInputable.value),
          )}
          inputable={isInputable.value}
          inputIsSearching={isFilterable.value || props.showSearch}
          inputStatus={!!nFormError?.value ? 'error' : props.inputStatus}
          disabled={isDisabled.value}
          clearable={props.clearable}
          trigger={props.trigger}
          placement={props.placement}
          toBody={props.toBody}
          placeholder={props.placeholder}
          popperCanBeDisplayed={
            props.showSearch && props.hidePanelWhenShowSearchAndEmptyList
              ? optionsMap.size > 0 || !!filterInputValue.value
              : true
          }
          needConfirm={needConfirm.value}
          confirmButtonText={confirmButtonText.value}
          cancelButtonText={cancelButtonText.value}
          emptyText={emptyText.value}
          destroyOnHide={props.destroyOnHide}
          fitInputWidth={props.fitInputWidth}
          hoverShowDelay={props.hoverShowDelay}
          hoverHideDelay={props.hoverHideDelay}
          inputStyle={inputStyle.value}
          panelStatus={panelStatus.value}
          modelValueRegardAsPlaceholder={
            !props.multiple && isInputable.value && modelValueSet.value.size > 0
          }
          dropdownIcon={dropdownIcon.value}
          panelStyle={panelStyle.value}
          panelClass={[panelClass.value, classHelper.e('panel')]}
          loading={loading.value}
          loadingText={props.optionLoadingText}
          popoverOptions={props.popoverOptions}
          useFitContentInput={true}
          usePanelInput={props.useBuildInPanelFilter}
          panelInputPlaceholder={
            props.panelInputPlaceholder ?? (useLocaleLang('select.pleaseSearch').value as string)
          }
          searchIcon={props.searchIcon}
          fitContentInputMinWidth={props.fitContentInputMinWidth}
          style={props.externalSelectStyle}
          tabIndex={shouldPickerCanBeFocused.value ? 0 : undefined}
          showPopoverContentOnly={props.showPopoverContentOnly}
          hideContentInnerWhenEmpty={true}
          data-temp={renderedModelValueTags.value.length}
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
            context.emit('confirm');
          }}
          onCancel={handleCancel}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
        >
          {{
            panelEmpty: context.slots.empty ?? context.slots.optionEmptyRender,
            panelPrefix: () => (
              <Fragment>
                {context.slots.panelHeaderRender?.()}
                {props.showTagsInPanel && presetRenderedModelValueTags.value.length > 0 && (
                  <div class={classHelper.e('panel-tags')}>
                    <HScrollbar maxHeight={104}>
                      <HTagGroup collapse={false}>
                        {flattenVNodes(presetRenderedModelValueTags.value)}
                      </HTagGroup>
                    </HScrollbar>
                  </div>
                )}
              </Fragment>
            ),
            panelSuffix: context.slots.panelFooterRender,
            panelConfirm: context.slots.dropConfirmRender,
            pickerContainer: context.slots.selectRender,
            pickerOuter: context.slots.pickerOuter,
            picker: context.slots.picker,
            panelConfirmLeft: context.slots.panelConfirmLeft,
            default: () => (
              <div class={classHelper.e('panel-content')}>
                {props.multiple && props.useCheckAll && (
                  <div
                    class={cls(
                      classHelper.e('check-all'),
                      classHelper.is('focus', focusedOptionValue.value === '__checkAll'),
                    )}
                    onClick={toggleCheckAll}
                  >
                    <HCheckbox modelValue={isCheckAll.value} indeterminate={isIndeterminate.value}>
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
                    </HCheckbox>
                  </div>
                )}
                {isCreateOptionVisible.value && (
                  <div
                    class={cls(
                      classHelper.e('create-option'),
                      classHelper.is('focus', focusedOptionValue.value === inputValue.value),
                    )}
                    style={{ [cssVariableKey('select-max-line--option')]: props.optionMaxLines }}
                    onClick={onClickCreateOption}
                  >
                    <div class={classHelper.em('create-option', 'prefix')}>
                      {useLocaleLang('select.create').value}
                    </div>
                    <div class={classHelper.em('create-option', 'content')}>{inputValue.value}</div>
                  </div>
                )}
                {props.options && props.useVirtualScroll ? (
                  <VirtualScrollList
                    ref={domRefs.virtualScrollListDomRef}
                    class={classHelper.is(
                      'hidden',
                      visibleOptions.value.length === 0 && tempCreateOptions.value.length === 0,
                    )}
                    onReachBottom={onReachBottom}
                  />
                ) : (
                  <HScrollbar
                    ref={domRefs.scrollbarDomRef}
                    maxHeight={props.optionListMaxHeight}
                    size="small"
                    class={classHelper.is(
                      'hidden',
                      visibleOptions.value.length === 0 && tempCreateOptions.value.length === 0,
                    )}
                    viewClass={cls(
                      classHelper.em('option-list', 'scrollbar'),
                      classHelper.is('empty', visibleOptions.value.length === 0),
                      classHelper.has('panel-input', props.useBuildInPanelFilter),
                    )}
                    onScroll={onScroll}
                    onReachBottom={onReachBottom}
                  >
                    {defaultSlotContent.value}
                    {props.options?.map(val => <HOption {...val} />)}
                    {tempCreateOptions.value.map(val => (
                      <HOption value={val} label={val} />
                    ))}
                  </HScrollbar>
                )}
              </div>
            ),
            pickerInner:
              context.slots.pickerInner?.() ??
              (props.multiple
                ? modelValueSet.value.size > 0
                  ? props.useStatistic
                    ? () =>
                        getSelectedOptionsPopoverRender(
                          <span
                            class={new ComponentClassBlock('picker').em('input', 'static-text')}
                          >
                            {inputDisplayValue.value}
                          </span>,
                          {
                            disabled: !props.statisticShowTooltip,
                            distance: 12,
                          },
                        )
                    : () => (
                        <HTagGroup
                          ref={domRefs.tagGroupDomRef}
                          collapse={useCollapse.value}
                          tooltipRenderType="full"
                          collapseUseTooltip={props.collapseTagsTooltip}
                          minDisplayed={props.maxCollapseTags}
                          fillUp={props.collapseTagsFillUp}
                          size={sizeRef.value}
                          disabled={isDisabled.value}
                          tooltipShowAfter={props.tooltipShowAfter}
                          tooltipHideAfter={props.tooltipHideAfter}
                          collapseTagProps={{
                            clickable: false,
                            ...props.collapsedTagsProps,
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
                              <HPickerFitContentInput
                                ref={domRefs.filterInputDomRef}
                                v-show={shouldTagAppendInputExists.value}
                                modelValue={inputValue.value}
                                minWidth={props.fitContentInputMinWidth}
                                onInput={handleInput}
                                onFocus={onTagGroupSuffixInputFocus}
                                onBlur={onTagGroupSuffixInputBlur}
                                onCompositionStart={onCompositionStart}
                                onCompositionEnd={onCompositionEnd}
                              />
                            ),
                          }}
                        </HTagGroup>
                      )
                  : undefined
                : context.slots.tagRender && modelValueSet.value.size > 0
                  ? () => {
                      const modelValue = modelValueSet.value.values().next().value;
                      const optValue =
                        getOptionDataByValue(modelValue) ?? savedOptions.get(modelValue!);
                      return (
                        <div
                          class={cls(
                            classHelper.em('tag-render', 'single'),
                            classHelper.is(
                              'inputting',
                              isInputable.value &&
                                (popperVisible.value ||
                                  (props.showSearch &&
                                    (isInputFocus.value || isSelectFocus.value))),
                            ),
                          )}
                        >
                          <div
                            v-show={!inputValue.value}
                            class={classHelper.em('tag-render', 'instance')}
                          >
                            {context.slots.tagRender?.(
                              optValue ? { ...optValue.props, ...optValue.attrs } : undefined,
                            )}
                          </div>
                          {isInputable.value && (
                            <HPickerFitContentInput
                              ref={domRefs.filterInputDomRef}
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
                  : undefined),
          }}
        </HPicker>
      );
    };
  },
});
