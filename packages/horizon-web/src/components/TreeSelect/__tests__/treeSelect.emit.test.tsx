import { describe, expect, test, vi } from 'vitest';
import { TreeSelectHelper } from './treeSelectHelper';
import HTreeItem from '~/components/Tree/src/components/TreeItem';
import type { HTreeUuidType } from '~/components/Tree/src/utils/types';
import { ref } from 'vue';

describe('TreeSelect.tsx emits', () => {
  test('update:expand-values', async () => {
    const expandValues = ref<HTreeUuidType[]>([]);
    const onUpdateExpandValues = vi.fn();

    const instance = new TreeSelectHelper({
      expandValues,
      'onUpdate:expandValues': (val: HTreeUuidType[]) => {
        expandValues.value = val;
        onUpdateExpandValues();
      },
    });

    await instance.open(false);

    await instance.clickOption('guide');

    expect(onUpdateExpandValues).toHaveBeenCalledOnce();
    expect(expandValues.value).toStrictEqual(['guide']);

    await instance.clickOption('guide');

    expect(onUpdateExpandValues).toHaveBeenCalledTimes(2);
    expect(expandValues.value).toStrictEqual([]);
  });

  test('expand', async () => {
    const onExpand = vi.fn();

    const instance = new TreeSelectHelper({
      onExpand,
    });

    await instance.open(false);

    await instance.clickOption('guide');

    expect(onExpand).toHaveBeenCalledOnce();

    await instance.clickOption('guide');

    expect(onExpand).toHaveBeenCalledTimes(2);
  });

  test('select', async () => {
    const onSelect = vi.fn();

    const instance = new TreeSelectHelper({
      checkOnClickNode: true,
      expandOnClickNode: false,
      onSelect,
    });

    await instance.open(true);

    await instance.clickOption('feedback');

    expect(onSelect).toHaveBeenCalledOnce();

    await instance.clickOption('feedback');

    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  test('click', async () => {
    const onClick = vi.fn();

    const instance = new TreeSelectHelper({
      checkOnClickNode: true,
      expandOnClickNode: false,
      onClick,
    });

    await instance.open(true);

    await instance.clickOption('feedback');

    expect(onClick).toHaveBeenCalledOnce();

    await instance.clickOption('feedback');

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test('contextmenu', async () => {
    const onContextmenu = vi.fn();

    const instance = new TreeSelectHelper({
      checkOnClickNode: true,
      expandOnClickNode: false,
      onContextmenu,
    });

    await instance.open(true);

    const feedback = instance.tree
      ?.findAllComponents(HTreeItem)
      .find(curr => curr.element.getAttribute('data-uuid') === 'feedback');

    await feedback?.trigger('contextmenu');

    expect(onContextmenu).toHaveBeenCalledOnce();

    await feedback?.trigger('contextmenu');

    expect(onContextmenu).toHaveBeenCalledTimes(2);
  });

  test('focus & blur', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const instance = new TreeSelectHelper({
      onFocus,
      onBlur,
    });

    await instance.mount(false);

    await instance.element?.trigger('click');

    expect(onFocus).toHaveBeenCalledOnce();

    await instance.outer?.trigger('mousedown');

    expect(onBlur).toHaveBeenCalledOnce();
  });

  test('change', async () => {
    const onChange = vi.fn();

    const instance = new TreeSelectHelper({
      onChange,
    });

    await instance.open(true);

    await instance.clickOption('feedback');

    expect(onChange).toHaveBeenCalledOnce();
    expect(instance.modelValue.value).toBe('feedback');
    expect(onChange).toHaveBeenCalledWith('feedback');

    await instance.clickOption('select');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(instance.modelValue.value).toBe('select');
    expect(onChange).toHaveBeenLastCalledWith('select');
  });

  test('change on multiple', async () => {
    const onChange = vi.fn();

    const instance = new TreeSelectHelper({
      multiple: true,
      onChange,
    });

    await instance.open(true);

    await instance.clickOption('feedback');

    expect(onChange).toHaveBeenCalledOnce();
    expect(instance.modelValue.value).toStrictEqual(['feedback']);
    expect(onChange).toHaveBeenCalledWith(['feedback']);

    await instance.clickOption('select');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(instance.modelValue.value).toStrictEqual(['feedback', 'select']);
    expect(onChange).toHaveBeenLastCalledWith(['feedback', 'select']);
  });
});
