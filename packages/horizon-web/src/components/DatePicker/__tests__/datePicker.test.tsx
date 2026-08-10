import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import dayjs from '~/utils/useDayJs';
import HPicker from '~/components/Picker/src/Picker';
import HDatePicker from '../src/DatePicker';
import DatePanel from '../src/components/DatePanel';
import type { DatePickerExposes } from '../src/composables/useExposes';

describe('DatePicker.tsx', () => {
  test('formats controlled values and reacts to external updates', async () => {
    const modelValue = ref('2026-02-03');
    const wrapper = mount(() => (
      <HDatePicker modelValue={modelValue.value} valueFormat="YYYY-MM-DD" format="YYYY/MM/DD" />
    ));
    const picker = wrapper.findComponent(HPicker);

    expect(picker.props('modelValue')).toBe('2026/02/03');

    modelValue.value = '2027-12-31';
    await nextTick();

    expect(picker.props('modelValue')).toBe('2027/12/31');
  });

  test('does not expose a clear affordance while disabled or readonly', async () => {
    const disabled = ref(true);
    const readonly = ref(false);
    const wrapper = mount(() => (
      <HDatePicker
        modelValue="2026-02-03"
        valueFormat="YYYY-MM-DD"
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

  test('clearHandle emits one controlled update, change and clear notification', async () => {
    const onUpdateModelValue = vi.fn();
    const onChange = vi.fn();
    const onClear = vi.fn();
    const wrapper = mount(HDatePicker, {
      props: {
        modelValue: '2026-02-03',
        valueFormat: 'YYYY-MM-DD',
        'onUpdate:modelValue': onUpdateModelValue,
        onChange,
        onClear,
      },
    });

    const datePicker = wrapper.vm as unknown as DatePickerExposes;
    datePicker.clearHandle();
    await nextTick();

    expect(onUpdateModelValue).toHaveBeenCalledOnce();
    expect(onUpdateModelValue).toHaveBeenLastCalledWith(undefined);
    expect(onChange).toHaveBeenLastCalledWith(undefined);
    expect(onClear).toHaveBeenCalledOnce();
  });

  test('sorts a reversed date range before confirming', async () => {
    const onUpdateModelValue = vi.fn();
    const onChange = vi.fn();
    const wrapper = mount(HDatePicker, {
      props: {
        type: 'date-range',
        valueFormat: 'YYYY-MM-DD',
        needConfirm: true,
        'onUpdate:modelValue': onUpdateModelValue,
        onChange,
      },
    });
    const panel = wrapper.findComponent(DatePanel);

    panel.vm.$emit('update:date', [dayjs('2026-12-31'), dayjs('2026-01-01')], 'click');
    await nextTick();
    const datePicker = wrapper.vm as unknown as DatePickerExposes;
    datePicker.confirmHandle();
    await nextTick();

    expect(onUpdateModelValue).toHaveBeenLastCalledWith(['2026-01-01', '2026-12-31']);
    expect(onChange).toHaveBeenLastCalledWith(['2026-01-01', '2026-12-31']);
  });

  test('week values snap to the configured first day of week', async () => {
    const firstDayOfWeek = ref<0 | 1 | 2 | 3 | 4 | 5 | 6>(1);
    const wrapper = mount(() => (
      <HDatePicker
        type="week"
        modelValue="2026-08-05"
        valueFormat="YYYY-MM-DD"
        format="YYYY-MM-DD"
        firstDayOfWeek={firstDayOfWeek.value}
      />
    ));
    const picker = wrapper.findComponent(HPicker);

    expect(picker.props('modelValue')).toBe('2026-08-03');

    firstDayOfWeek.value = 0;
    await nextTick();

    expect(picker.props('modelValue')).toBe('2026-08-02');
  });

  test('cancel and visibility exposes preserve the controlled value', async () => {
    const onCancel = vi.fn();
    const onDropdownVisibleChange = vi.fn();
    const onUpdateModelValue = vi.fn();
    const wrapper = mount(HDatePicker, {
      props: {
        modelValue: '2026-02-03',
        valueFormat: 'YYYY-MM-DD',
        onCancel,
        onDropdownVisibleChange,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    });

    const datePicker = wrapper.vm as unknown as DatePickerExposes;
    datePicker.changePanelVisible(true);
    await nextTick();
    datePicker.cancelHandle();
    await nextTick();

    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(false);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onUpdateModelValue).not.toHaveBeenCalled();
  });
});
