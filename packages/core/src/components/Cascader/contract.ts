import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const CASCADER_TRIGGERS = ['hover', 'click', 'never'] as const;
export const CASCADER_EXPAND_TRIGGERS = ['hover', 'click'] as const;
export const CASCADER_SHOW_STRATEGIES = ['fullPath', 'leaf'] as const;
export const CASCADER_RESERVE_KEYWORDS = [true, false, 'reserve-deselect'] as const;

export type CascaderValue = string | number;
export type CascaderValuePath = CascaderValue[];
export type CascaderModelValue = CascaderValuePath | CascaderValuePath[] | null | undefined;
export type CascaderTrigger = (typeof CASCADER_TRIGGERS)[number];
export type CascaderExpandTrigger = (typeof CASCADER_EXPAND_TRIGGERS)[number];
export type CascaderShowStrategy = (typeof CASCADER_SHOW_STRATEGIES)[number];
export type CascaderReserveKeyword = (typeof CASCADER_RESERVE_KEYWORDS)[number];

export interface CascaderOption<Label = unknown> {
  /** 选项值。 @en Option value. */
  value: CascaderValue;
  /** 选项标签。 @en Option label. */
  label: Label;
  /** 非字符串标签的搜索及展示文本。 @en Search and display text for non-string labels. */
  stringLabel?: string;
  /** 禁用当前选项。 @en Disables the current option. */
  disabled?: boolean;
  /** 子选项。 @en Child options. */
  children?: CascaderOption<Label>[];
  /** 显式声明叶子节点。 @en Explicitly marks a leaf option. */
  isLeaf?: boolean;
  /** 分组标签。 @en Group label. */
  groupLabel?: unknown;
  /** 是否允许选择。 @en Whether the option is selectable. */
  selectable?: boolean;
  [key: string]: unknown;
}

export type CascaderFieldName =
  | 'value'
  | 'label'
  | 'stringLabel'
  | 'disabled'
  | 'children'
  | 'isLeaf'
  | 'groupLabel'
  | 'selectable';

export type CascaderFieldMap = Partial<Record<CascaderFieldName, string>>;

export interface CascaderFilterPathData<Option = CascaderNormalizedOption> {
  label: string;
  value: CascaderValue;
  option: Option;
}

export type CascaderFilterFunction<Option = CascaderNormalizedOption> = (
  input: string,
  paths: CascaderFilterPathData<Option>[],
) => boolean;

export type CascaderFilterSortFunction<Option = CascaderNormalizedOption> = (
  left: Option,
  right: Option,
  input: string,
) => number;

export interface CascaderSearchParams<Option = CascaderNormalizedOption> {
  filter: CascaderFilterFunction<Option>;
  limit?: number;
  searchPanelWidth?: number | string;
  sort?: CascaderFilterSortFunction<Option>;
}

