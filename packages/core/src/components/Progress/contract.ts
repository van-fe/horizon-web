import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const PROGRESS_TYPES = ['line', 'circle', 'dashboard'] as const;
export const PROGRESS_STATUSES = ['success', 'exception', 'error', 'warning'] as const;
export const PROGRESS_SIZES = ['mini', 'small', 'medium', 'large'] as const;
export const PROGRESS_PLACEMENTS = ['', 'follow'] as const;

export type ProgressType = (typeof PROGRESS_TYPES)[number];
export type ProgressStatus = (typeof PROGRESS_STATUSES)[number] | '';
export type ProgressSize = (typeof PROGRESS_SIZES)[number];
export type ProgressPlacement = (typeof PROGRESS_PLACEMENTS)[number];
export type ProgressFormatter = (percentage: number) => string;
export type ProgressColorResolver = (percentage: number) => string;

export interface ProgressColorStop {
  color: string;
  percentage: number;
}

export type ProgressColor =
  | string
  | readonly (string | ProgressColorStop)[]
  | ProgressColorResolver;

export interface ProgressCommonProps {
  /** 进度类型。@en Progress type. */
  type?: ProgressType;
  /** 当前百分比。@en Current percentage. */
  percentage: number;
  /** 当前状态。@en Current status. */
  status?: ProgressStatus;
  /** 动画时长。@en Animation duration. */
  duration?: number;
  /** 进度尺寸。@en Progress size. */
  size?: ProgressSize;
  /** 文本格式化函数。@en Text formatter. */
  format?: ProgressFormatter;
  /** 自定义文本内容。@en Custom text content. */
  content?: string | number | boolean;
  /** 线性文本位置。@en Linear text placement. */
  placement?: ProgressPlacement;
  /** 文本是否加粗。@en Whether text is bold. */
  textBold?: boolean;
  /** 是否显示文本。@en Whether text is shown. */
  showText?: boolean;
  /** 自定义颜色。@en Custom color. */
  color?: ProgressColor;
}

export type ProgressEventMap = EmptyComponentApi;

export interface ProgressRegionMap {
  /** 自定义进度文本。@en Custom progress text. */
  label: EmptyComponentApi;
}

export type ProgressCommandMap = EmptyComponentApi;

export function formatProgressPercentage(percentage: number): string {
  return `${percentage}%`;
}

export const PROGRESS_DEFAULTS = Object.freeze({
  type: 'line',
  status: '',
  duration: 3,
  size: 'medium',
  format: formatProgressPercentage,
  content: '',
  placement: '',
  textBold: false,
  showText: true,
  color: '',
} as const satisfies Required<Omit<ProgressCommonProps, 'percentage'>>);

export function isProgressType(value: unknown): value is ProgressType {
  return PROGRESS_TYPES.includes(value as ProgressType);
}

export function isProgressStatus(value: unknown): value is ProgressStatus {
  return value === '' || PROGRESS_STATUSES.includes(value as Exclude<ProgressStatus, ''>);
}

export function isProgressSize(value: unknown): value is ProgressSize {
  return PROGRESS_SIZES.includes(value as ProgressSize);
}

export function isProgressPlacement(value: unknown): value is ProgressPlacement {
  return PROGRESS_PLACEMENTS.includes(value as ProgressPlacement);
}

export function isProgressPercentage(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
}

export function clampProgressPercentage(percentage: number): number {
  return Math.max(0, Math.min(100, percentage));
}

export function resolveProgressColor(color: ProgressColor, percentage: number): string | undefined {
  if (typeof color === 'function') return color(percentage);
  if (typeof color === 'string') return color || undefined;
  if (color.length === 0) return undefined;

  const span = 100 / color.length;
  const stops = color
    .map((entry, index) =>
      typeof entry === 'string' ? { color: entry, percentage: (index + 1) * span } : entry,
    )
    .sort((left, right) => left.percentage - right.percentage);
  return stops.find(stop => stop.percentage > percentage)?.color ?? stops.at(-1)?.color;
}

export const progressApiContract = defineComponentApiContract<
  ProgressCommonProps,
  ProgressEventMap,
  ProgressRegionMap,
  ProgressCommandMap
>({
  defaults: PROGRESS_DEFAULTS,
  validators: {
    type: isProgressType,
    percentage: isProgressPercentage,
    status: isProgressStatus,
    size: isProgressSize,
    placement: isProgressPlacement,
  },
});
