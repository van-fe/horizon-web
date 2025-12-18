import type { CSSProperties, Ref } from 'vue';
import { nextTick, ref, watch } from 'vue';

export const useLimitStyle = (
  textareaRef: Ref<HTMLTextAreaElement | null>,
  modelValue: Ref<string>,
): Ref<CSSProperties> => {
  const limitCountStyle = ref<CSSProperties>({});
  watch(
    [() => modelValue, textareaRef],
    async () => {
      const textarea = textareaRef.value;
      if (!textarea) return;
      await nextTick();
      const right = textarea?.offsetWidth - textarea?.clientWidth;
      limitCountStyle.value = {
        // 12px is the padding of the textarea
        right: `${right + 12}px`,
      };
    },
    { immediate: true },
  );
  return limitCountStyle;
};
