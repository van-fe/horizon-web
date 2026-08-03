import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
type Close = (close: () => void) => void;

export const useAlertProps = declarePropType({
  /**
   * 标题
    * @en Configuration for title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 辅助性文字
    * @en Configuration for description.
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * icon类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'error'>,
    default: 'info',
  },
  /**
   * 是否可关闭
    * @en Configuration for closable.
   */
  closable: {
    type: Boolean,
    default: true,
  },
  /**
   * 主按钮文本
    * @en Configuration for primary button text.
   */
  primaryButtonText: {
    type: String,
    default: '',
  },
  /**
   * 默认按钮文本
    * @en Configuration for default button text.
   */
  defaultButtonText: {
    type: String,
    default: '',
  },
  /**
   * 是否显示图标
    * @en Configuration for show icon.
   */
  showIcon: {
    type: Boolean,
    default: false,
  },
  /**
   * 组件大小，支持small和medium
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
    required: false,
  },
  /**
   * 主按钮回调方法
    * @en Configuration for on primary.
   */
  onPrimary: {
    type: Function as PropType<Close>,
  },
  /**
   * 默认按钮回调方法
    * @en Configuration for on default.
   */
  onDefault: {
    type: Function as PropType<Close>,
  },
  /**
   * 是否这是圆角
    * @en Configuration for rounded.
   */
  rounded: {
    type: Boolean,
    default: true,
  },
});

export const typeMap = {
  success: {
    icon: 'success_filled',
    color: ['#26BD4B', '#FFFFFF'],
  },
  info: {
    icon: 'info_filled',
    color: ['#1880F2', '#FFFFFF'],
  },
  warning: {
    icon: 'warning_filled',
    color: ['#FDA71C', '#FFFFFF'],
  },
  error: {
    icon: 'error_filled',
    color: ['#E83030', '#FFFFFF'],
  },
};

export type AlertProps = ExtractPropTypes<typeof useAlertProps>;
