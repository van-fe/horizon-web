import type { EmptyComponentApi } from '../_shared/api';
import { defineComponentApiContract } from '../_shared/api';

export const FLOAT_BUTTON_VARIANTS = ['normal', 'primary'] as const;
export const FLOAT_BUTTON_SHAPES = ['circle', 'square'] as const;
export const FLOAT_BUTTON_TARGETS = ['_blank', '_self', '_parent', '_top'] as const;
export const FLOAT_BUTTON_GROUP_TRIGGERS = ['click', 'hover'] as const;

export type FloatButtonVariant = (typeof FLOAT_BUTTON_VARIANTS)[number];
export type FloatButtonShape = (typeof FLOAT_BUTTON_SHAPES)[number];
export type FloatButtonTarget = (typeof FLOAT_BUTTON_TARGETS)[number];
export type FloatButtonGroupTrigger = (typeof FLOAT_BUTTON_GROUP_TRIGGERS)[number];
export type FloatButtonTooltip<TooltipOptions = Readonly<Record<string, unknown>>> =
  | string
  | TooltipOptions;
export type FloatButtonBadge<BadgeOptions = Readonly<Record<string, unknown>>> =
  | boolean
  | BadgeOptions;

export interface FloatButtonCommonProps<
  Icon = unknown,
  Description = string,
  TooltipOptions = Readonly<Record<string, unknown>>,
  BadgeOptions = Readonly<Record<string, unknown>>,
> {
  /** 自定义图标。 @en Custom icon. */
  icon?: Icon;
  /** 描述内容。 @en Description content. */
  description?: Description;
  /** 提示文字或提示参数。 @en Tooltip text or options. */
  tooltip?: FloatButtonTooltip<TooltipOptions>;
  /** 视觉类型。 @en Visual variant. */
  variant?: FloatButtonVariant;
  /** 按钮形状。 @en Button shape. */
  shape?: FloatButtonShape;
  /** 导航链接。 @en Navigation URL. */
  href?: string;
  /** 链接目标窗口。 @en Link browsing context. */
  target?: FloatButtonTarget;
  /** 徽标开关或参数。 @en Badge visibility or options. */
  badge?: FloatButtonBadge<BadgeOptions>;
  /** 允许拖拽按钮。 @en Allows dragging the button. */
  draggable?: boolean;
  /** 允许拖拽结束时吸附到底部。 @en Allows bottom adsorption after dragging. */
  adsorbBottom?: boolean;
  /** 受控可见状态。 @en Controlled visibility. */
  visible?: boolean;
  /** 非受控初始可见状态。 @en Initial uncontrolled visibility. */
  defaultVisible?: boolean;
}

export interface FloatButtonGroupCommonProps<
  Icon = unknown,
  TooltipOptions = Readonly<Record<string, unknown>>,
  BadgeOptions = Readonly<Record<string, unknown>>,
> {
  /** 组内按钮视觉类型。 @en Visual variant applied to grouped buttons. */
  variant?: FloatButtonVariant;
  /** 组内按钮形状。 @en Shape applied to grouped buttons. */
  shape?: FloatButtonShape;
  /** 启用展开折叠。 @en Enables expandable and collapsible actions. */
  useCollapse?: boolean;
  /** 展开折叠触发方式。 @en Expansion trigger interaction. */
  trigger?: FloatButtonGroupTrigger;
  /** 展开图标。 @en Expand icon. */
  expandIcon?: Icon;
  /** 折叠图标。 @en Fold icon. */
  foldIcon?: Icon;
  /** 展开状态提示。 @en Tooltip shown for the expand action. */
  expandTooltip?: FloatButtonTooltip<TooltipOptions>;
  /** 折叠状态提示。 @en Tooltip shown for the fold action. */
  foldTooltip?: FloatButtonTooltip<TooltipOptions>;
  /** 折叠按钮徽标参数。 @en Badge options for the collapse button. */
  badge?: BadgeOptions;
  /** 允许拖拽折叠按钮。 @en Allows dragging the collapse button. */
  draggable?: boolean;
  /** 允许拖拽结束时吸附到底部。 @en Allows bottom adsorption after dragging. */
  adsorbBottom?: boolean;
  /** 受控可见状态。 @en Controlled group visibility. */
  visible?: boolean;
  /** 非受控初始可见状态。 @en Initial uncontrolled group visibility. */
  defaultVisible?: boolean;
  /** 受控展开状态。 @en Controlled expanded state. */
  expanded?: boolean;
  /** 非受控初始展开状态。 @en Initial uncontrolled expanded state. */
  defaultExpanded?: boolean;
}

export interface FloatButtonEventMap<Event = unknown> {
  /** 按钮被激活。 @en Button activated. */
  click: [event: Event];
  /** 可见状态变化。 @en Visibility changed. */
  visibleChange: [visible: boolean];
  /** 开始拖拽。 @en Drag started. */
  dragStart: [];
  /** 正在拖拽。 @en Drag moved. */
  dragging: [];
  /** 结束拖拽。 @en Drag ended. */
  dragEnd: [];
}

