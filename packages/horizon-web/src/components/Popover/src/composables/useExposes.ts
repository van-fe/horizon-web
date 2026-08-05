import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const usePopoverExposes = {
  /**
   * 切换显隐
   * @en Controls switch visible.
   */
  switchVisible: Function as ExposeType<(visible: boolean) => void>,
  /**
   * 重新计算浮层位置
   * @en Recalculates the popover position.
   */
  updatePosition: Function as ExposeType<() => void>,
  /**
   * 触发器的 dom 节点
   * @en Controls reference dom.
   */
  referenceDom: Object as ExposeType<HTMLSpanElement>,
  /**
   * 弹出层的 dom 节点
   * @en Controls popover dom.
   */
  popoverDom: Object as ExposeType<HTMLDivElement>,
};

export type PopoverExposes = ExtractExposeTypes<typeof usePopoverExposes>;
