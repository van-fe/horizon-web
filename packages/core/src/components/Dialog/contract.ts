import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const DIALOG_SIZES = ['small', 'medium', 'large', 'huge'] as const;

export type DialogSize = (typeof DIALOG_SIZES)[number];
export type DialogOffset = string | number;
export type DialogIconColor = string | readonly string[];
export type DialogButtonOptions<ButtonProps = Readonly<Record<string, unknown>>> =
  | boolean
  | ButtonProps;
export type DialogClose = () => void;
export type DialogBeforeClose = (close: DialogClose) => void;
export type DialogOpenReason =
  | 'controlled'
  | 'imperative'
  | 'mask'
  | 'escape'
  | 'close-button'
  | 'cancel';

export interface DialogCommonProps<
  OkButtonProps = Readonly<Record<string, unknown>>,
  CancelButtonProps = Readonly<Record<string, unknown>>,
> {
  /** 受控打开状态。 @en Controlled open state. */
  open?: boolean;
  /** 非受控初始状态。 @en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 对话框标题。 @en Dialog title. */
  title?: string;
  /** 距容器顶部的偏移。 @en Offset from the top of its container. */
  top?: DialogOffset;
  /** 状态图标名称。 @en Status icon name. */
  iconName?: string;
  /** 状态图标颜色。 @en Status icon color. */
  iconColor?: DialogIconColor;
  /** 对话框尺寸。 @en Dialog size. */
  size?: DialogSize;
  /** 展示背景遮罩。 @en Shows the background mask. */
  mask?: boolean;
  /** 点击遮罩时请求关闭。 @en Requests closing after a mask press. */
  maskClose?: boolean;
  /** 按下 Escape 时请求关闭。 @en Requests closing after Escape. */
  escClose?: boolean;
  /** 展示标题栏关闭按钮。 @en Shows the header close button. */
  closeButton?: boolean;
  /** 展示确认按钮或设置按钮参数。 @en Shows the confirm button or configures its options. */
  okButtonProps?: DialogButtonOptions<OkButtonProps>;
  /** 确认按钮文字。 @en Confirm button label. */
  okText?: string;
  /** 展示取消按钮或设置按钮参数。 @en Shows the cancel button or configures its options. */
  cancelButtonProps?: DialogButtonOptions<CancelButtonProps>;
  /** 取消按钮文字。 @en Cancel button label. */
  cancelText?: string;
  /** 关闭守卫；只有调用传入的 close 才会完成关闭。 @en Close guard; closing completes only after invoking the supplied close function. */
  beforeClose?: DialogBeforeClose;
  /** 关闭后销毁内容。 @en Unmounts content after closing. */
  destroyOnClose?: boolean;
  /** 浮层层级。 @en Floating z-index. */
  zIndex?: number;
  /** 打开时锁定背景滚动。 @en Locks background scrolling while open. */
  lockScroll?: boolean;
  /** 允许拖拽对话框。 @en Allows dragging the dialog. */
  draggable?: boolean;
}

export interface DialogOpenChangeDetails {
  /** 打开状态变化原因。 @en Reason for the open-state change. */
  reason: DialogOpenReason;
}

export interface DialogEventMap {
  /** 打开状态变化。 @en Open state changed. */
  openChange: [open: boolean, details: DialogOpenChangeDetails];
  /** 确认操作。 @en Confirm action. */
  ok: [];
  /** 取消操作。 @en Cancel action. */
  cancel: [];
  /** 开始打开。 @en Opening started. */
  open: [];
  /** 完全打开。 @en Opening completed. */
  opened: [];
  /** 开始关闭。 @en Closing started. */
  close: [];
  /** 完全关闭。 @en Closing completed. */
  closed: [];
  /** 点击标题栏关闭按钮。 @en Header close button clicked. */
  closeIconClick: [];
  /** 点击背景遮罩。 @en Background mask clicked. */
  maskClick: [];
  /** 确认按钮防抖结束。 @en Confirm button debounce completed. */
  confirmDebounceFinished: [];
  /** 取消按钮防抖结束。 @en Cancel button debounce completed. */
  cancelDebounceFinished: [];
}

