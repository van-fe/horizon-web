import { shallowMount } from '@vue/test-utils';
import HMask from '../src/Mask';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Mask.tsx', () => {
  test('basic', async () => {
    const modelValue = ref(false);
    const wrapper = shallowMount(() => <HMask />);
    const element = wrapper.findComponent(HMask);

    expect(element.exists()).toBe(true);
  });
});
