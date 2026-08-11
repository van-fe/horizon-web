import type { ExtractPropTypes, PropType } from 'vue';
import type { AlertActionHandler, AlertSize, AlertType } from '@aurora/core';
import { ALERT_DEFAULTS, isAlertSize, isAlertType } from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export const useAlertProps = declarePropType({
  /**
   * 标题
   * @en Configuration for title.
   */
  title: {
    type: String,
    default: ALERT_DEFAULTS.title,
  },
  /**
   * 辅助性文字
   * @en Configuration for description.
   */
  description: {
    type: String,
    default: ALERT_DEFAULTS.description,
  },
  /**
   * icon类型
   * @en Configuration for type.
   */
  type: {
    type: String as PropType<AlertType>,
    default: ALERT_DEFAULTS.type,
    validator: isAlertType,
  },
  /**
   * 是否可关闭
   * @en Configuration for closable.
   */
  closable: {
    type: Boolean,
    default: ALERT_DEFAULTS.closable,
  },
  /**
   * 主按钮文本
   * @en Configuration for primary button text.
   */
  primaryButtonText: {
    type: String,
    default: ALERT_DEFAULTS.primaryButtonText,
  },
  /**
   * 默认按钮文本
   * @en Configuration for default button text.
   */
  defaultButtonText: {
    type: String,
    default: ALERT_DEFAULTS.defaultButtonText,
  },
  /**
   * 是否显示图标
   * @en Configuration for show icon.
   */
  showIcon: {
    type: Boolean,
    default: ALERT_DEFAULTS.showIcon,
  },
  /**
   * 组件大小，支持small和medium
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<AlertSize>,
    required: false,
    validator: isAlertSize,
  },
  /**
   * 主按钮回调方法
   * @en Configuration for on primary.
   */
  onPrimary: {
    type: Function as PropType<AlertActionHandler>,
  },
  /**
   * 默认按钮回调方法
   * @en Configuration for on default.
   */
  onDefault: {
    type: Function as PropType<AlertActionHandler>,
  },
  /**
   * 是否这是圆角
   * @en Configuration for rounded.
   */
  rounded: {
    type: Boolean,
    default: ALERT_DEFAULTS.rounded,
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
