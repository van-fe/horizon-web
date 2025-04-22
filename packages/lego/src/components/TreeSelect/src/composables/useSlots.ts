import type { NTreeNodeData, NTreeNodeDataWithLevel } from '~/components/Tree';
import { isObject } from '@nio-fe/shared';
import type { Ref, VNode } from 'vue';
import type { NTreeUuidType } from '~/components/Tree/src/utils/types';

export const useTreeSelectSlots = {
  /**
   * 自定义触发器完整展示内容，相当于直接使用 `cascaderPanel`
   */
  default: (value: { visible: Ref<boolean>; treeDataMap: Map<NTreeUuidType, NTreeNodeData> }) =>
    isObject(value),

  /**
   * 自定义 `select` 中被选中的项目
   */
  tagRender: (value: any) => !!value,

  /**
   * 自定义 完整 `select` 渲染内容
   */
  selectRender: (value: any) => !!value,

  /**
   * 自定义渲染节点，接收当前节点对应的 `NTreeNodeData` 和 `VNode` 作为参数
   */
  treeNodeRender: (value: { data: NTreeNodeDataWithLevel; vnode: VNode }) => isObject(value),
  /**
   * @version 2.3.2
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender: () => true,
  /**
   * @version 2.3.2
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender: () => true,
  /**
   * 为空时的插槽
   * @version 2.3.5
   */
  empty: () => true,
  /**
   * 自定义 `cascaderPanel` 确认选中渲染内容
   * @param handler 确认和取消的操作方法
   * @version 2.3.5
   */
  confirmRender: (handler: { cancelHandle: () => void; confirmHandle: () => void }) =>
    isObject(handler),
};

export type TreeSelectSlots = typeof useTreeSelectSlots;
