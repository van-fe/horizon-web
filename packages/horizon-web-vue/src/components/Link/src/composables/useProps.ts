import type { ExtractPropTypes, PropType } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type {
  AdaptComponentApiShape,
  ChoiceSize,
  ComponentRendererPropDefinitions,
  LinkAnchorPosition,
  LinkCommonProps,
  LinkTarget,
  LinkUnderline,
  LinkVariant,
} from '@aurora/core';
import {
  isLinkAnchorOffset,
  isLinkAnchorPosition,
  isLinkTarget,
  isLinkUnderline,
  isLinkVariant,
  LINK_DEFAULTS,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import { IconPropType } from '~/utils/useIcon';

interface LinkVueExtensions {
  icon?: unknown;
  iconSize?: string | number;
  scrollTarget?: string | Element;
  to?: RouteLocationRaw;
}

type LinkVueProps = AdaptComponentApiShape<
  LinkCommonProps,
  { variant: 'type' },
  'route',
  LinkVueExtensions
>;

export const useLinkProps = declarePropType({
  /** 语义类型。@en Semantic variant. */
  type: {
    type: String as PropType<LinkVariant>,
    default: LINK_DEFAULTS.variant,
    validator: isLinkVariant,
  },
  /** 组件尺寸；未设置时继承 Application。@en Component size; inherits Application when omitted. */
  size: { type: String as PropType<ChoiceSize>, required: false },
  /** 下划线策略。@en Underline policy. */
  underline: {
    type: [Boolean, String] as PropType<LinkUnderline>,
    default: LINK_DEFAULTS.underline,
    validator: isLinkUnderline,
  },
  /** 是否禁用。@en Whether the link is disabled. */
  disabled: { type: Boolean, default: LINK_DEFAULTS.disabled },
  /** 原生链接地址。@en Native link address. */
  href: { type: String, required: false },
  /** 原生浏览上下文目标。@en Native browsing-context target. */
  target: {
    type: String as PropType<LinkTarget>,
    required: false,
    validator: isLinkTarget,
  },
  /** 是否显示注释样式。@en Whether annotation styling is enabled. */
  attribute: { type: Boolean, default: LINK_DEFAULTS.attribute },
  /** 锚点标识。@en Anchor identifier. */
  anchor: { type: String, required: false },
  /** 锚点符号位置。@en Anchor marker position. */
  anchorPosition: {
    type: String as PropType<LinkAnchorPosition>,
    default: LINK_DEFAULTS.anchorPosition,
    validator: isLinkAnchorPosition,
  },
  /** 锚点距滚动容器顶部的偏移。@en Anchor offset from the scroll-container top. */
  anchorOffset: {
    type: Number,
    default: LINK_DEFAULTS.anchorOffset,
    validator: isLinkAnchorOffset,
  },
  /** 前缀图标。@en Leading icon. */
  icon: { type: IconPropType, required: false },
  /** 图标尺寸。@en Icon size. */
  iconSize: { type: [String, Number], required: false },
  /** Vue Router 路由目标。@en Vue Router navigation target. */
  to: { type: [String, Object] as PropType<RouteLocationRaw>, required: false },
  /** 是否替换当前历史记录。@en Whether route navigation replaces history. */
  replace: { type: Boolean, default: LINK_DEFAULTS.replace },
  /** 锚点滚动容器或选择器。@en Anchor scroll container or selector. */
  scrollTarget: {
    type: [String, Object] as PropType<string | Element>,
    default: 'body',
  },
  /** 是否正在加载；加载时不响应交互。@en Whether loading; interactions are inert while loading. */
  loading: { type: Boolean, default: LINK_DEFAULTS.loading },
} satisfies ComponentRendererPropDefinitions<LinkVueProps>);

export type LinkProps = ExtractPropTypes<typeof useLinkProps>;
