export interface InputNumberLongPressOptions {
  /** 首次重复前的延迟。 @en Delay before the first repeated action. */
  delay?: number;
  /** 重复间隔，可动态求值。 @en Repeat interval, optionally evaluated dynamically. */
  interval?: number | (() => number);
  /** 每次重复时执行。 @en Runs for every repeated action. */
  onRepeat: () => void;
}

export interface InputNumberLongPressController {
  /** 开始一次长按。 @en Starts a long press. */
  start(event: PointerEvent): void;
  /** 停止当前长按。 @en Stops the active long press. */
  stop(): void;
  /** 销毁并移除所有监听。 @en Destroys the controller and removes all listeners. */
  destroy(): void;
}

/** 创建 InputNumber 的指针长按控制器。 @en Creates the pointer long-press controller for InputNumber. */
export function createInputNumberLongPressController(
  options: InputNumberLongPressOptions,
): InputNumberLongPressController {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let ownerDocument: Document | undefined;
  let pointerId: number | undefined;

  const interval = () =>
    typeof options.interval === 'function' ? options.interval() : (options.interval ?? 200);
  const removeListeners = () => {
    ownerDocument?.removeEventListener('pointerup', handleEnd);
    ownerDocument?.removeEventListener('pointercancel', handleEnd);
  };
  const stop = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
    pointerId = undefined;
    removeListeners();
    ownerDocument = undefined;
  };
  const repeat = () => {
    options.onRepeat();
    timer = setTimeout(repeat, interval());
  };
  const handleEnd = (event: PointerEvent) => {
    if (event.pointerId === pointerId) stop();
  };

  return {
    start(event) {
      stop();
      if (event.button !== 0 || !event.isPrimary) return;
      ownerDocument = (event.currentTarget as Node | null)?.ownerDocument ?? document;
      pointerId = event.pointerId;
      ownerDocument.addEventListener('pointerup', handleEnd);
      ownerDocument.addEventListener('pointercancel', handleEnd);
      timer = setTimeout(repeat, options.delay ?? 500);
    },
    stop,
    destroy: stop,
  };
}
