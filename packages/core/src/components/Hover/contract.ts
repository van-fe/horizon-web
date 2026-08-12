import { defineComponentApiContract } from '../_shared/api';

export interface HoverCommonProps {
  /** 是否禁用悬停状态切换。 @en Whether hover state transitions are disabled. */
  disabled?: boolean;
  /** 鼠标进入后的显示延迟。 @en Delay before showing after mouse enter. */
  showDelay?: number;
  /** 鼠标离开后的隐藏延迟。 @en Delay before hiding after mouse leave. */
  hideDelay?: number;
}

export interface HoverEventMap<Event = unknown> {
  /** 鼠标进入目标。 @en Mouse entered the target. */
  mouseEnter: Event;
  /** 鼠标在目标内移动。 @en Mouse moved within the target. */
  mouseMove: Event;
  /** 鼠标离开目标。 @en Mouse left the target. */
  mouseLeave: Event;
  /** 可见状态发生变化。 @en Visibility changed. */
  visibleChange: boolean;
}

export interface HoverRegionMap {
  /** 携带 hover 状态的目标内容。 @en Target content receiving the hover state. */
  content: { hover: boolean };
}

export interface HoverCommandMap {
  /** 请求显示。 @en Requests showing the hover state. */
  show(): void;
  /** 请求隐藏。 @en Requests hiding the hover state. */
  hide(): void;
}

export const HOVER_DEFAULTS = Object.freeze({
  disabled: false,
  showDelay: 0,
  hideDelay: 0,
} as const satisfies Required<HoverCommonProps>);

export function isHoverDelay(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export const hoverApiContract = defineComponentApiContract<
  HoverCommonProps,
  HoverEventMap,
  HoverRegionMap,
  HoverCommandMap
>({
  defaults: HOVER_DEFAULTS,
  validators: { showDelay: isHoverDelay, hideDelay: isHoverDelay },
});

export type HoverVisibilityReason = 'mouse-enter' | 'mouse-leave' | 'show' | 'hide';
