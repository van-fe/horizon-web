import { useClickOutsideOptions } from './composables/useOptions';
import { defineDirective } from '@aurora/shared';
import { useSensor } from '~/utils/useSensor';

const eventOptions = { passive: true, capture: true };

const clickOutsideEventKey = Symbol.for('click-outside-event');

export interface ClickOutsideElement extends HTMLElement {
  [clickOutsideEventKey]: (event: Event) => void;
}

export default defineDirective<ClickOutsideElement, typeof useClickOutsideOptions>({
  name: 'click-outside',
  options: useClickOutsideOptions,
  desc: '点击目标元素外部区域时调用指定的函数',
  mounted(el, binding) {
    useSensor('v-click-outside', binding.value, 'directive');

    el[clickOutsideEventKey] = (event: Event) => {
      if (!(el == event.target || el.contains(event.target as Node))) {
        binding.value?.(event.target, event as MouseEvent);
      }
    };

    const events = ['click'];
    events.forEach(event => {
      document.addEventListener(event, el[clickOutsideEventKey], eventOptions);
    });
  },
  unmounted(el) {
    const events = ['click'];
    events.forEach(event => {
      document.removeEventListener(event, el[clickOutsideEventKey], eventOptions);
    });
  },
});
