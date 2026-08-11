import dayjs from 'dayjs';
import { describe, expect, test } from 'vitest';
import {
  useDatePickerDatePanelComponentsEmit,
  useDatePickerDatePanelEmit,
  useDatePickerDatePanelTriggerHeaderEmit,
  useDatePickerEmits,
} from '../src/composables/useEmits';

describe('DatePicker emit validators', () => {
  const date = dayjs('2026-08-10');

  test('accepts all documented top-level payload forms', () => {
    for (const value of [date, '2026-08-10', [date, null], undefined, null]) {
      expect(useDatePickerEmits['update:modelValue'](value as never)).toBe(true);
      expect(useDatePickerEmits.change(value as never)).toBe(true);
    }
    expect(useDatePickerEmits['update:modelValue'](42 as never)).toBe(false);
    expect(useDatePickerEmits.change({} as never)).toBe(false);
    expect(useDatePickerEmits['update:previewDate'](date, null)).toBe(true);
    expect(useDatePickerEmits['update:previewDate']({} as never, {} as never)).toBe(false);
    expect(useDatePickerEmits.pick([date, null])).toBe(true);
    expect(useDatePickerEmits.pick(42 as never)).toBe(false);
    expect(useDatePickerEmits.input('2026', new InputEvent('input'))).toBe(true);
    expect(useDatePickerEmits.input(1 as never, {} as never)).toBe(false);
    expect(useDatePickerEmits.dropdownVisibleChange(true)).toBe(true);
    expect(useDatePickerEmits.dropdownVisibleChange('true' as never)).toBe(false);
    expect(useDatePickerEmits.shortcutClick({ text: 'Today', value: date } as never)).toBe(true);
    expect(useDatePickerEmits.shortcutClick(null as never)).toBe(false);
    for (const key of ['focus', 'blur', 'clear', 'confirm', 'cancel'] as const) {
      expect(useDatePickerEmits[key]()).toBe(true);
    }
  });

  test('guards date panel values and trigger sources', () => {
    expect(useDatePickerDatePanelEmit['update:date']([date, null], 'click')).toBe(true);
    expect(useDatePickerDatePanelEmit['update:date']([null, date], 'input')).toBe(true);
    expect(useDatePickerDatePanelEmit['update:date']([{} as never, {} as never], 'click')).toBe(
      false,
    );
    expect(useDatePickerDatePanelEmit['update:date']([date, null], 'invalid' as never)).toBe(false);
    for (const trigger of ['click', 'input', 'confirmable-input'] as const) {
      expect(useDatePickerDatePanelEmit['update:time']([date, null], trigger)).toBe(true);
      expect(useDatePickerDatePanelTriggerHeaderEmit['update:time'](date, trigger)).toBe(true);
    }
    expect(useDatePickerDatePanelEmit['update:time']([date, null], 'invalid' as never)).toBe(false);
    expect(useDatePickerDatePanelEmit['update:time']([{} as never, null], 'click')).toBe(true);
    expect(
      useDatePickerDatePanelTriggerHeaderEmit['update:time']({} as never, 'click'),
    ).toBe(false);
    expect(useDatePickerDatePanelEmit['update:previewDate'](undefined)).toBe(true);
    expect(useDatePickerDatePanelEmit['update:previewDate']({} as never)).toBe(false);
    expect(useDatePickerDatePanelEmit['update:previewTime'](date)).toBe(true);
    expect(useDatePickerDatePanelEmit['update:previewTime'](undefined)).toBe(true);
    expect(useDatePickerDatePanelEmit['update:previewTime'](null as never)).toBe(false);
    expect(useDatePickerDatePanelEmit['update:panelShowDate'](date)).toBe(true);
    expect(useDatePickerDatePanelEmit['update:panelShowDate']('date' as never)).toBe(false);
    expect(useDatePickerDatePanelEmit['update:pickerType']('month')).toBe(true);
  });

  test('validates date cell events and optional range endpoint', () => {
    expect(useDatePickerDatePanelComponentsEmit.clickDateCell(date, 'click')).toBe(true);
    expect(useDatePickerDatePanelComponentsEmit.clickDateCell(date, 'input', 'start')).toBe(true);
    expect(useDatePickerDatePanelComponentsEmit.clickDateCell(date, 'input', 'end')).toBe(true);
    expect(
      useDatePickerDatePanelComponentsEmit.clickDateCell(date, 'invalid' as never, 'start'),
    ).toBe(false);
    expect(
      useDatePickerDatePanelComponentsEmit.clickDateCell({} as never, 'click', 'invalid' as never),
    ).toBe(false);
    expect(useDatePickerDatePanelComponentsEmit.hoverDateCell(undefined)).toBe(true);
    expect(useDatePickerDatePanelComponentsEmit.hoverDateCell(date)).toBe(true);
    expect(useDatePickerDatePanelComponentsEmit.hoverDateCell(null as never)).toBe(false);
    expect(useDatePickerDatePanelComponentsEmit['update:panelShowDate'](date)).toBe(true);
    expect(useDatePickerDatePanelComponentsEmit['update:pickerType']('year')).toBe(true);
  });
});
