import type { HMenuTreeData } from './types';
import { findMapTreePath } from '~/utils/useMapTree';

export function getMapTreePath(
  tree: Map<string, HMenuTreeData<'subMenu' | 'menuItem'>>,
  uuid: string,
) {
  return findMapTreePath(tree, leaf => leaf.uuid === uuid);
}

export function getMapTreePathByValue(
  tree: Map<string, HMenuTreeData<'subMenu' | 'menuItem'>>,
  value: string,
) {
  return findMapTreePath(tree, leaf => leaf.props.value === value);
}
