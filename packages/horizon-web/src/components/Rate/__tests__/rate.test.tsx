import { shallowMount } from '@vue/test-utils';
import HRate from '../src/Rate';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Rate.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <HRate modelValue={modelValue.value} />);
    const element = wrapper.findComponent(HRate);

    expect(element.exists()).toBe(true);
  });
});
