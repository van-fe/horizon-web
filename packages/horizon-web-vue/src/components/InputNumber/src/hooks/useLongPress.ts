import { onBeforeUnmount } from 'vue';
import { createInputNumberLongPressController } from '@aurora/horizon-web-core';

interface LongPressOptions {
  delay?: number;
  interval: () => number;
}

/** 使用 Web Core 指针控制器重复执行操作。 @en Repeats an action through the Web Core pointer controller. */
export function useLongPress(options: LongPressOptions) {
  let action: (() => void) | undefined;
  const controller = createInputNumberLongPressController({
    delay: options.delay,
    interval: options.interval,
    onRepeat: () => action?.(),
  });

  function start(event: PointerEvent, nextAction: () => void) {
    action = nextAction;
    controller.start(event);
  }

  function stop() {
    action = undefined;
    controller.stop();
  }

  onBeforeUnmount(() => {
    action = undefined;
    controller.destroy();
  });
  return { start, stop };
}
