import { shallowMount } from '@vue/test-utils';
import HProgress from '../src/Progress';
import { describe, expect, test } from 'vitest';

describe('Progress.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HProgress percentage={50} />);
    const element = wrapper.findComponent(HProgress);

    expect(element.exists()).toBe(true);
  });
});
