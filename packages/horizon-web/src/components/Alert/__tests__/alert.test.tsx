import { mount } from '@vue/test-utils';
import { HAlert } from '..';
import { describe, expect, test, vi } from 'vitest';

describe('Alert.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HAlert title="成功提示的文案" type="success" />);
    const element = wrapper.findComponent(HAlert);

    expect(element.exists()).toBe(true);
    expect(wrapper.find('[role="status"]').attributes('aria-live')).toBe('polite');
  });

  test('announces urgent alerts assertively', () => {
    const wrapper = mount(() => <HAlert title="Warning" type="warning" />);
    expect(wrapper.find('[role="alert"]').attributes('aria-live')).toBe('assertive');
  });

  test('renders description slot in preference to the description prop', () => {
    const wrapper = mount(HAlert, {
      props: { title: 'Title', description: 'fallback', rounded: false, size: 'small' },
      slots: { default: () => 'slot description' },
    });

    expect(wrapper.text()).toContain('slot description');
    expect(wrapper.text()).not.toContain('fallback');
    expect(wrapper.get('.h-alert').classes()).toContain('h-alert--small');
    expect(wrapper.get('.h-alert').classes()).not.toContain('is-round');
  });

  test.each([
    ['click', undefined],
    ['keydown', { key: 'Enter' }],
    ['keydown', { key: ' ' }],
  ] as const)('closes via %s and emits the event', async (event, options) => {
    const wrapper = mount(HAlert, { props: { title: 'Closable' } });
    const close = wrapper.find('[aria-label="Close alert"]');

    await close.trigger(event, options);

    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.get('.h-alert').attributes('style')).toContain('display: none');
  });

  test('action callbacks can close the alert and replace the close icon', async () => {
    const onPrimary = vi.fn((close: () => void) => close());
    const wrapper = mount(HAlert, {
      props: { title: 'Action', primaryButtonText: 'Retry', onPrimary },
    });

    expect(wrapper.find('[aria-label="Close alert"]').exists()).toBe(false);
    await wrapper.get('.h-link').trigger('click');
    expect(onPrimary).toHaveBeenCalledOnce();
    expect(wrapper.get('.h-alert').attributes('style')).toContain('display: none');
  });
});
