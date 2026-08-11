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

  test('can disable grouping and renders string values and suffixes unchanged', () => {
    const number = mount(HStatistic, {
      props: { value: 12345.6, useGrouping: false, suffix: 'ms' },
    });
    const string = mount(HStatistic, { props: { value: 'N/A' } });

    expect(number.get('.h-statistic__number').text()).toBe('12345.6');
    expect(number.get('.h-statistic__suffix').text()).toBe('ms');
    expect(string.get('.h-statistic__number').text()).toBe('N/A');
  });

  test('all presentation slots override their matching props', () => {
    const wrapper = mount(HStatistic, {
      props: {
        title: 'prop title',
        value: 1,
        prefix: '$',
        suffix: 'USD',
        trend: 'down',
        trendValue: '1%',
      },
      slots: {
        title: '<b data-title>slot title</b>',
        default: '<b data-value>slot value</b>',
        prefix: '<b data-prefix>slot prefix</b>',
        suffix: '<b data-suffix>slot suffix</b>',
        trend: '<b data-trend>slot trend</b>',
      },
    });

    expect(wrapper.get('[data-title]').text()).toBe('slot title');
    expect(wrapper.get('[data-value]').text()).toBe('slot value');
    expect(wrapper.get('[data-prefix]').text()).toBe('slot prefix');
    expect(wrapper.get('[data-suffix]').text()).toBe('slot suffix');
    expect(wrapper.get('[data-trend]').text()).toBe('slot trend');
    expect(wrapper.text()).not.toContain('prop title');
  });

  test.each([
    ['up', 'success', 'Increased'],
    ['down', 'neutral', 'Decreased'],
  ] as const)('renders %s trend using the explicit %s semantic', (trend, trendType, label) => {
    const wrapper = mount(HStatistic, { props: { value: 1, trend, trendType } });
    const output = wrapper.get('.h-statistic__trend');

    expect(output.classes()).toContain(`h-statistic--trend-${trendType}`);
    expect(output.attributes('aria-label')).toBe(label);
    expect(output.find('svg').exists()).toBe(true);
  });

  test('renders a trend value without directional icon semantics', () => {
    const wrapper = mount(HStatistic, {
      props: { value: 5, trend: 'none', trendValue: 'baseline' },
    });
    const trend = wrapper.get('.h-statistic__trend');
    expect(trend.text()).toBe('baseline');
    expect(trend.attributes('aria-label')).toBeUndefined();
    expect(trend.find('svg').exists()).toBe(false);
  });
});
