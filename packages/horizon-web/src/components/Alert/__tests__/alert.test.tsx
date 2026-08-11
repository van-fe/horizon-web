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

  test.each(['success', 'info', 'warning', 'error'] as const)(
    'renders the %s presentation and optional icon',
    type => {
      const wrapper = mount(HAlert, { props: { title: type, type, showIcon: true } });

      expect(wrapper.get('.h-alert').classes()).toContain(`h-alert--${type}`);
      expect(wrapper.find('.h-alert__icon-box svg').exists()).toBe(true);
    },
  );

  test('respects closable and renders both action callbacks', async () => {
    const onPrimary = vi.fn();
    const onDefault = vi.fn();
    const wrapper = mount(HAlert, {
      props: {
        title: 'Actions',
        description: 'Choose an action',
        closable: false,
        primaryButtonText: 'Retry',
        defaultButtonText: 'Dismiss',
        onPrimary,
        onDefault,
      },
    });

    expect(wrapper.find('[aria-label="Close alert"]').exists()).toBe(false);
    const actions = wrapper.findAll('.h-link');
    expect(actions.map(action => action.text())).toEqual(['Retry', 'Dismiss']);
    await actions[0].trigger('click');
    await actions[1].trigger('click');
    expect(onPrimary).toHaveBeenCalledOnce();
    expect(onDefault).toHaveBeenCalledOnce();
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

  test('ignores unrelated close-button keys', async () => {
    const closable = mount(HAlert, { props: { title: 'Keyboard', closable: true } });
    await closable.get('[aria-label="Close alert"]').trigger('keydown', { key: 'Escape' });
    expect(closable.emitted('close')).toBeUndefined();
    expect(closable.get('.h-alert').attributes('style') ?? '').not.toContain('display: none');
  });

  test('moves actions below a measured multiline description in the real browser', async () => {
    const wrapper = mount(HAlert, {
      props: {
        title: 'Measured alert',
        description: 'A description measured by the browser resize and intersection observers.',
        primaryButtonText: 'Continue',
      },
      attachTo: document.body,
    });
    const description = wrapper.get('.h-alert__description').element as HTMLElement;
    description.style.lineHeight = '10px';
    description.style.height = '20px';

    await vi.waitFor(() =>
      expect(wrapper.get('.h-alert__action').classes()).toContain('is-bottom'),
    );
    wrapper.unmount();
  });

  test('keeps an offscreen alert mounted while its intersection observer reports false', async () => {
    const wrapper = mount(HAlert, {
      props: { title: 'Offscreen', description: 'Still available' },
      attrs: { style: 'position: fixed; top: 200vh' },
      attachTo: document.body,
    });

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(wrapper.get('.h-alert').attributes('role')).toBe('status');
    wrapper.unmount();
  });
});
