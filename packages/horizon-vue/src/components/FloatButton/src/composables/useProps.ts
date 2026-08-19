import { IconClose, IconMoreTwo } from '@aurora/icon';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  FloatButtonCommonProps,
  FloatButtonGroupCommonProps,
} from '@aurora/core';
import {
  FLOAT_BUTTON_DEFAULTS,
  FLOAT_BUTTON_GROUP_DEFAULTS,
  isFloatButtonBadge,
  isFloatButtonGroupTrigger,
  isFloatButtonShape,
  isFloatButtonTarget,
  isFloatButtonTooltip,
  isFloatButtonVariant,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType, VNode } from 'vue';
import type { BadgeProps } from '~/components/Badge/src/composables/useProps';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import { IconPropType } from '~/utils/useIcon';

type FloatButtonVueProps = AdaptComponentApiShape<
  FloatButtonCommonProps<unknown, string | VNode, Partial<TooltipProps>, Partial<BadgeProps>>,
  { variant: 'type' },
  'defaultVisible',
  { ariaLabel?: string; collapseButton?: boolean }
>;

type FloatButtonGroupVueProps = AdaptComponentApiShape<
  FloatButtonGroupCommonProps<unknown, Partial<TooltipProps>, Partial<BadgeProps>>,
  { variant: 'type' },
  'defaultVisible'
>;

export const useFloatButtonProps = declarePropType({
  /** 自定义图标。 @en Custom icon. */
  icon: { type: IconPropType },
  /** 描述文字或 VNode。 @en Description text or VNode. */
  description: { type: [String, Object] as PropType<string | VNode> },
  /** Tooltip 文字或参数。 @en Tooltip text or options. */
  tooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
    validator: isFloatButtonTooltip,
  },
  /** 视觉类型。 @en Visual variant. */
  type: {
    type: String as PropType<FloatButtonVueProps['type']>,
    default: FLOAT_BUTTON_DEFAULTS.variant,
    validator: isFloatButtonVariant,
  },
  /** 按钮形状。 @en Button shape. */
  shape: {
    type: String as PropType<FloatButtonVueProps['shape']>,
    default: FLOAT_BUTTON_DEFAULTS.shape,
    validator: isFloatButtonShape,
  },
  /** 跳转链接。 @en Navigation URL. */
  href: { type: String },
  /** 链接目标窗口。 @en Link browsing context. */
  target: {
    type: String as PropType<FloatButtonVueProps['target']>,
    default: FLOAT_BUTTON_DEFAULTS.target,
    validator: isFloatButtonTarget,
  },
  /** 徽标开关或参数。 @en Badge visibility or options. */
  badge: {
    type: [Boolean, Object] as PropType<boolean | Partial<BadgeProps>>,
    default: FLOAT_BUTTON_DEFAULTS.badge,
    validator: isFloatButtonBadge,
  },
  /** 是否可拖拽。 @en Whether pointer dragging is enabled. */
  draggable: { type: Boolean, default: FLOAT_BUTTON_DEFAULTS.draggable },
  /** 是否允许吸附到底部。 @en Whether bottom adsorption is allowed. */
  adsorbBottom: { type: Boolean, default: FLOAT_BUTTON_DEFAULTS.adsorbBottom },
  /** 是否显示。 @en Controlled visibility. */
  visible: { type: Boolean, default: FLOAT_BUTTON_DEFAULTS.defaultVisible },
  /** 无文字内容时的可访问名称。 @en Accessible name when no text is shown. */
  ariaLabel: { type: String, required: false },
  /** 折叠组内部控制按钮。 @en Internal collapse control owned by a group. */
  collapseButton: { type: Boolean, default: undefined },
} satisfies ComponentRendererPropDefinitions<FloatButtonVueProps>);

export const useFloatButtonGroupProps = declarePropType({
  /** 覆盖组内按钮视觉类型。 @en Visual variant applied to grouped buttons. */
  type: {
    type: String as PropType<FloatButtonGroupVueProps['type']>,
    validator: isFloatButtonVariant,
  },
  /** 覆盖组内按钮形状。 @en Shape applied to grouped buttons. */
  shape: {
    type: String as PropType<FloatButtonGroupVueProps['shape']>,
    validator: isFloatButtonShape,
  },
  /** 是否启用展开折叠。 @en Whether expansion is enabled. */
  useCollapse: { type: Boolean, default: FLOAT_BUTTON_GROUP_DEFAULTS.useCollapse },
  /** 展开折叠触发方式。 @en Expansion trigger interaction. */
  trigger: {
    type: String as PropType<FloatButtonGroupVueProps['trigger']>,
    default: FLOAT_BUTTON_GROUP_DEFAULTS.trigger,
    validator: isFloatButtonGroupTrigger,
  },
  /** 展开图标。 @en Expand icon. */
  expandIcon: { type: IconPropType, default: () => IconMoreTwo },
  /** 折叠图标。 @en Fold icon. */
  foldIcon: { type: IconPropType, default: () => IconClose },
  /** 展开状态 Tooltip。 @en Tooltip for the expand action. */
  expandTooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
    validator: isFloatButtonTooltip,
  },
  /** 折叠状态 Tooltip。 @en Tooltip for the fold action. */
  foldTooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
    validator: isFloatButtonTooltip,
  },
  /** 折叠按钮徽标参数。 @en Badge options for the collapse action. */
  badge: { type: Object as PropType<Partial<BadgeProps>> },
  /** 是否允许拖拽折叠按钮。 @en Whether the collapse action is draggable. */
  draggable: { type: Boolean, default: FLOAT_BUTTON_GROUP_DEFAULTS.draggable },
  /** 是否允许吸附到底部。 @en Whether bottom adsorption is allowed. */
  adsorbBottom: { type: Boolean, default: FLOAT_BUTTON_GROUP_DEFAULTS.adsorbBottom },
  /** 是否显示按钮组。 @en Controlled group visibility. */
  visible: { type: Boolean, default: FLOAT_BUTTON_GROUP_DEFAULTS.defaultVisible },
  /** 受控展开状态。 @en Controlled expanded state. */
  expanded: { type: Boolean, default: undefined, required: false },
  /** 非受控初始展开状态。 @en Initial uncontrolled expanded state. */
  defaultExpanded: { type: Boolean, default: FLOAT_BUTTON_GROUP_DEFAULTS.defaultExpanded },
} satisfies ComponentRendererPropDefinitions<FloatButtonGroupVueProps>);

export type FloatButtonProps = ExtractPropTypes<typeof useFloatButtonProps>;
export type FloatButtonGroupProps = ExtractPropTypes<typeof useFloatButtonGroupProps>;
