import type { VNode } from 'vue';
import { isObject } from '@nio-fe/shared';
import type { NTreeExtendsData } from '../utils/types';

export const useTreeSlots = {
  /**
   * 自定义渲染节点，接收当前节点对应的 NTreeNodeData 和 VNode 作为参数
   */
  treeNodeRender: (value: { data: NTreeExtendsData; vNode?: VNode; vnode?: VNode }) =>
    isObject(value),
  /**
   * 过滤为空时的插槽
   * @version 2.3.5
   */
  empty: () => true,
};

export type TreeSlots = typeof useTreeSlots;
