import { useResizeObserver } from '@vueuse/core';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

type PopoverPositionController = {
  updatePosition: () => void;
};

type UseMentionsMeasureOptions = {
  textarea: Ref<HTMLTextAreaElement | undefined>;
  value: Ref<string>;
  cursor: Ref<number>;
  visible: ComputedRef<boolean>;
};

/**
 * Keeps an Ant Design-style text mirror aligned with the textarea and refreshes its caret popup.
 */
export function useMentionsMeasure(options: UseMentionsMeasureOptions) {
  const measure = ref<HTMLDivElement>();
  const popover = ref<PopoverPositionController>();
  const direction = ref<'ltr' | 'rtl'>('ltr');
  const textBeforeCaret = computed(() => options.value.value.slice(0, options.cursor.value));
  const textAfterCaret = computed(() => options.value.value.slice(options.cursor.value));

  function syncMeasure() {
    const textarea = options.textarea.value;
    const mirror = measure.value;
    if (!textarea || !mirror) return;

    mirror.scrollTop = textarea.scrollTop;
    mirror.scrollLeft = textarea.scrollLeft;
    direction.value = getComputedStyle(textarea).direction === 'rtl' ? 'rtl' : 'ltr';
    popover.value?.updatePosition();
  }

  function schedulePositionUpdate() {
    void nextTick(syncMeasure);
  }

  function onTextareaScroll() {
    syncMeasure();
  }

  onMounted(schedulePositionUpdate);
  useResizeObserver(options.textarea, schedulePositionUpdate);
  watch([options.value, options.cursor, options.visible], schedulePositionUpdate, {
    flush: 'post',
  });

  return {
    measure,
    popover,
    direction,
    textBeforeCaret,
    textAfterCaret,
    onTextareaScroll,
    syncMeasure,
  };
}
