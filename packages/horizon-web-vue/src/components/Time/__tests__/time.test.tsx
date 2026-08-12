import { shallowMount, mount } from '@vue/test-utils';
import HTime from '../src/Time';
import { describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

describe('Time.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HTime />);
    const element = wrapper.findComponent(HTime);

    expect(element.exists()).toBe(true);
  });

  test('calculative time', async () => {
    const wrapper = mount(HTime, {
      props: {
        endTime: +new Date('2023-02-27 16:27:30'),
        time: +new Date('2023-02-27 16:27:35'),
        calculative: true,
      },
    });
    await nextTick();
    expect(wrapper.find('.h-time').text()).toBe('00:00:05');
  });

  test('time', async () => {
    const wrapper = mount(HTime);
    await delay(1000);
    await nextTick();
    expect(wrapper.find('.h-time').text()).toBe('00:00:09');
  });

  test('passes the complete duration object to the scoped default slot', async () => {
    const wrapper = mount(HTime, {
      props: { time: 1_000_000_000_000, calculative: true, endTime: 1_000_090_061_000 },
      slots: {
        default: (scope?: { dd?: number; hh?: number; mm?: number; ss: number }) => {
          const { dd, hh, mm, ss } = scope ?? { ss: 0 };
          return `${dd ?? 0} days ${hh ?? 0} hours ${mm ?? 0} minutes ${ss} seconds`;
        },
      },
    });

    await nextTick();
    expect(wrapper.text()).toBe('1 days 1 hours 1 minutes 1 seconds');
  });

  test('forward mode starts at zero and advances without emitting finished', async () => {
    const onFinished = vi.fn();
    const wrapper = mount(HTime, { props: { time: 2, forward: true, onFinished } });

    expect(wrapper.text()).toBe('00:00:00');
    await delay(1100);
    await nextTick();
    expect(wrapper.text()).toBe('00:00:01');
    expect(onFinished).not.toHaveBeenCalled();
  });

  test('emits finished once the countdown crosses zero', async () => {
    vi.useFakeTimers();
    const onFinished = vi.fn();
    const wrapper = mount(HTime, { props: { time: 1, onFinished } });

    await vi.advanceTimersByTimeAsync(2000);
    expect(onFinished).toHaveBeenCalledOnce();
    wrapper.unmount();
    vi.useRealTimers();
  });

  test('formats minute/hour boundaries reactively and clears its timer on unmount', async () => {
    const wrapper = mount(HTime, {
      props: { time: 1_000_000_000_000, endTime: 1_000_000_061_000, calculative: true },
    });
    await nextTick();
    expect(wrapper.text()).toBe('00:01:01');
    await wrapper.setProps({ endTime: 1_000_003_661_000 });
    await nextTick();
    expect(wrapper.text()).toBe('01:01:01');
    wrapper.unmount();

    vi.useFakeTimers();
    const ticking = mount(HTime, { props: { time: 10 } });
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    ticking.unmount();
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });
});
