import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import dayjs from '~/utils/useDayJs';
import HPicker from '~/components/Picker/src/Picker';
import HTimePicker from '../src/TimePicker';
import TimePanel from '../src/components/TimePanel';

describe('TimePicker.tsx', () => {
  test('formats controlled values and reacts to external updates', async () => {
    const modelValue = ref('08:05:09');
    const wrapper = mount(() => (
      <HTimePicker
        type="seconds"
        modelValue={modelValue.value}
        valueFormat="HH:mm:ss"
        format="HH时mm分ss秒"
      />
    ));
    const picker = wrapper.findComponent(HPicker);

    expect(picker.props('modelValue')).toBe('08时05分09秒');

    modelValue.value = '23:59:58';
    await nextTick();

    expect(picker.props('modelValue')).toBe('23时59分58秒');
  });

  test('does not expose a clear affordance while disabled or readonly', async () => {
    const disabled = ref(true);
    const readonly = ref(false);
    const wrapper = mount(() => (
      <HTimePicker
        modelValue="08:05"
        valueFormat="HH:mm"
        clearable
        disabled={disabled.value}
        readonly={readonly.value}
      />
    ));
    const picker = wrapper.findComponent(HPicker);

    expect(picker.props('disabled')).toBe(true);
    expect(picker.props('clearable')).toBe(false);

    disabled.value = false;
    readonly.value = true;
    await nextTick();

    expect(picker.props('disabled')).toBe(false);
    expect(picker.props('readonly')).toBe(true);
    expect(picker.props('clearable')).toBe(false);
  });

  test('clearHandle emits update trigger metadata, change, confirm and clear', async () => {
    const onUpdateModelValue = vi.fn();
    const onChange = vi.fn();
    const onConfirm = vi.fn();
    const onClear = vi.fn();
    const wrapper = mount(HTimePicker, {
      props: {
        modelValue: '08:05',
        valueFormat: 'HH:mm',
        'onUpdate:modelValue': onUpdateModelValue,
        onChange,
        onConfirm,
        onClear,
      },
    });

    (wrapper.vm as any).clearHandle();
    await nextTick();

    expect(onUpdateModelValue).toHaveBeenLastCalledWith(undefined, 'click');
    expect(onChange).toHaveBeenLastCalledWith(undefined);
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onClear).toHaveBeenCalledOnce();
  });

  test('sorts a reversed time range before confirming', async () => {
    const onUpdateModelValue = vi.fn();
    const onChange = vi.fn();
    const wrapper = mount(HTimePicker, {
      props: {
        isRange: true,
        type: 'seconds',
        valueFormat: 'HH:mm:ss',
        needConfirm: true,
        'onUpdate:modelValue': onUpdateModelValue,
        onChange,
      },
    });
    const panels = wrapper.findAllComponents(TimePanel);

    panels[0].vm.$emit('update:modelValue', dayjs('2026-01-01 18:30:00'), 'click');
    panels[1].vm.$emit('update:modelValue', dayjs('2026-01-01 08:15:00'), 'click');
    await nextTick();
    (wrapper.vm as any).confirmHandle();
    await nextTick();

    expect(onUpdateModelValue).toHaveBeenLastCalledWith(['08:15:00', '18:30:00'], 'click');
    expect(onChange).toHaveBeenLastCalledWith(['08:15:00', '18:30:00']);
  });

  test(
    'single-trigger range preserves incomplete values without displaying undefined',
    () => {
      const wrapper = mount(HTimePicker, {
        props: {
          isRange: true,
          singleTrigger: true,
          modelValue: ['08:05', undefined],
          valueFormat: 'HH:mm',
        },
      });

      expect(wrapper.findComponent(HPicker).props('modelValue')).toBe('08:05 - ');
    },
  );

  test('cancel and visibility exposes preserve the controlled value', async () => {
    const onCancel = vi.fn();
    const onDropdownVisibleChange = vi.fn();
    const onUpdateModelValue = vi.fn();
    const wrapper = mount(HTimePicker, {
      props: {
        modelValue: '08:05',
        valueFormat: 'HH:mm',
        onCancel,
        onDropdownVisibleChange,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    });

    (wrapper.vm as any).changePanelVisible(true);
    await nextTick();
    (wrapper.vm as any).cancelHandle();
    await nextTick();

    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(false);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onUpdateModelValue).not.toHaveBeenCalled();
  });
});
