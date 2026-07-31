import type { ComputedRef, SetupContext } from 'vue';
import { onBeforeUnmount, ref } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/utils';
import type { TableEmits } from '../composables/useEmits';
import type { TableProps } from '../composables/useProps';
import type {
  HTableRowDataType,
  HTableTransformedRowDataType,
  HTableTreeRowDataType,
} from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';

type HTableRowDropPosition = 'before' | 'after';

export default function useRowDraggable(
  tableProps: TableProps,
  emit: SetupContext<TableEmits>['emit'],
  fieldMapFormatted: ComputedRef<Record<keyof HTableTreeRowDataType, string>>,
  scrollContainer?: ComputedRef<HTMLElement | undefined>,
) {
  const classHelper = new ComponentClassBlock('table');
  const draggingUuid = ref<string | number>();
  const dragOverUuid = ref<string | number>();
  const dropPosition = ref<HTableRowDropPosition>();
  let draggingRow: HTableTransformedRowDataType | undefined;
  let autoScrollFrame: number | undefined;
  let autoScrollSpeed = 0;
  let lastDragOverAt = 0;

  function stopAutoScroll() {
    autoScrollSpeed = 0;
    if (autoScrollFrame !== undefined) {
      cancelAnimationFrame(autoScrollFrame);
      autoScrollFrame = undefined;
    }
  }

  function runAutoScroll() {
    const container = scrollContainer?.value;
    if (!container || !autoScrollSpeed || performance.now() - lastDragOverAt > 120) {
      stopAutoScroll();
      return;
    }

    container.scrollTop += autoScrollSpeed;
    autoScrollFrame = requestAnimationFrame(runAutoScroll);
  }

  function updateAutoScroll(clientY: number) {
    const container = scrollContainer?.value;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.height <= 0) return;
    const threshold = Math.min(56, Math.max(28, rect.height / 4));
    const distanceToTop = clientY - rect.top;
    const distanceToBottom = rect.bottom - clientY;

    lastDragOverAt = performance.now();
    if (distanceToTop < threshold) {
      autoScrollSpeed = -Math.ceil(((threshold - distanceToTop) / threshold) * 18);
    } else if (distanceToBottom < threshold) {
      autoScrollSpeed = Math.ceil(((threshold - distanceToBottom) / threshold) * 18);
    } else {
      stopAutoScroll();
      return;
    }

    if (autoScrollFrame === undefined) {
      autoScrollFrame = requestAnimationFrame(runAutoScroll);
    }
  }

  function clearDragState() {
    stopAutoScroll();
    draggingUuid.value = undefined;
    dragOverUuid.value = undefined;
    dropPosition.value = undefined;
    draggingRow = undefined;
  }

  function moveRowInSiblings(
    rows: HTableRowDataType[],
    sourceRow: HTableTransformedRowDataType,
    targetRow: HTableTransformedRowDataType,
    position: HTableRowDropPosition,
  ) {
    const getRowIndex = (row: HTableTransformedRowDataType) => {
      if (tableProps.rowKey !== undefined) {
        return rows.findIndex(item => item[tableProps.rowKey!] === itemRowUuid(row));
      }

      return row[HTableTransformedRowContextKey].siblingIndex;
    };

    const sourceIndex = getRowIndex(sourceRow);
    const targetIndex = getRowIndex(targetRow);

    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
      return rows;
    }

    const reordered = [...rows];
    const [movedRow] = reordered.splice(sourceIndex, 1);
    const adjustedTargetIndex =
      tableProps.rowKey !== undefined
        ? reordered.findIndex(item => item[tableProps.rowKey!] === itemRowUuid(targetRow))
        : targetIndex - (sourceIndex < targetIndex ? 1 : 0);
    const insertIndex = adjustedTargetIndex + (position === 'after' ? 1 : 0);

    reordered.splice(insertIndex, 0, movedRow);
    return reordered;
  }

  function itemRowUuid(row: HTableTransformedRowDataType) {
    return row[HTableTransformedRowContextKey].uuid;
  }

  function reorderNestedRows(
    rows: HTableRowDataType[],
    parentUuid: string | number,
    sourceRow: HTableTransformedRowDataType,
    targetRow: HTableTransformedRowDataType,
    position: HTableRowDropPosition,
  ): { changed: boolean; rows: HTableRowDataType[] } {
    const childrenField = fieldMapFormatted.value.children;

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];

      if (row[tableProps.rowKey!] === parentUuid) {
        const children = Array.isArray(row[childrenField]) ? row[childrenField] : [];
        const reorderedChildren = moveRowInSiblings(children, sourceRow, targetRow, position);

        if (reorderedChildren === children) {
          return { changed: false, rows };
        }

        const nextRows = [...rows];
        nextRows[index] = {
          ...row,
          [childrenField]: reorderedChildren,
        };
        return { changed: true, rows: nextRows };
      }

      if (Array.isArray(row[childrenField]) && row[childrenField].length > 0) {
        const nestedResult = reorderNestedRows(
          row[childrenField],
          parentUuid,
          sourceRow,
          targetRow,
          position,
        );

        if (nestedResult.changed) {
          const nextRows = [...rows];
          nextRows[index] = {
            ...row,
            [childrenField]: nestedResult.rows,
          };
          return { changed: true, rows: nextRows };
        }
      }
    }

    return { changed: false, rows };
  }

  function reorderRows(
    sourceRow: HTableTransformedRowDataType,
    targetRow: HTableTransformedRowDataType,
    position: HTableRowDropPosition,
  ) {
    const sourceContext = sourceRow[HTableTransformedRowContextKey];
    const targetContext = targetRow[HTableTransformedRowContextKey];

    if (sourceContext.parentUuid !== targetContext.parentUuid) {
      return;
    }

    if (sourceContext.parentUuid === null) {
      const reordered = moveRowInSiblings(tableProps.data, sourceRow, targetRow, position);

      if (reordered !== tableProps.data) {
        emit('update:data', reordered);
      }
      return;
    }

    if (tableProps.rowKey === undefined) {
      return;
    }

    const result = reorderNestedRows(
      tableProps.data,
      sourceContext.parentUuid,
      sourceRow,
      targetRow,
      position,
    );

    if (result.changed) {
      emit('update:data', result.rows);
    }
  }

  function getRowDraggableClass(row: HTableTransformedRowDataType) {
    const rowUuid = itemRowUuid(row);

    return cls(
      classHelper.is('row-dragging', draggingUuid.value === rowUuid),
      classHelper.is(
        'row-drag-over-before',
        dragOverUuid.value === rowUuid && dropPosition.value === 'before',
      ),
      classHelper.is(
        'row-drag-over-after',
        dragOverUuid.value === rowUuid && dropPosition.value === 'after',
      ),
    );
  }

  function getRowDraggableEvents(row: HTableTransformedRowDataType) {
    return {
      onDragover: (evt: DragEvent) => {
        updateAutoScroll(evt.clientY);

        if (
          !draggingRow ||
          itemRowUuid(draggingRow) === itemRowUuid(row) ||
          draggingRow[HTableTransformedRowContextKey].parentUuid !==
            row[HTableTransformedRowContextKey].parentUuid
        ) {
          return;
        }

        evt.preventDefault();

        if (evt.dataTransfer) {
          evt.dataTransfer.dropEffect = 'move';
        }

        const targetRect = (evt.currentTarget as HTMLElement | null)?.getBoundingClientRect();
        dragOverUuid.value = itemRowUuid(row);
        dropPosition.value =
          targetRect && evt.clientY < targetRect.top + targetRect.height / 2 ? 'before' : 'after';
      },
      onDragleave: (evt: DragEvent) => {
        if (
          dragOverUuid.value === itemRowUuid(row) &&
          !(evt.currentTarget as HTMLElement | null)?.contains(evt.relatedTarget as Node | null)
        ) {
          dragOverUuid.value = undefined;
          dropPosition.value = undefined;
        }
      },
      onDrop: (evt: DragEvent) => {
        if (draggingRow && dropPosition.value) {
          evt.preventDefault();
          reorderRows(draggingRow, row, dropPosition.value);
        }

        clearDragState();
      },
    };
  }

  onBeforeUnmount(stopAutoScroll);

  function getDragHandleProps(row: HTableTransformedRowDataType) {
    return {
      draggable: true,
      onDragstart: (evt: DragEvent) => {
        draggingRow = row;
        draggingUuid.value = itemRowUuid(row);
        evt.dataTransfer?.setData('text/plain', String(itemRowUuid(row)));

        if (evt.dataTransfer) {
          evt.dataTransfer.effectAllowed = 'move';
        }
      },
      onDragend: clearDragState,
    };
  }

  return {
    getDragHandleProps,
    getRowDraggableClass,
    getRowDraggableEvents,
  };
}
