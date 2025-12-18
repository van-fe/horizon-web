import type { NMenuTreeData } from './types';

export function getMapTreePath(
  tree: Map<string, NMenuTreeData<'subMenu' | 'menuItem'>>,
  uuid: string,
) {
  const res: NMenuTreeData<'subMenu' | 'menuItem'>[] = [];

  for (const leaf of tree.values()) {
    if (leaf.uuid === uuid) {
      res.push(leaf);
      break;
    }

    if (leaf.children !== null) {
      const temp = getMapTreePath(leaf.children, uuid);
      if (temp.length) {
        res.push(...temp, leaf);
      }
    }
  }

  return res;
}

export function getMapTreePathByValue(
  tree: Map<string, NMenuTreeData<'subMenu' | 'menuItem'>>,
  value: string,
) {
  const res: NMenuTreeData<'subMenu' | 'menuItem'>[] = [];

  for (const leaf of tree.values()) {
    if (leaf.props.value === value) {
      res.push(leaf);
      break;
    }

    if (leaf.children !== null) {
      const temp = getMapTreePathByValue(leaf.children, value);
      if (temp.length) {
        res.push(...temp, leaf);
      }
    }
  }

  return res;
}
