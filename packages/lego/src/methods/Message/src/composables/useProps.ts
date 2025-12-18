import type { VNode, PropType } from 'vue';
import type { ExtractMethodOptions } from '@nio-fe/shared';
import { declarePropType } from '@nio-fe/shared';

export type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

export const useMessageOptions = declarePropType({
  // /**
  //  * 内部标识 `message` 的 `ID`
  //  * @invisible
  //  */
  // id: {
  //   type: String,
  //   required: false,
  // },
  /**
   * 消息文字
   */
  message: {
    type: [String, Object] as PropType<string | VNode>,
    required: true,
  },
  /**
   * 消息类型
   */
  type: {
    type: String as PropType<MessageType>,
    default: 'info',
    required: false,
  },
  /**
   * 是否将 message 属性作为 HTML 片段处理
   */
  useHTMLString: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 显示时间，单位为毫秒
   * 设置为 0 时不会自动关闭
   * @version 2.0.0-beta.6 允许置为0，置为0时不会自动关闭
   */
  duration: {
    type: Number,
    default: 3000,
    required: false,
  },
  /**
   * 	是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * Message 距离窗口顶部的偏移量
   */
  offset: {
    type: Number,
    default: 32,
    required: false,
  },
  /**
   * 消息文字
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /**
   * 当关闭时的回调
   */
  onClose: {
    type: Function as PropType<(vm: VNode) => void>,
    required: false,
  },
});

export type MessageOriginOption = typeof useMessageOptions;

export type MessageOptions = ExtractMethodOptions<MessageOriginOption>;
