import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';
import type { CascaderProps } from '../src/composables/useProps';
import type { NCascaderDynamicLoadNode } from '../src/utils/types';
import NPickerInput from '../../Picker/src/components/NPickerInput';
import NPickerPopper from '../../Picker/src/components/NPickerPopper';
import { IconCloseFilled } from '@aurora/icon';
import {
  checkAllItems,
  clickOptionByOrder,
  clickOptionByOrderWithLimit,
  closeCascader,
  createInstance,
  maskClearIconVisible,
  openCascader,
} from './cascader-helper';
import type { NCascaderOption } from '~/components/Cascader/src/utils/types';
import { sleep } from '~/utils/tools';
import NCascaderItem from '../src/components/CascaderItem';
import NCascaderPanels from '../src/components/CascaderPanels';
import NRadio from '~/components/Radio/src/Radio';

describe('Cascader.tsx props', () => {
  test('model-value', async () => {
    const { modelValue, wrapper } = createInstance();

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);

    expect(modelValue.value).toStrictEqual(['guide', 'disciplines', 'consistency']);

    await clickOptionByOrder(wrapper, 1);

    expect(modelValue.value).toStrictEqual(['component', 'form', 'checkbox']);
  });

  test('input-style', async () => {
    const inputStyle = ref<CascaderProps['inputStyle']>('normal');
    const { wrapper } = createInstance({ inputStyle });

    expect(wrapper.findComponent(NPickerInput).classes('n-picker__input--normal')).toBeTruthy();

    inputStyle.value = 'emphasize';

    await nextTick();

    expect(wrapper.findComponent(NPickerInput).classes('n-picker__input--emphasize')).toBeTruthy();

    inputStyle.value = 'no-border';

    await nextTick();

    expect(wrapper.findComponent(NPickerInput).classes('n-picker__input--no-border')).toBeTruthy();
  });

  test('trigger', async () => {
    const trigger = ref<CascaderProps['trigger']>('click');
    const { wrapper } = createInstance({ trigger });

    await openCascader(wrapper);

    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();

    await closeCascader(wrapper);

    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();

    trigger.value = 'hover';

    await nextTick();

    await openCascader(wrapper, 'hover');

    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();

    await closeCascader(wrapper);

    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test('clearable', async () => {
    const clearable = ref<CascaderProps['clearable']>(true);
    const { wrapper, modelValue } = createInstance({ clearable });

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);

    expect(modelValue.value).toStrictEqual(['guide', 'disciplines', 'consistency']);

    await maskClearIconVisible(wrapper);

    expect(wrapper.findComponent(IconCloseFilled).exists()).toBeTruthy();

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(wrapper.findComponent(NCascaderPanels).isVisible()).toBeFalsy();

    expect(modelValue.value).toStrictEqual([]);

    clearable.value = false;

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);

    await maskClearIconVisible(wrapper);

    expect(wrapper.findComponent(IconCloseFilled).exists()).toBeFalsy();
  });

  test('dynamic-load', async () => {
    const options = ref<NCascaderOption[]>([
      {
        label: 'Root',
        value: 'root',
        isLeaf: false,
      },
    ]);

    const { wrapper, modelValue, pickerInput } = createInstance({
      options,
      dynamicLoad: (node: NCascaderDynamicLoadNode) =>
        new Promise(resolve => {
          const codePoint = 97 + node.level;

          resolve(
            new Array(5).fill(0).map((_, index) => ({
              label: `${node.options.at(-1)?.label} - ${String.fromCodePoint(codePoint)}(${index})`,
              value: `${codePoint}(${index})`,
              isLeaf: codePoint > 100,
              children: [],
            })),
          );
        }),
      'onUpdate:options': (val: NCascaderOption[]) => (options.value = val),
    });

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);
    await clickOptionByOrder(wrapper);
    await clickOptionByOrder(wrapper);
    await clickOptionByOrder(wrapper);
    await clickOptionByOrder(wrapper);

    expect(modelValue.value).toStrictEqual(['root', '97(0)', '98(0)', '99(0)', '100(0)', '101(0)']);
    expect(pickerInput.text().replace(/\s/g, '')).toBe(
      'Root/Root-a(0)/Root-a(0)-b(0)/Root-a(0)-b(0)-c(0)/Root-a(0)-b(0)-c(0)-d(0)/Root-a(0)-b(0)-c(0)-d(0)-e(0)',
    );
  });

  test('filter-max-result', async () => {
    const filterMaxResult = ref(20);

    const { wrapper, pickerInput } = createInstance({
      filterMaxResult,
      multiple: true,
      filterable: true,
    });

    await pickerInput.find('input').setValue('e');
    await sleep(200);

    expect(wrapper.findAllComponents(NCascaderItem).length).toBe(20);

    filterMaxResult.value = 1000;
    await nextTick();

    expect(wrapper.findAllComponents(NCascaderItem).length).toBe(49);
  });

  test('use-filter-check-all', async () => {
    const useFilterCheckAll = ref(false);

    const { wrapper, pickerInput, modelValue } = createInstance({
      useFilterCheckAll,
      multiple: true,
      filterable: true,
    });

    await openCascader(wrapper);

    await pickerInput.find('input').setValue('feedback');
    await sleep(200);

    expect(wrapper.find('.n-cascader-search-panel__check-all').exists()).toBeFalsy();

    useFilterCheckAll.value = true;
    await nextTick();

    const checkAll = wrapper.find('.n-cascader-search-panel__check-all');

    expect(checkAll.exists()).toBeTruthy();
    await checkAll.trigger('click');

    expect(modelValue.value?.length).toBe(1);
    expect(modelValue.value).toStrictEqual([['guide', 'disciplines', 'feedback']]);
  });

  test('use-check-all-summary', async () => {
    const useCheckAllSummary = ref(false);

    const { wrapper, pickerInput, modelValue } = createInstance({
      useFilterCheckAll: true,
      useCheckAllSummary,
      filterMaxResult: 1000,
      multiple: true,
      filterable: true,
    });

    await openCascader(wrapper);
    await checkAllItems(wrapper);

    expect(modelValue.value?.length).toBe(49);
    expect(pickerInput.text()).not.toBe('All');

    useCheckAllSummary.value = true;
    await nextTick();

    expect(pickerInput.text()).toContain('All');

    await pickerInput.find('input').setValue('e');
    await sleep(200);

    const checkAll = wrapper.find('.n-cascader-search-panel__check-all');
    expect(checkAll.exists()).toBeTruthy();
    expect(checkAll.find('.n-checkbox--checked').exists()).toBeTruthy();

    await wrapper.findComponent(NCascaderItem).trigger('click');

    expect(checkAll.find('.n-checkbox--checked').exists()).toBeFalsy();
    expect(checkAll.find('.n-checkbox--indeterminate').exists()).toBeTruthy();

    await checkAll.trigger('click');

    expect(pickerInput.text()).toContain('All');

    await checkAll.trigger('click');

    expect(modelValue.value?.length).toBe(0);
    expect(modelValue.value).toStrictEqual([]);

    await pickerInput.find('input').setValue('f');
    await sleep(200);
    await checkAll.trigger('click');

    expect(modelValue.value?.length).toBe(16);
  });

  test('check-all-summary-text', async () => {
    const { wrapper, pickerInput, modelValue } = createInstance({
      useFilterCheckAll: true,
      useCheckAllSummary: true,
      checkAllSummaryText: 'CHECK ALL',
      filterMaxResult: 1000,
      multiple: true,
      filterable: true,
    });

    await openCascader(wrapper);
    await checkAllItems(wrapper);

    expect(modelValue.value?.length).toBe(49);
    expect(pickerInput.text()).toContain('CHECK ALL');
  });

  test('check-strictly', async () => {
    const { wrapper, modelValue } = createInstance({
      checkStrictly: true,
    });

    await openCascader(wrapper);
    await clickOptionByOrderWithLimit(wrapper, 1, 0);

    expect(modelValue.value).toStrictEqual(['guide']);
  });

  test('show-radio', async () => {
    const showRadio = ref(false);

    const { wrapper } = createInstance({
      checkStrictly: true,
      showRadio,
    });

    await openCascader(wrapper);
    for (const item of wrapper.findAllComponents(NCascaderItem)) {
      expect(item.findComponent(NRadio).exists()).toBeFalsy();
    }

    showRadio.value = true;
    await nextTick();

    for (const item of wrapper.findAllComponents(NCascaderItem)) {
      expect(item.findComponent(NRadio).exists()).toBeTruthy();
    }
  });
});
