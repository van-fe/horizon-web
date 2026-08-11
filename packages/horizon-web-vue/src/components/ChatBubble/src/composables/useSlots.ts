import type { SlotsType, VNode } from 'vue';
import type { Arrayable } from '@aurora/utils';
import type { ChatBubbleItem } from './useProps';

export const useChatBubbleSlots = Object as SlotsType<{
  /**
   * 自定义消息正文
   * @en Custom message content.
   */
  default?: {};
  /**
   * 自定义头像
   * @en Custom avatar.
   */
  avatar?: {};
  /**
   * 自定义发送者名称
   * @en Custom sender name.
   */
  name?: {};
  /**
   * 自定义消息时间
   * @en Custom message time.
   */
  datetime?: {};
  /**
   * 自定义消息状态
   * @en Custom message status.
   */
  status?: {};
  /**
   * 气泡下方的扩展内容
   * @en Extra content below the bubble.
   */
  footer?: {};
}>;

export type ChatBubbleSlots = typeof useChatBubbleSlots;

export interface ChatBubbleListSlotScope {
  /**
   * 当前消息数据
   * @en Current message data.
   */
  item: ChatBubbleItem;
  /**
   * 当前消息索引
   * @en Current message index.
   */
  index: number;
  /**
   * 当前消息是否在活动渲染池中
   * @en Whether the message is active in the render pool.
   */
  active: boolean;
}

export const useChatBubbleListSlots = Object as SlotsType<{
  /**
   * 自定义消息项
   * @param scope 当前消息、索引与活动状态
   * @paramEn scope Current message, index, and active state.
   * @en Custom message item.
   */
  default?: (scope: ChatBubbleListSlotScope) => Arrayable<VNode>;
  /**
   * 列表顶部内容
   * @en Content before the message list.
   */
  before?: {};
  /**
   * 列表底部内容
   * @en Content after the message list.
   */
  after?: {};
  /**
   * 空列表内容
   * @en Content shown when the list is empty.
   */
  empty?: {};
}>;

export type ChatBubbleListSlots = typeof useChatBubbleListSlots;
