import type { ToRefs, Ref } from 'vue';
import { ref, watch } from 'vue';
import type { TableProps } from '../composables/useProps';
import { unrefElement } from '@vueuse/core';
// import { useIntersectionObserver } from '@vueuse/core';

export default function useHeaderSticky(
  tableProps: ToRefs<TableProps>,
  wrapperDomRef: Ref<HTMLDivElement | undefined>,
  headDomRef: Ref<HTMLTableSectionElement | undefined>,
) {
  const scrollOffset = ref(0);

  watch(
    () => tableProps.headerStickyContainer?.value,
    (val, old) => {
      removeScrollListener(getTarget(old));
      setScrollListener(getTarget(val));
    },
  );

  function getTarget(targetValue: string | HTMLElement | undefined) {
    if (targetValue === undefined) {
      return wrapperDomRef.value?.parentElement;
    } else if (typeof targetValue === 'string') {
      return document.querySelector(targetValue);
    } else {
      return unrefElement(targetValue);
    }
  }

  function calculateOffset() {
    const target = getTarget(tableProps.headerStickyContainer?.value);

    if (target && wrapperDomRef.value) {
      const scrollTargetRect = target.getBoundingClientRect();
      const wrapperRect = wrapperDomRef.value.getBoundingClientRect();

      requestAnimationFrame(() => {
        if (
          wrapperRect.bottom - (headDomRef.value?.clientHeight || 0) - scrollTargetRect.top >=
          0
        ) {
          scrollOffset.value = Math.max(
            0,
            scrollTargetRect.top - wrapperRect.top + (tableProps.headerStickyOffset?.value || 0),
          );
        } else {
          scrollOffset.value =
            wrapperRect.height -
            (headDomRef.value?.clientHeight || 0) -
            (tableProps.headerStickyOffset?.value || 0);
        }
      });
    }
  }

  // let stopIntersectionObserver: Function | undefined = undefined;

  // function useInter() {
  //   stopIntersectionObserver = useIntersectionObserver(
  //     wrapperDomRef,
  //     (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  //       console.log(entries, observer);
  //     },
  //     {
  //       threshold: [0, 0.5, 1],
  //     },
  //   ).stop;
  // }

  function setScrollListener(
    target: Element | null | undefined = getTarget(tableProps.headerStickyContainer?.value),
  ) {
    if (tableProps.headerSticky.value) {
      target?.addEventListener('scroll', calculateOffset, {
        passive: true,
      });
      calculateOffset();
    }
  }

  function removeScrollListener(
    target: Element | null | undefined = getTarget(tableProps.headerStickyContainer?.value),
  ) {
    target?.removeEventListener('scroll', calculateOffset);
    // stopIntersectionObserver?.();
  }

  return {
    scrollOffset,
    setScrollListener,
    removeScrollListener,
  };
}
