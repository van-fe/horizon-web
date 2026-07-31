import type { Ref, ToRefs, UnwrapNestedRefs } from 'vue';
import type { HTreeExtendsData, HTreeUuidType, HTreeData } from '../utils/types';
import { ref, watch } from 'vue';
import type { TreeProps } from '../composables/useProps';
import {
  ComponentClassBlock,
  getClientXY,
  safelyGetEventTarget,
  findElementInEventTargetTreeByClass,
} from '@aurora/utils';
import type Tree from '~/utils/useTree';
import type TreeItem from '../components/TreeItem';
import type { TreeDataMutations } from './useTreeData';
import useDropNode from './useDropNode';

interface UseDraggableOptions {
  props: ToRefs<TreeProps>;
  treeDomRef: Ref<HTMLElement | null>;
  treeHelper: Tree<HTreeData, HTreeExtendsData>;
  setNodeExpandStatus: (node: HTreeExtendsData, expand: boolean) => void;
  expandedNodesUuid: UnwrapNestedRefs<Set<HTreeUuidType>>;
  treeDataMutations: TreeDataMutations;
  isLoading: Ref<boolean>;
  shadowItemDomRef: Ref<InstanceType<typeof TreeItem> | null>;
}

export default function useDraggable({
  props,
  treeDomRef,
  treeHelper,
  setNodeExpandStatus,
  expandedNodesUuid,
  treeDataMutations,
  isLoading,
  shadowItemDomRef,
}: UseDraggableOptions) {
  const treeClassHelper = new ComponentClassBlock('tree');
  const treeItemClassHelper = new ComponentClassBlock('tree-item');
  const { dropNode } = useDropNode(props, treeHelper, isLoading, treeDataMutations);

  let isDragStart = false;
  let dragDom: HTMLElement | null = null;

  const isDragging = ref(false);

  const draggingStyle = ref({
    width: 0,
    top: 0,
    left: 0,
  });

  /**
   * Used to calculate the offset between mouse position and the top-left corner of the target.
   */
  const diffPos = {
    x: 0,
    y: 0,
  };

  let currentExpandedNodes: HTreeExtendsData[] = [];

  const dragFromNode = ref<HTreeExtendsData>();
  const dragToNodeUuid = ref<HTreeUuidType>();

  const dragToTop = ref(false);

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

  function onDragStart(domRef: Ref<HTMLElement | null>, node: HTreeExtendsData, evt: MouseEvent) {
    if (!isDragging.value) {
      isDragStart = true;
      dragFromNode.value = node;
      dragDom = domRef.value;

      const rect = findElementInEventTargetTreeByClass(
        evt,
        treeItemClassHelper.block,
      )?.getBoundingClientRect();

      const { clientX, clientY } = getClientXY(evt);

      diffPos.x = clientX - (rect?.x || 0);
      diffPos.y = clientY - (rect?.y || 0);

      if (dragFromNode.value && !treeHelper.getOptionValue(dragFromNode.value, 'isLeaf')) {
        currentExpandedNodes = treeHelper.flattenTreeData.value.filter(
          curr =>
            !treeHelper.getOptionValue(curr, 'isLeaf') &&
            expandedNodesUuid.has(curr._uuid) &&
            curr.uuidPath.includes(dragFromNode.value!._uuid),
        );
      }

      document.addEventListener('mousemove', onDragMove);
      document.addEventListener('mouseup', onDragEnd);
    }
  }

  function onDragMove(evt: MouseEvent) {
    if (isDragStart) {
      const offsetParent = shadowItemDomRef.value?.$el.offsetParent;

      const offsetRect = offsetParent?.getBoundingClientRect();

      draggingStyle.value.top = evt.clientY - (offsetRect?.y ?? 0) - (diffPos?.y ?? 0);
      draggingStyle.value.left = evt.clientX - (offsetRect?.x ?? 0) - (diffPos?.x ?? 0);

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

        const rect = dragDom?.getBoundingClientRect();

        if (rect) {
          draggingStyle.value.width = rect.width;
        }

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

  function onDragEnd(evt: MouseEvent) {
    clearTimer();
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);

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
        dragStop,
      );
    } else {
      dropNode(
        {
          fromNode,
          toNode: toNode!,
          position: isMoveToChild ? 'child' : 'after',
        },
        dragStop,
      );
    }
  }

  function restoreExpandedNodes() {
    currentExpandedNodes.forEach(node => {
      expandedNodesUuid.add(node._uuid);
    });
  }

  function dragStop() {
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    restoreExpandedNodes();
    isDragStart = false;
    isDragging.value = false;
    currentExpandedNodes = [];
    dragDom = null;
    dragFromNode.value = undefined;
    dragToNodeUuid.value = undefined;
    dragToTop.value = false;
    diffPos.x = 0;
    diffPos.y = 0;
    clearTimer();
  }

  return {
    isDragging,
    dragFromNode,
    dragToNodeUuid,
    draggingStyle,
    dragToTop,
    onDragStart,
  };
}
