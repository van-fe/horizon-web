import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue';
import LoadingIcon from '~/directives/v-loading/src/components/LoadingIcon';
import useLocaleLang from '~/utils/useLocaleLang';
import { useSpinProps } from './composables/useProps';
import type { SpinSlots } from './composables/useSlots';
import { useSpinSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Spin`,
  desc: '用于短时异步操作的内联或区域加载状态',
  descLocales: { en: 'Inline or regional loading state for short asynchronous operations.' },
  props: useSpinProps,
  slots: useSpinSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, SpinSlots>) {
    const classHelper = new ComponentClassBlock('spin');
    const visible = ref(false);
    const loadingText = useLocaleLang('spin.loading', 'Loading');
    let timer: ReturnType<typeof setTimeout> | undefined;

    const clearDelay = () => {
      if (timer !== undefined) clearTimeout(timer);
      timer = undefined;
    };

    watch(
      () => [props.spinning, props.delay] as const,
      ([spinning, delay]) => {
        clearDelay();
        if (!spinning) {
          visible.value = false;
          return;
        }
        if (delay > 0) {
          timer = setTimeout(() => {
            visible.value = props.spinning;
            timer = undefined;
          }, delay);
        } else {
          visible.value = true;
        }
      },
      { immediate: true },
    );

    onBeforeUnmount(clearDelay);

    const renderIndicator = () => (
      <span
        class={classHelper.e('indicator')}
        role="status"
        aria-live="polite"
        aria-label={(props.tip || loadingText.value) as string}
      >
        {slots.indicator?.() ?? <LoadingIcon class={classHelper.e('icon')} />}
        {(slots.tip || props.tip) && (
          <span class={classHelper.e('tip')}>{slots.tip?.() ?? props.tip}</span>
        )}
      </span>
    );

    return () => {
      const hasContent = !!slots.default;
      const classes = [
        classHelper.block,
        classHelper.m(props.size),
        classHelper.is('nested', hasContent),
        classHelper.is('fullscreen', props.fullscreen),
        classHelper.is('masked', props.mask && hasContent),
      ];

      if (!hasContent) {
        return visible.value ? <span class={classes}>{renderIndicator()}</span> : null;
      }

      return (
        <div class={classes} aria-busy={props.spinning ? 'true' : 'false'}>
          <div class={classHelper.e('content')}>{slots.default?.()}</div>
          {visible.value && <div class={classHelper.e('overlay')}>{renderIndicator()}</div>}
        </div>
      );
    };
  },
});
