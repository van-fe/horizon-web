import { mount } from '@vue/test-utils';
import type { NUploadUserFile } from '..';
import { NUpload } from '..';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Upload.tsx', () => {
  test('basic', async () => {
    const modelValue = ref<NUploadUserFile>();
    const wrapper = mount(() => <NUpload v-model={modelValue.value} action="" />);
    const element = wrapper.findComponent(NUpload);

    expect(element.exists()).toBe(true);
  });
});
