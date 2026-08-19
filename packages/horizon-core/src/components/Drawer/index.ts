import type { DrawerPlacement } from '@aurora/core';
import { isHorizontalDrawerPlacement, resizeDrawerExtent } from '@aurora/core';

export interface DrawerResizeControllerOptions {
  /** 抽屉展开方向。 @en Drawer placement. */
  placement: DrawerPlacement;
  /** 最小像素尺寸。 @en Minimum pixel extent. */
  minimum?: number;
  /** 最大像素尺寸。 @en Maximum pixel extent. */
  maximum?: number | (() => number | undefined);
  /** 尺寸变化回调。 @en Called when the extent changes. */
  onResize?: (extent: number) => void;
}

export interface DrawerResizeController {
  /** 释放指针监听。 @en Removes pointer listeners. */
  destroy(): void;
}

/**
 * 创建 Drawer 的 DOM 指针缩放控制器。
 * @en Creates the DOM pointer-resize controller shared by Drawer renderers.
 */
export function createDrawerResizeController(
  handle: HTMLElement,
  panel: HTMLElement,
  options: DrawerResizeControllerOptions,
): DrawerResizeController {
  const ownerDocument = handle.ownerDocument;
  let pointerId: number | undefined;
  let start = 0;
  let extent = 0;

  const coordinate = (event: PointerEvent) =>
    isHorizontalDrawerPlacement(options.placement) ? event.clientX : event.clientY;
  const panelExtent = () =>
    isHorizontalDrawerPlacement(options.placement) ? panel.clientWidth : panel.clientHeight;

  const onPointerMove = (event: PointerEvent) => {
    if (pointerId !== event.pointerId) return;
    const resized = resizeDrawerExtent(
      extent,
      start,
      coordinate(event),
      options.placement,
      options.minimum,
    );
    const resolvedMaximum =
      typeof options.maximum === 'function' ? options.maximum() : options.maximum;
    const next = resolvedMaximum === undefined ? resized : Math.min(resized, resolvedMaximum);
    options.onResize?.(next);
  };
  const finish = (event: PointerEvent) => {
    if (pointerId !== event.pointerId) return;
    pointerId = undefined;
    ownerDocument.removeEventListener('pointermove', onPointerMove);
    ownerDocument.removeEventListener('pointerup', finish);
    ownerDocument.removeEventListener('pointercancel', finish);
  };
  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || panel.hidden) return;
    event.preventDefault();
    event.stopPropagation();
    pointerId = event.pointerId;
    start = coordinate(event);
    extent = panelExtent();
    ownerDocument.addEventListener('pointermove', onPointerMove);
    ownerDocument.addEventListener('pointerup', finish);
    ownerDocument.addEventListener('pointercancel', finish);
  };

  handle.addEventListener('pointerdown', onPointerDown);
  return {
    destroy() {
      handle.removeEventListener('pointerdown', onPointerDown);
      ownerDocument.removeEventListener('pointermove', onPointerMove);
      ownerDocument.removeEventListener('pointerup', finish);
      ownerDocument.removeEventListener('pointercancel', finish);
      pointerId = undefined;
    },
  };
}
