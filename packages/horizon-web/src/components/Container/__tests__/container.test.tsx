import { shallowMount } from '@vue/test-utils';
import HContainer from '../src/Container';
import { describe, expect, test } from 'vitest';

describe('Container.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HContainer />);
    const element = wrapper.findComponent(HContainer);

    expect(element.exists()).toBe(true);
  });
});
