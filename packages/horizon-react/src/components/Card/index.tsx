import type { HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useMemo } from 'react';
import type { CardCommonProps, CardRegionMap } from '@aurora/core';
import { CARD_DEFAULTS } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactRegionContent } from '../_shared/api';

export interface CardProps extends CardCommonProps, HTMLAttributes<HTMLElement> {
  /** 卡片主体内容。@en Card body content. */
  children?: ReactRegionContent<CardRegionMap, 'content'>;
  /** 卡片头部内容。@en Card header content. */
  header?: ReactRegionContent<CardRegionMap, 'header'>;
  /** 卡片底部内容。@en Card footer content. */
  footer?: ReactRegionContent<CardRegionMap, 'footer'>;
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    title = CARD_DEFAULTS.title,
    topDivider = CARD_DEFAULTS.topDivider,
    bottomDivider = CARD_DEFAULTS.bottomDivider,
    radius = CARD_DEFAULTS.radius,
    border = CARD_DEFAULTS.border,
    header,
    footer,
    children,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('card', config.namespace.toLowerCase()),
    [config.namespace],
  );

  return (
    <section
      {...nativeProps}
      className={cls(classes.block, classes.m(radius), classes.is('border', border), className)}
      ref={ref}
    >
      {title ? <header className={classes.e('header')}>{title}</header> : header}
      {topDivider ? <div aria-hidden="true" className={classes.e('divider')} /> : null}
      <div className={classes.e('content')}>{children}</div>
      {bottomDivider ? <div aria-hidden="true" className={classes.e('divider')} /> : null}
      {footer ? <footer>{footer}</footer> : null}
    </section>
  );
});

export const HCard = Card;
export type { CardRadius } from '@aurora/core';
