import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HTimePicker from '../src/TimePicker';
import HPicker from '~/components/Picker/src/Picker';
import TimePanel from '../src/components/TimePanel';
import dayjs from '~/utils/useDayJs';
import type { TimePickerExposes } from '../src/composables/useExposes';
import {
  useTimePickerEmits,
  useTimePickerTimeColumnPanelEmit,
  useTimePickerTimePanelEmit,
} from '../src/composables/useEmits';
import { HFormItemErrorInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import { ref } from 'vue';

const ContractIcon = defineComponent({
  name: 'TimeContractIcon',
  setup: () => () => <svg data-test="time-contract-icon" />,
});

describe('TimePicker public API contracts', () => {
  test('confirmRestTimeColumnWhenClickPrev resets later columns through a real hour click', async () => {
    const onUpdateModelValue = vi.fn();
    const wrapper = mount(TimePanel, {
      props: {
        modelValue: dayjs('2026-01-01 08:09:10'),
        dateType: 'seconds',
        panelVisible: true,
        tooltipShowAfter: 0,
        tooltipHideAfter: 0,
        confirmRestTimeColumnWhenClickPrev: true,
        'onUpdate:modelValue': onUpdateModelValue,
      },
      attachTo: document.body,
    });
    const hourColumn = wrapper.findAll('.h-time-picker__time-column-panel')[0];
    const noon = hourColumn
      .findAll('.h-time-picker__time-cell')
      .find(cell => cell.text() === '12');
    expect(noon).toBeDefined();
    await noon!.trigger('click');
    const [value, trigger] = onUpdateModelValue.mock.calls.at(-1)!;
    expect(value.format('HH:mm:ss')).toBe('12:00:00');
    expect(trigger).toBe('click');
  });

  test('maps picker, popover, range, panel, formatting and sizing props to visible output', async () => {
    const disabledTime = vi.fn(() => false);
    const showTimeTooltip = vi.fn(() => ({ show: true, content: 'time tooltip' }));
    const formatCellText = vi.fn((type: string, value: string) => `${type}:${value}`);
    const formatTriggerText = vi.fn((_value, text: string) => `Trigger ${text}`);
    const previewTime = dayjs('2026-01-01 09:30:45');
    const wrapper = mount(
      () => (
        <HTimePicker
          modelValue={['08:10:20', '18:40:50']}
          type="seconds"
          disabled={false}
          clearable
          trigger="click"
          placement="top-end"
          toBody={false}
          inputStyle="emphasize"
          size="large"
          placeholder="Pick time"
          startPlaceholder="Start contract"
          endPlaceholder="End contract"
          emptyText="No time"
          destroyOnHide
          popoverOptions={{ distance: 19 }}
          fitInputWidth={false}
          hoverShowDelay={3}
          hoverHideDelay={5}
          inputable
          confirmType="blur"
          readonly={false}
          optionListMaxHeight="180"
          tooltipShowAfter={7}
          tooltipHideAfter={9}
          isRange
          singleTrigger={false}
          rangeSeparator="to"
          rangePanelSeparator="until"
          timeStep={15}
          hourStep={2}
          minuteStep={5}
          secondStep={10}
          startAt="02:05:10"
          endAt="21:55:50"
          disabledTime={disabledTime}
          panelStyle={{ backgroundColor: 'rgb(1, 2, 3)' }}
          panelClass="time-contract-panel"
          format="HH时mm分ss秒"
          valueFormat="HH:mm:ss"
          showTimeTooltip={showTimeTooltip}
          prefixIcon={ContractIcon}
          suffixIcon={ContractIcon}
          clearIcon={ContractIcon}
          fallbackPlacements={['bottom-start', 'top-start']}
          preventOverflow
          formatCellText={formatCellText}
          formatTriggerText={formatTriggerText}
          needConfirm
          confirmButtonText="Apply time"
          showCancelButton
          cancelButtonText="Discard time"
          confirmButtonProps={{ type: 'primary' }}
          cancelButtonProps={{ plain: true }}
          inputStatus="error"
          isLinkPanels={false}
          showNow
          width={420}
          panelWidth={390}
          panelMinWidth={300}
          panelMaxWidth={480}
          pickerMinWidth={210}
          pickerMaxWidth={430}
          hoverToDisplayValue
          preserveSuffixIconSpace={false}
          previewTime={previewTime}
          initialValue={null}
          showPopoverContentOnly={false}
        />
      ),
      { attachTo: document.body },
    );
    const picker = wrapper.getComponent(HPicker);

    expect(picker.props()).toMatchObject({
      disabled: false,
      clearable: true,
      trigger: 'click',
      placement: 'top-end',
      inputable: true,
      inputStyle: 'emphasize',
      inputStatus: 'error',
      size: 'large',
      fitInputWidth: false,
      panelWidth: 390,
      panelMinWidth: 300,
      panelMaxWidth: 480,
      pickerMinWidth: 210,
      pickerMaxWidth: 430,
      pickerWidth: 420,
      emptyText: 'No time',
      destroyOnHide: true,
      hoverShowDelay: 3,
      hoverHideDelay: 5,
      preserveSuffixIconSpace: false,
      confirmNeedCancel: true,
      confirmButtonText: 'Apply time',
      cancelButtonText: 'Discard time',
    });
    expect(picker.props('popoverOptions')).toMatchObject({
      distance: 19,
      preventOverflow: true,
      fallbackPlacements: ['bottom-start', 'top-start'],
    });
    expect(picker.props('pickerPrefixIcon')).toBe(ContractIcon);
    expect(picker.props('dropdownIcon')).toBe(ContractIcon);
    expect(picker.props('clearIcon')).toBe(ContractIcon);
    expect(picker.props('confirmButtonProps')).toMatchObject({ type: 'primary' });
    expect(picker.props('cancelButtonProps')).toMatchObject({ plain: true });

    expect(wrapper.get('.h-time-picker__input-wrapper--separator').text()).toBe('to');
    expect(wrapper.findAll<HTMLInputElement>('input.h-picker__input--inner.is-pure-input')[0].attributes('placeholder')).toBe(
      'Start contract',
    );
    expect(wrapper.findAll<HTMLInputElement>('input.h-picker__input--inner.is-pure-input')[1].attributes('placeholder')).toBe(
      'End contract',
    );

    await wrapper.get('.h-picker__input').trigger('click');
    await nextTick();
    expect(wrapper.get('.h-time-picker__panels-wrapper--header-separator').text()).toBe('until');
    expect(wrapper.get('.h-picker__pop-content--wrapper').classes()).toContain(
      'time-contract-panel',
    );
    expect(wrapper.get('.h-picker__pop-content').attributes('style')).toContain(
      'background-color: rgb(1, 2, 3)',
    );
    expect(wrapper.get('.h-picker__pop-content--confirm-wrapper').text()).toContain('Apply time');
    expect(wrapper.get('.h-picker__pop-content--confirm-wrapper').text()).toContain(
      'Discard time',
    );
    expect(wrapper.findAllComponents(TimePanel)).toHaveLength(2);
    for (const panel of wrapper.findAllComponents(TimePanel)) {
      expect(panel.props()).toMatchObject({
        dateType: 'seconds',
        timeStep: 15,
        hourStep: 2,
        minuteStep: 5,
        secondStep: 10,
        startAt: '02:05:10',
        endAt: '21:55:50',
        optionListMaxHeight: '180',
        panelVisible: true,
        tooltipShowAfter: 7,
        tooltipHideAfter: 9,
      });
      expect(panel.props('disabledTime')).toBe(disabledTime);
      expect(panel.props('showTimeTooltip')).toBe(showTimeTooltip);
      expect(panel.props('formatCellText')).toBe(formatCellText);
    }
    expect(wrapper.findAllComponents(TimePanel)[0].props('disabledAfter')).toBeUndefined();
    expect(wrapper.findAllComponents(TimePanel)[1].props('disabledBefore')).toBeUndefined();
    wrapper.unmount();
  });

  test('renders every structural slot and the independent pickerOuter contract', async () => {
    const wrapper = mount(
      () => (
        <HTimePicker toBody={false} needConfirm showNow>
          {{
            panelHeaderRender: () => <header data-test="header">Header</header>,
            panelFooterRender: () => <footer data-test="footer">Footer</footer>,
            dropConfirmRender: () => <div data-test="confirm">Drop confirm</div>,
            picker: () => <span data-test="picker">Picker slot</span>,
          }}
        </HTimePicker>
      ),
      { attachTo: document.body },
    );
    expect(wrapper.get('[data-test="picker"]').text()).toBe('Picker slot');
    await wrapper.get('.h-picker').trigger('click');
    await nextTick();
    expect(wrapper.get('[data-test="header"]').text()).toBe('Header');
    expect(wrapper.get('[data-test="footer"]').text()).toBe('Footer');
    expect(wrapper.get('[data-test="confirm"]').text()).toBe('Drop confirm');
    wrapper.unmount();

    const now = mount(
      () => (
        <HTimePicker toBody={false} needConfirm showNow>
          {{ showNow: () => <button data-test="now">Custom now</button> }}
        </HTimePicker>
      ),
      { attachTo: document.body },
    );
    await now.get('.h-picker__input').trigger('click');
    expect(now.get('[data-test="now"]').text()).toBe('Custom now');
    now.unmount();

    const inner = mount(() => (
      <HTimePicker>
        {{
          pickerInner: () => <span data-test="inner">Inner slot</span>,
          prefix: () => <span data-test="prefix">Prefix</span>,
          suffix: () => <span data-test="suffix">Suffix</span>,
        }}
      </HTimePicker>
    ));
    expect(inner.get('[data-test="inner"]').text()).toBe('Inner slot');
    expect(inner.get('[data-test="prefix"]').text()).toBe('Prefix');
    expect(inner.get('[data-test="suffix"]').text()).toBe('Suffix');
    inner.unmount();

    const container = mount(() => (
      <HTimePicker>
        {{ pickerContainer: () => <span data-test="container">Container slot</span> }}
      </HTimePicker>
    ));
    expect(container.get('[data-test="container"]').text()).toBe('Container slot');
    container.unmount();

    const outer = mount(() => (
      <HTimePicker>
        {{ pickerOuter: () => <button data-test="outer">Whole time picker</button> }}
      </HTimePicker>
    ));
    expect(outer.get('[data-test="outer"]').text()).toBe('Whole time picker');
    outer.unmount();

    const separators = mount(() => (
      <HTimePicker isRange toBody={false}>
        {{
          rangeSeparator: () => <span data-test="range-separator">RANGE</span>,
          rangePanelSeparator: () => <span data-test="panel-separator">PANEL</span>,
        }}
      </HTimePicker>
    ));
    expect(separators.get('[data-test="range-separator"]').text()).toBe('RANGE');
    await separators.get('.h-picker__input').trigger('click');
    expect(separators.get('[data-test="panel-separator"]').text()).toBe('PANEL');
    separators.unmount();
  });

  test('emits native input/focus/blur/click, preview and public pick payloads', async () => {
    const onInput = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onClick = vi.fn();
    const onPick = vi.fn();
    const onChange = vi.fn();
    const onConfirm = vi.fn();
    const onUpdateModelValue = vi.fn();
    const onUpdatePreviewTime = vi.fn();
    const formatTriggerText = vi.fn((_value, text: string) => `Trigger ${text}`);
    const preview = dayjs('2026-01-01 07:08:09');
    const wrapper = mount(HTimePicker, {
      props: {
        type: 'seconds',
        modelValue: '08:09:10',
        valueFormat: 'HH:mm:ss',
        formatTriggerText,
        toBody: false,
        inputable: true,
        needConfirm: true,
        previewTime: preview,
        onInput,
        onFocus,
        onBlur,
        onClick,
        onPick,
        onChange,
        onConfirm,
        'onUpdate:modelValue': onUpdateModelValue,
        'onUpdate:previewTime': onUpdatePreviewTime,
      },
      attachTo: document.body,
    });
    const field = wrapper.get<HTMLInputElement>('.h-picker__input input');

    expect(wrapper.getComponent(HPicker).props('modelValue')).toBe('Trigger 08:09:10');
    expect(formatTriggerText).toHaveBeenCalled();
    field.element.focus();
    await field.trigger('focus');
    await field.setValue('09:10:11');
    const outside = document.createElement('button');
    document.body.append(outside);
    outside.focus();
    field.element.dispatchEvent(
      new FocusEvent('blur', { bubbles: true, relatedTarget: outside }),
    );
    await nextTick();
    await wrapper.get('.h-picker__input').trigger('click');
    expect(onFocus).toHaveBeenCalled();
    expect(onInput.mock.calls[0][0]).toBe('09:10:11');
    expect(onInput.mock.calls[0][1]).toBeInstanceOf(Event);
    expect(onBlur).toHaveBeenCalled();
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    expect(onUpdatePreviewTime).toHaveBeenCalledWith(preview);
    expect(onPick).not.toHaveBeenCalled();

    const picked = dayjs('2026-01-01 12:34:56');
    const exposed = wrapper.getCurrentComponent().exposed as TimePickerExposes;
    exposed.changePanelVisible(true);
    await nextTick();

    const hourColumn = wrapper.findAll('.h-time-picker__time-column-panel')[0];
    const hourCell = hourColumn
      .findAll('.h-time-picker__time-cell')
      .find(cell => cell.text() === '12');
    expect(hourCell).toBeDefined();
    await hourCell!.trigger('click');
    expect(onPick).toHaveBeenCalled();
    const [clickedValue, clickedUnit] = onPick.mock.calls.at(-1)!;
    expect(clickedValue.hour()).toBe(12);
    expect(clickedUnit).toBe('hour');

    exposed.clickTimeCell(picked);
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(onUpdateModelValue).not.toHaveBeenCalled();
    exposed.confirmHandle();
    expect(onUpdateModelValue).toHaveBeenCalledOnce();
    expect(onUpdateModelValue).toHaveBeenCalledWith('12:34:56', 'click');
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('12:34:56');
    expect(onConfirm).toHaveBeenCalledOnce();

    exposed.clickTimeCell(dayjs('2026-01-01 13:45:57'), 'input', 'end');
    exposed.focus();
    exposed.blur();
    wrapper.findAllComponents(TimePanel)[0].vm.$emit(
      'update:previewTime',
      dayjs('2026-01-01 14:00:00'),
    );
    await nextTick();
    expect(onUpdatePreviewTime).toHaveBeenCalled();
    outside.remove();
    wrapper.unmount();
  });

  test('validates all public and panel emit payloads', () => {
    const value = dayjs('2026-01-01 10:20:30');
    expect(useTimePickerEmits['update:modelValue'](value, 'click')).toBe(true);
    expect(useTimePickerEmits['update:modelValue']('10:20', 'input')).toBe(true);
    expect(
      useTimePickerEmits['update:modelValue']([undefined, undefined], 'confirmable-input'),
    ).toBe(true);
    expect(useTimePickerEmits['update:modelValue'](value, 'invalid' as never)).toBe(false);
    expect(useTimePickerEmits['update:previewTime'](value)).toBe(true);
    expect(useTimePickerEmits.change(null)).toBe(true);
    expect(useTimePickerEmits.pick(value, 'second')).toBe(true);
    expect(useTimePickerEmits.input('10:20', new Event('input'))).toBe(true);
    expect(useTimePickerEmits.focus()).toBe(true);
    expect(useTimePickerEmits.blur()).toBe(true);
    expect(useTimePickerEmits.clear()).toBe(true);
    expect(useTimePickerEmits.confirm()).toBe(true);
    expect(useTimePickerEmits.cancel()).toBe(true);
    expect(useTimePickerEmits.dropdownVisibleChange(false)).toBe(true);
    expect(useTimePickerEmits.click(new MouseEvent('click'))).toBe(true);
    expect(useTimePickerTimePanelEmit['update:modelValue'](value, 'click')).toBe(true);
    expect(useTimePickerTimePanelEmit['update:previewTime'](undefined)).toBe(true);
    expect(useTimePickerTimeColumnPanelEmit['update:modelValue'](value, 'input')).toBe(true);
    expect(useTimePickerTimeColumnPanelEmit['update:previewTime'](value)).toBe(true);
  });

  test('uses no-border prefix fallback, injected form errors and picker confirm forwarding', async () => {
    const onConfirm = vi.fn();
    const wrapper = mount(HTimePicker, {
      props: {
        modelValue: '08:00',
        valueFormat: 'HH:mm',
        inputStyle: 'no-border',
        onConfirm,
      },
      global: {
        provide: { [HFormItemErrorInjectedKey as symbol]: ref('Injected error') },
      },
    });
    const picker = wrapper.getComponent(HPicker);
    expect(picker.props('pickerPrefixIcon')).toBe(false);
    expect(picker.props('inputStatus')).toBe('error');
    picker.vm.$emit('confirm');
    await nextTick();
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
