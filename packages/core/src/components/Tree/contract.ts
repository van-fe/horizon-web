import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const TREE_SIZES = ['small', 'medium', 'large', 'huge'] as const;
export type TreeSize = (typeof TREE_SIZES)[number];
export type TreeValue = string | number;

export interface TreeOption<Label = unknown, Icon = unknown> {
  /** 节点值；同一棵树中应保持唯一。 @en Node value; expected to be unique within a tree. */
  value: TreeValue;
  /** 节点标签。 @en Node label. */
  label: Label;
  /** 非字符串标签的搜索文字。 @en Search text for a non-string label. */
  stringLabel?: string;
  /** 禁用节点。 @en Disables the node. */
  disabled?: boolean;
  /** 子节点。 @en Child nodes. */
  children?: this[];
  /** 显式叶子状态，false 可表示待动态加载。 @en Explicit leaf state; false may denote lazy children. */
  isLeaf?: boolean;
  /** 分组信息。 @en Group metadata. */
  groupLabel?: unknown;
  /** 是否允许选择。 @en Whether the node can be selected. */
  selectable?: boolean;
  /** 节点前缀图标，由 renderer 解释。 @en Renderer-owned node prefix icon. */
  prefixIcon?: Icon | null;
  /** 是否允许拖拽。 @en Whether the node can be dragged. */
  draggable?: boolean;
  /** 前缀图标样式标识，由 renderer 解释。 @en Renderer-owned prefix icon class token. */
  prefixIconClassName?: string;
  [key: string]: unknown;
}

export type TreeFieldName =
  | 'value'
  | 'label'
  | 'stringLabel'
  | 'disabled'
  | 'children'
  | 'isLeaf'
  | 'groupLabel'
  | 'selectable'
  | 'prefixIcon'
  | 'draggable'
  | 'prefixIconClassName';
export type TreeFieldMap = Partial<Record<TreeFieldName, string>>;

export interface TreeNormalizedNode<Option extends TreeOption = TreeOption> {
  key: TreeValue;
  value: TreeValue;
  label: Option['label'];
  stringLabel: string;
  disabled: boolean;
  passingDisabled: boolean;
  selectable: boolean;
  draggable: boolean;
  isLeaf: boolean;
  isRoot: boolean;
  level: number;
  index: number;
  parent: TreeNormalizedNode<Option> | null;
  children: TreeNormalizedNode<Option>[];
  path: TreeValue[];
  keyPath: TreeValue[];
  labelPath: string[];
  fullPathLabel: string;
  originOption: Option;
}

export type TreeFilterMethod<Option extends TreeOption = TreeOption> = (
  input: string,
  node: TreeNormalizedNode<Option>,
) => boolean;
export type TreeDynamicLoader<Option extends TreeOption = TreeOption> = (
  context: TreeDynamicLoadContext<Option>,
) => PromiseLike<readonly Option[]> | readonly Option[];
export type TreeBeforeDrop<Option extends TreeOption = TreeOption> = (
  current: TreeNormalizedNode<Option>,
  target: TreeNormalizedNode<Option> | null,
  previous: TreeNormalizedNode<Option> | null,
) => boolean | PromiseLike<boolean>;

export interface TreeDynamicLoadContext<Option extends TreeOption = TreeOption> {
  level: number;
  node: TreeNormalizedNode<Option>;
}

export interface TreeCommonProps<Option extends TreeOption = TreeOption> {
  /** 受控树数据。 @en Controlled tree data. */
  treeData?: readonly Option[];
  /** 非受控树数据的初始值。 @en Initial value for uncontrolled tree data. */
  defaultTreeData?: readonly Option[];
  size?: TreeSize;
  disabled?: boolean;
  filterable?: boolean;
  filterToHideChildren?: boolean;
  filterMethod?: TreeFilterMethod<Option>;
  filterValue?: string;
  filterInputValue?: string;
  hideFilterInput?: boolean;
  expandFilteredTree?: boolean;
  fieldMap?: TreeFieldMap;
  height?: number | string;
  maxHeight?: number | string;
  useVirtualScroll?: boolean;
  virtualScrollBuffer?: number;
  tooltipShowAfter?: number;
  tooltipHideAfter?: number;
  expandValues?: readonly TreeValue[];
  defaultExpandValues?: readonly TreeValue[];
  expandOnClickNode?: boolean;
  foldIcon?: unknown;
  expandIcon?: unknown;
  prefixIcon?: unknown;
  checkStrictly?: boolean;
  multiple?: boolean;
  multipleLimit?: number;
  selectedValues?: readonly TreeValue[];
  defaultSelectedValues?: readonly TreeValue[];
  checkOnClickNode?: boolean;
  checkOnClickLeaf?: boolean;
  stress?: boolean;
  emptyText?: string;
  dynamicLoad?: TreeDynamicLoader<Option>;
  isDefaultExpandAll?: boolean;
  isDefaultExpandParent?: boolean;
  searchInputPlaceholder?: string;
  indent?: number;
  tooltip?: boolean;
  parentEffectDisabledChild?: boolean;
  showCheckbox?: boolean;
  showRadio?: boolean;
  draggable?: boolean;
  draggableIcon?: unknown;
  undraggableIcon?: unknown;
  draggableIconAlwaysVisible?: boolean;
  dragOnHandler?: boolean;
  dragToLeaf?: boolean;
  beforeDrop?: TreeBeforeDrop<Option>;
  showLine?: boolean;
  expandWrapperByChildren?: boolean;
}

