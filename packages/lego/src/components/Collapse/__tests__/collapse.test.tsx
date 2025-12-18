import { mount } from '@vue/test-utils';
import { NCollapse, NCollapseItem } from '../index';
import { describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';

describe('Collapse.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <NCollapse active-key="activeKey" style="width: 500px">
        <NCollapseItem title="This is a panel header." name="1">
          <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
          <div>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat</div>
          <div>sunt nostrud amet.Amet minim mollit.</div>
        </NCollapseItem>
        <NCollapseItem title="Why can i not submit a higher price?" name="2">
          <div>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </div>
          <div>Velit officia consequat duis enim velit mollit. </div>
        </NCollapseItem>
        <NCollapseItem title="How are you？" name="3">
          How are you？
        </NCollapseItem>
        <NCollapseItem title="What are Promotion Products?" name="4">
          What are Promotion Products?
        </NCollapseItem>
      </NCollapse>
    ));
    const element = wrapper.findComponent(NCollapse);
    const itemElements = wrapper.findAllComponents(NCollapseItem);

    expect(element.exists()).toBe(true);
    expect(itemElements.length).toBe(4);
  });

  describe('props', () => {
    test('activeKey', async () => {
      const activeKeyModel = ref(['1', '2']);
      const wrapper = mount(() => (
        <NCollapse activeKey={activeKeyModel.value}>
          <NCollapseItem name="1" title="1"></NCollapseItem>
          <NCollapseItem name="2" title="2"></NCollapseItem>
          <NCollapseItem name="3" title="3"></NCollapseItem>
          <NCollapseItem name="4" title="4"></NCollapseItem>
        </NCollapse>
      ));

      const expanded = wrapper.findAll('.n-collapse-item--expand');

      const expandedText = expanded.map(expandedEl => expandedEl.text()).join(',');

      expect(expandedText).eq('1,2');

      activeKeyModel.value = ['3', '4'];

      await nextTick();

      const expanded2 = wrapper.findAll('.n-collapse-item--expand');

      const expanded2Text = expanded2.map(expandedEl => expandedEl.text()).join(',');

      expect(expanded2Text).eq('3,4');
    });

    test('expand-all', async () => {
      const activeKeyModel = ref<(string | number)[]>([]);
      const expandedModel = ref(true);
      const wrapper = mount(() => (
        <NCollapse activeKey={activeKeyModel.value} expandAll={expandedModel.value}>
          <NCollapseItem name={1} title="123"></NCollapseItem>
          <NCollapseItem name="2" title="1234"></NCollapseItem>
        </NCollapse>
      ));

      await nextTick();
      const expandArr = wrapper.findAll('.n-collapse-item--expand');
      expect(expandArr.length).toBe(2);

      activeKeyModel.value = [1];
      await nextTick();
      const expandArr1 = wrapper.findAll('.n-collapse-item--expand');
      expect(expandArr1.length).toBe(1);
    });
  });

  describe('emit', () => {
    test('update:activeKey', async () => {
      const activeKeyModel = ref('1');
      const wrapper = mount(() => (
        <NCollapse v-model:activeKey={activeKeyModel.value} accordion={true}>
          <NCollapseItem name="1" title="1"></NCollapseItem>
          <NCollapseItem name="2" title="2"></NCollapseItem>
          <NCollapseItem name="3" title="3"></NCollapseItem>
          <NCollapseItem name="4" title="4"></NCollapseItem>
        </NCollapse>
      ));

      const lastItem = wrapper.findAllComponents(NCollapseItem).at(-1);

      await lastItem!.find('.n-collapse-item__header').trigger('click');

      expect(activeKeyModel.value).eq('4');
    });

    test('change', async () => {
      const activeKeyModel = ref('1');
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <NCollapse activeKey={activeKeyModel.value} accordion={true} onChange={onChange}>
          <NCollapseItem name="1" title="1"></NCollapseItem>
          <NCollapseItem name="2" title="2"></NCollapseItem>
          <NCollapseItem name="3" title="3"></NCollapseItem>
          <NCollapseItem name="4" title="4"></NCollapseItem>
        </NCollapse>
      ));

      const lastItem = wrapper.findAllComponents(NCollapseItem).at(-1);

      await lastItem!.find('.n-collapse-item__header').trigger('click');

      expect(onChange).toHaveBeenCalledWith('4');
    });
  });

  describe('special', () => {
    test('expand', async () => {
      const activeKeyModel = ref([1, '2']);
      const wrapper = mount(() => (
        <NCollapse activeKey={activeKeyModel.value}>
          <NCollapseItem name={1} title="123"></NCollapseItem>
          <NCollapseItem name="2" title="1234"></NCollapseItem>
        </NCollapse>
      ));

      const expandArr = wrapper.findAll('.n-collapse-item--expand');
      expect(expandArr.length).toBe(2);

      const headerEl = wrapper.find('.n-collapse-item__header');
      await headerEl.trigger('click');
      const expandArr1 = wrapper.findAll('.n-collapse-item--expand');
      expect(expandArr1.length).toBe(1);
    });
  });
});
