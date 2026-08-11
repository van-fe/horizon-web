import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useMemo } from 'react';
import type { EmptyCommonProps, EmptyRegionMap } from '@aurora/core';
import { EMPTY_DEFAULTS } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import defaultImage from '@aurora/theme/assets/empty-default.svg';
import { useHorizonWebConfig } from '../../provider';
import type { ReactRegionContent } from '../_shared/api';

export interface EmptyProps
  extends EmptyCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactRegionContent<EmptyRegionMap, 'footer'>;
  imageContent?: ReactRegionContent<EmptyRegionMap, 'image'>;
  descriptionContent?: ReactRegionContent<EmptyRegionMap, 'description'>;
  imageAlt?: string;
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  {
    image,
    size = EMPTY_DEFAULTS.size,
    description,
    children,
    imageContent,
    descriptionContent,
    imageAlt = '',
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('empty', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const numericStyle: CSSProperties | undefined =
    typeof size === 'number' ? { width: size } : undefined;
  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(typeof size === 'string' ? size : undefined),
        className,
      )}
      ref={ref}
    >
      <div className={classes.e('image')} style={numericStyle}>
        {imageContent ?? <img alt={imageAlt} src={image || defaultImage} />}
      </div>
      {description || descriptionContent ? (
        <div className={classes.e('description')}>{descriptionContent ?? description}</div>
      ) : null}
      {children ? <div className={classes.e('bottom')}>{children}</div> : null}
    </div>
  );
});

export const HEmpty = Empty;
export type { EmptyPresetSize, EmptySize } from '@aurora/core';
