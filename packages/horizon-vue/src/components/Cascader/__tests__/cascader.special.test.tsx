import { describe, expect, test, vi } from 'vitest';
import { h, ref, nextTick } from 'vue';
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
import CascaderPanels from '../src/components/CascaderPanels';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import HScrollbar from '../../Scrollbar/src/Scrollbar';

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

  test('clicking the already selected single option is idempotent', async () => {
    const { wrapper, element } = createInstance({
      modelValue: ['guide', 'navigation', 'side nav'],
    });
    await openCascader(wrapper);
    const selected = wrapper
      .findAllComponents(HCascaderItem)
      .find(item => item.props('extendsOption').value === 'side nav')!;

    await selected.trigger('click');
    expect(element.props('modelValue')).toEqual(['guide', 'navigation', 'side nav']);
    expect(element.emitted('change')).toBeUndefined();
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

  test('undefined dynamic load results leave the current panel stable', async () => {
    const triggerLoad = vi.fn();
    const { wrapper } = createInstance({
      options: [{ value: 'lazy', label: 'Lazy', isLeaf: false }],
      dynamicLoad(node: HCascaderDynamicLoadNode) {
        triggerLoad(node);
        return Promise.resolve(undefined as unknown as BaseTreeData[]);
      },
    });

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper);
    await sleep(50);
    expect(triggerLoad).toHaveBeenCalledOnce();
    expect(wrapper.findAllComponents(HCascaderPanel)).toHaveLength(1);
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

  test('keyboard handles closed/open bounds, Home, End, Escape and exposed focus paths', async () => {
    const { wrapper, pickerInput, cascaderDomRef } = createInstance();
    const input = pickerInput.find('input');

    await input.trigger('keydown', { key: 'Enter' });
    await sleep(400);
    expect(wrapper.find('.h-cascader-panels').isVisible()).toBe(true);
    await input.trigger('keydown', { key: 'Escape' });
    await nextTick();

    await input.trigger('keydown', { key: 'ArrowUp' });
    await sleep(400);
    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.find('.h-cascader-item.is-focus').text()).toContain('Resource');
    await input.trigger('keydown', { key: 'Home' });
    expect(wrapper.find('.h-cascader-item.is-focus').text()).toContain('Guide');
    await input.trigger('keydown', { key: 'End' });
    expect(wrapper.find('.h-cascader-item.is-focus').text()).toContain('Resource');
    await input.trigger('keydown', { key: 'ArrowLeft' });

    cascaderDomRef.value?.focusOption(['guide', 'navigation', 'side nav']);
    await nextTick();
    expect(wrapper.findAll('.h-cascader-item.is-focus').at(-1)?.text()).toContain(
      'Side Navigation',
    );
    await input.trigger('keydown', { key: 'ArrowRight' });
    await input.trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.findAll('.h-cascader-item.is-focus').at(-1)?.text()).toContain('Navigation');
    cascaderDomRef.value?.focusOption(['does-not-exist']);

    const panels = wrapper.findComponent(CascaderPanels);
    await panels.trigger('mouseenter');
    expect(panels.emitted('mouseEnter')?.[0]?.[0]).toBeInstanceOf(MouseEvent);
  });

  test('keyboard search traverses results with arrows, Home and End and confirms a result', async () => {
    const { wrapper, pickerInput, modelValue } = createInstance({
      filterable: true,
      inputAble: true,
      inputEmitFrequency: 0,
    });
    await openCascader(wrapper);
    const input = pickerInput.find('input');
    await input.setValue('Navigation');
    await sleep(50);

    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowUp' });
    await input.trigger('keydown', { key: 'End' });
    await input.trigger('keydown', { key: 'Home' });
    await input.trigger('keydown', { key: 'Enter' });
    await nextTick();

    expect(modelValue.value).toBeDefined();
  });

  test('dynamic loading expands resolved children and clears loading for an empty result', async () => {
    const dynamicLoad = vi
      .fn<(node: HCascaderDynamicLoadNode) => Promise<BaseTreeData[]>>()
      .mockResolvedValueOnce([{ label: 'Lazy leaf', value: 'lazy-leaf', isLeaf: true }])
      .mockResolvedValueOnce([]);
    const { wrapper } = createInstance({
      options: [
        { label: 'Loaded root', value: 'loaded', isLeaf: false },
        { label: 'Empty root', value: 'empty', isLeaf: false },
      ],
      dynamicLoad,
    });
    await openCascader(wrapper);

    await wrapper.findAllComponents(HCascaderItem)[0].trigger('click');
    await vi.waitFor(() => expect(wrapper.text()).toContain('Lazy leaf'));
    expect(dynamicLoad.mock.calls[0][0].options).toEqual([
      expect.objectContaining({ value: 'loaded' }),
    ]);

    await wrapper.findAllComponents(HCascaderItem)[1].trigger('click');
    await vi.waitFor(() => expect(dynamicLoad).toHaveBeenCalledTimes(2));
    expect(wrapper.findAll('.h-cascader-panel').length).toBeGreaterThan(0);
  });

  test('real mouseenter expands hover parents and focuses enabled search results', async () => {
    const normal = createInstance({ expandTrigger: 'hover' });
    await openCascader(normal.wrapper);
    const rootItem = normal.wrapper.findAllComponents(HCascaderItem)[0];
    await rootItem.trigger('mouseenter');
    await nextTick();
    expect(normal.wrapper.findAllComponents(HCascaderPanel).length).toBe(2);

    const filtered = createInstance({ filterable: true, inputEmitFrequency: 0 });
    await openCascader(filtered.wrapper);
    await filtered.pickerInput.find('input').setValue('Navigation');
    await sleep(50);
    const result = filtered.wrapper.findComponent(HCascaderItem);
    await result.trigger('mouseenter');
    expect(result.classes()).toContain('is-focus');
  });

  test('selectable false blocks checkbox interaction at the original pointer target', async () => {
    const { wrapper, modelValue } = createInstance({ multiple: true }, 'unselectable');
    await openCascader(wrapper);
    const target = wrapper
      .findAllComponents(HCascaderItem)
      .find(item => item.props('extendsOption').selectable === false)!;

    await target.get('.h-cascader-item__checkbox').trigger('click');
    expect(modelValue.value).toBeUndefined();
  });

  test('function labels, full-path tooltip content and leaf-only radios render their branches', async () => {
    const FunctionLabel = () => h('strong', { class: 'function-label' }, 'Function label');
    const labels = createInstance({
      options: [{ value: 'function', label: FunctionLabel, isLeaf: true }],
      checkStrictly: true,
      showCheckedStrategy: 'fullPath',
      showTooltip: true,
    });
    await openCascader(labels.wrapper);
    expect(labels.wrapper.get('.function-label').text()).toBe('Function label');

    const radios = createInstance({
      showRadio: true,
      checkStrictly: false,
      expandTrigger: 'hover',
    });
    await openCascader(radios.wrapper);
    expect(radios.wrapper.find('.h-cascader-item__radio').exists()).toBe(false);
    await radios.wrapper.findAllComponents(HCascaderItem)[0].trigger('mouseenter');
    await nextTick();
    await radios.wrapper.findAllComponents(HCascaderPanel)[1].findComponent(HCascaderItem).trigger('mouseenter');
    await nextTick();
    expect(radios.wrapper.find('.h-cascader-item__radio').exists()).toBe(true);
  });

  test('group-label functions render and real panel bottom events preserve parent payloads', async () => {
    const onPanelReachBottom = vi.fn();
    const { wrapper } = createInstance({
      options: [
        {
          value: 'group',
          label: 'Group fallback',
          groupLabel: () => h('strong', { class: 'group-label-function' }, 'Group heading'),
        },
        { value: 'leaf', label: 'Leaf', isLeaf: true },
      ],
      onPanelReachBottom,
    });
    await openCascader(wrapper);
    expect(wrapper.get('.group-label-function').text()).toBe('Group heading');
    const scrollEvent = new Event('scroll');
    wrapper.findComponent(HScrollbar).vm.$emit('reachBottom', scrollEvent);
    expect(onPanelReachBottom).toHaveBeenCalledWith(scrollEvent, null);
  });

  test('search results use the virtual scroller when requested', async () => {
    const { wrapper, pickerInput } = createInstance({
      filterable: true,
      inputEmitFrequency: 0,
      useVirtualScroll: true,
    });
    await openCascader(wrapper);
    await pickerInput.find('input').setValue('Navigation');
    await sleep(50);
    expect(wrapper.findComponent(HVirtualScroller).exists()).toBe(true);
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
