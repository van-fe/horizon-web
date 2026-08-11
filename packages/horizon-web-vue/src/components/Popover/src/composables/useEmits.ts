import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  PopoverEventMap,
} from '@aurora/core';

type PopoverVueEventMap = AdaptComponentApiShape<PopoverEventMap<MouseEvent>, {}, 'openChange'>;

export const usePopoverEmits = {
  /** 浮层显示。 @en Popover shown. */
  show: () => true,
  /** 浮层隐藏。 @en Popover hidden. */
  hide: () => true,
  /** 指针进入触发器。 @en Pointer entered the reference. */
  enterReference: (event: MouseEvent) => event instanceof MouseEvent,
  /** 指针离开触发器。 @en Pointer left the reference. */
  leaveReference: (event: MouseEvent) => event instanceof MouseEvent,
  /** 点击触发器。 @en Reference clicked. */
  click: (event: MouseEvent) => event instanceof MouseEvent,
} satisfies ComponentEventValidators<PopoverVueEventMap>;

export type PopoverEmits = typeof usePopoverEmits;
