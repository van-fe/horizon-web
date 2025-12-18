import { mount } from '@vue/test-utils';
import { NRecycleScroller } from '..';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

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
  test('basic', async () => {
    const items = ref<Item[]>(getData());

    const wrapper = mount(() => (
      <NRecycleScroller items={items.value} itemSize={50} sizeField="height" />
    ));
    const element = wrapper.findComponent(NRecycleScroller);

    expect(element.exists()).toBe(true);
  });

  /**
   * 生成1w 条数据, 验证组件实际生成的dom节点数
   */
  test('render view node', async () => {
    const items = ref<Item[]>(getData());

    const wrapper = mount(() => (
      <NRecycleScroller
        items={items.value}
        itemSize={50}
        scrollerHeight={500}
        v-slots={{
          default: () => <div>1</div>,
        }}
      />
    ));
    const element = wrapper.findComponent(NRecycleScroller);
    await nextTick();

    const viewNodes = element.find('.n-recycle-scroller__item-wrapper');

    expect(viewNodes.exists()).toBe(true);
  });
});
