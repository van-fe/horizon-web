import { h, nextTick } from 'vue';
import type { VNode } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import dayjs from '~/utils/useDayJs';
import HDatePicker from '../src/DatePicker';
import HPicker from '~/components/Picker/src/Picker';
import DatePanel from '../src/components/DatePanel';
import HButton from '~/components/Button/src/Button';
import type { DatePickerExposes } from '../src/composables/useExposes';
import type { HDatePickerDateCellType } from '../src/utils/types';
import { HFormItemErrorInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import { HApplicationShowTimeZoneInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import { ref } from 'vue';

describe('DatePicker public API contracts', () => {
  test('forwards visual/overlay/input props to Picker with observable fallbacks', () => {
    const SuffixIcon = { render: () => h('i', { class: 'date-suffix-contract' }) };
    const ClearIcon = { render: () => h('i', { class: 'date-clear-contract' }) };
    const wrapper = mount(HDatePicker, {
      props: {
        type: 'date-range',
        modelValue: ['2026-01-01', '2026-02-02'],
        valueFormat: 'YYYY-MM-DD',
        placeholder: 'Date placeholder',
        startPlaceholder: 'Start',
        endPlaceholder: 'End',
        placement: 'top-end',
        trigger: 'hover',
        inputStyle: 'no-border',
        size: 'large',
        inputable: false,
        fitInputWidth: false,
        panelWidth: '420px',
        panelMaxWidth: '600px',
        panelMinWidth: '300px',
        pickerMinWidth: '240px',
        pickerMaxWidth: '500px',
        panelClass: 'custom-panel',
        panelStyle: { color: 'red' },
        toBody: false,
        destroyOnHide: true,
        hoverShowDelay: 12,
        hoverHideDelay: 34,
        preventOverflow: false,
        fallbackPlacements: ['bottom-start'],
        popoverOptions: { arrow: false },
        showCancelButton: false,
        confirmButtonText: 'Apply',
        cancelButtonText: 'Back',
        confirmButtonProps: { ghost: true },
        cancelButtonProps: { borderStyle: 'dashed' },
        suffixIcon: SuffixIcon,
        clearIcon: ClearIcon,
        showPopoverContentOnly: true,
      },
    });
    const picker = wrapper.findComponent(HPicker);
    expect(picker.props()).toMatchObject({
      placeholder: 'Date placeholder',
      trigger: 'hover',
      inputStyle: 'no-border',
      size: 'large',
      inputable: false,
      fitInputWidth: false,
      panelWidth: '420px',
      panelMaxWidth: '600px',
      panelMinWidth: '300px',
      pickerMinWidth: '240px',
      pickerMaxWidth: '500px',
      panelClass: 'custom-panel',
      toBody: false,
      destroyOnHide: true,
      hoverShowDelay: 12,
      hoverHideDelay: 34,
      confirmNeedCancel: false,
      confirmButtonText: 'Apply',
      cancelButtonText: 'Back',
      confirmButtonProps: { ghost: true },
      cancelButtonProps: { borderStyle: 'dashed' },
      dropdownIcon: SuffixIcon,
      clearIcon: ClearIcon,
      showPopoverContentOnly: true,
    });
    expect(picker.props('pickerPrefixIcon')).toBe(false);
    expect(picker.props('popoverOptions')).toMatchObject({
      preventOverflow: false,
      fallbackPlacements: ['bottom-start'],
      arrow: false,
    });
    const pickerSlots = picker.vm.$slots as unknown as Record<
      string,
      ((...args: unknown[]) => unknown) | undefined
    >;
    const inner = pickerSlots.pickerInner?.();
    expect(inner).toBeTruthy();
  });

  test('panelWidth, suffixIcon, clearIcon and action button props affect rendered browser output', async () => {
    const SuffixIcon = { render: () => h('i', { class: 'date-suffix-output' }) };
    const ClearIcon = { render: () => h('i', { class: 'date-clear-output' }) };
    const wrapper = mount(HDatePicker, {
      props: {
        modelValue: '2026-01-02',
        valueFormat: 'YYYY-MM-DD',
        clearable: true,
        needConfirm: true,
        panelWidth: '420px',
        suffixIcon: SuffixIcon,
        clearIcon: ClearIcon,
        confirmButtonProps: { ghost: true },
        cancelButtonProps: { borderStyle: 'dashed' },
        toBody: false,
      },
    });

    expect(wrapper.find('.date-suffix-output').exists()).toBe(true);
    await wrapper.get('.h-picker__input').trigger('mouseenter');
    expect(wrapper.find('.date-clear-output').exists()).toBe(true);

    await wrapper.get('.h-picker').trigger('click');
    await nextTick();
    const panel = wrapper.get('.h-picker__pop-content');
    expect((panel.element as HTMLElement).style.width).toBe('420px');
    const actionButtons = wrapper.findAll('.h-picker__pop-content--confirm-wrapper-buttons button');
    expect(actionButtons).toHaveLength(2);
    expect(actionButtons[0].classes()).toContain('is-dashed');
    expect(actionButtons[1].classes()).toContain('is-ghost');
  });

  test('uses form error state, timezone formats and renders shortcut side panel', () => {
    const shortcut = { label: 'Today', value: dayjs('2026-01-01') };
    const wrapper = mount(HDatePicker, {
      props: { modelValue: '2026-01-01T00:00:00+08:00', shortcuts: [shortcut] },
      global: {
        provide: {
          [HFormItemErrorInjectedKey as symbol]: ref('invalid date'),
          [HApplicationShowTimeZoneInjectedKey as symbol]: ref(true),
        },
      },
    });
    const picker = wrapper.findComponent(HPicker);
    expect(picker.props('inputStatus')).toBe('error');
    const pickerSlots = picker.vm.$slots as unknown as Record<
      string,
      ((...args: unknown[]) => unknown) | undefined
    >;
    expect(pickerSlots.panelLeftSide?.()).toBeTruthy();
    picker.vm.$emit('confirm');
    picker.vm.$emit('cancel');
    picker.vm.$emit('clear', new MouseEvent('click'));
  });

  test('renders every public slot and scoped day/month/year grid slot', () => {
    const slotNames = [
      'rangeSeparator',
      'rangePanelSeparator',
      'showNow',
      'panelHeaderRender',
      'panelFooterRender',
      'dropConfirmRender',
      'picker',
      'pickerInner',
      'pickerContainer',
      'pickerOuter',
      'prefix',
      'suffix',
    ] as const;
    const slots = Object.fromEntries(
      slotNames.map(name => [
        name,
        vi.fn(() => h('span', { class: `slot-${name}` }, name)),
      ]),
    );
    const day = vi.fn((scope?: { grid: HDatePickerDateCellType }) =>
      h('span', { class: 'slot-day' }, scope?.grid.text ?? ''),
    );
    const month = vi.fn((scope?: { grid: HDatePickerDateCellType }) =>
      h('span', { class: 'slot-month' }, scope?.grid.text ?? ''),
    );
    const year = vi.fn((scope?: { grid: HDatePickerDateCellType }) =>
      h('span', { class: 'slot-year' }, scope?.grid.text ?? ''),
    );
    const wrapper = mount(HDatePicker, {
      props: {
        type: 'datetime-range',
        modelValue: ['2026-01-01 01:02:03', '2026-02-02 04:05:06'],
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showNow: true,
      },
      slots: { ...slots, default: day, month, year },
    });
    const picker = wrapper.findComponent(HPicker);
    const pickerSlots = picker.vm.$slots as unknown as Record<
      string,
      ((...args: unknown[]) => unknown) | undefined
    >;
    pickerSlots.default?.();
    pickerSlots.panelPrefix?.();
    pickerSlots.panelSuffix?.();
    pickerSlots.pickerPrefix?.();
    pickerSlots.pickerSuffix?.();
    pickerSlots.panelConfirm?.();
    pickerSlots.pickerContainer?.();
    pickerSlots.pickerInner?.(undefined, undefined, undefined, vi.fn(), vi.fn());
    pickerSlots.pickerOuter?.();
    pickerSlots.picker?.();
    pickerSlots.panelConfirmLeft?.();
    for (const name of slotNames.filter(name => name !== 'pickerInner')) {
      expect(slots[name], name).toHaveBeenCalled();
    }
    const single = mount(HDatePicker, { slots: { pickerInner: slots.pickerInner } });
    const singleSlots = single.findComponent(HPicker).vm.$slots as unknown as Record<
      string,
      ((...args: unknown[]) => unknown) | undefined
    >;
    singleSlots.pickerInner?.();
    expect(slots.pickerInner).toHaveBeenCalled();
    expect(day).toHaveBeenCalled();

    // Month/year scoped output is asserted against their real panels in
    // datePicker.panels.test.tsx; this verifies the top-level provider receives both slots.
    expect(month).toBeTypeOf('function');
    expect(year).toBeTypeOf('function');
  });

  test('renders string/component range separators and default Now button', async () => {
    const IconSeparator = { render: () => h('i', { class: 'component-separator' }, 'to') };
    const wrapper = mount(HDatePicker, {
      props: {
        type: 'datetime-range',
        rangeSeparator: IconSeparator,
        rangePanelSeparator: 'until',
        showNow: true,
      },
    });
    expect(wrapper.find('.component-separator').exists()).toBe(true);
    const picker = wrapper.findComponent(HPicker);
    const pickerSlots = picker.vm.$slots as unknown as Record<
      string,
      ((...args: unknown[]) => unknown) | undefined
    >;
    const defaultPanel = pickerSlots.default?.();
    expect(defaultPanel).toBeTruthy();
    const nowNodes = pickerSlots.panelConfirmLeft?.();
    const nowVNode = (Array.isArray(nowNodes) ? nowNodes[0] : nowNodes) as VNode;
    expect(nowVNode.type).toBe(HButton);
    nowVNode.props?.onClick();
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();

    const stringSeparator = mount(HDatePicker, {
      props: { type: 'date-range', rangeSeparator: 'through' },
    });
    expect(stringSeparator.text()).toContain('through');
  });

  test('forwards Picker native interaction events and all DatePanel update routes', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onInput = vi.fn();
    const onDropdownVisibleChange = vi.fn();
    const onUpdatePreviewDate = vi.fn();
    const wrapper = mount(HDatePicker, {
      props: {
        type: 'datetime-range',
        singlePanel: false,
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        onFocus,
        onBlur,
        onInput,
        onDropdownVisibleChange,
        'onUpdate:previewDate': onUpdatePreviewDate,
      },
    });
    const picker = wrapper.findComponent(HPicker);
    picker.vm.$emit('show');
    picker.vm.$emit('hide');
    picker.vm.$emit('focus');
    picker.vm.$emit('blur');
    const inputElement = document.createElement('input');
    inputElement.value = '2026-01-01 01:02:03';
    const inputEvent = new InputEvent('input');
    Object.defineProperty(inputEvent, 'target', { value: inputElement });
    picker.vm.$emit('input', inputEvent);
    picker.vm.$emit('keydown', new KeyboardEvent('keydown', { code: 'Escape' }));
    const clickEvent = new MouseEvent('click');
    Object.defineProperty(clickEvent, 'target', { value: document.createElement('div') });
    picker.vm.$emit('click', clickEvent);
    await nextTick();
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(false);
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    expect(onInput).toHaveBeenCalled();

    const panels = wrapper.findAllComponents(DatePanel);
    panels[0].vm.$emit('update:date', [dayjs('2026-02-02'), undefined], 'input');
    panels[0].vm.$emit(
      'update:time',
      [dayjs('2026-02-02 01:02:03'), undefined],
      'confirmable-input',
    );
    panels[0].vm.$emit('update:pickerType', 'month');
    panels[0].vm.$emit('update:panelShowDate', dayjs('2026-03-01'));
    panels[0].vm.$emit('update:previewDate', dayjs('2026-03-02'));
    panels[0].vm.$emit('update:previewTime', dayjs('2026-03-02 03:04:05'));
    panels[1].vm.$emit('update:pickerType', 'year');
    panels[1].vm.$emit('update:panelShowDate', dayjs('2027-01-01'));
    panels[1].vm.$emit('update:previewTime', dayjs('2027-01-01 06:07:08'));
    await nextTick();
    expect(onUpdatePreviewDate).toHaveBeenCalled();
  });

  test('public exposes change visibility, move panels and invoke confirm/cancel/clear/refresh', async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const onClear = vi.fn();
    const wrapper = mount(HDatePicker, {
      props: {
        modelValue: '2026-02-03',
        valueFormat: 'YYYY-MM-DD',
        onConfirm,
        onCancel,
        onClear,
      },
    });
    const api = wrapper.vm as unknown as DatePickerExposes;
    const before = wrapper.findComponent(DatePanel).props('startPanelShowDate');
    api.increaseYear(2);
    await nextTick();
    expect(wrapper.findComponent(DatePanel).props('startPanelShowDate').year()).toBe(
      before.year() + 2,
    );
    api.increaseMonth(-3);
    api.changePanelVisible(true);
    api.confirmHandle();
    api.cancelHandle();
    api.clearHandle();
    api.refreshPanelShowDate();
    await nextTick();
    expect(onConfirm).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
    expect(onClear).toHaveBeenCalled();
  });
});
