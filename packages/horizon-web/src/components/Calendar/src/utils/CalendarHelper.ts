import type { Dayjs, OpUnitType, QUnitType } from 'dayjs';
import dayjs from 'dayjs';
import type { Ref } from 'vue';
import { ref, unref, watch } from 'vue';
import type { CalendarProps } from '../composables/useProps';
import type { MaybeRef } from '@aurora/utils';

export default class CalendarHelper {
  private current: Ref<Dayjs> = ref(dayjs());
  private readonly dateType: Ref<CalendarProps['dateType']>;
  private readonly mode: Ref<CalendarProps['mode']>;
  private getDisableDate: Ref<CalendarProps['disableDate']>;

  public yearMonths: Ref<Dayjs[][]> = ref([]);
  public monthDays: Ref<Dayjs[]> = ref([]);
  public weekDays: Ref<Dayjs[]> = ref([]);
  public disabledMonthDays = ref(new Set<string>());
  public disabledYearDays = ref(new Set<string>());

  constructor(
    date: MaybeRef<Dayjs | string>,
    dateType: Ref<CalendarProps['dateType']>,
    mode: Ref<CalendarProps['mode']>,
    getDisableDate: Ref<CalendarProps['disableDate']>,
  ) {
    this.current.value = dayjs(unref(date));
    this.dateType = dateType;
    this.mode = mode;
    this.getDisableDate = getDisableDate;

    this.addWatch();
    this.fillDates();
  }

  public addWatch() {
    watch(this.dateType, this.fillDates.bind(this));
    watch(this.mode, this.fillDates.bind(this));
  }

  public fillDates() {
    switch (this.mode.value) {
      case 'month':
        this.fillCalendarMonthDays();
        this.fillDisabledDates();
        break;
      case 'year':
        this.fillCalendarYearMonths();
        this.fillDisabledDates();
        break;
      case 'week':
        this.fillCalendarWeekDays();
        break;
    }
  }

  public fillDisabledDates() {
    if (!this.getDisableDate.value) return;

    switch (this.mode.value) {
      case 'month':
        for (
          let i = this.current.value.startOf('month').subtract(1, 'week');
          i <= this.current.value.endOf('month').add(2, 'weeks');
          i = i.add(1, 'day')
        ) {
          if (this.getDisableDate.value(i)) {
            this.disabledMonthDays.value.add(i.format('YYYY-MM-DD'));
          }
        }
        break;
      case 'year':
        for (
          let i = this.current.value.startOf('year').subtract(1, 'week');
          i <= this.current.value.endOf('year').add(2, 'weeks');
          i = i.add(1, 'day')
        ) {
          if (this.getDisableDate.value(i)) {
            this.disabledYearDays.value.add(i.format('YYYY-MM-DD'));
          }
        }
    }
  }

  public updateCurrentDate(date: MaybeRef<Dayjs | string>) {
    this.current.value = dayjs(unref(date));
    this.fillDates();
  }

  public getFirstDayOfWeekBetweenTodayDiff(diffType: QUnitType | OpUnitType = 'd') {
    return Math.abs(this.weekDays.value[0].diff(dayjs().startOf('d'), diffType));
  }

  private fillCalendarYearMonths() {
    const firstDay = this.current.value.startOf('year');

    this.yearMonths.value = [];

    for (let i = 0; i < 12; i++) {
      this.yearMonths.value.push(this.getMonthDates(firstDay.add(i, 'month')));
    }
  }

  private fillCalendarMonthDays() {
    this.monthDays.value = this.getMonthDates(this.current.value);
  }

  private fillCalendarWeekDays() {
    const firstDay = this.current.value.startOf('week');
    this.weekDays.value = [];

    for (let i = 0; i < 7; i++) {
      this.weekDays.value.push(dayjs(firstDay.add(i, 'day')));
    }
  }

  private getMonthDates(dayInMonth: Dayjs) {
    const firstDay = dayInMonth.startOf('month');
    const lastDay = dayInMonth.endOf('month');

    const resDates = Array.from(Array(dayInMonth.daysInMonth()).keys()).map((index: number) =>
      firstDay.add(index, 'd'),
    );

    // 前补
    const firstDayWeek = firstDay.format('d');

    resDates.unshift(
      ...Array.from(Array(firstDayWeek).keys())
        .map((index: number) => firstDay.subtract(index + 1, 'd'))
        .reverse(),
    );

    // 后补
    const lastDayWeek = lastDay.format('d');
    const appendAmount = 6 - Number(lastDayWeek);

    resDates.push(
      ...Array.from(Array(appendAmount).keys()).map((index: number) => lastDay.add(index + 1, 'd')),
    );

    // 如果行数不足6行，则会继续占位
    if (this.dateType.value === 'full') {
      const resLastDate = resDates[resDates.length - 1];
      const restAppendAmount = (6 - Math.floor(resDates.length / 7)) * 7;
      resDates.push(
        ...Array.from(Array(restAppendAmount).keys()).map((index: number) =>
          dayjs(resLastDate.add(index + 1, 'd')),
        ),
      );
    }

    return resDates;
  }

  public isDisabledDay(day: Dayjs) {
    switch (this.mode.value) {
      case 'year':
        return this.disabledYearDays.value.has(day.format('YYYY-MM-DD'));
      case 'month':
        return this.disabledMonthDays.value.has(day.format('YYYY-MM-DD'));
    }
  }
}
