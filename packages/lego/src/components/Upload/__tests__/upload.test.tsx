import { shallowMount } from '@vue/test-utils';
import NUpload from '../src/Upload';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Upload.tsx', () => {
  test('basic', async () => {
    const modelValue = ref([]);
    const wrapper = shallowMount(() => <NUpload modelValue={modelValue.value} />);
    const element = wrapper.findComponent(NUpload);

    expect(element.exists()).toBe(true);
  });
});
