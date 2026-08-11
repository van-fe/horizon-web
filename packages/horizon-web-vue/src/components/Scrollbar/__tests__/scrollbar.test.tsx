import { mount } from '@vue/test-utils';
import HScrollbar from '../src/Scrollbar';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import { useScrollbarEmits } from '../src/composables/useEmits';

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

  test('applies track constraints and emits real hover lifecycle events', async () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const wrapper = mount(HScrollbar, {
      props: {
        noResize: true,
        minSize: 32,
        zIndex: 7,
        horizontalVisible: false,
        verticalVisible: true,
        trackBeginEndSpacing: [[4, 6], [8, 10]],
        preventScrollByTrackBeginEndSpacing: false,
        trackSticky: false,
        always: true,
        updateDelay: 0,
        onMouseEnter,
        onMouseLeave,
      },
      slots: { default: () => <div>Track contract</div> },
    });
    const wrap = wrapper.get('.h-scrollbar__wrap');
    setElementSize(wrap.element as HTMLElement, {
      width: 100,
      height: 80,
      scrollWidth: 300,
      scrollHeight: 240,
    });
    await flushUpdate(wrapper, 0);

    expect(wrapper.get('.h-scrollbar').classes()).not.toContain('is-track-sticky');
    const tracks = wrapper.findAll('.h-scrollbar__track');
    expect(tracks).toHaveLength(1);
    expect(tracks[0].classes()).toContain('is-vertical');
    expect(tracks[0].attributes('style')).toContain('z-index: 7');
    expect(tracks[0].attributes('style')).toContain('top: 4px');
    expect(tracks[0].attributes('style')).toContain('bottom: 6px');
    expect(wrapper.get('.h-scrollbar__track--thumb').attributes('style')).toContain(
      'height: 32px',
    );

    await wrapper.get('.h-scrollbar').trigger('mouseenter');
    await wrapper.get('.h-scrollbar').trigger('mousemove', { clientX: 0, clientY: 0 });
    expect(wrap.attributes('style')).toContain('overflow: auto');
    await wrapper.get('.h-scrollbar').trigger('mouseleave');
    expect(onMouseEnter.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    expect(onMouseLeave.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  test('renders both tracks and converts real thumb dragging into scroll positions', async () => {
    const wrapper = mount(HScrollbar, {
      props: {
        always: true,
        minSize: 20,
        updateDelay: 0,
        trackBeginEndSpacing: [[2, 4], [6, 8]],
      },
      slots: { default: () => <div>two-dimensional overflow</div> },
      attachTo: document.body,
    });
    const wrap = wrapper.get<HTMLElement>('.h-scrollbar__wrap');
    setElementSize(wrap.element, {
      width: 100,
      height: 80,
      scrollWidth: 300,
      scrollHeight: 240,
    });
    const scrollTo = vi.spyOn(wrap.element, 'scrollTo').mockImplementation(() => undefined);
    await flushUpdate(wrapper, 0);

    const vertical = wrapper.get<HTMLElement>('.h-scrollbar__track.is-vertical');
    const horizontal = wrapper.get<HTMLElement>('.h-scrollbar__track.is-horizon');
    setElementSize(vertical.element, { width: 8, height: 74, scrollWidth: 8, scrollHeight: 74 });
    setElementSize(horizontal.element, { width: 86, height: 8, scrollWidth: 86, scrollHeight: 8 });
    const verticalThumb = vertical.get<HTMLElement>('.h-scrollbar__track--thumb');
    const horizontalThumb = horizontal.get<HTMLElement>('.h-scrollbar__track--thumb');

    verticalThumb.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, clientX: 4, clientY: 10, pointerId: 1 }),
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, clientX: 4, clientY: 40, pointerId: 1 }),
    );
    window.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, clientX: 4, clientY: 50, pointerId: 1 }),
    );
    horizontalThumb.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 4, pointerId: 2 }),
    );
    window.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, clientX: 50, clientY: 4, pointerId: 2 }),
    );
    window.dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true, clientX: 60, clientY: 4, pointerId: 2 }),
    );
    await nextTick();

    expect(scrollTo.mock.calls.some(([options]) => typeof options === 'object' && 'top' in options)).toBe(
      true,
    );
    expect(
      scrollTo.mock.calls.some(([options]) => typeof options === 'object' && 'left' in options),
    ).toBe(true);
    wrapper.unmount();
  });

  test('blocks overflow only inside configured begin/end spacing and reacts to resize mode changes', async () => {
    const wrapper = mount(HScrollbar, {
      props: {
        always: true,
        noResize: false,
        updateDelay: 0,
        preventScrollByTrackBeginEndSpacing: true,
        trackBeginEndSpacing: [[10, 12], [14, 16]],
      },
    });
    const root = wrapper.get('.h-scrollbar');
    const wrap = wrapper.get<HTMLElement>('.h-scrollbar__wrap');
    setElementSize(wrap.element, {
      width: 100,
      height: 80,
      scrollWidth: 300,
      scrollHeight: 240,
    });
    await flushUpdate(wrapper, 0);

    await root.trigger('mousemove', { clientX: 2, clientY: 2 });
    expect(wrap.element.style.overflowX).toBe('hidden');
    expect(wrap.element.style.overflowY).toBe('hidden');
    await root.trigger('mousemove', { clientX: 50, clientY: 40 });
    expect(wrap.element.style.overflowX).toBe('auto');
    expect(wrap.element.style.overflowY).toBe('auto');
    await root.trigger('mousemove', { clientX: 99, clientY: 79 });
    expect(wrap.element.style.overflowX).toBe('hidden');
    expect(wrap.element.style.overflowY).toBe('hidden');

    await wrapper.setProps({ noResize: true });
    await wrapper.setProps({ noResize: false, trackBeginEndSpacing: [[1, 1], [1, 1]] });
    await vi.advanceTimersByTimeAsync(0);
    expect(wrapper.emitted('update')).toBeDefined();
  });

  test('validates every public native event payload', () => {
    const mouse = new MouseEvent('mouseenter');
    const event = new Event('scroll');
    expect(useScrollbarEmits.scroll({ scrollTop: 1, scrollLeft: 2 }, event)).toBe(true);
    expect(useScrollbarEmits.scroll({ scrollTop: '1' as never, scrollLeft: 2 }, event)).toBe(true);
    expect(useScrollbarEmits.mouseEnter(mouse)).toBe(true);
    expect(useScrollbarEmits.mouseEnter(event as never)).toBe(false);
    expect(useScrollbarEmits.mouseLeave(mouse)).toBe(true);
    expect(useScrollbarEmits.reachTop(event)).toBe(true);
    expect(useScrollbarEmits.reachBottom(event)).toBe(true);
    expect(useScrollbarEmits.reachLeft(event)).toBe(true);
    expect(useScrollbarEmits.reachRight(event)).toBe(true);
    expect(useScrollbarEmits.scrollEnd()).toBe(true);
    expect(useScrollbarEmits.update()).toBe(true);
  });
});
