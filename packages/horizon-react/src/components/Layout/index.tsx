import type { CSSProperties, ElementType, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import type { GridCommonProps, GridItemCommonProps, ResolvedGridContainer } from '@aurora/core';
import { resolveGridContainer } from '@aurora/core';
import { resolveGridContainerStyle, resolveGridItemStyle } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

interface ContentProps {
  /** 网格内容。 @en Grid content. */
  children?: ReactNode;
}

export interface GridProps
  extends
    GridCommonProps<ElementType>,
    Omit<HTMLAttributes<HTMLElement>, 'children' | 'style'>,
    ContentProps {
  /** 原生行内样式。 @en Native inline styles. */
  style?: CSSProperties;
}

export interface GridItemProps
  extends
    GridItemCommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'>,
    ContentProps {
  /** 原生行内样式。 @en Native inline styles. */
  style?: CSSProperties;
}

const defaultGrid = resolveGridContainer({ cols: 24 });
const GridContext = createContext<ResolvedGridContainer>(defaultGrid);

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  { span, offset, children, className, style, ...nativeProps },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const namespace = config.namespace.toLowerCase();
  const classes = useMemo(() => new ComponentClassBlock('grid-item', namespace), [namespace]);
  const grid = useContext(GridContext);
  const gridStyle = useMemo(
    () => resolveGridItemStyle({ span, offset }, grid, 'block', namespace),
    [span, offset, grid, namespace],
  );

  return (
    <div
      {...nativeProps}
      className={cls(classes.block, className)}
      ref={ref}
      style={{ ...(gridStyle as CSSProperties), ...style }}
    >
      {children}
    </div>
  );
});

const GridRoot = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    tag: Tag = 'div',
    cols,
    gap,
    columnGap,
    rowGap,
    align,
    justify,
    children,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const namespace = config.namespace.toLowerCase();
  const classes = useMemo(() => new ComponentClassBlock('grid', namespace), [namespace]);
  const resolved = useMemo(
    () => resolveGridContainerStyle({ cols, gap, columnGap, rowGap, align, justify }, namespace),
    [cols, gap, columnGap, rowGap, align, justify, namespace],
  );

  return (
    <GridContext.Provider value={resolved.context}>
      <Tag
        {...nativeProps}
        className={cls(classes.block, className)}
        ref={ref}
        style={{ ...(resolved.style as CSSProperties), ...style }}
      >
        {children}
      </Tag>
    </GridContext.Provider>
  );
});

GridRoot.displayName = 'Grid';
GridItem.displayName = 'GridItem';

export const Grid = Object.assign(GridRoot, { Item: GridItem });
export const HGrid = Grid;
export const HGridItem = GridItem;
export type { GridAlignment, GridBreakpoint, GridResponsiveValue, GridValue } from '@aurora/core';
