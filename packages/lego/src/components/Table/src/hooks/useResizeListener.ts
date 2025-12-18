import { type Ref, nextTick, ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import type { NTableColumnData } from '../utils/types';

export default function useResizeListener(
  analysisColumns: Ref<{
    columnGroups: NTableColumnData[][];
    flattenColumns: NTableColumnData[];
  }>,
  hooks: Array<Function>,
) {
  const wrapperDomRef = ref<HTMLDivElement>();
  const wrapperHeight = ref(0);

  function callHooks() {
    hooks.forEach(hook => hook());
  }

  watch(() => analysisColumns.value.flattenColumns, callHooks);

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
