import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const SPIN_SIZES = ['small', 'medium', 'large'] as const;

export type SpinSize = (typeof SPIN_SIZES)[number];

export interface SpinCommonProps {
  /** 是否处于加载状态。 @en Whether the component is loading. */
  spinning?: boolean;
  /** 加载指示器尺寸。 @en Loading indicator size. */
  size?: SpinSize;
  /** 延迟显示时间，单位毫秒。 @en Delay before showing the indicator, in milliseconds. */
  delay?: number;
  /** 加载提示文字。 @en Loading tip text. */
  tip?: string;
  /** 包裹内容时是否显示半透明遮罩。 @en Whether wrapped content has a translucent mask. */
  mask?: boolean;
  /** 是否固定覆盖整个视口。 @en Whether the loading state covers the viewport. */
  fullscreen?: boolean;
}

export type SpinEventMap = EmptyComponentApi;

export interface SpinRegionMap {
  /** 被加载状态覆盖的内容。 @en Content covered by the loading state. */
  content: EmptyComponentApi;
  /** 自定义加载指示器。 @en Custom loading indicator. */
  indicator: EmptyComponentApi;
  /** 自定义提示内容。 @en Custom tip content. */
  tip: EmptyComponentApi;
}

export type SpinCommandMap = EmptyComponentApi;

export const SPIN_DEFAULTS = Object.freeze({
  spinning: true,
  size: 'medium',
  delay: 0,
  mask: true,
  fullscreen: false,
} as const satisfies Required<Omit<SpinCommonProps, 'tip'>>);

export function isSpinSize(value: unknown): value is SpinSize {
  return SPIN_SIZES.includes(value as SpinSize);
}

export function isSpinDelay(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export const spinApiContract = defineComponentApiContract<
  SpinCommonProps,
  SpinEventMap,
  SpinRegionMap,
  SpinCommandMap
>({
  defaults: SPIN_DEFAULTS,
  validators: { size: isSpinSize, delay: isSpinDelay },
});
