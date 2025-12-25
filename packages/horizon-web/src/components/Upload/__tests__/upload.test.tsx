import { mount } from '@vue/test-utils';
import type { HUploadUserFile } from '..';
import { HUpload } from '..';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Upload.tsx', () => {
  test('basic', async () => {
    const modelValue = ref<HUploadUserFile>();
    const wrapper = mount(() => <HUpload v-model={modelValue.value} action="" />);
    const element = wrapper.findComponent(HUpload);

    expect(element.exists()).toBe(true);
  });
});
