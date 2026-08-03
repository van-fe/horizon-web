import { shallowMount } from '@vue/test-utils';
import HNotification from '../src/components/Notification';
import { describe, expect, test } from 'vitest';

describe('Notification.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HNotification title="Test Title" content="Message" />);
    const element = wrapper.findComponent(HNotification);

    expect(element.exists()).toBe(true);
  });
});
