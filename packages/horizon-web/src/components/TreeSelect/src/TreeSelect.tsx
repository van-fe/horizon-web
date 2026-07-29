import type { VNode } from 'vue';
import { computed, defineComponent, inject, provide, ref, toRefs } from 'vue';
import { cls, ComponentClassBlock, type HorizonWebComponentInstance, useNamespace } from '@aurora/utils';
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
import isEqual from 'lodash/isEqual';
import type {
  PickerExposes,
  PickerFitContentInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type { TagGroupExposes } from '~/components/Tag/src/composables/useExposes';
import type { TreeExposes } from '~/components/Tree/src/composables/useExposes';
import type { TopBaseTreeData } from '~/utils/useTree/types';
import { JSX } from 'vue/jsx-runtime';

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
      itemSize: itemSizeProp,
      treeSize: treeSizeProp,
      collapse: collapseProp,
      collapseTags: collapseTagsProp,
      selectStyle: selectStyleProp,
      inputStyle: inputStyleProp,
      useBuildInPanelFilter: useBuildInPanelFilterProp,
      panelInputPlaceholder: panelInputPlaceholderProp,
      multiple: multipleProp,
      clearable: clearableProp,
      trigger: triggerProp,
      placement: placementProp,
      toBody: toBodyProp,
      placeholder: placeholderProp,
      emptyContent: optionEmptyTextProp,
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
    } = refProps;

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
    const useCollapse = computed(() => collapseProp?.value ?? collapseTagsProp.value);
    const renderedModelValueTags = ref<Array<VNode | JSX.Element>>([]);
    // To prevent optionList changes that cause already selected options to fail to render
    const prevRenderedModelValueTags = new Map<HTreeUuidType, VNode | JSX.Element>();

    // form-item validate trigger
    const nFormError = inject(HFormItemErrorInjectedKey, ref(''));

    const { treeHelper, treeDataMapping } = useTreeData(refProps, context, domRefs);

    const {
      modelValue,
      modelValueSet,
      visibleNodes,
      presetModelValueSet,
      isDisabled,
      updateModelValue,
      setModelValue,
      updatePresetToFormal,
    } = useData(refProps, context, domRefs, treeHelper, emitChange);

    const { popperVisible, controlPopperVisible } = usePopper(
      refProps,
      context,
      domRefs,
      modelValueSet,
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
      renderedModelValueTags,
      treeHelper,
      popperVisible,
      emitChange,
      controlPopperVisible,
    );

    const { needConfirm, confirmHandle, cancelHandle } = useConfirm(
      refProps,
      context,
      domRefs,
      modelValueSet,
      presetModelValueSet,
      controlPopperVisible,
      whetherInputCanFocus,
      updatePresetToFormal,
    );

    const { getShowLabel } = useTagRender(
      refProps,
      context,
      domRefs,
      treeHelper,
      modelValueSet,
      presetModelValueSet,
      renderedModelValueTags,
      prevRenderedModelValueTags,
      isDisabled,
      updateModelValue,
      visibleNodes,
    );

    provide(HTreeSelectInputStringInjectKey, inputValueMerged);

    provide(HTreeSelectPopperVisibleInjectKey, popperVisible);

    function emitChange() {
      emit('change', modelValue.value);
    }

    function handleClick() {
      whetherInputCanFocus();
    }

    function onSelectedValuesChanged(selectedValues: HTreeUuidType[]) {
      if (!isEqual(selectedValues, Array.from(modelValueSet.value.values()))) {
        setModelValue(selectedValues, !needConfirm.value);

        if (!needConfirm.value) {
          if (!multipleProp.value) {
            controlPopperVisible(false);
          }
        }
      }
    }

    // in order to prevent optionList changed after the showValue is empty
    let prevSelectedValue: HTreeUuidType | null = null;
    let prevSelectedLabel: string = '';

    const showValue = computed<string | undefined>(() => {
      if (props.multiple) {
        if (useStatisticProp.value && modelValueSet.value.size > 0) {
          return statisticTextProp?.value
            ? `${statisticTextProp?.value} (${modelValueSet.value.size})`
            : modelValueSet.value.size <= 1
              ? (useLocaleLang('select.statistic').value as string)
              : `${useLocaleLang('select.statistics').value} (${modelValueSet.value.size})`;
        } else if (isFilterable.value && filterValue.value && modelValueSet.value.size === 0) {
          return filterValue.value;
        } else {
          return modelValueSet.value.size > 0 ? ' ' : '';
        }
      } else {
        if (isFilterable.value && filterValue.value && modelValueSet.value.size === 0) {
          return filterValue.value;
        } else {
          const value = modelValueSet.value.values().next().value as HTreeUuidType;
          const option = treeDataMapping.value.get(value);

          if (!option) {
            if (value === prevSelectedValue) {
              return prevSelectedLabel;
            }
          }

          prevSelectedValue = value;
          prevSelectedLabel = getShowLabel(value);

          return prevSelectedLabel;
        }
      }
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
      clearSelectedValues: () => domRefs.tree.value?.clearSelectedValues(),
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
        placeholder={
          placeholderProp?.value ?? (useLocaleLang('select.placeholder').value as string)
        }
        needConfirm={needConfirm.value}
        confirmButtonText={props.confirmButtonText ?? props.confirmBtnText}
        cancelButtonText={props.cancelButtonText ?? props.cancelBtnText}
        emptyText={optionEmptyTextProp?.value ?? emptyTextProp?.value}
        hoverShowDelay={hoverShowDelayProp.value}
        hoverHideDelay={hoverHideDelayProp.value}
        inputStyle={
          selectStyleProp?.value
            ? selectStyleProp.value === 'noborder'
              ? 'no-border'
              : selectStyleProp.value
            : inputStyleProp.value
        }
        modelValueRegardAsPlaceholder={
          !multipleProp.value && isFilterable.value && modelValueSet.value.size > 0
        }
        dropdownIcon={dropdownIconProp?.value}
        panelClass={cls(classHelper.e('panel'), popperClassNameProp?.value)}
        popoverOptions={popoverOptionsProp?.value}
        useFitContentInput
        usePanelInput={useBuildInPanelFilterProp.value}
        panelInputPlaceholder={
          panelInputPlaceholderProp?.value ?? (useLocaleLang('select.pleaseSearch').value as string)
        }
        panelInputPrefixIcon={IconSearch}
        fitInputWidth={fitInputWidthProp.value}
        panelWidth={treeWidthProp?.value}
        fitContentInputMinWidth={fitContentInputMinWidthProp?.value}
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
      >
        {{
          panelPrefix: slots.panelHeaderRender,
          panelSuffix: slots.panelFooterRender,
          panelConfirm: slots.confirmRender,
          picker: slots.selectRender,
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
                        default: () => renderedModelValueTags.value,
                        suffix: () => (
                          <HPickerFitContentInput
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
              ref={domRefs.tree}
              treeHelper={treeHelper}
              size={treeSizeProp?.value ?? itemSizeProp?.value}
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
              dynamicLoadData={refProps.dynamicLoadData?.value}
              dynamicLoad={refProps.dynamicLoad?.value}
              isDefaultExpandAll={refProps.isDefaultExpandAll.value}
              isDefaultExpandParent={refProps.isDefaultExpandParent.value}
              rootClassName={refProps.rootClassName?.value}
              rootStyle={refProps.rootStyle?.value}
              indent={refProps.indent.value}
              tooltip={refProps.tooltip.value}
              parentEffectDisabledChild={refProps.parentEffectDisabledChild.value}
              checkable={refProps.checkable?.value}
              showCheckbox={refProps.showCheckbox?.value}
              showRadio={refProps.showRadio.value}
              showLine={refProps.showLine.value}
              expandWrapperByChildren={
                refProps.expandWrapperByChildren.value ?? refProps.expandPanelByChildren.value
              }
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
