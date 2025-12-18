import type { Component, ExtractPropTypes, PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { declarePropType } from '@aurora/shared';

export interface BreadcrumbItem extends Partial<BreadcrumbItemProps> {
  text?: string;
}

export const useBreadcrumbProps = declarePropType({
  /**
   * 分隔符
   * @version 2.0.5 支持传入 icon 组件对象
   */
  separator: {
    type: [String, Object] as PropType<string | Component>,
    default: '/',
  },
  /**
   * 用作标题展示，最后一项激活的 item 会加粗展示
   */
  title: {
    type: Boolean,
    default: false,
  },
  /**
   * 需要渲染的内容数组
   */
  texts: {
    type: Array as PropType<BreadcrumbItem[]>,
    default: () => [],
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium'>,
  },
  /**
   * 展示方式
   * full: 不折叠，全部展示
   * ellipsis: 在超过最大宽度后，会自动从第二个 item 开始折叠起来，并用 dropdown 显示
   * @version 2.0.5
   */
  displayType: {
    type: String as PropType<'full' | 'ellipsis'>,
    default: 'full',
  },
});

export const useBreadcrumbItemProps = declarePropType({
  /**
   * 分隔符
   * @version 2.0.5 支持传入 icon 组件对象
   */
  separator: {
    type: [String, Object] as PropType<string | Component>,
  },
  /**
   * 用作标题展示，最后一项激活的 item 会加粗展示
   */
  title: {
    type: Boolean,
    default: false,
  },
  /**
   * 路由跳转对象，同 vue-router 的 to
   */
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
  /**
   * 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
   */
  replace: {
    type: Boolean,
    default: false,
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'small' | 'medium'>,
  },
  /**
   * 是否可点击，点击后会对外抛出 `click` 事件
   * 如果设置了 `prop.to`，无需额外设置此值
   * @version 2.3.0
   */
  clickable: {
    type: Boolean,
    default: false,
  },
});

export type BreadcrumbProps = ExtractPropTypes<typeof useBreadcrumbProps>;
export type BreadcrumbItemProps = ExtractPropTypes<typeof useBreadcrumbItemProps>;
