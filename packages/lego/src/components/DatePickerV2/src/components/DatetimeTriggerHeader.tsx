import { defineComponent, inject, ref } from 'vue';
import type { LegoComponentInstance, LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import type { DatePickerV2DatetimeTriggerHeaderProps } from '../composables/useProps';
import { useDatePickerV2DatetimeTriggerHeaderProps } from '../composables/useProps';
import NInput from '~/components/Input/src/Input';
import NTimePickerV2 from '~/components/TimePickerV2/src/TimePickerV2';
import { getTimePanelTypeByType } from '../hooks/usePanel';
import {
  NDatePickerV2FormatInjectKey,
  NDatePickerV2PropsInjectKey,
  NDatePickerV2ValueFormatMappingInjectKey,
} from '../utils/injectKeys';
import type { Dayjs } from 'dayjs';
import type { DatePickerV2DatePanelHeaderExposes } from '../composables/useExposes';
import { useDatePickerV2DatePanelHeaderExposes } from '../composables/useExposes';
import type { TimePickerV2Exposes } from '~/components/TimePickerV2/src/composables/useExposes';
import type { DatePickerV2DatePanelTriggerHeaderEmits } from '../composables/useEmits';
import { useDatePickerV2DatePanelTriggerHeaderEmit } from '../composables/useEmits';

export default defineComponent({
  name: 'DatetimeTriggerHeader',
  props: useDatePickerV2DatetimeTriggerHeaderProps,
  emits: useDatePickerV2DatePanelTriggerHeaderEmit,
  exposes: useDatePickerV2DatePanelHeaderExposes,
  setup(
    props: DatePickerV2DatetimeTriggerHeaderProps,
    {
      emit,
      expose,
    }: LegoSetupContext<
      DatePickerV2DatePanelTriggerHeaderEmits,
      {},
      DatePickerV2DatePanelHeaderExposes
    >,
  ) {
    const classHelper = new ComponentClassBlock('date-picker-v2-panel-header');

    const timePickerDomRef =
      ref<LegoComponentInstance<typeof NTimePickerV2, TimePickerV2Exposes>>();

    const parentProps = inject(NDatePickerV2PropsInjectKey)!;
    const valueFormatMapping = inject(NDatePickerV2ValueFormatMappingInjectKey)!;
    const pickerType = inject(NDatePickerV2FormatInjectKey)!;

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
        <NTimePickerV2
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
