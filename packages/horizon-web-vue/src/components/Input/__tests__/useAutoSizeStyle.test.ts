import { type Ref, ref } from 'vue';
import { type AutoSize, useAutoSizeStyle } from '../src/composables/useAutoSizeStyle';
import { beforeEach, describe, expect, test } from 'vitest';

describe('useAutoSizeStyle', () => {
  const textareaRef = ref<HTMLTextAreaElement | null>(null);
  let modelValue: Ref<string>;
  let autoSize: Ref<AutoSize>;

  beforeEach(() => {
    textareaRef.value = document.createElement('textarea');
    textareaRef.value!.style.lineHeight = '22px';
    textareaRef.value!.style.padding = '5px 12px';
    textareaRef.value!.rows = 2;
    modelValue = ref('');
    autoSize = ref(false);
  });

  test('should not change style when autoSize is false', async () => {
    const style = useAutoSizeStyle(textareaRef, modelValue, autoSize);
    expect(style.value).toEqual({});
  });
});
