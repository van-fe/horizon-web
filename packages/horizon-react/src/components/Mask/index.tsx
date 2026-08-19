import type { CSSProperties, HTMLAttributes, MouseEvent, ReactElement, ReactNode } from 'react';
import { forwardRef, useMemo } from 'react';
import type { MaskCommonProps, MaskVariant } from '@aurora/core';
import { MASK_DEFAULTS } from '@aurora/core';
import { resolveMaskRootStyle } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export interface MaskProps
  extends MaskCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'> {
  /** 遮罩上方内容。 @en Content rendered above the scrim. */
  children?: ReactNode;
  /** 遮罩背景 class。 @en Class name applied to the scrim. */
  scrimClassName?: string;
  /** 遮罩背景样式。 @en Style applied to the scrim. */
  scrimStyle?: CSSProperties;
  /** 点击遮罩背景。 @en Called when the scrim background is pressed. */
  onMaskClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Mask = forwardRef<HTMLDivElement, MaskProps>(function Mask(
  {
    variant = MASK_DEFAULTS.variant,
    visible = MASK_DEFAULTS.visible,
    absolute = MASK_DEFAULTS.absolute,
    opacity = MASK_DEFAULTS.opacity,
    color,
    zIndex = MASK_DEFAULTS.zIndex,
    fuzzified = MASK_DEFAULTS.fuzzified,
    contentFullSize = MASK_DEFAULTS.contentFullSize,
    children,
    className,
    scrimClassName,
    scrimStyle,
    onMaskClick,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('mask', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootStyle = resolveMaskRootStyle(visible, zIndex);

  return (
    <div
      {...nativeProps}
      aria-hidden={!visible || undefined}
      className={cls(
        classes.block,
        classes.m(variant),
        classes.is('absolute', absolute),
        classes.is('fuzzified', fuzzified),
        className,
      )}
      inert={!visible || undefined}
      ref={ref}
      style={{ ...style, ...rootStyle }}
    >
      <div
        aria-hidden="true"
        className={cls(classes.e('scrim'), scrimClassName)}
        onClick={onMaskClick}
        style={{ backgroundColor: color, opacity, ...scrimStyle }}
      />
      <div className={cls(classes.e('content'), classes.is('full-size', contentFullSize))}>
        {children}
      </div>
    </div>
  );
});

export const HMask = Mask;
export type { MaskVariant };
