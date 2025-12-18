import type { Ref } from 'vue';
import { nextTick, ref } from 'vue';
import { warn } from '~/utils/useLog';

/**
 * learn from antd.
 * To correct caret position while using formatter prop
 * @param inputRef
 * @param focused
 */
export default function useCursor(inputRef: Ref<HTMLInputElement | null>, focused: Ref<boolean>) {
  const selectionRef = ref<{
    start: number;
    end: number;
    value: string;
    beforeTxt: string;
    afterTxt: string;
  }>();

  function recordCursor() {
    if (inputRef.value) {
      const { selectionStart, selectionEnd, value } = inputRef.value;

      const start = selectionStart || 0;
      const end = selectionEnd || 0;

      const beforeTxt = value.substring(0, start || 0);
      const afterTxt = value.substring(end || 0);

      selectionRef.value = {
        start,
        end,
        value,
        beforeTxt,
        afterTxt,
      };
    }
  }

  function restoreCursor(showValue: string) {
    if (selectionRef.value && focused.value) {
      try {
        const { beforeTxt, afterTxt, start } = selectionRef.value;

        let startPos = showValue.length;

        if (showValue.endsWith(afterTxt)) {
          startPos = showValue.length - selectionRef.value.afterTxt.length;
        } else if (showValue.startsWith(beforeTxt)) {
          startPos = beforeTxt.length;
        } else {
          const beforeLastChar = beforeTxt[start - 1];
          const newIndex = showValue.indexOf(beforeLastChar, start - 1);
          if (newIndex !== -1) {
            startPos = newIndex + 1;
          }
        }

        void nextTick(() => {
          inputRef.value!.setSelectionRange(startPos, startPos);
        });
      } catch (e) {
        warn(
          'input-number',
          `Something warning of cursor restore. Please fire issue about this: ${
            (e as unknown as Error).message
          }`,
        );
      }
    }
  }

  return { recordCursor, restoreCursor };
}
