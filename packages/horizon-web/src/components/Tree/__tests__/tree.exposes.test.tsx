import { describe, expect, test, vi } from 'vitest';
import { createInstance } from './tree-helper';
import HTreeItem from '../src/components/TreeItem';
import type { HTreeUuidType } from '../src/utils/types';
import { nextTick, ref } from 'vue';
import options from './options.json';
import resetOptions from './modifiedOptions/reset-options.json';
import addChildrenOptions from './modifiedOptions/add-children-options.json';
import deletedOptions from './modifiedOptions/deleted-options.json';
import cloneDeep from 'lodash/cloneDeep';

describe('Tree.tsx exposes', () => {
  test('get-selected-nodes & get-part-selected-nodes & get-un-selected-nodes', async () => {
    const selectedValues = ref<HTreeUuidType[]>([]);

    const { domRef } = await createInstance({
      multiple: true,
      selectedValues,
    });

    expect(domRef.value?.getSelectedNodes().values.length).toBe(0);
    expect(domRef.value?.getPartSelectedNodes().values.length).toBe(0);
    expect(domRef.value?.getUnSelectedNodes().values.length).toBe(60);

    selectedValues.value = ['side nav'];

    await nextTick();

    expect(domRef.value?.getSelectedNodes().values).toStrictEqual(selectedValues.value);
    expect(domRef.value?.getPartSelectedNodes().values).toStrictEqual(['guide', 'navigation']);
    expect(domRef.value?.getUnSelectedNodes().values.length).toBe(57);

    selectedValues.value = ['side nav', 'top nav'];

    await nextTick();

    expect(domRef.value?.getSelectedNodes().values).toStrictEqual([
      ...selectedValues.value,
      'navigation',
    ]);
    expect(domRef.value?.getPartSelectedNodes().values).toStrictEqual(['guide']);
    expect(domRef.value?.getUnSelectedNodes().values.length).toBe(56);
  });

  test('set-selected-status', async () => {
    const selectedValues = ref<HTreeUuidType[]>([]);
    const onUpdate = vi.fn();

    const { domRef } = await createInstance({
      multiple: true,
      selectedValues,
      'onUpdate:selectedValues': (val: HTreeUuidType[]) => {
        selectedValues.value = val;
        onUpdate();
      },
    });

    domRef.value?.setSelectedStatus(['top nav'], true);

    await nextTick();

    expect(selectedValues.value).toStrictEqual(['top nav']);
    expect(onUpdate).toHaveBeenCalledOnce();

    domRef.value?.setSelectedStatus(['top nav', 'side nav'], true);

    await nextTick();

    expect(selectedValues.value).toStrictEqual(['top nav', 'side nav']);
    expect(onUpdate).toHaveBeenCalledTimes(2);

    domRef.value?.setSelectedStatus(['top nav', 'side nav'], false);

    await nextTick();

    expect(selectedValues.value).toStrictEqual([]);
    expect(onUpdate).toHaveBeenCalledTimes(3);
  });

  test('clear-selected-values', async () => {
    const selectedValues = ref<HTreeUuidType[]>(['top nav', 'side nav']);
    const onUpdate = vi.fn();

    const { domRef } = await createInstance({
      multiple: true,
      selectedValues,
      'onUpdate:selectedValues': (val: HTreeUuidType[]) => {
        selectedValues.value = val;
        onUpdate();
      },
    });

    expect(onUpdate).toHaveBeenCalledTimes(0);

    domRef.value?.clearSelectedValues();

    await nextTick();

    expect(selectedValues.value).toStrictEqual([]);
    expect(onUpdate).toHaveBeenCalledOnce();
  });

  test('get-expand-nodes & set-collapse-status-by-value', async () => {
    const expandValues = ref<HTreeUuidType[]>([]);
    const onExpand = vi.fn();

    const { domRef, element } = await createInstance({
      expandValues,
      'onUpdate:expandValues': (val: HTreeUuidType[]) => (expandValues.value = val),
      onExpand,
    });

    expect(
      element
        .findAllComponents(HTreeItem)
        .find(curr => curr.element.getAttribute('data-uuid') === 'top nav')
        ?.exists(),
    ).toBeFalsy();

    expect(domRef.value?.getExpandNodes().values.length).toBe(0);

    expandValues.value = ['guide'];

    await nextTick();

    expect(domRef.value?.getExpandNodes().values).toStrictEqual(expandValues.value);

    expandValues.value = ['side nav', 'top nav'];

    await nextTick();

    expect(domRef.value?.getSelectedNodes().values).toStrictEqual([]);
    expect(onExpand).toHaveBeenCalledTimes(0);

    domRef.value?.setCollapseStatusByValue(['navigation'], true);
    expect(
      element
        .findAllComponents(HTreeItem)
        .find(curr => curr.element.getAttribute('data-uuid') === 'top nav')
        ?.exists(),
    ).toBeTruthy();
  });

  test('get-expand-nodes & set-collapse-status-by-value to leaf node', async () => {
    const { domRef } = await createInstance();

    expect(domRef.value?.getExpandNodes().values.length).toBe(0);

    domRef.value?.setCollapseStatusByValue(['feedback'], true);

    await nextTick();

    expect(domRef.value?.getExpandNodes().values).toStrictEqual(['guide', 'disciplines']);
  });

  test('set-all-collapse-status', async () => {
    const expandValues = ref<HTreeUuidType[]>([]);

    const { domRef, element } = await createInstance({
      expandValues,
      'onUpdate:expandValues': (val: HTreeUuidType[]) => (expandValues.value = val),
    });

    domRef.value?.setAllCollapseStatus(true);

    await nextTick();

    expect(
      element
        .findAllComponents(HTreeItem)
        .find(curr => curr.element.getAttribute('data-uuid') === 'top nav')
        ?.exists(),
    ).toBeTruthy();
    expect(domRef.value?.getExpandNodes().values).toContain('guide');
    expect(domRef.value?.getExpandNodes().values).toContain('navigation');
    expect(domRef.value?.getExpandNodes().values).toContain('component');

    domRef.value?.setAllCollapseStatus(false);
    await nextTick();

    expect(domRef.value?.getExpandNodes().values).toStrictEqual([]);
  });

  test('get-node-by-values', async () => {
    const { domRef } = await createInstance();

    expect(domRef.value?.getNodeByValues(['feedback']).feedback.value).toBe('feedback');
    expect(domRef.value?.getNodeByValues(['feedback']).feedback.node.label).toBe('Feedback');
  });

  test('set-node-by-value', async () => {
    const treeData = cloneDeep(options);

    const { domRef } = await createInstance({
      treeData,
    });

    const newNode = {
      value: 1,
      label: '1',
    };

    domRef.value?.setNodeByValue(newNode, 'feedback');

    await nextTick();

    expect(treeData).toStrictEqual(resetOptions);

    domRef.value?.setNodeByValue(newNode);

    expect(treeData).toStrictEqual([...resetOptions, newNode]);
  });

  test('add-node-children-by-value', async () => {
    const treeData = cloneDeep(options);

    const { domRef } = await createInstance({
      treeData,
    });

    const childrenNodes = [
      {
        value: 1,
        label: '1',
      },
    ];

    domRef.value?.addNodeChildrenByValue(childrenNodes, 'feedback');

    await nextTick();

    expect(treeData).toStrictEqual(addChildrenOptions);
  });

  test('del-node-by-value', async () => {
    const treeData = cloneDeep(options);

    const { domRef } = await createInstance({
      treeData,
    });

    domRef.value?.delNodeByValue('feedback');

    await nextTick();

    expect(treeData).toStrictEqual(deletedOptions);
  });
});
