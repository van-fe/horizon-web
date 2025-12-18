import { shallowMount } from '@vue/test-utils';
import NSkeleton from '../src/Skeleton';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('Skeleton.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = shallowMount(() => <NSkeleton />);
    const element = wrapper.findComponent(NSkeleton);

    expect(element.exists()).toBe(true);
  });
});
