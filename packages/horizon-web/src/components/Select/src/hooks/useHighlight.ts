import type { SelectProps, OptionProps } from '../composables/useProps';
import type { Ref, WatchStopHandle } from 'vue';
import { ref, provide, watch, inject } from 'vue';
import {
  HSelectHighlightContentRangesInjectKey,
  HSelectHighlightDescriptionRangesInjectKey,
  HSelectFilterInputValueInjectKey,
} from '../utils/injectKeys';

export default function useHighlight() {
  const highlightContentRanges = ref<Map<OptionProps['value'], Range>>(new Map());
  const highlightDescriptionRanges = ref<Map<OptionProps['value'], Range>>(new Map());

  watch(
    [highlightContentRanges, highlightDescriptionRanges],
    ([content, description]) => {
      if (CSS.highlights) {
        const highlight = new Highlight(
          ...Array.from(content.values()),
          ...Array.from(description.values()),
        );

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

  provide(HSelectHighlightContentRangesInjectKey, highlightContentRanges);
  provide(HSelectHighlightDescriptionRangesInjectKey, highlightDescriptionRanges);
}

export function useHighlightOption(
  selectProps: SelectProps,
  optionProps: OptionProps,
  options: {
    contentDomRef: Ref<HTMLElement | undefined>;
    descriptionDomRef: Ref<HTMLElement | undefined>;
  },
) {
  const highlightContentRanges = inject(HSelectHighlightContentRangesInjectKey)!;
  const highlightDescriptionRanges = inject(HSelectHighlightDescriptionRangesInjectKey)!;
  const filterInputValue = inject(HSelectFilterInputValueInjectKey)!;

  let watchStopHandle: WatchStopHandle;

  function startWatch() {
    watchStopHandle = watch(
      () => [filterInputValue.value, selectProps.panelFilterInputValue],
      ([filterInputValue, panelFilterInputValue]) => {
        const keyword = filterInputValue || panelFilterInputValue;
        const contentHighlightRange = new Range();
        const descriptionHighlightRange = new Range();

        if (keyword) {
          if (options.contentDomRef.value) {
            const contentText = options.contentDomRef.value.firstChild?.textContent || '';
            const keywordIndex = contentText.toLowerCase().indexOf(keyword.toLowerCase());

            if (keywordIndex !== -1) {
              contentHighlightRange.setStart(options.contentDomRef.value.firstChild!, keywordIndex);
              contentHighlightRange.setEnd(
                options.contentDomRef.value.firstChild!,
                keywordIndex + keyword.length,
              );
              highlightContentRanges.value.set(optionProps.value, contentHighlightRange);
            } else {
              highlightContentRanges.value.delete(optionProps.value);
            }
          } else {
            highlightContentRanges.value.delete(optionProps.value);
          }

          if (selectProps.descriptionFilterable && options.descriptionDomRef.value) {
            const descriptionText = options.descriptionDomRef.value.firstChild?.textContent || '';
            const keywordIndex = descriptionText.toLowerCase().indexOf(keyword.toLowerCase());

            if (keywordIndex !== -1) {
              descriptionHighlightRange.setStart(
                options.descriptionDomRef.value.firstChild!,
                keywordIndex,
              );
              descriptionHighlightRange.setEnd(
                options.descriptionDomRef.value.firstChild!,
                keywordIndex + keyword.length,
              );
              highlightDescriptionRanges.value.set(optionProps.value, descriptionHighlightRange);
            } else {
              highlightDescriptionRanges.value.delete(optionProps.value);
            }
          } else {
            highlightDescriptionRanges.value.delete(optionProps.value);
          }
        } else {
          highlightContentRanges.value.delete(optionProps.value);
          highlightDescriptionRanges.value.delete(optionProps.value);
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
