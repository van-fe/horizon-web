import { isBoolean } from '@aurora/utils';

export const useDrawerEmits = {
  /**
   * 更新 `modelValue`
   * @deprecated `update:visible`
    * @en Emitted when update:model value changes.
   **/
  'update:modelValue': (value: false) => isBoolean(value),

  /**
   * 更新 visible
    * @en Emitted when update:visible changes.
   **/
  'update:visible': (value: false) => isBoolean(value),

  /**
   * 点击主要按钮时的回调
   * @deprecated `onOk`
    * @en Emitted when primary click changes.
   **/
  primaryClick: () => true,
  /**
   * 点击次要按钮时的回调
   * @deprecated `onCancel`
    * @en Emitted when secondary click changes.
   **/
  secondaryClick: () => true,

  /**
   * 点击确定按钮时触发
    * @en Emitted when ok changes.
   **/
  ok: () => true,

  /**
   * 点击取消、关闭按钮时触发
    * @en Emitted when cancel changes.
   **/
  cancel: () => true,

  /**
   * 打开抽屉前的回调
    * @en Emitted when open changes.
   */
  open: () => true,

  /**
   * 抽屉动画完成后的回调
    * @en Emitted when opened changes.
   */
  opened: () => true,

  /**
   * 关闭抽屉前的回调
    * @en Emitted when close changes.
   */
  close: () => true,

  /**
   * 抽屉动画完全完成后回调
    * @en Emitted when closed changes.
   */
  closed: () => true,

  /**
   * 点击遮罩层时的回调
    * @en Emitted when mask click changes.
   */
  maskClick: () => true,

  /**
   * 点击抽屉头部的关闭按钮时的回调
    * @en Emitted when icon click changes.
   */
  iconClick: () => true,
};

export type DrawerEmits = typeof useDrawerEmits;
