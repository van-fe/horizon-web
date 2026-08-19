import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode, SyntheticEvent } from 'react';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import type { AvatarCommonProps, AvatarEventMap, AvatarRegionMap } from '@aurora/core';
import { AVATAR_DEFAULTS, getAvatarInitials } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactEventHandler, ReactRegionContent } from '../_shared/api';

export interface AvatarProps
  extends AvatarCommonProps, Omit<HTMLAttributes<HTMLSpanElement>, 'onError'> {
  /** 自定义头像内容。@en Custom avatar content. */
  children?: ReactRegionContent<AvatarRegionMap, 'content'>;
  /** 图片失败后的内容。@en Content rendered after an image error. */
  fallback?: ReactRegionContent<AvatarRegionMap, 'fallback'>;
  /** 图标内容。@en Icon content. */
  icon?: ReactNode;
  /** 无有效来源时的候选图片。@en Candidate images used without a valid source. */
  randomSrc?: readonly string[];
  /** 图片替代文本。@en Image alternative text. */
  alt?: string;
  /** 图片加载失败回调。@en Called when the image fails to load. */
  onError?: ReactEventHandler<AvatarEventMap<SyntheticEvent<HTMLImageElement>>, 'error'>;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    size = AVATAR_DEFAULTS.size,
    src,
    fit = AVATAR_DEFAULTS.fit,
    type = AVATAR_DEFAULTS.type,
    fallbackSrc = AVATAR_DEFAULTS.fallbackSrc,
    children,
    fallback,
    icon,
    randomSrc = [],
    alt = '',
    onError,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('avatar', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const sources = Array.isArray(src) ? src.slice(0, 9) : [];
  const imageSource = failed
    ? fallbackSrc
    : typeof src === 'string' && src
      ? src
      : (randomSrc[0] ?? fallbackSrc);
  const numericStyle = typeof size === 'number' ? { width: size, height: size } : undefined;
  let content: ReactNode;
  if (children != null) content = children;
  else if (failed && fallback != null) content = fallback;
  else if (icon != null) content = <span className={classes.e('icon')}>{icon}</span>;
  else if (type === 'work' && typeof src === 'string')
    content = <span className={classes.e('txt')}>{getAvatarInitials(src)}</span>;
  else if (sources.length > 0) {
    content = (
      <span
        className={classes.e('group')}
        style={{ gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(sources.length))}, 1fr)` }}
      >
        {sources.map((source, index) => (
          <img alt="" className={classes.e('group-img')} key={`${source}-${index}`} src={source} />
        ))}
      </span>
    );
  } else {
    content = (
      <img
        alt={alt}
        className={classes.e('img')}
        onError={event => {
          setFailed(true);
          onError?.(event);
        }}
        src={imageSource}
        style={{ objectFit: fit }}
      />
    );
  }
  return (
    <span
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(String(size), typeof size === 'string'),
        classes.m(type),
        classes.m('error', failed),
        className,
      )}
      ref={ref}
      style={{ ...style, ...numericStyle } as CSSProperties}
    >
      {content}
    </span>
  );
});

export const HAvatar = Avatar;
export type { AvatarFit, AvatarPresetSize, AvatarSize, AvatarType } from '@aurora/core';
