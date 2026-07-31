import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { computed, defineComponent } from 'vue';
import useLocaleLang from '~/utils/useLocaleLang';
import { useCarouselItemProps } from './composables/useProps';
import type { CarouselItemSlots } from './composables/useSlots';
import { useCarouselItemSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}CarouselItem`,
  desc: '走马灯的单个轮播项',
  descLocales: { en: 'A single slide inside a Carousel.' },
  inheritAttrs: false,
  props: useCarouselItemProps,
  slots: useCarouselItemSlots,
  setup(props, { attrs, slots }: HorizonWebSetupContext<{}, CarouselItemSlots>) {
    const classHelper = new ComponentClassBlock('carousel-item');
    const slideText = useLocaleLang('carousel.slide', 'Slide {current} of {total}');
    const itemText = useLocaleLang('carousel.item', 'slide');

    const state = computed(() => {
      const index = Number(attrs['data-carousel-index'] ?? -1);
      const total = Number(attrs['data-carousel-total'] ?? 0);
      const active = Number(attrs['data-carousel-active'] ?? 0);
      const previous = Number(attrs['data-carousel-previous'] ?? active);
      const loop = attrs['data-carousel-loop'] === true;
      const motion = attrs['data-carousel-motion'] === 'previous' ? 'previous' : 'next';
      let offset = index - active;

      if (loop && total > 2) {
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
      } else if (loop && total === 2 && index !== active) {
        offset = index === previous ? (motion === 'next' ? -1 : 1) : motion === 'next' ? 1 : -1;
      }

      return { index, total, active, offset };
    });

    const accessibleLabel = computed(() => {
      if (props.label !== undefined) return String(props.label);
      return String(slideText.value ?? 'Slide {current} of {total}')
        .replace('{current}', String(state.value.index + 1))
        .replace('{total}', String(state.value.total));
    });

    return () => {
      const active = state.value.index === state.value.active;
      const hidden = !active && Math.abs(state.value.offset) > 1;
      return (
        <div
          class={cls(
            classHelper.block,
            classHelper.is('active', active),
            classHelper.is('hidden', hidden),
          )}
          style={
            { '--h-carousel-item-offset': state.value.offset } as Record<string, string | number>
          }
          role="group"
          aria-roledescription={String(itemText.value ?? 'slide')}
          aria-label={accessibleLabel.value}
          aria-hidden={!active}
          inert={active ? undefined : true}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
