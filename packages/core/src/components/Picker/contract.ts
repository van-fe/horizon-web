import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { ChoiceSize } from '../_shared/choice';
import { isChoiceSize } from '../_shared/choice';
import type { PopoverPlacement } from '../Popover';
import { isPopoverPlacement } from '../Popover';

export const PICKER_TRIGGERS = ['hover', 'click', 'never'] as const;
export const PICKER_INPUT_VARIANTS = ['normal', 'emphasize', 'no-border'] as const;
export const PICKER_INPUT_STATUSES = ['normal', 'error', 'warning', 'success'] as const;
export const PICKER_PANEL_STATUSES = ['normal', 'empty', 'loading'] as const;
export const PICKER_STATUSES = ['panel-hide', 'panel-visible', 'loading', 'empty'] as const;
export const PICKER_CONFIRM_AREA_SIZES = ['medium', 'small'] as const;
export const PICKER_FIT_INPUT_WIDTHS = [true, false, 'fit-content'] as const;

export type PickerTrigger = (typeof PICKER_TRIGGERS)[number];
export type PickerInputVariant = (typeof PICKER_INPUT_VARIANTS)[number];
export type PickerInputStatus = (typeof PICKER_INPUT_STATUSES)[number];
export type PickerPanelStatus = (typeof PICKER_PANEL_STATUSES)[number];
export type PickerStatus = (typeof PICKER_STATUSES)[number];
export type PickerConfirmAreaSize = (typeof PICKER_CONFIRM_AREA_SIZES)[number];
export type PickerFitInputWidth = (typeof PICKER_FIT_INPUT_WIDTHS)[number];
export type PickerValue =
  | string
  | number
  | boolean
  | object
  | null
  | undefined
  | readonly (string | number | boolean | object)[];

export type PickerOpenReason =
  | 'trigger'
  | 'focus'
  | 'hover'
  | 'escape'
  | 'outside-pointer'
  | 'confirm'
  | 'cancel'
  | 'disabled'
  | 'availability-change'
  | 'imperative'
  | 'content-only';

export interface PickerOpenChangeDetails {
  reason: PickerOpenReason;
}

