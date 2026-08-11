import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';
import type { TooltipChangeDetails, TooltipTrigger } from '../Tooltip';

export const POPOVER_TRIGGERS = ['hover', 'click', 'focus', 'manual'] as const;
export const POPOVER_PLACEMENTS = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
] as const;
export const POPOVER_THEMES = ['light', 'dark'] as const;
export const POPOVER_STRATEGIES = ['fixed', 'absolute'] as const;
export const POPOVER_HIDE_EVENTS = ['click', 'mousedown', 'mouseup'] as const;

export type PopoverTrigger = Extract<TooltipTrigger, (typeof POPOVER_TRIGGERS)[number]>;
export type PopoverPlacement = (typeof POPOVER_PLACEMENTS)[number];
export type PopoverTheme = (typeof POPOVER_THEMES)[number];
export type PopoverStrategy = (typeof POPOVER_STRATEGIES)[number];
export type PopoverHideEvent = (typeof POPOVER_HIDE_EVENTS)[number];

export interface PopoverArrowOptions {
  size?: number;
}

export interface PopoverMaskOptions<Style = unknown, ClassName = string, Target = unknown> {
  enable?: boolean;
  style?: Style;
  className?: ClassName;
  target?: Target;
}

export interface PopoverCommonProps<Mask = PopoverMaskOptions> {
  /** 触发方式。 @en Interaction used to open the popover. */
  trigger?: PopoverTrigger;
  /** 受控打开状态。 @en Controlled open state. */
  open?: boolean;
  /** 非受控初始状态。 @en Initial uncontrolled open state. */
  defaultOpen?: boolean;
  /** 首选浮层位置。 @en Preferred floating placement. */
  placement?: PopoverPlacement;
  /** 交叉轴偏移。 @en Cross-axis offset. */
  skidding?: number;
  /** 主轴间距。 @en Main-axis distance. */
  distance?: number;
  /** 空间不足时翻转。 @en Flips when the preferred placement does not fit. */
  flip?: boolean;
  /** 展示箭头。 @en Shows the floating arrow. */
  arrow?: boolean;
  /** 箭头参数。 @en Arrow options. */
  arrowOptions?: PopoverArrowOptions;
  /** 隐藏后销毁内容。 @en Unmounts content after it closes. */
  destroyOnHide?: boolean;
  /** 使用浮层挂载容器。 @en Renders content through a portal. */
  portal?: boolean;
  /** 监听尺寸变化并更新位置。 @en Repositions after element size changes. */
  resizeObserve?: boolean;
  /** 监听触发元素是否溢出。 @en Observes whether the reference becomes hidden. */
  referenceOverflowObserve?: boolean;
  /** 与触发元素同宽。 @en Matches the reference width. */
  sameWidth?: boolean;
  /** 同宽时使用最小宽度。 @en Uses min-width while matching the reference. */
  setMinWidth?: boolean;
  /** 与触发元素同高。 @en Matches the reference height. */
  sameHeight?: boolean;
  /** 打开延迟。 @en Delay before opening in milliseconds. */
  showDelay?: number;
  /** 关闭延迟。 @en Delay before closing in milliseconds. */
  hideDelay?: number;
  /** 备选位置。 @en Alternative placements. */
  fallbackPlacements?: readonly PopoverPlacement[];
  /** CSS 层级。 @en Floating z-index. */
  zIndex?: number;
  /** 点击触发时的外部关闭事件。 @en Outside event used by click-triggered popovers. */
  hideEvent?: PopoverHideEvent;
  /** 禁用交互。 @en Disables the popover. */
  disabled?: boolean;
  /** 可选遮罩。 @en Optional overlay mask. */
  mask?: Mask;
  /** 点击触发时阻止冒泡。 @en Stops trigger click propagation. */
  stopPropagation?: boolean;
  /** 视觉主题。 @en Visual theme. */
  theme?: PopoverTheme;
  /** 将浮层限制在视口内。 @en Shifts the floating element into the viewport. */
  preventOverflow?: boolean;
  /** 检查主轴遮挡。 @en Checks overflow on the main axis. */
  mainAxisCheck?: boolean;
  /** 定位策略。 @en Positioning strategy. */
  strategy?: PopoverStrategy;
}

