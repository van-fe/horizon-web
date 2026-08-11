import { type CSSProperties, type Ref, ref, watch } from 'vue';
import calculateAutoSizeStyle from '../utils/calculateNodeHeight';

export type AutoSize = boolean | { minRows?: number; maxRows?: number };
export const useAutoSizeStyle = (
  textareaRef: Ref<HTMLTextAreaElement | null>,
  modelValue: Ref<string>,
  autoSize: Ref<AutoSize>,
): Ref<CSSProperties> => {
  const autoSizeStyle = ref<CSSProperties>({});
  watch(
    [modelValue, textareaRef, autoSize],
    async () => {
      if (!textareaRef.value) return;
      const textarea = textareaRef.value;
      if (autoSize.value) {
        let minRows = null;
        let maxRows = null;
        if (typeof autoSize.value === 'object') {
          minRows = autoSize.value.minRows;
          maxRows = autoSize.value.maxRows;
        }
        autoSizeStyle.value = calculateAutoSizeStyle(textarea, false, minRows, maxRows);
      }
      // const style = window.getComputedStyle(textarea);
      // const PADDING_VERTICAL =
      //   parseFloat(style.getPropertyValue('padding-bottom')) +
      //   parseFloat(style.getPropertyValue('padding-top'));
      // if (autoSize.value) {
      //   if (typeof autoSize.value === 'object') {
      //     const minRows = autoSize.value.minRows;
      //     const maxRows = autoSize.value.maxRows;
      //     autoSizeStyle.value.resize = 'none';
      //     if (minRows) {
      //       const minHeight = minRows * LINE_HEIGHT + PADDING_VERTICAL;
      //       autoSizeStyle.value.minHeight = `${minHeight}px`;
      //       autoSizeStyle.value.height = 'auto';
      //       nextTick().then(() => {
      //         autoSizeStyle.value.height = `${Math.max(minHeight, textarea.scrollHeight)}px`;
      //       });
      //     }
      //     if (maxRows) {
      //       const maxHeight = maxRows * LINE_HEIGHT + PADDING_VERTICAL;
      //       autoSizeStyle.value.maxHeight = `${maxHeight}px`;
      //       autoSizeStyle.value.height = 'auto';
      //       nextTick().then(() => {
      //         autoSizeStyle.value.height = `${Math.min(maxHeight, textarea.scrollHeight)}px`;
      //       });
      //     }
      //   } else {
      //     autoSizeStyle.value.height = 'auto';
      //     await nextTick();
      //     autoSizeStyle.value.height = `${textarea.scrollHeight}px`;
      //   }
      // }
    },
    { immediate: true },
  );
  return autoSizeStyle;
};
