import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@nio-fe/shared';
import { declareDirectiveOptionType } from '@nio-fe/shared';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const usePopConfirmOptions = declareDirectiveOptionType({
  /**
   * 弹窗中的提示文本，会根据当前 locale 显示默认文本
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 图标类型，`none` 表示不显示图标
   */
  type: {
    type: String as DirectiveOptionType<'none' | 'info' | 'success' | 'warning' | 'error'>,
    required: false,
    default: 'warning',
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
  /**
   * 弹窗的位置
   */
  placement: {
    type: String as DirectiveOptionType<
      | 'auto'
      | 'auto-start'
      | 'auto-end'
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'right'
      | 'right-start'
      | 'right-end'
      | 'left'
      | 'left-start'
      | 'left-end'
    >,
    required: false,
    default: 'top',
  },
  /**
   * 确定按钮文本，会根据当前 `locale` 显示默认文本
   */
  okText: {
    type: String,
    required: false,
  },
  /**
   * 确定按钮的 `props`，传入一个对象，详见 [Button Props](/pages/lego/lego/components/button#Api)
   */
  okButtonProps: {
    type: Object as DirectiveOptionType<Partial<ButtonProps>>,
    required: false,
  },
  /**
   * 取消按钮文本，会根据当前 `locale` 显示默认文本
   */
  cancelText: {
    type: String,
    required: false,
  },
  /**
   * 取消按钮的 `props`，传入一个对象，详见 [Button Props](/pages/lego/lego/components/button#Api)
   */
  cancelButtonProps: {
    type: Object as DirectiveOptionType<Partial<ButtonProps>>,
    required: false,
  },
  /**
   * 弹窗的 CSS 层级
   */
  zIndex: {
    type: Number,
    required: false,
    default: 1000,
  },
  /**
   * 是否将元素发送到 body 节点
   * @version 2.0.9-alpha.1
   */
  toBody: {
    type: Boolean,
    default: true,
  },
});

export type PopConfirmOptions = ExtractDirectiveOptionTypes<typeof usePopConfirmOptions>;
