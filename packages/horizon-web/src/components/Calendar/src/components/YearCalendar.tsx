import { computed, defineComponent, inject, ref, shallowRef, toRef, watch } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import {
  NCalendarCurrentDateInjectKey,
  NCalendarEmitInjectKey,
  NCalendarPinFlagsInjectKey,
  NCalendarPropsInjectKey,
  NCalendarSlotsInjectKey,
  NCalendarCurrentTimeInjectKey,
  NCalendarHelperInjectKey,
} from '../utils/injectKeys';
import { defaultLocale, localeInjectKey } from '~/provides';
import type { Dayjs } from 'dayjs';
import chunk from 'lodash/chunk';
import MonthDayHelper from '../utils/MonthDayHelper';
import PinFlagsHelper from '../utils/PinFlagsHelper';

export default defineComponent({
  name: `${useNamespace()}YearCalendar`,
  setup() {
    const classHelper = new ComponentClassBlock('calendar-year');
    const calendarRef = ref<null | HTMLElement>(null);
    const props = inject(NCalendarPropsInjectKey)!;
    const parentEmit = inject(NCalendarEmitInjectKey)!;
    const parentSlots = inject(NCalendarSlotsInjectKey)!;
    const currentDate = inject(NCalendarCurrentDateInjectKey)!;
    const locale = inject(localeInjectKey, defaultLocale);
    const currentTime = inject(NCalendarCurrentTimeInjectKey)!;
    const calendarHelper = inject(NCalendarHelperInjectKey)!;

    const weeksText = computed(() =>
      new Array(7)
        .fill(0)
        .map((_, week) => locale.value?.langService.td().horizonWeb.calendar.simpleWeeks[week]),
    );

    const monthDayHelpers = shallowRef<MonthDayHelper[]>([]);

    const updateMonthDayHelpers = () => {
      monthDayHelpers.value = [];

      new Array(12).fill(0).forEach((_, month) => {
        const currentMonthFirstDay = currentDate.value.month(month).startOf('month');
        monthDayHelpers.value.push(
          new MonthDayHelper(currentMonthFirstDay, toRef(props, 'dateType')),
        );
      });
    };

    watch(
      currentDate,
      () => {
        updateMonthDayHelpers();
      },
      {
        immediate: true,
      },
    );

    const pinFlags = inject(NCalendarPinFlagsInjectKey, new PinFlagsHelper([], props));

    return () => (
      <div
        ref={calendarRef}
        class={cls(classHelper.block, classHelper.is('pickable', props.pickable))}
      >
        {monthDayHelpers.value.map((monthDayHelper, month) => {
          return (
            <div class={cls(classHelper.e('month'))}>
              <div class={cls(classHelper.em('month', 'header'))}>
                <div class={cls(classHelper.em('month', 'header-num'))}>
                  {locale.value?.langService.td().horizonWeb.calendar.simpleMonths[month]}
                </div>
                <div class={cls(classHelper.em('month', 'header-suffix'))}>
                  {parentSlots.monthHeader?.(currentDate.value.month(month).startOf('month'))}
                </div>
              </div>
              <div class={cls(classHelper.em('month', 'body'))}>
                <div class={cls(classHelper.em('month', 'week-wrapper'))}>
                  {weeksText.value.map(text => (
                    <div class={cls(classHelper.em('month', 'week'))}>{text}</div>
                  ))}
                </div>
                <div class={cls(classHelper.em('month', 'days-wrapper'))}>
                  {chunk(monthDayHelper.days.value, 7).map(days => {
                    return (
                      <div class={cls(classHelper.em('month', 'days'))}>
                        {days.map((day: Dayjs) => {
                          const groupedMergedFlag = pinFlags.groupedMergedFlags.value.get(
                            day.format('YYYY-MM-DD'),
                          );
                          const isDisabled = computed(
                            () => calendarHelper.isDisabledDay(day) || false,
                          );
                          return (
                            <div
                              class={cls(
                                classHelper.em('month', 'day'),
                                classHelper.is('current-month', day.month() === month),
                                classHelper.is(
                                  'current-day',
                                  currentTime.value.startOf('day').isSame(day.startOf('day')),
                                ),
                                classHelper.is(
                                  'invisible',
                                  props.dateType === 'only-current' && day.month() !== month,
                                ),
                                classHelper.is('disabled', isDisabled.value),
                                classHelper.has('flag', !!groupedMergedFlag),
                                classHelper.is('flag-start', groupedMergedFlag?.isStart ?? false),
                                classHelper.is('flag-end', groupedMergedFlag?.isEnd ?? false),
                              )}
                              onClick={() =>
                                props.pickable &&
                                !props.disableDate?.(day) &&
                                parentEmit('dateClick', day.format(props.format), 'year', day)
                              }
                            >
                              <span class={classHelper.em('month', 'day-num')}>{day.date()}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});
