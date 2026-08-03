import type { Ref, ToRefs } from 'vue';
import type Tree from '~/utils/useTree';
import type { TreeProps } from '../composables/useProps';
import type { HTreeData, HTreeExtendsData } from '../utils/types';
import type { TreeDataMutations } from './useTreeData';
import useTreeNodeMove from './useTreeNodeMove';
import type { TreeDropPosition } from './useTreeNodeMove';

interface TreeRootDropContext {
  fromNode: HTreeExtendsData;
  position: Extract<TreeDropPosition, 'root'>;
}

interface TreeTargetDropContext {
  fromNode: HTreeExtendsData;
  toNode: HTreeExtendsData;
  position: Exclude<TreeDropPosition, 'root'>;
}

export type TreeDropContext = TreeRootDropContext | TreeTargetDropContext;

export default function useDropNode(
  props: ToRefs<TreeProps>,
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  isLoading: Ref<boolean>,
  treeDataMutations: TreeDataMutations,
) {
  const { moveNode } = useTreeNodeMove(treeHelper, treeDataMutations);

  function canDrop(context: TreeDropContext) {
    return context.position === 'root' || !context.toNode.uuidPath.includes(context.fromNode._uuid);
  }

  function getNodeWithLevel(node: HTreeExtendsData) {
    return {
      ...node.originOption,
      level: node.level,
    };
  }

  function getBeforeDropArguments(context: TreeDropContext) {
    const current = getNodeWithLevel(context.fromNode);

    if (context.position === 'root') {
      return [current, null, null] as const;
    }

    if (context.position === 'child') {
      return [current, getNodeWithLevel(context.toNode), null] as const;
    }

    return [
      current,
      context.toNode.parent ? getNodeWithLevel(context.toNode.parent) : null,
      getNodeWithLevel(context.toNode),
    ] as const;
  }

  function dropNode(context: TreeDropContext, onFinish: () => void) {
    if (!canDrop(context)) {
      onFinish();
      return;
    }

    const performMove = () => {
      moveNode({
        fromValue: treeHelper.getOptionValue(context.fromNode, 'value'),
        toValue:
          context.position === 'root'
            ? undefined
            : treeHelper.getOptionValue(context.toNode, 'value'),
        position: context.position,
      });
      onFinish();
    };

    const beforeDrop = props.beforeDrop?.value;

    if (!beforeDrop) {
      performMove();
      return;
    }

    isLoading.value = true;

    let beforeDropResult: ReturnType<typeof beforeDrop>;

    try {
      const [current, target, prev] = getBeforeDropArguments(context);
      beforeDropResult = beforeDrop(current, target, prev);
    } catch (error) {
      console.error(error);
      isLoading.value = false;
      onFinish();
      return;
    }

    Promise.resolve(beforeDropResult)
      .then(status => {
        if (status !== false) {
          performMove();
        } else {
          onFinish();
        }
      })
      .catch(error => {
        console.error(error);
        onFinish();
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  return {
    dropNode,
  };
}