export interface FloatButtonGroupExpansionDetails {
  /** 展开状态变化原因。 @en Reason for the expansion change. */
  reason: FloatButtonGroupExpansionReason;
}

export type FloatButtonGroupExpansionReason = 'click' | 'hover' | 'imperative';

export interface FloatButtonGroupEventMap {
  /** 组可见状态变化。 @en Group visibility changed. */
  visibleChange: [visible: boolean];
  /** 展开状态变化。 @en Expanded state changed. */
  expandedChange: [expanded: boolean, details: FloatButtonGroupExpansionDetails];
  /** 组已展开。 @en Group expanded. */
  expand: [];
  /** 组已折叠。 @en Group folded. */
  fold: [];
  /** 点击折叠按钮。 @en Collapse button clicked. */
  click: [];
}

export interface FloatButtonRegionMap {
  /** 图标内容。 @en Icon content. */
  icon: EmptyComponentApi;
  /** 描述内容。 @en Description content. */
  description: EmptyComponentApi;
}

export interface FloatButtonGroupRegionMap {
  /** 组内悬浮按钮。 @en Floating actions in the group. */
  content: EmptyComponentApi;
}

export interface FloatButtonCommandMap {
  /** 显示悬浮按钮。 @en Shows the floating button. */
  show: () => void;
  /** 隐藏悬浮按钮。 @en Hides the floating button. */
  hide: () => void;
  /** 聚焦悬浮按钮。 @en Focuses the floating button. */
  focus: () => void;
}

export interface FloatButtonGroupCommandMap {
  /** 显示悬浮按钮组。 @en Shows the floating button group. */
  show: () => void;
  /** 隐藏悬浮按钮组。 @en Hides the floating button group. */
  hide: () => void;
  /** 展开操作组。 @en Expands the action group. */
  expand: () => void;
  /** 折叠操作组。 @en Folds the action group. */
  fold: () => void;
  /** 切换展开状态。 @en Toggles the expanded state. */
  toggle: () => void;
}

export const FLOAT_BUTTON_DEFAULTS = Object.freeze({
  variant: 'normal',
  shape: 'circle',
  target: '_self',
  badge: false,
  draggable: false,
  adsorbBottom: false,
  defaultVisible: true,
} as const satisfies Partial<FloatButtonCommonProps>);

export const FLOAT_BUTTON_GROUP_DEFAULTS = Object.freeze({
  useCollapse: false,
  trigger: 'click',
  draggable: false,
  adsorbBottom: false,
  defaultVisible: true,
  defaultExpanded: false,
} as const satisfies Partial<FloatButtonGroupCommonProps>);

export function isFloatButtonVariant(value: unknown): value is FloatButtonVariant {
  return FLOAT_BUTTON_VARIANTS.includes(value as FloatButtonVariant);
}

export function isFloatButtonShape(value: unknown): value is FloatButtonShape {
  return FLOAT_BUTTON_SHAPES.includes(value as FloatButtonShape);
}

export function isFloatButtonTarget(value: unknown): value is FloatButtonTarget {
  return FLOAT_BUTTON_TARGETS.includes(value as FloatButtonTarget);
}

export function isFloatButtonGroupTrigger(value: unknown): value is FloatButtonGroupTrigger {
  return FLOAT_BUTTON_GROUP_TRIGGERS.includes(value as FloatButtonGroupTrigger);
}

export function isFloatButtonTooltip(value: unknown): value is FloatButtonTooltip {
  return (
    typeof value === 'string' ||
    (typeof value === 'object' && value !== null && !Array.isArray(value))
  );
}

export function isFloatButtonBadge(value: unknown): value is FloatButtonBadge {
  return (
    typeof value === 'boolean' ||
    (typeof value === 'object' && value !== null && !Array.isArray(value))
  );
}

export const floatButtonApiContract = defineComponentApiContract<
  FloatButtonCommonProps,
  FloatButtonEventMap,
  FloatButtonRegionMap,
  FloatButtonCommandMap
>({
  defaults: FLOAT_BUTTON_DEFAULTS,
  validators: {
    tooltip: isFloatButtonTooltip,
    variant: isFloatButtonVariant,
    shape: isFloatButtonShape,
    target: isFloatButtonTarget,
    badge: isFloatButtonBadge,
  },
});

export const floatButtonGroupApiContract = defineComponentApiContract<
  FloatButtonGroupCommonProps,
  FloatButtonGroupEventMap,
  FloatButtonGroupRegionMap,
  FloatButtonGroupCommandMap
>({
  defaults: FLOAT_BUTTON_GROUP_DEFAULTS,
  validators: {
    variant: isFloatButtonVariant,
    shape: isFloatButtonShape,
    trigger: isFloatButtonGroupTrigger,
    expandTooltip: isFloatButtonTooltip,
    foldTooltip: isFloatButtonTooltip,
  },
});
