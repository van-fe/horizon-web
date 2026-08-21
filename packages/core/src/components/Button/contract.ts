import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

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

export const BUTTON_DEFAULTS = Object.freeze({
  variant: 'primary',
  size: 'medium',
  round: false,
  plain: false,
  ghost: false,
  text: false,
  link: false,
  block: false,
  active: false,
  loading: false,
  disabled: false,
  autoFit: false,
  borderStyle: 'solid',
  target: '_self',
  replace: false,
  asyncState: 'none',
} as const satisfies Partial<ButtonCommonProps>);

export const BUTTON_GROUP_DEFAULTS = Object.freeze(
  {} as const satisfies Partial<ButtonGroupCommonProps>,
);

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

export const buttonApiContract = defineComponentApiContract<
  ButtonCommonProps,
  ButtonEventMap,
  ButtonRegionMap,
  ButtonCommandMap
>({
  defaults: BUTTON_DEFAULTS,
  validators: {
    variant: isButtonVariant,
    size: isButtonSize,
    borderStyle: isButtonBorderStyle,
    target: isButtonTarget,
    asyncState: isButtonAsyncState,
  },
});

export const buttonGroupApiContract = defineComponentApiContract<
  ButtonGroupCommonProps,
  EmptyComponentApi,
  ButtonGroupRegionMap,
  EmptyComponentApi
>({
  defaults: BUTTON_GROUP_DEFAULTS,
  validators: {
    variant: isButtonVariant,
    size: isButtonSize,
  },
});
