import type { VueWrapper } from '@vue/test-utils';
import { shallowMount, mount } from '@vue/test-utils';
import HTransfer from '..';
import HTransferPanel from '../src/TransferPanel';
import { localeInjectKey } from '~/provides';
import VueLocaleService, { LocaleSupportLang } from '@aurora/locale-vue';
import { dictionaries } from '~/locales';
import { describe, expect, test, vi } from 'vitest';
import { defineComponent, nextTick, reactive, ref } from 'vue';

describe('Transfer.tsx', () => {
  const getTestData = () => {
    const data: Array<{ key: number; label: string; disabled: boolean }> = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `备选项 ${i}`,
        disabled: i % 4 === 0,
      });
    }
    return data;
  };

  test('basic', async () => {
    const wrapper = shallowMount(() => <HTransfer data={getTestData()} />);
    expect(wrapper.findComponent(HTransfer)).toBeTruthy();
  });

  test('default target list', () => {
    const value = ref([1, 4]);
    const wrapper = mount(() => <HTransfer v-model={value.value} data={getTestData()} />);
    const panelELE = wrapper.findComponent(HTransferPanel);
    expect(panelELE.vm.checkedArr.length).toBe(2);
  });

  test('filterable', async () => {
    const value = ref([]);

    const wrapper = mount(() => (
      <HTransfer v-model={value.value} filterable data={getTestData()} />
    ));
    const panelELE = wrapper.findComponent(HTransferPanel);
    const inputELE = panelELE.find('.h-input__inner');
    await inputELE.setValue('10');
    const checkboxELEArr = wrapper.findAll('.h-transfer-panel__item > .h-checkbox');
    expect(checkboxELEArr.length).toBe(1);
  });

  test('transfer', async () => {
    const value = ref([1, 4]);
    const wrapper = mount(() => <HTransfer v-model={value.value} data={getTestData()} />);
    expect((wrapper.findComponent('.h-transfer--right') as VueWrapper<any>).vm.data.length).toBe(
      value.value.length,
    );
    value.value = [1, 2, 4];
    await nextTick();
    expect((wrapper.findComponent('.h-transfer--right') as VueWrapper<any>).vm.data.length).toBe(
      value.value.length,
    );

    const clearButton = wrapper.find('.h-transfer__header--clear');
    await clearButton.trigger('click');
    expect(value.value.length).toBe(1);
    expect((wrapper.findComponent('.h-transfer--right') as VueWrapper<any>).vm.data.length).toBe(
      value.value.length,
    );
  });

  test('customize', () => {
    const state = reactive({
      value: [2],
      titles: ['表1', '表2'],
    });
    const wrapper = mount(() => (
      <HTransfer
        v-model={state.value}
        titles={state.titles as [string, string]}
        data={getTestData()}
      />
    ));

    const label = wrapper.find('.h-transfer__header .h-checkbox__label');
    expect(label.text().includes('表1')).toBeTruthy();
  });

  test('placeholder', () => {
    const state = reactive({
      value: [],
    });
    const wrapper = mount(() => (
      <HTransfer v-model={state.value} filterable={true} data={getTestData()} placeholder="hhhh" />
    ));
    const transferELE = wrapper.findComponent(HTransfer);
    expect(transferELE.find('.h-input__inner').attributes('placeholder')).eq('hhhh');
  });

  test('internal', async () => {
    const state = reactive({
      value: [],
    });
    const localeService = new VueLocaleService({
      current: LocaleSupportLang.En,
      lang: {
        dictionaries,
      },
    });
    const wrapper = mount(
      () => <HTransfer v-model={state.value} filterable={true} data={getTestData()} />,
      {
        global: {
          provide: {
            [localeInjectKey as symbol]: ref(localeService),
          },
        },
      },
    );
    const transferELE = wrapper.findComponent(HTransfer);
    expect(transferELE.find('.h-input__inner').attributes('placeholder')).eq('Please Input');

    localeService.current = LocaleSupportLang.ZhCN;
    await nextTick();
    expect(transferELE.find('.h-input__inner').attributes('placeholder')).eq('请输入');
  });

  test('disabled', async () => {
    const value = ref([1, 4]);
    const disabled = ref(false);
    const wrapper = mount(() => (
      <HTransfer data={getTestData()} v-model={value.value} disabled={disabled.value} />
    ));
    const checkboxELEArr = wrapper.findAll('.h-checkbox');
    const checkboxDisabledELEArr = wrapper.findAll('.h-checkbox--disabled');
    expect(checkboxELEArr.length !== checkboxDisabledELEArr.length).toBeTruthy();

    const clearButtonELE = wrapper.find('.h-transfer__header--clear');
    expect(clearButtonELE.element.hasAttribute('disabled')).toBeFalsy();

    disabled.value = true;
    await nextTick();
    const checkboxELENewArr = wrapper.findAll('.h-checkbox');
    const checkboxDisabledELENewArr = wrapper.findAll('.h-checkbox--disabled');
    expect(checkboxELENewArr.length === checkboxDisabledELENewArr.length).toBeTruthy();
    const clearButtonELENew = wrapper.find('.h-transfer__header--clear');
    expect(clearButtonELENew.element.hasAttribute('disabled')).toBeTruthy();
  });

  test('reuses sortable-list drop positioning and animates reordered rows', async () => {
    const value = ref([1, 2, 3]);
    const VirtualScrollerStub = defineComponent({
      props: ['items'],
      setup(props, { slots }) {
        return () => (
          <div>
            {(props.items as any[]).map((item, index) =>
              slots.default?.({ item, index, active: true }),
            )}
          </div>
        );
      },
    });
    const VirtualScrollerItemStub = defineComponent({
      setup(_props, { slots }) {
        return () => <div>{slots.default?.()}</div>;
      },
    });
    const wrapper = mount(
      () => <HTransfer data={getTestData()} v-model={value.value} draggable={true} />,
      {
        global: {
          stubs: {
            HVirtualScroller: VirtualScrollerStub,
            HVirtualScrollerItem: VirtualScrollerItemStub,
          },
        },
      },
    );
    await nextTick();
    const items = wrapper.findAll('.h-transfer--right .h-transfer-panel__item--right');
    expect(items).toHaveLength(3);
    const source = items[0];
    const target = items[2];
    vi.spyOn(target.element, 'getBoundingClientRect').mockReturnValue({
      top: 80,
      bottom: 118,
      height: 38,
      left: 0,
      right: 240,
      width: 240,
      x: 0,
      y: 80,
      toJSON: () => ({}),
    });

    await source.trigger('dragstart');
    await target.trigger('dragover', { clientY: 110 });

    expect(target.find('.h-transfer-panel__item-drag-over-cursor').classes()).toContain(
      'is-bottom',
    );

    await target.trigger('drop', { clientY: 110 });
    await nextTick();

    expect(value.value).toEqual([2, 3, 1]);
    expect(wrapper.find('.h-transfer--right').classes()).toContain('is-sort-animating');
  });
});
