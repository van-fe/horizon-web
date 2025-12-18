import { default as Tree } from './src/Tree';
import { withInstall } from '@aurora/shared';

export const NTree = withInstall(Tree);
export default NTree;

export type {
  BaseNode,
  NTreeData,
  NTreeNodeData,
  NExtendTreeNodeData,
  NTreeFilterType,
  NTreeNodeDataWithLevel,
  NTreeHighlightMethod,
  NTreeDynamicLoadNode,
} from './src/utils/types';
