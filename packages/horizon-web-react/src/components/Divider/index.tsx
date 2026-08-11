import type { HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useMemo } from 'react';
import type { DividerCommonProps, DividerRegionMap } from '@aurora/core';
import { DIVIDER_DEFAULTS, normalizeDividerVariant } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactRegionContent } from '../_shared/api';

export interface DividerProps
  extends DividerCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 分割线标题。@en Divider title. */
  children?: ReactRegionContent<DividerRegionMap, 'title'>;
}

function cssLength(value: string | number | undefined): string | undefined {
  return typeof value === 'number' ? `${value}px` : value;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    variant = DIVIDER_DEFAULTS.variant,
    direction = DIVIDER_DEFAULTS.direction,
    lineStyle = DIVIDER_DEFAULTS.lineStyle,
    titlePlacement = DIVIDER_DEFAULTS.titlePlacement,
    verticalMargin,
    horizontalMargin,
    children,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('divider', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const variableNamespace = config.namespace.toLowerCase();
  const borderStyle = { [`border${direction === 'horizontal' ? 'Top' : 'Right'}Style`]: lineStyle };
  const margin =
    direction === 'horizontal'
      ? `${cssLength(horizontalMargin) ?? `var(--${variableNamespace}-divider-spacing-horizontal-margin)`} 0`
      : `0 ${cssLength(verticalMargin) ?? `var(--${variableNamespace}-divider-spacing-vertical-margin)`}`;
  return (
    <div
      {...nativeProps}
      aria-orientation={direction}
      className={cls(
        classes.block,
        classes.m(direction),
        classes.m(normalizeDividerVariant(variant)),
        classes.m(`title-${titlePlacement}`),
        className,
      )}
      ref={ref}
      role="separator"
      style={{ ...style, margin }}
    >
      <div className={classes.e('line-left')} style={borderStyle} />
      {children != null && (
        <>
          <span className={classes.e('title')}>{children}</span>
          <div className={classes.e('line-right')} style={borderStyle} />
        </>
      )}
    </div>
  );
});

export const HDivider = Divider;
export type {
  DividerDirection,
  DividerLineStyle,
  DividerTitlePlacement,
  DividerVariant,
} from '@aurora/core';
