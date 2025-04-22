import type { VNode } from 'vue';

export interface TopBaseTreeData {
  /**
   * 选项值
   */
  value: string | number;
  /**
   * 选项 label
   */
  label: string | ((option: BaseTreeData) => VNode);
}

export interface BaseTreeData extends TopBaseTreeData {
  /**
   * 当 `label` 为 `VNode` 时，展示的文案内容，可用于搜索结果的展示和选中内容的展示
   */
  stringLabel?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 子项
   */
  children?: BaseTreeData[];
  /**
   * 是否为叶子节点
   */
  isLeaf?: boolean;
  /**
   * 分组名
   */
  groupLabel?: string | (() => VNode);
  /**
   * 节点是否可选中，默认可被选中
   * `disabled` 状态优先于 `selectable`
   */
  selectable?: boolean;
}

export interface BaseTreeWithLevelData extends BaseTreeData {
  /**
   * 层级
   */
  level: number;
}

export interface ExtendTreeData<Base extends BaseTreeData = BaseTreeData>
  extends BaseTreeWithLevelData {
  /**
   * 唯一标识
   */
  _uuid: string | number;
  /**
   * 路径
   */
  path: (string | number)[];
  /**
   * 从父级到当前级的路径
   */
  paths: this[];
  /**
   * 显式文字的集合
   */
  labels: string[];
  /**
   * 从父节点到当前的字符串
   */
  fullPathLabel: string;
  /**
   * 唯一标识路径
   */
  uuidPath: (string | number)[];
  /**
   * 父级
   */
  parent: this | null;
  /**
   * 格式化后的子项
   */
  transformedChildren: this[];
  /**
   * 是否是根节点
   */
  isRoot: boolean;
  /**
   * 是否是组标题
   */
  isGroupLabel: boolean;
  /**
   * 原始 `option`
   */
  originOption: Base;
  /**
   * 从父级传递下来的 `disabled` 状态，也包括自己的 `disabled` 状态
   */
  passingDisabled: boolean;
  /**
   * 当前元素所在下标
   */
  _index: number;
  /**
   * vNode 获取方式
   */
  vNodeGetter?: () => VNode | undefined;
  /**
   * 上下文 symbol 节点
   */
  __context: {
    /**
     * 上一个子节点
     */
    prev: ExtendTreeData | null;
    /**
     * 下一个子节点
     */
    next: ExtendTreeData | null;
  };
}
