import { mount } from '@vue/test-utils';
import HCount from '../src/Count';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';

afterEach(() => {
  vi.useRealTimers();
});

describe('Count.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HCount endValue={10} />);
    const element = wrapper.findComponent(HCount);

    expect(element.exists()).toBe(true);
  });

  test('formats a completed value and renders prefix and suffix props', () => {
    const wrapper = mount(() => (
      <HCount
        startValue={0}
        endValue={-12345.6}
        autoPlay={false}
        decimal={2}
        separator="_"
        extent={3}
        prefix="$"
        suffix=" USD"
      />
    ));

    expect(wrapper.text()).toBe('$-12_345.60 USD');
    expect(wrapper.findComponent(HCount).emitted('change')).toEqual([[-12345.6]]);
  });

  test('slots take precedence over prefix and suffix props', () => {
    const wrapper = mount(() => (
      <HCount endValue={8} autoPlay={false} prefix="prop-prefix" suffix="prop-suffix">
        {{
          prefix: () => <span class="prefix">Slot prefix</span>,
          suffix: () => <span class="suffix">Slot suffix</span>,
        }}
      </HCount>
    ));

    expect(wrapper.find('.prefix').text()).toBe('Slot prefix');
    expect(wrapper.find('.suffix').text()).toBe('Slot suffix');
    expect(wrapper.text()).not.toContain('prop-prefix');
    expect(wrapper.text()).not.toContain('prop-suffix');
  });

  test('reacts when autoplay is turned off', async () => {
    vi.useFakeTimers();
    const autoPlay = ref(true);
    const wrapper = mount(() => (
      <HCount startValue={1} endValue={5} autoPlay={autoPlay.value} delay={20} />
    ));

    expect(wrapper.find('.h-count__content').text()).toBe('1');

    autoPlay.value = false;
    await nextTick();

    expect(wrapper.find('.h-count__content').text()).toBe('5');
    expect(wrapper.findComponent(HCount).emitted('change')?.at(-1)).toEqual([5]);
  });
});
