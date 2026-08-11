import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import HSelect from '../../Select/src/Select';
import HOption from '../../Select/src/Option';
import HTimeSelect from '../src/TimeSelect';
import { createTimeSelectOptions } from '../src/utils/time';
import { useTimeSelectEmits } from '../src/composables/useEmits';

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

  test('normalizes defensive payloads and executes every public expose', async () => {
    const wrapper = mount(HTimeSelect, { props: { modelValue: '09:00', clearable: true, toBody: false } });
    const select = wrapper.getComponent(HSelect);

    select.vm.$emit('update:modelValue', 123);
    select.vm.$emit('change', '', null);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([undefined]);
    expect(wrapper.emitted('change')?.at(-1)).toEqual([null]);

    (wrapper.vm as any).focus();
    (wrapper.vm as any).blur();
    (wrapper.vm as any).clear();
    (wrapper.vm as any).changePanelVisible(true);
    await wrapper.vm.$nextTick();
    expect(select.getCurrentComponent().exposed).toBeTruthy();

    expect(useTimeSelectEmits['update:modelValue']('10:00')).toBe(true);
    expect(useTimeSelectEmits['update:modelValue'](10 as never)).toBe(false);
    expect(useTimeSelectEmits.change(undefined)).toBe(true);
    expect(useTimeSelectEmits.change({} as never)).toBe(false);
    expect(useTimeSelectEmits.dropdownVisibleChange(true)).toBe(true);
    expect(useTimeSelectEmits.dropdownVisibleChange('true' as never)).toBe(false);
  });

  test('forwards every presentation prop to the observable Select contract', () => {
    const panelStyle = { width: '320px' };
    const popoverOptions = { distance: 20 };
    const wrapper = mount(HTimeSelect, {
      props: {
        modelValue: '09:00',
        disabled: true,
        editable: true,
        clearable: false,
        size: 'small',
        placeholder: 'Choose time',
        inputStyle: 'no-border',
        inputStatus: 'warning',
        placement: 'top',
        toBody: false,
        fitInputWidth: false,
        optionListMaxHeight: 144,
        emptyText: 'No time',
        panelClass: 'time-panel-contract',
        panelStyle,
        popoverOptions,
      },
    });
    const select = wrapper.getComponent(HSelect);

    expect(select.props()).toMatchObject({
      modelValue: '09:00',
      disabled: true,
      filterable: true,
      clearable: false,
      size: 'small',
      placeholder: 'Choose time',
      inputStatus: 'warning',
      placement: 'top',
      toBody: false,
      fitInputWidth: false,
      optionListMaxHeight: 144,
      emptyText: 'No time',
      externalPanelClass: 'time-panel-contract',
      externalPanelStyle: panelStyle,
      popoverOptions,
    });
    expect(select.props('inputStyle')).toBe('no-border');
  });

  test('renders every panel slot through the real open panel', async () => {
    const wrapper = mount(HTimeSelect, {
      props: { step: 'invalid', toBody: false },
      slots: {
        empty: '<div data-empty>No times</div>',
        panelHeaderRender: '<header data-panel-header>Morning</header>',
        panelFooterRender: '<footer data-panel-footer>Timezone UTC</footer>',
      },
    });

    (wrapper.vm as any).changePanelVisible(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.get('[data-empty]').text()).toBe('No times');
    expect(wrapper.get('[data-panel-header]').text()).toBe('Morning');
    expect(wrapper.get('[data-panel-footer]').text()).toBe('Timezone UTC');
  });

  test('emits focus, blur and visibility from real browser interactions', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onDropdownVisibleChange = vi.fn();
    const wrapper = mount(HTimeSelect, {
      props: { toBody: false, onFocus, onBlur, onDropdownVisibleChange },
      attachTo: document.body,
    });
    const input = wrapper.get('input');

    const outside = document.createElement('button');
    document.body.append(outside);
    (input.element as HTMLInputElement).focus();
    await input.trigger('click');
    outside.focus();
    await wrapper.vm.$nextTick();

    expect(onFocus).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledOnce();
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
    outside.remove();
    wrapper.unmount();
  });
});
