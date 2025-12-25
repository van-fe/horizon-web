import { mount } from '@vue/test-utils';
import HCalendar from '..';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { CalendarProps } from '../src/composables/useProps';
import type { HCalendarPinFlag } from '../src/utils/types';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import YearCalendar from '../src/components/YearCalendar';
import MonthCalendar from '../src/components/MonthCalendar';
import DayCalendar from '../src/components/DayCalendar';
import WeekCalendar from '../src/components/WeekCalendar';

describe('Calendar.tsx', () => {
  describe('base', () => {
    test('basic', async () => {
      const wrapper = mount(() => <HCalendar />);
      const element = wrapper.findComponent(HCalendar);

      expect(element.exists()).toBe(true);
    });

    test('year', async () => {
      const wrapper = mount(() => <HCalendar mode="year" />);
      const element = wrapper.findComponent(YearCalendar);

      expect(element.exists()).toBe(true);
    });

    test('week', async () => {
      const wrapper = mount(() => <HCalendar mode="week" />);
      const element = wrapper.findComponent(WeekCalendar);

      expect(element.exists()).toBe(true);
    });

    test('day', async () => {
      const wrapper = mount(() => <HCalendar mode="day" modeSwitchableList={['day']} />);
      const element = wrapper.findComponent(DayCalendar);

      expect(element.exists()).toBe(true);
    });
  });

  describe('props', () => {
    test('switch mode', async () => {
      const mode = ref<'year' | 'month'>('month');

      const wrapper = mount(() => <HCalendar mode={mode.value} />);

      expect(wrapper.findComponent(MonthCalendar).exists()).toBe(true);

      mode.value = 'year';
      await nextTick();

      expect(wrapper.findComponent(YearCalendar).exists()).toBe(true);
    });

    test('switch list default mode', async () => {
      const modeSwitchableList = ref<CalendarProps['modeSwitchableList']>(['year', 'month', 'day']);
      const wrapper = mount(() => <HCalendar modeSwitchableList={modeSwitchableList.value} />);

      expect(wrapper.find('.n-calendar-month').exists()).eq(true);
    });

    test('switch list default mode if mode is not in modeSwitchableList', async () => {
      const modeSwitchableList = ref<CalendarProps['modeSwitchableList']>(['year', 'day']);
      const wrapper = mount(() => <HCalendar modeSwitchableList={modeSwitchableList.value} />);

      expect(wrapper.find('.n-calendar-year').exists()).eq(true);
    });

    test('format', async () => {
      const mode = ref<CalendarProps['mode']>('month');
      const onDateClick = vi.fn();
      const wrapper = mount(() => (
        <HCalendar
          modelValue="2022-10-01"
          format="YYYY-MM"
          mode={mode.value}
          pickable={true}
          onDateClick={onDateClick}
        />
      ));
      const element = wrapper.findComponent(MonthCalendar);
      const cell = element.find('.n-calendar-month__day');

      await cell.trigger('click');

      expect(onDateClick.mock.lastCall).contain('2022-09').contain('month');

      mode.value = 'year';
      await nextTick();

      const yearElement = wrapper.findComponent(YearCalendar);
      const day = yearElement.find('.n-calendar-year__month--day');

      await day.trigger('click');

      expect(onDateClick.mock.lastCall).contain('2021-12').contain('year');
    });

    test('date-type', async () => {
      const mode = ref<CalendarProps['mode']>('month');
      const dateType = ref<CalendarProps['dateType']>('full');
      const onDateClick = vi.fn();
      const wrapper = mount(() => (
        <HCalendar
          modelValue="2022-10-01"
          format="YYYY-MM"
          mode={mode.value}
          dateType={dateType.value}
          pickable={true}
          onDateClick={onDateClick}
        />
      ));

      // month + full
      const monthElement = wrapper.findComponent(MonthCalendar);
      const cell = monthElement.find('.n-calendar-month__day');

      await cell.trigger('click');

      expect(onDateClick.mock.lastCall).contain('2022-09').contain('month');

      // year + full
      mode.value = 'year';
      await nextTick();

      const yearElement = wrapper.findComponent(YearCalendar);
      const cell2 = yearElement.find('.n-calendar-year__month--day');

      await cell2.trigger('click');

      expect(onDateClick.mock.lastCall).contain('2021-12').contain('year');

      // year + only-current
      dateType.value = 'only-current';
      await nextTick();

      const yearElement2 = wrapper.findComponent(YearCalendar);
      const cell3 = yearElement2.find('.n-calendar-year__month--day:not(.is-invisible)');

      await cell3.trigger('click');

      expect(onDateClick.mock.lastCall).contain('2022-01').contain('year');

      // month + only-current
      mode.value = 'month';
      await nextTick();

      const monthElement2 = wrapper.findComponent(MonthCalendar);
      const cell4 = monthElement2.find('.n-calendar-month__day');

      await cell4.trigger('click');

      expect(onDateClick.mock.lastCall).contain('2022-08').contain('month');
    });

    test('disabled date', async () => {
      const disableDate = (date: Dayjs) => {
        return [0, 6].includes(date.day());
      };
      const mode = ref<CalendarProps['mode']>('month');

      const onClick = vi.fn();

      const wrapper = mount(() => (
        <HCalendar
          modelValue="2022-10-01"
          mode={mode.value}
          disableDate={disableDate}
          onDateClick={onClick}
        />
      ));

      const monthDay = wrapper.find('.n-calendar-month__day');

      await monthDay.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);

      mode.value = 'year';
      await nextTick();

      const yearDay = wrapper.find('.n-calendar-year__month--day');

      await yearDay.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);
    });

    test('pickable date', async () => {
      const mode = ref<CalendarProps['mode']>('month');
      const pickable = ref(false);

      const onClick = vi.fn();

      const wrapper = mount(() => (
        <HCalendar mode={mode.value} pickable={pickable.value} onDateClick={onClick} />
      ));

      const monthDay = wrapper.find('.n-calendar-month__day');

      await monthDay.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);

      pickable.value = true;
      await nextTick();

      await monthDay.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(1);

      mode.value = 'year';
      await nextTick();

      const yearDay = wrapper.find('.n-calendar-year__month--day');

      await yearDay.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(2);

      pickable.value = false;
      await nextTick();

      await yearDay.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  // happy-dom do not support IntersectionObserver
  test.todo('mode-switchable update:mode');

  describe('emits', function () {
    test('update:modelValue', async () => {
      const modelValue = ref();
      mount(() => <HCalendar v-model={modelValue.value} />);

      expect(modelValue.value).toBe(dayjs().format('YYYY-MM-DD'));
    });

    test('update:pinFlags', async () => {
      const pinFlags = ref<HCalendarPinFlag[]>([]);
      let reserveType: 1 | 2 | 3 = 1;

      function onCreatFinishFlagCallback(
        flag: HCalendarPinFlag,
      ): Promise<boolean | HCalendarPinFlag> {
        return new Promise(resolve => {
          switch (reserveType) {
            case 1:
              return resolve(false);
            case 2:
              return resolve(true);
            case 3:
              return resolve({ ...flag, title: 'test' });
          }
        });
      }

      const wrapper = mount(() => (
        <HCalendar
          v-model:pinFlags={pinFlags.value}
          pickable={true}
          enableCreatePinFlags={true}
          creatFinishFlagCallback={onCreatFinishFlagCallback}
        />
      ));

      const dayCell = wrapper.find('.n-calendar-month__day');

      // do not reserve
      await dayCell.trigger('mousedown');
      await dayCell.trigger('mouseup');

      expect(pinFlags.value).length(0);

      // reserve original
      reserveType = 2;
      await dayCell.trigger('mousedown');
      await dayCell.trigger('mouseup');

      expect(pinFlags.value).length(1);
      const lastPinFlag = pinFlags.value.at(-1);
      expect(!!lastPinFlag).toBe(true);

      expect(typeof lastPinFlag!.startAt).eq('object');
      expect(typeof lastPinFlag!.endAt).eq('object');
      expect((lastPinFlag!.startAt as Dayjs)?.format('YYYY-MM-DD')).eq(
        lastPinFlag!._startAt!.format('YYYY-MM-DD'),
      );
      expect((lastPinFlag!.endAt as Dayjs)?.format('YYYY-MM-DD')).eq(
        lastPinFlag!._endAt!.format('YYYY-MM-DD'),
      );

      // reserve modified
      reserveType = 3;
      await dayCell.trigger('mousedown');
      await dayCell.trigger('mouseup');
      expect(pinFlags.value.at(-1)?.title).eq('test');
      const lastPinFlag2 = pinFlags.value.at(-1);
      expect(!!lastPinFlag2).toBe(true);

      expect(typeof lastPinFlag2!.startAt).eq('object');
      expect(typeof lastPinFlag2!.endAt).eq('object');
      expect((lastPinFlag2!.startAt as Dayjs)?.format('YYYY-MM-DD')).eq(
        lastPinFlag2!._startAt!.format('YYYY-MM-DD'),
      );
      expect((lastPinFlag2!.endAt as Dayjs)?.format('YYYY-MM-DD')).eq(
        lastPinFlag2!._endAt!.format('YYYY-MM-DD'),
      );
    });
  });

  describe('interaction', function () {
    test('today', async () => {
      const date = ref('2022-11-20');
      const wrapper = mount(() => <HCalendar v-model={date.value} />);
      const todayBtn = wrapper.find('.n-calendar__header--today');

      await todayBtn.trigger('click');

      expect(date.value).toBe(dayjs().format('YYYY-MM-DD'));
    });

    test('prev next click', async () => {
      const date = ref();
      const onPrevClick = vi.fn();
      const onNextClick = vi.fn();
      const wrapper = mount(() => (
        <HCalendar v-model={date.value} onPrevClick={onPrevClick} onNextClick={onNextClick} />
      ));

      const todayBtn = wrapper.find('.n-calendar__header--today');
      const prevBtn = wrapper.find('.n-calendar__header--switcher-item.is-prev');
      const nextBtn = wrapper.find('.n-calendar__header--switcher-item.is-next');

      await todayBtn.trigger('click');
      await prevBtn.trigger('click');

      const prevMonthDayJs = dayjs().subtract(1, 'month').format('YYYY-MM-DD');

      expect(date.value).toBe(prevMonthDayJs);

      await nextBtn.trigger('click');

      expect(date.value).toBe(dayjs(prevMonthDayJs).add(1, 'month').format('YYYY-MM-DD'));
    });
  });
});
