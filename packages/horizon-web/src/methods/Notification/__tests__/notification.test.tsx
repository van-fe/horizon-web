import { shallowMount } from '@vue/test-utils';
import NNotification from '../src/components/Notification';
import { describe, expect, test } from 'vitest';

describe('Notification.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NNotification title="Test Title" content="Message" />);
    const element = wrapper.findComponent(NNotification);

    expect(element.exists()).toBe(true);
  });
});