export interface TreeExpandDetails<Option extends TreeOption = TreeOption> {
  expanded: boolean;
  node: TreeNormalizedNode<Option>;
  reason: 'pointer' | 'keyboard' | 'imperative' | 'filter' | 'sync';
}
export interface TreeSelectDetails<Option extends TreeOption = TreeOption> {
  checked: boolean;
  node: TreeNormalizedNode<Option>;
  allCheckedValues: TreeValue[];
  halfCheckedValues: TreeValue[];
  reason: 'pointer' | 'keyboard' | 'imperative' | 'sync';
}
export interface TreeEventMap<Option extends TreeOption = TreeOption, NativeEvent = unknown> {
  treeDataChange: [data: readonly Option[]];
  expandValuesChange: [values: TreeValue[]];
  selectedValuesChange: [values: TreeValue[]];
  visibleNodesChange: [nodes: TreeNormalizedNode<Option>[]];
  filterValueChange: [value: string | undefined];
  expand: [values: TreeValue[], value: TreeValue, details: TreeExpandDetails<Option>];
  select: [values: TreeValue[], value: TreeValue, details: TreeSelectDetails<Option>];
  nodeClick: [event: NativeEvent, value: TreeValue, node: Option];
  nodeContextMenu: [event: NativeEvent, value: TreeValue, node: Option];
  reachTop: [];
  reachBottom: [];
}

export interface TreeNodeRegionContext<Option extends TreeOption = TreeOption> {
  node: TreeNormalizedNode<Option>;
  expanded: boolean;
  checked: boolean;
  indeterminate: boolean;
  loading: boolean;
}
export interface TreeRegionMap<Option extends TreeOption = TreeOption> {
  treeNode: TreeNodeRegionContext<Option>;
  empty: EmptyComponentApi;
}

export interface TreeNodeCollection<Option extends TreeOption = TreeOption> {
  values: TreeValue[];
  nodes: TreeNormalizedNode<Option>[];
}
export interface TreeCommandMap<Option extends TreeOption = TreeOption> {
  getSelectedNodes: () => TreeNodeCollection<Option>;
  getPartSelectedNodes: () => TreeNodeCollection<Option>;
  getUnselectedNodes: () => TreeNodeCollection<Option>;
  setSelectedStatus: (values: readonly TreeValue[], selected: boolean) => void;
  clearSelectedValues: () => void;
  getExpandNodes: () => TreeNodeCollection<Option>;
  setExpandedStatus: (values: readonly TreeValue[], expanded: boolean) => void;
  setAllExpandedStatus: (expanded: boolean) => void;
  getNodesByValue: (
    values: readonly TreeValue[],
  ) => ReadonlyMap<TreeValue, TreeNormalizedNode<Option>>;
  setNodeByValue: (data: Option, value?: TreeValue) => void;
  addNodeChildrenByValue: (data: readonly Option[], value?: TreeValue) => void;
  deleteNodeByValue: (value?: TreeValue) => void;
  getVisibleItems: () => TreeNormalizedNode<Option>[];
  scrollTo: (value?: TreeValue) => void;
}

export const TREE_DEFAULTS = Object.freeze({
  treeData: Object.freeze([]),
  defaultTreeData: Object.freeze([]),
  disabled: false,
  filterable: false,
  filterToHideChildren: true,
  hideFilterInput: false,
  expandFilteredTree: true,
  useVirtualScroll: false,
  tooltipShowAfter: 100,
  tooltipHideAfter: 200,
  expandOnClickNode: true,
  checkStrictly: false,
  multiple: false,
  multipleLimit: Number.POSITIVE_INFINITY,
  checkOnClickNode: false,
  checkOnClickLeaf: true,
  stress: false,
  isDefaultExpandAll: false,
  isDefaultExpandParent: true,
  indent: 24,
  tooltip: true,
  parentEffectDisabledChild: false,
  showCheckbox: true,
  showRadio: false,
  draggable: false,
  undraggableIcon: false,
  draggableIconAlwaysVisible: false,
  dragOnHandler: true,
  dragToLeaf: true,
  showLine: false,
  expandWrapperByChildren: false,
} as const satisfies Partial<TreeCommonProps>);

export function isTreeValue(value: unknown): value is TreeValue {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}
export function isTreeSize(value: unknown): value is TreeSize {
  return TREE_SIZES.includes(value as TreeSize);
}
export function isTreeDimension(value: unknown): value is string | number {
  return (
    (typeof value === 'number' && Number.isFinite(value) && value >= 0) ||
    (typeof value === 'string' && value.trim().length > 0)
  );
}
export function isTreeNonnegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}
export function isTreeMultipleLimit(value: unknown): value is number {
  return value === Number.POSITIVE_INFINITY || isTreeNonnegativeNumber(value);
}
export function isTreeValueArray(value: unknown): value is TreeValue[] {
  return Array.isArray(value) && value.every(isTreeValue);
}

export const treeApiContract = defineComponentApiContract<
  TreeCommonProps,
  TreeEventMap,
  TreeRegionMap,
  TreeCommandMap
>({
  defaults: TREE_DEFAULTS,
  validators: {
    size: isTreeSize,
    height: isTreeDimension,
    maxHeight: isTreeDimension,
    virtualScrollBuffer: isTreeNonnegativeNumber,
    tooltipShowAfter: isTreeNonnegativeNumber,
    tooltipHideAfter: isTreeNonnegativeNumber,
    expandValues: isTreeValueArray,
    defaultExpandValues: isTreeValueArray,
    multipleLimit: isTreeMultipleLimit,
    selectedValues: isTreeValueArray,
    defaultSelectedValues: isTreeValueArray,
    indent: isTreeNonnegativeNumber,
  },
});
