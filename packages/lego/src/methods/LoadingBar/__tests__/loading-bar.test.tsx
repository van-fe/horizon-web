import { shallowMount } from '@vue/test-utils';
import NLoadingBar from '../src/components/LoadingBar';
import { describe, expect, test } from 'vitest';

describe('LoadingBar.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NLoadingBar />);
    const element = wrapper.findComponent(NLoadingBar);

    expect(element.exists()).toBe(true);
  });
});
