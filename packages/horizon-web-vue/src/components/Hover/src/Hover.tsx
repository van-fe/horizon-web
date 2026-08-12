import { cloneVNode, defineComponent, onBeforeUnmount, provide, ref, watch } from 'vue';
import type { VNode } from 'vue';
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
import { HoverController } from '@aurora/core';

export default defineComponent({
  name: `${useNamespace()}Hover`,
  desc: '鼠标移入容器后显示某个元素，鼠标移出容器后隐藏元素',
  descLocales: { en: 'Set disabled to true to disable the hover component' },
  props: useHoverProps,
  emits: useHoverEmits,
  slots: useHoverSlots,
  exposes: useHoverExposes,
  setup(
    props,
    { emit, slots, expose }: HorizonWebSetupContext<HoverEmits, HoverSlots, HoverExposes>,
  ) {
    const hoverVisible = ref<boolean>(false);
    const controller = new HoverController({
      disabled: props.disabled,
      showDelay: props.hoverShowDelay,
      hideDelay: props.hoverHideDelay,
      onVisibleChange: visible => {
        hoverVisible.value = visible;
        emit('visibleChange', visible);
      },
    });

    const switchVisible = (visible: boolean) => {
      controller.requestVisible(visible, visible ? 'mouse-enter' : 'mouse-leave');
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

    watch(
      () => [props.disabled, props.hoverShowDelay, props.hoverHideDelay] as const,
      ([disabled, showDelay, hideDelay]) => {
        controller.setOptions({
          disabled,
          showDelay,
          hideDelay,
          onVisibleChange: visible => {
            hoverVisible.value = visible;
            emit('visibleChange', visible);
          },
        });
      },
    );

    onBeforeUnmount(() => controller.destroy());

    expose({
      show: () => controller.show(),
      hide: () => controller.hide(),
    });

    return () => {
      const reference = slots?.default?.({ hover: hoverVisible.value }) as VNode[] | undefined;
      return (
        <HChildOnly>
          {reference &&
            cloneVNode(reference[0], {
              onMouseenter: onMouseEnter,
              onMousemove: (evt: MouseEvent) => emit('mouseMove', evt),
              onMouseleave: onMouseLeave,
            })}
        </HChildOnly>
      );
    };
  },
});
