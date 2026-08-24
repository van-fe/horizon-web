import type { EmptyComponentApi } from '../_shared/api';
import {
  createComponentPropDefaults,
  createComponentPropValidators,
  defineComponentApiContract,
  defineComponentPropDefinitions,
} from '../_shared/api';

export const BUTTON_ASYNC_STATES = ['disabled', 'loading', 'none'] as const;
export const BUTTON_VARIANTS = ['primary', 'normal', 'danger'] as const;
export const BUTTON_SIZES = ['huge', 'large', 'medium', 'small'] as const;
export const BUTTON_BORDER_STYLES = ['solid', 'dashed', 'dotted'] as const;
export const BUTTON_TARGETS = ['_blank', '_self', '_parent', '_top'] as const;

export type ButtonAsyncState = (typeof BUTTON_ASYNC_STATES)[number];
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export type ButtonBorderStyle = (typeof BUTTON_BORDER_STYLES)[number];
export type ButtonTarget = (typeof BUTTON_TARGETS)[number];

export interface ButtonCommonProps {
  /** 视觉类型。 @en Visual variant. */
  variant?: ButtonVariant;
  /** 按钮尺寸。 @en Button size. */
  size?: ButtonSize;
  /** 使用椭圆外观。 @en Uses a pill shape. */
  round?: boolean;
  /** 使用简洁外观。 @en Uses the plain treatment. */
  plain?: boolean;
  /** 使用幽灵外观。 @en Uses the ghost treatment. */
  ghost?: boolean;
  /** 使用文字按钮外观。 @en Uses the text-button treatment. */
  text?: boolean;
  /** 使用链接按钮外观。 @en Uses the link treatment. */
  link?: boolean;
  /** 填满容器宽度。 @en Fills the container width. */
  block?: boolean;
  /** 显示激活状态。 @en Displays the active state. */
  active?: boolean;
  /** 显示加载状态。 @en Displays the loading state. */
  loading?: boolean;
  /** 禁止交互。 @en Prevents interaction. */
  disabled?: boolean;
  /** 按内容收缩宽度。 @en Shrinks to fit the content. */
  autoFit?: boolean;
  /** 边框样式。 @en Border style. */
  borderStyle?: ButtonBorderStyle;
  /** 自定义主题颜色。 @en Custom theme color. */
  color?: string;
  /** 原生链接地址。 @en Native navigation URL. */
  href?: string;
  /** 链接目标窗口。 @en Link browsing context. */
  target?: ButtonTarget;
  /** 是否替换应用导航记录。 @en Whether application navigation replaces the current entry. */
  replace?: boolean;
  /** 防止重复执行的异步操作。 @en Guarded asynchronous action. */
  asyncAction?: () => unknown | PromiseLike<unknown>;
  /** 异步执行期间的视觉状态。 @en Visual state while the asynchronous action runs. */
  asyncState?: ButtonAsyncState;
}

export interface ButtonGroupCommonProps {
  /** 组内按钮视觉类型。 @en Visual variant inherited by grouped buttons. */
  variant?: ButtonVariant;
  /** 组内按钮尺寸。 @en Size inherited by grouped buttons. */
  size?: ButtonSize;
}

export interface ButtonEventMap<Event = unknown> {
  /** 普通按钮操作被触发。 @en A regular button action was triggered. */
  press: [event: Event];
  /** 异步操作成功完成。 @en The asynchronous action completed successfully. */
  actionFinished: [];
  /** 异步操作失败。 @en The asynchronous action failed. */
  actionError: [error: unknown];
}

export interface ButtonRegionMap {
  /** 按钮主体内容。 @en Main button content. */
  content: EmptyComponentApi;
  /** 前置图标内容。 @en Leading icon content. */
  icon: EmptyComponentApi;
  /** 后置内容。 @en Trailing content. */
  suffix: EmptyComponentApi;
}

export interface ButtonGroupRegionMap {
  /** 组内按钮。 @en Buttons contained by the group. */
  content: EmptyComponentApi;
}

export interface ButtonCommandMap {
  /** 聚焦实际交互元素。 @en Focuses the rendered interactive element. */
  focus: () => void;
}

export function isButtonAsyncState(value: unknown): value is ButtonAsyncState {
  return BUTTON_ASYNC_STATES.includes(value as ButtonAsyncState);
}

export function isButtonVariant(value: unknown): value is ButtonVariant {
  return BUTTON_VARIANTS.includes(value as ButtonVariant);
}

export function isButtonSize(value: unknown): value is ButtonSize {
  return BUTTON_SIZES.includes(value as ButtonSize);
}

