import type { ToRefs, VNode, Ref } from 'vue';
import { onBeforeUnmount, ref, watch } from 'vue';
import { normalizeTreeData, TreeDynamicLoadController } from '@aurora/core';
import type { TreeProps } from '../composables/useProps';
import type { HTreeExtendsData, HTreeData } from '../utils/types';
import type Tree from '~/utils/useTree';

export default function useDynamicLoad(
  props: ToRefs<TreeProps>,
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  setNodeChildren: (value: number | string, children: HTreeData[]) => void,
) {
  const loadingNodes = ref<HTreeExtendsData[]>([]);
  const controller = new TreeDynamicLoadController<HTreeData>();

  // A controlled tree-data replacement invalidates outstanding lazy-load results. Without this,
  // an old response could replace children supplied by the parent while it was in flight.
  watch(
    props.treeData,
    () => {
      controller.invalidateData();
      loadingNodes.value = [];
    },
    { deep: true },
  );

  watch(
    () => props.dynamicLoad?.value,
    () => controller.invalidateLoader(),
  );

  onBeforeUnmount(() => {
    controller.destroy();
    loadingNodes.value = [];
  });

  function dynamicLoad(currentNode: HTreeExtendsData, vNode?: VNode) {
    if (
      loadingNodes.value.some(curr => curr._uuid === currentNode._uuid) ||
      !props.dynamicLoad?.value
    ) {
      return;
    }

    const coreNode = normalizeTreeData(
      treeHelper.originTreeData,
      treeHelper.fieldMapping as Record<string, string>,
    ).byValue.get(treeHelper.getOptionValue(currentNode, 'value'));
    if (!coreNode) return;

    loadingNodes.value.push(currentNode);

    void controller
      .load(
        coreNode,
        node =>
          props.dynamicLoad?.value?.({
            level: node.level,
            node: currentNode,
            vNode,
          }) ?? [],
      )
      .then(result => {
        if (result.status === 'loaded' && result.children.length > 0) {
          setNodeChildren(currentNode.value, result.children as HTreeData[]);
        }
      })
      .finally(() => {
        const index = loadingNodes.value.findIndex(curr => curr._uuid === currentNode._uuid);

        if (index > -1) {
          loadingNodes.value.splice(index, 1);
        }
      });
  }

  return {
    loadingNodes: loadingNodes as Ref<HTreeExtendsData[]>,
    dynamicLoad,
  };
}
