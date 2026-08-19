/** Tree 节点的放置位置。 @en Drop position relative to a tree item. */
export type TreeDropPosition = 'before' | 'inside' | 'after';

/** Tree 放置区域及其相对位置。 @en A tree drop zone and its relative position. */
export interface TreeDropTarget {
  element: HTMLElement;
  position: TreeDropPosition;
}

/** Tree 指针相对拖拽起点的偏移量。 @en Pointer offset relative to the Tree drag origin. */
export interface TreePointerDragOffset {
  x: number;
  y: number;
}

/** Tree 指针拖拽的配置。 @en Tree pointer-drag configuration. */
export interface TreePointerDragOptions<TTarget = TreeDropTarget> {
  /** 承载拖拽事件的 Tree 根节点。 @en Tree root which owns drag events. */
  container: HTMLElement;
  /** 是否在根节点监听 pointerdown 自动开始拖拽。 @en Whether pointerdown on the root automatically starts dragging. */
  autoStart?: boolean;
  /** 判断当前指针按下是否有资格开始拖拽。 @en Determines whether the current pointerdown is eligible to start dragging. */
  canStart?: (event: PointerEvent) => boolean;
  /** 是否在拖拽期间捕获指针。 @en Whether to capture the pointer for the duration of the drag. */
  capturePointer?: boolean;
  /** 是否阻止 pointermove 的默认行为。 @en Whether to prevent the default pointermove behavior. */
  preventDefault?: boolean;
  /** 是否在拖拽期间禁用文档正文文本选择。 @en Whether to disable document-body text selection while dragging. */
  disableUserSelect?: boolean;
  /** 返回当前可放置节点；提供 resolveTarget 时忽略。 @en Returns the current eligible drop zones; ignored when resolveTarget is provided. */
  getDropZones?: () => Iterable<HTMLElement>;
  /** 从当前事件动态解析 renderer 定义的放置目标。 @en Dynamically resolves a renderer-defined drop target from the current event. */
  resolveTarget?: (event: PointerEvent) => TTarget | null;
  /** 拖拽移动时调用。 @en Called as the pointer moves. */
  onMove?: (target: TTarget | null, event: PointerEvent, offset: TreePointerDragOffset) => void;
  /** 指针释放并落入有效区域时调用。 @en Called when the pointer is released over an eligible zone. */
  onDrop?: (target: TTarget | null, event: PointerEvent, offset: TreePointerDragOffset) => void;
  /** 拖拽因取消或显式取消而结束时调用。 @en Called when dragging ends through cancellation. */
  onCancel?: (event?: PointerEvent) => void;
}

/** Tree 指针拖拽控制器。 @en Tree pointer-drag controller. */
export interface TreePointerDragController {
  /** 当前是否正在跟踪一个指针。 @en Whether a pointer is currently tracked. */
  readonly dragging: boolean;
  /** 尝试从指定 pointerdown 事件开始拖拽。 @en Attempts to start dragging from the supplied pointerdown event. */
  start(event: PointerEvent): boolean;
  /** 取消当前拖拽并清理文档监听。 @en Cancels the current drag and removes document listeners. */
  cancel(): void;
  /** 销毁控制器，并清理活跃拖拽。 @en Destroys the controller and cleans up any active drag. */
  destroy(): void;
}

/** 在 Tree 中定位激活节点，不改变 renderer 状态。 @en Locates the active Tree item without changing renderer state. */
export function focusActiveTreeitem(
  container: HTMLElement | null | undefined,
  active?: string | number | HTMLElement | null,
  selector = '[role="treeitem"], [data-tree-value]',
): boolean {
  if (!container) return false;
  const items = Array.from(container.querySelectorAll<HTMLElement>(selector));
  const item =
    active instanceof HTMLElement
      ? active
      : active === undefined || active === null
        ? items.find(element => !isTreeitemDisabled(element))
        : items.find(
            element =>
              element.dataset.treeValue === String(active) ||
              element.dataset.uuid === String(active),
          );
  if (!item || isTreeitemDisabled(item)) return false;
  item.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  item.focus();
  return container.ownerDocument.activeElement === item;
}

function isTreeitemDisabled(element: HTMLElement): boolean {
  return element.matches(':disabled') || element.getAttribute('aria-disabled') === 'true';
}

