import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const RESULT_ICON_TYPES = ['info', 'success', 'warning', 'error'] as const;
export const RESULT_HTTP_TYPES = [403, 404, 500, '403', '404', '500'] as const;
export const RESULT_SIZES = ['small', 'medium', 'large'] as const;
export type ResultIconType = (typeof RESULT_ICON_TYPES)[number];
export type ResultHttpType = (typeof RESULT_HTTP_TYPES)[number];
export type ResultType = ResultIconType | ResultHttpType;
export type ResultSize = (typeof RESULT_SIZES)[number];

export interface ResultCommonProps<ButtonOptions = unknown> {
  title?: string;
  subtitle?: string;
  type?: ResultType;
  size?: ResultSize;
  primaryButton?: boolean;
  primaryButtonText?: string;
  primaryButtonProps?: ButtonOptions;
  secondaryButton?: boolean;
  secondaryButtonText?: string;
  secondaryButtonProps?: ButtonOptions;
}

export interface ResultEventMap<PressEvent = unknown> {
  primaryClick: [event: PressEvent];
  secondaryClick: [event: PressEvent];
}
export interface ResultRegionMap {
  icon: EmptyComponentApi;
  title: EmptyComponentApi;
  subtitle: EmptyComponentApi;
  extra: EmptyComponentApi;
}
export type ResultCommandMap = EmptyComponentApi;

export const RESULT_DEFAULTS = Object.freeze({
  title: '',
  subtitle: '',
  type: 'success',
  size: 'medium',
  primaryButton: true,
  secondaryButton: true,
} as const);

export function isResultType(value: unknown): value is ResultType {
  return (
    RESULT_ICON_TYPES.includes(value as ResultIconType) ||
    RESULT_HTTP_TYPES.includes(value as ResultHttpType)
  );
}
export function isResultSize(value: unknown): value is ResultSize {
  return RESULT_SIZES.includes(value as ResultSize);
}
export function isResultIconType(value: ResultType): value is ResultIconType {
  return RESULT_ICON_TYPES.includes(value as ResultIconType);
}
export function normalizeResultHttpType(value: ResultHttpType): 403 | 404 | 500 {
  return Number(value) as 403 | 404 | 500;
}

export const resultApiContract = defineComponentApiContract<
  ResultCommonProps,
  ResultEventMap,
  ResultRegionMap,
  ResultCommandMap
>({
  defaults: RESULT_DEFAULTS,
  validators: { type: isResultType, size: isResultSize },
});
