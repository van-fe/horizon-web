import { mount } from '@vue/test-utils';
import HScrollbar from '../src/Scrollbar';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

function setElementSize(
  element: HTMLElement,
  { width, height, scrollWidth, scrollHeight }: Record<string, number>,
) {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
  Object.defineProperties(element, {
    clientWidth: { configurable: true, value: width },
    clientHeight: { configurable: true, value: height },
    scrollWidth: { configurable: true, value: scrollWidth },
    scrollHeight: { configurable: true, value: scrollHeight },
  });
}

async function flushUpdate(wrapper: ReturnType<typeof mount>, delay = 10) {
  (wrapper.vm as any).update();
  await vi.advanceTimersByTimeAsync(delay);
  await nextTick();
}

describe('Scrollbar.tsx', () => {
  beforeEach(() => vi.useFakeTimers());

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('renders custom containers, dimensions, classes and styles', () => {
    const wrapper = mount(HScrollbar, {
      props: {
        height: 120,
        maxHeight: '240px',
        tag: 'ul',
        wrapClass: 'custom-wrap',
        viewClass: 'custom-view',
        wrapStyle: { backgroundColor: 'red' },
        viewStyle: { display: 'grid' },
      },
      slots: { default: () => <li>row</li> },
    });

    const wrap = wrapper.get('.h-scrollbar__wrap');
    const view = wrapper.get('.h-scrollbar__view');
    expect(wrap.classes()).toContain('custom-wrap');
    expect(wrap.attributes('style')).toContain('height: 120px');
    expect(wrap.attributes('style')).toContain('max-height: 240px');
    expect(wrap.attributes('style')).toContain('background-color: red');
    expect(view.classes()).toContain('custom-view');
    expect(view.element.tagName).toBe('UL');
    expect(view.attributes('style')).toContain('display: grid');
    expect(view.get('li').text()).toBe('row');
  });

  test('native mode keeps the content but does not render custom tracks', async () => {
    const wrapper = mount(HScrollbar, {
      props: { native: true, always: true, updateDelay: 10 },
      slots: { default: () => <div>overflowing content</div> },
    });
    const wrap = wrapper.get('.h-scrollbar__wrap');
    setElementSize(wrap.element as HTMLElement, {
      width: 100,
      height: 80,
      scrollWidth: 300,
      scrollHeight: 200,
    });

    await flushUpdate(wrapper);

    expect(wrap.classes()).toContain('is-native');
    expect(wrapper.find('.h-scrollbar__track').exists()).toBe(false);
  });

  test('emits scroll positions, reached edges and a debounced scrollEnd', async () => {
    vi.useRealTimers();
    const wrapper = mount(HScrollbar, {
      props: { always: true, updateDelay: 10, height: 80 },
      attrs: { style: 'width: 100px' },
      slots: { default: () => <div style="width: 300px; height: 200px">overflow</div> },
      attachTo: document.body,
    });
    const wrap = wrapper.get('.h-scrollbar__wrap');
    const element = wrap.element as HTMLElement;
    (wrapper.vm as any).update();
    await new Promise(resolve => setTimeout(resolve, 20));
    await nextTick();

    element.scrollTo({ top: element.scrollHeight - element.clientHeight, left: element.scrollWidth });
    await wrap.trigger('scroll');

    expect(wrapper.emitted('scroll')?.at(-1)?.[0]).toEqual({
      scrollTop: element.scrollHeight - element.clientHeight,
      scrollLeft: element.scrollWidth - element.clientWidth,
    });
    expect(wrapper.emitted('reachBottom')).toHaveLength(1);
    expect(wrapper.emitted('reachRight')).toHaveLength(1);
    expect(wrapper.emitted('scrollEnd')).toBeUndefined();

    await vi.waitFor(() => expect(wrapper.emitted('scrollEnd')).toHaveLength(1));

    element.scrollTop = 0;
    element.scrollLeft = 0;
    await wrap.trigger('scroll');
    expect(wrapper.emitted('reachTop')).toHaveLength(1);
    expect(wrapper.emitted('reachLeft')).toHaveLength(1);
  });

  test('forwards every public scrolling method to the wrap element', async () => {
    const wrapper = mount(HScrollbar, { props: { updateDelay: 10 } });
    const wrap = wrapper.get('.h-scrollbar__wrap').element as HTMLElement;
    const scrollTo = vi.fn();
    const scroll = vi.fn();
    Object.defineProperties(wrap, {
      scrollTo: { configurable: true, value: scrollTo },
      scroll: { configurable: true, value: scroll },
    });

    (wrapper.vm as any).setScrollTop(24);
    (wrapper.vm as any).setScrollLeft(12);
    (wrapper.vm as any).scrollTo({ top: 40, left: 30, behavior: 'smooth' });
    (wrapper.vm as any).scrollTo(8, 16);
    (wrapper.vm as any).handleScroll();

    expect(scrollTo).toHaveBeenNthCalledWith(1, { top: 24 });
    expect(scrollTo).toHaveBeenNthCalledWith(2, { left: 12 });
    expect(scrollTo).toHaveBeenNthCalledWith(3, {
      top: 40,
      left: 30,
      behavior: 'smooth',
    });
    expect(scrollTo).toHaveBeenNthCalledWith(4, 8, 16);
    expect(scroll).toHaveBeenCalledTimes(1);
  });
});
