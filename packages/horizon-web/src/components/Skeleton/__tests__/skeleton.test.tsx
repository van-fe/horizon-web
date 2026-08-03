import { shallowMount } from '@vue/test-utils';
import HSkeleton from '../src/Skeleton';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Skeleton.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <HSkeleton />);
    const element = wrapper.findComponent(HSkeleton);

    expect(element.exists()).toBe(true);
  });
});
