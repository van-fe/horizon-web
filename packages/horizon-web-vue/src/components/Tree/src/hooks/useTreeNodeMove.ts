import type Tree from '~/utils/useTree';
import { warn } from '~/utils/useLog';
import type { TreeDataMutations } from './useTreeData';
import type { HTreeData, HTreeExtendsData, HTreeUuidType } from '../utils/types';

export type TreeDropPosition = 'root' | 'child' | 'after';

export interface TreeNodeMoveOptions {
  fromValue: HTreeUuidType;
  toValue?: HTreeUuidType;
  position: TreeDropPosition;
}

export default function useTreeNodeMove(
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  { deleteNode, setNodeChildren, addNodeChildren }: TreeDataMutations,
) {
  function findTransformedNode(value: HTreeUuidType) {
    return treeHelper.flattenTreeData.value.find(
      node => treeHelper.getOptionValue(node, 'value') === value,
    );
  }

  function cancelMissingTarget() {
    warn('tree', 'drop node is disappear');
    return false;
  }

  function moveNode({ fromValue, toValue, position }: TreeNodeMoveOptions) {
    const fromNode = findTransformedNode(fromValue);

    if (!fromNode) {
      return false;
    }

    if (position === 'root') {
      const deletedNode = deleteNode(fromValue, false);

      if (!deletedNode.length) {
        return false;
      }

      addNodeChildren(deletedNode, undefined, false);
      return true;
    }

    if (toValue === undefined) {
      return cancelMissingTarget();
    }

    const toNode = findTransformedNode(toValue);
    const targetBaseNode = treeHelper.getBaseTreeTargetByValue(treeHelper.originTreeData, toValue);

    if (!toNode || !targetBaseNode) {
      return cancelMissingTarget();
    }

    if (toNode.uuidPath.includes(fromNode._uuid)) {
      return false;
    }

    if (position === 'child') {
      const deletedNode = deleteNode(fromValue, false);

      if (!deletedNode.length) {
        return false;
      }

      addNodeChildren(deletedNode, toValue, false);
      return true;
    }

    if (toNode.parent) {
      const parentValue = treeHelper.getOptionValue(toNode.parent, 'value');
      const parentBaseNode = treeHelper.getBaseTreeTargetByValue(
        treeHelper.originTreeData,
        parentValue,
      );
      const parentChildren = parentBaseNode
        ? treeHelper.getOptionValue(parentBaseNode, 'children')
        : undefined;

      if (
        !Array.isArray(parentChildren) ||
        !parentChildren.some(node => treeHelper.getOptionValue(node, 'value') === toValue)
      ) {
        return cancelMissingTarget();
      }

      const deletedNode = deleteNode(fromValue, false);
      const insertBehindIndex = parentChildren.findIndex(
        node => treeHelper.getOptionValue(node, 'value') === toValue,
      );

      if (!deletedNode.length || insertBehindIndex < 0) {
        return false;
      }

      setNodeChildren(
        parentValue,
        parentChildren.toSpliced(insertBehindIndex + 1, 0, ...deletedNode),
      );
      return true;
    }

    if (
      !treeHelper.originTreeData.some(node => treeHelper.getOptionValue(node, 'value') === toValue)
    ) {
      return cancelMissingTarget();
    }

    const deletedNode = deleteNode(fromValue, false);
    const insertBehindIndex = treeHelper.originTreeData.findIndex(
      node => treeHelper.getOptionValue(node, 'value') === toValue,
    );

    if (!deletedNode.length || insertBehindIndex < 0) {
      return false;
    }

    setNodeChildren(
      null,
      treeHelper.originTreeData.toSpliced(insertBehindIndex + 1, 0, ...deletedNode),
    );
    return true;
  }

  return {
    moveNode,
  };
}
