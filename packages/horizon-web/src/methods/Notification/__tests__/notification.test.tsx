import { mount, shallowMount } from '@vue/test-utils';
import HNotification from '../src/components/Notification';
import { afterEach, describe, expect, test } from 'vitest';
import { nextTick } from 'vue';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Notification.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HNotification title="Test Title" content="Message" />);
    const element = wrapper.findComponent(HNotification);

    expect(element.exists()).toBe(true);
  });

  test.each([
    ['top-right', 'h-transition--slide-left'],
    ['bottom-right', 'h-transition--slide-left'],
    ['top-left', 'h-transition--slide-right'],
    ['bottom-left', 'h-transition--slide-right'],
  ] as const)('uses the edge transition for %s', async (placement, transitionName) => {
    const wrapper = mount(HNotification, {
      attachTo: document.body,
      props: {
        placement,
        title: 'Test Title',
        content: 'Message',
      },
      global: {
        stubs: {
          teleport: false,
          transition: false,
        },
      },
    });
    await nextTick();
    const notification = document.body.querySelector('.h-notification');

    expect(notification?.classList).toContain(`${transitionName}-enter-active`);
    wrapper.unmount();
  });
});
