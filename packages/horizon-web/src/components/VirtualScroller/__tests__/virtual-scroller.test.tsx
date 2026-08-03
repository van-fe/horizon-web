import { mount } from '@vue/test-utils';
import { HRecycleScroller, HVirtualScroller } from '..';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
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
    const wrapper = mount(() => (
      <HRecycleScroller
        items={items}
        itemSize={50}
        buffer={0}
        v-slots={{
          default: ({ item }: { item: Item }) => <div>{item.id}</div>,
        }}
      />
    ));
    const scrollWrapper = wrapper.find<HTMLElement>('.h-scrollbar__wrap');
    Object.defineProperty(scrollWrapper.element, 'clientHeight', {
      configurable: true,
      value: 100,
    });

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
    const wrapper = mount(() => (
      <HRecycleScroller
        items={getData().slice(0, 10)}
        itemSize={50}
        v-slots={{ before: () => <div>header</div> }}
      />
    ));
    const scroller = wrapper.findComponent(HRecycleScroller);
    const scrollWrapper = wrapper.find<HTMLElement>('.h-scrollbar__wrap');
    const before = wrapper.find<HTMLElement>('.h-recycle-scroller__slot');

    Object.defineProperty(before.element, 'scrollHeight', {
      configurable: true,
      value: 30,
    });
    scroller.getCurrentComponent().exposed?.scrollToItem(2);

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
    const wrapper = mount(() => (
      <div ref={container} class="external-scroll">
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
      </div>
    ));

    Object.defineProperty(container.value, 'clientHeight', {
      configurable: true,
      value: 100,
    });
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
});
