import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@nio-fe/shared';
import type { LocaleSupportLang, LocaleSupportLang } from '@nio-fe/locale';

export type NApplicationSizeType = 'large' | 'medium' | 'small';

export const useApplicationProps = declarePropType({
  /**
   * 当前语言
   */
  locale: {
    type: String as PropType<LocaleSupportLang | LocaleSupportLang>,
    required: false,
  },
  /**
   * 组件大小
   */
  size: {
    type: String as PropType<NApplicationSizeType>,
    default: 'medium',
  },
  /**
   * 是否启用 `n-button` 之间的空隙
   */
  useButtonSpacing: {
    type: Boolean,
    default: false,
  },
  /**
   * 兼容旧版本的配置，多个需要传入字符串，并以逗号分割
   * 目前支持：
   * 1. button.size
   * 2. checkbox.size
   * 3. radio.size
   */
  compatibility: {
    type: String,
    required: false,
  },
  /**
   * 命名空间
   * @version 2.0.0
   */
  namespace: {
    type: String,
  },

  /**
   * 全局配置所有弹出窗口的挂载节点
   * @version 2.12.0
   */
  getPopupContainer: {
    type: Function as PropType<(triggerNode?: HTMLElement) => HTMLElement>,
    required: false,
  },
  /**
   * 是否在需要显示时区的地方显示时区
   * 启用后，以下组件在不配置 `format` 时会默认显示时区：
   * 1. 日期选择器 (仅 date-picker 有效）
   * 2. 时间轴 （仅在 n-timeline 开启了 v2 时有效）
   * @version 2.12.14
   */
  showTimeZone: {
    type: [Boolean, Array] as PropType<boolean | ['date-picker' | 'timeline']>,
    default: false,
  },
});

export type ApplicationProps = ExtractPropTypes<typeof useApplicationProps>;
