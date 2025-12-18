import { shallowMount } from '@vue/test-utils';
import NBacktop from '../src/Backtop';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Backtop.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <NBacktop />);
    const element = wrapper.findComponent(NBacktop);

    expect(element.exists()).toBe(true);
  });
});
