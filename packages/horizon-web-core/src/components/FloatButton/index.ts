export interface FloatButtonDragPosition {
  /** 相对视口左侧坐标。 @en Viewport-relative left coordinate. */
  left: number;
  /** 相对视口顶部坐标。 @en Viewport-relative top coordinate. */
  top: number;
}

export interface FloatButtonDragDelta {
  /** 水平移动距离。 @en Horizontal movement distance. */
  x: number;
  /** 垂直移动距离。 @en Vertical movement distance. */
  y: number;
}

export interface FloatButtonDragDetails {
  /** 当前坐标。 @en Current position. */
  position: FloatButtonDragPosition;
  /** 相对拖拽起点的位移。 @en Displacement from the drag origin. */
  delta: FloatButtonDragDelta;
  /** 当前指针标识。 @en Active pointer identifier. */
  pointerId: number;
}

export interface FloatButtonDragControllerOptions {
  /** 是否禁用拖拽，可在运行时动态求值。 @en Whether dragging is disabled, evaluated dynamically. */
  disabled?: boolean | (() => boolean);
  /** 拖拽开始回调；返回 false 可拒绝本次拖拽。 @en Drag-start callback; return false to reject the drag. */
  onStart?: (details: FloatButtonDragDetails, event: PointerEvent) => boolean | void;
  /** 拖拽移动回调。 @en Drag-move callback. */
  onMove?: (details: FloatButtonDragDetails, event: PointerEvent) => void;
  /** 拖拽结束回调。 @en Drag-end callback. */
  onEnd?: (details: FloatButtonDragDetails, event: PointerEvent) => void;
}

export interface FloatButtonDragController {
  /** 当前是否正在拖拽。 @en Whether a drag is active. */
  readonly dragging: boolean;
  /** 释放目标和文档级指针监听。 @en Removes target and document pointer listeners. */
  destroy(): void;
}

function resolveDisabled(disabled: FloatButtonDragControllerOptions['disabled']): boolean {
  return typeof disabled === 'function' ? disabled() : Boolean(disabled);
}

/**
 * 创建 FloatButton 的 DOM 指针拖拽控制器。
 *
 * 控制器只计算相对视口的位置，不直接写入样式，渲染器可自行决定吸附和边界策略。
 * @en Creates the DOM pointer-drag controller shared by FloatButton renderers.
 *
 * The controller computes viewport-relative positions without mutating styles, leaving snapping and
 * boundary policies to each renderer through the shared Core algorithms.
 */
export function createFloatButtonDragController(
  target: HTMLElement,
  options: FloatButtonDragControllerOptions = {},
): FloatButtonDragController {
  const ownerDocument = target.ownerDocument;
  let pointerId: number | undefined;
  let startPointer = { x: 0, y: 0 };
  let startPosition: FloatButtonDragPosition = { left: 0, top: 0 };

  const createDetails = (event: PointerEvent): FloatButtonDragDetails => {
    const delta = {
      x: event.clientX - startPointer.x,
      y: event.clientY - startPointer.y,
    };
    return {
      position: {
        left: startPosition.left + delta.x,
        top: startPosition.top + delta.y,
      },
      delta,
      pointerId: event.pointerId,
    };
  };
  const removeDocumentListeners = () => {
    ownerDocument.removeEventListener('pointermove', onPointerMove);
    ownerDocument.removeEventListener('pointerup', finish);
    ownerDocument.removeEventListener('pointercancel', finish);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (pointerId !== event.pointerId) return;
    event.preventDefault();
    options.onMove?.(createDetails(event), event);
  };
  const finish = (event: PointerEvent) => {
    if (pointerId !== event.pointerId) return;
    const details = createDetails(event);
    pointerId = undefined;
    removeDocumentListeners();
    if (target.hasPointerCapture?.(event.pointerId)) {
      try {
        target.releasePointerCapture(event.pointerId);
      } catch {
        // Synthetic pointer streams may not own native capture. Listener cleanup remains authoritative.
      }
    }
    options.onEnd?.(details, event);
  };
  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || !event.isPrimary || resolveDisabled(options.disabled)) return;
    const rect = target.getBoundingClientRect();
    startPointer = { x: event.clientX, y: event.clientY };
    startPosition = { left: rect.left, top: rect.top };
    const details = createDetails(event);
    if (options.onStart?.(details, event) === false) return;
    event.preventDefault();
    pointerId = event.pointerId;
    try {
      target.setPointerCapture?.(event.pointerId);
    } catch {
      // Programmatic pointer events have no active native pointer to capture.
    }
    ownerDocument.addEventListener('pointermove', onPointerMove);
    ownerDocument.addEventListener('pointerup', finish);
    ownerDocument.addEventListener('pointercancel', finish);
  };

  target.addEventListener('pointerdown', onPointerDown);
  return {
    get dragging() {
      return pointerId !== undefined;
    },
    destroy() {
      target.removeEventListener('pointerdown', onPointerDown);
      if (pointerId !== undefined && target.hasPointerCapture?.(pointerId)) {
        try {
          target.releasePointerCapture(pointerId);
        } catch {
          // Programmatic pointer streams may already have released capture.
        }
      }
      pointerId = undefined;
      removeDocumentListeners();
    },
  };
}
