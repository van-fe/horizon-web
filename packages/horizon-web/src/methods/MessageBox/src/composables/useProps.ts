import type { ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const useMsgBoxAlertProps = declarePropType({
  /** 提示框标题
   * @en Message box title
   */
  title: {
    type: String,
    required: false,
  },
  /** 提示框内容
   * @en Message box content
   */
  content: {
    type: [String, Object] as PropType<string | VNode>,
    required: true,
  },
  /** 提示框类型
   * @en Message box type
   */
  type: {
    type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
    required: false,
  },
  /**
   * 自定义图标名称
   * @en Custom 图标名称
   */
  iconName: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标大小
   * @en Custom 图标size
   */
  iconSize: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标颜色
   * @en Custom 图标color
   */
  iconColor: {
    type: String,
    required: false,
  },
  /** 点击蒙层是否关闭提示框
   * @en 点击蒙层Whether Close Message box
   */
  maskClose: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 按下 ESC 键是否关闭提示框
   * @en Press ESC 键Whether closemessage框
   */
  escClose: {
    type: Boolean,
    default: false,
    required: false,
  },
  /** 按钮文本
   * @en buttontext
   */
  okText: {
    type: String,
    required: false,
  },
  /** 按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props)
   * @en button的 props, 传入一个对象, 详见 [Button Props](button#Button%20Props)
   */
  okButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    required: false,
  },
  /** CSS 层级
   * @en CSS z-index
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /** 是否显示关闭按钮
   * @en Whether Display Close button
   */
  closeButton: {
    type: Boolean,
    default: true,
  },
});

export const useMsgBoxConfirmProps = declarePropType({
  /** 确认框标题
   * @en 确认框title
   */
  title: {
    type: String,
    required: false,
  },
  /** 确认框内容
   * @en 确认框content
   */
  content: {
    type: [String, Object] as PropType<string | VNode>,
    required: true,
  },
  /** 确认框类型
   * @en 确认框type
   */
  type: {
    type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
    required: false,
  },
  /**
   * 自定义图标名称
   * @en Custom 图标名称
   */
  iconName: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标大小
   * @en Custom 图标size
   */
  iconSize: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标颜色
   * @en Custom 图标color
   */
  iconColor: {
    type: String,
    required: false,
  },
  /** 点击蒙层是否关闭确认框
   * @en 点击蒙层Whether Close 确认框
   */
  maskClose: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 按下 ESC 键是否关闭确认框
   * @en Press ESC 键Whether closeconfirm框
   */
  escClose: {
    type: Boolean,
    default: true,
    required: false,
  },
  /** 确定按钮文本
   * @en 确定buttontext
   */
  okText: {
    type: String,
    required: false,
  },
  /** 确定按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props)
   * @en 确定button的 props, 传入一个对象, 详见 [Button Props](button#Button%20Props)
   */
  okButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    required: false,
  },
  /** 取消按钮文本
   * @en 取消buttontext
   */
  cancelText: {
    type: String,
    required: false,
  },
  /** 取消按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props)
   * @en 取消button的 props, 传入一个对象, 详见 [Button Props](button#Button%20Props)
   */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    required: false,
  },
  /** CSS 层级
   * @en CSS z-index
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /** 是否显示关闭按钮
   * @en Whether Display Close button
   */
  closeButton: {
    type: Boolean,
    default: true,
  },
});

export type MsgBoxAlertProps = ExtractPropTypes<typeof useMsgBoxAlertProps>;
export type MsgBoxConfirmProps = ExtractPropTypes<typeof useMsgBoxConfirmProps>;
export type MessageBoxProps = MsgBoxAlertProps;
export type MessageBoxConfirmProps = MsgBoxConfirmProps;