export function isButtonBorderStyle(value: unknown): value is ButtonBorderStyle {
  return BUTTON_BORDER_STYLES.includes(value as ButtonBorderStyle);
}

export function isButtonTarget(value: unknown): value is ButtonTarget {
  return BUTTON_TARGETS.includes(value as ButtonTarget);
}

export const BUTTON_PROP_DEFINITIONS = defineComponentPropDefinitions<ButtonCommonProps>()({
  variant: {
    runtimeType: 'string',
    type: 'ButtonVariant',
    description: { zh: '视觉类型', en: 'Visual variant' },
    default: 'primary',
    validator: isButtonVariant,
  },
  size: {
    runtimeType: 'string',
    type: 'ButtonSize',
    description: { zh: '尺寸', en: 'Size' },
    default: 'medium',
    validator: isButtonSize,
  },
  round: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '椭圆外观', en: 'Pill shape' },
    default: false,
  },
  plain: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '简洁外观', en: 'Plain treatment' },
    default: false,
  },
  ghost: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '幽灵外观', en: 'Ghost treatment' },
    default: false,
  },
  text: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '文字外观', en: 'Text treatment' },
    default: false,
  },
  link: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '链接外观', en: 'Link treatment' },
    default: false,
  },
  block: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '填满容器', en: 'Block width' },
    default: false,
  },
  active: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '激活状态', en: 'Active state' },
    default: false,
  },
  loading: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '加载状态', en: 'Loading state' },
    default: false,
  },
  disabled: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '禁用状态', en: 'Disabled state' },
    default: false,
  },
  autoFit: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '按内容收缩', en: 'Content fitting' },
    default: false,
  },
  borderStyle: {
    runtimeType: 'string',
    type: 'ButtonBorderStyle',
    description: { zh: '边框样式', en: 'Border style' },
    default: 'solid',
    validator: isButtonBorderStyle,
  },
  color: {
    runtimeType: 'string',
    type: 'string',
    description: { zh: '自定义颜色', en: 'Custom color' },
  },
  href: {
    runtimeType: 'string',
    type: 'string',
    description: { zh: '原生链接', en: 'Native link URL' },
  },
  target: {
    runtimeType: 'string',
    type: 'ButtonTarget',
    description: { zh: '链接目标', en: 'Link target' },
    default: '_self',
    validator: isButtonTarget,
  },
  replace: {
    runtimeType: 'boolean',
    type: 'boolean',
    description: { zh: '替换导航记录', en: 'Replace navigation entry' },
    default: false,
  },
  asyncAction: {
    runtimeType: 'function',
    type: '() => unknown | PromiseLike<unknown>',
    description: { zh: '异步操作', en: 'Async action' },
  },
  asyncState: {
    runtimeType: 'string',
    type: 'ButtonAsyncState',
    description: { zh: '异步视觉状态', en: 'Async visual state' },
    default: 'none',
    validator: isButtonAsyncState,
  },
});

export const BUTTON_GROUP_PROP_DEFINITIONS =
  defineComponentPropDefinitions<ButtonGroupCommonProps>()({
    variant: {
      runtimeType: 'string',
      type: 'ButtonVariant',
      description: { zh: '组内视觉类型', en: 'Grouped variant' },
      validator: isButtonVariant,
    },
    size: {
      runtimeType: 'string',
      type: 'ButtonSize',
      description: { zh: '组内尺寸', en: 'Grouped size' },
      validator: isButtonSize,
    },
  });

export const BUTTON_DEFAULTS = createComponentPropDefaults(BUTTON_PROP_DEFINITIONS);
export const BUTTON_GROUP_DEFAULTS = createComponentPropDefaults(BUTTON_GROUP_PROP_DEFINITIONS);

export const buttonApiContract = defineComponentApiContract<
  ButtonCommonProps,
  ButtonEventMap,
  ButtonRegionMap,
  ButtonCommandMap
>({
  defaults: BUTTON_DEFAULTS,
  validators: createComponentPropValidators<ButtonCommonProps>(BUTTON_PROP_DEFINITIONS),
  propDefinitions: BUTTON_PROP_DEFINITIONS,
});

export const buttonGroupApiContract = defineComponentApiContract<
  ButtonGroupCommonProps,
  EmptyComponentApi,
  ButtonGroupRegionMap,
  EmptyComponentApi
>({
  defaults: BUTTON_GROUP_DEFAULTS,
  validators: createComponentPropValidators<ButtonGroupCommonProps>(BUTTON_GROUP_PROP_DEFINITIONS),
  propDefinitions: BUTTON_GROUP_PROP_DEFINITIONS,
});
