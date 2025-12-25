import { shallowMount } from '@vue/test-utils';
import HLoadingBar from '../src/components/LoadingBar';
import { describe, expect, test } from 'vitest';

describe('LoadingBar.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HLoadingBar />);
    const element = wrapper.findComponent(HLoadingBar);

    expect(element.exists()).toBe(true);
  });
});
