import type { Ref, WatchStopHandle } from 'vue';
import { ref, provide, watch, inject } from 'vue';
import { HTreeHighlightRangesInjectKey, HTreeFilterInputValueInjectKey } from '../utils/injectKeys';
import type { TreeItemProps } from '../composables/useProps';

export default function useHighlight() {
  const highlightRanges = ref(new Map<TreeItemProps['value'], Range>());

  watch(
    highlightRanges,
    val => {
      if (CSS.highlights) {
        const highlight = new Highlight(...Array.from(val.values()));

        CSS.highlights.set('keyword', highlight);
      } else {
        console.warn(
          "Your browser doesn't support Highlight API. Please upgrade to chrome which version >= 105.",
        );
      }
    },
    {
      deep: true,
      flush: 'post',
    },
  );

  provide(HTreeHighlightRangesInjectKey, highlightRanges);
}

export function useHighlightTreeItem(
  itemProps: TreeItemProps,
  options: {
    contentDomRef: Ref<HTMLElement | undefined>;
  },
) {
  const highlightRanges = inject(HTreeHighlightRangesInjectKey)!;
  const filterInputValue = inject(HTreeFilterInputValueInjectKey)!;

  let watchStopHandle: WatchStopHandle;

  function startWatch() {
    watchStopHandle = watch(
      filterInputValue,
      keyword => {
        const highlightRange = new Range();

        if (keyword) {
          if (options.contentDomRef.value) {
            const contentText = options.contentDomRef.value.firstChild?.textContent || '';
            const keywordIndex = contentText.toLowerCase().indexOf(keyword.toLowerCase());

            if (keywordIndex !== -1) {
              highlightRange.setStart(options.contentDomRef.value.firstChild!, keywordIndex);
              highlightRange.setEnd(
                options.contentDomRef.value.firstChild!,
                keywordIndex + keyword.length,
              );
              highlightRanges.value.set(itemProps.value, highlightRange);
            } else {
              highlightRanges.value.delete(itemProps.value);
            }
          } else {
            highlightRanges.value.delete(itemProps.value);
          }
        } else {
          highlightRanges.value.delete(itemProps.value);
        }
      },
      {
        deep: true,
        immediate: true,
        flush: 'post',
      },
    );
  }

  function stopWatch() {
    watchStopHandle?.();
  }

  return {
    startWatch,
    stopWatch,
  };
}
