import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize } from '../_shared/choice';
import { isChoiceSize } from '../_shared/choice';
import type {
  TreeCommandMap,
  TreeCommonProps,
  TreeEventMap,
  TreeNormalizedNode,
  TreeOption,
  TreeSelectDetails,
  TreeSize,
  TreeValue,
} from '../Tree';
import {
  isTreeDimension,
  isTreeMultipleLimit,
  isTreeNonnegativeNumber,
  isTreeSize,
  isTreeValue,
  isTreeValueArray,
  treeApiContract,
} from '../Tree';
import type {
  PickerFitInputWidth,
  PickerInputStatus,
  PickerInputVariant,
  PickerOpenReason,
  PickerTrigger,
} from '../Picker';
import {
  isPickerDelay,
  isPickerFitInputWidth,
  isPickerInputStatus,
  isPickerInputVariant,
  isPickerTrigger,
} from '../Picker';
import type { PopoverPlacement } from '../Popover';
import { isPopoverPlacement } from '../Popover';

export const TREE_SELECT_RESERVE_KEYWORDS = [
  true,
  false,
  'reserve-deselect',
  'reserve-special',
] as const;

export type TreeSelectReserveKeyword = (typeof TREE_SELECT_RESERVE_KEYWORDS)[number];
export type TreeSelectModelValue = TreeValue | TreeValue[] | null | undefined;
export type TreeSelectValueReason =
  | 'select'
  | 'clear'
  | 'remove'
  | 'confirm'
  | 'imperative'
  | 'mode-change';
export type TreeSelectOpenReason = PickerOpenReason | 'keyboard' | 'select';
export type TreeSelectFilterReason = 'input' | 'selection' | 'close' | 'clear' | 'imperative';

/** TreeSelect 自有的框架无关参数；树参数直接复用 Tree contract。 @en Framework-neutral TreeSelect-owned props; tree props are reused directly from the Tree contract. */
export interface TreeSelectOwnProps {
  /** 受控选择值。 @en Controlled selected value. */
  value?: TreeSelectModelValue;
  /** 非受控选择初值。 @en Initial uncontrolled selected value. */
  defaultValue?: TreeSelectModelValue;
  /** 清空时使用的回退值。 @en Fallback value used when clearing. */
  initialValue?: TreeSelectModelValue;
  /** 受控面板状态。 @en Controlled popup state. */
  open?: boolean;
  /** 非受控面板初始状态。 @en Initial uncontrolled popup state. */
  defaultOpen?: boolean;
  /** 受控过滤值。 @en Controlled filter value. */
  filterValue?: string;
  /** 非受控过滤初值。 @en Initial uncontrolled filter value. */
  defaultFilterValue?: string;
  /** 面板触发方式。 @en Popup trigger mode. */
  trigger?: PickerTrigger;
  /** 支持清空。 @en Allows clearing the selection. */
  clearable?: boolean;
  /** 触发器尺寸。 @en Trigger size. */
  size?: ChoiceSize;
  /** 树面板尺寸。 @en Tree panel size. */
  treeSize?: TreeSize;
  /** 触发器占位文字。 @en Trigger placeholder. */
  placeholder?: string;
  /** 输入框视觉变体。 @en Input visual variant. */
  inputVariant?: PickerInputVariant;
  /** 输入框状态。 @en Input validation status. */
  inputStatus?: PickerInputStatus;
  /** 浮层位置。 @en Popup placement. */
  placement?: PopoverPlacement;
  /** 浮层空间不足时允许翻转。 @en Allows popup flipping when space is insufficient. */
  flip?: boolean;
  /** 是否通过 Portal 渲染浮层。 @en Whether the popup renders through a portal. */
  portal?: boolean;
  /** hover 打开延迟。 @en Hover open delay in milliseconds. */
  hoverShowDelay?: number;
  /** hover 关闭延迟。 @en Hover close delay in milliseconds. */
  hoverHideDelay?: number;
  /** 面板宽度。 @en Popup panel width. */
  panelWidth?: string | number;
  /** 浮层自定义类名语义。 @en Popup custom class semantic. */
  popupClassName?: string;
  /** 输入框宽度策略。 @en Input-width strategy. */
  fitInputWidth?: PickerFitInputWidth;
  /** 自适应输入框最小宽度。 @en Minimum width of the fit-content input. */
  fitContentInputMinWidth?: string | number;
  /** 多选标签折叠。 @en Collapses multiple-selection tags. */
  collapseTags?: boolean;
  /** 折叠标签展示提示。 @en Shows a tooltip for collapsed tags. */
  collapseTagsTooltip?: boolean;
  /** 折叠前最多展示的标签数量。 @en Maximum tags shown before collapsing. */
  maxCollapseTags?: number;
  /** 标签尽量填满触发器。 @en Lets tags fill the trigger when possible. */
  collapseTagsFillUp?: boolean;
  /** 使用数量统计代替标签。 @en Uses a selection count instead of tags. */
  useStatistic?: boolean;
  /** 数量统计前置文字。 @en Selection-count leading text. */
  statisticText?: string;
  /** 选择需要显式确认。 @en Selection requires explicit confirmation. */
  needConfirm?: boolean;
  /** 确认按钮文字。 @en Confirm action text. */
  confirmText?: string;
  /** 取消按钮文字。 @en Cancel action text. */
  cancelText?: string;
  /** 在面板内过滤。 @en Filters through a panel input. */
  panelFilterable?: boolean;
  /** 使用内置面板过滤输入框。 @en Uses the built-in panel filter input. */
  useBuiltInPanelFilter?: boolean;
  /** 面板过滤输入框占位文字。 @en Panel filter input placeholder. */
  panelInputPlaceholder?: string;
  /** 选中后保留过滤关键词的策略。 @en Filter-keyword retention policy after selection. */
  reserveKeyword?: TreeSelectReserveKeyword;
  /** 输入变化的建议节流间隔。 @en Suggested input-change debounce interval. */
  inputDebounce?: number;
}

