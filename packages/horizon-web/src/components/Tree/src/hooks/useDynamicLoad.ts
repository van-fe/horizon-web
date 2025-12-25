import type { ToRefs, VNode, Ref } from 'vue';
import { ref } from 'vue';
import type { TreeProps } from '../composables/useProps';
import type { HTreeExtendsData, HTreeNodeData, HTreeData } from '../utils/types';

export default function useDynamicLoad(
  props: ToRefs<TreeProps>,
  setNodeChildren: (value: number | string, children: HTreeData[]) => void,
) {
  const loadingNodes = ref<HTreeExtendsData[]>([]);

  function dynamicLoad(currentNode: HTreeExtendsData, vNode?: VNode) {
    if (
      loadingNodes.value.some(curr => curr._uuid === currentNode._uuid) ||
      (!props.dynamicLoadData?.value && !props.dynamicLoad?.value)
    ) {
      return;
    }

    loadingNodes.value.push(currentNode);

    Promise.resolve(
      props.dynamicLoadData?.value?.({
        level: currentNode.level,
        node: currentNode,
        vnode: vNode,
        vNode,
      }) ??
        props.dynamicLoad?.value?.({
          level: currentNode.level,
          node: currentNode,
          vnode: vNode,
          vNode,
        }),
    )
      .then((res: HTreeNodeData[] | undefined) => {
        if (Array.isArray(res) && res.length > 0) {
          setNodeChildren(currentNode.value, res);
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
