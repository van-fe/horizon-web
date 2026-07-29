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
    * @en Custom content for the default slot.
   */
  default?: { visible: Ref<boolean>; treeDataMap: Map<HTreeUuidType, HTreeNodeData> };

  /**
   * 自定义 `select` 中被选中的项目
    * @en Custom content for the tag render slot.
   */
  tagRender?: (value: HTreeExtendsData) => VNode[];

  /**
   * 自定义 完整 `select` 渲染内容
    * @en Custom content for the select render slot.
   */
  selectRender?: (value: HTreeExtendsData) => VNode[];

  /**
   * 自定义渲染节点，接收当前节点对应的 `HTreeNodeData` 和 `VNode` 作为参数
    * @en Custom content for the tree node render slot.
   */
  treeNodeRender?: { data: HTreeNodeDataWithLevel; vnode: VNode };
  /**
   * 自定义 `option` 面板中的顶部内容
    * @en Custom content for the panel header render slot.
   */
  panelHeaderRender?: {};
  /**
   * 自定义 `option` 面板中的底部内容
    * @en Custom content for the panel footer render slot.
   */
  panelFooterRender?: {};
  /**
   * 为空时的插槽
    * @en Custom content for the empty slot.
   */
  empty?: {};
  /**
   * 自定义 `cascaderPanel` 确认选中渲染内容
   * @param handler 确认和取消的操作方法
   * @paramEn handler The handler value.
    * @en Custom content for the confirm render slot.
   */
  confirmRender?: { cancelHandle: () => void; confirmHandle: () => void };
}>;

export type TreeSelectSlots = typeof useTreeSelectSlots;