export interface DialogRegionMap {
  /** 对话框正文。 @en Dialog body. */
  content: EmptyComponentApi;
  /** 标题内容。 @en Header title content. */
  title: EmptyComponentApi;
  /** 底部操作区。 @en Footer actions. */
  footer: EmptyComponentApi;
}

export interface DialogCommandMap {
  /** 打开对话框。 @en Opens the dialog. */
  open: () => void;
  /** 请求关闭对话框。 @en Requests closing the dialog. */
  close: () => void;
}

export interface DialogState {
  /** 当前打开状态。 @en Current open state. */
  open: boolean;
  /** 关闭守卫正在等待授权。 @en Whether a close guard is awaiting authorization. */
  closePending: boolean;
}

export interface DialogOpenAction {
  /** 目标打开状态。 @en Requested open state. */
  open: boolean;
  /** 状态变化原因。 @en Reason for the state change. */
  reason: DialogOpenReason;
}

export interface DialogStateResult {
  /** 变更后的状态。 @en State after applying the action. */
  state: DialogState;
  /** 打开状态是否变化。 @en Whether the open state changed. */
  changed: boolean;
  /** 状态变化原因。 @en Reason for the state change. */
  reason: DialogOpenReason;
}

export const DIALOG_DEFAULTS = Object.freeze({
  defaultOpen: false,
  size: 'medium',
  mask: true,
  maskClose: true,
  escClose: true,
  closeButton: true,
  okButtonProps: Object.freeze({}),
  cancelButtonProps: Object.freeze({}),
  destroyOnClose: false,
  lockScroll: true,
  draggable: false,
} as const satisfies Partial<DialogCommonProps>);

/** 判断尺寸是否受 Dialog 支持。 @en Tests whether a size is supported by Dialog. */
export function isDialogSize(value: unknown): value is DialogSize {
  return DIALOG_SIZES.includes(value as DialogSize);
}

/** 判断顶部偏移是否有效。 @en Tests whether a top offset is valid. */
export function isDialogOffset(value: unknown): value is DialogOffset {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

/** 判断图标颜色配置是否有效。 @en Tests whether an icon color configuration is valid. */
export function isDialogIconColor(value: unknown): value is DialogIconColor {
  return (
    typeof value === 'string' ||
    (Array.isArray(value) && value.every(item => typeof item === 'string'))
  );
}

/** 判断按钮开关或参数对象是否有效。 @en Tests whether button visibility or options are valid. */
export function isDialogButtonOptions(value: unknown): value is DialogButtonOptions {
  return (
    typeof value === 'boolean' ||
    (typeof value === 'object' && value !== null && !Array.isArray(value))
  );
}

/** 判断层级是否为有限数字。 @en Tests whether a z-index is finite. */
export function isDialogZIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * 解析一次对话框打开状态变更。
 * @en Resolves a dialog open-state change.
 * @param state 当前状态。
 * @paramEn state Current state.
 * @param action 目标状态与原因。
 * @paramEn action Requested state and reason.
 */
export function resolveDialogOpenState(
  state: DialogState,
  action: DialogOpenAction,
): DialogStateResult {
  return {
    state: { open: action.open, closePending: false },
    changed: action.open !== state.open,
    reason: action.reason,
  };
}

export const dialogApiContract = defineComponentApiContract<
  DialogCommonProps,
  DialogEventMap,
  DialogRegionMap,
  DialogCommandMap
>({
  defaults: DIALOG_DEFAULTS,
  validators: {
    top: isDialogOffset,
    iconColor: isDialogIconColor,
    size: isDialogSize,
    okButtonProps: isDialogButtonOptions,
    cancelButtonProps: isDialogButtonOptions,
    zIndex: isDialogZIndex,
  },
});