export interface PickerCommonProps<Value = PickerValue, ButtonOptions = unknown> {
  /** 受控展示值。 @en Controlled display value. */
  value?: Value;
  /** 非受控初始展示值。 @en Initial uncontrolled display value. */
  defaultValue?: Value;
  /** 受控面板状态。 @en Controlled popup state. */
  open?: boolean;
  /** 非受控初始面板状态。 @en Initial uncontrolled popup state. */
  defaultOpen?: boolean;
  /** 是否禁用。 @en Whether interaction is disabled. */
  disabled?: boolean;
  /** 是否正在加载。 @en Whether content is loading. */
  loading?: boolean;
  /** 是否允许清空。 @en Whether the value can be cleared. */
  clearable?: boolean;
  /** 面板触发方式。 @en Popup trigger mode. */
  trigger?: PickerTrigger;
  /** 面板位置。 @en Popup placement. */
  placement?: PopoverPlacement;
  /** 主轴间距。 @en Main-axis popup distance. */
  distance?: number;
  /** 交叉轴偏移。 @en Cross-axis popup offset. */
  skidding?: number;
  /** 是否通过 Portal 渲染。 @en Whether the popup renders through a portal. */
  portal?: boolean;
  /** 输入框是否可编辑。 @en Whether the trigger input is editable. */
  inputable?: boolean;
  /** 是否只读。 @en Whether the trigger is read-only. */
  readonly?: boolean;
  /** 输入框视觉变体。 @en Input visual variant. */
  inputVariant?: PickerInputVariant;
  /** 输入框尺寸。 @en Input size. */
  size?: ChoiceSize;
  /** 占位文字。 @en Placeholder text. */
  placeholder?: string;
  /** 是否展示箭头。 @en Whether the popup arrow is shown. */
  arrow?: boolean;
  /** 是否需要确认操作区。 @en Whether a confirmation area is shown. */
  needConfirm?: boolean;
  /** 确认按钮文字。 @en Confirm button text. */
  confirmText?: string;
  /** 取消按钮文字。 @en Cancel button text. */
  cancelText?: string;
  /** 清空操作文字。 @en Clear action text. */
  clearText?: string;
  /** 确认按钮参数。 @en Confirm button options. */
  confirmButtonOptions?: ButtonOptions;
  /** 取消按钮参数。 @en Cancel button options. */
  cancelButtonOptions?: ButtonOptions;
  /** 是否禁用确认。 @en Whether confirmation is disabled. */
  confirmDisabled?: boolean;
  /** 是否禁用取消。 @en Whether cancellation is disabled. */
  cancelDisabled?: boolean;
  /** 确认区是否展示确认按钮。 @en Whether the confirmation action is shown. */
  showConfirmAction?: boolean;
  /** 确认区是否展示取消按钮。 @en Whether the cancellation action is shown. */
  showCancelAction?: boolean;
  /** 确认区是否展示清空操作。 @en Whether the clear action is shown. */
  showClearAction?: boolean;
  /** 确认区尺寸。 @en Confirmation-area size. */
  confirmAreaSize?: PickerConfirmAreaSize;
  /** 隐藏后销毁面板。 @en Unmounts the popup after it closes. */
  destroyOnHide?: boolean;
  /** 输入框状态。 @en Input validation status. */
  inputStatus?: PickerInputStatus;
  /** 面板状态。 @en Popup content status. */
  panelStatus?: PickerPanelStatus;
  /** 面板宽度策略。 @en Popup width policy. */
  fitInputWidth?: PickerFitInputWidth;
  /** hover 打开延迟。 @en Hover open delay in milliseconds. */
  hoverShowDelay?: number;
  /** hover 关闭延迟。 @en Hover close delay in milliseconds. */
  hoverHideDelay?: number;
  /** 是否允许显示面板。 @en Whether the popup is allowed to open. */
  canOpen?: boolean;
}

export interface PickerEventMap<Value = PickerValue, Event = unknown> {
  /** 展示值变化。 @en Display value changed. */
  valueChange: [value: Value];
  /** 面板状态变化。 @en Popup state changed. */
  openChange: [open: boolean, details: PickerOpenChangeDetails];
  /** 面板已显示。 @en Popup shown. */
  show: [];
  /** 面板已隐藏。 @en Popup hidden. */
  hide: [];
  /** 触发器获得焦点。 @en Trigger focused. */
  focus: [event?: Event];
  /** 触发器失去焦点。 @en Trigger blurred. */
  blur: [event?: Event];
  /** 输入内容变化。 @en Editable input changed. */
  input: [event: Event];
  /** 点击触发器。 @en Trigger clicked. */
  click: [event: Event];
  /** 确认当前选择。 @en Current selection confirmed. */
  confirm: [event?: Event];
  /** 取消当前选择。 @en Current selection cancelled. */
  cancel: [event?: Event];
  /** 清空当前选择。 @en Current selection cleared. */
  clear: [event?: Event];
  /** 键盘操作。 @en Keyboard interaction. */
  keyDown: [event: Event];
}

export interface PickerRegionMap<Value = PickerValue, Event = unknown> {
  /** 面板主体。 @en Popup body. */
  content: { value: Value; status: PickerStatus };
  /** 完整触发器。 @en Complete trigger surface. */
  trigger: { value: Value; inputStatus: PickerInputStatus; status: PickerStatus };
  /** 触发器前缀。 @en Trigger prefix. */
  prefix: { value: Value; inputStatus: PickerInputStatus; status: PickerStatus };
  /** 触发器后缀。 @en Trigger suffix. */
  suffix: { value: Value; inputStatus: PickerInputStatus; status: PickerStatus };
  /** 面板头部。 @en Popup header. */
  panelHeader: { value: Value; status: PickerStatus };
  /** 面板底部。 @en Popup footer. */
  panelFooter: { value: Value; status: PickerStatus };
  /** 空状态。 @en Empty state. */
  empty: EmptyComponentApi;
  /** 加载状态。 @en Loading state. */
  loading: EmptyComponentApi;
  /** 确认操作区。 @en Confirmation actions. */
  actions: { confirm: (event?: Event) => void; cancel: (event?: Event) => void };
}

