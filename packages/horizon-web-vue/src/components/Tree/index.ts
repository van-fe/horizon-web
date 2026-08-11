import { default as Tree } from './src/Tree';
import { withInstall } from '@aurora/utils';

export const HTree = withInstall(Tree);
export default HTree;

export type {
  BaseNode,
  HTreeData,
  HTreeNodeData,
  HExtendTreeNodeData,
  HTreeFilterType,
  HTreeNodeDataWithLevel,
  HTreeHighlightMethod,
  HTreeDynamicLoadNode,
} from './src/utils/types';
