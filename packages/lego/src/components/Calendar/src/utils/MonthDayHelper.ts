import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Ref } from 'vue';
import { ref, unref, watch } from 'vue';
import type { CalendarProps } from '~/components/Calendar/src/composables/useProps';
import type { MaybeRef } from '@nio-fe/shared';

export default class MonthDayHelper {
  public current: Ref<Dayjs> = ref(dayjs());
  public dateType: Ref<CalendarProps['dateType']>;
  public days: Ref<Dayjs[]> = ref([]);

  constructor(monthDate: MaybeRef<Dayjs | string>, dateType: Ref<CalendarProps['dateType']>) {
    this.dateType = dateType;

    watch(dateType, () => {
      this.fillCalendarMonthDays();
    });

    this.updateCurrentMonth(monthDate);
  }

  public updateCurrentMonth(monthDate: MaybeRef<Dayjs | string>) {
    this.current.value = dayjs(unref(monthDate));
    this.fillCalendarMonthDays();
  }

  public fillCalendarMonthDays() {
    const firstDay = dayjs(`${this.current.value.format('YYYY-MM')}-01`);
    const lastDay = dayjs(this.current.value.format('YYYY-MM') + this.current.value.daysInMonth());

    this.days.value = new Array(this.current.value.daysInMonth())
      .fill(0)
      .map((_, index: number) =>
        dayjs(`${this.current.value.format('YYYY-MM')}-${(index + 1).toString().padStart(2, '0')}`),
      );

    // 前补
    const firstDayWeek = dayjs(firstDay).format('d');

    this.days.value.unshift(
      ...new Array(Number(firstDayWeek))
        .fill('')
        .map((_, index: number) => dayjs(firstDay).subtract(index + 1, 'd'))
        .reverse(),
    );

    // 后补
    const lastDayWeek = dayjs(lastDay).format('d');

    this.days.value.push(
      ...new Array(6 - Number(lastDayWeek))
        .fill('')
        .map((_, index: number) => dayjs(lastDay).add(index + 1, 'd')),
    );

    // 如果行数不足6行，则会继续占位
    if (this.dateType.value === 'full') {
      this.days.value.push(
        ...new Array((6 - Math.floor(this.days.value.length / 7)) * 7)
          .fill('')
          .map((_, index: number) =>
            dayjs(this.days.value[this.days.value.length - 1]!.add(index + 1, 'd')),
          ),
      );
    }
  }
}
