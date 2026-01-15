import { defineComponent, ref, computed, onMounted, shallowRef } from 'vue';
import { useEventListener, useDebounceFn } from '@vueuse/core';
import { useBacktopProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { easeInOutCubic, useNamespace, ComponentClassBlock } from '@aurora/utils';
import { AIcon } from '@aurora/icon';
import type { BacktopEmits } from './composables/useEmits';
import { useBacktopEmits } from './composables/useEmits';
import type { BacktopSlots } from './composables/useSlots';
import { useBacktopSlots } from './composables/useSlots';
import HTransition from '~/components/Transition/src/Transition';
import { warn } from '~/utils/useLog';

export default defineComponent({
  name: `${useNamespace()}Backtop`,
  desc: '返回页面顶部按钮',
  props: useBacktopProps,
  emits: useBacktopEmits,
  slots: useBacktopSlots,
  setup(props, { emit, slots }: HorizonWebSetupContext<BacktopEmits, BacktopSlots>) {
    const visible = ref(false);
    const el = shallowRef<HTMLElement | Window | undefined>(window);
    const container = shallowRef<Window | HTMLElement>(window);
    const styleBottom = computed(() => `${props.bottom}px`);
    const styleRight = computed(() => `${props.right}px`);

    const classHelper = new ComponentClassBlock('backtop');

    const scrollToTop = () => {
      if (!el.value) return;
      const startTime = Date.now();
      const startValue = el.value instanceof Window ? window.scrollY : el.value.scrollTop;
      const frameFunc = () => {
        if (!el.value) return;
        const timeDiff = Date.now() - startTime;
        if (timeDiff < 500) {
          if (el.value instanceof Window) {
            window.scrollTo(0, startValue * (1 - easeInOutCubic(timeDiff / 500)));
          } else {
            el.value.scrollTop = startValue * (1 - easeInOutCubic(timeDiff / 500));
          }
          requestAnimationFrame(frameFunc);
        } else {
          if (el.value instanceof Window) {
            window.scrollTo(0, 0);
          } else {
            el.value.scrollTop = 0;
          }
        }
      };
      requestAnimationFrame(frameFunc);
    };

    const observerScroll = () => {
      if (!el.value) return;
      const scrollY = el.value instanceof Window ? window.scrollY : el.value.scrollTop;
      visible.value = scrollY >= props.visibilityHeight;
    };

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      scrollToTop();
      emit('click', event);
    };

    const scrollThrottled = useDebounceFn(observerScroll, 300);

    onMounted(() => {
      el.value = props.target ? (document.querySelector<HTMLElement>(props.target) ?? undefined) : undefined;

      if (!el.value) {
        warn('backtop', `target is not existed: ${props.target}. So downgrade to window`);
        el.value = window;
      }

      container.value = el.value;

      useEventListener(container, 'scroll', scrollThrottled);
    });

    return () => (
      <HTransition name="fade-in">
        {visible.value ? (
          <div
            style={{ bottom: styleBottom.value, right: styleRight.value }}
            class={classHelper.block}
            onClick={handleClick}
          >
            {slots.default?.() ?? <AIcon class={classHelper.e('icon')} name="top" size="16" />}
          </div>
        ) : undefined}
      </HTransition>
    );
  },
});
