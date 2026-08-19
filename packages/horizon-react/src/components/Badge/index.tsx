import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useMemo } from 'react';
import type { BadgeCommonProps, BadgeRegionMap } from '@aurora/core';
import { BADGE_DEFAULTS, formatBadgeContent } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactRegionContent } from '../_shared/api';

export interface BadgeProps
  extends BadgeCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** 被标记的目标内容。@en Target content receiving the badge. */
  children?: ReactRegionContent<BadgeRegionMap, 'content'>;
  /** 图标徽标内容。@en Icon badge content. */
  icon?: ReactRegionContent<BadgeRegionMap, 'icon'>;
  /** 徽标背景色。@en Badge background color. */
  color?: string;
  /** 图标颜色。@en Icon color. */
  iconColor?: string;
  /** 图标字号。@en Icon font size. */
  iconSize?: number | string;
  /** 徽标的可访问名称。@en Accessible badge label. */
  badgeLabel?: string;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(function Badge(
  {
    type = BADGE_DEFAULTS.type,
    content = BADGE_DEFAULTS.content,
    hidden = BADGE_DEFAULTS.hidden,
    numMax = BADGE_DEFAULTS.numMax,
    bottom = BADGE_DEFAULTS.bottom,
    align = BADGE_DEFAULTS.align,
    offset = BADGE_DEFAULTS.offset,
    children,
    icon,
    color = 'var(--h-bg-error-default)',
    iconColor,
    iconSize = 16,
    badgeLabel,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('badge', config.namespace.toLowerCase()),
    [config.namespace],
  );
  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(type),
        classes.m('bottom', bottom),
        classes.m(align),
        className,
      )}
      ref={ref}
    >
      {children}
      {!hidden && (
        <div
          aria-label={badgeLabel}
          aria-hidden={badgeLabel ? undefined : true}
          className={classes.e('content')}
          style={{
            backgroundColor: color,
            color: iconColor,
            fontSize: iconSize,
            ...(offset as CSSProperties),
          }}
        >
          {type === 'num' && <span>{formatBadgeContent(content, numMax)}</span>}
          {type === 'icon' && (icon ?? content)}
        </div>
      )}
    </div>
  );
});

export const HBadge = Badge;
export type { BadgeAlign, BadgeOffset, BadgeType } from '@aurora/core';
