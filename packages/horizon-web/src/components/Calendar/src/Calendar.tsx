import type { VNode, UnwrapRef } from 'vue';
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  toRef,
  toRefs,
  watch,
} from 'vue';
import { useCalendarProps } from './composables/useProps';
import { useCalendarEmits } from './composables/useEmits';
import type { CalendarSlots } from './composables/useSlots';
import { useCalendarSlots } from './composables/useSlots';
import type { CalendarEmits } from './composables/useEmits';
import type { LegoSetupContext } from '@aurora/shared';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/shared';
import { defaultLocale, localeInjectKey } from '~/provides';
import { NIcon } from '@aurora/icon';
import dayjs from '~/utils/useDayJs';
import {
  NCalendarCurrentDateInjectKey,
  NCalendarCurrentFormatDateInjectKey,
  NCalendarCurrentTimeInjectKey,
  NCalendarEmitInjectKey,
  NCalendarHelperInjectKey,
  NCalendarPinFlagsInjectKey,
  NCalendarPropsInjectKey,
  NCalendarSlotsInjectKey,
} from './utils/injectKeys';
import NTab from '~/components/Tabs/src/Tab';
import NTabs from '~/components/Tabs/src/Tabs';
import NButton from '~/components/Button/src/Button';
import PinFlagsHelper from './utils/PinFlagsHelper';
import NDatePicker from '~/components/DatePicker/src/DatePicker';
import uniq from 'lodash/uniq';
import CalendarHelper from './utils/CalendarHelper';
import MonthCalendar from './components/MonthCalendar';
import WeekCalendar from './components/WeekCalendar';
import YearCalendar from './components/YearCalendar';
import DayCalendar from './components/DayCalendar';

