import { computed, defineComponent, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import {
  createBacktopScrollController,
  resolveBacktopTarget,
  type BacktopScrollController,
} from '@aurora/horizon-web-core';
import { useBacktopProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
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
  descLocales: {
    en: 'Backtop provides a quick return action for long pages or independently scrolling containers after a configured distance.',
  },
  props: useBacktopProps,
  emits: useBacktopEmits,
  slots: useBacktopSlots,
  setup(props, { emit, expose, slots }: HorizonWebSetupContext<BacktopEmits, BacktopSlots>) {
    const visible = ref(false);
    const action = shallowRef<HTMLButtonElement>();
    let controller: BacktopScrollController | undefined;
    const styleBottom = computed(() => `${props.bottom}px`);
    const styleRight = computed(() => `${props.right}px`);

    const classHelper = new ComponentClassBlock('backtop');

    const scrollToTop = () => controller?.scrollToTop();

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      scrollToTop();
      emit('click', event);
    };

    const createController = () => {
      controller?.destroy();
      const target = resolveBacktopTarget(props.target, document);
      if (props.target && target === window) {
        warn('backtop', `target is not existed: ${props.target}. So downgrade to window`);
      }
      controller = createBacktopScrollController(target, {
        getVisibilityHeight: () => props.visibilityHeight,
        onVisibilityChange: nextVisible => {
          visible.value = nextVisible;
        },
      });
    };

    expose({
      scrollToTop,
      focus: () => action.value?.focus(),
    });
    onMounted(createController);
    onBeforeUnmount(() => controller?.destroy());
    watch(() => props.target, createController, { flush: 'post' });
    watch(
      () => props.visibilityHeight,
      () => controller?.sync(),
    );

    return () => (
      <HTransition name="fade-in">
        {visible.value ? (
          <button
            ref={action}
            type="button"
            aria-label={props.ariaLabel ?? 'Back to top'}
            style={{ bottom: styleBottom.value, right: styleRight.value }}
            class={classHelper.block}
            onClick={handleClick}
          >
            {slots.default?.() ?? <AIcon class={classHelper.e('icon')} name="top" size="16" />}
          </button>
        ) : undefined}
      </HTransition>
    );
  },
});
