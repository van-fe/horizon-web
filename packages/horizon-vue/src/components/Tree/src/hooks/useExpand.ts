import type { ToRefs, VNode } from 'vue';
import { computed, reactive, watch } from 'vue';
import { normalizeTreeData, TreeExpansionController } from '@aurora/core';
import type { TreeStateReason } from '@aurora/core';
import type { TreeProps } from '../composables/useProps';
import type { HTreeData, HTreeExtendsData } from '../utils/types';
import type Tree from '~/utils/useTree/index';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { TreeEmits } from '../composables/useEmits';

export default function (
  props: ToRefs<TreeProps>,
  tree: Tree<HTreeData, HTreeExtendsData>,
  dynamicLoad: (currentNode: HTreeExtendsData, vNode?: VNode) => void,
  emit: HorizonWebSetupContext<TreeEmits>['emit'],
) {
  const expandedNodesUuid = reactive(new Set<string | number>());
  const controller = new TreeExpansionController<HTreeData>({
    value: props.expandValues?.value,
    defaultExpandParent: props.isDefaultExpandParent.value,
  });

  const indentValue = computed(() =>
    tree.flattenTreeData.value.some(
      node => node.level > 0 || node.isLeaf === false || node.children?.length,
    )
      ? props.indent.value
      : 0,
  );

  function syncLegacyValues() {
    expandedNodesUuid.clear();
    const expanded = new Set(controller.expandedValues);
    tree.flattenTreeData.value.forEach(node => {
      if (expanded.has(node.value)) expandedNodesUuid.add(node.value);
    });
    // Preserve values not currently represented by lazy/unloaded data.
    controller.expandedValues.forEach(value => expandedNodesUuid.add(value));
  }

  function syncTree(values = props.expandValues?.value) {
    controller.setOptions({
      value: values,
      defaultExpandParent: props.isDefaultExpandParent.value,
    });
    try {
      controller.setTree(
        normalizeTreeData(tree.originTreeData, tree.fieldMapping as Record<string, string>),
        props.isDefaultExpandAll.value,
      );
    } catch {
      // Legacy Tree permits temporary duplicate values during imperative editing.
      return;
    }
    if (Array.isArray(values)) controller.sync(values);
    syncLegacyValues();
  }

  watch(
    [() => props.expandValues?.value, tree.flattenTreeData, props.isDefaultExpandParent],
    () => syncTree(),
    { immediate: true },
  );

  function switchNodeExpandStatus(node: HTreeExtendsData, evt: Event, vNode?: VNode) {
    setNodeExpandStatus(node, !expandedNodesUuid.has(node._uuid), evt, vNode);
  }

  function setNodeExpandStatus(
    node: HTreeExtendsData,
    expand: boolean,
    evt?: Event,
    vNode?: VNode,
    reason: TreeStateReason = evt instanceof KeyboardEvent ? 'keyboard' : 'pointer',
  ) {
    const result = controller.set(node.value, expand, reason);
    syncLegacyValues();

    if (result.expanded && !node.isLeaf && node.transformedChildren.length === 0) {
      dynamicLoad(node, vNode);
    }

    emit('expand', result.values, tree.getOptionValue(node, 'value'), {
      expanded: result.expanded,
      nativeEvent: evt,
      vnode: vNode,
      node: tree.getBaseTreeDataWithLevel(node),
      nodeComputed: node,
    });
  }

  function expandAll() {
    controller.setAll(true, 'imperative');
    syncLegacyValues();
  }

  function foldAll() {
    controller.setAll(false, 'imperative');
    syncLegacyValues();
  }

  function setCollapseStatusByValue(
    values: Array<string | number>,
    isExpand: boolean,
    reason: TreeStateReason = 'imperative',
  ) {
    const normalized = normalizeTreeData(
      tree.originTreeData,
      tree.fieldMapping as Record<string, string>,
    );
    const valuesToSet = isExpand
      ? values.flatMap(value => {
          const node = normalized.byValue.get(value);
          if (!node) return [value];
          return node.keyPath.slice(0, node.isLeaf ? -1 : undefined);
        })
      : values;
    controller.setMany(valuesToSet, isExpand, reason);
    syncLegacyValues();
  }

  return {
    expandedNodesUuid,
    indentValue,
    switchNodeExpandStatus,
    setNodeExpandStatus,
    setCollapseStatusByValue,
    expandAll,
    foldAll,
  };
}
