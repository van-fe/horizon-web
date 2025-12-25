import { defineComponent, ref, computed, onMounted, shallowRef } from 'vue';
import { useEventListener, useDebounceFn } from '@vueuse/core';
import { useBacktopProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { easeInOutCubic, useNamespace } from '@aurora/utils';
import { AIcon } from '@aurora/icon';
import type { BacktopEmits } from './composables/useEmits';
import { useBacktopEmits } from './composables/useEmits';
import type { BacktopSlots } from './composables/useSlots';
import { useBacktopSlots } from './composables/useSlots';
import NTransition from '~/components/Transition/src/Transition';
import { error } from '~/utils/useLog';

export default defineComponent({
  name: `${useNamespace()}Backtop`,
  desc: '返回页面顶部按钮',
  components: { AIcon, NTransition },
  props: useBacktopProps,
  emits: useBacktopEmits,
  slots: useBacktopSlots,
  setup(props, { emit, slots }: HorizonWebSetupContext<BacktopEmits, BacktopSlots>) {
    const visible = ref(false);
    const el = shallowRef<HTMLElement | undefined>(document.documentElement);
    const container = shallowRef<Document | HTMLElement>(document);
    const styleBottom = computed(() => `${props.bottom}px`);
    const styleRight = computed(() => `${props.right}px`);

    const scrollToTop = () => {
      if (!el.value) return;
      const startTime = Date.now();
      const startValue = el.value.scrollTop;
      const frameFunc = () => {
        if (!el.value) return;
        const timeDiff = Date.now() - startTime;
        if (timeDiff < 500) {
          el.value.scrollTop = startValue * (1 - easeInOutCubic(timeDiff / 500));
          requestAnimationFrame(frameFunc);
        } else {
          el.value.scrollTop = 0;
        }
      };
      requestAnimationFrame(frameFunc);
    };

    const observerScroll = () => {
      if (!el.value) return;
      visible.value = el.value.scrollTop >= props.visibilityHeight;
    };

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      scrollToTop();
      emit('click', event);
    };

    const scrollThrottled = useDebounceFn(observerScroll, 300);

    onMounted(() => {
      if (props.target) {
        el.value = document.querySelector<HTMLElement>(props.target) ?? undefined;

        if (!el.value) {
          error('backtop', `target is not existed: ${props.target}. So downgrade to document.body`);
          el.value = document.body;
        }

        container.value = el.value;
      }

      useEventListener(container, 'scroll', scrollThrottled);
    });

    return () => (
      <NTransition name="fade-in">
        {visible.value ? (
          <div
            style={{ bottom: styleBottom.value, right: styleRight.value }}
            class="n-backtop"
            onClick={handleClick}
          >
            {slots.default?.() ?? <AIcon class="n-backtop__icon" name="top" size="16" />}
          </div>
        ) : undefined}
      </NTransition>
    );
  },
});
