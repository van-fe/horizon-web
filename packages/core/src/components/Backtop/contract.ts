import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export interface BacktopCommonProps<Target = unknown> {
  /** 显示按钮所需的滚动距离。 @en Scroll distance required before the action is shown. */
  visibilityHeight?: number;
  /** 距离视口底部的像素值。 @en Pixel offset from the viewport bottom. */
  bottom?: number;
  /** 距离视口右侧的像素值。 @en Pixel offset from the viewport right edge. */
  right?: number;
  /** 被监听和滚动的目标。 @en Target that is observed and scrolled. */
  target?: Target;
}

export interface BacktopEventMap<Event = unknown> {
  /** 返回顶部操作被激活。 @en Return-to-top action activated. */
  click: [event: Event];
}

export interface BacktopRegionMap {
  /** 按钮内容。 @en Action content. */
  content: EmptyComponentApi;
}

export interface BacktopCommandMap {
  /** 平滑滚动到顶部。 @en Smoothly scrolls to the top. */
  scrollToTop: () => void;
  /** 聚焦返回顶部按钮。 @en Focuses the return-to-top action. */
  focus: () => void;
}

export const BACKTOP_DEFAULTS = Object.freeze({
  visibilityHeight: 400,
  bottom: 120,
  right: 24,
} as const satisfies Partial<BacktopCommonProps>);

export function isBacktopDistance(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export const backtopApiContract = defineComponentApiContract<
  BacktopCommonProps,
  BacktopEventMap,
  BacktopRegionMap,
  BacktopCommandMap
>({
  defaults: BACKTOP_DEFAULTS,
  validators: {
    visibilityHeight: isBacktopDistance,
    bottom: isBacktopDistance,
    right: isBacktopDistance,
  },
});
