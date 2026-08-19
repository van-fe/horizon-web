import { useEffect, useRef, useState } from 'react';
import type {
  TreeBeforeDrop,
  TreeFieldMap,
  TreeNormalizedData,
  TreeOption,
  TreeValue,
} from '@aurora/core';
import { TreeDropController } from '@aurora/core';
import { createTreePointerDrag } from '@aurora/horizon-core';

interface UseTreeDragOptions<Option extends TreeOption> {
  rootRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
  dragOnHandler: boolean;
  dragToLeaf: boolean;
  data: readonly Option[];
  tree: TreeNormalizedData<Option>;
  fieldMap?: TreeFieldMap;
  beforeDrop?: TreeBeforeDrop<Option>;
  commitData(data: readonly Option[]): void;
  onError?(error: unknown): void;
}

function valueToken(value: TreeValue): string {
  return `${typeof value}:${String(value)}`;
}

/** Adapts the Web Core pointer primitive to Core's immutable drop controller. */
export function useTreeDrag<Option extends TreeOption>({
  rootRef,
  enabled,
  dragOnHandler,
  dragToLeaf,
  data,
  tree,
  fieldMap,
  beforeDrop,
  commitData,
  onError,
}: UseTreeDragOptions<Option>) {
  const sourceRef = useRef<TreeValue | undefined>(undefined);
  const dropControllerRef = useRef<TreeDropController<Option> | null>(null);
  const latestRef = useRef({ data, tree, fieldMap, beforeDrop, commitData, onError, dragToLeaf });
  const [draggingValue, setDraggingValue] = useState<TreeValue | undefined>(undefined);
  const [dropValue, setDropValue] = useState<string | undefined>(undefined);
  latestRef.current = { data, tree, fieldMap, beforeDrop, commitData, onError, dragToLeaf };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;
    const dropController = new TreeDropController<Option>();
    dropControllerRef.current = dropController;
    const canStart = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const item = target?.closest<HTMLElement>('[role="treeitem"]');
      if (
        !dragOnHandler &&
        target?.closest(
          'a, button, input, select, textarea, label, [contenteditable="true"], [role="button"], [data-tree-interactive]',
        )
      )
        return false;
      const handle = dragOnHandler ? target?.closest<HTMLElement>('[data-tree-drag-handle]') : item;
      const value = item?.dataset.treeValue;
      if (!handle || !item) return false;
      const node = latestRef.current.tree.flat.find(
        candidate => valueToken(candidate.value) === value,
      );
      if (!node?.draggable || node.disabled) return false;
      sourceRef.current = node.value;
      setDraggingValue(node.value);
      return true;
    };
    const pointer = createTreePointerDrag({
      container: root,
      canStart,
      getDropZones: () => root.querySelectorAll<HTMLElement>('[data-tree-drop-zone]'),
      onMove: target => setDropValue(target?.element.dataset.treeValue),
      onCancel: () => {
        sourceRef.current = undefined;
        setDraggingValue(undefined);
        setDropValue(undefined);
      },
      onDrop: async target => {
        const source = latestRef.current.tree.byValue.get(sourceRef.current!);
        const targetValue = target?.element.dataset.treeValue;
        const targetNode = latestRef.current.tree.flat.find(
          candidate => valueToken(candidate.value) === targetValue,
        );
        sourceRef.current = undefined;
        setDraggingValue(undefined);
        setDropValue(undefined);
        if (!source || !target || !targetNode) return;
        let position: 'root' | 'child' | 'after' = target.position === 'inside' ? 'child' : 'after';
        let resolvedTarget = targetNode;
        if (target.position === 'before') {
          const siblings = targetNode.parent?.children ?? latestRef.current.tree.roots;
          const previous = siblings[targetNode.index - 1];
          if (previous) resolvedTarget = previous;
          else if (targetNode.parent) {
            resolvedTarget = targetNode.parent;
            position = 'child';
          } else position = 'root';
        }
        const result = await dropController.drop(
          latestRef.current.data,
          { source, target: position === 'root' ? undefined : resolvedTarget, position },
          {
            beforeDrop: latestRef.current.beforeDrop,
            dragToLeaf: latestRef.current.dragToLeaf,
            fieldMap: latestRef.current.fieldMap,
          },
        );
        if (result.status === 'moved') latestRef.current.commitData(result.data);
        else if (result.status === 'rejected') latestRef.current.onError?.(result.error);
      },
    });
    return () => {
      pointer.destroy();
      dropController.destroy();
      if (dropControllerRef.current === dropController) dropControllerRef.current = null;
    };
  }, [dragOnHandler, enabled, rootRef]);

  useEffect(() => {
    dropControllerRef.current?.invalidate();
  }, [data, fieldMap]);

  return { draggingValue, dropValue };
}
