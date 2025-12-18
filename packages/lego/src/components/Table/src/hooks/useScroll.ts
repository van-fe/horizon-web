import { computed, ref } from 'vue';
import type { LegoComponentInstance } from '@nio-fe/shared';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import type NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import type { ScrollbarExposes } from '~/components/Scrollbar/src/composables/useExposes';
import { unrefElement } from '@vueuse/core';

export default function useScroll() {
  const scrollbarDomRef = ref<LegoComponentInstance<typeof NScrollbar, ScrollbarExposes>>();
  const scrollLeft = ref(0);
  const scrollRight = ref(0);
  const classHelper = new ComponentClassBlock('table-v3');

  function initialScrollState() {
    handleScroll({
      scrollLeft: 0,
      scrollTop: 0,
    });
  }

  function handleScroll(position: { scrollLeft: number; scrollTop: number }) {
    const target = unrefElement(scrollbarDomRef.value?.wrapRef);

    if (target) {
      const rect = target.getBoundingClientRect();
      scrollLeft.value = Math.floor(position.scrollLeft);
      scrollRight.value = Math.ceil(Math.floor(target.scrollWidth) - rect.width - scrollLeft.value);
    }
  }

  const scrollComputedClassName = computed(() =>
    cls(
      classHelper.is('scrolling-left', scrollLeft.value > 0),
      classHelper.is('scrolling-right', scrollRight.value > 0),
    ),
  );

  return {
    scrollbarDomRef,
    initialScrollState,
    handleScroll,
    scrollComputedClassName,
  };
}
