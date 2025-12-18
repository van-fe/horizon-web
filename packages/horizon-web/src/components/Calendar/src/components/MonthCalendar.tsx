import { computed, defineComponent, Fragment, inject, nextTick, ref, toRef, watch } from 'vue';
import {
  NCalendarCurrentDateInjectKey,
  NCalendarCurrentFormatDateInjectKey,
  NCalendarCurrentTimeInjectKey,
  NCalendarEmitInjectKey,
  NCalendarHelperInjectKey,
  NCalendarPinFlagsInjectKey,
  NCalendarPropsInjectKey,
  NCalendarSlotsInjectKey,
} from '../utils/injectKeys';
import { cls, ComponentClassBlock, cssVariable, isObject, useNamespace } from '@aurora/utils';
import { defaultLocale, localeInjectKey } from '~/provides';
import type { Dayjs } from 'dayjs';
import dayjs, { isDayjs } from 'dayjs';
import chunk from 'lodash/chunk';
import cloneDeep from 'lodash/cloneDeep';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useElementBounding } from '@vueuse/core';
import MonthDayHelper from '../utils/MonthDayHelper';
import type { NCalendarPinFlag } from '~/components/Calendar/src/utils/types';
import {
  getDatesRangeExcludeParts,
  getMaxDate,
  getMinDate,
  isDatesAreCrossDay,
  maxDayjs,
  minDayjs,
} from '../utils/timeHelper';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default defineComponent({
  name: `${useNamespace()}MonthCalendar`,
  emits: {
    currentDateChange: (date: Dayjs) => isDayjs(date),
  },
  setup(_, { emit }) {
    const classHelper = new ComponentClassBlock('calendar-month');
    const props = inject(NCalendarPropsInjectKey)!;
    const parentEmit = inject(NCalendarEmitInjectKey)!;
    const parentSlots = inject(NCalendarSlotsInjectKey)!;
    const currentDate = inject(NCalendarCurrentDateInjectKey)!;
    const currentFormatDate = inject(NCalendarCurrentFormatDateInjectKey)!;
    const calendarHelper = inject(NCalendarHelperInjectKey)!;
    const locale = inject(localeInjectKey, defaultLocale);
    const currentTime = inject(NCalendarCurrentTimeInjectKey)!;

    const currentMonth = computed(() => currentDate?.value.format('YYYY-MM'));

    const pinFlags = inject(NCalendarPinFlagsInjectKey)!;

    const monthDayHelper = new MonthDayHelper(currentDate, toRef(props, 'dateType'));

    const firstDay = computed(() =>
      props.dateType === 'full' ? monthDayHelper.days.value[0] : dayjs(currentMonth.value + '-01'),
    );
    const lastDay = computed(() =>
      props.dateType === 'full'
        ? monthDayHelper.days.value[monthDayHelper.days.value.length - 1]
        : dayjs(currentMonth.value + `-${currentDate?.value.daysInMonth()}`),
    );

    watch(currentDate, val => monthDayHelper.updateCurrentMonth(val));

    const isDayInThisMonth = (date: Dayjs) => {
      return date.format('YYYY-MM') === currentMonth.value;
    };

    const onPickDate = (date: Dayjs) => {
      if (props?.pickable && !props.disableDate?.(date)) {
        emit('currentDateChange', date);
        parentEmit('dateClick', currentFormatDate?.value, 'month', currentDate.value);
      }
    };

    // create pin flag
    let isDragging = false;
    const newPinFlagStartAt = ref<Dayjs | null>(null);
    const newPinFlagEndAt = ref<Dayjs | null>(null);
    const tempPinFlag = ref<NCalendarPinFlag | null>(null);
    const onMousedown = (date: Dayjs) => {
      if (props.enableCreatePinFlags && tempPinFlag.value === null) {
        isDragging = true;
        newPinFlagStartAt.value = date;
        newPinFlagEndAt.value = date.add(1, 'd');

        const cbData = props.creatingPinFlagCallback?.(newPinFlagStartAt.value) ?? {};

        tempPinFlag.value = cloneDeep(
          pinFlags.addTempPinFlag(
            newPinFlagStartAt.value,
            newPinFlagEndAt.value ?? newPinFlagStartAt.value!.add(1, 'd'),
            cbData?.title,
            cbData?.type,
          ),
        );
      }
    };

    const onMouseup = (e: MouseEvent) => {
      e.stopPropagation();

      if (props.enableCreatePinFlags) {
        nextTick(async () => {
          isDragging = false;
          newPinFlagStartAt.value = null;
          newPinFlagEndAt.value = null;

          if (tempPinFlag.value) {
            const reserve = await props.creatFinishFlagCallback?.(tempPinFlag.value);

            if (isObject(reserve)) {
              pinFlags.updateTempPinFlag(reserve, true, true);
            } else if (reserve !== true) {
              pinFlags.removeTempPinFlag(tempPinFlag.value);
            } else {
              pinFlags.updateTempPinFlag(tempPinFlag.value, true, true);
            }

            tempPinFlag.value = null;
          }
        });
      }
    };

    const onMousemove = (date: Dayjs) => {
      if (props.enableCreatePinFlags && isDragging && tempPinFlag.value) {
        let currentStartAt = minDayjs(date, newPinFlagStartAt.value!);
        let currentEndAt = maxDayjs(date.endOf('day'), newPinFlagEndAt.value!);

        if (
          !currentStartAt.isSame(tempPinFlag.value._startAt) ||
          !currentEndAt.isSame(tempPinFlag.value._endAt)
        ) {
          if (!props.createFlagCanThoughDisableDateOrHour) {
            const disabledDates: Dayjs[] = [];

            for (let i = currentStartAt; i.isSameOrBefore(currentEndAt); i = i.add(1, 'day')) {
              if (calendarHelper.isDisabledDay(i)) {
                disabledDates.push(i);
              }
            }

            if (disabledDates.length) {
              const excludeParts = getDatesRangeExcludeParts(
                [currentStartAt, currentEndAt],
                [disabledDates[0], disabledDates.at(-1)!.endOf('day')],
              );

              if (excludeParts === undefined) {
                return;
              } else if (excludeParts.length > 1) {
                if (date.isAfter(tempPinFlag.value._startAt)) {
                  [currentStartAt, currentEndAt] = excludeParts[0];
                } else {
                  [currentStartAt, currentEndAt] = excludeParts.at(-1)!;
                }
              } else {
                [currentStartAt, currentEndAt] = excludeParts[0];
              }
            }
          }

          tempPinFlag.value._startAt = currentStartAt;
          tempPinFlag.value.startAt = currentStartAt;
          tempPinFlag.value._endAt = currentEndAt;
          tempPinFlag.value.endAt = currentEndAt;
          pinFlags.updateTempPinFlagDate(tempPinFlag.value);
        }
      }
    };

    const calendarRef = ref<HTMLElement | null>(null);
    const calendarWrapper = useElementBounding(calendarRef);

    return () => (
      <div
        ref={calendarRef}
        class={classHelper.block}
        onMouseleave={e => onMouseup(e)}
        onMouseup={e => onMouseup(e)}
      >
        <div class={classHelper.e('week-wrapper')}>
          {new Array(7).fill(0).map((_: number, index: number) => (
            <div class={classHelper.e('week')}>
              {locale!.value?.langService.td().horizon-web.calendar.weeks[index]}
            </div>
          ))}
        </div>
        <div class={classHelper.e('day-wrapper')}>
          {chunk(monthDayHelper.days.value, 7).map(dates => {
            const firstTimeInThisWeek = dates[0].day(0);
            const lastTimeInThisWeek = firstTimeInThisWeek.day(6).add(86399, 's');
            const currFlags = computed(() =>
              pinFlags.getFlagsInWeek(
                firstTimeInThisWeek,
                props.dateType === 'only-current' ? currentDate.value : undefined,
              ),
            );

            return (
              <div class={classHelper.e('day-row')}>
                <div class={cls(classHelper.em('flag', 'wrapper'))}>
                  {currFlags.value.map(flag => {
                    const isStartDateInThisWeek =
                      flag._startAt?.isSameOrBefore(lastTimeInThisWeek) &&
                      flag._startAt?.isSameOrAfter(firstTimeInThisWeek);
                    const isEndDateInThisWeek =
                      flag._endAt?.isSameOrBefore(lastTimeInThisWeek) &&
                      flag._endAt?.isSameOrAfter(firstTimeInThisWeek);

                    const startAt = flag._startAt?.isBefore(firstTimeInThisWeek)
                      ? getMaxDate(firstTimeInThisWeek, firstDay.value)
                      : getMaxDate(flag._startAt!, firstDay.value);
                    const endAt = flag._endAt?.isAfter(lastTimeInThisWeek)
                      ? getMinDate(lastTimeInThisWeek, lastDay.value.add(86399, 's'))
                      : getMinDate(flag._endAt!, lastDay.value.add(86399, 's'));

                    const toLeft = computed(
                      () =>
                        (startAt.diff(dates[0], 'hour') / (24 * 7)) * calendarWrapper.width.value,
                    );

                    const toTop = computed(
                      () =>
                        `calc(${pinFlags.getFlagIndexInWeekdays(
                          flag,
                          firstTimeInThisWeek,
                        )} * (${cssVariable('calendar-height--flag--month')} + ${cssVariable(
                          'calendar-margin-bottom--flag--month',
                        )})`,
                    );

                    const width = computed(
                      () => (endAt.diff(startAt, 'hour') / (24 * 7)) * calendarWrapper.width.value,
                    );

                    const labelTextAppend = computed(() =>
                      props.pinFlagsShowTime
                        ? isDatesAreCrossDay(flag._startAt!, flag._endAt!)
                          ? `${flag._startAt!.format('MM/DD HH:mm')}～${flag._endAt!.format(
                              'MM/DD HH:mm',
                            )}`
                          : `${flag._startAt!.format('HH:mm')}～${flag._endAt!.format('HH:mm')}`
                        : '',
                    );

                    return (
                      <NTooltip
                        disabled={!flag?.tooltip}
                        v-slots={{
                          content: () =>
                            flag?.tooltip === true ? (
                              <div>
                                {flag.title} {labelTextAppend.value}
                              </div>
                            ) : (
                              flag.tooltip || ''
                            ),
                        }}
                      >
                        <div
                          class={cls(
                            classHelper.e('flag'),
                            classHelper.em('flag', flag.type || 'default'),
                            classHelper.is('started', isStartDateInThisWeek),
                            classHelper.is('ended', isEndDateInThisWeek),
                            classHelper.is('clickable', flag?.clickable ?? false),
                            classHelper.is('temp', !!flag?.temp),
                          )}
                          style={{
                            width: `calc(${width.value}px - ${cssVariable(
                              'calendar-padding--day--month',
                            )})`,
                            left: `calc(${toLeft.value}px + ${cssVariable(
                              'calendar-padding--day--month',
                            )})`,
                            top: toTop.value,
                            color: flag?.color,
                            background: flag?.background,
                          }}
                          onClick={() => {
                            if (flag?.clickable) {
                              parentEmit('pinFlagClick', flag);
                            }
                          }}
                        >
                          {isStartDateInThisWeek && (
                            <div
                              class={classHelper.em('flag', 'started-tag')}
                              style={{
                                background: flag?.color,
                              }}
                            />
                          )}
                          <div class={classHelper.em('flag', 'content')}>
                            {flag.title ? (
                              <span class={classHelper.em('flag', 'content-title')}>
                                {flag.title}
                              </span>
                            ) : undefined}
                            <span class={classHelper.em('flag', 'content-time')}>
                              {labelTextAppend.value}
                            </span>
                          </div>
                        </div>
                      </NTooltip>
                    );
                  })}
                </div>
                {dates.map(date => {
                  const isDisabled = computed(() => calendarHelper.isDisabledDay(date) || false);

                  return (
                    <div
                      class={cls(
                        classHelper.e('day'),
                        classHelper.em('day', 'current-month', isDayInThisMonth(date)),
                        classHelper.em(
                          'day',
                          'current-day',
                          date.isSame(currentTime.value.startOf('day')),
                        ),
                        classHelper.is('pickable', props?.pickable),
                        classHelper.is('disabled', isDisabled.value),
                        classHelper.is(
                          'invisible',
                          props.dateType === 'only-current' && !isDayInThisMonth(date),
                        ),
                      )}
                      onClick={() => !isDisabled.value && onPickDate(date)}
                      onMousedown={() => !isDisabled.value && onMousedown(date)}
                      onMousemove={() => onMousemove(date)}
                      onMouseup={e => onMouseup(e)}
                    >
                      {parentSlots.dateCell?.(date.format(props.format), date) ?? (
                        <Fragment>
                          {parentSlots.dateCellTitle?.(date.format(props.format), date) ?? (
                            <div class={classHelper.em('day', 'header')}>
                              <div class={classHelper.em('day', 'header-number')}>
                                {date.format('D') === '1'
                                  ? locale.value?.langService.td().horizon-web.calendar.simpleMonths[
                                      Number(date.format('M')) - 1
                                    ] +
                                    date.format('D') +
                                    locale.value?.langService.td().horizon-web.calendar.simpleDay
                                  : date.format('D')}
                              </div>
                            </div>
                          )}
                          {pinFlags.pinFlags && (
                            <div
                              class={cls(classHelper.em('flag', 'placeholder'))}
                              style={{
                                height: `calc(${pinFlags.getFlagsAmountInDay(
                                  date,
                                )}  * (${cssVariable(
                                  'calendar-height--flag--month',
                                )} + ${cssVariable('calendar-margin-bottom--flag--month')}))`,
                              }}
                            />
                          )}
                          <div class={classHelper.em('day', 'cell-append')}>
                            {parentSlots.dateCellAppend?.(date.format(props.format), date)}
                          </div>
                        </Fragment>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
