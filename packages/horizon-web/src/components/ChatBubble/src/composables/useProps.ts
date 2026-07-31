import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';

export const useChatBubbleProps = declarePropType({
  /**
   * 消息正文
   * @en Message content.
   */
  content: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 气泡在对话中的排列位置
   * @en Alignment of the bubble in the conversation.
   */
  placement: {
    type: String as PropType<'start' | 'end'>,
    required: false,
    default: 'start',
    validator: (value: string) => ['start', 'end'].includes(value),
  },
  /**
   * 气泡视觉样式
   * @en Visual style of the bubble.
   */
  variant: {
    type: String as PropType<'default' | 'primary'>,
    required: false,
    default: 'default',
    validator: (value: string) => ['default', 'primary'].includes(value),
  },
  /**
   * 头像图片地址
   * @en Avatar image URL.
   */
  avatar: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 发送者名称
   * @en Sender name.
   */
  name: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 消息时间
   * @en Message time.
   */
  datetime: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 消息状态文案
   * @en Message status text.
   */
  status: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 消息内容的最大宽度
   * @en Maximum width of the message content.
   */
  maxWidth: {
    type: [String, Number] as PropType<string | number>,
    required: false,
    default: '70%',
  },
  /**
   * 气泡的无障碍名称
   * @en Accessible label for the bubble.
   */
  ariaLabel: {
    type: String,
    required: false,
    default: '',
  },
});

export type ChatBubbleProps = ExtractPropTypes<typeof useChatBubbleProps>;

export interface ChatBubbleItem {
  /**
   * 消息唯一标识
   * @en Unique message identifier.
   */
  id?: string | number;
  /**
   * 消息正文
   * @en Message content.
   */
  content?: string;
  /**
   * 气泡在对话中的排列位置
   * @en Alignment of the bubble in the conversation.
   */
  placement?: 'start' | 'end';
  /**
   * 气泡视觉样式
   * @en Visual style of the bubble.
   */
  variant?: 'default' | 'primary';
  /**
   * 头像图片地址
   * @en Avatar image URL.
   */
  avatar?: string;
  /**
   * 发送者名称
   * @en Sender name.
   */
  name?: string;
  /**
   * 消息时间
   * @en Message time.
   */
  datetime?: string;
  /**
   * 消息状态文案
   * @en Message status text.
   */
  status?: string;
  /**
   * 消息内容的最大宽度
   * @en Maximum width of the message content.
   */
  maxWidth?: string | number;
  /**
   * 气泡的无障碍名称
   * @en Accessible label for the bubble.
   */
  ariaLabel?: string;
  [key: string]: unknown;
}

export const useChatBubbleListProps = declarePropType({
  /**
   * 消息数据列表
   * @en Message data list.
   */
  items: {
    type: Array as PropType<ChatBubbleItem[]>,
    required: false,
    default: () => [],
  },
  /**
   * 消息唯一标识对应的字段名
   * @en Field used as the unique message key.
   */
  keyField: {
    type: String,
    required: false,
    default: 'id',
  },
  /**
   * 消息项的预估最小高度
   * @en Estimated minimum height of a message item.
   */
  minItemSize: {
    type: [Number, String],
    required: false,
    default: 72,
  },
  /**
   * 虚拟滚动视口高度
   * @en Height of the virtual scrolling viewport.
   */
  height: {
    type: [Number, String],
    required: false,
    default: 400,
  },
  /**
   * 虚拟滚动视口最大高度
   * @en Maximum height of the virtual scrolling viewport.
   */
  maxHeight: {
    type: [Number, String],
    required: false,
  },
  /**
   * 可视区域外的预渲染距离，单位为像素
   * @en Pre-render buffer outside the viewport in pixels.
   */
  buffer: {
    type: Number,
    required: false,
    default: 200,
    validator: (value: number) => value >= 0,
  },
});

export type ChatBubbleListProps = ExtractPropTypes<typeof useChatBubbleListProps>;