export interface CascaderCommonProps<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  /** 选中值路径。 @en Selected value path or paths. */
  modelValue?: CascaderModelValue;
  /** 非受控初始选中值路径。 @en Initial uncontrolled selected value path or paths. */
  defaultValue?: CascaderModelValue;
  /** 选项树。 @en Option tree. */
  options: readonly Option[];
  /** 外层面板触发方式。 @en Outer panel trigger. */
  trigger?: CascaderTrigger;
  /** 子面板展开方式。 @en Child-panel expansion trigger. */
  expandTrigger?: CascaderExpandTrigger;
  /** 支持清除。 @en Allows clearing the selection. */
  clearable?: boolean;
  /** 禁用交互。 @en Disables interaction. */
  disabled?: boolean;
  /** 启用多选。 @en Enables multiple selection. */
  multiple?: boolean;
  /** 多选数量限制。 @en Multiple-selection limit. */
  multipleLimit?: number;
  /** 父子选择互不关联。 @en Makes parent and child selection independent. */
  checkStrictly?: boolean;
  /** 严格选择非叶子节点后阻止自动展开。 @en Prevents automatic expansion after strictly selecting a branch. */
  expandStrictly?: boolean;
  /** 选中标签展示策略。 @en Selected-label display strategy. */
  showCheckedStrategy?: CascaderShowStrategy;
  /** 路径标签分隔符。 @en Path-label separator. */
  pathSeparator?: string;
  /** 是否需要显式确认选择。 @en Whether selection requires explicit confirmation. */
  needConfirm?: boolean;
  /** 过滤配置。 @en Filtering configuration. */
  filter?: boolean | CascaderSearchParams;
  /** 启用默认过滤。 @en Enables default filtering. */
  filterable?: boolean;
  /** 自定义过滤方法。 @en Custom filter function. */
  filterMethod?: CascaderFilterFunction;
  /** 过滤结果数量限制。 @en Filtered-result limit. */
  filterMaxResult?: number;
  /** 过滤结果排序方法。 @en Filtered-result sort function. */
  filterResultSort?: CascaderFilterSortFunction;
  /** 多选过滤后是否保留关键词。 @en Whether to reserve the keyword after filtered selection. */
  reserveKeyword?: CascaderReserveKeyword;
  /** 选项字段映射。 @en Option field mapping. */
  fieldMap?: CascaderFieldMap;
}

export interface CascaderNormalizedOption<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  id: number;
  value: CascaderValue;
  label: Option['label'];
  stringLabel: string;
  disabled: boolean;
  passingDisabled: boolean;
  selectable: boolean;
  groupLabel?: unknown;
  isLeaf: boolean;
  isRoot: boolean;
  level: number;
  index: number;
  parent: CascaderNormalizedOption<Option> | null;
  children: CascaderNormalizedOption<Option>[];
  path: CascaderValuePath;
  labelPath: string[];
  originOption: Option;
}

export interface CascaderDynamicLoadNode<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  level: number;
  options: Array<Option | null>;
}

export interface CascaderEventMap<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
  Event = unknown,
> {
  /** 选中值变化。 @en Selected value changed. */
  valueChange: [value: CascaderModelValue];
  /** 下拉面板显隐变化。 @en Dropdown visibility changed. */
  dropdownVisibleChange: [visible: boolean];
  /** 获得焦点。 @en Focus received. */
  focus: [];
  /** 失去焦点。 @en Focus lost. */
  blur: [];
  /** 输入内容变化。 @en Input changed. */
  input: [value: string];
  /** 搜索内容变化。 @en Search input changed. */
  search: [value: string];
  /** 选项树变化。 @en Option tree changed. */
  optionsChange: [options: readonly Option[]];
  /** 单次选择状态变化。 @en An option selection state changed. */
  change: [selected?: boolean, option?: CascaderNormalizedOption<Option>];
  /** 清空选择。 @en Selection cleared. */
  clear: [];
  /** 选择选项。 @en Option selected. */
  select: [path?: CascaderValuePath, option?: CascaderNormalizedOption<Option>];
  /** 取消选择选项。 @en Option deselected. */
  deselect: [path?: CascaderValuePath, option?: CascaderNormalizedOption<Option>];
  /** 已提交选择发生变化。 @en Committed selection changed. */
  modify: [
    value: CascaderModelValue,
    selected?: boolean,
    option?: CascaderNormalizedOption<Option>,
  ];
  /** 确认选择。 @en Selection confirmed. */
  confirm: [value: CascaderModelValue];
  /** 取消暂存选择。 @en Staged selection cancelled. */
  cancel: [value: CascaderModelValue];
  /** 子面板触底。 @en A child panel reached its end. */
  panelReachBottom: [event: Event | undefined, parent: Option | null | undefined];
  /** 触发器被点击。 @en Trigger clicked. */
  click: [event: Event];
}

export interface CascaderTriggerRegionContext {
  visible: boolean;
}

