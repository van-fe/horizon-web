import { describe, expect, test, vi } from 'vitest';
import {
  clickConfirmCancelBtn,
  closeCascader,
  clickOptionByOrder,
  createInstance,
  openCascader,
} from './cascader-helper';
import CascaderPanel from '~/components/Cascader/src/components/CascaderPanel';
import CascaderItem from '~/components/Cascader/src/components/CascaderItem';
import { NCheckbox } from '~/components/Checkbox';
import { NTag } from '~/components/Tag';

describe('Cascader.tsx emits', () => {
  test('change', async () => {
    const onChange = vi.fn();

    const { wrapper } = createInstance({
      onChange,
    });

    await openCascader(wrapper);

    expect(onChange).toHaveBeenCalledTimes(0);

    await clickOptionByOrder(wrapper);

    expect(onChange).toHaveBeenCalledOnce();

    expect(onChange).toHaveBeenLastCalledWith(
      true,
      expect.objectContaining({ value: 'consistency' }),
    );

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper, 1);

    expect(onChange).toHaveBeenLastCalledWith(true, expect.objectContaining({ value: 'checkbox' }));

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('change on multiple', async () => {
    const onChange = vi.fn();

    const { wrapper } = createInstance({
      onChange,
      multiple: true,
    });

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);

    expect(onChange.mock.calls[0][0]).toBeTruthy();
    expect(onChange.mock.calls[0][1]).toEqual(expect.objectContaining({ value: 'consistency' }));

    await clickOptionByOrder(wrapper, 1);

    expect(onChange.mock.calls[1][0]).toBeTruthy();
    expect(onChange.mock.calls[1][1]).toEqual(expect.objectContaining({ value: 'checkbox' }));

    await clickOptionByOrder(wrapper, 0);

    expect(onChange.mock.calls[2][0]).toBeFalsy();
    expect(onChange.mock.calls[2][1]).toEqual(expect.objectContaining({ value: 'consistency' }));
  });

  test('change on multiple and click on parent node', async () => {
    const onChange = vi.fn();

    const { wrapper, modelValue } = createInstance({
      onChange,
      multiple: true,
    });

    await openCascader(wrapper);

    const panel = wrapper.findComponent(CascaderPanel);

    await panel?.findAllComponents(CascaderItem)?.at(0)?.findComponent(NCheckbox).trigger('click');

    expect(modelValue.value?.length).toEqual(6);
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0][0]).toBeTruthy();
    expect(onChange.mock.calls[0][1]).toEqual(expect.objectContaining({ value: 'guide' }));

    await panel?.findAllComponents(CascaderItem)?.at(1)?.findComponent(NCheckbox).trigger('click');

    expect(modelValue.value?.length).toEqual(46);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toBeTruthy();
    expect(onChange.mock.calls[1][1]).toEqual(expect.objectContaining({ value: 'component' }));

    await panel?.findAllComponents(CascaderItem)?.at(0)?.findComponent(NCheckbox).trigger('click');

    expect(modelValue.value?.length).toEqual(40);
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange.mock.calls[2][0]).toBeFalsy();
    expect(onChange.mock.calls[2][1]).toEqual(expect.objectContaining({ value: 'guide' }));
  });

  test('change on multiple and click on selected tags', async () => {
    const onChange = vi.fn();

    const { wrapper, modelValue, pickerInput } = createInstance({
      onChange,
      multiple: true,
    });

    await openCascader(wrapper);

    const panel = wrapper.findComponent(CascaderPanel);

    await panel?.findAllComponents(CascaderItem)?.at(0)?.findComponent(NCheckbox).trigger('click');

    expect(modelValue.value?.length).toEqual(6);

    await pickerInput.findComponent(NTag).find('.n-tag__close').trigger('click');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ value: 'consistency' }),
    );
  });

  test('modify', async () => {
    const onModify = vi.fn();

    const { wrapper } = createInstance({
      onModify,
    });

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);

    expect(onModify.mock.calls[0][0]).toStrictEqual(['guide', 'disciplines', 'consistency']);
    expect(onModify.mock.calls[0][1]).toBeTruthy();
    expect(onModify.mock.calls[0][2]).toEqual(expect.objectContaining({ value: 'consistency' }));

    await clickOptionByOrder(wrapper, 1);

    expect(onModify.mock.calls[1][0]).toStrictEqual(['component', 'form', 'checkbox']);
    expect(onModify.mock.calls[1][1]).toBeTruthy();
    expect(onModify.mock.calls[1][2]).toEqual(expect.objectContaining({ value: 'checkbox' }));
  });

  test('modify on multiple', async () => {
    const onModify = vi.fn();

    const { wrapper } = createInstance({
      onModify,
      multiple: true,
    });

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);

    expect(onModify.mock.calls[0][0]).toStrictEqual([['guide', 'disciplines', 'consistency']]);
    expect(onModify.mock.calls[0][1]).toBeTruthy();
    expect(onModify.mock.calls[0][2]).toEqual(expect.objectContaining({ value: 'consistency' }));
    expect(onModify).toHaveBeenCalledTimes(1);

    await clickOptionByOrder(wrapper, 1);

    expect(onModify.mock.calls[1][0]).toStrictEqual([
      ['guide', 'disciplines', 'consistency'],
      ['component', 'form', 'checkbox'],
    ]);
    expect(onModify.mock.calls[1][1]).toBeTruthy();
    expect(onModify.mock.calls[1][2]).toEqual(expect.objectContaining({ value: 'checkbox' }));
    expect(onModify).toHaveBeenCalledTimes(2);

    await clickOptionByOrder(wrapper, 0);

    expect(onModify.mock.calls[2][0]).toStrictEqual([['component', 'form', 'checkbox']]);
    expect(onModify.mock.calls[2][1]).toBeFalsy();
    expect(onModify.mock.calls[2][2]).toEqual(expect.objectContaining({ value: 'consistency' }));
    expect(onModify).toHaveBeenCalledTimes(3);
  });

  test('select and deselect', async () => {
    const onSelect = vi.fn();
    const onDeselect = vi.fn();

    const { wrapper } = createInstance({
      onSelect,
      onDeselect,
    });

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);

    expect(onSelect).toHaveBeenLastCalledWith(
      expect.arrayContaining(['guide', 'disciplines', 'consistency']),
      expect.objectContaining({ value: 'consistency' }),
    );

    await clickOptionByOrder(wrapper, 1);

    expect(onSelect).toHaveBeenLastCalledWith(
      expect.arrayContaining(['component', 'form', 'checkbox']),
      expect.objectContaining({ value: 'checkbox' }),
    );

    expect(onDeselect).toHaveBeenCalledTimes(0);
  });

  test('select and deselect on multiple', async () => {
    const onSelect = vi.fn();
    const onDeselect = vi.fn();

    const { wrapper } = createInstance({
      onSelect,
      onDeselect,
      multiple: true,
    });

    await openCascader(wrapper);

    await clickOptionByOrder(wrapper);

    expect(onSelect.mock.calls[0][0]).toStrictEqual(['guide', 'disciplines', 'consistency']);
    expect(onSelect.mock.calls[0][1]).toEqual(expect.objectContaining({ value: 'consistency' }));

    await clickOptionByOrder(wrapper, 1);

    expect(onSelect.mock.calls[1][0]).toStrictEqual(['component', 'form', 'checkbox']);
    expect(onSelect.mock.calls[1][1]).toEqual(expect.objectContaining({ value: 'checkbox' }));

    await clickOptionByOrder(wrapper, 0);

    expect(onDeselect.mock.calls[0][0]).toStrictEqual(['guide', 'disciplines', 'consistency']);
    expect(onDeselect.mock.calls[0][1]).toEqual(expect.objectContaining({ value: 'consistency' }));
  });

  test('confirm & cancel', async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    const { wrapper, modelValue } = createInstance({
      confirm: true,
      onConfirm,
      onCancel,
    });

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper);
    await clickConfirmCancelBtn(wrapper);

    expect(onConfirm.mock.calls[0][0]).toStrictEqual(['guide', 'disciplines', 'consistency']);
    expect(modelValue.value).toStrictEqual(['guide', 'disciplines', 'consistency']);

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper, 1);
    await clickConfirmCancelBtn(wrapper, false);

    expect(onCancel.mock.calls[0][0]).toStrictEqual(['component', 'form', 'checkbox']);
    expect(modelValue.value).toStrictEqual(['guide', 'disciplines', 'consistency']);

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper, 1);
    await clickConfirmCancelBtn(wrapper);

    expect(onConfirm.mock.calls[1][0]).toStrictEqual(['component', 'form', 'checkbox']);
    expect(modelValue.value).toStrictEqual(['component', 'form', 'checkbox']);

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper, 0);
    await clickConfirmCancelBtn(wrapper, false);

    expect(onCancel.mock.calls[1][0]).toStrictEqual(['guide', 'disciplines', 'consistency']);
    expect(modelValue.value).toStrictEqual(['component', 'form', 'checkbox']);
  });

  test('confirm & cancel with multiple', async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    const { wrapper, modelValue } = createInstance({
      confirm: true,
      multiple: true,
      onConfirm,
      onCancel,
    });

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper);
    await clickConfirmCancelBtn(wrapper);

    expect(onConfirm.mock.calls[0][0]).toStrictEqual([['guide', 'disciplines', 'consistency']]);
    expect(modelValue.value).toStrictEqual([['guide', 'disciplines', 'consistency']]);

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper, 1);
    await clickConfirmCancelBtn(wrapper, false);

    expect(onCancel.mock.calls[0][0]).toStrictEqual([
      ['guide', 'disciplines', 'consistency'],
      ['component', 'form', 'checkbox'],
    ]);
    expect(modelValue.value).toStrictEqual([['guide', 'disciplines', 'consistency']]);

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper, 1);
    await clickConfirmCancelBtn(wrapper);

    expect(onConfirm.mock.calls[1][0]).toStrictEqual([
      ['guide', 'disciplines', 'consistency'],
      ['component', 'form', 'checkbox'],
    ]);
    expect(modelValue.value).toStrictEqual([
      ['guide', 'disciplines', 'consistency'],
      ['component', 'form', 'checkbox'],
    ]);

    await openCascader(wrapper);
    await clickOptionByOrder(wrapper, 0);
    await clickConfirmCancelBtn(wrapper, false);

    expect(onCancel.mock.calls[1][0]).toStrictEqual([['component', 'form', 'checkbox']]);
    expect(modelValue.value).toStrictEqual([
      ['guide', 'disciplines', 'consistency'],
      ['component', 'form', 'checkbox'],
    ]);
  });

  test('dropdown-visible-change', async () => {
    const onDropdownVisibleChange = vi.fn();
    const onPanelVisibleChange = vi.fn();

    const { wrapper } = createInstance({
      onDropdownVisibleChange,
      onPanelVisibleChange,
    });

    await openCascader(wrapper);

    expect(onPanelVisibleChange).toHaveBeenLastCalledWith(true);
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(true);

    await closeCascader(wrapper);

    expect(onPanelVisibleChange).toHaveBeenLastCalledWith(false);
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(false);
  });

  test('focus & blur', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const { wrapper } = createInstance({
      onFocus,
      onBlur,
    });

    await openCascader(wrapper);

    expect(onFocus).toHaveBeenCalledOnce();

    await closeCascader(wrapper);

    expect(onBlur).toHaveBeenCalledOnce();
  });
});
