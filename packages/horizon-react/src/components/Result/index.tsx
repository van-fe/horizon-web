import type { HTMLAttributes, MouseEvent, ReactElement } from 'react';
import { forwardRef, useMemo } from 'react';
import type { ResultCommonProps, ResultEventMap, ResultRegionMap } from '@aurora/core';
import { isResultIconType, normalizeResultHttpType, RESULT_DEFAULTS } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import notAllowed from '@aurora/theme/assets/result-not-allowed.svg';
import notFound from '@aurora/theme/assets/result-not-found.svg';
import serverError from '@aurora/theme/assets/result-server-error.svg';
import { Button } from '../Button';
import type { ButtonProps } from '../Button';
import type { ReactEventHandler, ReactRegionContent } from '../_shared/api';

export interface ResultProps
  extends ResultCommonProps<Partial<ButtonProps>>, Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactRegionContent<ResultRegionMap, 'icon'>;
  titleContent?: ReactRegionContent<ResultRegionMap, 'title'>;
  subtitleContent?: ReactRegionContent<ResultRegionMap, 'subtitle'>;
  extra?: ReactRegionContent<ResultRegionMap, 'extra'>;
  onPrimaryClick?: ReactEventHandler<ResultEventMap<MouseEvent<HTMLElement>>, 'primaryClick'>;
  onSecondaryClick?: ReactEventHandler<ResultEventMap<MouseEvent<HTMLElement>>, 'secondaryClick'>;
}

const iconSymbol = { info: 'i', success: '✓', warning: '!', error: '×' } as const;
const statusImage = { 403: notAllowed, 404: notFound, 500: serverError } as const;

export const Result = forwardRef<HTMLDivElement, ResultProps>(function Result(
  {
    title = RESULT_DEFAULTS.title,
    subtitle = RESULT_DEFAULTS.subtitle,
    type = RESULT_DEFAULTS.type,
    size = RESULT_DEFAULTS.size,
    primaryButton = RESULT_DEFAULTS.primaryButton,
    primaryButtonText = 'Confirm',
    primaryButtonProps,
    secondaryButton = RESULT_DEFAULTS.secondaryButton,
    secondaryButtonText = 'Back',
    secondaryButtonProps,
    icon,
    titleContent,
    subtitleContent,
    extra,
    onPrimaryClick,
    onSecondaryClick,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('result', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const status = isResultIconType(type) ? undefined : normalizeResultHttpType(type);
  const visual = isResultIconType(type) ? (
    (icon ?? (
      <span aria-hidden="true" data-result-type={type}>
        {iconSymbol[type]}
      </span>
    ))
  ) : (
    <img alt="" aria-hidden="true" data-result-status={status} src={statusImage[status!]} />
  );
  return (
    <div
      {...nativeProps}
      className={cls(classes.block, classes.is(size), className)}
      ref={ref}
      role="status"
    >
      <div className={isResultIconType(type) ? classes.e('icon') : classes.e('image')}>
        {visual}
      </div>
      <div className={classes.e('title')}>{titleContent ?? title}</div>
      <div className={classes.e('subtitle')}>{subtitleContent ?? subtitle}</div>
      <div className={classes.e('extra')}>
        {extra ?? (
          <div className={classes.em('extra', 'buttons')}>
            {secondaryButton ? (
              <Button {...secondaryButtonProps} onClick={onSecondaryClick} plain size={size}>
                {secondaryButtonText}
              </Button>
            ) : null}
            {primaryButton ? (
              <Button {...primaryButtonProps} onClick={onPrimaryClick} size={size}>
                {primaryButtonText}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
});

export const HResult = Result;
export type { ResultHttpType, ResultIconType, ResultSize, ResultType } from '@aurora/core';
