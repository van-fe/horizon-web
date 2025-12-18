import { describe, expect, test, vi } from 'vitest';
import { createInstance } from './tree-helper';
import { h, nextTick, ref } from 'vue';
import type { TreeProps } from '../src/composables/useProps';
import { ComponentClassBlock } from '@aurora/shared';
import type {
  NTreeData,
  NTreeDynamicLoadNode,
  NTreeExtendsData,
  NTreeFilterMethodType,
  NTreeHighlightMethod,
  NTreeNodeDataWithLevel,
  NTreeUuidType,
} from '../src/utils/types';
import NTreeItem from '../src/components/TreeItem';
import NInput from '../../Input';
import fieldMapOptions from './modifiedOptions/field-map-options.json';
import { IconAdd, IconCar, IconReduce } from '@aurora/icon';
import NCheckbox from '../../Checkbox';
import { sleep } from '~/utils/tools';
import NRadio from '../../Radio';

const treeClassHelper = new ComponentClassBlock('tree');
const treeItemClassHelper = new ComponentClassBlock('tree-item');

describe('Tree.tsx props', () => {
  test('size', async () => {
    const size = ref<TreeProps['size']>();

    const { element } = await createInstance({ size });

    expect(element.classes(treeClassHelper.m('medium')));

    for (const currSize of ['small', 'medium', 'large', 'huge'] as const) {
      size.value = currSize;
      await nextTick();
      expect(element.classes(treeClassHelper.m(currSize)));
    }
  });

  test('item-size', async () => {
    const itemSize = ref<TreeProps['itemSize']>();

    const { element } = await createInstance({ itemSize });

    expect(element.classes(treeClassHelper.m('medium'))).toBeTruthy();

    for (const currSize of ['small', 'medium', 'large', 'huge'] as const) {
      itemSize.value = currSize;
      await nextTick();
      expect(element.classes(treeClassHelper.m(currSize))).toBeTruthy();
    }
  });

  test('disabled', async () => {
    const disabled = ref<TreeProps['disabled']>(false);

    const { element } = await createInstance({ disabled });

    expect(element.classes(treeClassHelper.is('disabled') as string)).toBeFalsy();

    disabled.value = true;

    await nextTick();

    expect(element.classes(treeClassHelper.is('disabled') as string)).toBeTruthy();
  });

  test('filterable', async () => {
    const filterable = ref<TreeProps['filterable']>(false);

    const { wrapper, domRef } = await createInstance({ filterable });

    expect(wrapper.find('input').exists()).toBeFalsy();

    filterable.value = true;

    await nextTick();

    const inputElem = wrapper.find('input');

    expect(inputElem.exists()).toBeTruthy();

    await inputElem.setValue('g');

    domRef.value?.getVisibleItems().forEach((item: NTreeNodeDataWithLevel) => {
      if (!item?.children) {
        expect(item.label).toMatch(/g/i);
      }
    });
  });

  test('filter-method', async () => {
    const filterMethod: NTreeFilterMethodType = (inputValue, node) => {
      if (node && node.stringLabel) return node.stringLabel.includes(inputValue);

      return false;
    };

    const { wrapper, domRef } = await createInstance({ filterable: true, filterMethod });

    const inputElem = wrapper.find('input');

    await inputElem.setValue('g');

    domRef.value?.getVisibleItems().forEach((item: NTreeNodeDataWithLevel) => {
      if (!item?.children) {
        expect(item.label).toContain('g');
      }
    });
  });

  test('highlight-method', async () => {
    const highlightMethod: NTreeHighlightMethod = (inputValue: string, node?: NTreeExtendsData) => {
      if (!node) return '';

      if (inputValue) {
        return h('span', {
          innerHTML: (node.label as string).replace(
            new RegExp(inputValue, 'ig'),
            substring => `<span class='kw'>${substring}</span>`,
          ),
        });
      } else {
        return node.stringLabel ?? '';
      }
    };

    const { wrapper } = await createInstance({ filterable: true, highlightMethod });

    const inputElem = wrapper.find('input');

    await inputElem.setValue('g');

    wrapper.findAllComponents(NTreeItem).forEach(item => {
      if (parseInt(item.element.getAttribute('data-children-amount') || '') === 0) {
        expect(item.find('.kw').exists()).toBeTruthy();
      }
    });
  });

  test('filter-input-props', async () => {
    const { wrapper } = await createInstance({
      filterable: true,
      filterInputProps: {
        inputStyle: 'no-border',
      },
    });

    const inputElem = wrapper.findComponent(NInput);

    expect(inputElem.classes()).toContain('n-input--no-border');
  });

  test('filter-input-value & hide-filter-input', async () => {
    const { wrapper } = await createInstance({
      filterable: true,
      filterInputValue: 'g',
      hideFilterInput: true,
    });

    expect(wrapper.findComponent(NInput).exists()).toBeFalsy();

    wrapper.findAllComponents(NTreeItem).forEach(item => {
      if (parseInt(item.element.getAttribute('data-children-amount') || '') === 0) {
        expect(item.text()).toMatch(/g/i);
      }
    });
  });

  test('search-input-placeholder', async () => {
    const { wrapper } = await createInstance({
      filterable: true,
      searchInputPlaceholder: 'PLACEHOLDER',
    });

    expect(wrapper.find('input').element.getAttribute('placeholder')).toBe('PLACEHOLDER');
  });

  test('expand-filtered-tree', async () => {
    const expandFilteredTree = ref(false);
    const filterInputValue = ref('');

    const { wrapper } = await createInstance({
      filterable: true,
      filterInputValue,
      expandFilteredTree,
    });

    await wrapper.find('input').setValue('g');

    wrapper.findAllComponents(NTreeItem).forEach(item => {
      expect(item.element.getAttribute('data-level')).toBe('0');
    });

    expandFilteredTree.value = true;

    await nextTick();

    expect(
      wrapper
        .findAllComponents(NTreeItem)
        .filter(item => item.element.getAttribute('data-level') !== '0').length,
    ).toBeGreaterThan(3);
  });

  test('field-map', async () => {
    const { wrapper } = await createInstance({
      treeData: fieldMapOptions as unknown as NTreeData[],
      fieldMap: {
        value: 'key',
        label: 'text',
        children: 'items',
      },
    });

    wrapper.findAllComponents(NTreeItem).forEach(item => {
      expect(item.text()).not.toBe('');
      expect(item.element.getAttribute('data-uuid')).not.toBe('');
    });
  });

  test('height', async () => {
    const { element } = await createInstance({
      height: 320,
    });

    expect(element.find('.n-scrollbar__wrap').element.getAttribute('style')).toContain(
      'height: 320px',
    );
  });

  test('max-height', async () => {
    const { element } = await createInstance({
      maxHeight: 320,
    });

    expect(element.find('.n-scrollbar__wrap').element.getAttribute('style')).toContain(
      'max-height: 320px',
    );
  });

  test('use-virtual-scroll', async () => {
    const useVirtualScroll = ref(false);

    const { element } = await createInstance({
      useVirtualScroll,
      maxHeight: 300,
    });

    expect(element.find('.n-recycle-scroller__item-wrapper').exists()).toBeFalsy();

    useVirtualScroll.value = true;

    await nextTick();

    expect(element.find('.n-recycle-scroller__item-wrapper').exists()).toBeTruthy();
  });

  test.skip('tooltip-show-after & tooltip-hide-after', async () => {
    // not necessary to test
  });

  test('expand-values', async () => {
    const expandValues = ref<NTreeUuidType[]>(['disciplines', 'navigation']);

    const { domRef } = await createInstance({
      expandValues,
      'onUpdate:expandValues': (values: NTreeUuidType[]) => (expandValues.value = values),
    });

    await nextTick();

    expect(domRef.value?.getVisibleItems().length).toBe(11);
    expect(expandValues.value).toStrictEqual(['guide', 'disciplines', 'navigation']);

    expandValues.value = ['basic', 'form'];

    await nextTick();

    expect(domRef.value?.getVisibleItems().length).toBe(27);
    expect(expandValues.value).toStrictEqual(['component', 'basic', 'form']);
  });

  test('is-default-expand-parent', async () => {
    const expandValues = ref<NTreeUuidType[]>(['disciplines', 'navigation']);

    const { domRef } = await createInstance({
      expandValues,
      isDefaultExpandParent: false,
      'onUpdate:expandValues': (values: NTreeUuidType[]) => (expandValues.value = values),
    });

    expect(domRef.value?.getVisibleItems().length).toBe(3);
    expect(expandValues.value).toStrictEqual(['disciplines', 'navigation']);

    expandValues.value = ['basic', 'form'];

    await nextTick();

    expect(domRef.value?.getVisibleItems().length).toBe(3);
    expect(expandValues.value).toStrictEqual(['basic', 'form']);
  });

  test('fold-icon & expand-icon', async () => {
    const { element, domRef } = await createInstance({
      foldIcon: IconAdd,
      expandIcon: IconReduce,
    });

    await nextTick();

    domRef.value?.setCollapseStatusByValue(['guide'], true);

    await nextTick();

    expect(element.findComponent(IconAdd).exists()).toBeTruthy();
    expect(element.findComponent(IconReduce).exists()).toBeTruthy();
  });

  test('expand-on-click-node', async () => {
    const expandOnClickNode = ref();
    const onExpand = vi.fn();

    const { wrapper } = await createInstance({
      expandOnClickNode,
      onExpand,
    });

    const guideEl = wrapper.findComponent(NTreeItem);

    expect(guideEl.text()).toBe('Guide');

    await guideEl.trigger('click');

    await nextTick();

    expect(onExpand).toHaveBeenCalledOnce();

    expect(wrapper.findAllComponents(NTreeItem).length).toBeGreaterThan(3);

    expandOnClickNode.value = false;

    await nextTick();

    await guideEl.trigger('click');

    expect(wrapper.findAllComponents(NTreeItem).length).toBeGreaterThan(3);

    expandOnClickNode.value = true;

    await nextTick();

    await guideEl.trigger('click');

    expect(onExpand).toHaveBeenCalledTimes(2);

    expect(wrapper.findAllComponents(NTreeItem).length).toEqual(3);
  });

  test('prefix-icon', async () => {
    const { wrapper } = await createInstance({
      prefixIcon: IconCar,
    });

    expect(wrapper.findComponent(IconCar).exists()).toBeTruthy();
  });

  test('check-strictly', async () => {
    const checkStrictly = ref(false);
    const selectedValues = ref<NTreeUuidType[]>([]);

    const { wrapper } = await createInstance({
      checkStrictly,
      selectedValues,
      isDefaultExpandAll: true,
      multiple: true,
      'onUpdate:selectedValues': (values: NTreeUuidType[]) => (selectedValues.value = values),
    });

    const items = wrapper.findAllComponents(NTreeItem);

    const navigation = items.find(item => item.element.getAttribute('data-uuid') === 'navigation');

    const feedback = items.find(item => item.element.getAttribute('data-uuid') === 'feedback');

    expect(navigation?.exists()).toBeTruthy();
    expect(feedback?.exists()).toBeTruthy();

    await feedback?.trigger('click');

    expect(selectedValues.value).toStrictEqual(['feedback']);

    await navigation?.find(`.${treeItemClassHelper.e('checkbox')}`).trigger('click');

    expect(selectedValues.value).toStrictEqual(['feedback', 'side nav', 'top nav']);

    checkStrictly.value = true;

    await nextTick();

    expect(selectedValues.value).toStrictEqual(['feedback', 'side nav', 'top nav']);

    await navigation?.find(`.${treeItemClassHelper.e('checkbox')}`).trigger('click');

    expect(selectedValues.value).toStrictEqual(['feedback', 'side nav', 'top nav', 'navigation']);

    checkStrictly.value = false;

    await nextTick();

    expect(selectedValues.value).toStrictEqual(['feedback', 'side nav', 'top nav']);
  });

  test('multiple', async () => {
    const multiple = ref(false);

    const { wrapper } = await createInstance({
      multiple,
    });

    expect(wrapper.findComponent(NCheckbox).exists()).toBeFalsy();

    multiple.value = true;

    await nextTick();

    expect(wrapper.findComponent(NCheckbox).exists()).toBeTruthy();
  });

  test('multiple-limit', async () => {
    const selectedValues = ref<NTreeUuidType[]>([]);

    const { wrapper } = await createInstance({
      selectedValues,
      isDefaultExpandAll: true,
      multiple: true,
      multipleLimit: 3,
      checkOnClickNode: true,
      'onUpdate:selectedValues': (values: NTreeUuidType[]) => (selectedValues.value = values),
    });

    for (const item of wrapper.findAllComponents(NTreeItem)) {
      await item.trigger('click');
    }

    expect(selectedValues.value.length).toBe(3);
    expect(selectedValues.value).toStrictEqual(['controllability', 'typography', 'icon']);
  });

  test('selected-values', async () => {
    const selectedValues = ref<NTreeUuidType[]>([]);

    const { domRef } = await createInstance({
      selectedValues,
      multiple: true,
    });

    expect(domRef.value?.getSelectedNodes().values.length).toBe(0);

    selectedValues.value = ['feedback', 'icon'];

    await nextTick();

    expect(domRef.value?.getSelectedNodes().values.length).toBe(2);

    selectedValues.value = [];

    await nextTick();

    expect(domRef.value?.getSelectedNodes().values.length).toBe(0);
  });

  test('check-on-click-node', async () => {
    const checkOnClickNode = ref(false);
    const selectedValues = ref<NTreeUuidType[]>([]);
    const onSelect = vi.fn();

    const { wrapper } = await createInstance({
      selectedValues,
      expandOnClickNode: false,
      checkOnClickNode,
      multiple: true,
      isDefaultExpandAll: true,
      'onUpdate:selectedValues': (values: NTreeUuidType[]) => (selectedValues.value = values),
      onSelect,
    });

    const items = wrapper.findAllComponents(NTreeItem);

    const navigation = items.find(item => item.element.getAttribute('data-uuid') === 'navigation');

    const feedback = items.find(item => item.element.getAttribute('data-uuid') === 'feedback');

    await navigation?.trigger('click');

    expect(onSelect).toHaveBeenCalledTimes(0);

    await feedback?.trigger('click');

    expect(onSelect).toHaveBeenCalledOnce();

    expect(selectedValues.value).toStrictEqual(['feedback']);

    checkOnClickNode.value = true;

    await nextTick();

    await navigation?.trigger('click');

    expect(onSelect).toHaveBeenCalledTimes(2);

    await feedback?.trigger('click');

    expect(onSelect).toHaveBeenCalledTimes(3);

    expect(selectedValues.value).toStrictEqual(['side nav', 'top nav']);
  });

  test('check-on-click-leaf', async () => {
    const checkOnClickLeaf = ref(true);
    const selectedValues = ref<NTreeUuidType[]>([]);
    const onSelect = vi.fn();

    const { wrapper } = await createInstance({
      selectedValues,
      expandOnClickNode: false,
      checkOnClickLeaf,
      multiple: true,
      isDefaultExpandAll: true,
      'onUpdate:selectedValues': (values: NTreeUuidType[]) => (selectedValues.value = values),
      onSelect,
    });

    const items = wrapper.findAllComponents(NTreeItem);

    const feedback = items.find(item => item.element.getAttribute('data-uuid') === 'feedback');

    await feedback?.trigger('click');

    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(selectedValues.value).toStrictEqual(['feedback']);

    checkOnClickLeaf.value = false;

    await nextTick();

    await feedback?.trigger('click');

    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(selectedValues.value).toStrictEqual(['feedback']);
  });

  test('stress', async () => {
    const stress = ref(false);

    const { wrapper } = await createInstance({
      stress,
      multiple: true,
      isDefaultExpandAll: true,
      checkOnClickNode: true,
    });

    const items = wrapper.findAllComponents(NTreeItem);

    const feedback = items.find(item => item.element.getAttribute('data-uuid') === 'feedback');

    await feedback?.trigger('click');

    await nextTick();

    expect(feedback?.classes(treeItemClassHelper.is('stress') as string)).toBeFalsy();

    stress.value = true;

    await nextTick();

    expect(feedback?.classes(treeItemClassHelper.is('stress') as string)).toBeTruthy();
  });

  test('empty-text', async () => {
    const { wrapper } = await createInstance({
      filterable: true,
      emptyText: 'EMPTY',
    });

    await wrapper.find('input').setValue('1234');

    expect(wrapper.text()).toBe('EMPTY');
  });

  test('dynamic-load', async () => {
    const dynamicLoad = (node?: NTreeDynamicLoadNode) =>
      new Promise((resolve, reject) => {
        if (!node) return reject();

        return resolve([
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ]);
      });

    const treeData = ref<NTreeData[]>([
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            isLeaf: false,
            children: [],
          },
        ],
      },
    ]);

    const { wrapper } = await createInstance({
      treeData,
      expandValues: ['guide'],
      dynamicLoad,
      'onUpdate:treeData': (val: NTreeData[]) => {
        treeData.value = val;
      },
    });

    const item = wrapper
      .findAllComponents(NTreeItem)
      .find(item => item.element.getAttribute('data-uuid') === 'disciplines');

    await item?.trigger('click');

    await sleep(0);

    expect(treeData.value).toStrictEqual([
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            isLeaf: false,
            children: [
              {
                value: 'consistency',
                label: 'Consistency',
              },
              {
                value: 'feedback',
                label: 'Feedback',
              },
              {
                value: 'efficiency',
                label: 'Efficiency',
              },
              {
                value: 'controllability',
                label: 'Controllability',
              },
            ],
          },
        ],
      },
    ]);
  });

  test('is-default-expand-all', async () => {
    const { domRef } = await createInstance({
      isDefaultExpandAll: true,
    });

    expect(domRef.value?.getVisibleItems().length).toBeGreaterThan(3);
  });

  test('root-class-name & root-style', async () => {
    const { element } = await createInstance({
      rootClassName: 'test',
      rootStyle: { display: 'block' },
    });

    expect(element.classes('test')).toBeTruthy();
    expect(element.element.getAttribute('style')).toContain('display: block');
  });

  test('indent', async () => {
    const { element } = await createInstance({
      isDefaultExpandAll: true,
      indent: 0,
    });

    expect(
      element
        .findAllComponents(NTreeItem)
        .find(curr => curr.element.getAttribute('data-level') === '2')
        ?.element.getAttribute('style'),
    ).toContain('padding-left: 56px');
  });

  test('tooltip', async () => {
    const tooltip = ref(true);

    const { element } = await createInstance({
      tooltip,
    });

    expect(
      element
        .findComponent(NTreeItem)
        .find(`.${treeItemClassHelper.e('content')}`)
        .classes('is-ellipsis'),
    ).toBeTruthy();

    tooltip.value = false;

    await nextTick();

    expect(
      element
        .findComponent(NTreeItem)
        .find(`.${treeItemClassHelper.e('content')}`)
        .classes('is-ellipsis'),
    ).toBeFalsy();
  });

  test('parent-effect-disabled-child', async () => {
    const parentEffectDisabledChild = ref(false);

    const { element, domRef } = await createInstance(
      {
        parentEffectDisabledChild,
        checkOnClickNode: true,
        expandOnClickNode: false,
        isDefaultExpandAll: true,
        multiple: true,
      },
      true,
    );

    const guide = element.findComponent(NTreeItem);

    await guide.trigger('click');

    expect(domRef.value?.getSelectedNodes().values.length).toBe(3);

    parentEffectDisabledChild.value = true;

    await nextTick();

    domRef.value?.clearSelectedValues();

    await guide.trigger('click');

    expect(domRef.value?.getSelectedNodes().values.length).toBe(9);
  });

  test('show-checkbox', async () => {
    const showCheckbox = ref(true);

    const { element } = await createInstance({
      showCheckbox,
      isDefaultExpandAll: true,
      multiple: true,
    });

    expect(element.findComponent(NCheckbox).exists()).toBeTruthy();

    showCheckbox.value = false;

    await nextTick();

    expect(element.findComponent(NCheckbox).exists()).toBeFalsy();
  });

  test('show-radio', async () => {
    const showRadio = ref(false);
    const checkStrictly = ref(false);

    const { element } = await createInstance({
      showRadio,
      checkStrictly,
      isDefaultExpandAll: true,
    });

    expect(element.findComponent(NRadio).exists()).toBeFalsy();

    showRadio.value = true;

    await nextTick();

    const guide = element.findComponent(NTreeItem);

    expect(element.findComponent(NRadio).exists()).toBeTruthy();
    expect(guide.findComponent(NRadio).exists()).toBeFalsy();

    checkStrictly.value = true;

    await nextTick();

    expect(guide.findComponent(NRadio).exists()).toBeTruthy();
  });

  test('draggable', async () => {
    const draggable = ref(false);

    const { element } = await createInstance({
      draggable,
    });

    const guide = element.findComponent(NTreeItem);

    expect(guide.find(`.${treeItemClassHelper.e('draggable-icon')}`).exists()).toBeFalsy();

    draggable.value = true;

    await nextTick();

    const handler = guide.find(`.${treeItemClassHelper.e('draggable-icon')}`);

    await handler.trigger('mousedown');
    await handler.trigger('mousemove');

    expect(
      element.find(`.${treeItemClassHelper.block}.${treeItemClassHelper.is('shadow')}`).exists(),
    ).toBeTruthy();
  });

  test('drag-on-handler', async () => {
    const dragOnHandler = ref(true);

    const { element } = await createInstance({
      draggable: true,
      dragOnHandler,
    });

    const guide = element.findComponent(NTreeItem);

    const handler = guide.find(`.${treeItemClassHelper.e('draggable-icon')}`);

    await handler.trigger('mousedown');
    await handler.trigger('mousemove');

    expect(
      element.find(`.${treeItemClassHelper.block}.${treeItemClassHelper.is('shadow')}`).exists(),
    ).toBeTruthy();

    await handler.trigger('mouseup');

    dragOnHandler.value = false;

    await nextTick();

    await guide.trigger('mousedown');
    await guide.trigger('mousemove');

    expect(
      element.find(`.${treeItemClassHelper.block}.${treeItemClassHelper.is('shadow')}`).exists(),
    ).toBeTruthy();
  });

  test('filter-to-hide-children', async () => {
    const filterToHideChildren = ref(true);

    const { element } = await createInstance({
      filterable: true,
      filterToHideChildren,
    });

    const inputComp = element.findComponent(NInput);

    await inputComp.find('input').setValue('Disciplines');

    expect(element.findAllComponents(NTreeItem).length).toBe(2);

    filterToHideChildren.value = false;

    await nextTick();

    expect(element.findAllComponents(NTreeItem).length).toBe(6);
  });
});
