import type { VueWrapper } from '@vue/test-utils';
import { shallowMount, mount } from '@vue/test-utils';
import HTransfer from '..';
import HTransferPanel from '../src/TransferPanel';
import { localeInjectKey } from '~/provides';
import VueLocaleService, { LocaleSupportLang } from '@aurora/locale-vue';
import { dictionaries } from '~/locales';
import { describe, expect, test } from 'vitest';
import { ref, nextTick, reactive } from 'vue';

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
    const inputELE = panelELE.find('.n-input__inner');
    await inputELE.setValue('10');
    const checkboxELEArr = wrapper.findAll('.n-transfer-panel__item > .n-checkbox');
    expect(checkboxELEArr.length).toBe(1);
  });

  test('transfer', async () => {
    const value = ref([1, 4]);
    const wrapper = mount(() => <HTransfer v-model={value.value} data={getTestData()} />);
    expect((wrapper.findComponent('.n-transfer--right') as VueWrapper<any>).vm.data.length).toBe(
      value.value.length,
    );
    value.value = [1, 2, 4];
    await nextTick();
    expect((wrapper.findComponent('.n-transfer--right') as VueWrapper<any>).vm.data.length).toBe(
      value.value.length,
    );

    const clearButton = wrapper.find('.n-transfer__header--clear');
    await clearButton.trigger('click');
    expect(value.value.length).toBe(1);
    expect((wrapper.findComponent('.n-transfer--right') as VueWrapper<any>).vm.data.length).toBe(
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

    const label = wrapper.find('.n-transfer__header .n-checkbox__label');
    expect(label.text().includes('表1')).toBeTruthy();
  });

  test('placeholder', () => {
    const state = reactive({
      value: [],
    });
    const wrapper = mount(() => (
      <HTransfer
        v-model={state.value}
        filterable={true}
        data={getTestData()}
        placeholder="hhhh"
      />
    ));
    const transferELE = wrapper.findComponent(HTransfer);
    expect(transferELE.find('.n-input__inner').attributes('placeholder')).eq('hhhh');
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
    expect(transferELE.find('.n-input__inner').attributes('placeholder')).eq('Please Input');

    localeService.current = LocaleSupportLang.ZhCN;
    await nextTick();
    expect(transferELE.find('.n-input__inner').attributes('placeholder')).eq('请输入');
  });

  test('disabled', async () => {
    const value = ref([1, 4]);
    const disabled = ref(false);
    const wrapper = mount(() => (
      <HTransfer data={getTestData()} v-model={value.value} disabled={disabled.value} />
    ));
    const checkboxELEArr = wrapper.findAll('.n-checkbox');
    const checkboxDisabledELEArr = wrapper.findAll('.n-checkbox--disabled');
    expect(checkboxELEArr.length !== checkboxDisabledELEArr.length).toBeTruthy();

    const clearButtonELE = wrapper.find('.n-transfer__header--clear');
    expect(clearButtonELE.element.hasAttribute('disabled')).toBeFalsy();

    disabled.value = true;
    await nextTick();
    const checkboxELENewArr = wrapper.findAll('.n-checkbox');
    const checkboxDisabledELENewArr = wrapper.findAll('.n-checkbox--disabled');
    expect(checkboxELENewArr.length === checkboxDisabledELENewArr.length).toBeTruthy();
    const clearButtonELENew = wrapper.find('.n-transfer__header--clear');
    expect(clearButtonELENew.element.hasAttribute('disabled')).toBeTruthy();
  });
});
