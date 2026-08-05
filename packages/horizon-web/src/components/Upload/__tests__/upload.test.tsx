import { mount } from '@vue/test-utils';
import type { HUploadUserFile } from '..';
import { HUpload } from '..';
import { afterEach, describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

afterEach(() => {
  document.body.querySelectorAll('input[type="file"]').forEach(input => input.remove());
});

describe('Upload.tsx', () => {
  test('basic', async () => {
    const modelValue = ref<HUploadUserFile>();
    const wrapper = mount(() => <HUpload v-model={modelValue.value} action="" />);
    const element = wrapper.findComponent(HUpload);

    expect(element.exists()).toBe(true);
  });

  test('keeps the programmatic file input out of the tab order', async () => {
    const wrapper = mount(() => <HUpload action="" />);

    await nextTick();
    const fileInput = document.body.querySelector<HTMLInputElement>('input[type="file"]');

    expect(fileInput?.tabIndex).toBe(-1);

    wrapper.unmount();
  });
});
