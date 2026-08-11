import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { PopoverPlacement } from '../Popover';

export const POPCONFIRM_PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'left',
] as const satisfies readonly PopoverPlacement[];

export type PopconfirmPlacement = (typeof POPCONFIRM_PLACEMENTS)[number];
export type PopconfirmOpenReason =
  | 'trigger'
  | 'outside-pointer'
  | 'escape'
  | 'disabled'
  | 'confirm'
  | 'cancel'
  | 'imperative';

export type PopconfirmBeforeConfirm = () => boolean | PromiseLike<boolean>;

export interface PopconfirmCommonProps<ConfirmButtonProps = unknown, CancelButtonProps = unknown> {
  /** 确认提示标题。 @en Confirmation title. */
  title?: string;
  /** 受控打开状态。 @en Controlled open state. */
  open?: boolean;
  /** 非受控初始状态。 @en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 禁用确认浮层。 @en Disables the confirmation popover. */
  disabled?: boolean;
  /** 浮层位置。 @en Floating placement. */
  placement?: PopconfirmPlacement;
  /** 确认按钮文字。 @en Confirm button label. */
  confirmText?: string;
  /** 取消按钮文字。 @en Cancel button label. */
  cancelText?: string;
  /** 确认按钮参数。 @en Confirm button options. */
  confirmButtonProps?: ConfirmButtonProps;
  /** 取消按钮参数。 @en Cancel button options. */
  cancelButtonProps?: CancelButtonProps;
  /** 确认前守卫，返回 false 时保持打开。 @en Guard run before confirmation; false keeps the popover open. */
  beforeConfirm?: PopconfirmBeforeConfirm;
}

export interface PopconfirmChangeDetails {
  /** 状态变化原因。 @en Reason for the state change. */
  reason: PopconfirmOpenReason;
}

export interface PopconfirmEventMap<Event = unknown> {
  /** 打开状态变化。 @en Open state changed. */
  openChange: [open: boolean, details: PopconfirmChangeDetails];
  /** 确认操作完成。 @en Confirmation completed. */
  confirm: [event: Event];
  /** 取消操作。 @en Confirmation cancelled. */
  cancel: [event: Event];
}

export interface PopconfirmRegionMap {
  /** 唯一触发元素。 @en The single trigger element. */
  trigger: EmptyComponentApi;
  /** 确认内容。 @en Confirmation content. */
  content: EmptyComponentApi;
  /** 状态图标。 @en Status icon. */
  icon: EmptyComponentApi;
}

export interface PopconfirmCommandMap {
  /** 打开确认浮层。 @en Opens the confirmation popover. */
  open: () => void;
  /** 关闭确认浮层。 @en Closes the confirmation popover. */
  close: () => void;
}

export interface PopconfirmState {
  /** 当前打开状态。 @en Current open state. */
  open: boolean;
  /** 当前禁用状态。 @en Current disabled state. */
  disabled: boolean;
  /** 确认守卫正在执行。 @en Whether the confirmation guard is running. */
  pending: boolean;
}

export interface PopconfirmOpenAction {
  /** 目标打开状态。 @en Requested open state. */
  open: boolean;
  /** 状态变化原因。 @en Reason for the state change. */
  reason: PopconfirmOpenReason;
}

export interface PopconfirmStateResult {
  /** 变更后的状态。 @en State after applying the action. */
  state: PopconfirmState;
  /** 打开状态是否发生变化。 @en Whether the open state changed. */
  changed: boolean;
  /** 实际状态变化原因。 @en Effective state-change reason. */
  reason: PopconfirmOpenReason;
}

export const POPCONFIRM_DEFAULTS = Object.freeze({
  defaultOpen: false,
  disabled: false,
  placement: 'top',
  confirmButtonProps: Object.freeze({}),
  cancelButtonProps: Object.freeze({}),
} as const satisfies Partial<PopconfirmCommonProps>);

/** 判断浮层位置是否受 Popconfirm 支持。 @en Tests whether a placement is supported by Popconfirm. */
export function isPopconfirmPlacement(value: unknown): value is PopconfirmPlacement {
  return POPCONFIRM_PLACEMENTS.includes(value as PopconfirmPlacement);
}

/**
 * 解析一次打开状态变更并应用禁用约束。
 * @en Resolves an open-state action while enforcing the disabled constraint.
 * @param state 当前状态。
 * @paramEn state Current state.
 * @param action 目标状态与原因。
 * @paramEn action Requested state and reason.
 */
export function resolvePopconfirmOpenState(
  state: PopconfirmState,
  action: PopconfirmOpenAction,
): PopconfirmStateResult {
  const open = state.disabled && action.open ? false : action.open;
  return {
    state: { ...state, open },
    changed: open !== state.open,
    reason: state.disabled && action.open ? 'disabled' : action.reason,
  };
}

export const popconfirmApiContract = defineComponentApiContract<
  PopconfirmCommonProps,
  PopconfirmEventMap,
  PopconfirmRegionMap,
  PopconfirmCommandMap
>({
  defaults: POPCONFIRM_DEFAULTS,
  validators: { placement: isPopconfirmPlacement },
});
