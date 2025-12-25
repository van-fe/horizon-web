import { shallowMount } from '@vue/test-utils';
import HDivider from '../src/Divider';
import { describe, expect, test } from 'vitest';

describe('Divider.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HDivider />);
    const element = wrapper.findComponent(HDivider);

    expect(element.exists()).toBe(true);
  });
});
