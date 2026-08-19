import type { HoverEventMap } from '@aurora/core';

export const useHoverEmits = {
  /**
   * 鼠标进入
   * @param e 鼠标事件
   * @paramEn e Native mouse event.
   * @en Emitted when the mouse enters.
   */
  mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标离开
   * @param e 鼠标事件
   * @paramEn e Native mouse event.
   * @en Emitted when the mouse leaves.
   */
  mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移动
   * @param e 鼠标事件
   * @paramEn e Native mouse event.
   * @en Emitted when the mouse moves.
   */
  mouseMove: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 可见状态变化
   * @param visible 是否可见
   * @paramEn visible Whether the hover state is visible.
   * @en Emitted when visibility changes.
   */
  visibleChange: (visible: boolean) => typeof visible === 'boolean',
} satisfies Record<keyof HoverEventMap<MouseEvent>, (...args: any[]) => boolean>;

export type HoverEmits = typeof useHoverEmits;
