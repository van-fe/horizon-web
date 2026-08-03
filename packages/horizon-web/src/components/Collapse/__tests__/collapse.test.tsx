import { mount } from '@vue/test-utils';
import { HCollapse, HCollapseItem } from '../index';
import { describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';

describe('Collapse.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HCollapse active-key="activeKey" style="width: 500px">
        <HCollapseItem title="This is a panel header." name="1">
          <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
          <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
          <div>sunt nostrud amet.Amet minim mollit.</div>
        </HCollapseItem>
        <HCollapseItem title="Why can i not submit a higher price?" name="2">
          <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
          <div>Velit officia consequat duis enim velit mollit. </div>
        </HCollapseItem>
        <HCollapseItem title="How are you？" name="3">
          How are you？
        </HCollapseItem>
        <HCollapseItem title="What are Promotion Products?" name="4">
          What are Promotion Products?
        </HCollapseItem>
      </HCollapse>
    ));
    const element = wrapper.findComponent(HCollapse);
    const itemElements = wrapper.findAllComponents(HCollapseItem);

    expect(element.exists()).toBe(true);
    expect(itemElements.length).toBe(4);
    const headers = wrapper.findAll('[role="button"]');
    expect(headers).toHaveLength(4);
    expect(headers[0].attributes('aria-controls')).toBeTruthy();
    expect(wrapper.find('[role="region"]').attributes('aria-labelledby')).toBeTruthy();
  });

  test('supports keyboard activation', async () => {
    const activeKey = ref<(string | number)[]>([]);
    const wrapper = mount(() => (
      <HCollapse v-model:activeKey={activeKey.value}>
        <HCollapseItem name="keyboard" title="Keyboard panel" />
      </HCollapse>
    ));

    const header = wrapper.find('[role="button"]');
    await header.trigger('keydown', { key: ' ' });
    expect(activeKey.value).toEqual(['keyboard']);
    expect(header.attributes('aria-expanded')).toBe('true');
  });

  describe('props', () => {
    test('activeKey', async () => {
      const activeKeyModel = ref(['1', '2']);
      const wrapper = mount(() => (
        <HCollapse activeKey={activeKeyModel.value}>
          <HCollapseItem name="1" title="1"></HCollapseItem>
          <HCollapseItem name="2" title="2"></HCollapseItem>
          <HCollapseItem name="3" title="3"></HCollapseItem>
          <HCollapseItem name="4" title="4"></HCollapseItem>
        </HCollapse>
      ));

      const expanded = wrapper.findAll('.h-collapse-item--expand');

      const expandedText = expanded.map(expandedEl => expandedEl.text()).join(',');

      expect(expandedText).eq('1,2');

      activeKeyModel.value = ['3', '4'];

      await nextTick();

      const expanded2 = wrapper.findAll('.h-collapse-item--expand');

      const expanded2Text = expanded2.map(expandedEl => expandedEl.text()).join(',');

      expect(expanded2Text).eq('3,4');
    });

    test('expand-all', async () => {
      const activeKeyModel = ref<(string | number)[]>([]);
      const expandedModel = ref(true);
      const wrapper = mount(() => (
        <HCollapse activeKey={activeKeyModel.value} expandAll={expandedModel.value}>
          <HCollapseItem name={1} title="123"></HCollapseItem>
          <HCollapseItem name="2" title="1234"></HCollapseItem>
        </HCollapse>
      ));

      await nextTick();
      const expandArr = wrapper.findAll('.h-collapse-item--expand');
      expect(expandArr.length).toBe(2);

      activeKeyModel.value = [1];
      await nextTick();
      const expandArr1 = wrapper.findAll('.h-collapse-item--expand');
      expect(expandArr1.length).toBe(1);
    });
  });

  describe('emit', () => {
    test('update:activeKey', async () => {
      const activeKeyModel = ref('1');
      const wrapper = mount(() => (
        <HCollapse v-model:activeKey={activeKeyModel.value} accordion={true}>
          <HCollapseItem name="1" title="1"></HCollapseItem>
          <HCollapseItem name="2" title="2"></HCollapseItem>
          <HCollapseItem name="3" title="3"></HCollapseItem>
          <HCollapseItem name="4" title="4"></HCollapseItem>
        </HCollapse>
      ));

      const lastItem = wrapper.findAllComponents(HCollapseItem).at(-1);

      await lastItem!.find('.h-collapse-item__header').trigger('click');

      expect(activeKeyModel.value).eq('4');
    });

    test('change', async () => {
      const activeKeyModel = ref('1');
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <HCollapse activeKey={activeKeyModel.value} accordion={true} onChange={onChange}>
          <HCollapseItem name="1" title="1"></HCollapseItem>
          <HCollapseItem name="2" title="2"></HCollapseItem>
          <HCollapseItem name="3" title="3"></HCollapseItem>
          <HCollapseItem name="4" title="4"></HCollapseItem>
        </HCollapse>
      ));

      const lastItem = wrapper.findAllComponents(HCollapseItem).at(-1);

      await lastItem!.find('.h-collapse-item__header').trigger('click');

      expect(onChange).toHaveBeenCalledWith('4');
    });
  });

  describe('special', () => {
    test('expand', async () => {
      const activeKeyModel = ref([1, '2']);
      const wrapper = mount(() => (
        <HCollapse activeKey={activeKeyModel.value}>
          <HCollapseItem name={1} title="123"></HCollapseItem>
          <HCollapseItem name="2" title="1234"></HCollapseItem>
        </HCollapse>
      ));

      const expandArr = wrapper.findAll('.h-collapse-item--expand');
      expect(expandArr.length).toBe(2);

      const headerEl = wrapper.find('.h-collapse-item__header');
      await headerEl.trigger('click');
      const expandArr1 = wrapper.findAll('.h-collapse-item--expand');
      expect(expandArr1.length).toBe(1);
    });
  });
});
