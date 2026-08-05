import { cloneVNode, defineComponent, provide, ref } from 'vue';
import { useHoverProps } from './composables/useProps';
import { useHoverEmits } from './composables/useEmits';
import type { HoverEmits } from './composables/useEmits';
import type { HoverSlots } from './composables/useSlots';
import { useHoverSlots } from './composables/useSlots';
import { HChildOnly, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { HoverExposes } from './composables/useExposes';
import { useHoverExposes } from './composables/useExposes';
import { HHoverSwitchVisibleInjectKey } from '~/components/Hover/src/utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}Hover`,
  desc: '鼠标移入容器后显示某个元素，鼠标移出容器后隐藏元素',
  descLocales: { en: "Set disabled to true to disable the hover component" },
  props: useHoverProps,
  emits: useHoverEmits,
  slots: useHoverSlots,
  exposes: useHoverExposes,
  setup(props, { emit, slots, expose }: HorizonWebSetupContext<HoverEmits, HoverSlots, HoverExposes>) {
    const targetRef = ref<(typeof HChildOnly & { el: HTMLElement }) | null>(null);
    const hoverVisible = ref<boolean>(false);
    const openHoverTimer = ref<ReturnType<typeof setTimeout> | undefined>();
    const closeHoverTimer = ref<ReturnType<typeof setTimeout> | undefined>();

    const switchVisible = (visible: boolean) => {
      if (!props.disabled) {
        clearTimeout(openHoverTimer.value);
        clearTimeout(closeHoverTimer.value);

        if (visible) {
          openHoverTimer.value = setTimeout(() => {
            hoverVisible.value = true;
          }, props.hoverShowDelay);
        } else {
          closeHoverTimer.value = setTimeout(() => {
            hoverVisible.value = false;
          }, props.hoverHideDelay);
        }
      }
    };

    const onMouseEnter = (evt: MouseEvent) => {
      switchVisible(true);
      emit('mouseEnter', evt);
    };

    const onMouseLeave = (evt: MouseEvent) => {
      switchVisible(false);
      emit('mouseLeave', evt);
    };

    provide(HHoverSwitchVisibleInjectKey, switchVisible);

    expose({
      show: () => {
        switchVisible(true);
      },
      hide: () => {
        switchVisible(false);
      },
    });

    return () => {
      const reference = slots?.default?.({ hover: hoverVisible.value });
      return (
        <HChildOnly ref={targetRef}>
          {reference &&
            cloneVNode(Array.isArray(reference) ? reference[0] : reference, {
              onMouseenter: onMouseEnter,
              onMousemove: (evt: MouseEvent) => emit('mouseMove', evt),
              onMouseleave: onMouseLeave,
            })}
        </HChildOnly>
      );
    };
  },
});
