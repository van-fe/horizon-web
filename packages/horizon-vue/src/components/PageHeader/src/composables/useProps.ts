import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  PageHeaderCommonProps,
} from '@aurora/core';
import { PAGE_HEADER_DEFAULTS } from '@aurora/core';
import type { ExtractPropTypes } from 'vue';
import { declarePropType } from '@aurora/utils';
import { IconNullablePropType } from '~/utils/useIcon';
import { IconBack } from '@aurora/icon';

type PageHeaderVueProps = AdaptComponentApiShape<
  PageHeaderCommonProps,
  {},
  'showBack',
  { icon?: unknown | null; backAriaLabel?: string }
>;

export const usePageHeaderProps = declarePropType({
  /**
   * 返回按钮图标
   * 设置为 `null` 即不需要返回按钮
   * @en Configuration for icon.
   */
  icon: {
    type: IconNullablePropType,
    default: IconBack,
  },
  /**
   * 标题
   * @en Configuration for title.
   */
  title: {
    type: String,
  },
  /**
   * 内容
   * @en Configuration for content.
   */
  content: {
    type: String,
  },
  /**
   * 是否使用分割线
   * @en Configuration for use divider.
   */
  useDivider: {
    type: Boolean,
    default: PAGE_HEADER_DEFAULTS.useDivider,
  },
  /**
   * 禁用header的Tooltip
   * @en Configuration for disabled header tooltip.
   */
  disabledHeaderTooltip: {
    type: Boolean,
    default: PAGE_HEADER_DEFAULTS.disabledHeaderTooltip,
  },
  /**
   * 返回按钮的可访问名称
   * @en Accessible name for the back action.
   */
  backAriaLabel: {
    type: String,
    required: false,
  },
} satisfies ComponentRendererPropDefinitions<PageHeaderVueProps>);

export type PageHeaderProps = ExtractPropTypes<typeof usePageHeaderProps>;
