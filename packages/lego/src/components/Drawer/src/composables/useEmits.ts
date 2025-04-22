import { isBoolean } from '@nio-fe/shared';

export const useDrawerEmits = {
  /**
   * 更新 `modelValue`
   * @deprecated `update:visible`
   **/
  'update:modelValue': (value: false) => isBoolean(value),

  /**
   * 更新 visible
   * @version 2.0.4
   **/
  'update:visible': (value: false) => isBoolean(value),

  /**
   * 点击主要按钮时的回调
   * @deprecated `onOk`
   **/
  primaryClick: () => true,
  /**
   * 点击次要按钮时的回调
   * @deprecated `onCancel`
   **/
  secondaryClick: () => true,

  /**
   * 点击确定按钮时触发
   * @version 2.0.4
   **/
  ok: () => true,

  /**
   * 点击取消、关闭按钮时触发
   * @version 2.0.4
   **/
  cancel: () => true,

  /**
   * 打开抽屉前的回调
   */
  open: () => true,

  /**
   * 抽屉动画完成后的回调
   */
  opened: () => true,

  /**
   * 关闭抽屉前的回调
   */
  close: () => true,

  /**
   * 抽屉动画完全完成后回调
   */
  closed: () => true,

  /**
   * 点击遮罩层时的回调
   * @version 2.8.2
   */
  maskClick: () => true,

  /**
   * 点击抽屉头部的关闭按钮时的回调
   * @version 2.8.2
   */
  iconClick: () => true,
};

export type DrawerEmits = typeof useDrawerEmits;
