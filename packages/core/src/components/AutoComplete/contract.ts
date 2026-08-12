import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize } from '../_shared/choice';
import { isChoiceSize } from '../_shared/choice';
import type { InputVariant } from '../Input';
import { isInputVariant } from '../Input';
import type { PopoverPlacement } from '../Popover';
import { isPopoverPlacement } from '../Popover';

export const AUTO_COMPLETE_TRIGGERS = ['hover', 'click'] as const;
export const AUTO_COMPLETE_DESCRIPTION_POSITIONS = ['right', 'bottom'] as const;
export const AUTO_COMPLETE_FIT_INPUT_WIDTHS = [true, false, 'fit-content'] as const;

export type AutoCompleteTrigger = (typeof AUTO_COMPLETE_TRIGGERS)[number];
export type AutoCompleteDescriptionPosition = (typeof AUTO_COMPLETE_DESCRIPTION_POSITIONS)[number];
export type AutoCompleteFitInputWidth = (typeof AUTO_COMPLETE_FIT_INPUT_WIDTHS)[number];
export type AutoCompleteValue = string | null | undefined;
export type AutoCompleteOpenReason =
  | 'trigger'
  | 'focus'
  | 'keyboard'
  | 'escape'
  | 'outside-pointer'
  | 'select'
  | 'clear'
  | 'imperative'
  | 'options-change';

export interface AutoCompleteOption<Description = unknown> {
  /** 选项展示文字。 @en Visible option label. */
  label: string;
  /** 选中后写入的值，未设置时使用 label。 @en Value committed on selection; falls back to label. */
  value?: string;
  /** 辅助说明。 @en Supporting description. */
  description?: Description;
}

export interface AutoCompleteCommonProps<Description = unknown> {
  /** 受控输入值。 @en Controlled input value. */
  value?: AutoCompleteValue;
  /** 非受控初始值。 @en Initial uncontrolled value. */
  defaultValue?: string;
  /** 受控面板状态。 @en Controlled popup state. */
  open?: boolean;
  /** 非受控初始面板状态。 @en Initial uncontrolled popup state. */
  defaultOpen?: boolean;
  /** 是否禁用。 @en Whether interaction is disabled. */
  disabled?: boolean;
  /** 是否允许清空。 @en Whether the input can be cleared. */
  clearable?: boolean;
  /** 面板触发方式。 @en Popup trigger mode. */
  trigger?: AutoCompleteTrigger;
  /** 面板位置。 @en Popup placement. */
  placement?: PopoverPlacement;
  /** 是否通过 Portal 渲染面板。 @en Whether the popup renders through a portal. */
  portal?: boolean;
  /** 输入框视觉变体。 @en Input visual variant. */
  inputVariant?: InputVariant;
  /** 输入框尺寸。 @en Input size. */
  size?: ChoiceSize;
  /** 占位文字。 @en Placeholder text. */
  placeholder?: string;
  /** 隐藏后销毁面板。 @en Unmounts the popup after it closes. */
  destroyOnHide?: boolean;
  /** 面板宽度策略。 @en Popup width policy. */
  fitInputWidth?: AutoCompleteFitInputWidth;
  /** hover 打开延迟。 @en Hover open delay in milliseconds. */
  hoverShowDelay?: number;
  /** hover 关闭延迟。 @en Hover close delay in milliseconds. */
  hoverHideDelay?: number;
  /** 无选项时隐藏面板。 @en Prevents opening when there are no options. */
  hidePanelWhenEmptyList?: boolean;
  /** 加载状态。 @en Whether suggestions are loading. */
  loading?: boolean;
  /** 打开时将当前选项置顶。 @en Moves the selected suggestion to the front while open. */
  selectedOptionOrderToTop?: boolean;
  /** 选项列表最大高度。 @en Maximum suggestion-list height. */
  optionListMaxHeight?: string | number;
  /** 说明文字位置。 @en Description placement. */
  descriptionPosition?: AutoCompleteDescriptionPosition;
  /** 输入与搜索通知的防抖时间。 @en Debounce for value and search notifications. */
  inputEmitFrequency?: number;
  /** Tooltip 打开延迟。 @en Tooltip open delay. */
  tooltipShowAfter?: number;
  /** Tooltip 关闭延迟。 @en Tooltip close delay. */
  tooltipHideAfter?: number;
  /** 允许内容撑开列表。 @en Allows content to expand the suggestion list. */
  expandPanelByChildren?: boolean;
  /** 建议项。 @en Suggestion options. */
  options?: readonly AutoCompleteOption<Description>[];
}

export interface AutoCompleteOpenChangeDetails {
  reason: AutoCompleteOpenReason;
}

export interface AutoCompleteSelectDetails<Option = AutoCompleteOption> {
  option: Option;
  index: number;
}

export interface AutoCompleteEventMap<
  FocusEvent = unknown,
  KeyboardOrScrollEvent = unknown,
  Option = AutoCompleteOption,
