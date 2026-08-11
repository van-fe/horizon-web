import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, provide, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { EventEmitter } from '@aurora/utils';
import { HRecycleScroller, HVirtualScroller, HVirtualScrollerItem } from '..';
import {
  useRecycleScrollerEmits,
  useVirtualScrollerEmits,
  useVirtualScrollerItemEmits,
} from '../src/composables/useEmits';
import type {
  VirtualScrollerDefaultSlotRowType,
  VirtualScrollerRenderlessScope,
} from '../src/composables/useSlots';
import { VirtualScrollerInjectKey } from '../src/utils/injectionKey';
import type { VirtualScrollerContext } from '../src/utils/types';

type Item = { code: string; kind: string; measured: number; label: string };

const items: Item[] = [
  { code: 'a', kind: 'odd', measured: 30, label: 'Alpha' },
  { code: 'b', kind: 'even', measured: 30, label: 'Beta' },
  { code: 'c', kind: 'odd', measured: 30, label: 'Gamma' },
];

describe('VirtualScroller public API contracts', () => {
  test('renders configured tags, dimensions, slots, scoped rows, and native scroll/hover events', async () => {
    const onUpdate = vi.fn();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const onScrollStart = vi.fn();
    const onScrollEnd = vi.fn();
    const onScrollBegin = vi.fn();
    const onScrollStop = vi.fn();
    const onResize = vi.fn();
    const onVisible = vi.fn();
    const wrapper = mount(
      () => (
        <HVirtualScroller
          items={items}
          minItemSize="20"
          itemSize={40}
          keyField="code"
          direction="horizontal"
          listTag="ol"
          itemTag="li"
          size="small"
          scrollerHeight="90px"
          scrollerMaxHeight={110}
          emitUpdate
          updateInterval={1}
          buffer={0}
          expandWrapperByChildren
          style="width: 200px"
          onUpdate={onUpdate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onScrollStart={onScrollStart}
          onScrollEnd={onScrollEnd}
          onScrollBegin={onScrollBegin}
          onScrollStop={onScrollStop}
          onResize={onResize}
          onVisible={onVisible}
        >
          {{
            before: () => <div data-test="before">Before</div>,
            after: () => <div data-test="after">After</div>,
            empty: () => <div data-test="empty">Empty</div>,
            default: ({ item, index, active }: VirtualScrollerDefaultSlotRowType<Item>) => (
              <span data-test={`row-${item.code}`} data-index={index} data-active={String(active)}>
                {item.label}
              </span>
            ),
          }}
        </HVirtualScroller>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();
    const scroll = wrapper.get<HTMLElement>('.h-scrollbar__wrap');
    Object.defineProperty(scroll.element, 'clientWidth', { configurable: true, value: 200 });
    await scroll.trigger('scroll');
    await vi.waitFor(() =>
      expect(wrapper.find('.h-recycle-scroller__item-view').exists()).toBe(true),
    );

    expect(wrapper.get('.h-recycle-scroller').classes()).toEqual(
      expect.arrayContaining(['is-direction-horizontal', 'is-expand-by-children']),
    );
    expect(wrapper.get('.h-scrollbar').classes()).toContain('h-scrollbar--small');
    expect(wrapper.get('.h-scrollbar__wrap').attributes('style')).toEqual(
      expect.stringContaining('height: 90px'),
    );
    expect(wrapper.get('.h-scrollbar__wrap').attributes('style')).toContain('max-height: 110px');
    expect(wrapper.get('.h-recycle-scroller__item-wrapper').element.tagName).toBe('OL');
    expect(wrapper.get('.h-recycle-scroller__item-view').element.tagName).toBe('LI');
    expect(wrapper.get('[data-test="before"]').text()).toBe('Before');
    expect(wrapper.get('[data-test="after"]').text()).toBe('After');
    expect(wrapper.get('[data-test="row-a"]').attributes()).toMatchObject({
      'data-index': '0',
      'data-active': 'true',
    });
    expect(wrapper.find('[data-test="empty"]').exists()).toBe(false);

    await wrapper.get('.h-scrollbar').trigger('mouseenter');
    await wrapper.get('.h-scrollbar').trigger('mouseleave');
    expect(onMouseEnter.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    expect(onMouseLeave.mock.calls[0][0]).toBeInstanceOf(MouseEvent);

    scroll.element.scrollLeft = 40;
    await scroll.trigger('scroll');
    await vi.waitFor(() => expect(onScrollBegin).toHaveBeenCalled());
    await vi.waitFor(() => expect(onScrollStop).toHaveBeenCalled());
    expect(onUpdate).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
    );
    expect(onScrollStart).toHaveBeenCalled();

    scroll.element.style.width = '160px';
    await vi.waitFor(() => expect(onResize).toHaveBeenCalled());
    await vi.waitFor(() => expect(onVisible).toHaveBeenCalled());
    wrapper.unmount();

    const boundary = mount(
      () => (
        <HVirtualScroller
          items={[items[0]]}
          minItemSize={20}
          itemSize={20}
          keyField="code"
          scrollerHeight={100}
          buffer={0}
          onScrollEnd={onScrollEnd}
        />
      ),
      { attachTo: document.body },
    );
    await vi.waitFor(() => expect(onScrollEnd).toHaveBeenCalled());
    boundary.unmount();
  });

  test('supports empty and renderless modes with an external scrollContainer', async () => {
    const onUpdate = vi.fn();
    const external = ref<HTMLElement>();
    const empty = mount(() => (
      <HVirtualScroller items={[]} minItemSize={20}>
        {{ empty: () => <div data-test="empty">Nothing virtual</div> }}
      </HVirtualScroller>
    ));
    await nextTick();
    expect(empty.get('[data-test="empty"]').text()).toBe('Nothing virtual');
    empty.unmount();

    const wrapper = mount(
      () => (
        <div ref={external} class="external-scroll" style="height: 60px; overflow: auto">
          <HVirtualScroller
            items={items}
            minItemSize={20}
            itemSize={20}
            keyField="code"
            renderless
            scrollContainer={external.value}
            emitUpdate
            onUpdate={onUpdate}
          >
            {{
              renderless: (scope: VirtualScrollerRenderlessScope<Item>) => (
                <button
                  data-test="renderless"
                  data-range={`${scope.startIndex}:${scope.endIndex}`}
                  data-visible={`${scope.visibleStartIndex}:${scope.visibleEndIndex}`}
                  data-total={scope.totalSize}
                  data-offset={`${scope.startOffset}:${scope.endOffset}`}
                  onClick={() => scope.scrollToItem(2)}
                >
                  {scope.views.map(view => `${view.index}-${String(view.active)}-${view.item.label}`)}
                </button>
              ),
            }}
          </HVirtualScroller>
          <div style="height: 500px" />
        </div>
      ),
      { attachTo: document.body },
    );
    await wrapper.get('.external-scroll').trigger('scroll');
    await nextTick();
    await wrapper.get('[data-test="renderless"]').trigger('click');
    expect(external.value?.scrollTop).toBeGreaterThanOrEqual(40);
    expect(wrapper.get('[data-test="renderless"]').attributes('data-total')).toBe('60');
    expect(wrapper.get('[data-test="renderless"]').attributes('data-range')).toMatch(/^\d+:\d+$/);
    expect(onUpdate).toHaveBeenCalled();
    wrapper.unmount();

    const fallback = mount(
      HVirtualScroller,
      {
        props: {
          items,
          itemSize: 20,
          minItemSize: 20,
          keyField: 'code',
          renderless: true,
          scrollerHeight: '60px',
        },
        slots: {
          renderless: (scope?: VirtualScrollerRenderlessScope<Item>) => (
            <div data-test="fallback-range">{scope?.totalSize}:{scope?.endIndex}</div>
          ),
        },
      },
    );
    await nextTick();
    expect(fallback.get('[data-test="fallback-range"]').text()).toBe('60:3');
    expect(() => fallback.getCurrentComponent().exposed?.scrollToItem(1)).not.toThrow();
    expect(() => fallback.getCurrentComponent().exposed?.scrollToBottom()).not.toThrow();
    fallback.unmount();
  });

  test('applies every RecycleScroller layout prop, custom class, hover state, and scroll option', async () => {
    const pageMode = ref(false);
    const wrapper = mount(
      () => (
        <HRecycleScroller
          items={items}
          keyField="code"
          typeField="kind"
          sizeField="measured"
          pageMode={pageMode.value}
          direction="vertical"
          listTag="section"
          itemTag="article"
          listClass="contract-list"
          itemClass="contract-item"
          gridItems={2}
          itemSize={30}
          itemSecondarySize={45}
          minItemSize="15"
          buffer={0}
          emitUpdate
          updateInterval={2}
          skipHover={false}
          scrollerHeight={60}
          scrollerMaxHeight="80px"
          scrollOption={{ behavior: 'smooth' }}
          size="medium"
          expandWrapperByChildren
        >
          {{
            default: ({ item }: VirtualScrollerDefaultSlotRowType<Item>) => (
              <span>{item.label}</span>
            ),
          }}
        </HRecycleScroller>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();
    const scroller = wrapper.getComponent(HRecycleScroller);
    const list = wrapper.get('.h-recycle-scroller__item-wrapper');
    const view = wrapper.get('.h-recycle-scroller__item-view');

    expect(list.element.tagName).toBe('SECTION');
    expect(list.classes()).toContain('contract-list');
    expect(view.element.tagName).toBe('ARTICLE');
    expect(view.classes()).toContain('contract-item');
    expect(view.attributes('style')).toContain('width: 45px');
    expect(view.attributes('style')).toContain('height: 30px');
    await view.trigger('mouseenter');
    expect(view.classes()).toContain('is-hover');
    await view.trigger('mouseleave');
    expect(view.classes()).not.toContain('is-hover');

    const scroll = wrapper.get<HTMLElement>('.h-scrollbar__wrap');
    const scrollMethod = vi.spyOn(scroll.element, 'scroll');
    scroller.getCurrentComponent().exposed?.scrollToItem(2);
    expect(scrollMethod).toHaveBeenCalledWith({ top: 30, behavior: 'smooth' });
    expect(scroller.getCurrentComponent().exposed?.getRootEl()).toBe(scroll.element);

    pageMode.value = true;
    await nextTick();
    expect(wrapper.get('.h-recycle-scroller').classes()).toContain('is-page-mode');
    wrapper.unmount();
  });

  test('measures VirtualScrollerItem data, dependencies, activity, index, tag and resize payload', async () => {
    const active = ref(true);
    const dependency = ref(1);
    const context: VirtualScrollerContext = {
      vscrollData: reactive({
        active: true,
        sizes: new Map(),
        keyField: 'code',
        simpleArray: false,
      }),
      vscrollResizeObserver: undefined,
      direction: ref<'vertical' | 'horizontal'>('vertical'),
      $_undefinedMap: ref(new Map()),
      $_undefinedSizes: ref(0),
      $_events: new EventEmitter(),
    };
    const onResize = vi.fn();
    const Harness = defineComponent({
      setup() {
        provide(VirtualScrollerInjectKey, context);
        return () => (
          <HVirtualScrollerItem
            item={items[0]}
            watchData
            active={active.value}
            index={7}
            sizeDependencies={[dependency.value]}
            emitResize
            tag="section"
            onResize={onResize}
          >
            <div data-test="measured-slot" style="height: 24px">
              measured
            </div>
          </HVirtualScrollerItem>
        );
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });
    await vi.waitFor(() => expect(onResize).toHaveBeenCalledWith('a'));
    expect(wrapper.get('[data-test="measured-slot"]').element.parentElement?.tagName).toBe('SECTION');
    expect(context.vscrollData.sizes.get('a')).toBe(24);

    active.value = false;
    dependency.value++;
    await nextTick();
    active.value = true;
    context.$_events.emit('vscroll:update', { force: true });
    await nextTick();
    expect(onResize).toHaveBeenCalled();
    wrapper.unmount();
  });

  test('observes item resizes, key replacements, active state and horizontal measurements', async () => {
    const active = ref(true);
    const item = ref({ ...items[0] });
    const observe = vi.fn();
    const unobserve = vi.fn();
    const context: VirtualScrollerContext = {
      vscrollData: reactive({
        active: true,
        sizes: new Map(),
        keyField: 'code',
        simpleArray: false,
      }),
      vscrollResizeObserver: {
        observe,
        unobserve,
        disconnect: vi.fn(),
      } as unknown as ResizeObserver,
      direction: ref<'vertical' | 'horizontal'>('horizontal'),
      $_undefinedMap: ref(new Map()),
      $_undefinedSizes: ref(0),
      $_events: new EventEmitter(),
    };
    const onResize = vi.fn();
    const Harness = defineComponent({
      setup() {
        provide(VirtualScrollerInjectKey, context);
        return () => (
          <HVirtualScrollerItem
            item={item.value}
            active={active.value}
            index={2}
            emitResize
            onResize={onResize}
          >
            <div style="width: 24px; height: 12px">observed</div>
          </HVirtualScrollerItem>
        );
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });
    await nextTick();
    const measured = wrapper.get('[style]').element.parentElement as HTMLElement;
    expect(observe).toHaveBeenCalledWith(measured);
    const beforeWrongId = context.vscrollData.sizes.get('a');
    measured.$_vs_onResize?.('wrong-id', 64, 32);
    expect(context.vscrollData.sizes.get('a')).toBe(beforeWrongId);
    measured.$_vs_onResize?.('a', 64, 32);
    expect(context.vscrollData.sizes.get('a')).toBe(64);
    expect(onResize).toHaveBeenCalledWith('a');

    active.value = false;
    await nextTick();
    expect(unobserve).toHaveBeenCalledWith(measured);
    active.value = true;
    await nextTick();
    expect(observe).toHaveBeenCalledTimes(2);

    item.value = { ...item.value, code: 'replacement' };
    await nextTick();
    await nextTick();
    expect(measured.$_vs_id).toBe('replacement');
    expect(context.vscrollData.sizes.get('replacement')).toBeGreaterThan(0);
    wrapper.unmount();
    expect(unobserve.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  test('measures simple-array item ids and stops deep watchData observation', async () => {
    const watchData = ref(true);
    const item = ref({ value: 'simple' });
    const context: VirtualScrollerContext = {
      vscrollData: reactive({
        active: true,
        sizes: new Map(),
        keyField: 'missing',
        simpleArray: true,
      }),
      vscrollResizeObserver: undefined,
      direction: ref<'vertical' | 'horizontal'>('vertical'),
      $_undefinedMap: ref(new Map()),
      $_undefinedSizes: ref(0),
      $_events: new EventEmitter(),
    };
    const Harness = defineComponent({
      setup() {
        provide(VirtualScrollerInjectKey, context);
        return () => (
          <HVirtualScrollerItem
            item={item.value}
            active
            index={3}
            watchData={watchData.value}
            tag="article"
          >
            <div style="height: 18px">simple</div>
          </HVirtualScrollerItem>
        );
      },
    });
    const wrapper = mount(Harness, { attachTo: document.body });
    await nextTick();
    expect(context.vscrollData.sizes.get(3)).toBe(18);
    item.value.value = 'changed';
    await nextTick();
    watchData.value = false;
    await nextTick();
    context.$_events.emit('vscroll:update', { force: false });
    context.$_events.emit('vscroll:update', { force: true });
    await nextTick();
    wrapper.unmount();
  });

  test('validates all public event payloads', () => {
    const updateArgs = [0, 1, 0, 1] as const;
    expect(useVirtualScrollerEmits.resize()).toBe(true);
    expect(useVirtualScrollerEmits.visible()).toBe(true);
    expect(useVirtualScrollerEmits.update(...updateArgs)).toBe(true);
    expect(useVirtualScrollerEmits.update('0' as never, 1, 2, 3)).toBe(true);
    expect(useVirtualScrollerEmits.update('0' as never, '1' as never, 2, 3)).toBe(true);
    expect(useVirtualScrollerEmits.update('0' as never, '1' as never, false as never, 3)).toBe(true);
    expect(useVirtualScrollerEmits.update('0' as never, '1' as never, false as never, null as never)).toBe(false);
    expect(useVirtualScrollerEmits.mouseEnter(new MouseEvent('mouseenter'))).toBe(true);
    expect(useVirtualScrollerEmits.mouseEnter(new Event('mouseenter') as never)).toBe(false);
    expect(useVirtualScrollerEmits.mouseLeave(new MouseEvent('mouseleave'))).toBe(true);
    expect(useVirtualScrollerEmits.scrollEnd()).toBe(true);
    expect(useVirtualScrollerEmits.scrollStart()).toBe(true);
    expect(useVirtualScrollerEmits.scrollBegin()).toBe(true);
    expect(useVirtualScrollerEmits.scrollStop()).toBe(true);

    expect(useRecycleScrollerEmits.visible()).toBe(true);
    expect(useRecycleScrollerEmits.hidden()).toBe(true);
    expect(useRecycleScrollerEmits.resize()).toBe(true);
    expect(useRecycleScrollerEmits.update(...updateArgs)).toBe(true);
    expect(useRecycleScrollerEmits.update('0' as never, 1, 2, 3)).toBe(true);
    expect(useRecycleScrollerEmits.update('0' as never, '1' as never, 2, 3)).toBe(true);
    expect(useRecycleScrollerEmits.update('0' as never, '1' as never, false as never, 3)).toBe(true);
    expect(useRecycleScrollerEmits.scrollEnd()).toBe(true);
    expect(useRecycleScrollerEmits.scrollStart()).toBe(true);
    expect(useRecycleScrollerEmits.mouseEnter(new MouseEvent('mouseenter'))).toBe(true);
    expect(useRecycleScrollerEmits.mouseLeave(new MouseEvent('mouseleave'))).toBe(true);
    expect(useRecycleScrollerEmits.scrollBegin()).toBe(true);
    expect(useRecycleScrollerEmits.scrollStop()).toBe(true);
    expect(useVirtualScrollerItemEmits.resize('a')).toBe(true);
  });
});
