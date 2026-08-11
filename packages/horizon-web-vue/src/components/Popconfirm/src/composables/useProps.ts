import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType } from 'vue';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const usePopconfirmProps = declarePropType({
  /** 确认提示标题 @en Confirmation title. */
  title: { type: String },
  /** 是否显示 @en Whether the popconfirm is visible. */
  visible: { type: Boolean, default: undefined },
  /** 是否禁用 @en Whether the popconfirm is disabled. */
  disabled: { type: Boolean, default: false },
  /** 弹出位置 @en Popover placement. */
  placement: {
    type: String as PropType<
      'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
    >,
    default: 'top',
  },
  /** 确认按钮文字 @en Confirm button text. */
  confirmText: { type: String },
  /** 取消按钮文字 @en Cancel button text. */
  cancelText: { type: String },
  /** 确认按钮属性 @en Confirm button props. */
  confirmButtonProps: { type: Object as PropType<Partial<ButtonProps>>, default: () => ({}) },
  /** 取消按钮属性 @en Cancel button props. */
  cancelButtonProps: { type: Object as PropType<Partial<ButtonProps>>, default: () => ({}) },
  /** 确认前置守卫，返回 false 可阻止关闭 @en Guard called before confirming. Return false to keep open. */
  beforeConfirm: { type: Function as PropType<() => boolean | Promise<boolean>> },
});

export type PopconfirmProps = ExtractPropTypes<typeof usePopconfirmProps>;
