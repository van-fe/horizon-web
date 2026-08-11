import type { PopoverCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const usePopoverExposes = {
  /** 切换显隐。 @en Sets the visible state. */
  switchVisible: Function as ExposeType<(visible: boolean) => void>,
  /** 重新计算浮层位置。 @en Recomputes the floating position. */
  updatePosition: Function as ExposeType<PopoverCommandMap['updatePosition']>,
  /** 触发器 DOM 节点。 @en Reference DOM element. */
  referenceDom: Object as ExposeType<HTMLSpanElement>,
  /** 浮层 DOM 节点。 @en Floating DOM element. */
  popoverDom: Object as ExposeType<HTMLSpanElement>,
};

export type PopoverExposes = ExtractExposeTypes<typeof usePopoverExposes>;
