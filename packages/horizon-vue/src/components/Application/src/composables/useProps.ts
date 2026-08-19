import type { ExtractPropTypes, PropType } from 'vue';
import type {
  AdaptComponentApiShape,
  ApplicationCommonProps,
  ApplicationShowTimeZone,
  ApplicationSize,
  ComponentRendererPropDefinitions,
} from '@aurora/core';
import { APPLICATION_DEFAULTS, isApplicationShowTimeZone, isApplicationSize } from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { LocaleSupportLang } from '@aurora/locale';

export type HApplicationSizeType = ApplicationSize;
export type ApplicationVueProps = AdaptComponentApiShape<
  ApplicationCommonProps<LocaleSupportLang>,
  {},
  never,
  { getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement }
>;

export const useApplicationProps = declarePropType({
  /**
   * 当前语言
   * @en Configuration for locale.
   */
  locale: {
    type: String as PropType<LocaleSupportLang>,
    required: false,
  },
  /**
   * 组件大小
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<ApplicationSize>,
    default: APPLICATION_DEFAULTS.size,
    validator: isApplicationSize,
  },
  /**
   * 命名空间
   * @en Configuration for namespace.
   */
  namespace: {
    type: String,
  },

  /**
   * 全局配置所有弹出窗口的挂载节点
   * @en Configuration for get popup container.
   */
  getPopupContainer: {
    type: Function as PropType<(triggerNode?: HTMLElement) => HTMLElement>,
    required: false,
  },
  /**
   * 是否在需要显示时区的地方显示时区
   * 启用后，以下组件在不配置 `format` 时会默认显示时区：
   * 1. 日期选择器 (仅 date-picker 有效）
   * 2. 时间轴
   * @en Configuration for show time zone.
   */
  showTimeZone: {
    type: [Boolean, Array] as PropType<ApplicationShowTimeZone>,
    default: APPLICATION_DEFAULTS.showTimeZone,
    validator: isApplicationShowTimeZone,
  },
} satisfies ComponentRendererPropDefinitions<ApplicationVueProps>);

export type ApplicationProps = ExtractPropTypes<typeof useApplicationProps>;
