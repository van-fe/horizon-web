import type { VNode, SlotsType } from 'vue';
import type { NTreeExtendsData } from '../utils/types';

export const useTreeSlots = Object as SlotsType<{
  /**
   * 自定义渲染节点，接收当前节点对应的 NTreeNodeData 和 VNode 作为参数
   */
  treeNodeRender?: (value: { data: NTreeExtendsData; vNode?: VNode; vnode?: VNode }) => VNode[];
  /**
   * 过滤为空时的插槽
   * @version 2.3.5
   */
  empty?: {};
}>;

export type TreeSlots = typeof useTreeSlots;
