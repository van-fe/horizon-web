import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType } from '@aurora/utils';
import type { ButtonProps } from '~/components/Button/src/composables/useProps';

export const usePopConfirmOptions = declareDirectiveOptionType({
  /**
   * 弹窗中的提示文本，会根据当前 locale 显示默认文本
   * @en Description
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 图标类型，`none` 表示不显示图标
   * @en Description
   */
  type: {
    type: String as DirectiveOptionType<'none' | 'info' | 'success' | 'warning' | 'error'>,
    required: false,
    default: 'warning',
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
  /**
   * 弹窗的位置
   * @en Description
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
   * @en Description
   */
  okText: {
    type: String,
    required: false,
  },
  /**
   * 确定按钮的 `props`，传入一个对象，详见 [Button Props](/pages/horizon-web/horizon-web/components/button#Api)
   * @en Description
   */
  okButtonProps: {
    type: Object as DirectiveOptionType<Partial<ButtonProps>>,
    required: false,
  },
  /**
   * 取消按钮文本，会根据当前 `locale` 显示默认文本
   * @en Cancelbuttontext, 会根据Current locale Display defaulttext
   */
  cancelText: {
    type: String,
    required: false,
  },
  /**
   * 取消按钮的 `props`，传入一个对象，详见 [Button Props](/pages/horizon-web/horizon-web/components/button#Api)
   * @en Cancelbutton的 props, Pass 一个对象, 详见 [Button Props](/pages/horizon-web/horizon-web/components/button#Api)
   */
  cancelButtonProps: {
    type: Object as DirectiveOptionType<Partial<ButtonProps>>,
    required: false,
  },
  /**
   * 弹窗的 CSS 层级
   * @en Description
   */
  zIndex: {
    type: Number,
    required: false,
    default: 1000,
  },
  /**
   * 是否将元素发送到 body 节点
   * @en Whether 将element发送到 body node
   */
  toBody: {
    type: Boolean,
    default: true,
  },
});

export type PopConfirmOptions = ExtractDirectiveOptionTypes<typeof usePopConfirmOptions>;
