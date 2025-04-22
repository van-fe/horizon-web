import { isBoolean } from '@nio-fe/shared';

export const useHoverSlots = {
  /**
   * 默认渲染插槽
   * @param scope hover: 是否可见
   */
  default: (scope: { hover: boolean }) => isBoolean(scope.hover),
};

export type HoverSlots = typeof useHoverSlots;