export interface CascaderSearchRegionContext<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  paths: CascaderFilterPathData<CascaderNormalizedOption<Option>>[];
  inputValue: string;
}

export interface CascaderConfirmRegionContext {
  cancel: () => void;
  confirm: () => void;
}

export interface CascaderRegionMap<
  Option extends CascaderOption<unknown> = CascaderOption<unknown>,
> {
  trigger: CascaderTriggerRegionContext;
  tag: CascaderNormalizedOption<Option>;
  selection: EmptyComponentApi;
  item: CascaderNormalizedOption<Option>;
  searchResult: CascaderSearchRegionContext<Option>;
  empty: EmptyComponentApi;
  confirm: CascaderConfirmRegionContext;
  panelHeader: EmptyComponentApi;
  panelFooter: EmptyComponentApi;
  confirmLeading: EmptyComponentApi;
}

export interface CascaderCommandMap {
  confirm: () => void;
  cancel: () => void;
  focusOption: (path: CascaderValuePath) => void;
  setPanelVisible: (visible: boolean) => void;
  enableInput: () => void;
  setInput: (value: string | null) => void;
  clear: () => void;
  focus: () => void;
  blur: () => void;
}

export const CASCADER_DEFAULTS = Object.freeze({
  trigger: 'click',
  expandTrigger: 'click',
  clearable: false,
  multiple: false,
  multipleLimit: Number.POSITIVE_INFINITY,
  checkStrictly: false,
  expandStrictly: true,
  showCheckedStrategy: 'fullPath',
  pathSeparator: '/',
  needConfirm: false,
  filter: false,
  filterable: false,
  filterMaxResult: 50,
  reserveKeyword: true,
} as const satisfies Partial<CascaderCommonProps>);

export function isCascaderTrigger(value: unknown): value is CascaderTrigger {
  return CASCADER_TRIGGERS.includes(value as CascaderTrigger);
}

export function isCascaderExpandTrigger(value: unknown): value is CascaderExpandTrigger {
  return CASCADER_EXPAND_TRIGGERS.includes(value as CascaderExpandTrigger);
}

export function isCascaderShowStrategy(value: unknown): value is CascaderShowStrategy {
  return CASCADER_SHOW_STRATEGIES.includes(value as CascaderShowStrategy);
}

export function isCascaderReserveKeyword(value: unknown): value is CascaderReserveKeyword {
  return CASCADER_RESERVE_KEYWORDS.includes(value as CascaderReserveKeyword);
}

export function isCascaderValue(value: unknown): value is CascaderValue {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

export function isCascaderValuePath(value: unknown): value is CascaderValuePath {
  return Array.isArray(value) && value.every(isCascaderValue);
}

export function isCascaderModelValue(value: unknown): value is CascaderModelValue {
  return (
    value == null ||
    (Array.isArray(value) &&
      (value.length === 0 || isCascaderValuePath(value) || value.every(isCascaderValuePath)))
  );
}

export function isDefinedCascaderModelValue(
  value: unknown,
): value is NonNullable<CascaderModelValue> {
  return value !== undefined && isCascaderModelValue(value);
}

export function isCascaderMultipleLimit(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    (value === Number.POSITIVE_INFINITY || (Number.isFinite(value) && value >= 0))
  );
}

export const cascaderApiContract = defineComponentApiContract<
  CascaderCommonProps,
  CascaderEventMap,
  CascaderRegionMap,
  CascaderCommandMap
>({
  defaults: CASCADER_DEFAULTS,
  validators: {
    modelValue: isDefinedCascaderModelValue,
    defaultValue: isDefinedCascaderModelValue,
    trigger: isCascaderTrigger,
    expandTrigger: isCascaderExpandTrigger,
    multipleLimit: isCascaderMultipleLimit,
    showCheckedStrategy: isCascaderShowStrategy,
    reserveKeyword: isCascaderReserveKeyword,
  },
});