> {
  /** 输入值变化。 @en Input value changed. */
  valueChange: [value: string];
  /** 面板状态变化。 @en Popup state changed. */
  openChange: [open: boolean, details: AutoCompleteOpenChangeDetails];
  /** 获得焦点。 @en Input focused. */
  focus: [event: FocusEvent];
  /** 失去焦点。 @en Input blurred. */
  blur: [event: FocusEvent];
  /** 搜索文字变化。 @en Search text changed. */
  search: [value: string];
  /** 导航或滚动到列表底部。 @en Navigation or scrolling reached the list end. */
  optionListReachBottom: [event: KeyboardOrScrollEvent];
  /** 输入被清空。 @en Input cleared. */
  clear: [];
  /** 选中值变化。 @en Selected value changed. */
  change: [value: string, details: AutoCompleteSelectDetails<Option>];
  /** 选中建议项。 @en Suggestion selected. */
  select: [value: string, details: AutoCompleteSelectDetails<Option>];
}

export interface AutoCompleteRegionMap<Option = AutoCompleteOption> {
  /** 空状态。 @en Empty state. */
  empty: EmptyComponentApi;
  /** 加载状态。 @en Loading state. */
  loading: EmptyComponentApi;
  /** 面板头部。 @en Popup header. */
  panelHeader: EmptyComponentApi;
  /** 面板底部。 @en Popup footer. */
  panelFooter: EmptyComponentApi;
  /** 选项内容。 @en Suggestion content. */
  option: { option: Option; index: number; active: boolean; selected: boolean };
  /** 输入框前缀。 @en Input prefix. */
  prefix: EmptyComponentApi;
  /** 输入框后缀。 @en Input suffix. */
  suffix: EmptyComponentApi;
}

export interface AutoCompleteCommandMap {
  /** 聚焦输入框。 @en Focuses the input. */
  focus: () => void;
  /** 使输入框失焦。 @en Blurs the input. */
  blur: () => void;
  /** 打开面板。 @en Opens the popup. */
  open: () => void;
  /** 关闭面板。 @en Closes the popup. */
  close: () => void;
  /** 清空输入值。 @en Clears the input value. */
  clear: () => void;
}

export const AUTO_COMPLETE_DEFAULTS = Object.freeze({
  defaultValue: '',
  defaultOpen: false,
  disabled: false,
  clearable: false,
  trigger: 'click',
  placement: 'bottom-start',
  portal: true,
  inputVariant: 'normal',
  destroyOnHide: false,
  fitInputWidth: true,
  hoverShowDelay: 200,
  hoverHideDelay: 0,
  hidePanelWhenEmptyList: true,
  loading: false,
  selectedOptionOrderToTop: false,
  optionListMaxHeight: 296,
  descriptionPosition: 'right',
  inputEmitFrequency: 200,
  tooltipShowAfter: 100,
  tooltipHideAfter: 200,
  expandPanelByChildren: false,
  options: Object.freeze([]),
} as const satisfies Partial<AutoCompleteCommonProps>);

export function isAutoCompleteTrigger(value: unknown): value is AutoCompleteTrigger {
  return AUTO_COMPLETE_TRIGGERS.includes(value as AutoCompleteTrigger);
}

export function isAutoCompleteDescriptionPosition(
  value: unknown,
): value is AutoCompleteDescriptionPosition {
  return AUTO_COMPLETE_DESCRIPTION_POSITIONS.includes(value as AutoCompleteDescriptionPosition);
}

export function isAutoCompleteFitInputWidth(value: unknown): value is AutoCompleteFitInputWidth {
  return AUTO_COMPLETE_FIT_INPUT_WIDTHS.includes(value as AutoCompleteFitInputWidth);
}

export function isAutoCompleteDelay(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export function isAutoCompleteListHeight(value: unknown): value is string | number {
  return (
    (typeof value === 'number' && Number.isFinite(value) && value >= 0) ||
    (typeof value === 'string' && value.trim().length > 0)
  );
}

export const autoCompleteApiContract = defineComponentApiContract<
  AutoCompleteCommonProps,
  AutoCompleteEventMap,
  AutoCompleteRegionMap,
  AutoCompleteCommandMap
>({
  defaults: AUTO_COMPLETE_DEFAULTS,
  validators: {
    trigger: isAutoCompleteTrigger,
    placement: isPopoverPlacement,
    inputVariant: isInputVariant,
    size: isChoiceSize,
    fitInputWidth: isAutoCompleteFitInputWidth,
    hoverShowDelay: isAutoCompleteDelay,
    hoverHideDelay: isAutoCompleteDelay,
    optionListMaxHeight: isAutoCompleteListHeight,
    descriptionPosition: isAutoCompleteDescriptionPosition,
    inputEmitFrequency: isAutoCompleteDelay,
    tooltipShowAfter: isAutoCompleteDelay,
    tooltipHideAfter: isAutoCompleteDelay,
  },
});
