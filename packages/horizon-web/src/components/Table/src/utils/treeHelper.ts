import type { NTableInsertedColumnData } from './types';

export function getTopParentInTree(
  uuid: string,
  currentTree: NTableInsertedColumnData[],
  parent: null | NTableInsertedColumnData = null,
) {
  if (currentTree.some(column => column.uuid === uuid)) {
    return parent;
  }

  for (const column of currentTree) {
    const hasFound = getTopParentInTree(uuid, column.children, column);

    if (hasFound) {
      return column;
    }
  }

  return false;
}
