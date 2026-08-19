import { mount } from '@vue/test-utils';
import { EventEmitter } from '@aurora/utils';
import { defineComponent, nextTick, provide, reactive, ref } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { HRecycleScroller, HVirtualScroller, HVirtualScrollerItem } from '..';
import { VirtualScrollerInjectKey } from '../src/utils/injectionKey';
import type { VirtualScrollerContext } from '../src/utils/types';

function createItemContext(
  options: {
    observer?: ResizeObserver;
    simpleArray?: boolean;
    sizes?: Map<unknown, number>;
  } = {},
): VirtualScrollerContext {
  return {
    vscrollData: reactive({
      active: true,
      sizes: options.sizes ?? new Map(),
      keyField: 'code',
      simpleArray: options.simpleArray ?? false,
    }),
    vscrollResizeObserver: options.observer,
    direction: ref<'vertical' | 'horizontal'>('vertical'),
    $_undefinedMap: ref(new Map()),
    $_undefinedSizes: ref(0),
    $_events: new EventEmitter(),
  };
}

describe('VirtualScroller final browser branches', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('reports invalid grid configuration and renders grid fallback dimensions both ways', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const invalid = mount(HRecycleScroller, {
      props: {
        items: [{ id: 1, size: 20 }],
        gridItems: 2,
        minItemSize: 20,
        sizeField: 'size',
        scrollerHeight: 40,
      },
    });
    expect(error).toHaveBeenCalledWith(
      '[RecycleScroller] You must provide an itemSize when using gridItems',
    );
    invalid.unmount();

    const direction = ref<'vertical' | 'horizontal'>('vertical');
    const wrapper = mount(
      () => (
        <HRecycleScroller
          items={Array.from({ length: 4 }, (_, id) => ({ id }))}
          itemSize={20}
          itemSecondarySize={0}
          gridItems={2}
          direction={direction.value}
          buffer={0}
          scrollerHeight={40}
        />
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();
    const first = wrapper.get<HTMLElement>('.h-recycle-scroller__item-view');
    expect(first.element.style.width).toBe('20px');
    expect(first.element.style.height).toBe('20px');
    direction.value = 'horizontal';
    await nextTick();
    await nextTick();
    expect(first.element.style.width).toBe('20px');
    expect(first.element.style.height).toBe('20px');
    wrapper.unmount();
  });

  test('uses document page-mode geometry and both window scroll axes', async () => {
    const direction = ref<'vertical' | 'horizontal'>('vertical');
    const pageMode = ref(false);
    const wrapper = mount(
      () => (
        <HRecycleScroller
          items={Array.from({ length: 10 }, (_, id) => ({ id }))}
          itemSize={20}
          direction={direction.value}
          pageMode={pageMode.value}
          buffer={0}
        />
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();
    const root = wrapper.get<HTMLElement>('.h-scrollbar__wrap').element;
    root.style.overflow = 'visible';
    vi.spyOn(root, 'getBoundingClientRect').mockReturnValue({
      top: 30,
      left: 40,
      right: 140,
      bottom: 130,
      width: 100,
      height: 100,
      x: 40,
      y: 30,
      toJSON: () => ({}),
    });
    Object.defineProperties(window, {
      scrollY: { configurable: true, value: 5 },
      scrollX: { configurable: true, value: 7 },
      innerHeight: { configurable: true, value: 300 },
      innerWidth: { configurable: true, value: 400 },
    });
    Object.defineProperties(document.documentElement, {
      scrollTop: { configurable: true, writable: true, value: 0 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    });

    pageMode.value = true;
    await nextTick();
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    wrapper.getComponent(HRecycleScroller).getCurrentComponent().exposed?.scrollToItem(2);
    expect(document.documentElement.scrollTop).toBe(75);

    direction.value = 'horizontal';
    await nextTick();
    window.dispatchEvent(new Event('resize'));
    wrapper.getComponent(HRecycleScroller).getCurrentComponent().exposed?.scrollToItem(3);
    expect(document.documentElement.scrollLeft).toBe(107);
    wrapper.unmount();

    const initialVerticalPage = mount(HRecycleScroller, {
      props: {
        items: [{ id: 1 }],
        itemSize: 20,
        direction: 'vertical',
        pageMode: true,
      },
      attachTo: document.body,
    });
    await nextTick();
    await nextTick();
    expect(initialVerticalPage.get('.h-recycle-scroller').classes()).toContain('is-page-mode');
    initialVerticalPage.unmount();
  });

  test('covers empty scrolling, expand-by-children and throttled dirty scroll refreshes', async () => {
    vi.useFakeTimers();
    const requestFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const wrapper = mount(HRecycleScroller, {
      props: {
        items: [],
        itemSize: 20,
        updateInterval: 5,
        expandWrapperByChildren: true,
        scrollerHeight: 40,
      },
      attachTo: document.body,
    });
    await nextTick();
    await nextTick();
    wrapper.getCurrentComponent().exposed?.scrollToItem(3);
    const root = wrapper.get<HTMLElement>('.h-scrollbar__wrap');
    await root.trigger('scroll');
    await root.trigger('scroll');
    vi.advanceTimersByTime(5);
    expect(requestFrame.mock.calls.length).toBeGreaterThanOrEqual(2);
    wrapper.unmount();
  });

  test('covers simple zero index and inactive item update paths without ResizeObserver', async () => {
    const active = ref(false);
    const item = ref({ code: 'first' });
    const context = createItemContext();
    context.$_undefinedMap.value.set('first', true);
    context.$_undefinedSizes.value = 1;
    const Harness = defineComponent({
      setup() {
        provide(VirtualScrollerInjectKey, context);
        return () => (
          <HVirtualScrollerItem item={item.value} index={0} active={active.value} watchData>
            <div>branch item</div>
          </HVirtualScrollerItem>
        );
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });
    context.$_events.emit('vscroll:update', { force: true });
    active.value = true;
    await nextTick();
    context.$_events.emit('vscroll:update', { force: true });
    context.$_events.emit('vscroll:update', { force: true });
    item.value = { code: 'second' };
    await nextTick();
    active.value = false;
    await nextTick();
    wrapper.unmount();

    const simpleContext = createItemContext({
      simpleArray: true,
      sizes: new Map([[0, 10]]),
    });
    const SimpleHarness = defineComponent({
      setup() {
        provide(VirtualScrollerInjectKey, simpleContext);
        return () => (
          <HVirtualScrollerItem item={{ value: 'zero' }} index={0} active>
            zero
          </HVirtualScrollerItem>
        );
      },
    });
    mount(SimpleHarness).unmount();
  });

  test('covers observed item equal and changed key sizes plus already-unobserved cleanup', async () => {
    const observe = vi.fn();
    const unobserve = vi.fn();
    const observer = { observe, unobserve, disconnect: vi.fn() } as unknown as ResizeObserver;
    const active = ref(true);
    const item = ref({ code: 'first' });
    const context = createItemContext({
      observer,
      sizes: new Map([
        ['first', 12],
        ['equal', 12],
        ['changed', 24],
      ]),
    });
    const Harness = defineComponent({
      setup() {
        provide(VirtualScrollerInjectKey, context);
        return () => (
          <HVirtualScrollerItem item={item.value} active={active.value} emitResize>
            observed
          </HVirtualScrollerItem>
        );
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });
    await nextTick();
    item.value = { code: 'equal' };
    await nextTick();
    item.value = { code: 'changed' };
    await nextTick();
    active.value = false;
    await nextTick();
    expect(observe).toHaveBeenCalled();
    expect(unobserve).toHaveBeenCalled();
    wrapper.unmount();
  });

  test('throws synchronously when a virtual item key is missing', () => {
    expect(() =>
      mount(HVirtualScroller, {
        props: {
          items: [{ label: 'missing id' }],
          itemSize: 20,
          minItemSize: 20,
        },
      }),
    ).toThrow("keyField 'id' not found");

    const context = createItemContext();
    const MissingItemHarness = defineComponent({
      setup() {
        provide(VirtualScrollerInjectKey, context);
        return () => <HVirtualScrollerItem item={{ label: 'missing code' }} active />;
      },
    });
    expect(() => mount(MissingItemHarness)).toThrow("keyField 'code' not found");
  });

  test('skips anchor restoration for initial data, active bottom scrolling and no viewport', async () => {
    const items = ref<{ id: number }[]>([]);
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.push(callback);
      return frames.length;
    });
    const wrapper = mount(
      () => (
        <HVirtualScroller items={items.value} itemSize={20} minItemSize={20} scrollerHeight={40} />
      ),
      { attachTo: document.body },
    );
    items.value = [{ id: 1 }];
    await nextTick();
    await nextTick();
    const root = wrapper.get<HTMLElement>('.h-scrollbar__wrap').element;
    Object.defineProperties(root, {
      scrollHeight: { configurable: true, value: 100 },
      scrollTop: { configurable: true, writable: true, value: 0 },
    });
    wrapper.findComponent(HVirtualScroller).getCurrentComponent().exposed?.scrollToBottom();
    await nextTick();
    items.value = [{ id: 0 }, ...items.value];
    await nextTick();
    wrapper.unmount();

    const stubItems = ref([{ id: 1 }]);
    const RecycleStub = defineComponent({
      name: 'HRecycleScroller',
      setup(_props, { expose }) {
        expose({ getRootEl: () => undefined, scrollToItem: vi.fn() });
        return () => <div />;
      },
    });
    const missing = mount(
      () => <HVirtualScroller items={stubItems.value} itemSize={20} minItemSize={20} />,
      { global: { stubs: { HRecycleScroller: RecycleStub } } },
    );
    stubItems.value = [{ id: 0 }, ...stubItems.value];
    await nextTick();
    missing.unmount();
  });

  test('covers horizontal owned scrolling and a missing owned viewport', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const horizontal = mount(HVirtualScroller, {
      props: {
        items: Array.from({ length: 3 }, (_, id) => ({ id })),
        itemSize: 20,
        minItemSize: 20,
        direction: 'horizontal',
      },
      attachTo: document.body,
    });
    await nextTick();
    const root = horizontal.get<HTMLElement>('.h-scrollbar__wrap').element;
    Object.defineProperties(root, {
      scrollWidth: { configurable: true, value: 60 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    });
    (horizontal.vm as unknown as { scrollToBottom(): void }).scrollToBottom();
    await nextTick();
    expect(root.scrollLeft).toBe(60);
    horizontal.unmount();

    const zeroExtent = mount(HVirtualScroller, {
      props: {
        items: [{ id: 1 }],
        itemSize: 20,
        minItemSize: 20,
        direction: 'vertical',
      },
      attachTo: document.body,
    });
    await nextTick();
    const zeroRoot = zeroExtent.get<HTMLElement>('.h-scrollbar__wrap').element;
    Object.defineProperties(zeroRoot, {
      scrollHeight: { configurable: true, value: 0 },
      scrollTop: { configurable: true, writable: true, value: 1 },
    });
    zeroExtent.getCurrentComponent().exposed?.scrollToBottom();
    await nextTick();
    expect(zeroRoot.scrollTop).toBe(0);
    zeroExtent.unmount();

    const RecycleStub = defineComponent({
      name: 'HRecycleScroller',
      setup(_props, { expose }) {
        expose({ getRootEl: () => undefined, scrollToItem: vi.fn() });
        return () => <div />;
      },
    });
    const missing = mount(HVirtualScroller, {
      props: { items: [{ id: 1 }], itemSize: 20, minItemSize: 20 },
      global: { stubs: { HRecycleScroller: RecycleStub } },
    });
    (missing.vm as unknown as { scrollToBottom(): void }).scrollToBottom();
    await nextTick();
    missing.unmount();
  });
});
