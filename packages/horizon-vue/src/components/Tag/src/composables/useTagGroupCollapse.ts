import { cloneVNode, computed, nextTick, onBeforeUnmount, ref, watch, type Ref } from 'vue';
import { getSymbolNodeChildren, isDefined, isUndefined } from '@aurora/utils';
import {
  createTagCollapseController,
  observeTagResize,
  type TagResizeObserverHandle,
} from '@aurora/horizon-core';
import { debounce } from 'lodash-es';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { TagGroupProps } from './useProps';
import type { TagGroupSlots } from './useSlots';

interface UseTagGroupCollapseOptions {
  props: TagGroupProps;
  slots: HorizonWebSetupContext<{}, TagGroupSlots>['slots'];
  containerRef: Ref<HTMLElement | null>;
  editingSet: Ref<Set<string>>;
  emitExceeded: () => void;
  emitToggled: (expanded: boolean) => void;
}

/** Owns Vue render measurement, collapse state and ResizeObserver lifecycle for TagGroup. */
export function useTagGroupCollapse(options: UseTagGroupCollapseOptions) {
  const collapseProp = computed(() => options.props.collapse);
  const useCollapse = ref(collapseProp.value);
  const collapseEnable = computed(() => collapseProp.value && useCollapse.value);
  const needRenderedItemsLength = ref(0);
  const linesOfTags = ref(1);
  const visibleItemsAmount = ref(0);
  const isDuringRenderCalculating = ref(false);

  function getNeedRenderedItems() {
    const result = options.slots.default
      ? getSymbolNodeChildren(options.slots.default).map(node => cloneVNode(node))
      : [];
    needRenderedItemsLength.value = result.length;
    return result;
  }

  let overflowReported = false;
  const controller = createTagCollapseController({
    getContainer: () => options.containerRef.value,
    getItemCount: () => needRenderedItemsLength.value,
    getVisibleCount: () => visibleItemsAmount.value,
    setVisibleCount: count => {
      visibleItemsAmount.value = count;
    },
    afterRender: nextTick,
    getMinDisplayed: () => options.props.minDisplayed,
    onLinesChange: lines => {
      linesOfTags.value = lines;
    },
    onOverflowChange: overflowing => {
      if (overflowing && !overflowReported) options.emitExceeded();
      overflowReported = overflowing;
    },
  });

  async function calculate() {
    isDuringRenderCalculating.value = true;
    try {
      await controller.calculate();
    } finally {
      isDuringRenderCalculating.value = false;
    }
  }

  const debouncedCalculate = debounce(calculate, 250, {
    leading: true,
    trailing: true,
    maxWait: 500,
  });
  function scheduleCalculate() {
    void debouncedCalculate();
  }

  let resizeObserver: TagResizeObserverHandle | undefined;
  function stopResizeObserver() {
    resizeObserver?.destroy();
    resizeObserver = undefined;
  }

  function setResizeObserver() {
    if (resizeObserver || !options.containerRef.value) return;
    resizeObserver = observeTagResize(options.containerRef.value, () => {
      scheduleCalculate();
    });
  }

  function switchCollapsed(status = !useCollapse.value) {
    useCollapse.value = status;
    options.emitToggled(!status);
  }

  function toggle(expand?: boolean, manual = false) {
    if ((!collapseProp.value || !options.props.expand) && !manual) return;
    switchCollapsed(isUndefined(expand) ? undefined : !expand);
  }

  let previousVisibleItemsAmount = 0;
  watch(useCollapse, collapsed => {
    if (collapsed) {
      visibleItemsAmount.value = previousVisibleItemsAmount;
      setResizeObserver();
      scheduleCalculate();
    } else {
      stopResizeObserver();
      previousVisibleItemsAmount = visibleItemsAmount.value;
      visibleItemsAmount.value = needRenderedItemsLength.value;
    }
  });

  watch(
    collapseProp,
    value => {
      useCollapse.value = value;
    },
    { immediate: true },
  );
  watch(
    needRenderedItemsLength,
    value => {
      if (!useCollapse.value) visibleItemsAmount.value = value;
      void calculate();
    },
    { flush: 'post' },
  );
  watch(
    () => [options.props.fillUp, options.props.useCreate],
    () => {
      void nextTick(scheduleCalculate);
    },
  );
  watch(
    () => options.props.minDisplayed,
    value => {
      if (isDefined(value)) {
        visibleItemsAmount.value = value;
        if (collapseEnable.value) stopResizeObserver();
      } else setResizeObserver();
    },
    { immediate: true },
  );
  watch(options.editingSet, value => {
    if (value.size > 0) stopResizeObserver();
    else setResizeObserver();
  });
  watch(
    options.containerRef,
    () => {
      stopResizeObserver();
      if (
        options.editingSet.value.size === 0 &&
        !(isDefined(options.props.minDisplayed) && collapseEnable.value)
      ) {
        setResizeObserver();
      }
    },
    { flush: 'post' },
  );

  onBeforeUnmount(() => {
    stopResizeObserver();
    debouncedCalculate.cancel();
    controller.destroy();
  });

  return {
    calculate,
    collapseEnable,
    collapseProp,
    getNeedRenderedItems,
    isDuringRenderCalculating,
    linesOfTags,
    scheduleCalculate,
    toggle,
    useCollapse,
    visibleItemsAmount,
  };
}
