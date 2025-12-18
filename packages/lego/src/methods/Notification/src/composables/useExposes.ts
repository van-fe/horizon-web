import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';

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
