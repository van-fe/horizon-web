import { h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import dayjs from '~/utils/useDayJs';
import HCalendar from '../src/Calendar';
import type { HCalendarPinFlag } from '../src/utils/types';
import HTooltip from '~/components/Tooltip/src/Tooltip';

function renderTooltipContents(wrapper: ReturnType<typeof mount>) {
  for (const tooltip of wrapper.findAllComponents(HTooltip)) {
    const slots = tooltip.vm.$slots as unknown as Record<
      string,
      ((...args: unknown[]) => unknown) | undefined
    >;
    slots.content?.();
  }
}

describe('Calendar day/week public contracts', () => {
  const flags: HCalendarPinFlag[] = [
    {
      title: 'Clickable cross-day',
      startAt: '2026-02-02 23:00',
      endAt: '2026-02-03 02:00',
      clickable: true,
      tooltip: true,
      type: 'warning',
    },
    {
      title: 'Adjacent',
      startAt: '2026-02-03 02:00',
      endAt: '2026-02-03 04:00',
      tooltip: 'Details',
    },
    {
      startAt: '2026-02-03 05:00',
      endAt: '2026-02-03 06:00',
      clickable: false,
    },
  ];

  test('day mode renders time formats, flags, disabled hours and scoped slots', async () => {
    const onPinFlagClick = vi.fn();
    const dayHeader = vi.fn((date: string, rawDate: ReturnType<typeof dayjs>, isToday: boolean) =>
      h('span', { class: 'day-header-scope' }, `${date}:${rawDate.date()}:${isToday}`),
    );
    const timezone = vi.fn(
      (offset: number, date: string, rawDate: ReturnType<typeof dayjs>) =>
        h('span', { class: 'timezone-scope' }, `${offset}:${date}:${rawDate.date()}`),
    );
    const disableHours = vi.fn(() => [
      [dayjs('2026-02-03 08:00'), dayjs('2026-02-03 10:00')],
      [dayjs('2026-02-03 09:00'), dayjs('2026-02-03 11:00')],
    ] as [ReturnType<typeof dayjs>, ReturnType<typeof dayjs>][]);
    const wrapper = mount(HCalendar, {
      props: {
        mode: 'day',
        modeSwitchableList: ['day'],
        modelValue: '2026-02-03',
        pinFlags: flags,
        hourFormat: '12',
        pinFlagsShowTime: true,
        showSpacingBetweenFlags: true,
        currentTimeLine: false,
        disableHours,
        onPinFlagClick,
      },
      slots: { dayHeader, timezone },
    });
    expect(wrapper.find('.day-header-scope').exists()).toBe(true);
    expect(wrapper.find('.timezone-scope').exists()).toBe(true);
    expect(dayHeader).toHaveBeenCalledWith(expect.any(String), expect.anything(), false);
    expect(timezone).toHaveBeenCalled();
    expect(wrapper.text()).toContain('1 AM');
    expect(wrapper.text()).toContain('1 PM');
    expect(wrapper.findAll('.h-calendar-day__flag')).toHaveLength(3);
    expect(wrapper.text()).toContain('02/02 23:00～02/03 02:00');
    expect(wrapper.text()).toContain('02:00～04:00');
    expect(wrapper.findAll('.h-calendar-day__body--disabled-hours')).toHaveLength(1);
    renderTooltipContents(wrapper);

    const renderedFlags = wrapper.findAll('.h-calendar-day__flag');
    await renderedFlags[0].trigger('click');
    await renderedFlags[2].trigger('click');
    expect(onPinFlagClick).toHaveBeenCalledOnce();
    expect(onPinFlagClick).toHaveBeenLastCalledWith(expect.objectContaining({ title: 'Clickable cross-day' }));
    await wrapper.find('.h-calendar-day__body--disabled-hours').trigger('mousedown');
    await wrapper.find('.h-calendar-day__body--disabled-hours').trigger('mousemove');
    await wrapper.find('.h-calendar-day__body--date-grid-column').trigger('mousedown');
  });

  test('day mode renders default timezone/header, 24-hour labels and current time line', () => {
    const oldOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = () => 480;
    const today = dayjs().format('YYYY-MM-DD');
    const todayFlags: HCalendarPinFlag[] = [
      {
        title: 'No spacing',
        startAt: dayjs().startOf('day').add(1, 'hour'),
        endAt: dayjs().startOf('day').add(2, 'hour'),
        tooltip: true,
      },
      {
        startAt: dayjs().startOf('day').add(2, 'hour'),
        endAt: dayjs().startOf('day').add(3, 'hour'),
      },
    ];
    const wrapper = mount(HCalendar, {
      props: {
        mode: 'day',
        modeSwitchableList: ['day'],
        modelValue: today,
        hourFormat: '24',
        currentTimeLine: true,
        pinFlags: todayFlags,
        pinFlagsShowTime: false,
        showSpacingBetweenFlags: false,
      },
    });
    expect(wrapper.find('.h-calendar-day__header--time-zone').text()).toContain('GMT');
    expect(wrapper.text()).toContain('1');
    expect(wrapper.find('.h-calendar-day__body--current-time').exists()).toBe(true);
    expect(wrapper.find('.h-calendar-day__body--current-time-label').exists()).toBe(true);
    renderTooltipContents(wrapper);
    Date.prototype.getTimezoneOffset = oldOffset;
  });

  test('week mode renders headers, flags, disabled hours, clicks and current-time split', async () => {
    const onPinFlagClick = vi.fn();
    const weekDayHeader = vi.fn(
      (date: string, rawDate: ReturnType<typeof dayjs>, isToday: boolean) =>
        h('span', { class: 'week-header-scope' }, `${date}:${rawDate.date()}:${isToday}`),
    );
    const timezone = vi.fn(() => h('span', { class: 'week-timezone' }, 'TZ'));
    const today = dayjs();
    const weekFlags: HCalendarPinFlag[] = [
      {
        title: 'Today flag',
        startAt: today.startOf('day').add(1, 'hour'),
        endAt: today.startOf('day').add(3, 'hour'),
        clickable: true,
        tooltip: true,
      },
      {
        title: 'Cross week day',
        startAt: today.subtract(1, 'day').hour(23),
        endAt: today.hour(2),
        clickable: false,
      },
      {
        title: 'Adjacent today',
        startAt: today.startOf('day').add(3, 'hour'),
        endAt: today.startOf('day').add(4, 'hour'),
      },
    ];
    const wrapper = mount(HCalendar, {
      props: {
        mode: 'week',
        modelValue: today.format('YYYY-MM-DD'),
        pinFlags: weekFlags,
        currentTimeLine: true,
        hourFormat: '12',
        pinFlagsShowTime: true,
        showSpacingBetweenFlags: true,
        disableHours: date => [
          [date.startOf('day').add(6, 'hour'), date.startOf('day').add(7, 'hour')],
        ],
        onPinFlagClick,
      },
      slots: { weekDayHeader, timezone },
    });
    expect(wrapper.findAll('.week-header-scope')).toHaveLength(7);
    expect(wrapper.find('.week-timezone').exists()).toBe(true);
    expect(wrapper.findAll('.h-calendar-week__flag').length).toBeGreaterThan(0);
    expect(wrapper.findAll('.h-calendar-week__body--disabled-hours')).toHaveLength(7);
    expect(wrapper.findAll('.h-calendar-week__body--current-time')).toHaveLength(2);
    renderTooltipContents(wrapper);
    const clickable = wrapper.find('.h-calendar-week__flag.is-clickable');
    await clickable.trigger('mousedown');
    await clickable.trigger('click');
    expect(onPinFlagClick).toHaveBeenCalledOnce();
    const nonClickable = wrapper
      .findAll('.h-calendar-week__flag')
      .find(flag => !flag.classes().includes('is-clickable'))!;
    await nonClickable.trigger('click');
    expect(onPinFlagClick).toHaveBeenCalledOnce();
    await wrapper.find('.h-calendar-week__body--disabled-hours').trigger('mousedown');
    await wrapper.find('.h-calendar-week__body--disabled-hours').trigger('mousemove');
    await wrapper.find('.h-calendar-week__body--date-grid-column').trigger('mousedown');
  });

  test('week mode renders locale/default timezone without flags or current line', () => {
    const oldOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = () => 480;
    const wrapper = mount(HCalendar, {
      props: {
        mode: 'week',
        modelValue: '2020-01-01',
        pinFlags: [
          {
            title: 'No spacing time',
            startAt: '2020-01-01 01:00',
            endAt: '2020-01-01 02:00',
            tooltip: 'text tooltip',
          },
          {
            startAt: '2020-01-02 03:00',
            endAt: '2020-01-02 04:00',
          },
        ],
        currentTimeLine: false,
        hourFormat: '24',
        pinFlagsShowTime: false,
        showSpacingBetweenFlags: false,
      },
    });
    expect(wrapper.find('.h-calendar-week__header--time-zone').text()).toContain('GMT');
    expect(wrapper.findAll('.h-calendar-week__header--date-inner')).toHaveLength(7);
    expect(wrapper.find('.h-calendar-week__body--current-time').exists()).toBe(false);
    renderTooltipContents(wrapper);
    Date.prototype.getTimezoneOffset = oldOffset;
  });

  test('top-level mode watcher reports unsupported and empty mode updates', async () => {
    const mode = ref<string | null>('month');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const wrapper = mount(() => (
      <HCalendar
        mode={mode.value as 'month'}
        modeSwitchableList={['year', 'month', 'week', 'day', 'day']}
        modeSwitchable={true}
      />
    ));
    expect(wrapper.findAll('.h-segmented__item')).toHaveLength(4);
    mode.value = 'invalid';
    await nextTick();
    expect(warn).toHaveBeenCalled();
    mode.value = null;
    await nextTick();
    expect(error).toHaveBeenCalled();
    warn.mockRestore();
    error.mockRestore();
  });
});
