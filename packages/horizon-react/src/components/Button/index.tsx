import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardedRef,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import { BUTTON_DEFAULTS, getButtonState, resolveButtonAction } from '@aurora/core';
import type { ButtonCommonProps, ButtonGroupCommonProps } from '@aurora/core';
import { cls, ComponentClassBlock, createButtonColorStyle } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { LoadingIcon } from '../_shared/LoadingIcon';
import { useButtonAction } from './useButtonAction';

export type { ButtonBorderStyle, ButtonSize, ButtonTarget, ButtonVariant } from '@aurora/core';

interface ButtonGroupContextValue {
  variant?: ButtonGroupCommonProps['variant'];
  size?: ButtonGroupCommonProps['size'];
}

const ButtonGroupContext = createContext<ButtonGroupContextValue | undefined>(undefined);

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'disabled' | 'onClick'
> {
  /** 视觉类型。 @en Visual variant. */
  variant?: ButtonCommonProps['variant'];
  /** 按钮尺寸。 @en Button size. */
  size?: ButtonCommonProps['size'];
  /** 使用椭圆外观。 @en Uses a pill shape. */
  round?: ButtonCommonProps['round'];
  /** 使用简洁外观。 @en Uses the plain treatment. */
  plain?: ButtonCommonProps['plain'];
  /** 使用幽灵外观。 @en Uses the ghost treatment. */
  ghost?: ButtonCommonProps['ghost'];
  /** 使用文字按钮外观。 @en Uses the text-button treatment. */
  text?: ButtonCommonProps['text'];
  /** 使用链接按钮外观。 @en Uses the link treatment. */
  link?: ButtonCommonProps['link'];
  /** 填满容器宽度。 @en Fills the container width. */
  block?: ButtonCommonProps['block'];
  /** 显示激活状态。 @en Displays the active state. */
  active?: ButtonCommonProps['active'];
  /** 显示加载状态。 @en Displays the loading state. */
  loading?: ButtonCommonProps['loading'];
  /** 禁止交互。 @en Prevents interaction. */
  disabled?: ButtonCommonProps['disabled'];
  /** 按内容收缩宽度。 @en Shrinks to fit the content. */
  autoFit?: ButtonCommonProps['autoFit'];
  /** 边框样式。 @en Border style. */
  borderStyle?: ButtonCommonProps['borderStyle'];
  /** 自定义主题颜色。 @en Custom theme color. */
  color?: ButtonCommonProps['color'];
  /** 前置图标。 @en Leading icon content. */
  icon?: ReactNode;
  /** 后置内容。 @en Trailing content. */
  suffix?: ReactNode;
  /** 原生链接地址，优先级最高。 @en Native href with the highest action priority. */
  href?: ButtonCommonProps['href'];
  /** 链接打开目标。 @en Native link target. */
  target?: ButtonCommonProps['target'];
  /** 交给 Provider navigation adapter 的路由目标。 @en Route target handled by the Provider navigation adapter. */
  to?: unknown;
  /** 是否替换当前路由记录。 @en Whether route navigation replaces the current entry. */
  replace?: ButtonCommonProps['replace'];
  /** 防止重复执行的异步操作。 @en Guarded asynchronous action. */
  asyncAction?: ButtonCommonProps['asyncAction'];
  /** 异步执行期间的视觉状态。 @en Visual state while the async action is running. */
  asyncState?: ButtonCommonProps['asyncState'];
  /** 普通按钮点击事件。 @en Click event for a regular button action. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** 异步操作完成事件。 @en Called after the async action completes successfully. */
  onActionFinished?: () => void;
  /** 异步操作失败事件。 @en Called when the async action rejects. */
  onActionError?: (error: unknown) => void;
}

