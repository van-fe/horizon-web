import { isString } from '@aurora/utils';

export const useNotificationEmits = {
  /**
   * 当前正在进行的操作
   * @en Current 正在进行的operation
   * @param action 当前的操作
   * @paramEn action Current 的操作
   */
  action: (action: 'close' | 'cancel' | 'confirm') => isString(action),
};

export type NotificationEmits = typeof useNotificationEmits;
