import { IconLoadingLine } from '@aurora/icon';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { dictionaries } from '../../../locales';
import HSpin from '../src/Spin';

describe('Spin', () => {
  test('renders an accessible inline loading status', () => {
    const wrapper = mount(HSpin, { props: { tip: 'Loading data' } });

    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBe('Loading data');
    expect(wrapper.find('.a-icon').exists() || wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading data');
  });

  test('starts a visually distinct default indicator on the first render', () => {
    const wrapper = mount(HSpin);
    const indicator = wrapper.getComponent(IconLoadingLine);

    expect(indicator.props('spin')).toBeUndefined();
    expect(indicator.classes()).toContain('h-icon__loading_line');
    expect(indicator.classes()).toContain('h-spin__icon');
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
