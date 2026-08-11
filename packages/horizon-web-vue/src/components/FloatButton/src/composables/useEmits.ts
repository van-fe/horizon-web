import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  FloatButtonEventMap,
  FloatButtonGroupEventMap,
  FloatButtonGroupExpansionDetails,
} from '@aurora/core';
import { isBoolean } from '@aurora/utils';

type FloatButtonVueEvents = AdaptComponentApiShape<
  FloatButtonEventMap<MouseEvent>,
  { visibleChange: 'update:visible' }
>;
type FloatButtonGroupVueEvents = AdaptComponentApiShape<
  FloatButtonGroupEventMap,
  { visibleChange: 'update:visible'; expandedChange: 'update:expanded' }
>;

export const useFloatButtonEmits = {
  /** 点击事件。 @en Native activation event. */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  /** 请求更新可见状态。 @en Requests a visibility update. */
  'update:visible': (visible: boolean) => isBoolean(visible),
  /** 拖拽开始。 @en Drag started. */
  dragStart: () => true,
  /** 拖拽中。 @en Drag moved. */
  dragging: () => true,
  /** 拖拽结束。 @en Drag ended. */
  dragEnd: () => true,
} satisfies ComponentEventValidators<FloatButtonVueEvents>;

export const useFloatButtonGroupEmits = {
  /** 请求更新可见状态。 @en Requests a visibility update. */
  'update:visible': (visible: boolean) => isBoolean(visible),
  /** 请求更新展开状态。 @en Requests an expanded-state update. */
  'update:expanded': (expanded: boolean, details: FloatButtonGroupExpansionDetails) =>
    isBoolean(expanded) && typeof details?.reason === 'string',
  /** 展开。 @en Expanded. */
  expand: () => true,
  /** 收起。 @en Folded. */
  fold: () => true,
  /** 点击折叠按钮。 @en Collapse action clicked. */
  click: () => true,
} satisfies ComponentEventValidators<FloatButtonGroupVueEvents>;

export type FloatButtonEmits = typeof useFloatButtonEmits;
export type FloatButtonGroupEmits = typeof useFloatButtonGroupEmits;
