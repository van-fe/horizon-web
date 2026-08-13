import type { ToRefs, UnwrapNestedRefs } from 'vue';
import { computed, ref, watch } from 'vue';
import { filterTree, getVisibleTreeNodes, normalizeTreeData } from '@aurora/core';
import type { TreeNormalizedData } from '@aurora/core';
import type { TreeProps } from '../composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { HTreeExtendsData, HTreeData } from '../utils/types';
import type Tree from '~/utils/useTree/index';
import type { TreeEmits } from '../composables/useEmits';

export default function (
  props: ToRefs<TreeProps>,
  emit: HorizonWebSetupContext<TreeEmits>['emit'],
  tree: Tree<HTreeData, HTreeExtendsData>,
  expandedNodesUuid: UnwrapNestedRefs<Set<string | number>>,
  setExpandedValues: (values: Array<string | number>, expanded: boolean, reason: 'filter') => void,
) {
  const filterValue = ref<string | undefined>(props.filterValue?.value);
  const isDuringFilter = computed(
    () => !!filterValue.value || !!props.filterInputValue?.value || false,
  );
  const isUsingFilter = computed(
    () => props.filterable?.value || !!props.filterInputValue?.value || false,
  );
  const filterValueMerged = computed(
    () => filterValue.value || props.filterInputValue?.value || '',
  );
  let lastCoreTree: TreeNormalizedData<HTreeData> | undefined;
  const coreTree = computed(() => {
    // The legacy helper remains the TreeSelect/VNode projection, while this read makes Core's
    // normalized model refresh whenever that projection has rebuilt for controlled treeData.
    tree.flattenTreeData.value;
    try {
      lastCoreTree = normalizeTreeData(
        tree.originTreeData,
        tree.fieldMapping as Record<string, string>,
      );
    } catch {
      // Imperative legacy editing may briefly contain duplicate values. Keep the last valid Core
      // projection until the parent supplies a normalizable controlled treeData value.
    }
    return lastCoreTree ?? normalizeTreeData([], {});
  });
  const filterResult = computed(() =>
    filterTree(coreTree.value, filterValueMerged.value, {
      method: props.filterable?.value
        ? props.filterMethod?.value
          ? (input, node) => {
              const legacy = tree.flattenTreeDataMapping.value.get(node.value)!;
              return props.filterMethod!.value!(input, legacy);
            }
          : undefined
        : undefined,
      filterToHideChildren: props.filterToHideChildren.value,
      expand: props.expandFilteredTree.value,
    }),
  );

  // Filtering is pure above. Only query changes may update the interactive expansion state.
  watch(
    [filterValueMerged, () => props.expandFilteredTree.value],
    ([value, expandFilteredTree], [oldValue, oldExpandFilteredTree]) => {
      if (isUsingFilter.value && value && value !== oldValue && props.expandFilteredTree.value) {
        setExpandedValues(Array.from(expandedNodesUuid), false, 'filter');
        setExpandedValues(filterResult.value.expandValues, true, 'filter');
      } else if (isUsingFilter.value && value && expandFilteredTree && !oldExpandFilteredTree) {
        setExpandedValues(Array.from(expandedNodesUuid), false, 'filter');
        setExpandedValues(filterResult.value.expandValues, true, 'filter');
      } else if (oldValue && !value) {
        setExpandedValues(Array.from(expandedNodesUuid), false, 'filter');
      }
    },
    { immediate: true, flush: 'sync' },
  );

  const visibleItems = computed<HTreeExtendsData[]>(() => {
    const included =
      isUsingFilter.value && isDuringFilter.value
        ? new Set(filterResult.value.included)
        : undefined;
    return getVisibleTreeNodes(coreTree.value.flat, expandedNodesUuid, included)
      .map(node => tree.flattenTreeDataMapping.value.get(node.value))
      .filter((node): node is HTreeExtendsData => !!node);
  });

  watch(
    () => props.filterValue,
    val => {
      filterValue.value = val?.value;
    },
  );
  watch(filterValue, val => emit('update:filterValue', val));
  watch(visibleItems, val => emit('update:visibleNodes', val), { immediate: true });

  return {
    filterValue,
    isDuringFilter,
    isUsingFilter,
    filterValueMerged,
    expandFilteredTree: computed(() => props.expandFilteredTree.value),
    filterMethod: computed(() => props.filterMethod?.value),
    visibleItems,
  };
}
