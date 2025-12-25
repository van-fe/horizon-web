import { computed, inject } from 'vue';
import type { DatePickerDatePanelComponentsProps } from '../composables/useProps';
import type { Dayjs } from 'dayjs';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock } from '@aurora/utils';
import {
  NDatePickerEmitsInjectKey,
  NDatePickerFormatInjectKey,
  NDatePickerPropsInjectKey,
} from '../utils/injectKeys';
import dayjs from '~/utils/useDayJs';
import type { DatePickerTimePanelComponentsEmits } from '../composables/useEmits';
import type { DatePickerDatePanelComponentExposes } from '../composables/useExposes';
import { transformWeekPickedDate } from './useData';

export default function useDateCell(
  props: DatePickerDatePanelComponentsProps,
  panelType: 'day' | 'month' | 'year',
  context: HorizonWebSetupContext<
    DatePickerTimePanelComponentsEmits,
    {},
    DatePickerDatePanelComponentExposes
  >,
) {
  const classHelper = new ComponentClassBlock('date-picker-panel-body');

  const parentProps = inject(NDatePickerPropsInjectKey)!;
  const pickerType = inject(NDatePickerFormatInjectKey)!;

  const dayjsUnit = computed(() => (panelType === 'day' ? 'date' : panelType));

  const panelFirstDate = computed(() => {
    switch (panelType) {
      default:
      case 'day':
        return props.panelShowDate.startOf('month');
      case 'month':
        return props.panelShowDate.startOf('year');
      case 'year':
        const currYear = props.panelShowDate.year();
        const firstYear = currYear - (currYear % 10) - 1;
        return dayjs().set('year', firstYear).startOf('year');
    }
  });

  const panelLastDate = computed(() => {
    switch (panelType) {
      default:
      case 'day':
        return props.panelShowDate.endOf('month');
      case 'month':
        return props.panelShowDate.endOf('year');
      case 'year':
        return panelFirstDate.value.add(12, 'year').endOf('year');
    }
  });

  const startEndRange = computed(() => {
    if (props.isRange) {
      if (props.startDate && (props.endDate || props.previewDate)) {
        return [props.startDate, props.endDate || props.previewDate].sort((a, b) =>
          a!.isAfter(b) ? 1 : -1,
        );
      }
    }

    if (pickerType.value === 'week') {
      if (props.startDate) {
        const firstDate = transformWeekPickedDate(props.startDate, parentProps.firstDayOfWeek);

        return [firstDate, firstDate.add(6, 'days')];
      }
    }

    return undefined;
  });

  function isInRange(val: Dayjs) {
    if (startEndRange.value) {
      return (
        val.isSameOrAfter(startEndRange.value[0], dayjsUnit.value) &&
        val.isSameOrBefore(startEndRange.value[1], dayjsUnit.value)
      );
    }

    return false;
  }

  function activeClassName(val: Dayjs) {
    if (props.isRange) {
      if (startEndRange.value && startEndRange.value[0] && startEndRange.value[1]) {
        return startEndRange.value[0].isSame(val, dayjsUnit.value) &&
          startEndRange.value[1].isSame(val, dayjsUnit.value)
          ? [classHelper.is('start-active'), classHelper.is('end-active')]
          : val.isSame(startEndRange.value[0], dayjsUnit.value)
            ? [classHelper.is('start-active')]
            : val.isSame(startEndRange.value[1], dayjsUnit.value)
              ? [classHelper.is('end-active')]
              : [];
      }
    }

    if (pickerType.value === 'week') {
      if (startEndRange.value) {
        if (val.isSame(startEndRange.value[0], 'date')) {
          return [classHelper.is('start-active')];
        } else if (val.isSame(startEndRange.value[1], 'date')) {
          return [classHelper.is('end-active')];
        }
      }

      return [];
    }

    return props.startDate && val.isSame(props.startDate, dayjsUnit.value)
      ? [classHelper.is('active')]
      : [];
  }

  function isDisabled(date: Dayjs) {
    if (props.disabledBefore && date.isBefore(panelFirstDate.value, dayjsUnit.value)) {
      return true;
    }

    if (props.disabledAfter && date.isAfter(panelFirstDate.value, dayjsUnit.value)) {
      return true;
    }

    return !!parentProps.disabledDate?.(date);
  }

  function handleClickDateCell(
    date: Dayjs,
    triggerType: 'click' | 'input' = 'click',
    type?: 'start' | 'end',
  ) {
    if (isDisabled(date)) {
      return;
    }

    if (pickerType.value === 'week') {
      const firstDayOfWeek = transformWeekPickedDate(date, parentProps.firstDayOfWeek);

      context.emit('clickDateCell', firstDayOfWeek, triggerType, type);
    } else {
      context.emit('clickDateCell', date, triggerType, type);
    }

    if (
      date.isBefore(panelFirstDate.value, dayjsUnit.value) ||
      date.isAfter(panelLastDate.value, dayjsUnit.value)
    ) {
      context.emit('update:panelShowDate', date);
    }
  }

  function handleHoverDateCell(date: Dayjs) {
    if (isDisabled(date)) {
      return;
    }

    if (pickerType.value === 'week') {
      context.emit('hoverDateCell', transformWeekPickedDate(date, parentProps.firstDayOfWeek));
    } else {
      context.emit('hoverDateCell', date);
    }
  }

  context.expose({
    clickDateCell: handleClickDateCell,
  });

  return {
    startEndRange,
    panelFirstDate,
    panelLastDate,
    isInRange,
    activeClassName,
    isDisabled,
    handleClickDateCell,
    handleHoverDateCell,
  };
}
