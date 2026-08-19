import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import { forwardRef, useMemo, useState } from 'react';
import type { AlertCommonProps, AlertEventMap, AlertRegionMap } from '@aurora/core';
import { ALERT_DEFAULTS, isAssertiveAlert } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Button } from '../Button';
import type { ReactEventHandler, ReactRegionContent } from '../_shared/api';

type AlertCloseEvent = MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>;

export interface AlertProps
  extends AlertCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClose' | 'title'> {
  children?: ReactRegionContent<AlertRegionMap, 'content'>;
  icon?: ReactNode;
  onClose?: ReactEventHandler<AlertEventMap<AlertCloseEvent>, 'close'>;
}

const statusSymbol = { success: '✓', info: 'i', warning: '!', error: '×' } as const;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    title = ALERT_DEFAULTS.title,
    description = ALERT_DEFAULTS.description,
    type = ALERT_DEFAULTS.type,
    closable = ALERT_DEFAULTS.closable,
    primaryButtonText = ALERT_DEFAULTS.primaryButtonText,
    defaultButtonText = ALERT_DEFAULTS.defaultButtonText,
    showIcon = ALERT_DEFAULTS.showIcon,
    size = ALERT_DEFAULTS.size,
    onPrimary,
    onDefault,
    rounded = ALERT_DEFAULTS.rounded,
    children,
    icon,
    onClose,
    className,
    ...nativeProps
  },
  ref,
): ReactElement | null {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('alert', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const close = (): void => setVisible(false);
  const showActions = Boolean(primaryButtonText || defaultButtonText);
  const assertive = isAssertiveAlert(type);
  return (
    <div
      {...nativeProps}
      aria-live={assertive ? 'assertive' : 'polite'}
      className={cls(
        classes.block,
        classes.is('round', rounded),
        classes.m(type),
        classes.m(size),
        className,
      )}
      ref={ref}
      role={assertive ? 'alert' : 'status'}
    >
      {showIcon ? (
        <div aria-hidden="true" className={classes.e('icon-box')}>
          {icon ?? statusSymbol[type]}
        </div>
      ) : null}
      <div className={classes.e('content')}>
        <div className={cls(classes.e('container'), classes.em('container', size))}>
          {title ? <span className={classes.e('title')}>{title}</span> : null}
          <p className={classes.e('description')}>{children ?? description}</p>
        </div>
      </div>
      {showActions ? (
        <div className={cls(classes.e('action'), classes.em('action', size))}>
          {primaryButtonText ? (
            <Button link onClick={() => onPrimary?.(close)} size="small">
              {primaryButtonText}
            </Button>
          ) : null}
          {defaultButtonText ? (
            <Button link onClick={() => onDefault?.(close)} size="small" variant="normal">
              {defaultButtonText}
            </Button>
          ) : null}
        </div>
      ) : null}
      {!showActions && closable ? (
        <button
          aria-label="Close alert"
          className={classes.e('close-btn')}
          onClick={event => {
            close();
            onClose?.(event);
          }}
          type="button"
        >
          ×
        </button>
      ) : null}
    </div>
  );
});

export const HAlert = Alert;
export type { AlertActionHandler, AlertSize, AlertType } from '@aurora/core';
