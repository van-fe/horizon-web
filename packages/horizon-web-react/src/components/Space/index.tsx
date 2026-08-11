import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Children, Fragment, forwardRef, isValidElement, useMemo } from 'react';
import type { SpaceCommonProps, SpaceRegionMap, SpaceSize } from '@aurora/core';
import { resolveSpaceAlign, SPACE_DEFAULTS } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Divider } from '../Divider';
import type { ReactRegionContent } from '../_shared/api';

export interface SpaceProps
  extends SpaceCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 被排列的内容。@en Arranged content. */
  children?: ReactRegionContent<SpaceRegionMap, 'content'>;
  /** 默认分割线或自定义分隔内容。@en Default divider or custom separator content. */
  separator?: ReactRegionContent<SpaceRegionMap, 'separator'> | boolean;
}

export type SpaceItemProps = HTMLAttributes<HTMLDivElement>;

function gapValue(size: SpaceSize): string | undefined {
  if (Array.isArray(size))
    return size.map(value => (typeof value === 'number' ? `${value}px` : value)).join(' ');
  if (typeof size === 'number') return `${size}px`;
  return ['small', 'medium', 'large'].includes(size) ? undefined : size;
}

function flattenChildren(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(child => {
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      return flattenChildren(child.props.children);
    }
    return [child];
  });
}

export const SpaceItem = forwardRef<HTMLDivElement, SpaceItemProps>(function SpaceItem(props, ref) {
  return <div {...props} ref={ref} />;
});

export const Space = forwardRef<HTMLDivElement, SpaceProps>(function Space(
  {
    block = SPACE_DEFAULTS.block,
    align,
    size = SPACE_DEFAULTS.size,
    direction = SPACE_DEFAULTS.direction,
    wrap = SPACE_DEFAULTS.wrap,
    separator = false,
    children,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('space', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const resolvedAlign = resolveSpaceAlign(direction, align);
  const preset = typeof size === 'string' && ['small', 'medium', 'large'].includes(size);
  const items = flattenChildren(children);
  const separatorNode =
    separator === true ? (
      <Divider
        direction={direction === 'horizontal' ? 'vertical' : 'horizontal'}
        horizontalMargin={0}
        verticalMargin={0}
      />
    ) : (
      separator || null
    );
  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m('block', block),
        classes.m(direction),
        classes.m(resolvedAlign!, Boolean(resolvedAlign)),
        classes.m('wrap', direction === 'horizontal' && wrap),
        classes.m(String(size), preset),
        className,
      )}
      ref={ref}
      style={{ ...style, gap: gapValue(size) ?? style?.gap } as CSSProperties}
    >
      {items.map((child, index) => (
        <Fragment key={index}>
          {isValidElement(child) && child.type === SpaceItem ? (
            child
          ) : (
            <SpaceItem>{child}</SpaceItem>
          )}
          {separatorNode && index < items.length - 1 ? separatorNode : null}
        </Fragment>
      ))}
    </div>
  );
});

export const HSpace = Space;
export const HSpaceItem = SpaceItem;
export type { SpaceAlign, SpaceDirection, SpacePresetSize, SpaceSize } from '@aurora/core';
