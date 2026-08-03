import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import HSelect from '../../Select/src/Select';
import HOption from '../../Select/src/Option';
import HTimeSelect from '../src/TimeSelect';
import { createTimeSelectOptions } from '../src/utils/time';

describe('TimeSelect.tsx', () => {
  test('uses Horizon Select and generates fixed options', () => {
    const wrapper = mount(HTimeSelect, {
      props: {
        start: '08:30',
        end: '09:30',
        step: '00:15',
        toBody: false,
      },
    });

    expect(wrapper.findComponent(HSelect).exists()).toBe(true);
    expect(wrapper.findAllComponents(HOption).map(option => option.props('value'))).toEqual([
      '08:30',
      '08:45',
      '09:00',
      '09:15',
    ]);
  });

  test('formats labels without changing values and can include an unaligned end time', () => {
    const options = createTimeSelectOptions({
      start: '11:30',
      end: '12:15',
      step: '00:30',
      format: 'hh:mm A',
      includeEndTime: true,
    });

    expect(options.map(({ value, label }) => ({ value, label }))).toEqual([
      { value: '11:30', label: '11:30 AM' },
      { value: '12:00', label: '12:00 PM' },
      { value: '12:15', label: '12:15 PM' },
    ]);
  });

  test('disables options outside minTime and maxTime while keeping boundaries enabled', () => {
    const options = createTimeSelectOptions({
      start: '08:00',
      end: '10:30',
      step: '00:30',
      format: 'HH:mm',
      includeEndTime: false,
      minTime: '08:30',
      maxTime: '09:30',
    });

    expect(options.map(option => option.disabled)).toEqual([true, false, false, false, true]);
  });

  test.each(['00:00', 'invalid', '24:00'])('returns no options for invalid step %s', step => {
    expect(
      createTimeSelectOptions({
        start: '09:00',
        end: '18:00',
        step,
        format: 'HH:mm',
        includeEndTime: false,
      }),
    ).toEqual([]);
  });

  test('forwards value and interaction events from HSelect', async () => {
    const onUpdate = vi.fn();
    const onChange = vi.fn();
    const onClear = vi.fn();
    const wrapper = mount(HTimeSelect, {
      props: {
        toBody: false,
        'onUpdate:modelValue': onUpdate,
        onChange,
        onClear,
      },
    });
    const select = wrapper.findComponent(HSelect);

    select.vm.$emit('update:modelValue', '09:30');
    select.vm.$emit('change', '09:30', '09:30');
    select.vm.$emit('clear');
    await wrapper.vm.$nextTick();

    expect(onUpdate).toHaveBeenCalledWith('09:30');
    expect(onChange).toHaveBeenCalledWith('09:30');
    expect(onClear).toHaveBeenCalledOnce();
  });
});
