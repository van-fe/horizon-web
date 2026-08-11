import { mount } from '@vue/test-utils';
import { HRecycleScroller, HVirtualScroller } from '..';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { KeepAlive, defineComponent, nextTick, ref } from 'vue';
import type { VirtualScrollerRenderlessScope } from '../src/composables/useSlots';

type Item = {
  id: number;
  height: number;
  name: string;
  avatar: string;
};

function getData() {
  const list: Item[] = [];

  for (let i = 0; i < 10000; i++) {
    list.push({
      id: i,
      height: 50,
      name: 'faker name',
      avatar: '',
    });
  }

  return list;
}

describe('VirtualScroller.tsx', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('basic', async () => {
    const items = ref<Item[]>(getData());

    const wrapper = mount(() => (
      <HRecycleScroller items={items.value} itemSize={50} sizeField="height" />
    ));
    const element = wrapper.findComponent(HRecycleScroller);

    expect(element.exists()).toBe(true);
  });

  /**
   * 生成1w 条数据, 验证组件实际生成的dom节点数
   */
  test('render view node', async () => {
    const items = ref<Item[]>(getData());

    const wrapper = mount(() => (
      <HRecycleScroller
        items={items.value}
        itemSize={50}
        scrollerHeight={500}
        v-slots={{
          default: () => <div>1</div>,
        }}
      />
    ));
    const element = wrapper.findComponent(HRecycleScroller);
    await nextTick();

    const viewNodes = element.find('.h-recycle-scroller__item-wrapper');

    expect(viewNodes.exists()).toBe(true);
  });

  test('recycles views after a large scroll jump', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });

    const items = getData();
    const wrapper = mount(
      () => (
        <HRecycleScroller
          items={items}
          itemSize={50}
          scrollerHeight={100}
          buffer={0}
          v-slots={{
            default: ({ item }: { item: Item }) => <div>{item.id}</div>,
          }}
        />
      ),
      { attachTo: document.body },
    );
    const scrollWrapper = wrapper.find<HTMLElement>('.h-scrollbar__wrap');

    await nextTick();
    await nextTick();
    expect(wrapper.findAll('.h-recycle-scroller__item-view')).toHaveLength(2);

    scrollWrapper.element.scrollTop = 5000;
    await scrollWrapper.trigger('scroll');
    await nextTick();

    expect(wrapper.findAll('.h-recycle-scroller__item-view')).toHaveLength(2);
    expect(wrapper.text()).toContain('100');
    expect(wrapper.text()).toContain('101');
  });

  test('includes the before slot when scrolling to an item', async () => {
    const wrapper = mount(
      () => (
        <HRecycleScroller
          items={getData().slice(0, 10)}
          itemSize={50}
          scrollerHeight={100}
          v-slots={{ before: () => <div style="height: 30px">header</div> }}
        />
      ),
      { attachTo: document.body },
    );
    const scroller = wrapper.findComponent(HRecycleScroller);
    const scrollWrapper = wrapper.find<HTMLElement>('.h-scrollbar__wrap');
    const before = wrapper.find<HTMLElement>('.h-recycle-scroller__slot');

    await nextTick();
    await nextTick();
    expect(before.element.scrollHeight).toBe(30);
    scroller.getCurrentComponent().exposed?.scrollToItem(2);
    await nextTick();

    expect(scrollWrapper.element.scrollTop).toBe(130);
  });

  test('provides active state and renders empty slot after data is cleared', async () => {
    const items = ref(getData().slice(0, 5));
    const wrapper = mount(() => (
      <HVirtualScroller
        items={items.value}
        minItemSize={50}
        buffer={200}
        v-slots={{
          default: ({ item, active }: { item: Item; active: boolean }) => (
            <div data-active={String(active)}>{item.id}</div>
          ),
          empty: () => <div class="empty">empty</div>,
        }}
      />
    ));

    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.find('[data-active="true"]').exists(), wrapper.html()).toBe(true);

    items.value = [];
    await nextTick();
    await nextTick();

    expect(wrapper.find('.empty').exists()).toBe(true);
    expect(wrapper.find('[data-active]').exists()).toBe(false);
  });

  test('uses an external scroll container in renderless mode', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });

    const container = ref<HTMLElement>();
    const items = getData().slice(0, 100);
    const wrapper = mount(
      () => (
        <div
          ref={container}
          class="external-scroll"
          style="height: 100px; overflow: auto; position: relative"
        >
          <HVirtualScroller
            items={items}
            itemSize={20}
            minItemSize={20}
            buffer={0}
            renderless
            scrollContainer={container.value}
            v-slots={{
              renderless: (scope: VirtualScrollerRenderlessScope<Item>) => (
                <div
                  class="renderless-range"
                  data-start={scope.startIndex}
                  data-end={scope.endIndex}
                  data-total={scope.totalSize}
                >
                  {scope.views.map(view => (
                    <span key={view.item.id}>{view.item.id}</span>
                  ))}
                </div>
              ),
            }}
          />
          <div aria-hidden="true" style="height: 2000px; width: 1px" />
        </div>
      ),
      { attachTo: document.body },
    );
    await wrapper.find('.external-scroll').trigger('scroll');
    await nextTick();

    expect(wrapper.findComponent(HRecycleScroller).exists()).toBe(false);
    expect(wrapper.find('.h-scrollbar').exists()).toBe(false);
    expect(wrapper.find('.renderless-range').attributes()).toMatchObject({
      'data-start': '0',
      'data-end': '5',
      'data-total': '2000',
    });
    expect(wrapper.findAll('.renderless-range span')).toHaveLength(5);

    container.value!.scrollTop = 200;
    await wrapper.find('.external-scroll').trigger('scroll');
    await nextTick();

    expect(wrapper.find('.renderless-range').attributes('data-start')).toBe('10');
    expect(wrapper.find('.renderless-range').text()).toContain('10');

    wrapper.findComponent(HVirtualScroller).getCurrentComponent().exposed?.scrollToItem(20);
    expect(container.value!.scrollTop).toBe(400);
  });

  test('scrolls a component-owned viewport to the stable bottom and ignores duplicate requests', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const wrapper = mount(
      HVirtualScroller,
      {
        props: {
          items: getData().slice(0, 20),
          itemSize: 20,
          minItemSize: 20,
          scrollerHeight: 100,
        },
        attachTo: document.body,
      },
    );
    await nextTick();
    const scroll = wrapper.get<HTMLElement>('.h-scrollbar__wrap').element;
    Object.defineProperties(scroll, {
      scrollHeight: { configurable: true, value: 400 },
      scrollTop: { configurable: true, writable: true, value: 0 },
    });
    (wrapper.vm as any).scrollToBottom();
    (wrapper.vm as any).scrollToBottom();
    await nextTick();
    expect(scroll.scrollTop).toBe(400);
    wrapper.unmount();
  });

  test('supports horizontal renderless scrolling to an item and the bottom', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 1;
    });
    const container = ref<HTMLElement>();
    const scroller = ref<any>();
    const wrapper = mount(
      () => (
        <div ref={container} style="width: 100px; overflow: auto">
          <HVirtualScroller
            ref={scroller}
            items={getData().slice(0, 10)}
            itemSize={25}
            minItemSize={25}
            direction="horizontal"
            renderless
            scrollContainer={container.value}
          >
            {{ renderless: () => <div>horizontal renderless</div> }}
          </HVirtualScroller>
        </div>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await wrapper.get('div').trigger('scroll');
    await nextTick();
    Object.defineProperty(container.value!, 'scrollLeft', {
      configurable: true,
      writable: true,
      value: 0,
    });
    scroller.value.scrollToItem(3);
    expect(container.value?.scrollLeft).toBe(75);
    scroller.value.scrollToBottom();
    expect(container.value?.scrollLeft).toBe(250);
    wrapper.unmount();
  });

  test('preserves the visible anchor when rows are prepended in both directions', async () => {
    const verticalItems = ref(Array.from({ length: 8 }, (_, id) => ({ id })));
    const verticalContainer = ref<HTMLElement>();
    const vertical = mount(
      () => (
        <div ref={verticalContainer} style="height: 60px; overflow: auto">
          <HVirtualScroller
            items={verticalItems.value}
            itemSize={20}
            minItemSize={20}
            scrollerHeight={60}
            buffer={0}
            renderless
            scrollContainer={verticalContainer.value}
          >
            {{ renderless: () => <div>vertical anchor</div> }}
          </HVirtualScroller>
        </div>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await vertical.get('div').trigger('scroll');
    const verticalScroll = verticalContainer.value!;
    Object.defineProperty(verticalScroll, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 45,
    });
    verticalItems.value = [{ id: -2 }, { id: -1 }, ...verticalItems.value];
    await nextTick();
    await nextTick();
    expect(verticalScroll.scrollTop).toBe(85);
    vertical.unmount();

    const horizontalItems = ref(Array.from({ length: 8 }, (_, id) => ({ id })));
    const horizontalContainer = ref<HTMLElement>();
    const horizontal = mount(
      () => (
        <div ref={horizontalContainer} style="width: 60px; overflow: auto">
          <HVirtualScroller
            items={horizontalItems.value}
            itemSize={20}
            minItemSize={20}
            direction="horizontal"
            scrollerHeight={60}
            buffer={0}
            renderless
            scrollContainer={horizontalContainer.value}
          >
            {{ renderless: () => <div>horizontal anchor</div> }}
          </HVirtualScroller>
        </div>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await horizontal.get('div').trigger('scroll');
    const horizontalScroll = horizontalContainer.value!;
    Object.defineProperty(horizontalScroll, 'scrollLeft', {
      configurable: true,
      writable: true,
      value: 45,
    });
    horizontalItems.value = [{ id: -2 }, { id: -1 }, ...horizontalItems.value];
    await nextTick();
    await nextTick();
    expect(horizontalScroll.scrollLeft).toBe(85);
    horizontal.unmount();
  });

  test('reacts to simple arrays, direction/key changes and KeepAlive activation', async () => {
    const show = ref(true);
    const direction = ref<'vertical' | 'horizontal'>('vertical');
    const keyField = ref('id');
    const items = ref<any[]>(['a', 'b', 'c']);
    const Host = defineComponent({
      setup() {
        return () => (
          <KeepAlive>
            {show.value ? (
              <HVirtualScroller
                items={items.value}
                itemSize={20}
                minItemSize={20}
                direction={direction.value}
                keyField={keyField.value}
                scrollerHeight={60}
              />
            ) : null}
          </KeepAlive>
        );
      },
    });
    const wrapper = mount(Host);
    await nextTick();
    expect(wrapper.findComponent(HVirtualScroller).exists()).toBe(true);
    direction.value = 'horizontal';
    items.value = [{ code: 'a' }, { code: 'b' }];
    keyField.value = 'code';
    await nextTick();
    show.value = false;
    await nextTick();
    show.value = true;
    await nextTick();
    expect(wrapper.findComponent(HVirtualScroller).exists()).toBe(true);
  });

  test('measures and scrolls page-mode viewports in vertical and horizontal directions', async () => {
    const direction = ref<'vertical' | 'horizontal'>('vertical');
    const outer = document.createElement('div');
    outer.style.overflow = 'auto';
    document.body.append(outer);
    Object.defineProperties(outer, {
      clientHeight: { configurable: true, value: 100 },
      clientWidth: { configurable: true, value: 120 },
      scrollTop: { configurable: true, writable: true, value: 5 },
      scrollLeft: { configurable: true, writable: true, value: 7 },
    });
    vi.spyOn(outer, 'getBoundingClientRect').mockReturnValue({
      top: 10,
      left: 15,
      right: 135,
      bottom: 110,
      width: 120,
      height: 100,
      x: 15,
      y: 10,
      toJSON: () => ({}),
    });
    const outerScroll = vi.spyOn(outer, 'scroll').mockImplementation(() => undefined);
    const wrapper = mount(
      () => (
        <HRecycleScroller
          items={getData().slice(0, 20)}
          itemSize={20}
          minItemSize={20}
          direction={direction.value}
          pageMode
          scrollOption={{ behavior: 'smooth' }}
        />
      ),
      { attachTo: outer },
    );
    await nextTick();
    await nextTick();
    const root = wrapper.get<HTMLElement>('.h-scrollbar__wrap').element;
    vi.spyOn(root, 'getBoundingClientRect').mockReturnValue({
      top: 40,
      left: 55,
      right: 255,
      bottom: 240,
      width: 200,
      height: 200,
      x: 55,
      y: 40,
      toJSON: () => ({}),
    });
    outer.dispatchEvent(new Event('scroll'));
    await nextTick();
    wrapper.getComponent(HRecycleScroller).getCurrentComponent().exposed?.scrollToItem(2);
    expect(outerScroll).toHaveBeenCalledWith({ top: 75, behavior: 'smooth' });

    direction.value = 'horizontal';
    await nextTick();
    outer.dispatchEvent(new Event('scroll'));
    wrapper.getComponent(HRecycleScroller).getCurrentComponent().exposed?.scrollToItem(3);
    expect(outerScroll).toHaveBeenCalledWith({ left: 107, behavior: 'smooth' });
    wrapper.unmount();
    outer.remove();
  });
});
