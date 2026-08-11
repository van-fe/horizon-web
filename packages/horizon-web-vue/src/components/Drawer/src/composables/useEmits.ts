import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  DrawerEventMap,
} from '@aurora/core';
import { isBoolean } from '@aurora/utils';

type DrawerVueEvents = AdaptComponentApiShape<DrawerEventMap, { openChange: 'update:visible' }>;

export const useDrawerEmits = {
  /** 更新 visible。 @en Emitted when visibility changes. */
  'update:visible': (value: boolean) => isBoolean(value),
  /** 点击确定按钮。 @en Confirm action. */
  ok: () => true,
  /** 点击取消按钮。 @en Cancel action. */
  cancel: () => true,
  /** 开始打开。 @en Opening started. */
  open: () => true,
  /** 打开动画完成。 @en Opening completed. */
  opened: () => true,
  /** 开始关闭。 @en Closing started. */
  close: () => true,
  /** 关闭动画完成。 @en Closing completed. */
  closed: () => true,
  /** 点击遮罩层。 @en Background mask clicked. */
  maskClick: () => true,
  /** 点击标题栏关闭按钮。 @en Header close button clicked. */
  iconClick: () => true,
} satisfies ComponentEventValidators<DrawerVueEvents>;

export type DrawerEmits = typeof useDrawerEmits;
