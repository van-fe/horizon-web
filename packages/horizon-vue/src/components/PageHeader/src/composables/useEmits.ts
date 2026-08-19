import type { ComponentEventValidators, PageHeaderEventMap } from '@aurora/core';

export const usePageHeaderEmits = {
  /**
   * 点击返回按钮时触发
   * @en Emitted when back changes.
   */
  back: () => true,
} satisfies ComponentEventValidators<PageHeaderEventMap>;

export type PageHeaderEmits = typeof usePageHeaderEmits;
