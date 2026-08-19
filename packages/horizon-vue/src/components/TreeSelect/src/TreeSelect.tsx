import type { VNode } from 'vue';
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  provide,
  ref,
  toRefs,
  useId,
  watchEffect,
} from 'vue';
import {
  cls,
  ComponentClassBlock,
  type HorizonWebComponentInstance,
  useNamespace,
} from '@aurora/utils';
import type { TreeSelectProps } from './composables/useProps';
import { useTreeSelectProps } from './composables/useProps';
import { useTreeSelectEmits } from './composables/useEmits';
import { useTreeSelectSlots } from './composables/useSlots';
import { useTreeSelectExposes } from './composables/useExposes';
import HPicker from '~/components/Picker/src/Picker';
import {
  HTreeSelectEmitsInjectKey,
  HTreeSelectInputStringInjectKey,
  HTreeSelectPopperVisibleInjectKey,
  HTreeSelectPropsInjectKey,
  HTreeSelectSlotsInjectKey,
} from './utils/injectKeys';
import HTagGroup from '~/components/Tag/src/TagGroup';
import useSize from '~/utils/useSize';
import HPickerFitContentInput from '~/components/Picker/src/components/PickerFitContentInput';
import useLocaleLang from '~/utils/useLocaleLang';
import { HFormItemErrorInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import HTree from '~/components/Tree/src/Tree';
import type { HTreeData, HTreeUuidType } from '~/components/Tree/src/utils/types';
import useFilter from './utils/useFilter';
import type { HTreeSelectContext, HTreeSelectDomRefs } from './utils/types';
import useConfirm from './utils/useConfirm';
import usePopper from './utils/usePopper';
import useData from './utils/useData';
import useTagRender from './utils/useTagRender';
import { IconSearch } from '@aurora/icon';
import useTreeData from './utils/useTreeData';
import { isEqual } from 'lodash-es';
import type {
  PickerExposes,
  PickerFitContentInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type { TagGroupExposes } from '~/components/Tag/src/composables/useExposes';
import type { TreeExposes } from '~/components/Tree/src/composables/useExposes';
import type { TopBaseTreeData } from '~/utils/useTree/types';
import { JSX } from 'vue/jsx-runtime';
import { resolveTreeSelectDisplay } from '@aurora/core';

export default defineComponent({
  name: `${useNamespace()}TreeSelect`,
  desc: '含有下拉菜单的树形选择器，结合了 `Tree` 和 `Picker` 两个组件的功能',
  descLocales: { en: 'A dropdown tree selector combining the features of `Tree` and `Picker`.' },
  props: useTreeSelectProps,
  emits: useTreeSelectEmits,
  slots: useTreeSelectSlots,
  exposes: useTreeSelectExposes,
  setup(props: TreeSelectProps, context: HTreeSelectContext) {
    const { emit, slots, expose } = context;

    const classHelper = new ComponentClassBlock('tree-select');

    const refProps = toRefs(props);

    const {
      size,
      treeSize: treeSizeProp,
      collapseTags: collapseTagsProp,
      inputStyle: inputStyleProp,
      useBuildInPanelFilter: useBuildInPanelFilterProp,
      panelInputPlaceholder: panelInputPlaceholderProp,
      multiple: multipleProp,
      clearable: clearableProp,
      trigger: triggerProp,
      placement: placementProp,
      toBody: toBodyProp,
      placeholder: placeholderProp,
      emptyText: emptyTextProp,
      collapseTagsTooltip: collapseTagsTooltipProp,
      maxCollapseTags: maxCollapseTagsProp,
      collapseTagsFillUp: collapseTagsFillUpProp,
      collapsedTagsProps: collapsedTagsPropsProp,
      dropdownIcon: dropdownIconProp,
      inputStatus: inputStatusProp,
      popperClassName: popperClassNameProp,
      popoverOptions: popoverOptionsProp,
      hoverShowDelay: hoverShowDelayProp,
      hoverHideDelay: hoverHideDelayProp,
      useStatistic: useStatisticProp,
      statisticText: statisticTextProp,
      fitInputWidth: fitInputWidthProp,
      tooltipShowAfter: tooltipShowAfterProp,
      tooltipHideAfter: tooltipHideAfterProp,
      treeWidth: treeWidthProp,
      fitContentInputMinWidth: fitContentInputMinWidthProp,
      searchPanelWidth: searchPanelWidthProp,
      searchIcon: searchIconProp,
      searchInputPlaceholder: searchInputPlaceholderProp,
      inputAttrs: inputAttrsProp,
    } = refProps;
    const treeId = `${useId()}-tree-select-tree`;
    const treeA11yAttrs = { id: treeId } as Record<string, unknown>;
    let focusTreeTimer: ReturnType<typeof setTimeout> | undefined;
    onBeforeUnmount(() => {
      if (focusTreeTimer) clearTimeout(focusTreeTimer);
    });

    /**
     * dom ref
     */
    const domRefs: HTreeSelectDomRefs = {
      picker: ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes> | null>(null),
      filterInput: ref<HorizonWebComponentInstance<
        typeof HPickerFitContentInput,
        PickerFitContentInputExposes
      > | null>(null),
      tagGroup: ref<HorizonWebComponentInstance<typeof HTagGroup, TagGroupExposes> | null>(null),
      tree: ref<HorizonWebComponentInstance<typeof HTree, TreeExposes> | null>(null),
    };

    /**
     * other ref value
     */
    const sizeRef = useSize(size, 'medium');
    const useCollapse = computed(() => collapseTagsProp.value);
    // To prevent optionList changes that cause already selected options to fail to render
    const prevRenderedModelValueTags = new Map<HTreeUuidType, VNode | JSX.Element>();

    // form-item validate trigger
    const nFormError = inject(HFormItemErrorInjectedKey, ref(''));
    const statisticSingularText = useLocaleLang('select.statistic');
    const statisticPluralText = useLocaleLang('select.statistics');
    const pickerPlaceholder = useLocaleLang('select.placeholder');
    const pickerSearchPlaceholder = useLocaleLang('select.pleaseSearch');

    const { treeHelper, treeDataMapping } = useTreeData(refProps, context, domRefs);

    const {
      modelValue,
      modelValueSet,
      visibleNodes,
      presetModelValueSet,
      isDisabled,
      controller,
      stageValues,
      clearValue,
      removeValue,
      syncOpen,
      syncSnapshot,
      setFilterValue,
    } = useData(refProps, context, treeHelper, emitChange);

    const { popperVisible, controlPopperVisible } = usePopper(
      refProps,
      context,
      domRefs,
      modelValueSet,
      syncOpen,
    );

    const {
      inputValue,
      filterValue,
      isFilterable,
      isDuringFilter,
      isReadonly,
      isHideInput,
      inputValueMerged,
      handleInput,
      handleInputFocus,
      handleInputBlur,
      handleFocus,
      handleBlur,
      handleClear,
      whetherInputCanFocus,
      onCompositionStart,
      onCompositionEnd,
      onTagGroupSuffixInputFocus,
      onTagGroupSuffixInputBlur,
      onSelectValue,
    } = useFilter(
      refProps,
      context,
      domRefs,
      modelValueSet,
      presetModelValueSet,
      treeHelper,
      popperVisible,
      emitChange,
      controlPopperVisible,
      clearValue,
      setFilterValue,
    );

    const { needConfirm, confirmHandle, cancelHandle } = useConfirm(
      refProps,
      context,
      controlPopperVisible,
      whetherInputCanFocus,
      controller,
      syncSnapshot,
    );

    const { renderTags } = useTagRender(
      refProps,
      context,
      treeHelper,
      modelValueSet,
      prevRenderedModelValueTags,
      isDisabled,
      removeValue,
      controller,
    );

    provide(HTreeSelectInputStringInjectKey, inputValueMerged);

    provide(HTreeSelectPopperVisibleInjectKey, popperVisible);

    function emitChange(value?: typeof modelValue.value) {
      emit('change', value);
    }

    function handleClick() {
      whetherInputCanFocus();
    }

    function onSelectedValuesChanged(selectedValues: HTreeUuidType[]) {
      if (!isEqual(selectedValues, Array.from(modelValueSet.value.values()))) {
        stageValues(selectedValues);

        if (!needConfirm.value) {
          if (!multipleProp.value) {
            controlPopperVisible(false);
          }
        }
      }
    }

    // Keep the last label for a controlled value while the parent replaces treeData.
    const previousLabels = new Map<HTreeUuidType, string>();
    watchEffect(() => {
      const snapshot = controller.snapshot;
      for (const value of modelValueSet.value) {
        const label = snapshot.tree.byValue.get(value)?.stringLabel;
        if (label !== undefined) previousLabels.set(value, label);
      }
    });

    const showValue = computed<string | undefined>(() => {
      return resolveTreeSelectDisplay(
        controller.snapshot.tree,
        Array.from(modelValueSet.value.values()),
        {
          multiple: multipleProp.value,
          filterable: isFilterable.value,
          filterValue: filterValue.value,
          useStatistic: useStatisticProp.value,
          text: statisticTextProp?.value,
          singularText: statisticSingularText.value as string,
          pluralText: statisticPluralText.value as string,
          previousLabels,
        },
      );
    });

    /**
     * normal provide
     */
    provide(HTreeSelectPropsInjectKey, props);
    provide(HTreeSelectEmitsInjectKey, emit);
    provide(HTreeSelectSlotsInjectKey, slots);

    expose({
      confirmHandle,
      cancelHandle,
      changePanelVisible: controlPopperVisible,
      getSelectedNodes: () => domRefs.tree.value?.getSelectedNodes(),
      getPartSelectedNodes: () => domRefs.tree.value?.getPartSelectedNodes(),
      getUnSelectedNodes: () => domRefs.tree.value?.getUnSelectedNodes(),
      setSelectedStatus: (values: Array<string | number>, selected: boolean) =>
        domRefs.tree.value?.setSelectedStatus(values, selected),
      getExpandNodes: () => domRefs.tree.value?.getExpandNodes(),
      setCollapseStatusByValue: (values: Array<string | number>, isExpand: boolean) =>
        domRefs.tree.value?.setCollapseStatusByValue(values, isExpand),
      clearSelectedValues: () => clearValue(),
      setAllCollapseStatus: (isExpand: boolean) =>
        domRefs.tree.value?.setAllCollapseStatus(isExpand),
      getNodeByValues: (values: Array<string | number>) =>
        domRefs.tree.value?.getNodeByValues(values),
      setNodeByValue: (treeData: TopBaseTreeData & Partial<HTreeData>, value?: string | number) =>
        domRefs.tree.value?.setNodeByValue(treeData, value),
      delNodeByValue: (value?: string | number) => domRefs.tree.value?.delNodeByValue(value),
      addNodeChildrenByValue: (
        treeDataArray: Array<TopBaseTreeData & Partial<HTreeData>>,
        value?: string | number,
      ) => domRefs.tree.value?.addNodeChildrenByValue(treeDataArray, value),
      getVisibleItems: () => domRefs.tree.value?.getVisibleItems(),
      scrollTo: (value?: string | number) => domRefs.tree.value?.scrollTo(value),
    });

    return () => (
      <HPicker
        ref={domRefs.picker}
        size={sizeRef.value}
        modelValue={showValue.value}
        hideInput={isHideInput.value}
        class={cls(classHelper.block, classHelper.is('inputable', isFilterable.value))}
        inputable={!isReadonly.value}
        inputIsSearching={isDuringFilter.value}
        inputStatus={!!nFormError?.value ? 'error' : inputStatusProp.value}
        disabled={isDisabled.value}
        clearable={clearableProp.value}
        trigger={triggerProp.value}
        placement={placementProp.value}
        toBody={toBodyProp.value}
        placeholder={placeholderProp?.value ?? (pickerPlaceholder.value as string)}
        needConfirm={needConfirm.value}
        confirmButtonText={props.confirmButtonText}
        cancelButtonText={props.cancelButtonText}
        emptyText={emptyTextProp?.value}
        hoverShowDelay={hoverShowDelayProp.value}
        hoverHideDelay={hoverHideDelayProp.value}
        inputStyle={inputStyleProp.value}
        modelValueRegardAsPlaceholder={
          !multipleProp.value && isFilterable.value && modelValueSet.value.size > 0
        }
        dropdownIcon={dropdownIconProp?.value}
        panelClass={cls(classHelper.e('panel'), popperClassNameProp?.value)}
        popoverOptions={{ ...popoverOptionsProp?.value, flip: props.flip }}
        useFitContentInput
        usePanelInput={useBuildInPanelFilterProp.value}
        panelInputPlaceholder={
          panelInputPlaceholderProp?.value ??
          searchInputPlaceholderProp?.value ??
          (pickerSearchPlaceholder.value as string)
        }
        panelInputPrefixIcon={searchIconProp?.value ?? IconSearch}
        fitInputWidth={fitInputWidthProp.value}
        panelWidth={treeWidthProp?.value ?? searchPanelWidthProp?.value}
        fitContentInputMinWidth={fitContentInputMinWidthProp?.value}
        inputAttrs={{
          ...(inputAttrsProp?.value ?? {}),
          role: 'combobox',
          'aria-autocomplete': isFilterable.value ? 'list' : 'none',
          'aria-expanded': popperVisible.value,
          'aria-haspopup': 'tree',
          'aria-controls': popperVisible.value ? treeId : undefined,
        }}
        onClick={handleClick}
        onClear={handleClear}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInputFocus={handleInputFocus}
        onInputBlur={handleInputBlur}
        onInput={handleInput}
        onShow={() => (popperVisible.value = true)}
        onHide={() => (popperVisible.value = false)}
        onConfirm={() => confirmHandle()}
        onCancel={cancelHandle}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onKeydown={evt => {
          if (evt.key === 'Escape') {
            if (needConfirm.value) {
              controller.cancel();
              syncSnapshot();
            }
            controlPopperVisible(false);
          } else if (!popperVisible.value && ['ArrowDown', 'ArrowUp', 'Enter'].includes(evt.key)) {
            evt.preventDefault();
            controlPopperVisible(true);
          } else if (
            popperVisible.value &&
            ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(evt.key)
          ) {
            if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(evt.key)) {
              evt.preventDefault();
              if (focusTreeTimer) clearTimeout(focusTreeTimer);
              focusTreeTimer = setTimeout(() => {
                focusTreeTimer = undefined;
                if (popperVisible.value) document.getElementById(treeId)?.focus();
              });
            }
            domRefs.tree.value?.keyboardEventDeal(evt);
          }
        }}
      >
        {{
          panelPrefix: slots.panelHeaderRender,
          panelSuffix: slots.panelFooterRender,
          panelConfirm: slots.confirmRender,
          picker: slots.selectRender
            ? () => {
                const value = modelValueSet.value.values().next().value;
                const option = value === undefined ? undefined : treeDataMapping.value.get(value);
                return option
                  ? slots.selectRender?.({ ...option, label: option.fullPathLabel })
                  : undefined;
              }
            : undefined,
          pickerOuter: slots.default
            ? () =>
                slots.default?.({
                  visible: popperVisible,
                  treeDataMap: treeHelper.flattenTreeDataMapping.value,
                })
            : undefined,
          pickerPrefix: () => {
            if (multipleProp.value) {
              if (modelValueSet.value.size > 0) {
                return (
                  !useStatisticProp.value && (
                    <HTagGroup
                      ref={domRefs.tagGroup}
                      class={classHelper.em('tag-group', 'normal', !!slots.tagRender)}
                      collapse={useCollapse.value}
                      tooltipRenderType="full"
                      collapseUseTooltip={collapseTagsTooltipProp.value}
                      minDisplayed={maxCollapseTagsProp?.value}
                      fillUp={collapseTagsFillUpProp.value}
                      size={sizeRef.value}
                      tooltipShowAfter={tooltipShowAfterProp.value}
                      tooltipHideAfter={tooltipHideAfterProp.value}
                      disabled={isDisabled.value}
                      collapseTagProps={{
                        clickable: false,
                        ...collapsedTagsPropsProp?.value,
                      }}
                    >
                      {{
                        default: renderTags,
                        suffix: () => (
                          <HPickerFitContentInput
                            data-focus-visible-proxy=""
                            disabled={isDisabled.value}
                            ref={domRefs.filterInput}
                            v-show={
                              multipleProp.value &&
                              modelValueSet.value.size > 0 &&
                              isFilterable.value &&
                              popperVisible.value
                            }
                            v-model={inputValue.value}
                            minWidth={fitContentInputMinWidthProp?.value}
                            onInput={handleInput}
                            onFocus={onTagGroupSuffixInputFocus}
                            onBlur={onTagGroupSuffixInputBlur}
                            onCompositionStart={onCompositionStart}
                            onCompositionEnd={onCompositionEnd}
                          />
                        ),
                        append: () => (
                          <input
                            data-focus-visible-proxy=""
                            disabled={isDisabled.value}
                            class={cls(classHelper.is('input-placeholder'))}
                            tabindex={isDisabled.value ? -1 : 0}
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
                const option = treeDataMapping.value.get(
                  modelValueSet.value.values().next().value!,
                );

                return option
                  ? slots.tagRender?.({ ...option, label: option.fullPathLabel })
                  : undefined;
              }
            }

            return undefined;
          },
          default: () => (
            <HTree
              {...treeA11yAttrs}
              ref={domRefs.tree}
              treeHelper={treeHelper}
              size={treeSizeProp?.value}
              disabled={isDisabled.value}
              filterable={isFilterable.value}
              filterMethod={refProps.filterMethod?.value}
              highlightMethod={refProps.highlightMethod?.value}
              hideFilterInput={true}
              filterInputValue={inputValueMerged.value}
              filterToHideChildren={refProps.filterToHideChildren.value}
              expandFilteredTree={refProps.expandFilteredTree?.value}
              height={refProps.height?.value}
              maxHeight={parseFloat(refProps.maxHeight.value.toString())}
              useVirtualScroll={refProps.useVirtualScroll.value}
              tooltipShowAfter={refProps.tooltipShowAfter.value}
              tooltipHideAfter={refProps.tooltipHideAfter.value}
              expandValues={refProps.expandValues?.value}
              foldIcon={refProps.foldIcon?.value}
              expandIcon={refProps.expandIcon?.value}
              expandOnClickNode={refProps.expandOnClickNode.value}
              prefixIcon={refProps.prefixIcon?.value}
              checkStrictly={refProps.checkStrictly.value}
              multiple={refProps.multiple.value}
              multipleLimit={refProps.multipleLimit.value}
              selectedValues={Array.from(presetModelValueSet.value.values())}
              checkOnClickNode={refProps.checkOnClickNode.value}
              checkOnClickLeaf={refProps.checkOnClickLeaf.value}
              stress={refProps.stress.value}
              emptyText={refProps.emptyText?.value}
              dynamicLoad={refProps.dynamicLoad?.value}
              isDefaultExpandAll={refProps.isDefaultExpandAll.value}
              isDefaultExpandParent={refProps.isDefaultExpandParent.value}
              rootClassName={refProps.rootClassName?.value}
              rootStyle={refProps.rootStyle?.value}
              indent={refProps.indent.value}
              tooltip={refProps.tooltip.value}
              parentEffectDisabledChild={refProps.parentEffectDisabledChild.value}
              showCheckbox={refProps.showCheckbox?.value}
              showRadio={refProps.showRadio.value}
              showLine={refProps.showLine.value}
              expandWrapperByChildren={refProps.expandPanelByChildren.value}
              draggable={refProps.draggable.value}
              draggableIcon={refProps.draggableIcon?.value}
              undraggableIcon={refProps.undraggableIcon?.value}
              draggableIconAlwaysVisible={refProps.draggableIconAlwaysVisible.value}
              dragOnHandler={refProps.dragOnHandler.value}
              dragToLeaf={refProps.dragToLeaf.value}
              beforeDrop={refProps.beforeDrop?.value}
              onUpdate:selectedValues={onSelectedValuesChanged}
              onUpdate:visibleNodes={val => (visibleNodes.value = val)}
              onUpdate:expandValues={(...args) => emit('update:expandValues', ...args)}
              onUpdate:treeData={val => emit('update:treeData', val)}
              onSelect={onSelectValue}
              onExpand={(...args) => emit('expand', ...args)}
              onClick={(...args) => emit('click', ...args)}
              onContextmenu={(...args) => emit('contextmenu', ...args)}
            >
              {{
                empty: slots.empty,
                treeNodeRender: slots.treeNodeRender,
              }}
            </HTree>
          ),
        }}
      </HPicker>
    );
  },
});
