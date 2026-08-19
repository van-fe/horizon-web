import { describe, expect, test, vi } from 'vitest';
import { createInstance } from './tree-helper';
import HTreeItem from '../src/components/TreeItem';
import type { HTreeUuidType } from '../src/utils/types';
import { nextTick, ref } from 'vue';
import HScrollbar from '../../Scrollbar/src/Scrollbar';

describe('Tree.tsx emits', () => {
  test('emits controlled tree/filter/visible updates and native scroll boundaries', async () => {
    vi.useFakeTimers();
    const filterValue = ref('');
    const onUpdateTreeData = vi.fn();
    const onUpdateVisibleNodes = vi.fn();
    const onUpdateFilterValue = vi.fn((value: string | undefined) => {
      filterValue.value = value ?? '';
    });
    const onReachTop = vi.fn();
    const onReachBottom = vi.fn();
    const { wrapper, domRef } = await createInstance({
      filterable: true,
      filterValue,
      height: 100,
      'onUpdate:treeData': onUpdateTreeData,
      'onUpdate:visibleNodes': onUpdateVisibleNodes,
      'onUpdate:filterValue': onUpdateFilterValue,
      onReachTop,
      onReachBottom,
    });
    await wrapper.get('input').setValue('Guide');
    await nextTick();
    expect(onUpdateFilterValue).toHaveBeenCalledWith('Guide');
    expect(onUpdateVisibleNodes).toHaveBeenCalled();

    domRef.value?.setNodeByValue({ value: 'added', label: 'Added node' });
    await nextTick();
    expect(onUpdateTreeData).toHaveBeenCalled();

    const scrollbar = wrapper.getComponent(HScrollbar);
    const wrap = scrollbar.get<HTMLElement>('.h-scrollbar__wrap');
    scrollbar.get<HTMLElement>('.h-scrollbar__view').element.style.minHeight = '300px';
    scrollbar.getCurrentComponent().exposed?.update();
    await vi.advanceTimersByTimeAsync(400);
    await nextTick();
    expect(wrap.element.scrollHeight).toBeGreaterThan(wrap.element.clientHeight);

    wrap.element.scrollTop = 0;
    await wrap.trigger('scroll');
    expect(onReachTop).toHaveBeenCalled();

    wrap.element.scrollTop = wrap.element.scrollHeight - wrap.element.clientHeight;
    await wrap.trigger('scroll');
    expect(onReachBottom).toHaveBeenCalled();
    vi.useRealTimers();
  });

  test('update:expand-values', async () => {
    const expandValues = ref<HTreeUuidType[]>([]);
    const onUpdateExpandValues = vi.fn();

    const { element } = await createInstance({
      expandValues,
      'onUpdate:expandValues': (val: HTreeUuidType[]) => {
        expandValues.value = val;
        onUpdateExpandValues();
      },
    });

    const guide = element.findComponent(HTreeItem);

    await guide.trigger('click');

    expect(onUpdateExpandValues).toHaveBeenCalledOnce();
    expect(expandValues.value).toStrictEqual(['guide']);

    await guide.trigger('click');

    expect(onUpdateExpandValues).toHaveBeenCalledTimes(2);
    expect(expandValues.value).toStrictEqual([]);
  });

  test('update:selected-values on multiple', async () => {
    const multiple = ref(true);
    const selectedValues = ref<HTreeUuidType[]>([]);
    const onUpdateSelectedValues = vi.fn();

    const { element } = await createInstance({
      selectedValues,
      isDefaultExpandAll: true,
      checkOnClickNode: true,
      expandOnClickNode: false,
      multiple,
      'onUpdate:selectedValues': (val: HTreeUuidType[]) => {
        selectedValues.value = val;
        onUpdateSelectedValues();
      },
    });

    const feedback = element
      .findAllComponents(HTreeItem)
      .find(curr => curr.element.getAttribute('data-uuid') === 'feedback');

    await feedback?.trigger('click');

    expect(onUpdateSelectedValues).toHaveBeenCalledOnce();
    expect(selectedValues.value).toStrictEqual(['feedback']);

    await feedback?.trigger('click');

    expect(onUpdateSelectedValues).toHaveBeenCalledTimes(2);
    expect(selectedValues.value).toStrictEqual([]);

    multiple.value = false;

    await nextTick();

    await feedback?.trigger('click');

    expect(onUpdateSelectedValues).toHaveBeenCalledTimes(3);
    expect(selectedValues.value).toStrictEqual(['feedback']);

    await feedback?.trigger('click');

    expect(onUpdateSelectedValues).toHaveBeenCalledTimes(3);
    expect(selectedValues.value).toStrictEqual(['feedback']);
  });

  test('expand', async () => {
    const onExpand = vi.fn();

    const { element } = await createInstance({
      onExpand,
    });

    const guide = element.findComponent(HTreeItem);

    await guide.trigger('click');

    expect(onExpand).toHaveBeenCalledOnce();

    await guide.trigger('click');

    expect(onExpand).toHaveBeenCalledTimes(2);
  });

  test('select', async () => {
    const onSelect = vi.fn();

    const { element } = await createInstance({
      isDefaultExpandAll: true,
      checkOnClickNode: true,
      expandOnClickNode: false,
      onSelect,
    });

    const feedback = element
      .findAllComponents(HTreeItem)
      .find(curr => curr.element.getAttribute('data-uuid') === 'feedback');

    await feedback?.trigger('click');

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect.mock.calls[0][2].node).toEqual(
      expect.objectContaining({ isLeaf: undefined, label: 'Feedback' }),
    );

    await feedback?.trigger('click');

    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  test('click', async () => {
    const onClick = vi.fn();

    const { element } = await createInstance({
      isDefaultExpandAll: true,
      checkOnClickNode: true,
      expandOnClickNode: false,
      onClick,
    });

    const feedback = element
      .findAllComponents(HTreeItem)
      .find(curr => curr.element.getAttribute('data-uuid') === 'feedback');

    await feedback?.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();

    await feedback?.trigger('click');

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test('contextmenu', async () => {
    const onContextmenu = vi.fn();

    const { element } = await createInstance({
      isDefaultExpandAll: true,
      checkOnClickNode: true,
      expandOnClickNode: false,
      onContextmenu,
    });

    const feedback = element
      .findAllComponents(HTreeItem)
      .find(curr => curr.element.getAttribute('data-uuid') === 'feedback');

    await feedback?.trigger('contextmenu');

    expect(onContextmenu).toHaveBeenCalledOnce();

    await feedback?.trigger('contextmenu');

    expect(onContextmenu).toHaveBeenCalledTimes(2);
  });
});
