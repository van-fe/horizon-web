import type { ExtractPropTypes, PropType, VNode } from 'vue';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';
import { declarePropType } from '@aurora/utils';
import type { NotifyFunctions } from '../index';

export type PlacementType = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type Action = 'confirm' | 'cancel' | 'close';

export const useNotificationProps = declarePropType({
  /** 标题 */
  title: {
    type: String,
    default: '',
    required: true,
  },
  /** 通知栏正文内容 */
  content: {
    type: [String, Object, Function] as PropType<String | VNode | (() => any)>,
    default: '',
    required: true,
  },
  /** 是否将 content 属性作为 HTML 片段处理 */
  useHTML: {
    type: Boolean,
    default: false,
  },
  /** 通知的类型 */
  type: {
    type: String as PropType<'normal' | 'info' | 'success' | 'warning' | 'error'>,
    default: 'normal',
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },
  /** 自定义弹出位置 */
  placement: {
    type: String as PropType<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>,
    default: 'top-right',
  },
  /** 自定义宽度,例如400,400px */
  width: {
    type: String,
    default: '',
  },
  /** 自定义大小 */
  size: {
    type: String as PropType<'small' | 'medium'>,
    default: 'small',
    required: false,
  },
  /** 自定义id */
  id: {
    type: String,
    default: '',
  },
  /** 显示时间, 单位为毫秒。 值小于等于 0 则默认为 5000 */
  duration: {
    type: Number,
    default: 5000,
  },
  /** 显示层级 */
  zIndex: {
    type: Number,
    default: 0,
  },
  /** 相对屏幕顶部或底部的偏移量 偏移的距离 */
  offset: {
    type: Number,
    default: 40,
  },
  /**
   * 相邻Notification实例之间的间距
   * @version 1.5.7
   */
  gap: {
    type: Number,
    default: 40,
  },
  /** 自定义类名 */
  customClass: {
    type: String,
    default: '',
  },
  /** 组件关闭后回调函数，action 的值为'confirm', 'cancel'或'close', instance 为 Notification 实例， 通过它访问实例上的属性和方法 */
  callback: {
    type: Function as PropType<
      (action: 'confirm' | 'cancel' | 'close', instance: typeof NotifyFunctions) => void
    >,
  },
  /** 是否显示主要按钮 */
  showConfirmButton: {
    type: Boolean,
    default: false,
  },
  /** 是否显示次要按钮 */
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  /** 主要按钮的文本内容 */
  confirmButtonText: {
    type: String,
    default: '',
  },
  /** 次要按钮的文本内容 */
  cancelButtonText: {
    type: String,
    default: '',
  },
  /** 主要按钮的属性设置，参考button组件props */
  confirmButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => {
      return {
        type: 'primary',
        size: 'medium',
      };
    },
  },
  /** 次要按钮的属性设置，参考button组件props */
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
  /** 底部操作栏的对齐方式 */
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
