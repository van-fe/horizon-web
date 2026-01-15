import type { ExtractPropTypes, PropType } from 'vue';
import { declarePropType } from '@aurora/utils';
import type { LocaleSupportLang } from '@aurora/locale';

export type HApplicationSizeType = 'large' | 'medium' | 'small';

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
    type: String as PropType<HApplicationSizeType>,
    default: 'medium',
  },
  /**
   * 命名空间
   */
  namespace: {
    type: String,
  },

  /**
   * 全局配置所有弹出窗口的挂载节点
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
   */
  showTimeZone: {
    type: [Boolean, Array] as PropType<boolean | ['date-picker' | 'timeline']>,
    default: false,
  },
});

export type ApplicationProps = ExtractPropTypes<typeof useApplicationProps>;
