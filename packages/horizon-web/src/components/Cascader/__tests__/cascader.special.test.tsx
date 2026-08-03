import { describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import {
  clickOptionByOrder,
  clickOptionByOrderWithLimit,
  createInstance,
  hoverOptionByOrderWithLimit,
  openCascader,
} from './cascader-helper';
import type {
  HCascaderDynamicLoadNode,
  ModelValueSingleType,
} from '~/components/Cascader/src/utils/types';
import type { BaseTreeData } from '~/utils/useTree/types';
import { sleep } from '~/utils/tools';
import HCascaderPanel from '~/components/Cascader/src/components/CascaderPanel';
import HCascaderItem from '~/components/Cascader/src/components/CascaderItem';
import HRadio from '~/components/Radio/src/Radio';
import HCheckbox from '~/components/Checkbox/src/Checkbox';
import treeDataLevelNotEqual from './tree-data-level-not-equal.json';

describe('Cascader.tsx special', () => {
  test('unmatched value in single', async () => {
    const modelValue = ref(['guide', 'navigation', 'side']);
    const { wrapper } = createInstance({
      modelValue,
    });

    expect(modelValue.value).toStrictEqual(['guide', 'navigation', 'side']);

    expect(wrapper.find('input').element.value).toEqual('guide / navigation / side');
  });

  test('unmatched value in multiple', async () => {
    const modelValue = ref([['guide', 'navigation', 'side']]);
    const { pickerInput } = createInstance({
      modelValue,
      multiple: true,
    });

    await nextTick();

    expect(modelValue.value).toStrictEqual([['guide', 'navigation', 'side']]);

    expect(pickerInput.text()).toEqual('guide / navigation / side');
  });

  test('empty dynamic load data', async () => {
    const triggerLoad = vi.fn();

    const { wrapper } = createInstance({
      options: [
        {
          value: 'navigation',
          label: 'Navigation',
          isLeaf: false,
        },
      ],
      dynamicLoad(node: HCascaderDynamicLoadNode) {
        triggerLoad(node);
        return new Promise<BaseTreeData[]>(resolve => {
          resolve([] as BaseTreeData[]);
        });
      },
    });

    await nextTick();

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper);
    await sleep(2000);

    const panels = wrapper.findAllComponents(HCascaderPanel);
    expect(triggerLoad).toHaveBeenCalledOnce();
    expect(panels.length).toBe(2);
    expect(panels.at(-1)?.find('.h-cascader-panel__empty').exists()).toBeTruthy();
  });

  test('unselectable', async () => {
    const { modelValue, wrapper } = createInstance(
      {
        multiple: true,
      },
      'unselectable',
    );

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper, 0, 0, 1);

    expect(modelValue.value).toStrictEqual([['guide', 'disciplines', 'feedback']]);

    await clickOptionByOrder(wrapper, 2);

    expect(modelValue.value).not.toStrictEqual([['guide', 'disciplines', 'efficiency']]);
  });

  test('model-value set value by code on multiple', async () => {
    const modelValue = ref<ModelValueSingleType[]>([]);

    const { pickerInput } = createInstance({
      modelValue,
      'onUpdate:modelValue': val => (modelValue.value = val),
      multiple: true,
    });

    modelValue.value.push(['guide', 'navigation', 'side nav']);

    await nextTick();

    expect(pickerInput.text()).toContain('Guide / Navigation / Side Navigation');
  });

  test('use-filter-check-all with disabled options', async () => {
    const { wrapper, pickerInput, modelValue } = createInstance(
      {
        useFilterCheckAll: true,
        multiple: true,
        filterable: true,
      },
      'disabled',
    );

    await openCascader(wrapper);

    await pickerInput.find('input').setValue('g');
    await sleep(200);

    const checkAll = wrapper.find('.h-cascader-search-panel__check-all');

    expect(checkAll.exists()).toBeTruthy();
    await checkAll.trigger('click');

    expect(modelValue.value?.length).toBe(17);
    expect(modelValue.value).not.toStrictEqual(
      expect.arrayContaining(['guide', 'disciplines', 'efficiency']),
    );
  });

  test('use-filter-check-all with unselectable options', async () => {
    const { wrapper, pickerInput, modelValue } = createInstance(
      {
        useFilterCheckAll: true,
        multiple: true,
        filterable: true,
        filterMaxResult: Number.MAX_VALUE,
      },
      'unselectable',
    );

    await openCascader(wrapper);

    await pickerInput.find('input').setValue('g');
    await sleep(200);

    const checkAll = wrapper.find('.h-cascader-search-panel__check-all');

    expect(checkAll.exists()).toBeTruthy();
    await checkAll.trigger('click');

    expect(modelValue.value?.length).toBe(20);
    expect(modelValue.value).not.toStrictEqual(
      expect.arrayContaining(['guide', 'disciplines', 'efficiency']),
    );
    expect(modelValue.value).not.toStrictEqual(
      expect.arrayContaining(['component', 'form', 'radio']),
    );
  });

  test('check-strictly & show-radio', async () => {
    const { wrapper, modelValue } = createInstance({
      checkStrictly: true,
      showRadio: true,
    });

    await openCascader(wrapper);
    await clickOptionByOrderWithLimit(wrapper, 1, 0);

    expect(modelValue.value).toBeUndefined();

    await wrapper.findComponent(HCascaderItem).findComponent(HRadio).trigger('click');

    expect(modelValue.value).toStrictEqual(['guide']);
  });

  test('check-strictly and have default modelValue, click to the parent node should not open children panel', async () => {
    const modelValue = ref(['guide']);

    const { wrapper } = createInstance({
      checkStrictly: true,
      modelValue,
    });

    const { panelList } = await openCascader(wrapper);
    expect(panelList.length).toBe(1);

    const panels = await clickOptionByOrderWithLimit(wrapper, 1, 0);
    expect(panels.length).toBe(2);
  });

  test('focus status switch should be correctly on single choose', async () => {
    const modelValue = ref(['guide']);

    const { wrapper } = createInstance({
      checkStrictly: true,
      modelValue,
      'onUpdate:modelValue': val => (modelValue.value = val),
    });

    await openCascader(wrapper);
    expect(
      wrapper.findAllComponents(HCascaderItem).filter(item => item.classes('is-focus')).length,
    ).toBe(1);

    await clickOptionByOrderWithLimit(wrapper, 1, 1);
    expect(
      wrapper.findAllComponents(HCascaderItem).filter(item => item.classes('is-focus')).length,
    ).toBe(1);
    expect(modelValue.value).toStrictEqual(['component']);
  });

  test('number value', async () => {
    const { wrapper, modelValue, pickerInput } = createInstance({
      options: [
        {
          label: 'Vue',
          value: 1,
          children: [
            {
              label: 'Nuxt',
              value: 2,
            },
          ],
        },
        {
          label: 'React',
          value: 3,
          children: [
            {
              label: 'Next',
              value: 4,
            },
          ],
        },
      ],
    });

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper);

    expect(modelValue.value).toStrictEqual([1, 2]);

    modelValue.value = [3, 4];

    await nextTick();

    expect(pickerInput.text().replace(/\s/g, ' ')).toBe('React / Next');

    modelValue.value = [3, 5];

    await nextTick();

    expect(pickerInput.text().replace(/\s/g, ' ')).toBe('3 / 5');
  });

  test('expand-trigger = hover & check-strictly = true should not hover to check parent', async () => {
    const { wrapper, modelValue } = createInstance({
      checkStrictly: true,
      expandTrigger: 'hover',
    });

    await openCascader(wrapper);
    const panels = await hoverOptionByOrderWithLimit(wrapper, 1, 0);

    expect(modelValue.value).toBeUndefined();
    expect(panels.length).toBe(1);
  });

  test("should close panel while click on leaf node which current node's level is lower than leaf node", async () => {
    const { wrapper, modelValue } = createInstance({
      multiple: true,
      options: treeDataLevelNotEqual,
    });

    await openCascader(wrapper);
    const panels = await clickOptionByOrder(wrapper, 1, 1, 1);

    expect(modelValue.value).toStrictEqual([['component', 'form', 'checkbox']]);
    expect(panels.length).toBe(3);

    const currPanels = await clickOptionByOrder(wrapper, 3);

    expect(modelValue.value).toStrictEqual([['component', 'form', 'checkbox'], ['rootChoice']]);
    expect(currPanels.length).toBe(1);
  });

  test('keyboard navigation can traverse levels and select a leaf', async () => {
    const { wrapper, modelValue, pickerInput } = createInstance();
    await openCascader(wrapper);
    const input = pickerInput.find('input');

    await input.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();
    expect(wrapper.find('.h-cascader-item.is-focus').text()).toContain('Guide');

    await input.trigger('keydown', { key: 'ArrowRight' });
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    expect(wrapper.findAll('.h-cascader-item.is-focus').at(-1)?.text()).toContain(
      'Side Navigation',
    );

    await input.trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(modelValue.value).toStrictEqual(['guide', 'navigation', 'side nav']);
  });

  test('keyboard navigation skips disabled options', async () => {
    const { wrapper, pickerInput } = createInstance({ checkStrictly: true }, 'disabled');
    await openCascader(wrapper);
    const input = pickerInput.find('input');

    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowRight' });
    await nextTick();

    expect(wrapper.findAll('.h-cascader-item.is-focus').at(-1)?.text()).toContain('Navigation');
  });

  test('on reach multiple limit should set disabled to checkbox', async () => {
    const modelValue = ref([
      ['guide', 'navigation', 'side'],
      ['guide', 'disciplines', 'feedback'],
      ['guide', 'disciplines', 'efficiency'],
    ]);
    const { wrapper } = createInstance({
      modelValue,
      multiple: true,
      multipleLimit: 3,
    });

    await openCascader(wrapper);
    const checkboxes = wrapper.findAllComponents(HCheckbox);

    expect(checkboxes.length).toBeGreaterThan(0);
    expect(checkboxes.every(checkbox => checkbox.props('disabled'))).toBe(true);
  });
});
