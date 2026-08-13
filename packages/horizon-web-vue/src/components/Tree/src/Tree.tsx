import { computed, defineComponent, nextTick, provide, ref, toRefs, useId, watch } from 'vue';
import { ComponentClassBlock, cls, useNamespace, cssVariable } from '@aurora/utils';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import { useTreeProps } from './composables/useProps';
import { useTreeEmits } from './composables/useEmits';
import { useTreeSlots } from './composables/useSlots';
import { useTreeExposes } from './composables/useExposes';
import type { TreeProps } from './composables/useProps';
import type { TreeEmits } from './composables/useEmits';
import type { TreeSlots } from './composables/useSlots';
import type { TreeExposes } from './composables/useExposes';
import {
  HTreeDragFromNodeInjectKey,
  HTreeDragOffsetInjectKey,
  HTreeDragToNodeUuidInjectKey,
  HTreeEmitsInjectKey,
  HTreeExpandedNodesUuidInjectKey,
  HTreeFilterInputValueInjectKey,
  HTreeFocusedNodeUuidInjectKey,
  HTreeFullCheckedValuesInjectKey,
  HTreeHalfCheckedValuesInjectKey,
  HTreeHelperInjectKey,
  HTreeHighlightMethodInjectKey,
  HTreeIdInjectKey,
  HTreeIsDraggingInjectKey,
  HTreeLoadingNodesInjectKey,
  HTreeOnDragStartInjectKey,
  HTreePropsInjectKey,
  HTreeSetItemElementInjectKey,
  HTreeSelectedNodesUuidInjectKey,
  HTreeSizeInjectKey,
  HTreeSlotsInjectKey,
  HTreeSwitchNodeExpandStatusInjectKey,
  HTreeSwitchNodeSelectedStatusInjectKey,
  HTreeVNodeCollectionInjectKey,
} from './utils/injectKeys';
import HInput from '~/components/Input/src/Input';
import Tree from '~/utils/useTree/index';
import type { HTreeExtendsData, HTreeData, HTreeUuidType } from './utils/types';
import TreeItem from './components/TreeItem';
import { HVirtualScroller, HVirtualScrollerItem } from '~/components/VirtualScroller';
import useSize from '~/utils/useSize';
import { sizeMapping, transformUuid } from './utils/config';
import useLocaleLang from '~/utils/useLocaleLang';
import useHighlightMethod from './hooks/useHighlightMethod';
import useDynamicLoad from './hooks/useDynamicLoad';
import useTreeData from './hooks/useTreeData';
import useExpand from './hooks/useExpand';
import useCheckable from './hooks/useCheckable';
import useFilter from './hooks/useFilter';
import { isEqual } from 'lodash-es';
import useVNodeCollection from './hooks/useVNodeCollection';
import useDraggable from './hooks/useDraggable';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import loading from '~/directives/v-loading';
import useScroll from './hooks/useScroll';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import useHighlight from './hooks/useHighlight';
import { normalizeTreeData, reduceTreeNavigation } from '@aurora/core';

