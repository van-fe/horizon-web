import type { ToRefs, VNode } from 'vue';
import { computed, reactive, watch } from 'vue';
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
  const expandedNodesUuid = reactive(new Set<string | number>(props.expandValues?.value));

  const indentValue = computed(() =>
    tree.flattenTreeData.value.some(
      node => node.level > 0 || node.isLeaf === false || node.children?.length,
    )
      ? props.indent.value
      : 0,
  );

  watch(
    () => props.expandValues?.value,
    () => {
      updateExpandStatusByProps();
    },
    {
      immediate: true,
    },
  );

  watch(tree.flattenTreeData, () => {
    updateExpandStatusByProps();
  });

  /**
   * to default expand all nodes
    * @en Description for if.
   */
  if (props.isDefaultExpandAll.value) {
    tree.flattenTreeData.value.forEach(item => {
      if (!item.isLeaf) {
        expandedNodesUuid.add(item._uuid);
      }
    });
  }

  function updateExpandStatusByProps() {
    const values = props.expandValues?.value;

    if (Array.isArray(values) && tree.flattenTreeDataMapping.value.size) {
      expandedNodesUuid.clear();
      values.forEach(value => {
        if (props.isDefaultExpandParent.value) {
          tree.flattenTreeDataMapping.value.get(value)?.uuidPath.forEach(uuid => {
            expandedNodesUuid.add(uuid);
          });
        } else {
          expandedNodesUuid.add(value);
        }
      });
    }
  }

  function switchNodeExpandStatus(node: HTreeExtendsData, evt: Event, vNode?: VNode) {
    if (expandedNodesUuid.has(node._uuid)) {
      setNodeExpandStatus(node, false, evt, vNode);
    } else {
      setNodeExpandStatus(node, true, evt, vNode);
    }
  }

  function setNodeExpandStatus(
    node: HTreeExtendsData,
    expand: boolean,
    evt?: Event,
    vNode?: VNode,
  ) {
    if (expand) {
      expandedNodesUuid.add(node._uuid);

      if (!node.isLeaf && node.transformedChildren.length === 0) {
        dynamicLoad(node, vNode);
      }
    } else {
      expandedNodesUuid.delete(node._uuid);

      tree.flattenTreeData.value.forEach(item => {
        if (item.paths.includes(node)) {
          expandedNodesUuid.delete(item._uuid);
        }
      });
    }

    emit('expand', Array.from(expandedNodesUuid.values()), tree.getOptionValue(node, 'value'), {
      expanded: expand,
      nativeEvent: evt,
      vnode: vNode,
      node: tree.getBaseTreeDataWithLevel(node),
      nodeComputed: node,
    });
  }

  function expandAll() {
    tree.flattenTreeData.value.forEach(item => !item.isLeaf && expandedNodesUuid.add(item._uuid));
  }

  function foldAll() {
    expandedNodesUuid.clear();
  }

  function setCollapseStatusByValue(values: Array<string | number>, isExpand: boolean) {
    if (isExpand) {
      values.forEach(value => {
        const detail = tree.getInfoByValue(value);

        if (detail && props.isDefaultExpandParent.value) {
          detail.paths.forEach(node => !node.isLeaf && expandedNodesUuid.add(node.value));
        } else {
          expandedNodesUuid.add(value);
        }
      });
    } else {
      values.forEach(value => expandedNodesUuid.delete(value));
    }
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
