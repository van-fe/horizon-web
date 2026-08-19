import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import LoadingIcon from '../../../directives/v-loading/src/components/LoadingIcon';
import { dictionaries } from '../../../locales';
import HSpin from '../src/Spin';

describe('Spin', () => {
  test('renders sized fullscreen masked content through the default slot', () => {
    const wrapper = mount(HSpin, {
      props: { size: 'large', mask: true, fullscreen: true },
      slots: { default: () => <button data-test="spin-content">Save</button> },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['h-spin--large', 'is-fullscreen', 'is-masked', 'is-nested']),
    );
    expect(wrapper.get('[data-test="spin-content"]').text()).toBe('Save');
    expect(wrapper.find('.h-spin__overlay').exists()).toBe(true);
  });

  test('renders an accessible inline loading status', () => {
    const wrapper = mount(HSpin, { props: { tip: 'Loading data' } });

    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBe('Loading data');
    expect(wrapper.find('.a-icon').exists() || wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading data');
  });

  test('reuses the v-loading circle icon on the first render', () => {
    const wrapper = mount(HSpin);
    const indicator = wrapper.getComponent(LoadingIcon);

    expect(indicator.classes()).toContain('h-loading-icon');
    expect(indicator.classes()).toContain('h-spin__icon');
    expect(indicator.get('circle').classes()).toContain('h-loading-icon__path');
    expect(indicator.find('animateTransform').exists()).toBe(false);
  });

  test('wraps content and reflects aria-busy', async () => {
    const spinning = ref(true);
    const wrapper = mount(() => (
      <HSpin spinning={spinning.value}>
        <button>Save</button>
      </HSpin>
    ));

    expect(wrapper.attributes('aria-busy')).toBe('true');
    expect(wrapper.find('.h-spin__overlay').exists()).toBe(true);
    spinning.value = false;
    await nextTick();
    expect(wrapper.attributes('aria-busy')).toBe('false');
    expect(wrapper.find('.h-spin__overlay').exists()).toBe(false);
  });

  test('honors delay and cancels stale timers', async () => {
    vi.useFakeTimers();
    const spinning = ref(true);
    const wrapper = mount(() => <HSpin spinning={spinning.value} delay={100} />);
    expect(wrapper.find('[role="status"]').exists()).toBe(false);

    await vi.advanceTimersByTimeAsync(50);
    spinning.value = false;
    await nextTick();
    await vi.advanceTimersByTimeAsync(100);
    expect(wrapper.find('[role="status"]').exists()).toBe(false);
    vi.useRealTimers();
  });

  test('shows after a completed delay and clears the settled timer on unmount', async () => {
    vi.useFakeTimers();
    const wrapper = mount(HSpin, { props: { delay: 75, tip: 'Delayed' } });
    expect(wrapper.find('[role="status"]').exists()).toBe(false);
    await vi.advanceTimersByTimeAsync(75);
    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBe('Delayed');
    wrapper.unmount();
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });

  test('renders a custom tip slot and returns no inline node while stopped', async () => {
    const spinning = ref(false);
    const stopped = mount(() => <HSpin spinning={spinning.value} />);
    expect(stopped.html()).toBe('');

    const custom = mount(HSpin, {
      slots: { tip: () => <span data-test="spin-tip">Custom tip</span> },
    });
    expect(custom.get('[data-test="spin-tip"]').text()).toBe('Custom tip');
    expect(custom.get('[role="status"]').attributes('aria-label')).toBeTruthy();
  });

  test('supports custom indicator content', () => {
    const wrapper = mount(HSpin, {
      slots: { indicator: '<span class="custom-indicator">...</span>' },
    });
    expect(wrapper.find('.custom-indicator').exists()).toBe(true);
  });

  test('provides a loading label in every supported locale', () => {
    Object.values(dictionaries).forEach(dictionary => {
      expect(dictionary.horizonWeb.spin.loading).toBeTruthy();
    });
  });
});
