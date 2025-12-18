import { mount } from '@vue/test-utils';
import type { NUploadV2UserFile } from '..';
import { NUploadV2 } from '..';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('UploadV2.tsx', () => {
  test('basic', async () => {
    const modelValue = ref<NUploadV2UserFile>();
    const wrapper = mount(() => <NUploadV2 v-model={modelValue.value} action="" />);
    const element = wrapper.findComponent(NUploadV2);

    expect(element.exists()).toBe(true);
  });
});
