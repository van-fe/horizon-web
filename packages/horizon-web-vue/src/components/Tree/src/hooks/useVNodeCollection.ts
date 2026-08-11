import type { VNode } from 'vue';
import { reactive } from 'vue';

export default function () {
  const vNodesMapping = reactive(new Map<string | number, VNode | undefined>());

  function collectVNode(uuid: string | number, vNode?: VNode) {
    vNodesMapping.set(uuid, vNode);
  }

  return {
    vNodesMapping,
    collectVNode,
  };
}
