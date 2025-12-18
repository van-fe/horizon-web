import { shallowMount } from '@vue/test-utils';
import NContainer from '../src/Container';
import { describe, expect, test } from 'vitest';

describe('Container.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NContainer />);
    const element = wrapper.findComponent(NContainer);

    expect(element.exists()).toBe(true);
  });
});
