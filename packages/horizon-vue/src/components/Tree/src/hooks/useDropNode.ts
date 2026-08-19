import type { Ref, ToRefs } from 'vue';
import { onBeforeUnmount, watch } from 'vue';
import { normalizeTreeData, TreeDropController } from '@aurora/core';
import type { TreeNormalizedNode } from '@aurora/core';
import type Tree from '~/utils/useTree';
import type { TreeProps } from '../composables/useProps';
import type { HTreeData, HTreeExtendsData } from '../utils/types';
import type { TreeDataMutations } from './useTreeData';
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

interface TreeDropCallbacks {
  onBeforeMove?: () => void;
  onFinish: (moved: boolean) => void;
}

/** Vue adapter around the renderer-neutral async drop controller. */
export default function useDropNode(
  props: ToRefs<TreeProps>,
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  isLoading: Ref<boolean>,
  { setNodeChildren }: TreeDataMutations,
) {
  const controller = new TreeDropController<HTreeData>();

  watch([props.treeData, () => props.fieldMap?.value], () => controller.invalidate(), {
    deep: true,
  });

  onBeforeUnmount(() => controller.destroy());

  function getLegacyNode(node: TreeNormalizedNode<HTreeData> | null | undefined) {
    if (!node) return null;
    const legacy = treeHelper.flattenTreeData.value.find(item => item._uuid === node.value);
    return legacy ? { ...legacy.originOption, level: legacy.level } : null;
  }

  function dropNode(context: TreeDropContext, callbacks: TreeDropCallbacks) {
    const normalized = normalizeTreeData(
      treeHelper.originTreeData,
      treeHelper.fieldMapping as Record<string, string>,
    );
    const source = normalized.byValue.get(treeHelper.getOptionValue(context.fromNode, 'value'));
    const target =
      context.position === 'root'
        ? undefined
        : normalized.byValue.get(treeHelper.getOptionValue(context.toNode, 'value'));

    if (!source || (context.position !== 'root' && !target)) {
      callbacks.onFinish(false);
      return;
    }

    const beforeDrop = props.beforeDrop?.value;
    isLoading.value = !!beforeDrop;

    void controller
      .drop(
        treeHelper.originTreeData,
        { source, target, position: context.position },
        {
          fieldMap: treeHelper.fieldMapping as Record<string, string>,
          dragToLeaf: props.dragToLeaf.value,
          beforeDrop: beforeDrop
            ? (current, targetNode, prevNode) => {
                const currentLegacy = getLegacyNode(current);
                if (!currentLegacy) return false;
                return beforeDrop(
                  currentLegacy,
                  getLegacyNode(targetNode),
                  getLegacyNode(prevNode),
                );
              }
            : undefined,
        },
      )
      .then(result => {
        if (result.status !== 'moved') {
          if (result.status === 'rejected') console.error(result.error);
          callbacks.onFinish(false);
          return;
        }
        callbacks.onBeforeMove?.();
        setNodeChildren(null, result.data as HTreeData[]);
        callbacks.onFinish(true);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  return { dropNode };
}
