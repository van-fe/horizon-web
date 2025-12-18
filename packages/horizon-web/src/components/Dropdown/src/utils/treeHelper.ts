import type { NDropdownTreeData } from './types';

export function getTreeLevels(tree: Map<string, NDropdownTreeData>, level = 0) {
  let res = level;

  for (const value of tree.values()) {
    if (value.children) {
      res = Math.max(Math.max(level, getTreeLevels(value.children, level + 1)), res);
    }
  }

  return res;
}
