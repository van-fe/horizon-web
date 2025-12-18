import { useEventOutsideOptions } from './composables/useOptions';
import { defineDirective } from '@aurora/shared';
import { useSensor } from '~/utils/useSensor';

const eventOptions = { passive: true, capture: true };

const eventOutsideEventKey = Symbol.for('click-outside-event');

export interface EventOutsideElement extends HTMLElement {
  [eventOutsideEventKey]: (event: Event) => void;
}

export default defineDirective<EventOutsideElement, typeof useEventOutsideOptions>({
  name: 'event-outside',
  options: useEventOutsideOptions,
  desc: '事件于目标元素外部区域时调用指定的函数，相比较于 click-outside 可处理更多其他事件',
  mounted(el, binding) {
    useSensor('v-event-outside', binding.value.events, 'directive');

    el[eventOutsideEventKey] = (event: Event) => {
      if (!(el == event.target || el.contains(event.target as Node))) {
        binding.value?.handler?.(event.target, event as MouseEvent);
      }
    };

    const events = binding.value.events ?? ['click'];
    events.forEach(event => {
      document.addEventListener(event, el[eventOutsideEventKey], eventOptions);
    });
  },
  unmounted(el, binding) {
    const events = binding.value.events ?? ['click'];
    events.forEach(event => {
      document.removeEventListener(event, el[eventOutsideEventKey], eventOptions);
    });
  },
});