export type TreeSelectTreeProps<Option extends TreeOption = TreeOption> = Omit<
  TreeCommonProps<Option>,
  'size' | 'selectedValues' | 'defaultSelectedValues' | 'filterValue'
>;

export type TreeSelectCommonProps<Option extends TreeOption = TreeOption> =
  TreeSelectTreeProps<Option> & TreeSelectOwnProps;

export interface TreeSelectValueChangeDetails {
  reason: TreeSelectValueReason;
  committed: boolean;
}

export interface TreeSelectOpenChangeDetails {
  reason: TreeSelectOpenReason;
}

export interface TreeSelectFilterChangeDetails {
  reason: TreeSelectFilterReason;
}

export interface TreeSelectEventMap<
  Option extends TreeOption = TreeOption,
  NativeEvent = unknown,
> extends Omit<TreeEventMap<Option, NativeEvent>, 'selectedValuesChange' | 'filterValueChange'> {
  /** 选择值变化。 @en Selected value changed. */
  valueChange: [value: TreeSelectModelValue, details: TreeSelectValueChangeDetails];
  /** 暂存选择变化。 @en Staged selection changed. */
  pendingValueChange: [value: TreeSelectModelValue, details: TreeSelectValueChangeDetails];
  /** 面板显隐变化。 @en Popup visibility changed. */
  openChange: [open: boolean, details: TreeSelectOpenChangeDetails];
  /** 过滤值变化。 @en Filter value changed. */
  filterValueChange: [value: string, details: TreeSelectFilterChangeDetails];
  /** 单次树选择。 @en A tree selection interaction occurred. */
  select: [values: TreeValue[], value: TreeValue, details: TreeSelectDetails<Option>];
  /** 清空选择。 @en Selection cleared. */
  clear: [value: TreeSelectModelValue];
  /** 确认暂存选择。 @en Staged selection confirmed. */
  confirm: [value: TreeSelectModelValue];
  /** 取消暂存选择。 @en Staged selection cancelled. */
  cancel: [value: TreeSelectModelValue];
  /** 触发器获得焦点。 @en Trigger focused. */
  focus: [event?: NativeEvent];
  /** 触发器失去焦点。 @en Trigger blurred. */
  blur: [event?: NativeEvent];
  /** 输入内容变化。 @en Filter input changed. */
  input: [value: string];
}

export interface TreeSelectTagData<Option extends TreeOption = TreeOption> {
  value: TreeValue;
  label: string;
  fullPathLabel: string;
  disabled: boolean;
  removable: boolean;
  node?: TreeNormalizedNode<Option>;
}

