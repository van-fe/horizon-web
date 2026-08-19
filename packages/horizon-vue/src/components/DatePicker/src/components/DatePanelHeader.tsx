import { computed, defineComponent, inject, Fragment, ref } from 'vue';
import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock } from '@aurora/utils';
import {
  HDatePickerDateSwitcherShowFormatMappingMappingInjectKey,
  HDatePickerFormatInjectKey,
  HDatePickerPropsInjectKey,
} from '../utils/injectKeys';
import DatetimeTriggerHeader from './DatetimeTriggerHeader';
import { IconArrowLeft, IconArrowRight, IconToggleLeft, IconToggleRight } from '@aurora/icon';
import type { DatePickerDatePanelProps } from '../composables/useProps';
import { useDatePickerDatePanelProps } from '../composables/useProps';
import type { DatePickerDatePanelEmits } from '../composables/useEmits';
import { useDatePickerDatePanelEmit } from '../composables/useEmits';
import type { Dayjs, ManipulateType } from 'dayjs';
import useLocaleLang from '~/utils/useLocaleLang';
import type { DatePickerDatePanelHeaderExposes } from '../composables/useExposes';
import { useDatePickerDatePanelHeaderExposes } from '../composables/useExposes';

export default defineComponent({
  name: 'DatePanelHeader',
  props: useDatePickerDatePanelProps,
  emits: useDatePickerDatePanelEmit,
  exposes: useDatePickerDatePanelHeaderExposes,
  setup(
    props: DatePickerDatePanelProps,
    {
      emit,
      expose,
    }: HorizonWebSetupContext<DatePickerDatePanelEmits, {}, DatePickerDatePanelHeaderExposes>,
  ) {
    const classHelper = new ComponentClassBlock('date-picker-panel-header');

    const triggerHeaderDomRef =
      ref<
        HorizonWebComponentInstance<typeof DatetimeTriggerHeader, DatePickerDatePanelHeaderExposes>
      >();

    const parentProps = inject(HDatePickerPropsInjectKey)!;
    const switcherShowFormatMapping = inject(
      HDatePickerDateSwitcherShowFormatMappingMappingInjectKey,
    )!;
    const pickerType = inject(HDatePickerFormatInjectKey)!;

    const currentShowDate = computed(() =>
      props.type === 'end' ? props.endPanelShowDate : props.startPanelShowDate,
    );

    const isDateSwitcherDisabled = computed(() => {
      let unit: ManipulateType;

      switch (props.pickerType) {
        case 'year':
        case 'month':
          unit = 'year';
          break;
        case 'day':
          unit = 'month';
      }

      if (props.type === 'end') {
        return props.startPanelShowDate.isSame(currentShowDate.value.subtract(1, unit), unit);
      }

      if (props.type === 'start') {
        return props.endPanelShowDate.isSame(currentShowDate.value.add(1, unit), unit);
      }

      return false;
    });

    function switchPanelPickerType(type: 'year' | 'month') {
      emit('update:pickerType', type);
    }

    function modifyPanelDate(amount: number, further = false) {
      if (amount < 0) {
        if (props.type === 'end' && isDateSwitcherDisabled.value) {
          return;
        }
      } else {
        if (props.type === 'start' && isDateSwitcherDisabled.value) {
          return;
        }
      }

      switch (props.pickerType) {
        case 'year':
          emit('update:panelShowDate', currentShowDate.value.add(amount * 10, 'year'));
          break;
        case 'month':
          emit('update:panelShowDate', currentShowDate.value.add(amount, 'year'));
          break;
        default:
          emit(
            'update:panelShowDate',
            currentShowDate.value.add(amount, further ? 'year' : 'month'),
          );
          break;
      }
    }

    function handleClickTimeCell(
      time: Dayjs | undefined | null,
      triggerType: 'click' | 'input' | 'confirmable-input' = 'click',
    ) {
      if (props.isRange) {
        if (props.type === 'start') {
          emit('update:time', [time, props.endTime], triggerType);
        } else {
          emit('update:time', [props.startTime, time], triggerType);
        }
      } else {
        emit('update:time', [time, undefined], triggerType);
      }
    }

    const dateValueShowRender = () => {
      switch (props.pickerType) {
        case 'year':
          const currYear = currentShowDate.value.year();
          const firstYear = currYear - (currYear % 10);
          return (
            <div class={cls(classHelper.em('switcher', 'item'), classHelper.is('readonly'))}>
              {firstYear} - {firstYear + 9}
            </div>
          );
        case 'month':
          return (
            <div
              class={classHelper.em('switcher', 'item')}
              onClick={() => switchPanelPickerType('year')}
            >
              {currentShowDate.value.year()}
            </div>
          );
        default:
          return (
            <Fragment>
              {switcherShowFormatMapping.value['year-month'].map(format =>
                format === ' ' ? (
                  <span>&nbsp;</span>
                ) : (
                  <div
                    class={classHelper.em('switcher', 'item')}
                    onClick={() => switchPanelPickerType(format.includes('M') ? 'month' : 'year')}
                  >
                    {currentShowDate.value.format(format)}
                  </div>
                ),
              )}
            </Fragment>
          );
      }
    };

    expose({
      clickTimeCell: (
        time: Dayjs,
        triggerType: 'click' | 'input' | 'confirmable-input' = 'click',
      ) => {
        triggerHeaderDomRef.value?.clickTimeCell(time, triggerType);
      },
    });

    return () => (
      <div class={cls(classHelper.block, classHelper.is(props.type))}>
        {['datetime-range', 'date-minutes-range', 'date-seconds-range'].includes(
          pickerType.value,
        ) && (
          <DatetimeTriggerHeader
            ref={triggerHeaderDomRef}
            date={props.type === 'start' ? props.startDate : props.endDate}
            time={props.type === 'start' ? props.startTime : props.endTime}
            datePlaceholder={
              props.type === 'start'
                ? (useLocaleLang('datePicker.startDate').value as string)
                : (useLocaleLang('datePicker.endDate').value as string)
            }
            timePlaceholder={
              props.type === 'start'
                ? (useLocaleLang('datePicker.startTime').value as string)
                : (useLocaleLang('datePicker.endTime').value as string)
            }
            disabledBefore={props.startTime}
            disabledAfter={props.endTime}
            type={props.type === 'start' ? 'start' : 'end'}
            previewTime={props.previewTime}
            onUpdate:time={handleClickTimeCell}
            onUpdate:previewTime={val => emit('update:previewTime', val)}
          />
        )}
        <div class={classHelper.e('inner')}>
          <div class={classHelper.em('inner', 'left')}>
            <div
              class={cls(
                classHelper.e('switcher'),
                classHelper.is('date-switcher'),
                classHelper.is('hidden', props.type === 'end' && parentProps.isLinkPanels),
              )}
            >
              {(parentProps.showYearButton || props.pickerType !== 'day') && (
                <div
                  class={cls(
                    classHelper.em('switcher', 'item'),
                    classHelper.is(
                      'disabled',
                      props.type === 'end' && isDateSwitcherDisabled.value,
                    ),
                  )}
                  onClick={() => modifyPanelDate(-1, true)}
                >
                  <IconToggleLeft size={16} />
                </div>
              )}
              <div
                v-show={!['year', 'month'].includes(props.pickerType)}
                class={cls(
                  classHelper.em('switcher', 'item'),
                  classHelper.is('disabled', props.type === 'end' && isDateSwitcherDisabled.value),
                )}
                onClick={() => modifyPanelDate(-1)}
              >
                <IconArrowLeft size={16} />
              </div>
            </div>
          </div>
          <div class={classHelper.em('inner', 'center')}>
            <div class={cls(classHelper.e('switcher'), classHelper.is('date-type-switcher'))}>
              {dateValueShowRender()}
            </div>
          </div>
          <div class={classHelper.em('inner', 'right')}>
            <div
              class={cls(
                classHelper.e('switcher'),
                classHelper.is('date-switcher'),
                classHelper.is('hidden', props.type === 'start' && parentProps.isLinkPanels),
              )}
            >
              <div
                v-show={!['year', 'month'].includes(props.pickerType)}
                class={cls(
                  classHelper.em('switcher', 'item'),
                  classHelper.is(
                    'disabled',
                    props.type === 'start' && isDateSwitcherDisabled.value,
                  ),
                )}
                onClick={() => modifyPanelDate(1)}
              >
                <IconArrowRight size={16} />
              </div>

              {(parentProps.showYearButton || props.pickerType !== 'day') && (
                <div
                  class={cls(
                    classHelper.em('switcher', 'item'),
                    classHelper.is(
                      'disabled',
                      props.type === 'start' && isDateSwitcherDisabled.value,
                    ),
                  )}
                  onClick={() => modifyPanelDate(1, true)}
                >
                  <IconToggleRight size={16} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
