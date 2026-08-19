import type { Component, ExtractPropTypes, PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type {
  AdaptComponentApiShape,
  BreadcrumbCommonProps,
  BreadcrumbDisplayType,
  BreadcrumbItemCommonProps,
  BreadcrumbSize,
  ComponentRendererPropDefinitions,
} from '@aurora/core';
import {
  BREADCRUMB_DEFAULTS,
  BREADCRUMB_ITEM_DEFAULTS,
  isBreadcrumbDisplayType,
  isBreadcrumbSize,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';

export interface BreadcrumbItem extends Partial<BreadcrumbItemProps> {
  text?: string;
}

type BreadcrumbVueProps = AdaptComponentApiShape<
  BreadcrumbCommonProps,
  { items: 'texts' },
  'separator' | 'items',
  {
    separator?: string | Component;
    texts?: BreadcrumbItem[];
  }
>;

type BreadcrumbItemVueProps = AdaptComponentApiShape<
  BreadcrumbItemCommonProps<RouteLocationRaw>,
  { route: 'to' },
  'text' | 'separator',
  { separator?: string | Component }
>;

export const useBreadcrumbProps = declarePropType({
  /**
   * 分隔符
   * @en Configuration for separator.
   */
  separator: {
    type: [String, Object] as PropType<string | Component>,
    default: BREADCRUMB_DEFAULTS.separator,
  },
  /**
   * 用作标题展示，最后一项激活的 item 会加粗展示
   * @en Configuration for title.
   */
  title: {
    type: Boolean,
    default: BREADCRUMB_DEFAULTS.title,
  },
  /**
   * 需要渲染的内容数组
   * @en Configuration for texts.
   */
  texts: {
    type: Array as PropType<BreadcrumbItem[]>,
    default: () => [...BREADCRUMB_DEFAULTS.items],
  },
  /**
   * 尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<BreadcrumbSize>,
    validator: isBreadcrumbSize,
  },
  /**
   * 展示方式
   * full: 不折叠，全部展示
   * ellipsis: 在超过最大宽度后，会自动从第二个 item 开始折叠起来，并用 dropdown 显示
   * @en Configuration for display type.
   */
  displayType: {
    type: String as PropType<BreadcrumbDisplayType>,
    default: BREADCRUMB_DEFAULTS.displayType,
    validator: isBreadcrumbDisplayType,
  },
} satisfies ComponentRendererPropDefinitions<BreadcrumbVueProps>);

export const useBreadcrumbItemProps = declarePropType({
  /**
   * 分隔符
   * @en Configuration for separator.
   */
  separator: {
    type: [String, Object] as PropType<string | Component>,
  },
  /**
   * 用作标题展示，最后一项激活的 item 会加粗展示
   * @en Configuration for title.
   */
  title: {
    type: Boolean,
    default: BREADCRUMB_ITEM_DEFAULTS.title,
  },
  /**
   * 路由跳转对象，同 vue-router 的 to
   * @en Configuration for to.
   */
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
  /**
   * 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
   * @en Configuration for replace.
   */
  replace: {
    type: Boolean,
    default: BREADCRUMB_ITEM_DEFAULTS.replace,
  },
  /**
   * 尺寸
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<BreadcrumbSize>,
    validator: isBreadcrumbSize,
  },
  /**
   * 是否可点击，点击后会对外抛出 `click` 事件
   * 如果设置了 `prop.to`，无需额外设置此值
   * @en Configuration for clickable.
   */
  clickable: {
    type: Boolean,
    default: BREADCRUMB_ITEM_DEFAULTS.clickable,
  },
} satisfies ComponentRendererPropDefinitions<BreadcrumbItemVueProps>);

export type BreadcrumbProps = ExtractPropTypes<typeof useBreadcrumbProps>;
export type BreadcrumbItemProps = ExtractPropTypes<typeof useBreadcrumbItemProps>;
