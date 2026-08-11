import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const ALERT_TYPES = ['success', 'info', 'warning', 'error'] as const;
export const ALERT_SIZES = ['small', 'medium'] as const;

export type AlertType = (typeof ALERT_TYPES)[number];
export type AlertSize = (typeof ALERT_SIZES)[number];
export type AlertClose = () => void;
export type AlertActionHandler = (close: AlertClose) => void;

export interface AlertCommonProps {
  title?: string;
  description?: string;
  type?: AlertType;
  closable?: boolean;
  primaryButtonText?: string;
  defaultButtonText?: string;
  showIcon?: boolean;
  size?: AlertSize;
  onPrimary?: AlertActionHandler;
  onDefault?: AlertActionHandler;
  rounded?: boolean;
}

export interface AlertEventMap<CloseEvent = unknown> {
  close: [event: CloseEvent];
}

export interface AlertRegionMap {
  content: EmptyComponentApi;
}

export type AlertCommandMap = EmptyComponentApi;

export const ALERT_DEFAULTS = Object.freeze({
  title: '',
  description: '',
  type: 'info',
  closable: true,
  primaryButtonText: '',
  defaultButtonText: '',
  showIcon: false,
  size: 'medium',
  rounded: true,
} as const satisfies Required<Omit<AlertCommonProps, 'onPrimary' | 'onDefault'>>);

export function isAlertType(value: unknown): value is AlertType {
  return ALERT_TYPES.includes(value as AlertType);
}

export function isAlertSize(value: unknown): value is AlertSize {
  return ALERT_SIZES.includes(value as AlertSize);
}

export function isAssertiveAlert(type: AlertType): boolean {
  return type === 'error' || type === 'warning';
}

export const alertApiContract = defineComponentApiContract<
  AlertCommonProps,
  AlertEventMap,
  AlertRegionMap,
  AlertCommandMap
>({ defaults: ALERT_DEFAULTS, validators: { type: isAlertType, size: isAlertSize } });
