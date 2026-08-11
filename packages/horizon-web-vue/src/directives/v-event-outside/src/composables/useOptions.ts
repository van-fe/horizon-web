import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType } from '@aurora/utils';
import type { PropType } from 'vue';

export const useEventOutsideOptions = declareDirectiveOptionType({
  /**
   * 触发事件后执行的函数
   * @en Function executed after the event is triggered
   * @param target 触发了 `events` 事件的元素
   * @paramEn target Trigger 了 events event的element
   * @param evt 触发事件
   * @paramEn evt Trigger event
   */
  handler: {
    type: Function as DirectiveOptionType<(target: EventTarget | null, evt: Event) => void>,
    required: true,
  },
  /**
   * 需要挂载在 `document` 上监听的事件列表
   * @en Description
   */
  events: {
    type: Array as PropType<Array<keyof WindowEventMap>>,
    default: () => ['click'],
  },
});

export type EventOutsideOptions = ExtractDirectiveOptionTypes<typeof useEventOutsideOptions>;
