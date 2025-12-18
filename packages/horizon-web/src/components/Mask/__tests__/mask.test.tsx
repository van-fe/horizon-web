import { shallowMount } from '@vue/test-utils';
import NMask from '../src/Mask';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Mask.tsx', () => {
  test('basic', async () => {
    const modelValue = ref(false);
    const wrapper = shallowMount(() => <NMask />);
    const element = wrapper.findComponent(NMask);

    expect(element.exists()).toBe(true);
  });
});
