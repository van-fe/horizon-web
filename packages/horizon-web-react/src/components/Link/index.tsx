import type {
  AnchorHTMLAttributes,
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef, useEffect, useMemo } from 'react';
import type {
  AdaptComponentApiShape,
  ComponentEventHandlers,
  LinkCommonProps,
  LinkEventMap,
  LinkRegionMap,
} from '@aurora/core';
import {
  getLinkLoadingIconSize,
  isLinkActionRole,
  LINK_DEFAULTS,
  resolveLinkAction,
} from '@aurora/core';
import type { LinkScrollTarget } from '@aurora/horizon-web-core';
import { scrollLinkAnchor } from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { LoadingIcon } from '../_shared/LoadingIcon';

type LinkReactEventMap = AdaptComponentApiShape<
  LinkEventMap<MouseEvent<HTMLElement>>,
  {
    click: 'onClick';
  }
>;

type LinkReactCallbacks = ComponentEventHandlers<LinkReactEventMap>;

type LinkReactRegions = AdaptComponentApiShape<
  { [Name in keyof LinkRegionMap]?: ReactNode },
  { content: 'children' }
>;

type LinkReactCommonProps = AdaptComponentApiShape<LinkCommonProps, { route: 'to' }>;

export type LinkProps = LinkReactCommonProps &
  LinkReactCallbacks &
  LinkReactRegions &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'children' | 'href' | 'onClick' | 'prefix' | 'size' | 'suffix' | 'target' | 'type'
  > & {
    /** 前缀图标或内容。@en Leading icon or content. */
    icon?: ReactNode;
    /** 图标尺寸。@en Icon size. */
    iconSize?: string | number;
    /** 锚点滚动容器或选择器。@en Anchor scroll container or selector. */
    scrollTarget?: LinkScrollTarget;
  };

export const Link = forwardRef<HTMLAnchorElement | HTMLSpanElement, LinkProps>(function Link(
  {
    variant = LINK_DEFAULTS.variant,
    size = LINK_DEFAULTS.size,
    underline = LINK_DEFAULTS.underline,
    disabled = LINK_DEFAULTS.disabled,
    href,
    target,
    attribute = LINK_DEFAULTS.attribute,
    anchor,
    anchorPosition = LINK_DEFAULTS.anchorPosition,
    anchorOffset = LINK_DEFAULTS.anchorOffset,
    to,
    replace = LINK_DEFAULTS.replace,
    loading = LINK_DEFAULTS.loading,
    prefix,
    suffix,
    icon,
    iconSize,
    scrollTarget = 'body',
    children,
    onClick,
    onKeyDown,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('link', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const routeHref = to === undefined ? undefined : config.resolveHref?.(to);
  const resolvedHref = to === undefined ? href : (routeHref ?? href);
  const actionRole = isLinkActionRole(anchor, resolvedHref);
  const inactive = disabled || loading;

  function scrollToCurrent(link: Element): void {
    const scrolled = scrollLinkAnchor({
      anchor: anchor ?? '',
      link,
      target: scrollTarget,
      offset: anchorOffset,
    });
    if (!scrolled) console.warn('Cannot find scroll-target');
  }

  useEffect(() => {
    if (!anchor || typeof window === 'undefined') return;
    if (window.location.hash.replace(/^#/, '') !== anchor) return;
    const link = document.getElementById(anchor);
    if (link) scrollToCurrent(link);
  }, [anchor]);

  function handleClick(event: MouseEvent<HTMLElement>): void {
    const action = resolveLinkAction({
      disabled,
      loading,
      anchor,
      route: to,
      canNavigateRoute: Boolean(config.navigate),
      href: resolvedHref,
    });

    if (action === 'blocked' || action === 'anchor') {
      event.preventDefault();
      return;
    }
    if (action === 'route') {
      event.preventDefault();
      void config.navigate?.(to, { replace });
      return;
    }
    onClick?.(event);
  }

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>): void {
    event.stopPropagation();
    event.preventDefault();
    if (inactive || !anchor) return;
    const link = event.currentTarget.parentElement;
    if (link) scrollToCurrent(link);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>): void {
    onKeyDown?.(event);
    if (event.defaultPrevented || !actionRole || inactive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  const rootClassName = cls(
    classes.block,
    classes.m(variant),
    classes.m(size),
    classes.is('disabled', disabled),
    classes.has('underline', Boolean(underline)),
    classes.is('underline-always', underline === 'always'),
    classes.has('attribute', attribute),
    classes.has('anchor', Boolean(anchor)),
    classes.is('anchor-left', anchorPosition === 'left'),
    className,
  );
  const content = loading ? (
    <>
      <LoadingIcon
        className={classes.e('loading-icon')}
        namespace={config.namespace}
        size={getLinkLoadingIconSize(size)}
      />
      <span className={classes.e('inner')}>{config.linkLabels.loading}</span>
    </>
  ) : (
    <>
      {prefix !== undefined && <span className={classes.e('prefix')}>{prefix}</span>}
      <span className={classes.e('inner')}>{children}</span>
      {suffix !== undefined && <span className={classes.e('suffix')}>{suffix}</span>}
      {icon !== undefined && (
        <span className={classes.e('suffix')} style={{ fontSize: iconSize }}>
          {icon}
        </span>
      )}
      {anchor && (
        <a
          aria-disabled={inactive || undefined}
          className={classes.e('anchor')}
          href={`#${anchor}`}
          onClick={handleAnchorClick}
          tabIndex={inactive ? -1 : undefined}
          target={target}
        >
          #
        </a>
      )}
    </>
  );

  if (anchor) {
    return (
      <span
        {...nativeProps}
        aria-busy={loading || undefined}
        aria-disabled={inactive || undefined}
        className={rootClassName}
        id={anchor}
        ref={ref as ForwardedRef<HTMLSpanElement>}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      {...nativeProps}
      aria-busy={loading || undefined}
      aria-disabled={inactive || undefined}
      className={rootClassName}
      href={inactive ? undefined : resolvedHref}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={ref as ForwardedRef<HTMLAnchorElement>}
      role={actionRole ? 'button' : undefined}
      tabIndex={inactive ? -1 : actionRole ? 0 : nativeProps.tabIndex}
      target={target}
    >
      {content}
    </a>
  );
});

export const HLink = Link;
