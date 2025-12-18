import { shallowMount } from '@vue/test-utils';
import NRate from '../src/Rate';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Rate.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <NRate modelValue={modelValue.value} />);
    const element = wrapper.findComponent(NRate);

    expect(element.exists()).toBe(true);
  });
});