function getDropTarget(event: PointerEvent, zones: Iterable<HTMLElement>): TreeDropTarget | null {
  for (const element of zones) {
    const rect = element.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      continue;
    const third = rect.height / 3;
    return {
      element,
      position:
        event.clientY < rect.top + third
          ? 'before'
          : event.clientY > rect.bottom - third
            ? 'after'
            : 'inside',
    };
  }
  return null;
}

/** 创建仅处理 DOM 生命周期和放置几何的 Tree 指针拖拽控制器。 @en Creates a Tree pointer-drag controller limited to DOM lifecycle and drop geometry. */
export function createTreePointerDrag<TTarget = TreeDropTarget>(
  options: TreePointerDragOptions<TTarget>,
): TreePointerDragController {
  const { container } = options;
  const ownerDocument = container.ownerDocument;
  let pointerId: number | undefined;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let previousUserSelect: string | undefined;
  let destroyed = false;

  const removeListeners = () => {
    ownerDocument.removeEventListener('pointermove', handleMove);
    ownerDocument.removeEventListener('pointerup', handleDrop);
    ownerDocument.removeEventListener('pointercancel', handleCancel);
  };
  const releasePointer = () => {
    if (options.capturePointer === false) return;
    if (pointerId === undefined || !container.hasPointerCapture?.(pointerId)) return;
    try {
      container.releasePointerCapture(pointerId);
    } catch {
      // A detached target may already have released capture.
    }
  };
  const restoreUserSelect = () => {
    if (previousUserSelect === undefined) return;
    if (ownerDocument.body) ownerDocument.body.style.userSelect = previousUserSelect;
    previousUserSelect = undefined;
  };
  const clear = () => {
    removeListeners();
    releasePointer();
    restoreUserSelect();
    pointerId = undefined;
  };
  const isTrackedPointer = (event: PointerEvent) => event.pointerId === pointerId;
  const getOffset = (event: PointerEvent): TreePointerDragOffset => ({
    x: event.clientX - pointerStartX,
    y: event.clientY - pointerStartY,
  });
  const resolveTarget = (event: PointerEvent): TTarget | null => {
    if (options.resolveTarget) return options.resolveTarget(event);
    return getDropTarget(event, options.getDropZones?.() ?? []) as TTarget | null;
  };
  const handleMove = (event: PointerEvent) => {
    if (!isTrackedPointer(event)) return;
    if (options.preventDefault) event.preventDefault();
    options.onMove?.(resolveTarget(event), event, getOffset(event));
  };
  const handleDrop = (event: PointerEvent) => {
    if (!isTrackedPointer(event)) return;
    const offset = getOffset(event);
    let target: TTarget | null;
    try {
      target = resolveTarget(event);
    } finally {
      clear();
    }
    options.onDrop?.(target, event, offset);
  };
  const handleCancel = (event: PointerEvent) => {
    if (!isTrackedPointer(event)) return;
    clear();
    options.onCancel?.(event);
  };
  const start = (event: PointerEvent) => {
    if (
      destroyed ||
      event.button !== 0 ||
      !event.isPrimary ||
      (options.canStart && !options.canStart(event))
    )
      return false;
    clear();
    pointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    if (options.disableUserSelect && ownerDocument.body) {
      previousUserSelect = ownerDocument.body.style.userSelect;
      ownerDocument.body.style.userSelect = 'none';
    }
    if (options.capturePointer !== false) {
      try {
        container.setPointerCapture?.(pointerId);
      } catch {
        // Pointer capture is an optional browser enhancement.
      }
    }
    ownerDocument.addEventListener('pointermove', handleMove, { passive: false });
    ownerDocument.addEventListener('pointerup', handleDrop);
    ownerDocument.addEventListener('pointercancel', handleCancel);
    return true;
  };
  const handleStart = (event: PointerEvent) => start(event);

  if (options.autoStart !== false) container.addEventListener('pointerdown', handleStart);
  return {
    get dragging() {
      return pointerId !== undefined;
    },
    start,
    cancel() {
      if (pointerId === undefined) return;
      clear();
      options.onCancel?.();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (options.autoStart !== false) container.removeEventListener('pointerdown', handleStart);
      if (pointerId !== undefined) {
        clear();
        options.onCancel?.();
      }
    },
  };
}