export default defineComponent({
  name: `${useNamespace()}Tree`,
  desc: '对于文件夹、分类目录、组织架构等层级较多的内容，树可以清楚显示他们的层级关系，并具有展开、收起、选择等交互功能',
  descLocales: {
    en: 'Displays hierarchical data such as folders, categories, and organizations with expand, collapse, and selection interactions.',
  },
  directives: {
    loading,
  },
  props: useTreeProps,
  emits: useTreeEmits,
  slots: useTreeSlots,
  exposes: useTreeExposes,
  setup(
    props: TreeProps,
    { emit, slots, expose }: HorizonWebSetupContext<TreeEmits, TreeSlots, TreeExposes>,
  ) {
    const classHelper = new ComponentClassBlock('tree');
    const treeId = `${useId()}-tree`;

    const refProps = toRefs(props);

    const {
      treeHelper,
      treeData: treeDataProp,
      expandValues: expandValuesProp,
      selectedValues: selectedValuesProp,
      filterInputProps: filterInputPropsProp,
      fieldMap: fieldMapProp,
      draggable: draggableProp,
      size: sizeProp,
      height: heightProp,
      maxHeight: maxHeightProp,
      useVirtualScroll: useVirtualScrollProp,
      virtualScrollBuffer: virtualScrollBufferProp,
      disabled: disabledProp,
      multiple: multipleProp,
      emptyText: emptyTextProp,
      rootClassName: rootClassNameProp,
      rootStyle: rootStyleProp,
      searchInputPlaceholder: searchInputPlaceholderProp,
      hideFilterInput: hideFilterInputProp,
      expandWrapperByChildren: expandWrapperByChildrenProp,
    } = refProps;

    const size = useSize(
      computed(() => sizeProp?.value),
      'medium',
    );

    const loading = ref(false);

    /**
     * dom ref
     */
    const wrapperDomRef = ref<HTMLDivElement | null>(null);
    const scrollerDomRef = ref<HorizonWebComponentInstance<
      typeof HVirtualScroller,
      VirtualScrollerExposes
    > | null>(null);

    /**
     * tree helper
     */
    const tree = treeHelper?.value
      ? treeHelper.value
      : new Tree<HTreeData, HTreeExtendsData>(
          treeDataProp.value,
          fieldMapProp?.value ?? {},
          transformUuid,
        );

    const { deleteNode, setNode, setNodeChildren, addNodeChildren } = useTreeData(
      refProps,
      emit,
      tree,
    );

    const hasSubTree = computed(() => tree.flattenTreeData.value.some(item => item.level > 0));

    const { loadingNodes, dynamicLoad } = useDynamicLoad(refProps, tree, setNodeChildren);

    const {
      expandedNodesUuid,
      indentValue,
      switchNodeExpandStatus,
      setNodeExpandStatus,
      setCollapseStatusByValue,
      expandAll,
      foldAll,
    } = useExpand(refProps, tree, dynamicLoad, emit);

    const { filterValue, isUsingFilter, visibleItems, filterValueMerged } = useFilter(
      refProps,
      emit,
      tree,
      expandedNodesUuid,
      setCollapseStatusByValue,
    );

    const {
      selectedValuesUuid,
      selectionChangedByInteraction,
      switchNodeSelectedStatus,
      fullCheckedValues,
      halfCheckedValues,
      clearSelectedValues,
    } = useCheckable(refProps, tree, emit);

    const { vNodesMapping, collectVNode } = useVNodeCollection();

    const {
      isDragging,
      dragFromNode,
      dragToNodeUuid,
      dragOffset,
      setItemElement,
      dragToTop,
      onDragStart,
    } = useDraggable({
      props: refProps,
      treeDomRef: wrapperDomRef,
      treeHelper: tree,
      setNodeExpandStatus,
      expandedNodesUuid,
      setExpandedValues: setCollapseStatusByValue,
      treeDataMutations: {
        deleteNode,
        setNodeChildren,
        addNodeChildren,
      },
      isLoading: loading,
    });

    const { isScrolling, scrollTo } = useScroll(
      refProps,
      tree,
      scrollerDomRef,
      visibleItems,
      vNodesMapping,
      setCollapseStatusByValue,
    );

    useHighlight();

    const focusedNodeUuid = ref<HTreeUuidType>();

    function focusNode(node?: HTreeExtendsData) {
      if (!node) return;
      focusedNodeUuid.value = node._uuid;
      void nextTick(() => {
        wrapperDomRef.value?.focus({ preventScroll: true });
        void scrollTo(tree.getOptionValue(node, 'value'));
      });
    }

    function handleKeyboard(evt: KeyboardEvent) {
      const targetIsInput = evt.target instanceof HTMLInputElement;
      if (targetIsInput && ['ArrowLeft', 'ArrowRight', ' ', 'Home', 'End'].includes(evt.key)) {
        return;
      }

      if (
        !['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' '].includes(
          evt.key,
        )
      )
        return;
      const coreTree = normalizeTreeData(
        tree.originTreeData,
        tree.fieldMapping as Record<string, string>,
      );
      const command = reduceTreeNavigation(
        coreTree.flat,
        {
          focusedValue:
            focusedNodeUuid.value === undefined
              ? undefined
              : tree.flattenTreeDataMapping.value.get(focusedNodeUuid.value)?.value,
          expandedValues: expandedNodesUuid,
        },
        evt.key as Parameters<typeof reduceTreeNavigation>[2],
        {
          visibleNodes: visibleItems.value
            .map(item => coreTree.byValue.get(item.value))
            .filter((node): node is NonNullable<typeof node> => !!node),
          isDisabled: node => (props.checkStrictly ? node.disabled : node.passingDisabled),
        },
      );
      if (command.type === 'none') return;
      const commandNode = tree.getInfoByValue(command.value);
      if (!commandNode) return;
      evt.preventDefault();
      if (command.type === 'focus') focusNode(commandNode);
      if (command.type === 'expand')
        setNodeExpandStatus(commandNode, true, evt, vNodesMapping.get(commandNode._uuid));
      if (command.type === 'collapse')
        setNodeExpandStatus(commandNode, false, evt, vNodesMapping.get(commandNode._uuid));
      if (command.type === 'select')
        switchNodeSelectedStatus(
          commandNode._uuid,
          !selectedValuesUuid.has(commandNode._uuid),
          evt,
          vNodesMapping.get(commandNode._uuid),
        );
    }

    let prevEmittedExpandValues: Array<string | number> | undefined = expandValuesProp?.value;
    watch(
      expandedNodesUuid,
      val => {
        const result = Array.from(val.values());
        if (!isEqual(result, prevEmittedExpandValues)) {
          emit('update:expandValues', result);
          prevEmittedExpandValues = result;
        }
      },
      {
        immediate: true,
      },
    );

    let prevEmittedSelectedValues: Array<string | number> | undefined = selectedValuesProp?.value;
    watch(
      selectedValuesUuid,
      val => {
        const result = Array.from(val.values());
        // Linked multi-select retains the historical normalization event (parent input becomes
        // leaf values). A single-select external synchronization is an acknowledgement only:
        // echoing it makes TreeSelect treat an opened path as a user choice and close its panel.
        if (!selectionChangedByInteraction.value && !multipleProp.value) {
          prevEmittedSelectedValues = result;
          return;
        }
        if (!isEqual(result, prevEmittedSelectedValues)) {
          emit('update:selectedValues', result);
          prevEmittedSelectedValues = result;
        }
        selectionChangedByInteraction.value = false;
      },
      {
        immediate: true,
      },
    );

    /**
     * provides
     */
    provide(HTreePropsInjectKey, props);
    provide(HTreeEmitsInjectKey, emit);
    provide(HTreeSlotsInjectKey, slots);
    provide(HTreeFilterInputValueInjectKey, filterValueMerged);
    provide(HTreeFocusedNodeUuidInjectKey, focusedNodeUuid);
    provide(
      HTreeIdInjectKey,
      computed(() => treeId),
    );
    provide(HTreeSizeInjectKey, size);
    provide(HTreeExpandedNodesUuidInjectKey, expandedNodesUuid);
    provide(HTreeSwitchNodeExpandStatusInjectKey, switchNodeExpandStatus);
    provide(HTreeSelectedNodesUuidInjectKey, selectedValuesUuid);
    provide(HTreeSwitchNodeSelectedStatusInjectKey, switchNodeSelectedStatus);
    provide(HTreeHelperInjectKey, tree);
    provide(HTreeHighlightMethodInjectKey, useHighlightMethod(refProps));
    provide(HTreeLoadingNodesInjectKey, loadingNodes);
    provide(HTreeVNodeCollectionInjectKey, collectVNode);
    provide(HTreeFullCheckedValuesInjectKey, fullCheckedValues);
    provide(HTreeHalfCheckedValuesInjectKey, halfCheckedValues);
    provide(HTreeOnDragStartInjectKey, onDragStart);
    provide(HTreeIsDraggingInjectKey, isDragging);
    provide(HTreeDragToNodeUuidInjectKey, dragToNodeUuid);
    provide(HTreeDragFromNodeInjectKey, dragFromNode);
    provide(HTreeDragOffsetInjectKey, dragOffset);
    provide(HTreeSetItemElementInjectKey, setItemElement);

    /**
     * exposes
     */
    expose({
      getSelectedNodes() {
        return {
          values: fullCheckedValues.value,
          nodes: fullCheckedValues.value.map(value => ({
            vnode: vNodesMapping.get(value),
            node: tree.flattenTreeData.value.find(curr => curr.value === value)!,
            value,
          })),
        };
      },
      getPartSelectedNodes() {
        return {
          values: halfCheckedValues.value,
          nodes: halfCheckedValues.value.map(value => ({
            vnode: vNodesMapping.get(value),
            node: tree.flattenTreeData.value.find(curr => curr.value === value)!,
            value,
          })),
        };
      },
      getUnSelectedNodes() {
        const unSelectedNodes = tree.flattenTreeData.value.filter(
          node =>
            !fullCheckedValues.value.includes(node._uuid) &&
            !halfCheckedValues.value.includes(node._uuid),
        );
        return {
          values: unSelectedNodes.map(node => node.value),
          nodes: unSelectedNodes.map(node => ({
            vnode: vNodesMapping.get(node._uuid),
            node,
            value: node.value,
          })),
        };
      },
      setSelectedStatus(values: Array<string | number>, selected: boolean) {
        values.forEach(value =>
          switchNodeSelectedStatus(value, selected, undefined, undefined, false),
        );
      },
      getExpandNodes() {
        const values = Array.from(expandedNodesUuid.values());
        return {
          values,
          nodes: values.map(value => vNodesMapping.get(value)),
        };
      },
      setCollapseStatusByValue,
      clearSelectedValues,
      setAllCollapseStatus(isExpand: boolean) {
        isExpand ? expandAll() : foldAll();
      },
      getNodeByValues(values: Array<string | number>) {
        return Object.fromEntries(
          tree.flattenTreeData.value
            .filter(node => values.includes(node.value))
            .map(node => [
              node.value,
              {
                vnode: vNodesMapping.get(node.value),
                node,
                value: node.value,
              },
            ]),
        );
      },
      setNodeByValue: setNode,
      delNodeByValue: deleteNode,
      addNodeChildrenByValue: addNodeChildren,
      getVisibleItems: () =>
        visibleItems.value.map(curr => ({
          ...curr.originOption,
          level: curr.level,
        })),
      treeTemplateRef: wrapperDomRef,
      scrollTo,
      keyboardEventDeal: handleKeyboard,
    });

    return () => (
      <div
        v-loading={loading.value}
        ref={wrapperDomRef}
        class={cls(
          classHelper.block,
          classHelper.m(size.value),
          classHelper.is('multiple', multipleProp.value),
          classHelper.is('disabled', disabledProp.value),
          classHelper.is('dragging', isDragging.value),
          classHelper.is('draggable', draggableProp.value),
          classHelper.has('sub-level', hasSubTree.value),
          rootClassNameProp?.value,
        )}
        style={rootStyleProp?.value}
        role="tree"
        tabindex={disabledProp.value ? undefined : 0}
        aria-activedescendant={
          focusedNodeUuid.value === undefined
            ? undefined
            : `${treeId}-item-${focusedNodeUuid.value}`
        }
        onKeydown={handleKeyboard}
      >
        {isUsingFilter.value && !hideFilterInputProp.value && (
          <div class={cls(classHelper.e('filter'))}>
            <HInput
              v-model={filterValue.value}
              type="text"
              size={size.value === 'huge' ? 'large' : size.value}
              placeholder={
                searchInputPlaceholderProp?.value ??
                (useLocaleLang('tree.searchPlaceholder').value as string)
              }
              {...(filterInputPropsProp?.value ?? {})}
            />
          </div>
        )}
        <div v-show={visibleItems.value.length > 0} class={cls(classHelper.e('list'))}>
          {useVirtualScrollProp.value ? (
            <HVirtualScroller
              ref={scrollerDomRef}
              scrollerHeight={heightProp?.value}
              scrollerMaxHeight={maxHeightProp?.value}
              items={visibleItems.value}
              minItemSize={sizeMapping[size.value]}
              keyField="_uuid"
              buffer={
                virtualScrollBufferProp?.value ??
                (maxHeightProp?.value ? parseFloat(maxHeightProp.value.toString()) : undefined)
              }
              size="small"
              expandWrapperByChildren={expandWrapperByChildrenProp.value}
              onScrollStart={() => emit('reachTop')}
              onScrollEnd={() => emit('reachBottom')}
              onScrollBegin={() => (isScrolling.value = true)}
              onScrollStop={() => (isScrolling.value = false)}
            >
              {{
                default: (row: { item: HTreeExtendsData; index: number; active: boolean }) => (
                  <HVirtualScrollerItem item={row.item} active={row.active} index={row.index}>
                    <TreeItem key={row.item._uuid} value={row.item} indent={indentValue.value} />
                  </HVirtualScrollerItem>
                ),
              }}
            </HVirtualScroller>
          ) : (
            <HScrollbar
              size="small"
              height={heightProp?.value}
              maxHeight={maxHeightProp?.value}
              onReachTop={() => emit('reachTop')}
              onReachBottom={() => emit('reachBottom')}
              onScroll={() => (isScrolling.value = true)}
              onScrollEnd={() => (isScrolling.value = false)}
            >
              {visibleItems.value.map(item => (
                <TreeItem key={item._uuid} value={item} indent={indentValue.value} />
              ))}
            </HScrollbar>
          )}
        </div>
        <div v-show={visibleItems.value.length === 0} class={classHelper.e('empty')}>
          {slots.empty?.() ?? emptyTextProp?.value ?? useLocaleLang('tree.emptyText').value}
        </div>
        {dragFromNode.value && isDragging.value && (
          <div class={classHelper.em('drag', 'top')}>
            {dragToTop.value && (
              <div
                class={classHelper.e('drag-over-cursor')}
                style={{
                  width: `calc(100% - 16px - ((${cssVariable('tree', 'size', 'drag-over-cursor-arrow')} + ${cssVariable('tree', 'size', 'drag-over-cursor', 'height')} * 2))`,
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  },
});
