import { mount, shallowMount } from '@vue/test-utils';
import HBacktop from '../src/Backtop';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Backtop.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HBacktop />);
    const element = wrapper.findComponent(HBacktop);

    expect(element.exists()).toBe(true);
  });

  test('appears after the target crosses the threshold and preserves custom content', async () => {
    const target = document.createElement('div');
    target.id = 'backtop-scroll-target';
    target.style.cssText = 'height: 40px; overflow: auto;';
    const content = document.createElement('div');
    content.style.height = '1000px';
    target.appendChild(content);
    document.body.appendChild(target);
    const wrapper = mount(HBacktop, {
      props: { target: '#backtop-scroll-target', visibilityHeight: 100, bottom: 20, right: 30 },
      slots: { default: () => <span>Top now</span> },
    });

    target.scrollTop = 99;
    target.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(wrapper.find('.h-backtop').exists()).toBe(false);

    target.scrollTop = 101;
    target.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 350));
    await nextTick();

    const button = wrapper.get('.h-backtop');
    expect(button.text()).toBe('Top now');
    expect(button.attributes('style')).toContain('bottom: 20px');
    expect(button.attributes('style')).toContain('right: 30px');

    wrapper.unmount();
    target.remove();
  });

  test('scrolls the configured element to zero and emits the native click event', async () => {
    const target = document.createElement('div');
    target.id = 'backtop-click-target';
    target.style.cssText = 'height: 40px; overflow: auto;';
    const content = document.createElement('div');
    content.style.height = '1000px';
    target.appendChild(content);
    document.body.appendChild(target);
    const wrapper = mount(HBacktop, {
      props: { target: '#backtop-click-target', visibilityHeight: 10 },
    });

    target.scrollTop = 500;
    target.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 350));
    await wrapper.get('.h-backtop').trigger('click');
    await new Promise(resolve => setTimeout(resolve, 550));

    expect(target.scrollTop).toBe(0);
    expect(wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent);

    wrapper.unmount();
    target.remove();
  });

  test('falls back to window scrolling, renders the default icon and reaches zero', async () => {
    const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 });
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation((_, top) => {
      Object.defineProperty(window, 'scrollY', { configurable: true, value: Number(top) });
    });
    const wrapper = mount(HBacktop, {
      props: { target: '#missing-backtop-target', visibilityHeight: 10 },
    });

    window.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 350));
    const button = wrapper.get('.h-backtop');
    expect(button.find('.h-backtop__icon').exists()).toBe(true);
    await button.trigger('click');
    await new Promise(resolve => setTimeout(resolve, 550));

    expect(scrollTo).toHaveBeenLastCalledWith(0, 0);
    expect(wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent);
    wrapper.unmount();
    scrollTo.mockRestore();
    if (originalScrollY) Object.defineProperty(window, 'scrollY', originalScrollY);
    else Reflect.deleteProperty(window, 'scrollY');
  });
});