export default defineComponent({
  name: `${useNamespace()}Calendar`,
  desc: '用来显示日期，并且可以方便的在日历上以横幅的方式展示某些活动',
  components: {
    NButton,
  },
  props: useCalendarProps,
  emits: useCalendarEmits,
  slots: useCalendarSlots,
  setup(props, { slots, emit }: LegoSetupContext<CalendarEmits, CalendarSlots>) {
    const classHelper = new ComponentClassBlock('calendar');
    const {
      pinFlags: pinFlagsRef,
      dateType: dateTypeRef,
      modeSwitchableList: modeSwitchableListRef,
      disableDate: disableDateRef,
    } = toRefs(props);
    const locale = inject(localeInjectKey, defaultLocale);
    const currentTime = ref(dayjs());
    const currentDate = ref(dayjs(props.modelValue || undefined));
    const currentMode = ref<'year' | 'month' | 'week' | 'day'>('month');

    if (props.modeSwitchableList?.includes(props.mode)) {
      currentMode.value = toRef(props, 'mode').value;
    } else {
      currentMode.value = props.modeSwitchableList?.[0] || 'month';
    }

    const currentFormatByMode = computed(() => {
      switch (currentMode.value) {
        default:
        case 'month':
          return 'YYYY-MM';
        case 'year':
          return 'YYYY';
        case 'week':
          return 'YYYY-MM';
        case 'day':
          return 'YYYY-MM-DD';
      }
    });

    const calendarHelper = new CalendarHelper(
      currentDate.value,
      dateTypeRef,
      currentMode,
      disableDateRef,
    );

    const currentFormatDate = computed({
      get: () => currentDate.value.format(props.format),
      set: (val: string) => (currentDate.value = dayjs(val)),
    });

    const pinFlags = new PinFlagsHelper(props.pinFlags, props);

    if (!props.modelValue) {
      emit('update:modelValue', currentFormatDate.value);
    }
    function onPinFlagsChange(val: UnwrapRef<PinFlagsHelper['pinFlags']>) {
      emit('update:pinFlags', val);
    }

    pinFlags.addEventListener('pinFlags', onPinFlagsChange);

    watch(
      () => props.modelValue,
      val => {
        currentDate.value = dayjs(val);
      },
    );

    watch(currentFormatDate, val => {
      emit('update:modelValue', val);
      emit('change', val, currentMode.value, currentDate.value);
    });

    watch(
      () => props.mode,
      val => {
        if (val) {
          if (!props.modeSwitchableList?.includes(val)) {
            console.warn(
              'You have set a mode value which is not included in props.modeSwitchableList',
            );
          }

          currentMode.value = val;
        } else {
          console.error('You have set a null value to mode.');
        }
      },
    );

    watch(currentMode, val => {
      emit('update:mode', val);
    });

    watch(currentDate, val => {
      calendarHelper.updateCurrentDate(val);
    });

    provide(NCalendarPropsInjectKey, props);
    provide(NCalendarEmitInjectKey, emit);
    provide(NCalendarSlotsInjectKey, slots);
    provide(NCalendarPinFlagsInjectKey, pinFlags);
    provide(NCalendarCurrentDateInjectKey, currentDate);
    provide(NCalendarCurrentFormatDateInjectKey, currentFormatDate);
    provide(NCalendarHelperInjectKey, calendarHelper);
    provide(NCalendarCurrentTimeInjectKey, currentTime);

    watch(
      pinFlagsRef,
      val => {
        pinFlags.updateData(val);
      },
      {
        deep: true,
      },
    );

    const bodyRender = computed(() => {
      switch (currentMode.value) {
        default:
        case 'month':
          return <MonthCalendar onCurrentDateChange={date => (currentDate.value = date)} />;
        case 'year':
          return <YearCalendar />;
        case 'week':
          return <WeekCalendar />;
        case 'day':
          return <DayCalendar />;
      }
    });

    const switchModes = computed(() => {
      const list = uniq(modeSwitchableListRef.value);
      const nodes: VNode[] = [];

      list.forEach(item => {
        switch (item) {
          case 'year':
            nodes.push(
              <NTab label={locale.value?.langService.td().horizon-web.calendar.year} key="year" />,
            );
            break;
          case 'month':
            nodes.push(
              <NTab label={locale.value?.langService.td().horizon-web.calendar.month} key="month" />,
            );
            break;
          case 'week':
            nodes.push(
              <NTab label={locale.value?.langService.td().horizon-web.calendar.week} key="week" />,
            );
            break;
          case 'day':
            nodes.push(<NTab label={locale.value?.langService.td().horizon-web.calendar.day} key="day" />);
            break;
        }
      });

      return nodes;
    });

    const datePickerType = computed(() => {
      switch (currentMode.value) {
        case 'week':
          return 'month';
        case 'day':
          return 'date';
        default:
          return currentMode.value;
      }
    });

    const prev = () => {
      currentDate.value = currentDate.value.subtract(1, currentMode.value);
      calendarHelper.updateCurrentDate(currentDate.value);
      emit('prevClick', currentFormatDate.value, currentMode.value, currentDate.value);
    };

    const next = () => {
      currentDate.value = currentDate.value.add(1, currentMode.value);
      calendarHelper.updateCurrentDate(currentDate.value);
      emit('nextClick', currentFormatDate.value, currentMode.value, currentDate.value);
    };

    let timer: ReturnType<typeof setInterval> | null = null;

    function setTimeListener() {
      clearTimeListener();

      timer = setInterval(() => {
        currentTime.value = dayjs();
      }, 10000);
    }

    function clearTimeListener() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    onMounted(() => {
      setTimeListener();
    });

    onBeforeUnmount(() => {
      clearTimeListener();
      pinFlags.removeEventListener('pinFlags', onPinFlagsChange);
    });

    return () => (
      <div class={cls(classHelper.block, classHelper.is('auto-fit', props.autoFit))}>
        <div class={classHelper.e('header')}>
          {slots.switchDate?.(currentFormatDate.value, currentDate.value) ?? (
            <div class={classHelper.em('header', 'switcher-wrapper')}>
              <NButton
                type="normal"
                plain={true}
                size="large"
                forceNewestSize={true}
                class={classHelper.em('header', 'today')}
                onClick={() => (currentDate.value = dayjs())}
              >
                {locale?.value?.langService.td().horizon-web.datePicker.today}
              </NButton>
              <div class={classHelper.em('header', 'switcher')}>
                <div
                  class={cls(classHelper.em('header', 'switcher-item'), classHelper.is('prev'))}
                  onClick={prev}
                >
                  <NIcon name="arrow_left" size={12} />
                </div>
                <NDatePicker v-model={currentDate.value} type={datePickerType.value}>
                  {{
                    pickerOuter: () => (
                      <div class={classHelper.em('header', 'switcher-date')}>
                        {currentDate.value.format(currentFormatByMode.value)}
                      </div>
                    ),
                  }}
                </NDatePicker>

                <div
                  class={cls(classHelper.em('header', 'switcher-item'), classHelper.is('next'))}
                  onClick={next}
                >
                  <NIcon name="arrow_right" size={12} />
                </div>
              </div>
            </div>
          )}

          <div class={classHelper.em('header', 'suffix')}>{slots.header?.()}</div>
          {props.modeSwitchable && (
            <div class={classHelper.em('header', 'mode-switcher')}>
              <NTabs
                activeKey={currentMode.value}
                type="segment"
                size="medium"
                onUpdate:activeKey={val =>
                  (currentMode.value = val as 'month' | 'year' | 'week' | 'day')
                }
              >
                {switchModes.value}
              </NTabs>
            </div>
          )}
        </div>
        <div class={`${classHelper.e('body')}`}>{bodyRender.value}</div>
      </div>
    );
  },
});
