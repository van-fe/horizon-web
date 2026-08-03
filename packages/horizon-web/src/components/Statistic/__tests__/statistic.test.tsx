import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import HSpin from '../../Spin/src/Spin';
import { dictionaries } from '../../../locales';
import HStatistic from '../src/Statistic';

describe('Statistic', () => {
  test('formats numbers with locale and precision', () => {
    const wrapper = mount(HStatistic, {
      props: { title: 'Revenue', value: 12345.6, precision: 2, locale: 'en-US', prefix: '$' },
    });

    expect(wrapper.find('.h-statistic__title').text()).toBe('Revenue');
    expect(wrapper.find('.h-statistic__number').text()).toBe('12,345.60');
    expect(wrapper.find('.h-statistic__prefix').text()).toBe('$');
  });

  test('supports custom formatter and value slot', () => {
    const formatted = mount(HStatistic, {
      props: { value: 0.86, formatter: value => `${Number(value) * 100}%` },
    });
    expect(formatted.find('.h-statistic__number').text()).toBe('86%');

    const slotted = mount(HStatistic, {
      props: { value: 12 },
      slots: { default: '<strong data-value>Custom</strong>' },
    });
    expect(slotted.get('[data-value]').text()).toBe('Custom');
  });

  test('renders explicit trend semantics', () => {
    const wrapper = mount(HStatistic, {
      props: { value: 42, trend: 'up', trendValue: '8%', trendType: 'danger' },
    });
    const trend = wrapper.get('.h-statistic__trend');
    expect(trend.classes()).toContain('h-statistic--trend-danger');
    expect(trend.text()).toContain('8%');
    expect(trend.attributes('aria-label')).toBe('Increased');
  });

  test('reuses Horizon Spin for loading state', () => {
    const wrapper = mount(HStatistic, { props: { value: 42, loading: true } });
    expect(wrapper.findComponent(HSpin).exists()).toBe(true);
    expect(wrapper.attributes('aria-busy')).toBe('true');
    expect(wrapper.find('[role="status"]').exists()).toBe(true);
  });

  test('provides trend labels in every supported locale', () => {
    Object.values(dictionaries).forEach(dictionary => {
      expect(dictionary.horizonWeb.statistic.increase).toBeTruthy();
      expect(dictionary.horizonWeb.statistic.decrease).toBeTruthy();
    });
  });
});
