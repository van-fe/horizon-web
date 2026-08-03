import { isBoolean } from '@aurora/utils';

export const useDialogEmits = {
  'update:visible': (value: false) => isBoolean(value),

  /**
   * 点击主要按钮回调
   * @en Emitted when ok changes.
   */
  ok: () => true,

  /**
   * 点击次要按钮回调
   * @en Emitted when cancel changes.
   */
  cancel: () => true,

  /**
   * 打开对话框时的回调
   * @en Emitted when open changes.
   */
  open: () => true,
  /**
   * 对话框完全打开时的回调
   * @en Emitted when opened changes.
   */
  opened: () => true,
  /**
   * 关闭对话框时的回调
   * @en Emitted when close changes.
   */
  close: () => true,
  /**
   * 对话框完全关闭时的回调
   * @en Emitted when closed changes.
   */
  closed: () => true,
  /**
   * 关闭 `icon` 点击的通知，仅当 `closeButton` 为 `true` 时有效
   * @en Emitted when close icon click changes.
   */
  closeIconClick: () => true,
  /**
   * 蒙层点击的通知，仅当 `maskClosable` 为 `true` 时有效
   * @en Emitted when mask click changes.
   */
  maskClick: () => true,
  /**
   * 确认按钮防抖函数执行完毕后的回调
   * @en Emitted when confirm debounce finished changes.
   */
  confirmDebounceFinished: () => true,
  /**
   * 取消按钮防抖函数执行完毕后的回调
   * @en Emitted when cancel debounce finished changes.
   */
  cancelDebounceFinished: () => true,
};

export type DialogEmits = typeof useDialogEmits;
