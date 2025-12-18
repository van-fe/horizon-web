import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useNotificationExposes = {
  /**
   * 清空事件
   */
  clearTimer: Function as ExposeType<() => void>,
  /**
   * 关闭Notification
   */
  close: Function as ExposeType<() => void>,
};

export type NotificationExposes = ExtractExposeTypes<typeof useNotificationExposes>;
