import { defineComponent, inject, ref } from 'vue';
import { useDatePickerV2DatePanelProps } from '../composables/useProps';
import type { LegoComponentInstance, LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import DatePanelHeader from './DatePanelHeader';
import type { DatePickerV2DatePanelEmits } from '../composables/useEmits';
import { useDatePickerV2DatePanelEmit } from '../composables/useEmits';
import DatePanelBody from './DatePanelBody';
import type {
  DatePickerV2DatePanelBodyExposes,
  DatePickerV2DatePanelExposes,
  DatePickerV2DatePanelHeaderExposes,
} from '../composables/useExposes';
import { useDatePickerV2DatePanelExposes } from '../composables/useExposes';
import type { Dayjs } from 'dayjs';
import { NDatePickerV2PropsInjectKey } from '../utils/injectKeys';

export default defineComponent({
  name: 'DatePanel',
  props: useDatePickerV2DatePanelProps,
  emits: useDatePickerV2DatePanelEmit,
  exposes: useDatePickerV2DatePanelExposes,
  setup(
    props,
    {
      emit,
      expose,
    }: LegoSetupContext<DatePickerV2DatePanelEmits, {}, DatePickerV2DatePanelExposes>,
  ) {
    const classHelper = new ComponentClassBlock('date-picker-v2');

    const parentProps = inject(NDatePickerV2PropsInjectKey)!;

    const datePanelHeaderDomRef =
      ref<LegoComponentInstance<typeof DatePanelHeader, DatePickerV2DatePanelHeaderExposes>>();

    const datePanelBodyDomRef =
      ref<LegoComponentInstance<typeof DatePanelBody, DatePickerV2DatePanelBodyExposes>>();

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
