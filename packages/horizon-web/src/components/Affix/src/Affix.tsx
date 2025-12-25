import type { CSSProperties } from 'vue';
import { defineComponent, Fragment, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue';
import { useNamespace, ComponentClassBlock } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useAffixProps } from './composables/useProps';
import { useAffixEmits } from './composables/useEmits';
import { useAffixSlots } from './composables/useSlots';
import { useAffixExposes } from './composables/useExposes';
import type { AffixProps } from './composables/useProps';
import type { AffixEmits } from './composables/useEmits';
import type { AffixSlots } from './composables/useSlots';
import type { AffixExposes } from './composables/useExposes';
import { useResizeObserver } from '@vueuse/core';

declare global {
  interface Window {
    getBoundingClientRect: undefined;
  }
}

export default defineComponent({
  name: `${useNamespace()}Affix`,
  desc: '将页面元素固定在特定可视区域',
  version: '2.3.0',
  inheritAttrs: false,
  props: useAffixProps,
  emits: useAffixEmits,
  slots: useAffixSlots,
  exposes: useAffixExposes,
  setup(
    props: AffixProps,
    { slots, expose, attrs }: HorizonWebSetupContext<AffixEmits, AffixSlots, AffixExposes>,
  ) {
    const classHelper = new ComponentClassBlock('affix');

    const defaultDomRef = ref<HTMLElement | null>(null);
    const blankDomRef = ref<HTMLElement | null>(null);

    const { target: targetRef, position: positionRef, offset: offsetRef } = toRefs(props);

    const isOutOfScreen = ref(false);
    const affixTargetSize = ref({
      width: '0px',
      height: '0px',
    });
    const affixTargetStyle = ref<CSSProperties>({});

    const target = ref<HTMLElement | Window>();

    watch(target, (newVal, oldVal) => {
      removeEventListener(oldVal);
      setEventListener(newVal);
    });

    watch(
      () => targetRef?.value,
      () => {
        setTarget();
      },
    );

    function setTarget() {
      target.value = targetRef?.value
        ? typeof targetRef.value === 'string'
          ? (document.querySelector(targetRef.value) as HTMLElement)
          : targetRef.value
        : window;
    }

    useResizeObserver(defaultDomRef, ([entry]) => {
      affixTargetSize.value.width = entry.contentRect.width + 'px';
      affixTargetSize.value.height = entry.contentRect.height + 'px';
    });

    function onScroll() {
      let rect;
      if (isOutOfScreen.value) {
        rect = blankDomRef.value?.getBoundingClientRect();
      } else {
        rect = defaultDomRef.value?.getBoundingClientRect();
      }

      if (rect) {
        const targetRect = target.value?.getBoundingClientRect?.();

        if (positionRef.value === 'top') {
          const calculated = rect.top - offsetRef.value;

          if (calculated < (targetRect?.top || 0)) {
            isOutOfScreen.value = true;
            affixTargetStyle.value = {
              position: 'fixed',
              top: (targetRect?.top || 0) + offsetRef.value + 'px',
              left: rect.left + 'px',
            };
          } else {
            isOutOfScreen.value = false;
            affixTargetStyle.value = {};
          }
        } else {
          const calculated = rect.bottom + offsetRef.value;

          if (calculated > (targetRect?.bottom || 0)) {
            isOutOfScreen.value = true;
            affixTargetStyle.value = {
              position: 'fixed',
              top: (targetRect?.bottom ?? 0) - offsetRef.value - rect.height + 'px',
              left: rect.left + 'px',
            };
          } else {
            isOutOfScreen.value = false;
            affixTargetStyle.value = {};
          }
        }
      }
    }

    function setEventListener(currTarget = target.value) {
      currTarget?.addEventListener('scroll', onScroll);
    }

    function removeEventListener(currTarget = target.value) {
      currTarget?.removeEventListener('scroll', onScroll);
    }

    expose({
      updatePosition: onScroll,
    });

    onMounted(() => {
      setTarget();
      setEventListener();
      onScroll();
    });

    onBeforeUnmount(() => {
      removeEventListener();
    });

    return () => (
      <Fragment>
        {isOutOfScreen.value && <div ref={blankDomRef} {...attrs} style={affixTargetSize.value} />}
        <div
          ref={defaultDomRef}
          class={classHelper.block}
          {...attrs}
          style={affixTargetStyle.value}
        >
          {slots.default?.()}
        </div>
      </Fragment>
    );
  },
});
