import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/shared';
type Close = (close: () => void) => void;

export const useAlertProps = declarePropType({
  /**
   * 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 辅助性文字
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * icon类型
   */
  type: {
    type: String as PropType<'success' | 'info' | 'warning' | 'error'>,
    default: 'info',
  },
  /**
   * 是否可关闭
   */
  closable: {
    type: Boolean,
    default: true,
  },
  /**
   * 主按钮文本
   */
  primaryButtonText: {
    type: String,
    default: '',
  },
  /**
   * 默认按钮文本
   */
  defaultButtonText: {
    type: String,
    default: '',
  },
  /**
   * 是否显示图标
   */
  showIcon: {
    type: Boolean,
    default: false,
  },
  /**
   * 组件大小，支持small和medium
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
    required: false,
  },
  /**
   * 主按钮回调方法
   */
  onPrimary: {
    type: Function as PropType<Close>,
  },
  /**
   * 默认按钮回调方法
   */
  onDefault: {
    type: Function as PropType<Close>,
  },
  /**
   * 是否这是圆角
   */
  rounded: {
    type: Boolean,
    default: true,
  },
});

export const typeMap = {
  success: {
    icon: 'success_filled',
    color: '#26BD4B',
  },
  info: {
    icon: 'info_filled',
    color: '#1880F2',
  },
  warning: {
    icon: 'warning_filled',
    color: '#FDA71C',
  },
  error: {
    icon: 'warning_filled',
    color: '#E83030',
  },
};

export type AlertProps = ExtractPropTypes<typeof useAlertProps>;
