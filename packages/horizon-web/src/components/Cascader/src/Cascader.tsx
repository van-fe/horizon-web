import { cloneVNode, defineComponent, Fragment, inject, provide, ref, toRefs } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  cls,
  ComponentClassBlock,
  cssVariableKey,
  flattenVNodes,
  useNamespace,
} from '@aurora/utils';
import type { CascaderProps } from './composables/useProps';
import { useCascaderProps } from './composables/useProps';
import type { CascaderEmits } from './composables/useEmits';
import { useCascaderEmits } from './composables/useEmits';
import type { CascaderSlots } from './composables/useSlots';
import { useCascaderSlots } from './composables/useSlots';
import type { CascaderExposes } from './composables/useExposes';
import { useCascaderExposes } from './composables/useExposes';
import HPicker from '~/components/Picker/src/Picker';
import {
  HCascaderEmitsInjectKey,
  HCascaderPropsInjectKey,
  HCascaderSlotsInjectKey,
} from './utils/injectKeys';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import HTagGroup from '~/components/Tag/src/TagGroup';
import useSize from '~/utils/useSize';
import HPickerFitContentInput from '~/components/Picker/src/components/PickerFitContentInput';
import useLocaleLang from '~/utils/useLocaleLang';
import {
  HFormItemErrorInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import CascaderPanels from './components/CascaderPanels';
import type { CascaderDomRefs } from './utils/types';
import useHighlight from './hooks/useHighlight';
import useConfig from './hooks/useConfig';
import useOptions from './hooks/useOptions';
import useFilterOptions from './hooks/useFilter';
import useModelValue from './hooks/useModelValue';
import useEvents from './hooks/useEvents';
import useOption from './hooks/useOption';
import useTagRender from './hooks/useTagRender';
import useDisplay from './hooks/useDisplay';
import useExposes from './hooks/useExposes';

export default defineComponent({
  name: `${useNamespace()}Cascader`,
  desc: '当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择',
  descLocales: {
    en: 'A cascading selector for browsing and selecting values from hierarchical data.',
  },
  components: {
    HPicker,
    HScrollbar,
    HTagGroup,
    HPickerFitContentInput,
    CascaderPanels,
  },
  props: useCascaderProps,
  emits: useCascaderEmits,
  slots: useCascaderSlots,
  exposes: useCascaderExposes,
  setup(
    props: CascaderProps,
    context: HorizonWebSetupContext<CascaderEmits, CascaderSlots, CascaderExposes>,
  ) {
    const classHelper = new ComponentClassBlock('cascader');
    const { emit, slots } = context;
    const {
      size,
      useBuildInPanelFilter: useBuildInPanelFilterRef,
      panelInputPlaceholder: panelInputPlaceholderRef,
      multiple: multipleRef,
      clearable: clearableRef,
      trigger: triggerRef,
      placement: placementRef,
      toBody: toBodyRef,
      placeholder: placeholderRef,
      emptyText: emptyTextRef,
      collapseTagsTooltip: collapseTagsTooltipRef,
      maxCollapseTags: maxCollapseTagsRef,
      collapseTagsFillUp: collapseTagsFillUpRef,
      collapsedTagsProps: collapsedTagsPropsRef,
      dropdownIcon: dropdownIconRef,
      optionMaxLines: optionMaxLinesRef,
      inputStatus: inputStatusRef,
      popperClassName: popperClassNameRef,
      popoverOptions: popoverOptionsRef,
      hoverShowDelay: hoverShowDelayRef,
      hoverHideDelay: hoverHideDelayRef,
      useStatistic: useStatisticRef,
      fitInputWidth: fitInputWidthRef,
      tooltipShowAfter: tooltipShowAfterRef,
      tooltipHideAfter: tooltipHideAfterRef,
      fitContentInputMinWidth: fitContentInputMinWidthRef,
    } = toRefs(props);

    const domRefs: CascaderDomRefs = {
      pickerDomRef: ref(),
      filterInputDomRef: ref(),
      tagGroupDomRef: ref(),
      cascaderPanelsDomRef: ref(),
    };
    const { pickerDomRef, filterInputDomRef, tagGroupDomRef, cascaderPanelsDomRef } = domRefs;
    const sizeRef = useSize(size, 'medium');
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);
    const nFormError = inject(HFormItemErrorInjectedKey, ref(''));
    const {
      useCollapse,
      isDisabled,
      needConfirm,
      confirmButtonText,
      cancelButtonText,
      inputStyle,
    } = useConfig(props);
    const { tree, optionList, optionListMap, optionsVersion } = useOptions(props, context);
    const {
      inputValue,
      popperVisible,
      useFilter,
      inputable,
      isReadonly,
      inputValueMerged,
      panelStatus,
    } = useFilterOptions(props, context, { optionList });
    const {
      modelValueSet,
      presetModelValueSet,
      isOutOfLimit,
      getShowLabel,
      transformUuidsToModelValue,
      setModified,
      emitSelectOrDeselect,
    } = useModelValue(props, context, {
      tree,
      optionListMap,
      optionsVersion,
      triggerFormChange: () => formItemTrigger?.('change'),
    });
    const {
      isCascaderFocus,
      manualControlPopperVisible,
      delInput,
      focusInput,
      judgeWhetherInputCanFocus,
      handleInput,
      handleClear,
      handleClick,
      handleInputFocus,
      handleInputBlur,
      handleFocus,
      handleBlur,
      onCompositionStart,
      onCompositionEnd,
      onTagGroupSuffixInputFocus,
      onTagGroupSuffixInputBlur,
    } = useEvents(props, context, {
      domRefs,
      inputValue,
      popperVisible,
      inputable,
      modelValueSet,
      presetModelValueSet,
      optionListMap,
    });
    const { pickOption, confirmHandle, cancelHandle } = useOption(props, context, {
      domRefs,
      optionListMap,
      modelValueSet,
      presetModelValueSet,
      isOutOfLimit,
      delInput,
      manualControlPopperVisible,
      judgeWhetherInputCanFocus,
      setModified,
      emitSelectOrDeselect,
      transformUuidsToModelValue,
    });
    const { renderedModelValueTags, presetRenderedModelValueTags } = useTagRender(props, context, {
      modelValueSet,
      presetModelValueSet,
      optionListMap,
      optionsVersion,
      isDisabled,
      getShowLabel,
      pickOption,
      handleClear,
    });
    const { showValue, isHideInput } = useDisplay(props, slots, {
      modelValueSet,
      optionListMap,
      inputValue,
      inputable,
      useFilter,
      renderedModelValueTags,
      getShowLabel,
    });

    useHighlight();
    provide(HCascaderPropsInjectKey, props);
    provide(HCascaderEmitsInjectKey, emit);
    provide(HCascaderSlotsInjectKey, slots);
    useExposes(context, {
      domRefs,
      confirmHandle,
      cancelHandle,
      focusInput,
      manualControlPopperVisible,
      handleClear,
      inputValue,
      renderedModelValueTags,
    });

    return () => (
      <HPicker
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
        confirmButtonText={confirmButtonText.value}
        cancelButtonText={cancelButtonText.value}
        emptyText={emptyTextRef?.value}
        hoverShowDelay={hoverShowDelayRef.value}
        hoverHideDelay={hoverHideDelayRef.value}
        inputStyle={inputStyle.value}
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
          panelEmpty: slots.empty,
          panelPrefix: () => (
            <Fragment>
              {slots.panelHeaderRender?.()}
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
                    <HTagGroup
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
                          <HPickerFitContentInput
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
                    </HTagGroup>
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
      </HPicker>
    );
  },
});
