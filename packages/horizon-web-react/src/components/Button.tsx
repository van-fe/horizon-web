import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { ButtonAsyncActionGuard, getButtonState, resolveButtonAction } from '@aurora/core';
import type { ButtonAsyncState } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../provider';
import { LoadingIcon } from './LoadingIcon';

export type ButtonVariant = 'primary' | 'normal' | 'danger';
export type ButtonSize = 'huge' | 'large' | 'medium' | 'small';

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'disabled' | 'onClick'
> {
  /** 按钮视觉类型。@en Visual variant of the button. */
  variant?: ButtonVariant;
  /** 按钮尺寸。@en Size of the button. */
  size?: ButtonSize;
  /** 是否为椭圆按钮。@en Whether the button uses a pill shape. */
  round?: boolean;
  /** 是否为简洁按钮。@en Whether the button uses the plain treatment. */
  plain?: boolean;
  /** 是否为幽灵按钮。@en Whether the button uses the ghost treatment. */
  ghost?: boolean;
  /** 是否为文字按钮。@en Whether the button uses the text treatment. */
  text?: boolean;
  /** 是否为链接视觉。@en Whether the button uses the link treatment. */
  link?: boolean;
  /** 是否填满容器。@en Whether the button fills its container. */
  block?: boolean;
  /** 是否处于激活态。@en Whether the button is active. */
  active?: boolean;
  /** 是否处于加载态。@en Whether the button is loading. */
  loading?: boolean;
  /** 是否禁用。@en Whether the button is disabled. */
  disabled?: boolean;
  /** 是否按内容收缩。@en Whether the button auto-fits its content. */
  autoFit?: boolean;
  /** 按钮边框样式。@en Border style of the button. */
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  /** 前置图标。@en Leading icon content. */
  icon?: ReactNode;
  /** 后置内容。@en Trailing content. */
  suffix?: ReactNode;
  /** 原生链接地址，优先级最高。@en Native href with the highest action priority. */
  href?: string;
  /** 链接打开目标。@en Native link target. */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** 交给 Provider navigation adapter 的路由目标。@en Route target handled by the Provider navigation adapter. */
  to?: unknown;
  /** 是否替换当前路由记录。@en Whether route navigation replaces the current entry. */
  replace?: boolean;
  /** 防止重复执行的异步操作。@en Guarded asynchronous action. */
  asyncAction?: () => unknown | PromiseLike<unknown>;
  /** 异步执行期间的视觉状态。@en Visual state while the async action is running. */
  asyncState?: ButtonAsyncState;
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
      variant = 'primary',
      size = 'medium',
      round = false,
      plain = false,
      ghost = false,
      text = false,
      link = false,
      block = false,
      active = false,
      loading = false,
      disabled = false,
      autoFit = false,
      borderStyle = 'solid',
      icon,
      suffix,
      href,
      target = '_self',
      to,
      replace = false,
      asyncAction,
      asyncState = 'none',
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
            <LoadingIcon namespace={config.namespace} />
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
