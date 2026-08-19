import type { HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useMemo } from 'react';
import type { SkeletonCommonProps, SkeletonItemCommonProps, SkeletonRegionMap } from '@aurora/core';
import { SKELETON_DEFAULTS, SKELETON_ITEM_DEFAULTS } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactRegionContent } from '../_shared/api';

export interface SkeletonProps
  extends SkeletonCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 加载完成后的内容。@en Loaded content. */
  children?: ReactRegionContent<SkeletonRegionMap, 'content'>;
  /** 自定义骨架模板。@en Custom placeholder template. */
  placeholder?: ReactRegionContent<SkeletonRegionMap, 'placeholder'>;
}

export interface SkeletonItemProps
  extends SkeletonItemCommonProps, HTMLAttributes<HTMLDivElement> {}

export const SkeletonItem = forwardRef<HTMLDivElement, SkeletonItemProps>(function SkeletonItem(
  { shape = SKELETON_ITEM_DEFAULTS.shape, className, ...nativeProps },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('skeleton__item', config.namespace.toLowerCase()),
    [config.namespace],
  );
  return (
    <div
      {...nativeProps}
      aria-hidden="true"
      className={cls(classes.block, classes.e(shape), className)}
      ref={ref}
    />
  );
});

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    loading = SKELETON_DEFAULTS.loading,
    animated = SKELETON_DEFAULTS.animated,
    placeholder,
    children,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('skeleton', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const defaultPlaceholder = (
    <div>
      <SkeletonItem shape="text" />
      <SkeletonItem shape="text" />
      <SkeletonItem shape="text" style={{ width: '55%' }} />
    </div>
  );

  return (
    <div {...nativeProps} aria-busy={loading} className={cls(classes.block, className)} ref={ref}>
      {loading ? (
        <div className={cls(classes.e('animated', animated))}>
          {placeholder ?? defaultPlaceholder}
        </div>
      ) : (
        <div className={classes.e('content')}>{children}</div>
      )}
    </div>
  );
});

export const HSkeleton = Skeleton;
export const HSkeletonItem = SkeletonItem;
export type { SkeletonShape } from '@aurora/core';