export interface PopContentCommonProps {
  /** 视觉主题。 @en Visual theme. */
  theme?: PopoverTheme;
}

export interface PopoverEventMap<Event = unknown> {
  /** 打开状态变化。 @en Open state changed. */
  openChange: [open: boolean, details: TooltipChangeDetails];
  /** 浮层显示。 @en Popover shown. */
  show: [];
  /** 浮层隐藏。 @en Popover hidden. */
  hide: [];
  /** 指针进入触发器。 @en Pointer entered the reference. */
  enterReference: [event: Event];
  /** 指针离开触发器。 @en Pointer left the reference. */
  leaveReference: [event: Event];
  /** 点击触发器。 @en Reference clicked. */
  click: [event: Event];
}

export interface PopoverRegionMap {
  /** 唯一触发元素。 @en The single trigger element. */
  trigger: EmptyComponentApi;
  /** 浮层内容。 @en Floating content. */
  content: EmptyComponentApi;
}

export interface PopContentRegionMap {
  /** 内容。 @en Content. */
  content: EmptyComponentApi;
}

export interface PopoverCommandMap {
  /** 打开浮层。 @en Opens the popover. */
  open: () => void;
  /** 关闭浮层。 @en Closes the popover. */
  close: () => void;
  /** 重新计算浮层位置。 @en Recomputes the floating position. */
  updatePosition: () => void | Promise<void>;
}

export const POPOVER_DEFAULTS = Object.freeze({
  trigger: 'hover',
  defaultOpen: false,
  placement: 'top',
  skidding: 0,
  distance: 8,
  flip: true,
  arrow: true,
  arrowOptions: Object.freeze({ size: 8 }),
  destroyOnHide: true,
  portal: true,
  resizeObserve: false,
  referenceOverflowObserve: false,
  sameWidth: false,
  setMinWidth: false,
  sameHeight: false,
  showDelay: 0,
  hideDelay: 100,
  hideEvent: 'click',
  disabled: false,
  stopPropagation: false,
  theme: 'light',
  preventOverflow: false,
  mainAxisCheck: true,
  strategy: 'fixed',
} as const satisfies Partial<PopoverCommonProps>);

export const POP_CONTENT_DEFAULTS = Object.freeze({
  theme: 'light',
} as const satisfies PopContentCommonProps);

export function isPopoverTrigger(value: unknown): value is PopoverTrigger {
  return POPOVER_TRIGGERS.includes(value as PopoverTrigger);
}
export function isPopoverPlacement(value: unknown): value is PopoverPlacement {
  return POPOVER_PLACEMENTS.includes(value as PopoverPlacement);
}
export function isPopoverTheme(value: unknown): value is PopoverTheme {
  return POPOVER_THEMES.includes(value as PopoverTheme);
}
export function isPopoverStrategy(value: unknown): value is PopoverStrategy {
  return POPOVER_STRATEGIES.includes(value as PopoverStrategy);
}
export function isPopoverHideEvent(value: unknown): value is PopoverHideEvent {
  return POPOVER_HIDE_EVENTS.includes(value as PopoverHideEvent);
}

export const popoverApiContract = defineComponentApiContract<
  PopoverCommonProps,
  PopoverEventMap,
  PopoverRegionMap,
  PopoverCommandMap
>({
  defaults: POPOVER_DEFAULTS,
  validators: {
    trigger: isPopoverTrigger,
    placement: isPopoverPlacement,
    theme: isPopoverTheme,
    strategy: isPopoverStrategy,
    hideEvent: isPopoverHideEvent,
  },
});

export const popContentApiContract = defineComponentApiContract<
  PopContentCommonProps,
  Record<string, never>,
  PopContentRegionMap
>({ defaults: POP_CONTENT_DEFAULTS, validators: { theme: isPopoverTheme } });
