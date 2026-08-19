import type { ToRefs, Ref } from 'vue';
import { ref, watch } from 'vue';
import type { TableProps } from '../composables/useProps';
import { unrefElement } from '@vueuse/core';
// import { useIntersectionObserver } from '@vueuse/core';

export default function useHeaderSticky(
  tableProps: ToRefs<TableProps>,
  wrapperDomRef: Ref<HTMLDivElement | undefined>,
  headDomRef: Ref<HTMLTableSectionElement | undefined>,
  scrollWrapDomRef: Ref<HTMLElement | null | undefined>,
) {
  const scrollOffset = ref(0);
  const isNativeSticky = ref(false);

  watch(
    [
      () => tableProps.headerSticky.value,
      () => tableProps.headerStickyContainer?.value,
      () => tableProps.height?.value,
      () => tableProps.maxHeight?.value,
    ],
    (_, oldValues) => {
      removeScrollListener(getTarget(oldValues[1] as string | HTMLElement | undefined));
      setScrollListener();
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

    if (!isNativeSticky.value && target && wrapperDomRef.value) {
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

  function canUseNativeSticky(target: Element | null | undefined) {
    const wrapper = wrapperDomRef.value;
    const scrollWrap = scrollWrapDomRef.value;
    const hasHorizontalOverflow =
      !!scrollWrap && scrollWrap.scrollWidth > scrollWrap.clientWidth + 1;

    return (
      tableProps.headerSticky.value &&
      tableProps.height?.value === undefined &&
      tableProps.maxHeight?.value === undefined &&
      !hasHorizontalOverflow &&
      !!target &&
      !!wrapper &&
      target.contains(wrapper)
    );
  }

  // let stopIntersectionObserver: Function | undefined = undefined;

  // function useInter() {
  //   stopIntersectionObserver = useIntersectionObserver(
  //     wrapperDomRef,
  //     (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  //       console.info(entries, observer);
  //     },
  //     {
  //       threshold: [0, 0.5, 1],
  //     },
  //   ).stop;
  // }

  function setScrollListener(
    target: Element | null | undefined = getTarget(tableProps.headerStickyContainer?.value),
  ) {
    target?.removeEventListener('scroll', calculateOffset);
    isNativeSticky.value = canUseNativeSticky(target);
    scrollOffset.value = 0;

    if (tableProps.headerSticky.value && !isNativeSticky.value) {
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
    isNativeSticky,
    setScrollListener,
    removeScrollListener,
  };
}
