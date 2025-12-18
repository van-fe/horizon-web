import { isBoolean } from '@aurora/utils';

export const useDialogEmits = {
  /**
   *  更新 `modelValue`
   * @deprecated 使用 `update:visible` 替代
   */
  'update:modelValue': (value: false) => isBoolean(value),
  'update:visible': (value: false) => isBoolean(value),

  /**
   * 点击主要按钮时的回调
   * @deprecated 使用 `ok` 替代
   */
  primaryClick: () => true,
  /**
   * 点击次要按钮时的回调
   * @deprecated 使用 `cancel` 替代
   */
  secondaryClick: () => true,

  /**
   * 点击主要按钮回调
   * @version 2.12.0
   */
  ok: () => true,

  /**
   * 点击次要按钮回调
   * @version 2.12.0
   */
  cancel: () => true,

  /**
   * 打开对话框时的回调
   */
  open: () => true,
  /**
   * 对话框完全打开时的回调
   */
  opened: () => true,
  /**
   * 关闭对话框时的回调
   */
  close: () => true,
  /**
   * 对话框完全关闭时的回调
   */
  closed: () => true,
  /**
   * 关闭 `icon` 点击的通知，仅当 `closeButton` 为 `true` 时有效
   * @version 1.5.7
   */
  closeIconClick: () => true,
  /**
   * 蒙层点击的通知，仅当 `maskClosable` 为 `true` 时有效
   * @version 1.5.7
   */
  maskClick: () => true,
  /**
   * 确认按钮防抖函数执行完毕后的回调
   * @version 2.2.7
   */
  confirmDebounceFinished: () => true,
  /**
   * 取消按钮防抖函数执行完毕后的回调
   * @version 2.2.7
   */
  cancelDebounceFinished: () => true,
};

export type DialogEmits = typeof useDialogEmits;
