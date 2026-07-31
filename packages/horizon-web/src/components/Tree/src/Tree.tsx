import { computed, defineComponent, Fragment, provide, ref, toRefs, watch } from 'vue';
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
  HTreeDragToNodeUuidInjectKey,
  HTreeEmitsInjectKey,
  HTreeExpandedNodesUuidInjectKey,
  HTreeFilterInputValueInjectKey,
  HTreeFullCheckedValuesInjectKey,
  HTreeHalfCheckedValuesInjectKey,
  HTreeHelperInjectKey,
  HTreeHighlightMethodInjectKey,
  HTreeIsDraggingInjectKey,
  HTreeLoadingNodesInjectKey,
  HTreeOnDragStartInjectKey,
  HTreePropsInjectKey,
  HTreeSelectedNodesUuidInjectKey,
  HTreeSizeInjectKey,
  HTreeSlotsInjectKey,
  HTreeSwitchNodeExpandStatusInjectKey,
  HTreeSwitchNodeSelectedStatusInjectKey,
  HTreeVNodeCollectionInjectKey,
} from './utils/injectKeys';
import HInput from '~/components/Input/src/Input';
import Tree from '~/utils/useTree/index';
import type { HTreeExtendsData, HTreeData } from './utils/types';
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
import isEqual from 'lodash/isEqual';
import useVNodeCollection from './hooks/useVNodeCollection';
import useDraggable from './hooks/useDraggable';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import loading from '~/directives/v-loading';
import useScroll from './hooks/useScroll';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import useHighlight from './hooks/useHighlight';

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
      itemSize: itemSizeProp,
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
      computed(() => sizeProp?.value || itemSizeProp?.value),
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
    const shadowItemDomRef = ref<HorizonWebComponentInstance<typeof TreeItem> | null>(null);

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

    const { loadingNodes, dynamicLoad } = useDynamicLoad(refProps, setNodeChildren);

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
    );

    const { selectedValuesUuid, switchNodeSelectedStatus, fullCheckedValues, halfCheckedValues } =
      useCheckable(refProps, tree, emit);

    const { vNodesMapping, collectVNode } = useVNodeCollection();

    const { isDragging, dragFromNode, dragToNodeUuid, draggingStyle, dragToTop, onDragStart } =
      useDraggable({
        props: refProps,
        treeDomRef: wrapperDomRef,
        treeHelper: tree,
        setNodeExpandStatus,
        expandedNodesUuid,
        treeDataMutations: {
          deleteNode,
          setNodeChildren,
          addNodeChildren,
        },
        isLoading: loading,
        shadowItemDomRef,
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
        if (!isEqual(result, prevEmittedSelectedValues)) {
          emit('update:selectedValues', result);
          prevEmittedSelectedValues = result;
        }
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
      clearSelectedValues: () => {
        selectedValuesUuid.clear();
      },
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
          <Fragment>
            <div class={classHelper.em('drag', 'top')}>
              {dragToTop.value && (
                //  &&
                //                 (props.dragToDifferentParent ? true : dragFromNode.value.parent === undefined)
                <div
                  class={classHelper.e('drag-over-cursor')}
                  style={{
                    width: `calc(100% - 16px - ((${cssVariable(
                      'tree-size--drag-over-cursor-arrow',
                    )} + ${cssVariable('tree-height--drag-over-cursor')} * 2))`,
                  }}
                />
              )}
            </div>
            <TreeItem
              ref={shadowItemDomRef}
              key={dragFromNode.value._uuid}
              value={dragFromNode.value}
              indent={indentValue.value}
              shadow={true}
              style={{
                position: 'absolute',
                width: draggingStyle.value.width + 'px',
                left: draggingStyle.value.left + 'px',
                top: draggingStyle.value.top + 'px',
              }}
            />
          </Fragment>
        )}
      </div>
    );
  },
});
