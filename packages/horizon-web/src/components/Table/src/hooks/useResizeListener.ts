import { type Ref, nextTick, ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import type { HTableColumnData } from '../utils/types';

export default function useResizeListener(
  analysisColumns: Ref<{
    columnGroups: HTableColumnData[][];
    flattenColumns: HTableColumnData[];
  }>,
  hooks: Array<Function>,
) {
  const wrapperDomRef = ref<HTMLDivElement>();
  const wrapperHeight = ref(0);

  function callHooks() {
    hooks.forEach(hook => hook());
  }

  watch(() => analysisColumns.value.flattenColumns, callHooks, {
    // Column management rebuilds every column layout context. Recalculate only after
    // Vue has mounted the replacement header cells, otherwise their measured widths
    // are still zero and all fixed columns collapse onto the same sticky offset.
    flush: 'post',
  });

  useResizeObserver(wrapperDomRef, ([entry]) => {
    void nextTick(() => {
      wrapperHeight.value = entry.contentRect.height;
      callHooks();
    });
  });

  return {
    wrapperDomRef,
    wrapperHeight,
  };
}
