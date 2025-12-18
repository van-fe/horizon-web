import { shallowMount } from '@vue/test-utils';
import NProgress from '../src/Progress';
import { describe, expect, test } from 'vitest';

describe('Progress.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NProgress percentage={50} />);
    const element = wrapper.findComponent(NProgress);

    expect(element.exists()).toBe(true);
  });
});