export interface TreeSelectTriggerRegionContext<Option extends TreeOption = TreeOption> {
  open: boolean;
  value: TreeSelectModelValue;
  selectedNodes: TreeNormalizedNode<Option>[];
}

export interface TreeSelectConfirmRegionContext {
  confirm: () => void;
  cancel: () => void;
}

export interface TreeSelectRegionMap<Option extends TreeOption = TreeOption> {
  trigger: TreeSelectTriggerRegionContext<Option>;
  tag: TreeSelectTagData<Option>;
  selection: TreeSelectTriggerRegionContext<Option>;
  treeNode: TreeNormalizedNode<Option>;
  panelHeader: EmptyComponentApi;
  panelFooter: EmptyComponentApi;
  empty: EmptyComponentApi;
  confirm: TreeSelectConfirmRegionContext;
}

export interface TreeSelectCommandMap<
  Option extends TreeOption = TreeOption,
> extends TreeCommandMap<Option> {
  /** 确认暂存选择。 @en Confirms staged selection. */
  confirm: () => TreeSelectModelValue;
  /** 取消暂存选择。 @en Cancels staged selection. */
  cancel: () => TreeSelectModelValue;
  /** 设置面板状态。 @en Sets popup visibility. */
  setOpen: (open: boolean) => void;
  /** 设置过滤值。 @en Sets the filter value. */
  setFilterValue: (value: string) => void;
  /** 获取暂存选择值。 @en Gets the staged selection. */
  getPendingValue: () => TreeSelectModelValue;
}

export const TREE_SELECT_DEFAULTS = Object.freeze({
  initialValue: [] as TreeValue[],
  defaultOpen: false,
  trigger: 'click',
  clearable: false,
  size: 'medium',
  inputVariant: 'normal',
  inputStatus: 'normal',
  placement: 'bottom-start',
  flip: true,
  portal: true,
  hoverShowDelay: 0,
  hoverHideDelay: 200,
  fitInputWidth: true,
  fitContentInputMinWidth: 1,
  collapseTags: false,
  collapseTagsTooltip: false,
  collapseTagsFillUp: true,
  useStatistic: false,
  needConfirm: false,
  panelFilterable: false,
  useBuiltInPanelFilter: false,
  reserveKeyword: true,
  inputDebounce: 200,
  ...(treeApiContract.defaults as object),
  treeData: Object.freeze([]),
} as const) as unknown as Readonly<Partial<TreeSelectCommonProps>>;

export function isTreeSelectModelValue(value: unknown): value is TreeSelectModelValue {
  return value == null || isTreeValue(value) || isTreeValueArray(value);
}

function isDefinedTreeSelectModelValue(value: unknown): value is NonNullable<TreeSelectModelValue> {
  return isTreeSelectModelValue(value) && value != null;
}

export function isTreeSelectReserveKeyword(value: unknown): value is TreeSelectReserveKeyword {
  return TREE_SELECT_RESERVE_KEYWORDS.includes(value as TreeSelectReserveKeyword);
}

export const treeSelectApiContract = defineComponentApiContract<
  TreeSelectCommonProps,
  TreeSelectEventMap,
  TreeSelectRegionMap,
  TreeSelectCommandMap
>({
  defaults: TREE_SELECT_DEFAULTS,
  validators: {
    ...(treeApiContract.validators ?? {}),
    value: isDefinedTreeSelectModelValue,
    defaultValue: isDefinedTreeSelectModelValue,
    initialValue: isDefinedTreeSelectModelValue,
    trigger: isPickerTrigger,
    size: isChoiceSize,
    treeSize: isTreeSize,
    inputVariant: isPickerInputVariant,
    inputStatus: isPickerInputStatus,
    placement: isPopoverPlacement,
    hoverShowDelay: isPickerDelay,
    hoverHideDelay: isPickerDelay,
    panelWidth: isTreeDimension,
    fitInputWidth: isPickerFitInputWidth,
    fitContentInputMinWidth: isTreeDimension,
    maxCollapseTags: isTreeNonnegativeNumber,
    reserveKeyword: isTreeSelectReserveKeyword,
    inputDebounce: isTreeNonnegativeNumber,
    multipleLimit: isTreeMultipleLimit,
  },
});
