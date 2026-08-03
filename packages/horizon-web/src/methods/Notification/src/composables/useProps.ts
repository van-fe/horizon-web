import type { ExtractPropTypes, PropType, VNode } from 'vue';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';
import { declarePropType } from '@aurora/utils';
import type { NotifyFunctions } from '../index';

export type PlacementType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type Action = 'confirm' | 'cancel' | 'close';

export const useNotificationProps = declarePropType({
  /** 标题
   * @en title
   */
  title: {
    type: String,
    default: '',
    required: true,
  },
  /** 通知栏正文内容
   * @en 通知栏正文content
   */
  content: {
    type: [String, Object, Function] as PropType<String | VNode | (() => any)>,
    default: '',
    required: true,
  },
  /** 是否将 content 属性作为 HTML 片段处理
   * @en Whether 将 content 属性作为 HTML 片段处理
   */
  useHTML: {
    type: Boolean,
    default: false,
  },
  /** 通知的类型
   * @en 通知的type
   */
  type: {
    type: String as PropType<'normal' | 'info' | 'success' | 'warning' | 'error'>,
    default: 'normal',
  },
  /** 是否显示关闭按钮
   * @en Whether Display Close button
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /** 自定义弹出位置
   * @en Custom popup position
   */
  placement: {
    type: String as PropType<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>,
    default: 'top-right',
  },
  /** 自定义宽度,例如400,400px
   * @en Custom width,例如400,400px
   */
  width: {
    type: String,
    default: '',
  },
  /** 自定义大小
   * @en Custom size
   */
  size: {
    type: String as PropType<'small' | 'medium'>,
    default: 'small',
    required: false,
  },
  /** 自定义id
   * @en Custom id
   */
  id: {
    type: String,
    default: '',
  },
  /** 显示时间, 单位为毫秒。 值小于等于 0 则默认为 5000
   * @en Display duration, 单位为毫秒, 值小于等于 0 则默认为 5000
   */
  duration: {
    type: Number,
    default: 5000,
  },
  /** 显示层级
   * @en Display z-index
   */
  zIndex: {
    type: Number,
    default: 0,
  },
  /** 相对屏幕顶部或底部的偏移量 偏移的距离
   * @en 相对屏幕顶部或底部的offset 偏移的距离
   */
  offset: {
    type: Number,
    default: 40,
  },
  /**
   * 相邻Notification实例之间的间距
   * @en Adjacent Notificationinstance之间的gap
   */
  gap: {
    type: Number,
    default: 40,
  },
  /** 自定义类名
   * @en Custom class name
   */
  customClass: {
    type: String,
    default: '',
  },
  /** 组件关闭后回调函数，action 的值为'confirm', 'cancel'或'close', instance 为 Notification 实例， 通过它访问实例上的属性和方法
   * @en 组件Close 后回调函数, action 的值为'confirm', 'cancel'或'close', instance 为 Notification 实例, 通过它访问实例上的属性和方法
   * @param action 当前操作
   * @param instance Notification 实例
   * @paramEn action The action that closed the notification
   * @paramEn instance The notification instance
   */
  callback: {
    type: Function as PropType<
      (action: 'confirm' | 'cancel' | 'close', instance: typeof NotifyFunctions) => void
    >,
  },
  /** 是否显示主要按钮
   * @en Whether Display 主要button
   */
  showConfirmButton: {
    type: Boolean,
    default: false,
  },
  /** 是否显示次要按钮
   * @en Whether Display 次要button
   */
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  /** 主要按钮的文本内容
   * @en 主要button的textcontent
   */
  confirmButtonText: {
    type: String,
    default: '',
  },
  /** 次要按钮的文本内容
   * @en 次要button的textcontent
   */
  cancelButtonText: {
    type: String,
    default: '',
  },
  /** 主要按钮的属性设置，参考button组件props
   * @en 主要button的props, 参考button组件props
   */
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        type: 'primary',
        size: 'medium',
      };
    },
  },
  /** 次要按钮的属性设置，参考button组件props
   * @en 次要button的props, 参考button组件props
   */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        type: 'normal',
        size: 'medium',
        plain: true,
      };
    },
  },
  /** 底部操作栏的对齐方式
   * @en 底部操作栏的对齐方式
   */
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right',
  },
  /**
   * @invisible
   */
  onAction: {
    type: Function as PropType<(action: Action) => void>,
    required: false,
  },
});

export type NotificationProps = ExtractPropTypes<typeof useNotificationProps>;
