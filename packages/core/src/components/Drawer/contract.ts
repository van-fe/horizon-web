import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { DialogButtonOptions, DialogOpenChangeDetails, DialogOpenReason } from '../Dialog';
import { isDialogButtonOptions } from '../Dialog';

export const DRAWER_PLACEMENTS = ['left', 'right', 'top', 'bottom'] as const;
export const DRAWER_PRESET_SIZES = ['small', 'medium', 'large'] as const;

export type DrawerPlacement = (typeof DRAWER_PLACEMENTS)[number];
export type DrawerPresetSize = (typeof DRAWER_PRESET_SIZES)[number];
export type DrawerSize = DrawerPresetSize | string | number;
export type DrawerOpenReason = DialogOpenReason;
export type DrawerOpenChangeDetails = DialogOpenChangeDetails;
export type DrawerBeforeClose = () => void | boolean | PromiseLike<boolean | void>;

export interface DrawerPresetLayout {
  cell: number;
  gutter: number;
  columns: number;
  margin: number;
}

export const DRAWER_PRESET_LAYOUTS = Object.freeze({
  small: { cell: 6, gutter: 16, columns: 24, margin: 24 },
  medium: { cell: 8, gutter: 24, columns: 24, margin: 24 },
  large: { cell: 12, gutter: 24, columns: 24, margin: 24 },
} as const satisfies Record<DrawerPresetSize, DrawerPresetLayout>);

export interface DrawerCommonProps<
  OkButtonProps = Readonly<Record<string, unknown>>,
  CancelButtonProps = Readonly<Record<string, unknown>>,
> {
  /** 受控打开状态。 @en Controlled open state. */
  open?: boolean;
  /** 非受控初始状态。 @en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 抽屉展开方向。 @en Side from which the drawer opens. */
  placement?: DrawerPlacement;
  /** 抽屉标题。 @en Drawer title. */
  title?: string;
  /** 抽屉尺寸或自定义长度。 @en Drawer preset or custom extent. */
  size?: DrawerSize;
  /** 展示背景遮罩。 @en Shows the background mask. */
  mask?: boolean;
  /** 点击遮罩时请求关闭。 @en Requests closing after a mask press. */
  maskClosable?: boolean;
  /** 按下 Escape 时请求关闭。 @en Requests closing after Escape. */
  escClosable?: boolean;
  /** 展示标题栏关闭按钮。 @en Shows the header close button. */
  closable?: boolean;
  /** 展示底部操作区。 @en Shows the footer region. */
  footer?: boolean;
  /** 展示头部区域。 @en Shows the header region. */
  header?: boolean;
  /** 展示确认按钮或设置按钮参数。 @en Shows the confirm button or configures its options. */
  okButton?: DialogButtonOptions<OkButtonProps>;
  /** 确认按钮文字。 @en Confirm button label. */
  okButtonText?: string;
  /** 展示取消按钮或设置按钮参数。 @en Shows the cancel button or configures its options. */
  cancelButton?: DialogButtonOptions<CancelButtonProps>;
  /** 取消按钮文字。 @en Cancel button label. */
  cancelButtonText?: string;
  /** 返回 false 或拒绝时阻止关闭。 @en Prevents closing by returning false or rejecting. */
  beforeClose?: DrawerBeforeClose;
  /** 是否锁定背景滚动；未指定时跟随 mask。 @en Whether to lock background scrolling; follows mask when omitted. */
  lockScroll?: boolean;
  /** 允许拖拽调整抽屉尺寸。 @en Allows pointer resizing of the drawer. */
  sizeDraggable?: boolean;
  /** 展示确认操作加载状态。 @en Shows a loading state on the confirm action. */
  loading?: boolean;
  /** 关闭后销毁内容。 @en Unmounts content after closing. */
  destroyOnClose?: boolean;
}

export interface DrawerEventMap {
  /** 打开状态变化。 @en Open state changed. */
  openChange: [open: boolean, details: DrawerOpenChangeDetails];
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
  /** 点击背景遮罩。 @en Background mask clicked. */
  maskClick: [];
  /** 点击标题栏关闭按钮。 @en Header close button clicked. */
  iconClick: [];
}

export interface DrawerRegionMap {
  /** 抽屉正文。 @en Drawer body. */
  content: EmptyComponentApi;
  /** 默认头部中的标题。 @en Title within the default header. */
  title: EmptyComponentApi;
  /** 完整头部内容。 @en Complete header content. */
  header: EmptyComponentApi;
  /** 底部操作区。 @en Footer actions. */
  footer: EmptyComponentApi;
}

