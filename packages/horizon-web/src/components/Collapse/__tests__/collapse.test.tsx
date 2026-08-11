import { mount } from '@vue/test-utils';
import { HCollapse, HCollapseItem } from '../index';
import { describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { AIcon } from '@aurora/icon';
import { useCollapseEmits } from '../src/composables/useEmits';

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
    test('border, filled, expandIconPosition and size produce public layout classes', () => {
      const wrapper = mount(() => (
        <HCollapse border filled expandIconPosition="right" size="large">
          <HCollapseItem name="layout">Layout</HCollapseItem>
        </HCollapse>
      ));
      const collapse = wrapper.findComponent(HCollapse);

      expect(collapse.classes()).toEqual(
        expect.arrayContaining([
          'h-collapse--border',
          'h-collapse--filled',
          'h-collapse--right',
          'h-collapse--large',
        ]),
      );
    });

    test('CollapseItem disabled prevents pointer and keyboard expansion', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <HCollapse onChange={onChange}>
          <HCollapseItem name="disabled" disabled>Disabled body</HCollapseItem>
        </HCollapse>
      ));
      const header = wrapper.get('[role="button"]');

      expect(header.attributes()).toMatchObject({ 'aria-disabled': 'true', tabindex: '-1' });
      await header.trigger('click');
      await header.trigger('keydown', { key: 'Enter' });
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.find('.h-collapse-item--expand').exists()).toBe(false);
    });

    test('CollapseItem expandIcon, color and background customize observable output', () => {
      const wrapper = mount(() => (
        <HCollapse>
          <HCollapseItem
            name="styled"
            expandIcon="add"
            color="rgb(1, 2, 3)"
            background="rgb(4, 5, 6)"
          >
            Styled body
          </HCollapseItem>
        </HCollapse>
      ));
      const item = wrapper.findComponent(HCollapseItem);

      expect((item.element as HTMLElement).style.borderBottomColor).toBe('rgb(1, 2, 3)');
      expect((item.get('.h-collapse-item__header').element as HTMLElement).style.backgroundColor)
        .toBe('rgb(4, 5, 6)');
      expect(item.findComponent(AIcon).props('name')).toBe('add');
    });

    test('CollapseItem directive if creates content only while expanded', async () => {
      const activeKey = ref<(string | number)[]>([]);
      const wrapper = mount(() => (
        <HCollapse v-model:activeKey={activeKey.value}>
          <HCollapseItem name="conditional" directive="if">
            <span class="conditional-body">Conditional</span>
          </HCollapseItem>
        </HCollapse>
      ));

      expect(wrapper.find('.conditional-body').exists()).toBe(false);
      await wrapper.get('[role="button"]').trigger('click');
      expect(wrapper.get('.conditional-body').text()).toBe('Conditional');
      await wrapper.get('[role="button"]').trigger('click');
      expect(wrapper.find('.conditional-body').exists()).toBe(false);
    });
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

  test('Collapse and CollapseItem default slots plus the item icon slot render in place', () => {
    const wrapper = mount(() => (
      <HCollapse activeKey={['slots']}>
        <div class="collapse-default">
          <HCollapseItem
            name="slots"
            v-slots={{
              default: () => <span class="item-default">Item body</span>,
              icon: () => <span class="item-icon">Custom icon</span>,
            }}
          />
        </div>
      </HCollapse>
    ));

    expect(wrapper.find('.collapse-default').exists()).toBe(true);
    expect(wrapper.get('.item-default').text()).toBe('Item body');
    expect(wrapper.get('.item-icon').text()).toBe('Custom icon');
    expect(wrapper.findComponent(AIcon).exists()).toBe(false);
  });

  test('renders title and nested panel slots and ignores unrelated header keys', async () => {
    const onChange = vi.fn();
    const wrapper = mount(() => (
      <HCollapse activeKey={['outer']} onChange={onChange}>
        <HCollapseItem
          name="outer"
          v-slots={{
            title: () => <strong class="title-slot">Nested title</strong>,
            default: () => (
              <HCollapse activeKey={['inner']}>
                <HCollapseItem name="inner" title="Inner">
                  Inner body
                </HCollapseItem>
              </HCollapse>
            ),
          }}
        />
      </HCollapse>
    ));

    expect(wrapper.get('.title-slot').text()).toBe('Nested title');
    expect(wrapper.get('.h-collapse-item').classes()).toContain('h-collapse-item--nest');
    expect(wrapper.get('.h-collapse-item__content').classes()).toContain(
      'h-collapse-item__content--nest',
    );
    await wrapper.get('.h-collapse-item__header').trigger('keydown', { key: 'Escape' });
    expect(onChange).not.toHaveBeenCalled();
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

    test('accordion clicking the active item emits an undefined close value', async () => {
      const onChange = vi.fn();
      const onUpdate = vi.fn();
      const wrapper = mount(() => (
        <HCollapse
          activeKey="active"
          accordion
          onChange={onChange}
          onUpdate:activeKey={onUpdate}
        >
          <HCollapseItem name="active" title="Active" />
        </HCollapse>
      ));

      await wrapper.get('.h-collapse-item__header').trigger('click');
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(undefined);
      expect(onUpdate).toHaveBeenCalledWith(undefined);
    });

    test('validators accept every public active-key shape and reject other payloads', () => {
      for (const validator of [useCollapseEmits.change, useCollapseEmits['update:activeKey']]) {
        expect(validator('panel')).toBe(true);
        expect(validator(1)).toBe(true);
        expect(validator(['panel', 1])).toBe(true);
        expect(validator(undefined)).toBe(true);
        expect(validator(null as never)).toBe(false);
      }
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
