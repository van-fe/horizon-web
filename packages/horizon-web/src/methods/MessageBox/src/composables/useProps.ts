import type { ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/shared';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const useMsgBoxAlertProps = declarePropType({
  /** 提示框标题 */
  title: {
    type: String,
    required: false,
  },
  /** 提示框内容 */
  content: {
    type: [String, Object] as PropType<string | VNode>,
    required: true,
  },
  /** 提示框类型 */
  type: {
    type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
    required: false,
  },
  /**
   * 自定义图标名称
   */
  iconName: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标大小
   */
  iconSize: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标颜色
   */
  iconColor: {
    type: String,
    required: false,
  },
  /** 点击蒙层是否关闭提示框 */
  maskClose: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 按下 ESC 键是否关闭提示框
   */
  escClose: {
    type: Boolean,
    default: false,
    required: false,
  },
  /** 按钮文本 */
  okText: {
    type: String,
    required: false,
  },
  /** 按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props) */
  okButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    required: false,
  },
  /** CSS 层级 */
  zIndex: {
    type: Number,
    required: false,
  },
  /** 是否显示关闭按钮 */
  closeButton: {
    type: Boolean,
    default: true,
  },
});

export const useMsgBoxConfirmProps = declarePropType({
  /** 确认框标题 */
  title: {
    type: String,
    required: false,
  },
  /** 确认框内容 */
  content: {
    type: [String, Object] as PropType<string | VNode>,
    required: true,
  },
  /** 确认框类型 */
  type: {
    type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
    required: false,
  },
  /**
   * 自定义图标名称
   */
  iconName: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标大小
   */
  iconSize: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标颜色
   */
  iconColor: {
    type: String,
    required: false,
  },
  /** 点击蒙层是否关闭确认框 */
  maskClose: {
    type: Boolean,
    default: true,
    required: false,
  },
  /**
   * 按下 ESC 键是否关闭确认框
   */
  escClose: {
    type: Boolean,
    default: true,
    required: false,
  },
  /** 确定按钮文本 */
  okText: {
    type: String,
    required: false,
  },
  /** 确定按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props) */
  okButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    required: false,
  },
  /** 取消按钮文本 */
  cancelText: {
    type: String,
    required: false,
  },
  /** 取消按钮的 props，传入一个对象，详见 [Button Props](button#Button%20Props) */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    required: false,
  },
  /** CSS 层级 */
  zIndex: {
    type: Number,
    required: false,
  },
  /** 是否显示关闭按钮 */
  closeButton: {
    type: Boolean,
    default: true,
  },
});

export type MsgBoxAlertProps = ExtractPropTypes<typeof useMsgBoxAlertProps>;
export type MsgBoxConfirmProps = ExtractPropTypes<typeof useMsgBoxConfirmProps>;
export type MessageBoxProps = MsgBoxAlertProps;
export type MessageBoxConfirmProps = MsgBoxConfirmProps;
