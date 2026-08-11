import type { VNode, SlotsType } from 'vue';
import type { HTreeExtendsData } from '../utils/types';

export const useTreeSlots = Object as SlotsType<{
  /**
   * 自定义渲染节点，接收当前节点对应的 HTreeNodeData 和 VNode 作为参数
    * @en Custom content for the tree node render slot.
   */
  treeNodeRender?: (value: { data: HTreeExtendsData; vNode?: VNode; vnode?: VNode }) => VNode[];
  /**
   * 过滤为空时的插槽
    * @en Custom content for the empty slot.
   */
  empty?: {};
}>;

export type TreeSlots = typeof useTreeSlots;