export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 组内按钮视觉类型。 @en Visual variant inherited by grouped buttons. */
  variant?: ButtonGroupCommonProps['variant'];
  /** 组内按钮尺寸。 @en Size inherited by grouped buttons. */
  size?: ButtonGroupCommonProps['size'];
  /** 组内按钮。 @en Buttons contained by the group. */
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant,
      size,
      round = BUTTON_DEFAULTS.round,
      plain = BUTTON_DEFAULTS.plain,
      ghost = BUTTON_DEFAULTS.ghost,
      text = BUTTON_DEFAULTS.text,
      link = BUTTON_DEFAULTS.link,
      block = BUTTON_DEFAULTS.block,
      active = BUTTON_DEFAULTS.active,
      loading = BUTTON_DEFAULTS.loading,
      disabled = BUTTON_DEFAULTS.disabled,
      autoFit = BUTTON_DEFAULTS.autoFit,
      borderStyle = BUTTON_DEFAULTS.borderStyle,
      color,
      icon,
      suffix,
      href,
      target = BUTTON_DEFAULTS.target,
      to,
      replace = BUTTON_DEFAULTS.replace,
      asyncAction,
      asyncState = BUTTON_DEFAULTS.asyncState,
      onClick,
      onActionFinished,
      onActionError,
      children,
      className,
      style,
      type = 'button',
      ...nativeProps
    },
    ref,
  ): ReactElement {
    const config = useHorizonWebConfig();
    const group = useContext(ButtonGroupContext);
    const effectiveVariant = group?.variant ?? variant ?? BUTTON_DEFAULTS.variant;
    const effectiveSize = size ?? group?.size ?? BUTTON_DEFAULTS.size;
    const classHelper = useMemo(
      () => new ComponentClassBlock('button', config.namespace.toLowerCase()),
      [config.namespace],
    );
    const action = useButtonAction();
    const state = getButtonState({ disabled, loading, pending: action.pending, asyncState });
    const onlyIcon = Boolean((icon || state.loading) && !children && !suffix);
    const appearance = plain
      ? ghost
        ? 'ghost'
        : 'plain'
      : link
        ? 'link'
        : text
          ? 'text'
          : 'default';
    const colorStyle = useMemo(
      () =>
        color
          ? createButtonColorStyle({
              color,
              appearance,
              variant: effectiveVariant,
              namespace: config.namespace,
            })
          : undefined,
      [appearance, color, config.namespace, effectiveVariant],
    );

    async function runAsyncAction(): Promise<void> {
      const result = await action.run(asyncAction!);
      if (result.status === 'completed') onActionFinished?.();
      if (result.status === 'rejected') onActionError?.(result.error);
    }

    function handleClick(event: MouseEvent<HTMLElement>): void {
      const actionKind = resolveButtonAction({
        disabled,
        loading,
        pending: action.pending,
        href,
        route: to,
        canNavigateRoute: Boolean(config.navigate),
        hasAsyncAction: Boolean(asyncAction),
      });

      if (actionKind === 'blocked') {
        event.preventDefault();
        return;
      }
      if (actionKind === 'href') return;
      if (actionKind === 'route') {
        event.preventDefault();
        void config.navigate?.(to, { replace });
        return;
      }
      if (actionKind === 'async') {
        event.preventDefault();
        void runAsyncAction();
        return;
      }
      onClick?.(event);
    }

    const classes = cls(
      classHelper.block,
      classHelper.m(effectiveVariant),
      classHelper.m(effectiveSize),
      classHelper.m('block', block),
      classHelper.m('round', round),
      classHelper.m('plain', plain),
      classHelper.m('text', text),
      classHelper.m('link', link),
      classHelper.m('equally', onlyIcon),
      classHelper.is(borderStyle),
      classHelper.is('loading', state.loading),
      classHelper.is('with-icon', Boolean(icon || state.loading)),
      classHelper.is('auto-fit', autoFit),
      classHelper.is('activated', active),
      classHelper.is('ghost', ghost),
      className,
    );
    const mergedStyle = { ...colorStyle, ...style } as CSSProperties;
    const content = (
      <>
        {state.loading ? (
          <span className={cls(classHelper.e('icon'), classHelper.m('loading'))}>
            <LoadingIcon
              className={`${config.namespace.toLowerCase()}-button__loading-icon`}
              namespace={config.namespace}
            />
          </span>
        ) : (
          icon && <span className={classHelper.e('icon')}>{icon}</span>
        )}
        {children && <span className={classHelper.e('content')}>{children}</span>}
        {suffix && <span className={classHelper.e('suffix')}>{suffix}</span>}
      </>
    );

    if (href) {
      const anchorProps = nativeProps as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          {...anchorProps}
          aria-busy={state.loading || undefined}
          aria-disabled={!state.interactive || undefined}
          className={classes}
          href={href}
          onClick={handleClick}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          style={mergedStyle}
          tabIndex={state.disabled ? -1 : anchorProps.tabIndex}
          target={target}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        {...nativeProps}
        aria-busy={state.loading || undefined}
        className={classes}
        disabled={state.disabled}
        onClick={handleClick}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        style={mergedStyle}
        type={type}
      >
        {content}
      </button>
    );
  },
);

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { variant, size, children, className, role = 'group', ...nativeProps },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const context = useMemo(() => ({ variant, size }), [size, variant]);

  return (
    <ButtonGroupContext.Provider value={context}>
      <div
        {...nativeProps}
        className={cls(`${config.namespace.toLowerCase()}-button-group`, className)}
        ref={ref}
        role={role}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
});

export const HButton = Button;
export const HButtonGroup = ButtonGroup;
