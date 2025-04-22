import type { VNode } from 'vue';

function hasTypeName(vNode: VNode): vNode is VNode & { type: { name: string } } {
  return !!vNode.type && typeof vNode.type === 'object' && 'name' in vNode.type;
}

export default function (vNodes: VNode[], type: 'default' | 'dropdownMenu') {
  const def: VNode[] = [];
  const dropdownVNodes: VNode[] = [];

  for (const node of vNodes) {
    if (hasTypeName(node) && node.type.name.endsWith('DropdownMenu')) {
      dropdownVNodes.push(node);
    } else {
      def.push(node);
    }
  }

  return type === 'default' ? def : dropdownVNodes;
}
