import type { Ref, VNode } from 'vue';
import { inject } from 'vue';
import type { NTreeData, NTreeExtendsData } from '../utils/types';
import type { TreeProps } from '../composables/useProps';
import type Tree from '~/utils/useTree/index';
import { cls, ComponentClassBlock } from '@aurora/shared';
import { NTreeSizeInjectKey } from '../utils/injectKeys';

export default function useLine(
  treeProps: TreeProps,
  options: {
    treeItem: Ref<NTreeExtendsData>;
    getPadding: (level: number) => number;
    treeHelper: Tree<NTreeData, NTreeExtendsData>;
    expandedNodesUuid: Set<string | number>;
  },
) {
  const classHelper = new ComponentClassBlock('tree-item');

  const size = inject(NTreeSizeInjectKey)!;

  function getLinePosition(level: number) {
    return options.getPadding(level) + (size.value === 'huge' ? 10 : 8);
  }

  function getTheLatestNode(node: NTreeExtendsData): NTreeExtendsData {
    return node.transformedChildren.at(-1) && options.expandedNodesUuid.has(node._uuid)
      ? getTheLatestNode(node.transformedChildren.at(-1)!)
      : node;
  }

  function shouldStopInMiddle(node: NTreeExtendsData) {
    if (!!node.__context.next) {
      if (node.__context.next.isLeaf) {
        return getTheLatestNode(node) === options.treeItem.value;
      } else {
        return false;
      }
    }

    return getTheLatestNode(node) === options.treeItem.value;
  }

  function renderParentShownLine() {
    if (!treeProps.showLine || options.treeItem.value.level === 0) return undefined;

    const vNodes: VNode[] = [];

    for (const node of options.treeItem.value.paths.slice(0, -1)) {
      const index = options.treeItem.value.paths.indexOf(node);

      vNodes.push(
        <div
          class={cls(
            classHelper.e('parent-shown-line'),
            classHelper.is('stop-in-middle', shouldStopInMiddle(node)),
          )}
          style={{ left: getLinePosition(index) + 'px' }}
        />,
      );
    }

    return vNodes;
  }

  return {
    renderParentShownLine,
  };
}
