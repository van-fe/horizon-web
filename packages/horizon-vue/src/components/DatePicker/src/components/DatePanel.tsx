import { defineComponent, inject, ref } from 'vue';
import { useDatePickerDatePanelProps } from '../composables/useProps';
import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock } from '@aurora/utils';
import DatePanelHeader from './DatePanelHeader';
import type { DatePickerDatePanelEmits } from '../composables/useEmits';
import { useDatePickerDatePanelEmit } from '../composables/useEmits';
import DatePanelBody from './DatePanelBody';
import type {
  DatePickerDatePanelBodyExposes,
  DatePickerDatePanelExposes,
  DatePickerDatePanelHeaderExposes,
} from '../composables/useExposes';
import { useDatePickerDatePanelExposes } from '../composables/useExposes';
import type { Dayjs } from 'dayjs';
import { HDatePickerPropsInjectKey } from '../utils/injectKeys';

export default defineComponent({
  name: 'DatePanel',
  props: useDatePickerDatePanelProps,
  emits: useDatePickerDatePanelEmit,
  exposes: useDatePickerDatePanelExposes,
  setup(
    props,
    {
      emit,
      expose,
    }: HorizonWebSetupContext<DatePickerDatePanelEmits, {}, DatePickerDatePanelExposes>,
  ) {
    const classHelper = new ComponentClassBlock('date-picker');

    const parentProps = inject(HDatePickerPropsInjectKey)!;

    const datePanelHeaderDomRef =
      ref<HorizonWebComponentInstance<typeof DatePanelHeader, DatePickerDatePanelHeaderExposes>>();

    const datePanelBodyDomRef =
      ref<HorizonWebComponentInstance<typeof DatePanelBody, DatePickerDatePanelBodyExposes>>();

    expose({
      clickDateCell: (
        date: Dayjs,
        triggerType: 'click' | 'input' = 'click',
        type?: 'start' | 'end',
      ) => {
        datePanelBodyDomRef.value?.clickDateCell(date, triggerType, type);
      },
      clickTimeCell: (
        date: Dayjs,
        triggerType: 'click' | 'input' | 'confirmable-input' = 'click',
        type?: 'start' | 'end',
      ) => {
        if (props.isRange) {
          datePanelHeaderDomRef.value?.clickTimeCell(date, triggerType, type);
        } else {
          datePanelBodyDomRef.value?.clickTimeCell(date, triggerType, type);
        }
      },
    });

    return () => (
      <div class={cls(classHelper.e('date-panel'))}>
        {parentProps.showHeader && (
          <DatePanelHeader
            ref={datePanelHeaderDomRef}
            startDate={props.startDate}
            endDate={props.endDate}
            startTime={props.startTime}
            endTime={props.endTime}
            previewDate={props.previewDate}
            startPanelShowDate={props.startPanelShowDate}
            endPanelShowDate={props.endPanelShowDate}
            pickerType={props.pickerType}
            type={props.type}
            isRange={props.isRange}
            onUpdate:pickerType={val => emit('update:pickerType', val)}
            onUpdate:panelShowDate={date => emit('update:panelShowDate', date)}
            onUpdate:time={(times, triggerType) => emit('update:time', times, triggerType)}
            onUpdate:previewTime={time => emit('update:previewTime', time)}
          />
        )}
        <DatePanelBody
          ref={datePanelBodyDomRef}
          startDate={props.startDate}
          endDate={props.endDate}
          startTime={props.startTime}
          endTime={props.endTime}
          previewDate={props.previewDate}
          startPanelShowDate={props.startPanelShowDate}
          endPanelShowDate={props.endPanelShowDate}
          pickerType={props.pickerType}
          type={props.type}
          isRange={props.isRange}
          onUpdate:pickerType={val => emit('update:pickerType', val)}
          onUpdate:panelShowDate={date => emit('update:panelShowDate', date)}
          onUpdate:date={(dates, triggerType) => emit('update:date', dates, triggerType)}
          onUpdate:time={(times, triggerType) => emit('update:time', times, triggerType)}
          onUpdate:previewDate={date => emit('update:previewDate', date)}
          onUpdate:previewTime={time => emit('update:previewTime', time)}
        />
      </div>
    );
  },
});
