import type { Ref, ToRefs, UnwrapNestedRefs } from 'vue';
import type { HTreeExtendsData, HTreeUuidType, HTreeData } from '../utils/types';
import { ref, watch } from 'vue';
import type { TreeProps } from '../composables/useProps';
import { ComponentClassBlock, safelyGetEventTarget } from '@aurora/utils';
import type Tree from '~/utils/useTree';
import type { TreeDataMutations } from './useTreeData';
import useDropNode from './useDropNode';
import useSortableMotion from '~/utils/useSortableMotion';

interface UseDraggableOptions {
  props: ToRefs<TreeProps>;
  treeDomRef: Ref<HTMLElement | null>;
  treeHelper: Tree<HTreeData, HTreeExtendsData>;
  setNodeExpandStatus: (node: HTreeExtendsData, expand: boolean) => void;
  expandedNodesUuid: UnwrapNestedRefs<Set<HTreeUuidType>>;
  treeDataMutations: TreeDataMutations;
  isLoading: Ref<boolean>;
}

export default function useDraggable({
  props,
  treeDomRef,
  treeHelper,
  setNodeExpandStatus,
  expandedNodesUuid,
  treeDataMutations,
  isLoading,
}: UseDraggableOptions) {
  const treeClassHelper = new ComponentClassBlock('tree');
  const treeItemClassHelper = new ComponentClassBlock('tree-item');
  const { dropNode } = useDropNode(props, treeHelper, isLoading, treeDataMutations);

  let isDragStart = false;

  const isDragging = ref(false);

  let currentExpandedNodes: HTreeExtendsData[] = [];

  const dragFromNode = ref<HTreeExtendsData>();
  const dragToNodeUuid = ref<HTreeUuidType>();

  const dragToTop = ref(false);

  const motion = useSortableMotion<HTreeUuidType>({
    keys: () => treeHelper.flattenTreeData.value.map(node => node._uuid),
    onPointerMove: onDragMove,
    onPointerEnd: onDragEnd,
    onPointerCancel: () => dragStop(),
  });

  let timer: ReturnType<typeof setTimeout> | null = null;

  function clearTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  watch(dragToNodeUuid, val => {
    clearTimer();

    if (val && dragFromNode.value) {
      if (val.toString() === dragFromNode.value._uuid.toString()) return;

      timer = setTimeout(() => {
        const node = treeHelper.flattenTreeData.value.find(
          curr =>
            treeHelper.getOptionValue(curr, 'value').toString() === val.toString() &&
            dragFromNode.value &&
            !curr.uuidPath.includes(dragFromNode.value._uuid),
        );

        if (node) {
          setNodeExpandStatus(node, true);
        }
      }, 1000);
    }
  });

  watch(isDragging, val => {
    if (!val) {
      clearTimer();
    }
  });

  function getTreeItemByDomNode(domNode: HTMLElement | null, className: string) {
    let curr = domNode;

    while (curr && curr !== document.documentElement) {
      if (curr.classList.contains(className)) {
        return curr;
      }

      curr = curr.parentElement;
    }

    return null;
  }

  function hasClassWithinTreeItem(domNode: HTMLElement, className: string) {
    let curr: HTMLElement | null = domNode;

    while (curr && !curr.classList.contains(treeItemClassHelper.block)) {
      if (curr.classList.contains(className)) {
        return true;
      }

      curr = curr.parentElement;
    }

    return false;
  }

  function onDragStart(node: HTreeExtendsData, evt: PointerEvent) {
    if (!isDragging.value) {
      isDragStart = true;
      dragFromNode.value = node;

      if (dragFromNode.value && !treeHelper.getOptionValue(dragFromNode.value, 'isLeaf')) {
        currentExpandedNodes = treeHelper.flattenTreeData.value.filter(
          curr =>
            !treeHelper.getOptionValue(curr, 'isLeaf') &&
            expandedNodesUuid.has(curr._uuid) &&
            curr.uuidPath.includes(dragFromNode.value!._uuid),
        );
      }
      motion.startPointerDrag(evt);
    }
  }

  function onDragMove(evt: PointerEvent) {
    if (isDragStart) {
      const eventTarget = safelyGetEventTarget(evt);
      const evtTarget = eventTarget instanceof HTMLElement ? eventTarget : null;
      const dragTop = getTreeItemByDomNode(evtTarget, treeClassHelper.em('drag', 'top'));

      if (dragTop && treeDomRef.value?.contains(dragTop)) {
        isDragging.value = true;
        dragToTop.value = true;
        dragToNodeUuid.value = undefined;
      } else {
        dragToTop.value = false;

        const target = getTreeItemByDomNode(evtTarget, treeItemClassHelper.block);

        if (target && treeDomRef.value?.contains(target)) {
          isDragging.value = true;

          if (dragFromNode.value && currentExpandedNodes.length) {
            setNodeExpandStatus(dragFromNode.value, false);
          }

          dragToNodeUuid.value = target.dataset.uuid;
        } else {
          dragToNodeUuid.value = undefined;
        }
      }
    }
  }

  function onDragEnd(evt: PointerEvent) {
    clearTimer();

    if (!isDragging.value || !dragFromNode.value) {
      dragStop();
      return;
    }

    restoreExpandedNodes();

    const fromNode = dragFromNode.value;
    let toNode: HTreeExtendsData | undefined;
    let isMoveToChild = true;

    if (!dragToTop.value) {
      toNode = treeHelper.flattenTreeData.value.find(
        curr =>
          treeHelper.getOptionValue(curr, 'value').toString() === dragToNodeUuid.value?.toString(),
      );

      if (!toNode) {
        dragStop();
        return;
      }

      const target = safelyGetEventTarget(evt);
      isMoveToChild =
        target instanceof HTMLElement &&
        hasClassWithinTreeItem(target, treeItemClassHelper.is('child') as string);
    }

    if (!toNode && !dragToTop.value) {
      dragStop();
      return;
    }

    if (dragToTop.value) {
      dropNode(
        {
          fromNode,
          position: 'root',
        },
        {
          onBeforeMove: motion.capturePositions,
          onFinish: moved => {
            if (!moved) motion.clearCapturedPositions();
            dragStop();
          },
        },
      );
    } else {
      dropNode(
        {
          fromNode,
          toNode: toNode!,
          position: isMoveToChild ? 'child' : 'after',
        },
        {
          onBeforeMove: motion.capturePositions,
          onFinish: moved => {
            if (!moved) motion.clearCapturedPositions();
            dragStop();
          },
        },
      );
    }
  }

  function restoreExpandedNodes() {
    currentExpandedNodes.forEach(node => {
      expandedNodesUuid.add(node._uuid);
    });
  }

  function dragStop() {
    motion.stopPointerDrag();
    restoreExpandedNodes();
    isDragStart = false;
    isDragging.value = false;
    currentExpandedNodes = [];
    dragFromNode.value = undefined;
    dragToNodeUuid.value = undefined;
    dragToTop.value = false;
    clearTimer();
  }

  return {
    isDragging,
    dragFromNode,
    dragToNodeUuid,
    dragOffset: motion.dragOffset,
    setItemElement: motion.setItemElement,
    dragToTop,
    onDragStart,
  };
}
