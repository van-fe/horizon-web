import { mount } from '@vue/test-utils';
import HProgress from '../src/Progress';
import { describe, expect, test, vi } from 'vitest';
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
    expect(wrapper.get('.h-progress__text span').attributes('style')).toContain(
      'font-weight: bold',
    );

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

  test('supports string color series, the final threshold, and zero-width fallbacks', () => {
    const first = mount(() => <HProgress percentage={20} color={['red', 'green']} />);
    const last = mount(() => <HProgress percentage={100} color={['red', 'green']} />);
    const zero = mount(() => <HProgress percentage={0} color="rgb(1, 2, 3)" />);
    const zeroCircle = mount(() => <HProgress type="circle" percentage={0} />);

    expect((first.get('.h-progress-bar__inner').element as HTMLElement).style.backgroundColor).toBe(
      'red',
    );
    expect((last.get('.h-progress-bar__inner').element as HTMLElement).style.backgroundColor).toBe(
      'green',
    );
    expect((zero.get('.h-progress-bar__inner').element as HTMLElement).style.width).toBe('6px');
    expect((zero.get('.h-progress-bar__inner').element as HTMLElement).style.backgroundColor).toBe(
      'rgb(1, 2, 3)',
    );
    expect(zeroCircle.findAll('svg path')[1].attributes('stroke-width')).toBe('0');
  });

  test.each(['success', 'warning', 'exception', 'error', undefined] as const)(
    'maps circle status %s to a concrete stroke',
    status => {
      const wrapper = mount(() => <HProgress type="circle" percentage={30} status={status} />);
      expect(wrapper.findAll('svg path')[1].attributes('stroke')).toContain('var(--h-');
    },
  );

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

  test.each([
    ['mini', '2px'],
    ['small', '4px'],
    ['medium', '6px'],
    ['large', '8px'],
  ] as const)('maps the %s size to a real line height', (size, height) => {
    const wrapper = mount(() => <HProgress percentage={10} size={size} />);

    expect(wrapper.classes()).toContain(`h-progress-${size}`);
    expect((wrapper.get('.h-progress-bar__outer').element as HTMLElement).style.height).toBe(
      height,
    );
  });

  test.each(['success', 'warning', 'exception', 'error'] as const)(
    'renders the %s status instead of percentage text',
    status => {
      const wrapper = mount(() => <HProgress percentage={60} status={status} />);

      expect(wrapper.classes()).toContain(`h-progress-status-${status}`);
      expect(wrapper.get('.h-progress__text').find('svg').exists()).toBe(true);
      expect(wrapper.get('.h-progress__text').text()).toBe('');
    },
  );

  test('applies duration, function color, explicit content and follow placement', () => {
    const color = vi.fn((percentage: number) => (percentage > 50 ? 'rgb(255, 0, 0)' : 'blue'));
    const wrapper = mount(() => (
      <HProgress percentage={75} duration={1.5} color={color} content="3 of 4" placement="follow" />
    ));
    const inner = wrapper.get('.h-progress-bar__inner').element as HTMLElement;
    const text = wrapper.get('.h-progress__text').element as HTMLElement;

    expect(color).toHaveBeenCalledWith(75);
    expect(inner.style.animationDuration).toBe('1.5s');
    expect(inner.style.backgroundColor).toBe('rgb(255, 0, 0)');
    expect(wrapper.get('[role="progressbar"]').attributes('aria-valuetext')).toBe('3 of 4');
    expect(wrapper.get('.h-progress__text').text()).toBe('3 of 4');
    expect(text.style.right).toBe('25%');
  });

  test('renders the declared default slot in the progress text area', () => {
    const wrapper = mount(HProgress, {
      props: { percentage: 40 },
      slots: { default: '<span data-progress-slot>16 of 40 files</span>' },
    });

    expect(wrapper.get('[data-progress-slot]').text()).toBe('16 of 40 files');
    expect(wrapper.get('.h-progress__text').text()).toBe('16 of 40 files');
    expect(wrapper.get('[role="progressbar"]').attributes('aria-valuenow')).toBe('40');
  });
});
