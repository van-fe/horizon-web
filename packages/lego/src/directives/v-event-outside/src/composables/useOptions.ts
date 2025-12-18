import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@nio-fe/shared';
import { declareDirectiveOptionType } from '@nio-fe/shared';
import type { PropType } from 'vue';

export const useEventOutsideOptions = declareDirectiveOptionType({
  /**
   * 触发事件后执行的函数
   * @param target 触发了 `events` 事件的元素
   * @param evt 触发事件
   */
  handler: {
    type: Function as DirectiveOptionType<(target: EventTarget | null, evt: Event) => void>,
    required: true,
  },
  /**
   * 需要挂载在 `document` 上监听的事件列表
   */
  events: {
    type: Array as PropType<Array<keyof WindowEventMap>>,
    default: () => ['click'],
  },
});

export type EventOutsideOptions = ExtractDirectiveOptionTypes<typeof useEventOutsideOptions>;
