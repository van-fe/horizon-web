import { computed, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import dayjs from '~/utils/useDayJs';
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from '../src/composables/useProps';
import type { DatePickerSlots } from '../src/composables/useSlots';
import DayPanel from '../src/components/DatePanelComponents/DayPanel';
import MonthPanel from '../src/components/DatePanelComponents/MonthPanel';
import YearPanel from '../src/components/DatePanelComponents/YearPanel';
import {
  HDatePickerFormatInjectKey,
  HDatePickerPropsInjectKey,
  HDatePickerSlotsInjectKey,
} from '../src/utils/injectKeys';

function makeParentProps(overrides: Record<string, unknown> = {}) {
  return reactive({
    firstDayOfWeek: 1,
    fixedSixRows: false,
    disabledDate: undefined,
    showDateTooltip: undefined,
    showMonthTooltip: undefined,
    showYearTooltip: undefined,
    showDot: undefined,
    formatDateCellText: undefined,
    ...overrides,
  }) as unknown as DatePickerProps;
}

function mountPanel(
  component: typeof DayPanel | typeof MonthPanel | typeof YearPanel,
  options: {
    pickerType?: 'date' | 'week' | 'month' | 'year';
    parentProps?: DatePickerProps;
    slots?: DatePickerSlots;
    props?: Record<string, unknown>;
  } = {},
) {
  return mount(component, {
    props: {
      panelShowDate: dayjs('2026-02-15'),
      startDate: dayjs('2026-02-10'),
      endDate: dayjs('2026-02-20'),
      previewDate: dayjs('2026-02-18'),
      type: 'single',
      pickerType:
        options.pickerType === 'month' || options.pickerType === 'year'
          ? options.pickerType
          : 'day',
      isRange: true,
      ...options.props,
    },
    global: {
      provide: {
        [HDatePickerPropsInjectKey as symbol]: options.parentProps ?? makeParentProps(),
        [HDatePickerSlotsInjectKey as symbol]: options.slots ?? {},
        [HDatePickerFormatInjectKey as symbol]: computed(() => options.pickerType ?? 'date'),
      },
    },
  });
}

describe('DatePicker date panel grids', () => {
  test('renders day cell scopes, six rows, tooltip/dot/range states and native events', async () => {
    const defaultSlot = vi.fn(({ grid }) => <span class="day-scope">{grid.text}</span>);
    const disabledDate = vi.fn((date: Dayjs) => date.date() === 12);
    const wrapper = mountPanel(DayPanel, {
      parentProps: makeParentProps({
        fixedSixRows: true,
        disabledDate,
        showDateTooltip: (date: Dayjs) => ({ show: date.date() === 10, content: 'date-tip' }),
        showDot: (date: Dayjs, type: 'day' | 'month' | 'year') =>
          type === 'day' && date.date() === 10,
      }),
      slots: { default: defaultSlot } as unknown as DatePickerSlots,
    });
    const cells = wrapper.findAll('.h-date-picker-panel-body__day--item.h-date-picker-panel-body__grid-item');
    expect(cells).toHaveLength(42);
    expect(defaultSlot).toHaveBeenCalled();
    expect(wrapper.findAll('.day-scope')).toHaveLength(42);
    expect(wrapper.find('.has-dot').exists()).toBe(true);
    expect(wrapper.find('.is-range').exists()).toBe(true);

    const disabled = wrapper.find('.is-disabled');
    await disabled.trigger('click');
    await disabled.trigger('mouseenter');
    expect(wrapper.emitted('clickDateCell')).toBeUndefined();

    const enabled = cells.find(cell => !cell.classes().includes('is-disabled'))!;
    await enabled.trigger('mouseenter');
    await enabled.trigger('click');
    await wrapper.find('.h-date-picker-panel-body__day').trigger('mouseleave');
    expect(wrapper.emitted('hoverDateCell')?.at(-1)).toEqual([undefined]);
    expect(wrapper.emitted('clickDateCell')).toHaveLength(1);

    const beforeMonth = cells.find(cell => cell.classes().includes('is-prev'))!;
    const panelUpdatesBefore = wrapper.emitted('update:panelShowDate')?.length ?? 0;
    await beforeMonth.trigger('click');
    expect(wrapper.emitted('update:panelShowDate')).toHaveLength(panelUpdatesBefore + 1);
  });

  test('renders fallback day text and week selection/hover contracts', async () => {
    const wrapper = mountPanel(DayPanel, {
      pickerType: 'week',
      parentProps: makeParentProps({
        firstDayOfWeek: 0,
        formatDateCellText: (type: string, _date: Dayjs, text: string) => `${type}:${text}`,
      }),
      props: {
        isRange: false,
        startDate: dayjs('2026-02-11'),
        previewDate: dayjs('2026-02-17'),
      },
    });
    expect(wrapper.classes()).toContain('is-week-picker');
    expect(wrapper.text()).toContain('day:');
    expect(wrapper.find('.is-week-hover').exists()).toBe(true);
    const active = wrapper.find('.is-start-active');
    expect(active.exists()).toBe(true);
    const normal = wrapper.findAll('.h-date-picker-panel-body__day--item').find(c => !c.classes().includes('is-disabled'))!;
    await normal.trigger('mouseenter');
    await normal.trigger('click');
    expect((wrapper.emitted('hoverDateCell')?.[0]?.[0] as Dayjs).day()).toBe(0);
    expect((wrapper.emitted('clickDateCell')?.[0]?.[0] as Dayjs).day()).toBe(0);

    const emptyWeek = mountPanel(DayPanel, {
      pickerType: 'week',
      parentProps: makeParentProps(),
      props: { isRange: false, startDate: undefined, previewDate: undefined },
    });
    expect(emptyWeek.find('.is-start-active').exists()).toBe(false);
  });

  test('enforces disabledBefore and disabledAfter panel boundaries', async () => {
    const before = mountPanel(DayPanel, {
      props: { disabledBefore: dayjs('2026-02-01'), disabledAfter: undefined },
    });
    const previous = before.find('.is-prev');
    expect(previous.classes()).toContain('is-disabled');
    await previous.trigger('click');
    expect(before.emitted('clickDateCell')).toBeUndefined();

    const after = mountPanel(DayPanel, {
      props: { disabledBefore: undefined, disabledAfter: dayjs('2026-02-01') },
    });
    expect(after.findAll('.is-disabled').length).toBeGreaterThan(0);
  });

  test('covers month cell slot/fallback, range, disabled, hover and exposed click', async () => {
    const monthSlot = vi.fn(({ grid }) => <span class="month-scope">{grid.text}</span>);
    const wrapper = mountPanel(MonthPanel, {
      pickerType: 'month',
      parentProps: makeParentProps({
        disabledDate: (date: Dayjs) => date.month() === 3,
        showMonthTooltip: (date: Dayjs) => ({ show: date.month() === 1, content: 'month-tip' }),
        showDot: (date: Dayjs, type: 'day' | 'month' | 'year') =>
          type === 'month' && date.month() === 1,
      }),
      slots: { month: monthSlot } as unknown as DatePickerSlots,
      props: {
        startDate: dayjs('2026-02-01'),
        endDate: dayjs('2026-05-01'),
      },
    });
    expect(wrapper.findAll('.month-scope')).toHaveLength(12);
    expect(wrapper.find('.has-dot').exists()).toBe(true);
    expect(wrapper.find('.is-range').exists()).toBe(true);
    await wrapper.find('.h-date-picker-panel-body__month--item').trigger('mouseenter');
    await wrapper.find('.h-date-picker-panel-body__month').trigger('mouseleave');
    expect(wrapper.emitted('hoverDateCell')?.at(-1)).toEqual([undefined]);
    const exposed = wrapper.vm as unknown as { clickDateCell: (date: ReturnType<typeof dayjs>) => void };
    exposed.clickDateCell(dayjs('2026-06-01'));
    expect(wrapper.emitted('clickDateCell')).toHaveLength(1);

    const fallback = mountPanel(MonthPanel, {
      pickerType: 'month',
      parentProps: makeParentProps({
        formatDateCellText: (_type: string, _date: Dayjs, text: string) => `M:${text}`,
      }),
      props: { isRange: false, startDate: dayjs('2026-08-01') },
    });
    expect(fallback.text()).toContain('M:');
    expect(fallback.find('.is-active').exists()).toBe(true);
  });

  test('covers year decade boundaries, slot scope, fallback, hover and disabled exposed click', async () => {
    const yearSlot = vi.fn(({ grid }) => <span class="year-scope">{grid.text}</span>);
    const wrapper = mountPanel(YearPanel, {
      pickerType: 'year',
      parentProps: makeParentProps({
        disabledDate: (date: Dayjs) => date.year() === 2024,
        showYearTooltip: (date: Dayjs) => ({ show: date.year() === 2026, content: 'year-tip' }),
        showDot: (date: Dayjs, type: 'day' | 'month' | 'year') =>
          type === 'year' && date.year() === 2026,
      }),
      slots: { year: yearSlot } as unknown as DatePickerSlots,
      props: {
        startDate: dayjs('2025-01-01'),
        endDate: dayjs('2028-01-01'),
      },
    });
    expect(wrapper.findAll('.year-scope')).toHaveLength(12);
    expect(wrapper.find('.is-prev').exists()).toBe(true);
    expect(wrapper.find('.is-next').exists()).toBe(true);
    expect(wrapper.find('.has-dot').exists()).toBe(true);
    await wrapper.find('.h-date-picker-panel-body__year--item').trigger('mouseenter');
    await wrapper.find('.h-date-picker-panel-body__year').trigger('mouseleave');
    expect(wrapper.emitted('hoverDateCell')?.at(-1)).toEqual([undefined]);

    const exposed = wrapper.vm as unknown as {
      clickDateCell: (
        date: ReturnType<typeof dayjs>,
        triggerType?: 'click' | 'input',
        type?: 'start' | 'end',
      ) => void;
    };
    exposed.clickDateCell(dayjs('2024-01-01'));
    expect(wrapper.emitted('clickDateCell')).toBeUndefined();
    exposed.clickDateCell(dayjs('2030-01-01'), 'input', 'end');
    expect(wrapper.emitted('clickDateCell')?.[0]?.slice(1)).toEqual(['input', 'end']);

    const fallback = mountPanel(YearPanel, {
      pickerType: 'year',
      parentProps: makeParentProps({
        formatDateCellText: (_type: string, _date: Dayjs, text: string) => `Y:${text}`,
      }),
      props: { isRange: false, startDate: dayjs('2026-01-01') },
    });
    expect(fallback.text()).toContain('Y:');
    expect(fallback.find('.is-active').exists()).toBe(true);
  });
});
