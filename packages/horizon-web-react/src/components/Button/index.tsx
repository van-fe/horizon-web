import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  BUTTON_DEFAULTS,
  ButtonAsyncActionGuard,
  getButtonState,
  resolveButtonAction,
} from '@aurora/core';
import type { ButtonCommonProps } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { LoadingIcon } from '../_shared/LoadingIcon';

export type { ButtonSize, ButtonVariant } from '@aurora/core';

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'disabled' | 'onClick'
> {
  /** Shared renderer-neutral button configuration. */
  variant?: ButtonCommonProps['variant'];
  size?: ButtonCommonProps['size'];
  round?: ButtonCommonProps['round'];
  plain?: ButtonCommonProps['plain'];
  ghost?: ButtonCommonProps['ghost'];
  text?: ButtonCommonProps['text'];
  link?: ButtonCommonProps['link'];
  block?: ButtonCommonProps['block'];
  active?: ButtonCommonProps['active'];
  loading?: ButtonCommonProps['loading'];
  disabled?: ButtonCommonProps['disabled'];
  autoFit?: ButtonCommonProps['autoFit'];
  borderStyle?: ButtonCommonProps['borderStyle'];
  /** 前置图标。@en Leading icon content. */
  icon?: ReactNode;
  /** 后置内容。@en Trailing content. */
  suffix?: ReactNode;
  /** 原生链接地址，优先级最高。@en Native href with the highest action priority. */
  href?: ButtonCommonProps['href'];
  /** 链接打开目标。@en Native link target. */
  target?: ButtonCommonProps['target'];
  /** 交给 Provider navigation adapter 的路由目标。@en Route target handled by the Provider navigation adapter. */
  to?: unknown;
  /** 是否替换当前路由记录。@en Whether route navigation replaces the current entry. */
  replace?: ButtonCommonProps['replace'];
  /** 防止重复执行的异步操作。@en Guarded asynchronous action. */
  asyncAction?: () => unknown | PromiseLike<unknown>;
  /** 异步执行期间的视觉状态。@en Visual state while the async action is running. */
  asyncState?: ButtonCommonProps['asyncState'];
  /** 普通按钮点击事件。@en Click event for a regular button action. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** 异步操作完成事件。@en Called after the async action completes successfully. */
  onActionFinished?: () => void;
  /** 异步操作失败事件。@en Called when the async action rejects. */
  onActionError?: (error: unknown) => void;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = BUTTON_DEFAULTS.variant,
      size = BUTTON_DEFAULTS.size,
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
      type = 'button',
      ...nativeProps
    },
    ref,
  ): ReactElement {
    const config = useHorizonWebConfig();
    const classHelper = useMemo(
      () => new ComponentClassBlock('button', config.namespace.toLowerCase()),
      [config.namespace],
    );
    const guard = useRef(new ButtonAsyncActionGuard());
    const mounted = useRef(true);
    const [pending, setPending] = useState(false);
    const state = getButtonState({ disabled, loading, pending, asyncState });
    const onlyIcon = Boolean((icon || state.loading) && !children && !suffix);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    async function runAsyncAction(): Promise<void> {
      if (!asyncAction || pending) return;
      setPending(true);
      const result = await guard.current.run(asyncAction);
      if (!mounted.current) return;
      setPending(false);
      if (result.status === 'completed') onActionFinished?.();
      if (result.status === 'rejected') onActionError?.(result.error);
    }

    function handleClick(event: MouseEvent<HTMLElement>): void {
      const action = resolveButtonAction({
        disabled,
        loading,
        pending,
        href,
        route: to,
        canNavigateRoute: Boolean(config.navigate),
        hasAsyncAction: Boolean(asyncAction),
      });

      if (action === 'blocked') {
        event.preventDefault();
        return;
      }
      if (action === 'href') return;
      if (action === 'route') {
        event.preventDefault();
        void config.navigate?.(to, { replace });
        return;
      }
      if (action === 'async') {
        event.preventDefault();
        void runAsyncAction();
        return;
      }
      onClick?.(event);
    }

    const classes = cls(
      classHelper.block,
      classHelper.m(variant),
      classHelper.m(size),
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
        type={type}
      >
        {content}
      </button>
    );
  },
);

export const HButton = Button;
