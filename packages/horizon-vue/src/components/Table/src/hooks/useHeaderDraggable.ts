import type { Ref } from 'vue';
import { ref } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/utils';
import type { HTableColumnData, HTableFixedValue, HTableInsertedColumnData } from '../utils/types';
import { HTableColumnContextKey } from '../utils/types';

type HTableHeaderDropPosition = 'before' | 'after';

export interface HTableHeaderDraggableProps {
  draggable: boolean;
  class: string;
  onDragstart: (evt: DragEvent) => void;
  onDragover: (evt: DragEvent) => void;
  onDragleave: (evt: DragEvent) => void;
  onDrop: (evt: DragEvent) => void;
  onDragend: () => void;
}

interface UseHeaderDraggableOptions {
  columns: Ref<HTableInsertedColumnData[]>;
  columnAnalysis: Ref<{
    columnGroups: HTableColumnData[][];
    flattenColumns: HTableColumnData[];
  }>;
  sortStore: Ref<Map<string, number>>;
  getFixedState: (columnUuid: string) => HTableFixedValue;
}

export default function useHeaderDraggable(options: UseHeaderDraggableOptions) {
  const classHelper = new ComponentClassBlock('table');
  const draggingUuid = ref<string>();
  const dragOverUuid = ref<string>();
  const dropPosition = ref<HTableHeaderDropPosition>();

  function clearDragState() {
    draggingUuid.value = undefined;
    dragOverUuid.value = undefined;
    dropPosition.value = undefined;
  }

  function getAllColumns() {
    return options.columnAnalysis.value.columnGroups.flat();
  }

  function getColumn(uuid: string) {
    return getAllColumns().find(column => column.uuid === uuid);
  }

  function getSiblingColumns(column: HTableColumnData) {
    const parentUuid = column[HTableColumnContextKey].parentColumn?.uuid;

    return getAllColumns().filter(
      item => item[HTableColumnContextKey].parentColumn?.uuid === parentUuid,
    );
  }

  function getRawSiblings(
    columns: HTableInsertedColumnData[],
    columnUuid: string,
  ): HTableInsertedColumnData[] | undefined {
    if (columns.some(column => column.uuid === columnUuid)) {
      return columns;
    }

    for (const column of columns) {
      const siblings = getRawSiblings(column.children, columnUuid);

      if (siblings) {
        return siblings;
      }
    }

    return undefined;
  }

  function canDrop(source: HTableColumnData, target: HTableColumnData) {
    if (source.uuid === target.uuid) {
      return false;
    }

    if (
      source[HTableColumnContextKey].parentColumn?.uuid !==
      target[HTableColumnContextKey].parentColumn?.uuid
    ) {
      return false;
    }

    if (options.getFixedState(source.uuid) !== options.getFixedState(target.uuid)) {
      return false;
    }

    const siblings = getSiblingColumns(source);
    const sourceIndex = siblings.findIndex(column => column.uuid === source.uuid);
    const targetIndex = siblings.findIndex(column => column.uuid === target.uuid);
    const [start, end] = [sourceIndex, targetIndex].sort((a, b) => a - b);

    return !siblings.slice(start, end + 1).some(column => column.props.lockPosition);
  }

  function reorderColumns(
    source: HTableColumnData,
    target: HTableColumnData,
    position: HTableHeaderDropPosition,
  ) {
    const siblings = getSiblingColumns(source);
    const sourceIndex = siblings.findIndex(column => column.uuid === source.uuid);
    const targetIndex = siblings.findIndex(column => column.uuid === target.uuid);

    if (sourceIndex < 0 || targetIndex < 0) {
      return;
    }

    const reordered = [...siblings];
    const [movedColumn] = reordered.splice(sourceIndex, 1);
    const adjustedTargetIndex = reordered.findIndex(column => column.uuid === target.uuid);
    const insertIndex = adjustedTargetIndex + (position === 'after' ? 1 : 0);
    reordered.splice(insertIndex, 0, movedColumn);

    const rawSiblings = getRawSiblings(options.columns.value, source.uuid);

    if (rawSiblings && rawSiblings.some(column => column.uuid === target.uuid)) {
      const visibleColumnUuids = new Set(reordered.map(column => column.uuid));
      const rawColumnsByUuid = new Map(rawSiblings.map(column => [column.uuid, column]));
      const reorderedRawColumns = reordered
        .map(column => rawColumnsByUuid.get(column.uuid))
        .filter((column): column is HTableInsertedColumnData => !!column);
      const reorderedIterator = reorderedRawColumns[Symbol.iterator]();
      const nextRawSiblings = rawSiblings.map(column =>
        visibleColumnUuids.has(column.uuid) ? (reorderedIterator.next().value ?? column) : column,
      );

      rawSiblings.splice(0, rawSiblings.length, ...nextRawSiblings);
    }

    const nextSortStore = new Map(options.sortStore.value);
    reordered.forEach((column, index) => nextSortStore.set(column.uuid, index));
    options.sortStore.value = nextSortStore;
  }

  function getDraggableProps(column: HTableColumnData): HTableHeaderDraggableProps {
    const draggable = column.props.draggable && !column.props.lockPosition;
    const isDragging = draggingUuid.value === column.uuid;
    const isDragOver = dragOverUuid.value === column.uuid;

    return {
      draggable,
      class: cls(
        classHelper.is('draggable', draggable),
        classHelper.is('dragging', isDragging),
        classHelper.is('drag-over-before', isDragOver && dropPosition.value === 'before'),
        classHelper.is('drag-over-after', isDragOver && dropPosition.value === 'after'),
      ),
      onDragstart: (evt: DragEvent) => {
        if (!draggable) {
          evt.preventDefault();
          return;
        }

        draggingUuid.value = column.uuid;
        evt.dataTransfer?.setData('text/plain', column.uuid);

        if (evt.dataTransfer) {
          evt.dataTransfer.effectAllowed = 'move';
        }
      },
      onDragover: (evt: DragEvent) => {
        const source = draggingUuid.value ? getColumn(draggingUuid.value) : undefined;

        if (!source || !canDrop(source, column)) {
          return;
        }

        evt.preventDefault();

        if (evt.dataTransfer) {
          evt.dataTransfer.dropEffect = 'move';
        }

        const targetRect = (evt.currentTarget as HTMLElement | null)?.getBoundingClientRect();
        dragOverUuid.value = column.uuid;
        dropPosition.value =
          targetRect && evt.clientX < targetRect.left + targetRect.width / 2 ? 'before' : 'after';
      },
      onDragleave: (evt: DragEvent) => {
        if (
          dragOverUuid.value === column.uuid &&
          !(evt.currentTarget as HTMLElement | null)?.contains(evt.relatedTarget as Node | null)
        ) {
          dragOverUuid.value = undefined;
          dropPosition.value = undefined;
        }
      },
      onDrop: (evt: DragEvent) => {
        const source = draggingUuid.value ? getColumn(draggingUuid.value) : undefined;

        if (source && dropPosition.value && canDrop(source, column)) {
          evt.preventDefault();
          reorderColumns(source, column, dropPosition.value);
        }

        clearDragState();
      },
      onDragend: clearDragState,
    };
  }

  return {
    getDraggableProps,
  };
}
