import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { cls, ComponentClassBlock, cssVariable, useNamespace } from '@aurora/utils';
import { defaultLocale, localeInjectKey } from '~/provides';
import {
  HCalendarHelperInjectKey,
  HCalendarPropsInjectKey,
  HCalendarCurrentDateInjectKey,
  HCalendarPinFlagsInjectKey,
  HCalendarSlotsInjectKey,
  HCalendarEmitInjectKey,
  HCalendarCurrentTimeInjectKey,
} from '../utils/injectKeys';
import dayjs from 'dayjs';
import {
  calculateDisabledHours,
  getDatesRangeCommonPart,
  getHeightCssRaw,
  getHoursDiffCssRaw,
  getHourStartCssRaw,
  getOneHourHeightPx,
  isDatesAreCrossDay,
} from '../utils/timeHelper';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import DragToCreateFlag from '../utils/DragToCreateFlag';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';

export default defineComponent({
  name: `${useNamespace()}WeekCalendar`,
  setup() {
    const classHelper = new ComponentClassBlock('calendar-week');
    const bodyRef = ref<HTMLElement | null>(null);
    const scrollbarRef = ref<typeof HScrollbar | null>(null);
    const currentDate = inject(HCalendarCurrentDateInjectKey)!;
    const locale = inject(localeInjectKey, defaultLocale);
    const props = inject(HCalendarPropsInjectKey)!;
    const parentSlots = inject(HCalendarSlotsInjectKey)!;
    const parentEmit = inject(HCalendarEmitInjectKey)!;
    const currentTime = inject(HCalendarCurrentTimeInjectKey)!;
    const calendarHelper = inject(HCalendarHelperInjectKey)!;
    const pinFlags = inject(HCalendarPinFlagsInjectKey)!;
    const timezone = new Date().getTimezoneOffset() / 60;
    const currentTimeTop = computed(() =>
      getHeightCssRaw(currentTime.value.diff(currentTime.value.startOf('day'), 'seconds')),
    );

    const dragToCreateFlag = new DragToCreateFlag(bodyRef, pinFlags, props);

    function scrollToHour(hour: number) {
      scrollbarRef.value?.setScrollTop(hour * getOneHourHeightPx());
    }

    function shouldShowTimeLabel(hour: number) {
      return (
        !props.currentTimeLine ||
        !dayjs().startOf('w').isSame(currentDate.value.startOf('w')) ||
        Math.abs(currentDate.value.startOf('d').add(hour, 'h').diff(dayjs(), 'm')) >= 10
      );
    }

    onMounted(() => {
      scrollToHour(props.defaultStartHour);
    });

    return () => (
      <div class={classHelper.block}>
        <div class={classHelper.e('header')}>
          <div class={classHelper.em('header', 'time-zone')}>
            {parentSlots.timezone?.(
              timezone,
              currentDate.value.format(props.format),
              currentDate.value,
            ) ?? `GMT ${(timezone < 0 ? '+' : '-') + Math.abs(timezone)}`}
          </div>
          <div class={classHelper.em('header', 'dates')}>
            {calendarHelper.weekDays.value.map((date, index) => (
              <div
                class={cls(
                  classHelper.em('header', 'date'),
                  classHelper.is('today', date.isSame(currentTime.value.startOf('day'))),
                )}
              >
                {parentSlots?.weekDayHeader?.(
                  date.format(props.format),
                  date,
                  date.isSame(currentTime.value.startOf('day')),
                ) ?? (
                  <div class={classHelper.em('header', 'date-inner')}>
                    <div class={classHelper.em('header', 'date-week')}>
                      {locale.value?.langService.td().horizonWeb.calendar.weeks[index]}
                    </div>
                    <div class={classHelper.em('header', 'date-num')}>{date.format('D')}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <HScrollbar ref={scrollbarRef} zIndex={3}>
          <div ref={bodyRef} class={classHelper.e('body')}>
            <div class={classHelper.em('body', 'time-scroll')}>
              {Array.from(Array(23).keys()).map(hour => (
                <div class={classHelper.em('body', 'time-label')}>
                  {shouldShowTimeLabel(hour + 1)
                    ? props.hourFormat === '12'
                      ? hour < 12
                        ? hour + 1 + ' AM'
                        : hour - 11 + ' PM'
                      : hour + 1
                    : undefined}
                </div>
              ))}
              {props.currentTimeLine &&
              dayjs().startOf('w').isSame(currentDate.value.startOf('w')) ? (
                <div
                  class={cls(classHelper.em('body', 'current-time-label'))}
                  style={{
                    top: currentTimeTop.value,
                  }}
                >
                  {currentTime.value.format('HH:mm')}
                </div>
              ) : undefined}
            </div>
            {/** date grids **/}
            <div class={classHelper.em('body', 'date-grids')}>
              {calendarHelper.weekDays.value.map(date => {
                const currFlags = computed(() => pinFlags.getFlagsInDay(date.startOf('day')));

                return (
                  <div
                    class={classHelper.em('body', 'date-grid-column')}
                    onMousedown={e => dragToCreateFlag.onMousedown(e, date)}
                  >
                    {
                      /** pin flags **/
                      currFlags.value.map(flag => {
                        const [startAt, endAt] = getDatesRangeCommonPart(
                          [date.startOf('day'), date.endOf('day')],
                          [flag._startAt!, flag._endAt!],
                        )!;
                        const flagIndexInDay = computed(() =>
                          pinFlags.getFlagIndexInDay(flag, date),
                        );
                        const pingsAmountInHour = computed(() =>
                          pinFlags.getFlagsAmountInHour(
                            flag._startAt!,
                            flag._endAt!,
                            date.startOf('day'),
                          ),
                        );
                        const toTop = computed(() => {
                          let originValue = getHeightCssRaw(startAt.diff(date, 'seconds'));

                          if (props.showSpacingBetweenFlags) {
                            if (pinFlags.isFlagBorderingOnInDay(flag, date, 'start')) {
                              originValue = `calc(${originValue} + 2px)`;
                            }
                          }

                          return originValue;
                        });
                        const height = computed(() => {
                          let originValue = getHeightCssRaw(endAt.diff(startAt, 'seconds'));

                          if (props.showSpacingBetweenFlags) {
                            if (pinFlags.isFlagBorderingOnInDay(flag, date, 'start')) {
                              originValue = `calc(${originValue} - 2px)`;
                            }
                            if (pinFlags.isFlagBorderingOnInDay(flag, date, 'end')) {
                              originValue = `calc(${originValue} - 2px)`;
                            }
                          }

                          return originValue;
                        });
                        const width = computed(() => (1 / pingsAmountInHour.value) * 100 + '%');
                        const toLeft = computed(
                          () => (flagIndexInDay.value / pingsAmountInHour.value) * 100 + '%',
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
                          <HTooltip
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
                                classHelper.is('clickable', flag?.clickable ?? false),
                              )}
                              style={{
                                top: toTop.value,
                                height: height.value,
                                width: width.value,
                                left: toLeft.value,
                              }}
                              onMousedown={e => e.stopPropagation()}
                              onClick={(evt: MouseEvent) => {
                                evt.stopPropagation();
                                if (flag?.clickable) {
                                  parentEmit('pinFlagClick', flag);
                                }
                              }}
                            >
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
                          </HTooltip>
                        );
                      })
                    }
                    {/** disabled hours **/}
                    {props.disableHours
                      ? calculateDisabledHours(date, props.disableHours(date)).map(
                          ([start, end]) => (
                            <div
                              class={classHelper.em('body', 'disabled-hours')}
                              style={{
                                height: getHoursDiffCssRaw(start, end),
                                top: getHourStartCssRaw(start),
                              }}
                              onMousedown={e => e.stopPropagation()}
                              onMousemove={e => e.stopPropagation()}
                            />
                          ),
                        )
                      : undefined}
                  </div>
                );
              })}
              {/** divider **/}
              {Array.from(Array(24).keys()).map(hour => (
                <div
                  class={cls(classHelper.em('body', 'hour-divider'))}
                  style={{
                    top: `calc(${cssVariable('calendar', 'size', 'week', 'hour-cell', 'height')} * ${hour + 1})`,
                  }}
                />
              ))}
              {/** current timeline **/}
              {props.currentTimeLine &&
              dayjs().startOf('w').isSame(currentDate.value.startOf('w')) ? (
                <div>
                  <div
                    class={cls(classHelper.em('body', 'current-time'), classHelper.is('disabled'))}
                    style={{
                      top: currentTimeTop.value,
                      width: `calc(100% / 7 * ${calendarHelper.getFirstDayOfWeekBetweenTodayDiff()})`,
                    }}
                  />
                  <div
                    class={classHelper.em('body', 'current-time')}
                    style={{
                      top: currentTimeTop.value,
                      width: `calc(100% / 7 * ${
                        7 - calendarHelper.getFirstDayOfWeekBetweenTodayDiff()
                      })`,
                      left: `calc(100% / 7 * ${calendarHelper.getFirstDayOfWeekBetweenTodayDiff()})`,
                    }}
                  />
                </div>
              ) : undefined}
            </div>
          </div>
        </HScrollbar>
      </div>
    );
  },
});
