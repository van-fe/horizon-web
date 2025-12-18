import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type {
  NTreeBaseNodeData,
  NTreeData,
  NTreeNodeDataWithLevel,
} from '~/components/Tree/src/utils/types';
import type { TopBaseTreeData } from '~/utils/useTree/types';

export const useTreeSelectExposes = {
  /**
   手动处理确认操作，只有在 `need-confirm = true` 时有效
   */
  confirmHandle: Function as ExposeType<() => void>,
  /**
   * 手动处理取消操作，只有在 `need-confirm = true` 时有效
   */
  cancelHandle: Function as ExposeType<() => void>,
  /**
   * 控制面板是否展示
   */
  changePanelVisible: Function as ExposeType<(visible: boolean) => void>,
  /**
   * 获取选中状态所有节点
   *
   * @return values 选中的值
   * @return nodes 选中的节点
   *
   * @version 2.12.5
   */
  getSelectedNodes: Function as ExposeType<
    () => { values: Array<string | number>; nodes: NTreeBaseNodeData[] }
  >,

  /**
   * 获取半选状态所有节点
   *
   * @return values 选中的值
   * @return nodes 选中的节点
   *
   * @version 2.12.5
   */
  getPartSelectedNodes: Function as ExposeType<
    () => { values: Array<string | number>; nodes: NTreeBaseNodeData[] }
  >,

  /**
   * 获取未被选中所有节点
   *
   * @return values 未选中的值
   * @return nodes 未选中的节点
   *
   * @version 2.12.5
   */
  getUnSelectedNodes: Function as ExposeType<
    () => { values: Array<string | number>; nodes: NTreeBaseNodeData[] }
  >,

  /**
   * 通过 value 设置节点选中状态
   *
   * @param values 需要选中/未选中的节点的值
   * @param selected 是否选中
   *
   * @version 2.12.5
   */
  setSelectedStatus: Function as ExposeType<
    (values: Array<string | number>, selected: boolean) => void
  >,

  /**
   * 清空所有已选择的选项
   *
   * @version 2.12.5
   */
  clearSelectedValues: Function as ExposeType<() => void>,

  /**
   * 获取展开状态的所有节点
   *
   * @return values 展开的值
   * @return nodes 展开的节点
   *
   * @version 2.12.5
   */
  getExpandNodes: Function as ExposeType<
    () => { values: Array<string | number>; nodes: NTreeBaseNodeData[] }
  >,

  /**
   * 通过 value 设置节点展开收起状态
   *
   * @param values 需要展开/收起的节点的值
   * @param isExpand 是否需要展开
   *
   * @version 2.12.5
   */
  setCollapseStatusByValue: Function as ExposeType<
    (values: Array<string | number>, isExpand: boolean) => void
  >,

  /**
   * 设置全部节点展开状态
   *
   * @param isExpand 是否需要展开
   *
   * @version 2.12.5
   */
  setAllCollapseStatus: Function as ExposeType<(isExpand: boolean) => void>,

  /**
   * 通过 value 获取节点信息，没有展开的节点不被渲染，无法获取到 vNode 属性
   *
   * @param value 需要获取节点的值
   * @return 以 value 为 key，node 为值的集合
   *
   * @version 2.12.5
   */
  getNodeByValues: Function as ExposeType<
    (value: Array<string | number>) => Record<string | number, NTreeBaseNodeData>
  >,

  /**
   * 通过 value 设置指定节点的数据，如果不传入 value，则表示在根节点下添加子节点
   *
   * @param treeData 设置的数据
   * @param value 需要设置节点数据的value值
   *
   * @version 2.12.5
   */
  setNodeByValue: Function as ExposeType<
    (treeData: TopBaseTreeData & Partial<NTreeData>, value?: string | number) => void
  >,

  /**
   * 通过 value 设置指定节点的数据，如果不传入 value，则表示在根节点下添加子节点
   *
   * @param treeDataArray 添加的子数据
   * @param value 需要设置节点数据的value值
   *
   * @version 2.12.5
   */
  addNodeChildrenByValue: Function as ExposeType<
    (treeDataArray: Array<TopBaseTreeData & Partial<NTreeData>>, value?: string | number) => void
  >,

  /**
   * 通过 value 删除指定节点的数据，如果不传入 value，则表示删除整棵树
   *
   * @param value 需要删除节点数据的value值
   * @version 2.12.5
   */
  delNodeByValue: Function as ExposeType<(value?: string | number) => void>,

  /**
   * 获取当前显示的子元素
   *
   * @version 2.12.5
   */
  getVisibleItems: Function as ExposeType<() => NTreeNodeDataWithLevel[]>,

  /**
   * 滚动到传入的 value 节点所在位置
   * 如果不传入 value，则滚动到 `selected-values` 中第一个所在位置
   * @version 2.12.5
   */
  scrollTo: Function as ExposeType<(value?: string | number) => void>,
};

export type TreeSelectExposes = ExtractExposeTypes<typeof useTreeSelectExposes>;
