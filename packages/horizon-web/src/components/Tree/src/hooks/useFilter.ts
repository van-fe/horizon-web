import type { ToRefs, UnwrapNestedRefs } from 'vue';
import { computed, ref, watch } from 'vue';
import type { TreeProps } from '../composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { isObject } from '@aurora/utils';
import type { HTreeExtendsData, HTreeData } from '../utils/types';
import type Tree from '~/utils/useTree/index';
import type { TreeEmits } from '../composables/useEmits';

export default function (
  props: ToRefs<TreeProps>,
  emit: HorizonWebSetupContext<TreeEmits>['emit'],
  tree: Tree<HTreeData, HTreeExtendsData>,
  expandedNodesUuid: UnwrapNestedRefs<Set<string | number>>,
) {
  const filterValue = ref<string | undefined>(props.filterValue?.value);
  const isDuringFilter = computed(
    () => !!filterValue.value || !!props.filterInputValue?.value || false,
  );
  const isUsingFilter = computed(
    () =>
      !!props.filter?.value || props.filterable?.value || props.filterInputValue?.value || false,
  );
  const expandFilteredTree = computed(() =>
    isObject(props.filter?.value)
      ? (props.filter?.value?.expandSearchedTree ?? props.expandFilteredTree.value)
      : props.expandFilteredTree.value,
  );

  const filterValueMerged = computed(
    () => filterValue.value || props.filterInputValue?.value || '',
  );

  const filterMethod = computed(() => {
    const defaultFilterMethod = (input: string, node: HTreeExtendsData) => {
      return (
        (props.filterToHideChildren.value ? node.stringLabel : node.fullPathLabel)
          ?.toLowerCase()
          .includes(input.toLowerCase()) || false
      );
    };

    if (props.filter?.value) {
      return typeof props.filter.value === 'boolean'
        ? defaultFilterMethod
        : props.filter.value.filterMethod;
    }

    if (props.filterable?.value) {
      return props.filterMethod?.value ? props.filterMethod.value : defaultFilterMethod;
    }

    return defaultFilterMethod;
  });

  /**
   * For check filter value changed.
   * If it has changed, the expanded will clear and set filtered nodes
   */
  let prevFilterValue = '';

  const visibleItems = computed<HTreeExtendsData[]>(() => {
    let tempVisibleOptions = tree.flattenTreeData.value.concat();

    if (isUsingFilter.value && isDuringFilter.value) {
      const flattenFilterResults = new Set<HTreeExtendsData>();
      tree.flattenTreeData.value
        .filter(option =>
          filterMethod.value(
            props.filterInputValue?.value || filterValue.value?.trim() || '',
            option,
          ),
        )
        .forEach(item => {
          tree.getAncestors(item).forEach(ancestor => flattenFilterResults.add(ancestor));
        });

      if (expandFilteredTree.value && prevFilterValue !== filterValueMerged.value) {
        expandedNodesUuid.clear();
        flattenFilterResults.forEach(item => {
          if (!item.isLeaf) {
            expandedNodesUuid.add(item._uuid);
          }
        });

        prevFilterValue = filterValueMerged.value;
      }

      tempVisibleOptions = tempVisibleOptions.filter(option => flattenFilterResults.has(option));
    }

    const visibleNodes = new Set<HTreeExtendsData>();

    return tempVisibleOptions.filter(item => {
      const visible =
        item.isRoot ||
        (!!item.parent &&
          visibleNodes.has(item.parent) &&
          expandedNodesUuid.has(item.parent._uuid));

      if (visible) {
        visibleNodes.add(item);
      }

      return visible;
    });
  });

  watch(
    () => props.filterValue,
    val => {
      filterValue.value = val?.value;
    },
  );

  watch(filterValue, val => {
    emit('update:filterValue', val);
  });

  watch(filterValueMerged, (value, oldValue) => {
    if (!!oldValue && !value) {
      expandedNodesUuid.clear();
    }
  });

  watch(
    visibleItems,
    val => {
      emit('update:visibleNodes', val);
    },
    {
      immediate: true,
    },
  );

  return {
    filterValue,
    isDuringFilter,
    isUsingFilter,
    filterValueMerged,
    expandFilteredTree,
    filterMethod,
    visibleItems,
  };
}
