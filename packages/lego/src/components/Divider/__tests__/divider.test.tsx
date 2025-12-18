import { shallowMount } from '@vue/test-utils';
import NDivider from '../src/Divider';
import { describe, expect, test } from 'vitest';

describe('Divider.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NDivider />);
    const element = wrapper.findComponent(NDivider);

    expect(element.exists()).toBe(true);
  });
});
