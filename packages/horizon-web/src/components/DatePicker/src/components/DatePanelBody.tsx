import { computed, defineComponent, inject, ref } from 'vue';
import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock } from '@aurora/utils';
import type { DatePickerDatePanelProps } from '../composables/useProps';
import { useDatePickerDatePanelProps } from '../composables/useProps';
import YearPanel from './DatePanelComponents/YearPanel';
import type { DatePickerDatePanelEmits } from '../composables/useEmits';
import { useDatePickerDatePanelEmit } from '../composables/useEmits';
import MonthPanel from './DatePanelComponents/MonthPanel';
import DayPanel from './DatePanelComponents/DayPanel';
import type { Dayjs } from 'dayjs';
import {
  HDatePickerEmitsInjectKey,
  HDatePickerFormatInjectKey,
  HDatePickerPanelVisibleInjectKey,
  HDatePickerPropsInjectKey,
} from '../utils/injectKeys';
import TimePanel from '~/components/TimePicker/src/components/TimePanel';
import { getTimePanelTypeByType } from '../hooks/usePanel';
import type {
  DatePickerDatePanelBodyExposes,
  DatePickerDatePanelComponentExposes,
} from '../composables/useExposes';
import { useDatePickerDatePanelBodyExposes } from '../composables/useExposes';
import type { TimePickerTimePanelExposes } from '~/components/TimePicker/src/composables/useExposes';
import { sortDayjs } from '../utils/useDayjs';

