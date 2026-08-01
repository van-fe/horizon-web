import { shallowMount } from '@vue/test-utils';
import HTimeline from '../src/Timeline';
import { describe, expect, test } from 'vitest';

describe('Timeline.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HTimeline />);
    const element = wrapper.findComponent(HTimeline);

    expect(element.exists()).toBe(true);
  });
});
