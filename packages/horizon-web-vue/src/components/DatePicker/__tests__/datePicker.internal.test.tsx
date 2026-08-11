import { computed, reactive, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import dayjs from '~/utils/useDayJs';
import type { DatePickerProps } from '../src/composables/useProps';
import DatePanel from '../src/components/DatePanel';
import DatePanelBody from '../src/components/DatePanelBody';
import DatePanelHeader from '../src/components/DatePanelHeader';
import DatePanelShortcuts from '../src/components/DatePanelShortcuts';
import DatetimeTriggerHeader from '../src/components/DatetimeTriggerHeader';
import DayPanel from '../src/components/DatePanelComponents/DayPanel';
import MonthPanel from '../src/components/DatePanelComponents/MonthPanel';
import YearPanel from '../src/components/DatePanelComponents/YearPanel';
import HInput from '~/components/Input/src/Input';
import HTimePicker from '~/components/TimePicker/src/TimePicker';
import {
  HDatePickerDateSwitcherShowFormatMappingMappingInjectKey,
  HDatePickerEmitsInjectKey,
  HDatePickerFormatInjectKey,
  HDatePickerPanelVisibleInjectKey,
  HDatePickerPropsInjectKey,
  HDatePickerSlotsInjectKey,
  HDatePickerValueFormatMappingInjectKey,
} from '../src/utils/injectKeys';

function parentProps(overrides: Record<string, unknown> = {}) {
  return reactive({
    showHeader: true,
    isLinkPanels: false,
    showYearButton: true,
    firstDayOfWeek: 1,
    fixedSixRows: false,
    timeStep: 30,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    timeStartAt: '00:00:00',
    timeEndAt: '23:59:59',
    optionListMaxHeight: 256,
    formatTimeCellText: undefined,
    disabledTime: undefined,
    beginDisabledTime: undefined,
    endDisabledTime: undefined,
    showTimeTooltip: undefined,
    hoverToDisplayValue: false,
    tooltipShowAfter: 0,
    tooltipHideAfter: 0,
    timePickerConfirmType: 'enter',
    shortcuts: [],
    ...overrides,
  }) as unknown as DatePickerProps;
}

function panelProps(overrides: Record<string, unknown> = {}) {
  return {
    startDate: dayjs('2026-02-10'),
    endDate: dayjs('2026-03-20'),
    startTime: dayjs('2026-02-10 01:02:03'),
    endTime: dayjs('2026-03-20 04:05:06'),
    previewDate: dayjs('2026-02-18'),
    previewTime: dayjs('2026-02-18 06:07:08'),
    startPanelShowDate: dayjs('2026-02-01'),
    endPanelShowDate: dayjs('2026-03-01'),
    type: 'single' as const,
    pickerType: 'day' as const,
    isRange: false,
    ...overrides,
  };
}

function globalProvide(
  format = 'date',
  props = parentProps(),
  parentEmit = vi.fn(),
) {
  return {
    [HDatePickerPropsInjectKey as symbol]: props,
    [HDatePickerEmitsInjectKey as symbol]: parentEmit,
    [HDatePickerSlotsInjectKey as symbol]: {},
    [HDatePickerPanelVisibleInjectKey as symbol]: ref(true),
    [HDatePickerFormatInjectKey as symbol]: computed(() => format),
    [HDatePickerValueFormatMappingInjectKey as symbol]: computed(() => ({
      date: 'YYYY-MM-DD',
      time: 'HH:mm:ss',
      datetime: 'YYYY-MM-DD HH:mm:ss',
      year: 'YYYY',
      month: 'YYYY-MM',
      week: 'YYYY-MM-DD',
    })),
    [HDatePickerDateSwitcherShowFormatMappingMappingInjectKey as symbol]: computed(() => ({
      'year-month': ['YYYY', ' ', 'MM'],
      year: ['YYYY'],
      month: ['YYYY'],
      date: ['YYYY', ' ', 'MM'],
    })),
  };
}

describe('DatePicker internal panel contracts', () => {
  test('shortcuts select scalar/function/range values and refresh the panel', async () => {
    const scalar = { label: 'Scalar', value: dayjs('2026-02-10') };
    const dynamic = { label: 'Dynamic', value: () => dayjs('2026-03-11') };
    const range = {
      label: 'Range',
      value: () => [dayjs('2026-04-01'), dayjs('2026-04-30')] as const,
    };
    const parentEmit = vi.fn();
    const refresh = vi.fn();
    const props = parentProps({ shortcuts: [scalar, dynamic] });
    const wrapper = mount(DatePanelShortcuts, {
      props: {
        startDate: dayjs('2026-03-11'),
        isRange: false,
        containTime: true,
        mainPanelDomRef: ref(document.createElement('div')),
        refreshPanelShowDate: refresh,
      },
      global: { provide: globalProvide('date', props, parentEmit) },
    });
    expect(wrapper.findAll('.h-date-picker__shortcuts-item')).toHaveLength(2);
    await wrapper.findAll('.h-date-picker__shortcuts-item')[0].trigger('click');
    expect(parentEmit).toHaveBeenCalledWith('shortcutClick', scalar);
    const scalarEmitted = wrapper.emitted('update:modelValue')?.[0]?.[0] as [ReturnType<typeof dayjs>];
    expect(scalarEmitted[0].format('YYYY-MM-DD')).toBe(
      '2026-02-10',
    );
    expect(refresh).toHaveBeenCalledOnce();

    const rangeWrapper = mount(DatePanelShortcuts, {
      props: {
        startDate: dayjs('2026-04-01'),
        endDate: dayjs('2026-04-30'),
        isRange: true,
      },
      global: {
        provide: globalProvide('date-range', parentProps({ shortcuts: [range] }), parentEmit),
      },
    });
    await rangeWrapper.find('.h-date-picker__shortcuts-item').trigger('click');
    expect(rangeWrapper.emitted('update:modelValue')?.[0]?.[0]).toHaveLength(2);

    const empty = mount(DatePanelShortcuts, {
      props: { isRange: true },
      global: { provide: globalProvide('date-range', parentProps({ shortcuts: [range] })) },
    });
    expect(empty.findAll('.h-date-picker__shortcuts-item')).toHaveLength(1);

    const staticRange = mount(DatePanelShortcuts, {
      props: {
        startDate: dayjs('2026-04-01'),
        endDate: dayjs('2026-04-30'),
        isRange: true,
      },
      global: {
        provide: globalProvide(
          'date-range',
          parentProps({
            shortcuts: [
              {
                label: 'Static range',
                value: [dayjs('2026-04-01'), dayjs('2026-04-30')],
              },
            ],
          }),
        ),
      },
    });
    expect(staticRange.find('.h-date-picker__shortcuts-item').exists()).toBe(true);

    const noShortcuts = mount(DatePanelShortcuts, {
      props: { startDate: dayjs('2026-01-01'), isRange: false },
      global: { provide: globalProvide('date', parentProps({ shortcuts: undefined })) },
    });
    expect(noShortcuts.findAll('.h-date-picker__shortcuts-item')).toHaveLength(0);
    const emptySingle = mount(DatePanelShortcuts, {
      props: { isRange: false },
      global: { provide: globalProvide('date', parentProps({ shortcuts: [scalar] })) },
    });
    expect(emptySingle.findAll('.h-date-picker__shortcuts-item')).toHaveLength(1);

    const validator = (
      DatePanelShortcuts.emits as unknown as Record<string, (value: unknown[]) => boolean>
    )['update:modelValue'];
    expect(validator([dayjs(), undefined])).toBe(true);
    expect(validator([{} as never, undefined])).toBe(true);
    expect(validator([{} as never, {} as never])).toBe(false);
  });

  test('datetime header maps start/end props and forwards time/preview events and expose calls', async () => {
    for (const [format, type] of [
      ['datetime-range', 'start'],
      ['date-minutes-range', 'end'],
      ['date-seconds-range', 'end'],
    ] as const) {
      const wrapper = mount(DatetimeTriggerHeader, {
        props: {
          date: dayjs('2026-02-03'),
          time: dayjs('2026-02-03 04:05:06'),
          previewTime: dayjs('2026-02-03 07:08:09'),
          datePlaceholder: 'Pick date',
          timePlaceholder: 'Pick time',
          type,
        },
        global: { provide: globalProvide(format) },
      });
      expect(wrapper.findComponent(HInput).props('modelValue')).toBe('2026-02-03');
      const timePicker = wrapper.findComponent(HTimePicker);
      expect(timePicker.props('type')).toBe(
        format.includes('minutes') ? 'minutes' : format.includes('seconds') ? 'seconds' : 'time',
      );
      expect(timePicker.props('fitInputWidth')).toBe(
        format === 'date-seconds-range' ? 'fit-content' : true,
      );
      const previewCount = wrapper.emitted('update:previewTime')?.length ?? 0;
      timePicker.vm.$emit('update:modelValue', dayjs('2026-02-03 10:11:12'), 'input');
      const previewTime = dayjs('2026-02-03 12:13:14');
      timePicker.vm.$emit('update:previewTime', previewTime);
      expect(wrapper.emitted('update:time')?.[0]?.[1]).toBe('input');
      expect(wrapper.emitted('update:previewTime')).toHaveLength(previewCount + 1);
      expect(wrapper.emitted('update:previewTime')?.at(-1)).toEqual([previewTime]);
      const exposed = wrapper.vm as unknown as {
        clickTimeCell: (value: ReturnType<typeof dayjs>, trigger?: 'input') => void;
      };
      exposed.clickTimeCell(dayjs('2026-02-03 14:15:16'), 'input');
    }
  });

  test('header switches day/month/year panels, enforces linked bounds and routes range times', async () => {
    const wrapper = mount(DatePanelHeader, {
      props: panelProps({ type: 'single', pickerType: 'day' }),
      global: { provide: globalProvide('date') },
    });
    const items = wrapper.findAll('.h-date-picker-panel-header__switcher--item');
    for (const item of items) await item.trigger('click');
    await wrapper
      .find('.h-date-picker-panel-header__inner--right .h-date-picker-panel-header__switcher--item')
      .trigger('click');
    expect(wrapper.emitted('update:pickerType')).toBeTruthy();
    expect(wrapper.emitted('update:panelShowDate')).toBeTruthy();

    for (const pickerType of ['month', 'year'] as const) {
      const typed = mount(DatePanelHeader, {
        props: panelProps({ pickerType }),
        global: { provide: globalProvide(pickerType) },
      });
      for (const item of typed.findAll('.h-date-picker-panel-header__switcher--item')) {
        await item.trigger('click');
      }
      expect(typed.text()).toContain(pickerType === 'year' ? '2020 - 2029' : '2026');
    }

    for (const type of ['start', 'end'] as const) {
      const ranged = mount(DatePanelHeader, {
        props: panelProps({ type, isRange: true }),
        global: {
          provide: globalProvide(
            'datetime-range',
            parentProps({ isLinkPanels: true, showYearButton: false }),
          ),
        },
      });
      const child = ranged.findComponent(DatetimeTriggerHeader);
      const previewCount = ranged.emitted('update:previewTime')?.length ?? 0;
      child.vm.$emit('update:time', dayjs('2026-02-03 10:00:00'), 'click');
      const previewTime = dayjs('2026-02-03 11:00:00');
      child.vm.$emit('update:previewTime', previewTime);
      expect(ranged.emitted('update:time')?.[0]?.[0]).toHaveLength(2);
      expect(ranged.emitted('update:previewTime')).toHaveLength(previewCount + 1);
      expect(ranged.emitted('update:previewTime')?.at(-1)).toEqual([previewTime]);
      const exposed = ranged.vm as unknown as {
        clickTimeCell: (value: ReturnType<typeof dayjs>) => void;
      };
      exposed.clickTimeCell(dayjs('2026-02-03 12:00:00'));
      for (const item of ranged.findAll('.h-date-picker-panel-header__switcher--item')) {
        await item.trigger('click');
      }
    }

    const singleDatetime = mount(DatePanelHeader, {
      props: panelProps({ type: 'single', isRange: false }),
      global: { provide: globalProvide('datetime-range') },
    });
    singleDatetime
      .findComponent(DatetimeTriggerHeader)
      .vm.$emit('update:time', dayjs('2026-02-03 13:00:00'), 'click');
    const emittedTime = singleDatetime.emitted('update:time')?.[0]?.[0] as [
      ReturnType<typeof dayjs>,
      undefined,
    ];
    expect(emittedTime[1]).toBeUndefined();
  });

  test('body routes year/month/day selection, range accumulation, preview and time updates', async () => {
    const parentEmit = vi.fn();
    for (const pickerType of ['year', 'month', 'day'] as const) {
      const format = pickerType === 'year' ? 'year' : pickerType === 'month' ? 'month' : 'datetime';
      const wrapper = mount(DatePanelBody, {
        props: panelProps({ pickerType, isRange: true, type: 'start' }),
        global: { provide: globalProvide(format, parentProps(), parentEmit) },
      });
      const child =
        pickerType === 'year'
          ? wrapper.findComponent(YearPanel)
          : pickerType === 'month'
            ? wrapper.findComponent(MonthPanel)
            : wrapper.findComponent(DayPanel);
      child.vm.$emit('clickDateCell', dayjs('2027-04-05'), 'click', 'start');
      child.vm.$emit('clickDateCell', dayjs('2027-04-06'), 'input', 'end');
      child.vm.$emit('hoverDateCell', dayjs('2027-04-07'));
      child.vm.$emit('update:panelShowDate', dayjs('2027-04-01'));
      expect(wrapper.emitted('update:date')).toBeTruthy();
      expect(wrapper.emitted('update:previewDate')).toBeTruthy();
      expect(wrapper.emitted('update:panelShowDate')).toBeTruthy();
      if (format === pickerType) expect(parentEmit).toHaveBeenCalledWith('pick', expect.anything());
      const exposed = wrapper.vm as unknown as {
        clickDateCell: (value: ReturnType<typeof dayjs>, trigger?: 'input', type?: 'end') => void;
        clickTimeCell: (value: ReturnType<typeof dayjs>, trigger?: 'input') => void;
      };
      exposed.clickDateCell(dayjs('2028-01-01'), 'input', 'end');
      exposed.clickTimeCell(dayjs('2028-01-01 01:02:03'), 'input');
    }

    for (const pickerType of ['year', 'month'] as const) {
      const wrapper = mount(DatePanelBody, {
        props: panelProps({ pickerType, isRange: false }),
        global: { provide: globalProvide('date') },
      });
      const child = wrapper.findComponent(pickerType === 'year' ? YearPanel : MonthPanel);
      child.vm.$emit('clickDateCell', dayjs('2030-01-01'), 'input');
      expect(wrapper.emitted('update:pickerType')).toBeTruthy();
      expect(wrapper.emitted('update:panelShowDate')).toBeTruthy();
    }

    for (const props of [
      panelProps({ isRange: true, startTime: undefined, endTime: dayjs('2026-03-20') }),
      panelProps({ isRange: true, startTime: dayjs('2026-02-10'), endTime: undefined }),
      panelProps({ isRange: true }),
      panelProps({ isRange: false }),
    ]) {
      const wrapper = mount(DatePanelBody, {
        props,
        global: { provide: globalProvide('datetime') },
      });
      wrapper.findComponent(DayPanel).vm.$emit(
        'clickDateCell',
        dayjs('2029-01-01'),
        'click',
      );
      const exposed = wrapper.vm as unknown as {
        clickTimeCell: (value: ReturnType<typeof dayjs>, trigger?: 'input') => void;
      };
      exposed.clickTimeCell(dayjs('2029-01-01 02:03:04'), 'input');
    }

    for (const props of [
      panelProps({ isRange: true, startDate: undefined, endDate: undefined }),
      panelProps({ isRange: true, startDate: dayjs('2026-01-01'), endDate: undefined }),
      panelProps({ isRange: true, startDate: undefined, endDate: dayjs('2026-02-01') }),
    ]) {
      const wrapper = mount(DatePanelBody, {
        props,
        global: { provide: globalProvide('date-range') },
      });
      wrapper.findComponent(DayPanel).vm.$emit('clickDateCell', dayjs('2031-01-01'), 'click');
      expect(wrapper.emitted('update:date')).toBeTruthy();
    }

    for (const props of [
      panelProps({ isRange: true, startTime: undefined, endTime: undefined }),
      panelProps({ isRange: true, startTime: dayjs('2026-01-01'), endTime: undefined }),
      panelProps({ isRange: true, startTime: undefined, endTime: dayjs('2026-02-01') }),
    ]) {
      const wrapper = mount(DatePanelBody, {
        props,
        global: { provide: globalProvide('datetime') },
      });
      wrapper
        .findComponent({ name: 'TimePanel' })
        .vm.$emit('update:modelValue', dayjs('2031-01-01 01:02:03'));
      expect(wrapper.emitted('update:time')).toBeTruthy();
    }

    const completeRangeTime = mount(DatePanelBody, {
      props: panelProps({ isRange: true }),
      global: { provide: globalProvide('datetime') },
    });
    completeRangeTime
      .findComponent({ name: 'TimePanel' })
      .vm.$emit('update:modelValue', dayjs('2031-02-01 01:02:03'));
    const singleTime = mount(DatePanelBody, {
      props: panelProps({ isRange: false }),
      global: { provide: globalProvide('datetime') },
    });
    singleTime
      .findComponent({ name: 'TimePanel' })
      .vm.$emit('update:modelValue', dayjs('2031-03-01 01:02:03'));
    expect(singleTime.emitted('update:time')).toBeTruthy();
  });

  test('date panel hides header and forwards every child event/exposed route', () => {
    const hidden = mount(DatePanel, {
      props: panelProps(),
      global: { provide: globalProvide('date', parentProps({ showHeader: false })) },
    });
    expect(hidden.findComponent(DatePanelHeader).exists()).toBe(false);
    const hiddenApi = hidden.vm as unknown as {
      clickDateCell: (value: ReturnType<typeof dayjs>) => void;
      clickTimeCell: (value: ReturnType<typeof dayjs>) => void;
    };
    hiddenApi.clickDateCell(dayjs('2032-01-01'));
    hiddenApi.clickTimeCell(dayjs('2032-01-01 01:02:03'));

    const wrapper = mount(DatePanel, {
      props: panelProps({ isRange: true }),
      global: { provide: globalProvide('datetime-range') },
    });
    const header = wrapper.findComponent(DatePanelHeader);
    const body = wrapper.findComponent(DatePanelBody);
    header.vm.$emit('update:pickerType', 'month');
    header.vm.$emit('update:panelShowDate', dayjs('2027-01-01'));
    header.vm.$emit('update:time', [dayjs(), dayjs()], 'click');
    header.vm.$emit('update:previewTime', dayjs());
    body.vm.$emit('update:date', [dayjs(), undefined], 'input');
    body.vm.$emit('update:previewDate', dayjs());
    expect(wrapper.emitted('update:pickerType')).toBeTruthy();
    expect(wrapper.emitted('update:date')).toBeTruthy();
    const exposed = wrapper.vm as unknown as {
      clickDateCell: (value: ReturnType<typeof dayjs>) => void;
      clickTimeCell: (value: ReturnType<typeof dayjs>) => void;
    };
    exposed.clickDateCell(dayjs('2030-01-01'));
    exposed.clickTimeCell(dayjs('2030-01-01 01:02:03'));
  });
});
