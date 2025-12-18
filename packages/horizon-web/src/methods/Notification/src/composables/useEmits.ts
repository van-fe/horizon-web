import { isString } from '@aurora/shared';

export const useNotificationEmits = {
  /**
   * 当前正在进行的操作
   * @param action 当前的操作
   */
  action: (action: 'close' | 'cancel' | 'confirm') => isString(action),
};

export type NotificationEmits = typeof useNotificationEmits;
