import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type {
  HTreeBaseNodeData,
  HTreeData,
  HTreeNodeDataWithLevel,
} from '~/components/Tree/src/utils/types';
import type { TopBaseTreeData } from '~/utils/useTree/types';

export const useTreeSelectExposes = {
  /**
   手动处理确认操作，只有在 `need-confirm = true` 时有效
    * @en Controls confirm handle.
   */
  confirmHandle: Function as ExposeType<() => void>,
  /**
   * 手动处理取消操作，只有在 `need-confirm = true` 时有效
    * @en Controls cancel handle.
   */
  cancelHandle: Function as ExposeType<() => void>,
  /**
   * 控制面板是否展示
    * @en Controls change panel visible.
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
  /**
   * 获取选中状态所有节点
   *
   * @return values 选中的值
   * @return nodes 选中的节点
   *
    * @en Controls get selected nodes.
   */
  getSelectedNodes: Function as ExposeType<
    () => { values: Array<string | number>; nodes: HTreeBaseNodeData[] }
  >,

  /**
   * 获取半选状态所有节点
   *
   * @return values 选中的值
   * @return nodes 选中的节点
   *
    * @en Controls get part selected nodes.
   */
  getPartSelectedNodes: Function as ExposeType<
    () => { values: Array<string | number>; nodes: HTreeBaseNodeData[] }
  >,

  /**
   * 获取未被选中所有节点
   *
   * @return values 未选中的值
   * @return nodes 未选中的节点
   *
    * @en Controls get un selected nodes.
   */
  getUnSelectedNodes: Function as ExposeType<
    () => { values: Array<string | number>; nodes: HTreeBaseNodeData[] }
  >,

  /**
   * 通过 value 设置节点选中状态
   *
   * @param values 需要选中/未选中的节点的值
   * @paramEn values The values value.
   * @param selected 是否选中
   * @paramEn selected The selected value.
   *
    * @en Controls set selected status.
   */
  setSelectedStatus: Function as ExposeType<
    (values: Array<string | number>, selected: boolean) => void
  >,

  /**
   * 清空所有已选择的选项
   *
    * @en Controls clear selected values.
   */
  clearSelectedValues: Function as ExposeType<() => void>,

  /**
   * 获取展开状态的所有节点
   *
   * @return values 展开的值
   * @return nodes 展开的节点
   *
    * @en Controls get expand nodes.
   */
  getExpandNodes: Function as ExposeType<
    () => { values: Array<string | number>; nodes: HTreeBaseNodeData[] }
  >,

  /**
   * 通过 value 设置节点展开收起状态
   *
   * @param values 需要展开/收起的节点的值
   * @paramEn values The values value.
   * @param isExpand 是否需要展开
   * @paramEn isExpand The is expand value.
   *
    * @en Controls set collapse status by value.
   */
  setCollapseStatusByValue: Function as ExposeType<
    (values: Array<string | number>, isExpand: boolean) => void
  >,

  /**
   * 设置全部节点展开状态
   *
   * @param isExpand 是否需要展开
   * @paramEn isExpand The is expand value.
   *
    * @en Controls set all collapse status.
   */
  setAllCollapseStatus: Function as ExposeType<(isExpand: boolean) => void>,

  /**
   * 通过 value 获取节点信息，没有展开的节点不被渲染，无法获取到 vNode 属性
   *
   * @param value 需要获取节点的值
   * @paramEn value The value value.
   * @return 以 value 为 key，node 为值的集合
   *
    * @en Controls get node by values.
   */
  getNodeByValues: Function as ExposeType<
    (value: Array<string | number>) => Record<string | number, HTreeBaseNodeData>
  >,

  /**
   * 通过 value 设置指定节点的数据，如果不传入 value，则表示在根节点下添加子节点
   *
   * @param treeData 设置的数据
   * @paramEn treeData The tree data value.
   * @param value 需要设置节点数据的value值
   * @paramEn value The value value.
   *
    * @en Controls set node by value.
   */
  setNodeByValue: Function as ExposeType<
    (treeData: TopBaseTreeData & Partial<HTreeData>, value?: string | number) => void
  >,

  /**
   * 通过 value 设置指定节点的数据，如果不传入 value，则表示在根节点下添加子节点
   *
   * @param treeDataArray 添加的子数据
   * @paramEn treeDataArray The tree data array value.
   * @param value 需要设置节点数据的value值
   * @paramEn value The value value.
   *
    * @en Controls add node children by value.
   */
  addNodeChildrenByValue: Function as ExposeType<
    (treeDataArray: Array<TopBaseTreeData & Partial<HTreeData>>, value?: string | number) => void
  >,

  /**
   * 通过 value 删除指定节点的数据，如果不传入 value，则表示删除整棵树
   *
   * @param value 需要删除节点数据的value值
   * @paramEn value The value value.
    * @en Controls del node by value.
   */
  delNodeByValue: Function as ExposeType<(value?: string | number) => void>,

  /**
   * 获取当前显示的子元素
   *
    * @en Controls get visible items.
   */
  getVisibleItems: Function as ExposeType<() => HTreeNodeDataWithLevel[]>,

  /**
   * 滚动到传入的 value 节点所在位置
   * 如果不传入 value，则滚动到 `selected-values` 中第一个所在位置
    * @en Controls scroll to.
   */
  scrollTo: Function as ExposeType<(value?: string | number) => void>,
};

export type TreeSelectExposes = ExtractExposeTypes<typeof useTreeSelectExposes>;