export interface PickerCommandMap {
  /** 聚焦触发器。 @en Focuses the trigger. */
  focus: () => void;
  /** 使触发器失焦。 @en Blurs the trigger. */
  blur: () => void;
  /** 打开面板。 @en Opens the popup. */
  open: () => void;
  /** 关闭面板。 @en Closes the popup. */
  close: () => void;
  /** 清空当前值。 @en Clears the current value. */
  clear: () => void;
  /** 更新浮层位置。 @en Updates popup position. */
  updatePosition: () => void | Promise<void>;
}

export const PICKER_DEFAULTS = Object.freeze({
  defaultOpen: false,
  disabled: false,
  loading: false,
  clearable: false,
  trigger: 'click',
  placement: 'bottom-start',
  distance: 4,
  portal: true,
  inputable: false,
  readonly: false,
  inputVariant: 'normal',
  arrow: false,
  needConfirm: false,
  confirmDisabled: false,
  cancelDisabled: false,
  showConfirmAction: true,
  showCancelAction: true,
  showClearAction: false,
  confirmAreaSize: 'medium',
  destroyOnHide: false,
  inputStatus: 'normal',
  panelStatus: 'normal',
  fitInputWidth: true,
  hoverShowDelay: 0,
  hoverHideDelay: 200,
  canOpen: true,
} as const satisfies Partial<PickerCommonProps>);

export function isPickerTrigger(value: unknown): value is PickerTrigger {
  return PICKER_TRIGGERS.includes(value as PickerTrigger);
}

export function isPickerInputVariant(value: unknown): value is PickerInputVariant {
  return PICKER_INPUT_VARIANTS.includes(value as PickerInputVariant);
}

export function isPickerInputStatus(value: unknown): value is PickerInputStatus {
  return PICKER_INPUT_STATUSES.includes(value as PickerInputStatus);
}

export function isPickerPanelStatus(value: unknown): value is PickerPanelStatus {
  return PICKER_PANEL_STATUSES.includes(value as PickerPanelStatus);
}

export function isPickerConfirmAreaSize(value: unknown): value is PickerConfirmAreaSize {
  return PICKER_CONFIRM_AREA_SIZES.includes(value as PickerConfirmAreaSize);
}

export function isPickerFitInputWidth(value: unknown): value is PickerFitInputWidth {
  return PICKER_FIT_INPUT_WIDTHS.includes(value as PickerFitInputWidth);
}

export function isPickerDelay(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export function isPickerDimension(value: unknown): value is string | number {
  return (
    (typeof value === 'number' && Number.isFinite(value) && value >= 0) ||
    (typeof value === 'string' && value.trim().length > 0)
  );
}

export const pickerApiContract = defineComponentApiContract<
  PickerCommonProps,
  PickerEventMap,
  PickerRegionMap,
  PickerCommandMap
>({
  defaults: PICKER_DEFAULTS,
  validators: {
    trigger: isPickerTrigger,
    placement: isPopoverPlacement,
    inputVariant: isPickerInputVariant,
    size: isChoiceSize,
    inputStatus: isPickerInputStatus,
    panelStatus: isPickerPanelStatus,
    confirmAreaSize: isPickerConfirmAreaSize,
    fitInputWidth: isPickerFitInputWidth,
    hoverShowDelay: isPickerDelay,
    hoverHideDelay: isPickerDelay,
  },
});