export default defineComponent({
  name: 'DatePanelBody',
  props: useDatePickerDatePanelProps,
  emits: useDatePickerDatePanelEmit,
  exposes: useDatePickerDatePanelBodyExposes,
  setup(
    props: DatePickerDatePanelProps,
    {
      emit,
      expose,
    }: HorizonWebSetupContext<DatePickerDatePanelEmits, {}, DatePickerDatePanelBodyExposes>,
  ) {
    const classHelper = new ComponentClassBlock('date-picker-panel-body');

    const yearDomRef =
      ref<HorizonWebComponentInstance<typeof YearPanel, DatePickerDatePanelComponentExposes>>();
    const monthDomRef =
      ref<HorizonWebComponentInstance<typeof MonthPanel, DatePickerDatePanelComponentExposes>>();
    const dayDomRef =
      ref<HorizonWebComponentInstance<typeof DayPanel, DatePickerDatePanelComponentExposes>>();
    const timePanelDomRef =
      ref<HorizonWebComponentInstance<typeof TimePanel, TimePickerTimePanelExposes>>();

    const parentProps = inject(HDatePickerPropsInjectKey)!;
    const parentEmits = inject(HDatePickerEmitsInjectKey)!;
    const panelVisible = inject(HDatePickerPanelVisibleInjectKey)!;
    const pickerType = inject(HDatePickerFormatInjectKey)!;

    const currentShowDate = computed(() =>
      props.type === 'end' ? props.endPanelShowDate : props.startPanelShowDate,
    );

    function onUpdateDate(
      vals: [Dayjs | undefined | null, Dayjs | undefined | null],
      inputDate: Dayjs,
      triggerType: 'click' | 'input',
    ) {
      switch (props.pickerType) {
        case 'year':
          if (['year', 'year-range'].includes(pickerType.value)) {
            emit('update:date', vals, triggerType);
          } else {
            emit('update:panelShowDate', inputDate);
            emit('update:pickerType', 'month');
          }
          break;
        case 'month':
          if (['month', 'month-range'].includes(pickerType.value)) {
            emit('update:date', vals, triggerType);
          } else {
            emit('update:panelShowDate', inputDate);
            emit('update:pickerType', 'day');
          }
          break;
        default:
          emit('update:date', vals, triggerType);
          break;
      }

      if (triggerType === 'click') {
        parentEmits('pick', props.isRange ? vals.sort(sortDayjs) : vals[0]);
      }
    }

    function handleClickDateCell(
      date: Dayjs,
      triggerType: 'click' | 'input',
      type?: 'start' | 'end',
    ) {
      if (props.isRange) {
        if (type) {
          onUpdateDate(
            type === 'start' ? [date, props.endDate] : [props.startDate, date],
            date,
            triggerType,
          );
        } else if (!!props.startDate && !!props.endDate) {
          onUpdateDate([date, undefined], date, triggerType);
        } else if (!props.startDate) {
          onUpdateDate([date, props.endDate], date, triggerType);
        } else {
          onUpdateDate([props.startDate, date], date, triggerType);
        }
      } else {
        onUpdateDate([date, undefined], date, triggerType);
      }
    }

    function handleClickTimeCell(
      time: Dayjs,
      triggerType: 'click' | 'input' | 'confirmable-input' = 'click',
    ) {
      if (props.isRange) {
        if (!!props.startTime && !!props.endTime) {
          emit('update:time', [time, undefined], triggerType);
        } else if (!props.startTime) {
          emit('update:time', [time, props.endTime], triggerType);
        } else {
          emit('update:time', [props.startTime, time], triggerType);
        }
      } else {
        emit('update:time', [time, undefined], triggerType);
      }
    }

    function handleHoverDateCell(date: Dayjs | undefined) {
      emit('update:previewDate', date);
    }

    expose({
      clickDateCell: (
        date: Dayjs,
        triggerType: 'click' | 'input' = 'click',
        type?: 'start' | 'end',
      ) => {
        switch (props.pickerType) {
          case 'year':
            yearDomRef.value?.clickDateCell(date, triggerType, type);
            break;
          case 'month':
            monthDomRef.value?.clickDateCell(date, triggerType, type);
            break;
          case 'day':
            dayDomRef.value?.clickDateCell(date, triggerType, type);
            break;
        }
      },
      clickTimeCell: (
        date: Dayjs,
        triggerType: 'click' | 'input' | 'confirmable-input' = 'click',
      ) => {
        timePanelDomRef.value?.clickTimeCell(date, triggerType);
      },
    });

    const dateItemsRender = () => {
      switch (props.pickerType) {
        case 'year':
          return (
            <YearPanel
              ref={yearDomRef}
              startDate={props.startDate}
              endDate={props.endDate}
              previewDate={props.previewDate}
              panelShowDate={currentShowDate.value}
              type={props.type}
              pickerType={props.pickerType}
              isRange={props.isRange}
              onUpdate:panelShowDate={val => emit('update:panelShowDate', val)}
              onClickDateCell={handleClickDateCell}
              onHoverDateCell={handleHoverDateCell}
            />
          );
        case 'month':
          return (
            <MonthPanel
              ref={monthDomRef}
              startDate={props.startDate}
              endDate={props.endDate}
              previewDate={props.previewDate}
              panelShowDate={currentShowDate.value}
              type={props.type}
              pickerType={props.pickerType}
              isRange={props.isRange}
              onUpdate:panelShowDate={val => emit('update:panelShowDate', val)}
              onClickDateCell={handleClickDateCell}
              onHoverDateCell={handleHoverDateCell}
            />
          );
        default:
          return (
            <div class={classHelper.e('panel-container')}>
              <DayPanel
                ref={dayDomRef}
                startDate={props.startDate}
                endDate={props.endDate}
                previewDate={props.previewDate}
                panelShowDate={currentShowDate.value}
                type={props.type}
                pickerType={props.pickerType}
                isRange={props.isRange}
                onUpdate:panelShowDate={val => emit('update:panelShowDate', val)}
                onClickDateCell={handleClickDateCell}
                onHoverDateCell={handleHoverDateCell}
              />
              {['datetime', 'date-minutes', 'date-seconds'].includes(pickerType.value) ? (
                <TimePanel
                  ref={timePanelDomRef}
                  class={classHelper.e('panel-container-time-panel')}
                  modelValue={props.startTime}
                  dateType={getTimePanelTypeByType(pickerType.value)}
                  timeStep={parentProps.timeStep}
                  hourStep={parentProps.hourStep}
                  minuteStep={parentProps.minuteStep}
                  secondStep={parentProps.secondStep}
                  startAt={parentProps.timeStartAt}
                  endAt={parentProps.timeEndAt}
                  optionListMaxHeight={parentProps.optionListMaxHeight}
                  formatCellText={parentProps.formatTimeCellText}
                  disabledTime={parentProps.disabledTime}
                  panelVisible={panelVisible.value}
                  showTimeTooltip={parentProps.showTimeTooltip}
                  tooltipShowAfter={parentProps.tooltipShowAfter}
                  tooltipHideAfter={parentProps.tooltipHideAfter}
                  previewTime={props.previewTime}
                  confirmRestTimeColumnWhenClickPrev={true}
                  onUpdate:modelValue={handleClickTimeCell}
                  onUpdate:previewTime={val => emit('update:previewTime', val)}
                />
              ) : undefined}
            </div>
          );
      }
    };

    return () => (
      <div class={cls(classHelper.block, classHelper.is(props.type))}>
        <div class={classHelper.e('inner')}>{dateItemsRender()}</div>
      </div>
    );
  },
});
