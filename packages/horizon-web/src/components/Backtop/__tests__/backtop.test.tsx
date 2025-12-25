import { shallowMount } from '@vue/test-utils';
import HBacktop from '../src/Backtop';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Backtop.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <HBacktop />);
    const element = wrapper.findComponent(HBacktop);

    expect(element.exists()).toBe(true);
  });
});
