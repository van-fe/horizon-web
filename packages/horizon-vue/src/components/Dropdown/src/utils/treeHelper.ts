import type { HDropdownTreeData } from './types';

export function getTreeLevels(tree: Map<string, HDropdownTreeData>, level = 0) {
  let res = level;

  for (const value of tree.values()) {
    if (value.children) {
      res = Math.max(Math.max(level, getTreeLevels(value.children, level + 1)), res);
    }
  }

  return res;
}