export interface DrawerCommandMap {
  /** 打开抽屉。 @en Opens the drawer. */
  open: () => void;
  /** 请求关闭抽屉。 @en Requests closing the drawer. */
  close: () => void;
}

export const DRAWER_DEFAULTS = Object.freeze({
  defaultOpen: false,
  placement: 'right',
  size: 'medium',
  mask: true,
  maskClosable: true,
  escClosable: true,
  closable: true,
  footer: true,
  header: true,
  okButton: true,
  cancelButton: true,
  sizeDraggable: false,
  loading: false,
  destroyOnClose: true,
} as const satisfies Partial<DrawerCommonProps>);

/** 判断展开方向是否有效。 @en Tests whether a drawer placement is valid. */
export function isDrawerPlacement(value: unknown): value is DrawerPlacement {
  return DRAWER_PLACEMENTS.includes(value as DrawerPlacement);
}

/** 判断预设或自定义尺寸是否有效。 @en Tests whether a preset or custom drawer size is valid. */
export function isDrawerSize(value: unknown): value is DrawerSize {
  return typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
}

/** 判断抽屉是否沿水平方向调整宽度。 @en Tests whether a drawer resizes along the horizontal axis. */
export function isHorizontalDrawerPlacement(placement: DrawerPlacement): boolean {
  return placement === 'left' || placement === 'right';
}

/** 判断抽屉是否沿垂直方向调整高度。 @en Tests whether a drawer resizes along the vertical axis. */
export function isVerticalDrawerPlacement(placement: DrawerPlacement): boolean {
  return placement === 'top' || placement === 'bottom';
}

/**
 * 解析背景滚动锁定策略。
 * @en Resolves background scroll-lock behavior.
 * @param lockScroll 显式滚动锁定设置。
 * @paramEn lockScroll Explicit scroll-lock setting.
 * @param mask 是否展示背景遮罩。
 * @paramEn mask Whether the background mask is shown.
 */
export function resolveDrawerLockScroll(lockScroll: boolean | undefined, mask: boolean): boolean {
  return lockScroll ?? mask;
}

/**
 * 按既有 1280/1440/1920 网格解析预设抽屉尺寸。
 * @en Resolves a preset drawer extent using the established 1280/1440/1920 grids.
 * @param size 预设尺寸。
 * @paramEn size Preset size.
 * @param viewportWidth 当前视口宽度。
 * @paramEn viewportWidth Current viewport width.
 */
export function resolveDrawerPresetExtent(size: DrawerPresetSize, viewportWidth: number): number {
  const gridWidth = viewportWidth <= 1280 ? 1280 : viewportWidth <= 1440 ? 1440 : 1920;
  const { cell, gutter, columns, margin } = DRAWER_PRESET_LAYOUTS[size];
  const unit = (gridWidth - margin * 2 - gutter * (columns - 1)) / columns;
  return unit * cell + gutter * (cell - 1) + margin;
}

/**
 * 根据拖拽方向计算新的抽屉像素尺寸。
 * @en Computes a new drawer pixel extent from its resize direction.
 * @param size 拖拽开始时的尺寸。
 * @paramEn size Extent at drag start.
 * @param start 拖拽开始坐标。
 * @paramEn start Pointer coordinate at drag start.
 * @param current 当前拖拽坐标。
 * @paramEn current Current pointer coordinate.
 * @param placement 抽屉展开方向。
 * @paramEn placement Drawer placement.
 * @param minimum 最小尺寸。
 * @paramEn minimum Minimum extent.
 */
export function resizeDrawerExtent(
  size: number,
  start: number,
  current: number,
  placement: DrawerPlacement,
  minimum = 8,
): number {
  const delta = current - start;
  const growsWithPointer = placement === 'left' || placement === 'top';
  return Math.max(minimum, size + (growsWithPointer ? delta : -delta));
}

export const drawerApiContract = defineComponentApiContract<
  DrawerCommonProps,
  DrawerEventMap,
  DrawerRegionMap,
  DrawerCommandMap
>({
  defaults: DRAWER_DEFAULTS,
  validators: {
    placement: isDrawerPlacement,
    size: isDrawerSize,
    okButton: isDialogButtonOptions,
    cancelButton: isDialogButtonOptions,
  },
});
