import type { HTMLAttributes, ReactElement } from 'react';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import type { SpinCommonProps, SpinRegionMap } from '@aurora/core';
import { SPIN_DEFAULTS } from '@aurora/core';
import { createSpinVisibilityController } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import type { ReactRegionContent } from '../_shared/api';

export interface SpinProps
  extends SpinCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 被加载状态覆盖的内容。 @en Content covered by the loading state. */
  children?: ReactRegionContent<SpinRegionMap, 'content'>;
  /** 自定义加载指示器。 @en Custom loading indicator. */
  indicator?: ReactRegionContent<SpinRegionMap, 'indicator'>;
  /** 自定义提示内容。 @en Custom tip content. */
  tipContent?: ReactRegionContent<SpinRegionMap, 'tip'>;
}

function DefaultSpinIndicator({ className }: { className: string }): ReactElement {
  return (
    <svg aria-hidden="true" className={className} focusable="false" viewBox="25 25 50 50">
      <circle className="h-spin__icon-path" cx="50" cy="50" fill="none" r="20" strokeWidth="4.8" />
    </svg>
  );
}

export const Spin = forwardRef<HTMLDivElement, SpinProps>(function Spin(
  {
    spinning = SPIN_DEFAULTS.spinning,
    size = SPIN_DEFAULTS.size,
    delay = SPIN_DEFAULTS.delay,
    tip,
    mask = SPIN_DEFAULTS.mask,
    fullscreen = SPIN_DEFAULTS.fullscreen,
    children,
    indicator,
    tipContent,
    className,
    ...nativeProps
  },
  ref,
): ReactElement | null {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('spin', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [visible, setVisible] = useState(spinning && delay <= 0);

  useEffect(() => {
    const controller = createSpinVisibilityController({
      spinning,
      delay,
      onVisibleChange: setVisible,
    });
    return () => controller.destroy();
  }, [delay, spinning]);

  const hasContent = children !== undefined && children !== null;
  const label = tip || config.spinLabels.loading;
  const renderedIndicator = (
    <div aria-label={label} aria-live="polite" className={classes.e('indicator')} role="status">
      {indicator ?? <DefaultSpinIndicator className={classes.e('icon')} />}
      {tipContent || tip ? <div className={classes.e('tip')}>{tipContent ?? tip}</div> : null}
    </div>
  );
  const rootClasses = cls(
    classes.block,
    classes.m(size),
    classes.is('nested', hasContent),
    classes.is('fullscreen', fullscreen),
    classes.is('masked', mask && hasContent),
    className,
  );

  if (!hasContent) {
    return visible ? (
      <div {...nativeProps} className={rootClasses} ref={ref}>
        {renderedIndicator}
      </div>
    ) : null;
  }

  return (
    <div {...nativeProps} aria-busy={spinning} className={rootClasses} ref={ref}>
      <div className={classes.e('content')}>{children}</div>
      {visible ? <div className={classes.e('overlay')}>{renderedIndicator}</div> : null}
    </div>
  );
});

export const HSpin = Spin;
export type { SpinSize } from '@aurora/core';
