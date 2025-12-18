import { defineComponent, inject, ref } from 'vue';
import type { LegoComponentInstance, LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import type { DatePickerDatetimeTriggerHeaderProps } from '../composables/useProps';
import { useDatePickerDatetimeTriggerHeaderProps } from '../composables/useProps';
import NInput from '~/components/Input/src/Input';
import NTimePicker from '~/components/TimePicker/src/TimePicker';
import { getTimePanelTypeByType } from '../hooks/usePanel';
import {
  NDatePickerFormatInjectKey,
  NDatePickerPropsInjectKey,
  NDatePickerValueFormatMappingInjectKey,
} from '../utils/injectKeys';
import type { Dayjs } from 'dayjs';
import type { DatePickerDatePanelHeaderExposes } from '../composables/useExposes';
import { useDatePickerDatePanelHeaderExposes } from '../composables/useExposes';
import type { TimePickerExposes } from '~/components/TimePicker/src/composables/useExposes';
import type { DatePickerDatePanelTriggerHeaderEmits } from '../composables/useEmits';
import { useDatePickerDatePanelTriggerHeaderEmit } from '../composables/useEmits';

export default defineComponent({
  name: 'DatetimeTriggerHeader',
  props: useDatePickerDatetimeTriggerHeaderProps,
  emits: useDatePickerDatePanelTriggerHeaderEmit,
  exposes: useDatePickerDatePanelHeaderExposes,
  setup(
    props: DatePickerDatetimeTriggerHeaderProps,
    {
      emit,
      expose,
    }: LegoSetupContext<
      DatePickerDatePanelTriggerHeaderEmits,
      {},
      DatePickerDatePanelHeaderExposes
    >,
  ) {
    const classHelper = new ComponentClassBlock('date-picker-panel-header');

    const timePickerDomRef =
      ref<LegoComponentInstance<typeof NTimePicker, TimePickerExposes>>();

    const parentProps = inject(NDatePickerPropsInjectKey)!;
    const valueFormatMapping = inject(NDatePickerValueFormatMappingInjectKey)!;
    const pickerType = inject(NDatePickerFormatInjectKey)!;

    expose({
      clickTimeCell: (
        time: Dayjs,
        triggerType: 'click' | 'input' | 'confirmable-input' = 'click',
      ) => {
        timePickerDomRef.value?.clickTimeCell(time, triggerType);
      },
    });

    return () => (
      <div class={cls(classHelper.e('datetime-trigger'))}>
        <NInput
          modelValue={props.date?.format(valueFormatMapping.value.date)}
          readonly
          placeholder={props.datePlaceholder}
        />
        <NTimePicker
          ref={timePickerDomRef}
          previewTime={props.previewTime}
          prefixIcon={false}
          clearable={false}
          class={classHelper.e('panel-container-time-panel')}
          modelValue={props.time}
          placeholder={props.timePlaceholder}
          type={getTimePanelTypeByType(pickerType.value)}
          timeStep={parentProps.timeStep}
          hourStep={parentProps.hourStep}
          minuteStep={parentProps.minuteStep}
          secondStep={parentProps.secondStep}
          startAt={parentProps.timeStartAt}
          endAt={parentProps.timeEndAt}
          optionListMaxHeight={parentProps.optionListMaxHeight}
          formatCellText={parentProps.formatTimeCellText}
          disabledTime={
            props.type === 'start' ? parentProps.beginDisabledTime : parentProps.endDisabledTime
          }
          toBody={false}
          pickerMinWidth="fit-content"
          preserveSuffixIconSpace={false}
          showTimeTooltip={parentProps.showTimeTooltip}
          hoverToDisplayValue={parentProps.hoverToDisplayValue}
          tooltipShowAfter={parentProps.tooltipShowAfter}
          tooltipHideAfter={parentProps.tooltipHideAfter}
          confirmType={parentProps.timePickerConfirmType}
          fitInputWidth={
            ['datetime-range', 'date-minutes-range'].includes(pickerType.value)
              ? true
              : 'fit-content'
          }
          panelMinWidth={
            ['datetime-range', 'date-minutes-range'].includes(pickerType.value) ? 'auto' : undefined
          }
          panelMaxWidth="auto"
          onUpdate:modelValue={(val, triggerType) =>
            emit('update:time', val as Dayjs | undefined | null, triggerType)
          }
          onUpdate:previewTime={val => emit('update:previewTime', val)}
        />
      </div>
    );
  },
});
