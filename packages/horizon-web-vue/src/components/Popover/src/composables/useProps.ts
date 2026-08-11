import type {
  CSSProperties,
  ExtractPropTypes,
  PropType,
  RendererElement,
  TeleportProps,
} from 'vue';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  PopContentCommonProps,
  PopoverCommonProps,
  PopoverMaskOptions,
  PopoverPlacement,
} from '@aurora/core';
import {
  isPopoverHideEvent,
  isPopoverPlacement,
  isPopoverStrategy,
  isPopoverTheme,
  isPopoverTrigger,
  POP_CONTENT_DEFAULTS,
  POPOVER_DEFAULTS,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import type { TransitionProps } from '~/components/Transition/src/composables/useProps';

export type HPopoverShowWithMask = Omit<
  PopoverMaskOptions<Partial<CSSProperties>, string, string | RendererElement>,
  'className' | 'target'
> & {
  class?: string;
  to?: string | RendererElement;
};

type PopoverVueProps = AdaptComponentApiShape<
  PopoverCommonProps<HPopoverShowWithMask>,
  {
    open: 'visible';
    portal: 'toBody';
    showDelay: 'hoverShowDelay';
    hideDelay: 'hoverHideDelay';
    hideEvent: 'hideEventType';
    mask: 'showWithMask';
  },
  'defaultOpen',
  {
    popperClass?: string;
    popperStyle?: Partial<CSSProperties>;
    to?: TeleportProps['to'];
    referenceOverflowRoot?: HTMLElement;
    referenceClass?: string;
    transitionName?: TransitionProps['name'] | 'none';
    transitionSpeed?: TransitionProps['speed'];
  }
>;

export const usePopoverProps = declarePropType({
  /** 触发方式。 @en Interaction used to open the popover. */
  trigger: {
    type: String as PropType<PopoverVueProps['trigger']>,
    default: POPOVER_DEFAULTS.trigger,
    validator: isPopoverTrigger,
  },
  /** 手动触发时的可见状态。 @en Visible state used by the manual trigger. */
  visible: { type: Boolean, default: POPOVER_DEFAULTS.defaultOpen },
  /** 首选浮层位置。 @en Preferred floating placement. */
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: POPOVER_DEFAULTS.placement,
    validator: isPopoverPlacement,
  },
  /** 交叉轴偏移。 @en Cross-axis offset. */
  skidding: { type: Number, default: POPOVER_DEFAULTS.skidding },
  /** 主轴间距。 @en Main-axis distance. */
  distance: { type: Number, default: POPOVER_DEFAULTS.distance },
  /** 空间不足时翻转。 @en Flips when the preferred placement does not fit. */
  flip: { type: Boolean, default: POPOVER_DEFAULTS.flip },
  /** 展示箭头。 @en Shows the floating arrow. */
  arrow: { type: Boolean, default: POPOVER_DEFAULTS.arrow },
  /** 箭头参数。 @en Arrow options. */
  arrowOptions: {
    type: Object as PropType<PopoverVueProps['arrowOptions']>,
    default: () => ({ ...POPOVER_DEFAULTS.arrowOptions }),
  },
  /** 浮层 class。 @en Class applied to the floating element. */
  popperClass: { type: String, required: false },
  /** 浮层 style。 @en Style applied to the floating element. */
  popperStyle: { type: Object as PropType<Partial<CSSProperties>>, required: false },
  /** 隐藏后销毁内容。 @en Unmounts content after it closes. */
  destroyOnHide: { type: Boolean, default: POPOVER_DEFAULTS.destroyOnHide },
  /** 将浮层 Teleport 到挂载容器。 @en Teleports the floating content. */
  toBody: { type: Boolean, default: POPOVER_DEFAULTS.portal },
  /** Teleport 目标。 @en Teleport destination. */
  to: { type: [String, Object] as PropType<TeleportProps['to']>, required: false },
  /** 监听尺寸变化并更新位置。 @en Repositions after element size changes. */
  resizeObserve: { type: Boolean, default: POPOVER_DEFAULTS.resizeObserve },
  /** 监听触发元素是否溢出。 @en Observes whether the reference becomes hidden. */
  referenceOverflowObserve: {
    type: Boolean,
    default: POPOVER_DEFAULTS.referenceOverflowObserve,
  },
  /** 触发元素溢出监听根节点。 @en Root used to observe reference visibility. */
  referenceOverflowRoot: {
    type: Object as PropType<HTMLElement>,
    default: () => document.body,
    required: false,
  },
  /** 与触发元素同宽。 @en Matches the reference width. */
  sameWidth: { type: Boolean, default: POPOVER_DEFAULTS.sameWidth },
  /** 同宽时使用最小宽度。 @en Uses min-width while matching the reference. */
  setMinWidth: { type: Boolean, default: POPOVER_DEFAULTS.setMinWidth },
  /** 与触发元素同高。 @en Matches the reference height. */
  sameHeight: { type: Boolean, default: POPOVER_DEFAULTS.sameHeight },
  /** 鼠标进入后的打开延迟。 @en Delay before opening after pointer enter. */
  hoverShowDelay: { type: Number, default: POPOVER_DEFAULTS.showDelay },
  /** 鼠标离开后的关闭延迟。 @en Delay before closing after pointer leave. */
  hoverHideDelay: { type: Number, default: POPOVER_DEFAULTS.hideDelay },
  /** 触发元素包装层 class。 @en Class applied to the reference wrapper. */
  referenceClass: { type: String, required: false },
  /** 备选位置。 @en Alternative placements. */
  fallbackPlacements: { type: Array as PropType<PopoverPlacement[]>, required: false },
  /** CSS 层级。 @en Floating z-index. */
  zIndex: { type: Number, required: false },
  /** 点击触发时的外部关闭事件。 @en Outside event used by click-triggered popovers. */
  hideEventType: {
    type: String as PropType<PopoverVueProps['hideEventType']>,
    default: POPOVER_DEFAULTS.hideEvent,
    validator: isPopoverHideEvent,
  },
  /** 禁用交互。 @en Disables the popover. */
  disabled: { type: Boolean, default: POPOVER_DEFAULTS.disabled },
  /** Vue 过渡名称。 @en Vue transition name. */
  transitionName: {
    type: String as PropType<TransitionProps['name'] | 'none'>,
    default: 'fade-in',
  },
  /** Vue 过渡速度。 @en Vue transition speed. */
  transitionSpeed: { type: String as PropType<TransitionProps['speed']>, default: 'slow' },
  /** 浮层遮罩。 @en Optional overlay mask. */
  showWithMask: { type: Object as PropType<HPopoverShowWithMask>, required: false },
  /** 点击触发时阻止冒泡。 @en Stops trigger click propagation. */
  stopPropagation: { type: Boolean, default: POPOVER_DEFAULTS.stopPropagation },
  /** 视觉主题。 @en Visual theme. */
  theme: {
    type: String as PropType<PopoverVueProps['theme']>,
    default: POPOVER_DEFAULTS.theme,
    validator: isPopoverTheme,
  },
  /** 将浮层限制在视口内。 @en Shifts the floating element into the viewport. */
  preventOverflow: { type: Boolean, default: POPOVER_DEFAULTS.preventOverflow },
  /** 检查主轴遮挡。 @en Checks overflow on the main axis. */
  mainAxisCheck: { type: Boolean, default: POPOVER_DEFAULTS.mainAxisCheck },
  /** 定位策略。 @en Positioning strategy. */
  strategy: {
    type: String as PropType<PopoverVueProps['strategy']>,
    default: POPOVER_DEFAULTS.strategy,
    validator: isPopoverStrategy,
  },
} satisfies ComponentRendererPropDefinitions<PopoverVueProps>);

export const usePopContentProps = declarePropType({
  /** 视觉主题。 @en Visual theme. */
  theme: {
    type: String as PropType<PopContentCommonProps['theme']>,
    default: POP_CONTENT_DEFAULTS.theme,
    validator: isPopoverTheme,
  },
} satisfies ComponentRendererPropDefinitions<PopContentCommonProps>);

export type PopoverProps = ExtractPropTypes<typeof usePopoverProps>;
export type PopContentProps = ExtractPropTypes<typeof usePopContentProps>;
