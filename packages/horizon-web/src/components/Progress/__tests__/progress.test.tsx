import { mount } from '@vue/test-utils';
import HProgress from '../src/Progress';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

describe('Progress.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HProgress percentage={50} />);
    const element = wrapper.findComponent(HProgress);

    expect(element.exists()).toBe(true);
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('50');
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuemax')).toBe('100');
  });

  test.each([
    [-10, '0'],
    [140, '100'],
  ])('clamps %s for assistive technology', (percentage, expected) => {
    const wrapper = mount(() => <HProgress percentage={percentage} />);
    expect(wrapper.get('[role="progressbar"]').attributes('aria-valuenow')).toBe(expected);
  });

  test('renders custom formatted content and updates it reactively', async () => {
    const percentage = ref(25);
    const wrapper = mount(() => (
      <HProgress percentage={percentage.value} format={value => `${value} tasks`} textBold />
    ));

    expect(wrapper.get('[role="progressbar"]').attributes('aria-valuetext')).toBe('25 tasks');
    expect(wrapper.get('.h-progress__text span').text()).toBe('25 tasks');
    expect(wrapper.get('.h-progress__text span').attributes('style')).toContain('font-weight: bold');

    percentage.value = 75;
    await nextTick();
    expect(wrapper.get('.h-progress-bar__inner').attributes('style')).toContain('width: 75%');
    expect(wrapper.get('[role="progressbar"]').attributes('aria-valuetext')).toBe('75 tasks');
  });

  test('supports percentage threshold color arrays', () => {
    const color = [
      { color: 'green', percentage: 30 },
      { color: 'red', percentage: 80 },
    ];
    const wrapper = mount(() => <HProgress percentage={50} color={color} />);

    expect(wrapper.get('.h-progress-bar__inner').attributes('style')).toContain(
      'background-color: red',
    );
  });

  test.each(['circle', 'dashboard'] as const)('renders an accessible %s variant', type => {
    const wrapper = mount(() => <HProgress type={type} percentage={40} />);

    expect(wrapper.find('.h-progress-bar').exists()).toBe(false);
    expect(wrapper.findAll('svg path')).toHaveLength(2);
    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true');
    expect(wrapper.get('[role="progressbar"]').attributes('aria-valuetext')).toBe('40%');
  });

  test('hides text when requested and for a mini circle', () => {
    const hidden = mount(() => <HProgress percentage={20} showText={false} />);
    const miniCircle = mount(() => <HProgress type="circle" size="mini" percentage={20} />);

    expect(hidden.find('.h-progress__text').exists()).toBe(false);
    expect(miniCircle.find('.h-progress__text').exists()).toBe(false);
  });
});
