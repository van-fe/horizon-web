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
import type { TopBaseTreeData } from '~/utils/useTree/types';
import type Tree from '~/utils/useTree/index';
import { warn } from '~/utils/useLog';
import type TreeItem from '../components/TreeItem';

export default function (
  props: ToRefs<TreeProps>,
  treeDomRef: Ref<HTMLElement | null>,
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  setNodeExpandStatus: (node: HTreeExtendsData, expand: boolean) => void,
  expandedNodesUuid: UnwrapNestedRefs<Set<HTreeUuidType>>,
  deleteNode: (value?: string | number, emitUpdate?: boolean) => HTreeData[],
  setNodeChildren: (value: string | number | null, children: HTreeData[]) => void,
  addNodeChildren: (
    arr: Array<TopBaseTreeData & Partial<HTreeData>>,
    value?: string | number,
    append?: boolean,
  ) => void,
  isLoading: Ref<boolean>,
  shadowItemDomRef: Ref<InstanceType<typeof TreeItem> | null>,
) {
  const treeClassHelper = new ComponentClassBlock('tree');
  const treeItemClassHelper = new ComponentClassBlock('tree-item');

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

    while (!curr?.classList.contains(className) && !!curr && curr !== document.documentElement) {
      curr = curr.parentElement;
    }

    return curr;
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

      const evtTarget = safelyGetEventTarget(evt) as HTMLElement | null;

      if (evtTarget?.classList.contains(treeClassHelper.em('drag', 'top'))) {
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

        if (treeDomRef.value?.contains(target as Node)) {
          isDragging.value = true;

          if (dragFromNode.value && currentExpandedNodes.length) {
            setNodeExpandStatus(dragFromNode.value, false);
          }

          const dragTo = getTreeItemByDomNode(
            target as HTMLElement | null,
            treeItemClassHelper.block,
          );

          if (dragTo) {
            dragToNodeUuid.value = dragTo.dataset.uuid;
          }
        }
      }
    }
  }

  function onDragEnd(evt: MouseEvent) {
    if (isDragging.value) {
      clearTimer();
      document.removeEventListener('mousemove', onDragMove);
      document.removeEventListener('mouseup', onDragEnd);

      let toNode: HTreeExtendsData | undefined;
      let isMoveToChild: boolean = true;

      if (!dragToTop.value) {
        toNode = treeHelper.flattenTreeData.value.find(
          curr =>
            treeHelper.getOptionValue(curr, 'value').toString() ===
            dragToNodeUuid.value?.toString(),
        );

        if (
          toNode &&
          dragFromNode.value &&
          treeHelper.getOptionValue(toNode, 'value') ===
            treeHelper.getOptionValue(dragFromNode.value, 'value')
        ) {
          return dragStop();
        }

        const target = safelyGetEventTarget(evt);
        isMoveToChild = (target as HTMLElement).classList.contains('is-child');
      }

      if (toNode || dragToTop.value) {
        if (props.beforeDrop?.value) {
          isLoading.value = true;
          Promise.resolve(
            props.beforeDrop.value(
              {
                ...dragFromNode.value!.originOption,
                level: dragFromNode.value!.level,
              },
              dragToTop.value
                ? null
                : isMoveToChild
                  ? {
                      ...toNode!.originOption,
                      level: toNode!.level,
                    }
                  : toNode?.parent
                    ? {
                        ...toNode!.parent.originOption,
                        level: toNode!.parent.level,
                      }
                    : null,
              isMoveToChild
                ? null
                : {
                    ...toNode!.originOption,
                    level: toNode!.level,
                  },
            ),
          )
            .then(status => {
              if (status !== false) {
                doMove();
              } else {
                dragStop();
              }
            })
            .catch(e => {
              console.error(e);
              dragStop();
            })
            .finally(() => {
              isLoading.value = false;
            });
        } else {
          doMove();
        }

        function doMove() {
          if (dragToTop.value) {
            deleteNode(treeHelper.getOptionValue(dragFromNode.value!, 'value'), false);
            addNodeChildren([dragFromNode.value!.originOption], undefined, false);

            dragStop();
            return;
          }

          if (!toNode) return warn('tree', 'drop node is disappear');

          // below variable is not necessary
          // const newTreeData = cloneDeep(dragFromNode.value!.originOption);

          if (isMoveToChild) {
            deleteNode(treeHelper.getOptionValue(dragFromNode.value!, 'value'), false);
            addNodeChildren(
              [dragFromNode.value!.originOption],
              treeHelper.getOptionValue(toNode, 'value'),
              false,
            );
          } else {
            if (toNode.parent) {
              const parentBaseNode = treeHelper.getBaseTreeTargetByValue(
                treeHelper.originTreeData,
                treeHelper.getOptionValue(toNode.parent, 'value'),
              );

              if (parentBaseNode && treeHelper.getOptionValue(parentBaseNode, 'children')) {
                const deletedNode = deleteNode(
                  treeHelper.getOptionValue(dragFromNode.value!, 'value'),
                  false,
                );

                const insertBehindIndex = treeHelper
                  .getOptionValue(parentBaseNode, 'children')!
                  .findIndex(
                    curr =>
                      treeHelper.getOptionValue(curr, 'value').toString() ===
                      dragToNodeUuid.value?.toString(),
                  );

                setNodeChildren(
                  toNode.parent.value,
                  treeHelper
                    .getOptionValue(parentBaseNode!, 'children')!
                    .toSpliced(insertBehindIndex + 1, 0, ...deletedNode),
                );
              }
            } else {
              const deletedNode = deleteNode(
                treeHelper.getOptionValue(dragFromNode.value!, 'value'),
                false,
              );

              const insertBehindIndex = treeHelper.originTreeData.findIndex(
                curr =>
                  treeHelper.getOptionValue(curr, 'value').toString() ===
                  dragToNodeUuid.value!.toString(),
              );

              setNodeChildren(
                null,
                treeHelper.originTreeData.toSpliced(insertBehindIndex + 1, 0, ...deletedNode),
              );
            }
          }

          dragStop();
        }
      } else {
        dragStop();
      }

      if (currentExpandedNodes.length) {
        currentExpandedNodes.forEach(node => {
          expandedNodesUuid.add(treeHelper.getOptionValue(node, 'value'));
        });
      }
    } else {
      dragStop();
    }
  }

  function dragStop() {
    isDragStart = false;
    isDragging.value = false;
    currentExpandedNodes = [];
    dragFromNode.value = undefined;
    dragToNodeUuid.value = undefined;
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
