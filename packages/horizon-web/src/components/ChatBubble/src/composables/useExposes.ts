import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useChatBubbleListExposes = {
  /**
   * 滚动到指定消息索引
   * @param index 消息索引
   * @paramEn index Message index.
   * @en Scrolls to the specified message index.
   */
  scrollToItem: Function as ExposeType<(index: number) => void>,
  /**
   * 滚动到消息列表底部
   * @en Scrolls to the end of the message list.
   */
  scrollToBottom: Function as ExposeType<() => void>,
};

export type ChatBubbleListExposes = ExtractExposeTypes<typeof useChatBubbleListExposes>;
