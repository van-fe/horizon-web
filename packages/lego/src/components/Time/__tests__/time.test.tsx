import { shallowMount, mount } from '@vue/test-utils';
import NTime from '../src/Time';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';

const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

describe('Time.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NTime />);
    const element = wrapper.findComponent(NTime);

    expect(element.exists()).toBe(true);
  });

  test('calculative time', async() => {
    const wrapper = mount(NTime, {
      props: {
        endTime: +new Date('2023-02-27 16:27:30'),
        time: +new Date('2023-02-27 16:27:35'),
        calculative: true
      }
    })
    await nextTick()
    expect(wrapper.find('.n-time').text()).toBe('00:00:05')
  })

  test('time', async() => {
    const wrapper = mount(NTime)
    await delay(1000)
    await nextTick();
    expect(wrapper.find('.n-time').text()).toBe('00:00:09')
  })
});
