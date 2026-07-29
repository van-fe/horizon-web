import type { VNode, PropType } from 'vue';
import type { ExtractMethodOptions } from '@aurora/utils';
import { declarePropType } from '@aurora/utils';

export type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

export const useMessageOptions = declarePropType({
  // /**
  //  * 内部标识 `message` 的 `ID`
  //  * @invisible
  //  * @en Internal message identifier
  //  */
  // id: {
  //   type: String,
  //   required: false,
  // },
  /**
   * 消息文字
   * @en Message文字
   */
  message: {
    type: [String, Object] as PropType<string | VNode>,
    required: true,
  },
  /**
   * 消息类型
   * @en Messagetype
   */
  type: {
    type: String as PropType<MessageType>,
    default: 'info',
    required: false,
  },
  /**
   * 是否将 message 属性作为 HTML 片段处理
   * @en Whether 将 message props作为 HTML 片段处理
   */
  useHTMLString: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 显示时间，单位为毫秒
   * 设置为 0 时不会自动关闭
   * @en Display time, in milliseconds Set 为 0 时不会automaticallyclose
   */
  duration: {
    type: Number,
    default: 3000,
    required: false,
  },
  /**
   * 	是否显示关闭按钮
   * @en Whether Display closebutton
   */
  showClose: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * Message 距离窗口顶部的偏移量
   * @en Message distancewindowtop的offset量
   */
  offset: {
    type: Number,
    default: 32,
    required: false,
  },
  /**
   * 消息文字
   * @en Message文字
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /**
   * 当关闭时的回调
   * @en Callback invoked when the message closes
   */
  onClose: {
    type: Function as PropType<(vm: VNode) => void>,
    required: false,
  },
});

export type MessageOriginOption = typeof useMessageOptions;

export type MessageOptions = ExtractMethodOptions<MessageOriginOption>;
