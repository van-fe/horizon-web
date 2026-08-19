import type { ComponentEventValidators, LinkEventMap } from '@aurora/core';

export const useLinkEmits = {
  /**
   * 点击可交互链接。
   * @param event 原生鼠标事件
   * @paramEn event Native mouse event.
   * @en Emitted when an interactive link is clicked.
   */
  click: (event: MouseEvent) => event instanceof MouseEvent,
} satisfies ComponentEventValidators<LinkEventMap<MouseEvent>>;

export type LinkEmits = typeof useLinkEmits;
