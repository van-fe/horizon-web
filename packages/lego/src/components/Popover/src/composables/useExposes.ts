import type { ExposeType, ExtractExposeTypes } from '@nio-fe/shared';

export const usePopoverExposes = {
  /**
   * 切换显隐
   */
  switchVisible: Function as ExposeType<(visible: boolean) => void>,
  /**
   * 触发器的 dom 节点
   * @version 2.2.0
   */
  referenceDom: Object as ExposeType<HTMLSpanElement>,
  /**
   * 弹出层的 dom 节点
   * @version 2.2.0
   */
  popoverDom: Object as ExposeType<HTMLDivElement>,
};

export type PopoverExposes = ExtractExposeTypes<typeof usePopoverExposes>;
