import type {
  HTreeExtendsData,
  HTreeNodeData,
  HTreeNodeDataWithLevel,
  HTreeUuidType,
} from '~/components/Tree/src/utils/types';
import type { Ref, VNode, SlotsType } from 'vue';

export const useTreeSelectSlots = Object as SlotsType<{
  /**
   * 自定义触发器完整展示内容
   */
  default?: { visible: Ref<boolean>; treeDataMap: Map<HTreeUuidType, HTreeNodeData> };

  /**
   * 自定义 `select` 中被选中的项目
   */
  tagRender?: (value: HTreeExtendsData) => VNode[];

  /**
   * 自定义 完整 `select` 渲染内容
   */
  selectRender?: (value: HTreeExtendsData) => VNode[];

  /**
   * 自定义渲染节点，接收当前节点对应的 `HTreeNodeData` 和 `VNode` 作为参数
   */
  treeNodeRender?: { data: HTreeNodeDataWithLevel; vnode: VNode };
  /**
   * @version 2.3.2
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender?: {};
  /**
   * @version 2.3.2
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender?: {};
  /**
   * 为空时的插槽
   * @version 2.3.5
   */
  empty?: {};
  /**
   * 自定义 `cascaderPanel` 确认选中渲染内容
   * @param handler 确认和取消的操作方法
   * @version 2.3.5
   */
  confirmRender?: { cancelHandle: () => void; confirmHandle: () => void };
}>;

export type TreeSelectSlots = typeof useTreeSelectSlots;
