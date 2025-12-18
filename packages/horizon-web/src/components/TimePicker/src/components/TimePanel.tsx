import { computed, defineComponent, nextTick, ref, watch, Fragment, inject } from 'vue';
import type { LegoComponentInstance, LegoSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, isDefined } from '@aurora/utils';
import type { TimePickerTimePanelProps } from '../composables/useProps';
import { useTimePickerTimePanelProps } from '../composables/useProps';
import TimeColumnPanel from './TimeColumnPanel';
import dayjs from '~/utils/useDayJs';
import type { NTimePickerPanelOptionType } from '../utils/types';
import type { TimePickerTimePanelEmits } from '../composables/useEmits';
import { useTimePickerTimePanelEmit } from '../composables/useEmits';
import type {
  TimePickerTimeColumnPanelExposes,
  TimePickerTimePanelExposes,
} from '../composables/useExposes';
import { useTimePickerTimePanelExposes } from '../composables/useExposes';
import type { Dayjs } from 'dayjs';
import { NTimePickerEmitsInjectKey } from '../utils/injectKeys';

export default defineComponent({
  name: 'TimePanel',
  props: useTimePickerTimePanelProps,
  emits: useTimePickerTimePanelEmit,
  exposes: useTimePickerTimePanelExposes,
  setup(
    props: TimePickerTimePanelProps,
    {
      emit,
      expose,
    }: LegoSetupContext<TimePickerTimePanelEmits, {}, TimePickerTimePanelExposes>,
  ) {
    const classHelper = new ComponentClassBlock('time-picker');

    const parentEmit = inject(NTimePickerEmitsInjectKey, undefined);

    const timePanelDomRef =
      ref<LegoComponentInstance<typeof TimeColumnPanel, TimePickerTimeColumnPanelExposes>>();
    const hourPanelDomRef =
      ref<LegoComponentInstance<typeof TimeColumnPanel, TimePickerTimeColumnPanelExposes>>();
    const minutePanelDomRef =
      ref<LegoComponentInstance<typeof TimeColumnPanel, TimePickerTimeColumnPanelExposes>>();
    const secondPanelDomRef =
      ref<LegoComponentInstance<typeof TimeColumnPanel, TimePickerTimeColumnPanelExposes>>();

    const currentTime = ref<Dayjs | null>();
    const currentHour = ref<Dayjs | null>();
    const currentMinute = ref<Dayjs | null>();
    const currentSecond = ref<Dayjs | null>();

    const currentDayjs = computed(() => {
      let curr = props.modelValue ?? dayjs();

      curr = curr.set('hour', currentHour.value?.hour() ?? 0);
      curr = curr.set('minute', currentMinute.value?.minute() ?? 0);
      curr = curr.set('second', currentSecond.value?.second() ?? 0);

      return curr;
    });

    const timeRange = computed(() => {
      const startFrom = dayjs();

      return [
        dayjs(`${startFrom.format('YYYY-MM-DD')} ${props.startAt}`),
        dayjs(`${startFrom.format('YYYY-MM-DD')} ${props.endAt}`),
      ];
    });

    const times = computed(() => {
      const res: Array<NTimePickerPanelOptionType> = [];
      if (props.dateType !== 'time') return res;

      const timeStep = Math.max(1, props.timeStep);

      for (
        let i = timeRange.value[0];
        i.isSameOrBefore(timeRange.value[1], 'hour');
        i = i.add(timeStep, 'minutes')
      ) {
        const rawLabel = i.format('HH:mm');

        res.push({
          label: props.formatCellText?.('time', rawLabel) || rawLabel,
          value: i,
          disabled:
            props.disabledTime?.(i, props.type) ||
            props.disabledBefore?.isSameOrAfter(i, 'minutes') ||
            props.disabledAfter?.isSameOrBefore(i, 'minutes') ||
            false,
        });
      }

      return res;
    });

    const hours = computed(() => {
      const res: Array<NTimePickerPanelOptionType> = [];
      if (props.dateType === 'time') return res;

      const hourStep = Math.max(1, props.hourStep);

      for (
        let i = timeRange.value[0];
        i.isSameOrBefore(timeRange.value[1], 'hour');
        i = i.add(hourStep, 'hour')
      ) {
        const hour = i.diff(timeRange.value[0], 'hours') + timeRange.value[0].hour();
        const rawLabel = hour.toString().padStart(2, '0');

        res.push({
          label: props.formatCellText?.('hours', rawLabel) || rawLabel,
          value: i,
          disabled:
            props.disabledTime?.(i, props.type) ||
            props.disabledBefore?.isAfter(i, 'hours') ||
            props.disabledAfter?.isBefore(i, 'hours') ||
            false,
        });
      }

      return res;
    });

    const minutes = computed(() => {
      const res: Array<NTimePickerPanelOptionType> = [];
      if (props.dateType === 'time') return res;

      const minuteStep = Math.max(1, props.minuteStep);

      for (let i = 0; i < 60; i += minuteStep) {
        const currDayjs = (currentHour.value ?? currentDayjs.value).set('minutes', i);
        const rawLabel = i.toString().padStart(2, '0');

        res.push({
          label: props.formatCellText?.('minutes', rawLabel) || rawLabel,
          value: currDayjs,
          disabled:
            props.disabledTime?.(currDayjs, props.type) ||
            (props.dateType === 'seconds'
              ? props.disabledBefore?.isAfter(currDayjs, 'minutes') ||
                props.disabledAfter?.isBefore(currDayjs, 'minutes')
              : props.disabledBefore?.isSameOrAfter(currDayjs, 'minutes') ||
                props.disabledAfter?.isSameOrBefore(currDayjs, 'minutes')) ||
            false,
        });
      }

      return res;
    });

    const seconds = computed(() => {
      const res: Array<NTimePickerPanelOptionType> = [];
      if (props.dateType !== 'seconds') return res;

      const secondStep = Math.max(1, props.secondStep);

      for (let i = 0; i < 60; i += secondStep) {
        const currDayjs = (currentMinute.value ?? currentDayjs.value).set('seconds', i);
        const rawLabel = i.toString().padStart(2, '0');

        res.push({
          label: props.formatCellText?.('seconds', rawLabel) || rawLabel,
          value: currDayjs,
          disabled:
            props.disabledTime?.(currDayjs, props.type) ||
            props.disabledBefore?.isSameOrAfter(currDayjs, 'seconds') ||
            props.disabledAfter?.isSameOrBefore(currDayjs, 'seconds') ||
            false,
        });
      }

      return res;
    });

    watch(
      () => props.panelVisible,
      val => {
        if (val) {
          updateCurrentTimeFromModelValue();
        }
      },
    );

    watch(() => props.modelValue, updateCurrentTimeFromModelValue);

    function onUpdateTime(val: Dayjs, triggerType: 'click' | 'input' | 'confirmable-input') {
      if (isDefined(val)) {
        triggerType === 'click' && parentEmit?.('pick', val, 'time');
        emit('update:modelValue', val, triggerType);
      }
    }

    function onUpdateTimeColumn(
      type: 'hour' | 'minute' | 'second',
      value: Dayjs,
      triggerType: 'click' | 'input' | 'confirmable-input',
    ) {
      switch (type) {
        case 'hour':
          currentHour.value = value;
          currentMinute.value = props.confirmRestTimeColumnWhenClickPrev
            ? minutes.value[0]?.value ?? undefined
            : undefined;
          currentSecond.value = props.confirmRestTimeColumnWhenClickPrev
            ? seconds.value[0]?.value ?? undefined
            : undefined;
          break;
        case 'minute':
          currentMinute.value = value;
          currentSecond.value = props.confirmRestTimeColumnWhenClickPrev
            ? seconds.value[0]?.value ?? undefined
            : undefined;
          break;
        case 'second':
          currentSecond.value = value;
          break;
      }

      triggerType === 'click' && parentEmit?.('pick', value, type);

      if (isDefined(currentHour.value) && isDefined(currentMinute.value)) {
        if (props.dateType === 'seconds' && !isDefined(currentSecond.value)) {
          return;
        } else {
          const emitValue = currentHour.value
            .set('minute', currentMinute.value?.minute() ?? 0)
            .set('seconds', currentSecond.value?.second() ?? 0);

          emit('update:modelValue', emitValue, triggerType);
        }
      }
    }

    function updateCurrentTimeFromModelValue() {
      currentTime.value = props.modelValue;
      currentHour.value = props.modelValue;
      currentMinute.value = props.modelValue;
      currentSecond.value = props.modelValue;
    }

    expose({
      updateCurrentTimeFromModelValue,
      clickTimeCell: (
        value: Dayjs,
        triggerType: 'click' | 'hover' | 'confirmable-input' = 'click',
      ) => {
        if (props.dateType === 'time') {
          timePanelDomRef.value?.clickTimeCell(value, triggerType);
        } else {
          if (props.dateType === 'minutes') {
            if (hourPanelDomRef.value?.clickTimeCell(value, triggerType)) {
              void nextTick(() => {
                minutePanelDomRef.value?.clickTimeCell(value, triggerType);
              });
            }
          } else {
            if (hourPanelDomRef.value?.clickTimeCell(value, triggerType)) {
              void nextTick(() => {
                if (minutePanelDomRef.value?.clickTimeCell(value, triggerType)) {
                  void nextTick(() => {
                    secondPanelDomRef.value?.clickTimeCell(value, triggerType);
                  });
                }
              });
            }
          }
        }
      },
    });

    return () => (
      <div class={cls(classHelper.e('time-panel'))}>
        {props.dateType === 'time' ? (
          <TimeColumnPanel
            ref={timePanelDomRef}
            modelValue={currentTime.value}
            options={times.value}
            unit="minute"
            optionListMaxHeight={props.optionListMaxHeight}
            panelVisible={props.panelVisible}
            showTimeTooltip={props.showTimeTooltip}
            panelType="time"
            previewTime={props.previewTime}
            tooltipShowAfter={props.tooltipShowAfter}
            tooltipHideAfter={props.tooltipHideAfter}
            onUpdate:modelValue={onUpdateTime}
            onUpdate:previewTime={val => emit('update:previewTime', val)}
          />
        ) : (
          <Fragment>
            <TimeColumnPanel
              ref={hourPanelDomRef}
              modelValue={currentHour.value}
              options={hours.value}
              unit="hour"
              optionListMaxHeight={props.optionListMaxHeight}
              panelVisible={props.panelVisible}
              showTimeTooltip={props.showTimeTooltip}
              panelType="hour"
              previewTime={props.previewTime}
              tooltipShowAfter={props.tooltipShowAfter}
              tooltipHideAfter={props.tooltipHideAfter}
              onUpdate:modelValue={(val, triggerType) =>
                onUpdateTimeColumn('hour', val, triggerType)
              }
              onUpdate:previewTime={val => emit('update:previewTime', val)}
            />
            <TimeColumnPanel
              ref={minutePanelDomRef}
              modelValue={currentMinute.value}
              options={minutes.value}
              unit="minute"
              optionListMaxHeight={props.optionListMaxHeight}
              panelVisible={props.panelVisible}
              showTimeTooltip={props.showTimeTooltip}
              panelType="minute"
              previewTime={props.previewTime}
              tooltipShowAfter={props.tooltipShowAfter}
              tooltipHideAfter={props.tooltipHideAfter}
              onUpdate:modelValue={(val, triggerType) =>
                onUpdateTimeColumn('minute', val, triggerType)
              }
              onUpdate:previewTime={val => emit('update:previewTime', val)}
            />
          </Fragment>
        )}
        {props.dateType === 'seconds' && (
          <TimeColumnPanel
            ref={secondPanelDomRef}
            modelValue={currentSecond.value}
            options={seconds.value}
            unit="second"
            optionListMaxHeight={props.optionListMaxHeight}
            panelVisible={props.panelVisible}
            showTimeTooltip={props.showTimeTooltip}
            panelType="second"
            previewTime={props.previewTime}
            tooltipShowAfter={props.tooltipShowAfter}
            tooltipHideAfter={props.tooltipHideAfter}
            onUpdate:modelValue={(val, triggerType) =>
              onUpdateTimeColumn('second', val, triggerType)
            }
            onUpdate:previewTime={val => emit('update:previewTime', val)}
          />
        )}
      </div>
    );
  },
});
