import { moveTreeNode } from '@aurora/core';
import type { TreeMovePosition } from '@aurora/core';
import type Tree from '~/utils/useTree';
import { warn } from '~/utils/useLog';
import type { TreeDataMutations } from './useTreeData';
import type { HTreeData, HTreeExtendsData, HTreeUuidType } from '../utils/types';

export type TreeDropPosition = TreeMovePosition;

export interface TreeNodeMoveOptions {
  fromValue: HTreeUuidType;
  toValue?: HTreeUuidType;
  position: TreeDropPosition;
}

/**
 * Adapts the renderer-neutral immutable mover while retaining the historical Vue helper's
 * in-place root array identity required by TreeSelect and v-model treeData consumers.
 */
export default function useTreeNodeMove(
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  { setNodeChildren }: TreeDataMutations,
) {
  function moveNode({ fromValue, toValue, position }: TreeNodeMoveOptions) {
    const result = moveTreeNode(
      treeHelper.originTreeData,
      { fromValue, toValue, position },
      treeHelper.fieldMapping as Record<string, string>,
    );

    if (result.status !== 'moved') {
      if (result.status === 'missing-source' || result.status === 'missing-target') {
        warn('tree', 'drop node is disappear');
      }
      return false;
    }

    setNodeChildren(null, result.data as HTreeData[]);
    return true;
  }

  return {
    moveNode,
  };
}
