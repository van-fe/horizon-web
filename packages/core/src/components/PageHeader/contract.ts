import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export interface PageHeaderCommonProps {
  /** 默认标题文字。 @en Default title text. */
  title?: string;
  /** 默认说明文字。 @en Default supporting text. */
  content?: string;
  /** 是否显示返回操作。 @en Whether the back action is shown. */
  showBack?: boolean;
  /** 是否显示主区域底部分割线。 @en Whether a divider is shown below the main region. */
  useDivider?: boolean;
  /** 是否禁用标题溢出提示。 @en Whether the overflowing-title tooltip is disabled. */
  disabledHeaderTooltip?: boolean;
}

export interface PageHeaderEventMap {
  /** 返回操作被激活。 @en Back action activated. */
  back: [];
}

export interface PageHeaderRegionMap {
  body: EmptyComponentApi;
  backIcon: EmptyComponentApi;
  header: EmptyComponentApi;
  title: EmptyComponentApi;
  titleContainer: EmptyComponentApi;
  tags: EmptyComponentApi;
  description: EmptyComponentApi;
  actions: EmptyComponentApi;
  breadcrumb: EmptyComponentApi;
}

export type PageHeaderCommandMap = EmptyComponentApi;

export const PAGE_HEADER_DEFAULTS = Object.freeze({
  showBack: true,
  useDivider: true,
  disabledHeaderTooltip: false,
} as const satisfies Partial<PageHeaderCommonProps>);

export const pageHeaderApiContract = defineComponentApiContract<
  PageHeaderCommonProps,
  PageHeaderEventMap,
  PageHeaderRegionMap,
  PageHeaderCommandMap
>({ defaults: PAGE_HEADER_DEFAULTS });
