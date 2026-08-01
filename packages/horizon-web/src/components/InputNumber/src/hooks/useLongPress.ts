import { onBeforeUnmount } from 'vue';
import { safelyGetEventTarget } from '@aurora/utils';

interface LongPressOptions {
  delay?: number;
  interval: () => number;
}

/** Repeats an action while the originating pointer target remains pressed. */
export function useLongPress(options: LongPressOptions) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let removeListeners: (() => void) | undefined;

  function stop() {
    if (timer) clearTimeout(timer);
    timer = undefined;
    removeListeners?.();
    removeListeners = undefined;
  }

  function start(event: MouseEvent, action: () => void) {
    stop();
    const target = (event.currentTarget || safelyGetEventTarget(event)) as EventTarget | null;
    const repeat = () => {
      action();
      timer = setTimeout(repeat, options.interval());
    };
    const handleEnd = () => stop();

    removeListeners = () => {
      target?.removeEventListener('mouseup', handleEnd);
      target?.removeEventListener('mouseleave', handleEnd);
    };
    timer = setTimeout(repeat, options.delay ?? 500);
    target?.addEventListener('mouseup', handleEnd);
    target?.addEventListener('mouseleave', handleEnd);
  }

  onBeforeUnmount(stop);
  return { start, stop };
}
