import type { ToRefs, Ref, ComputedRef } from 'vue';
import { watch, ref, computed } from 'vue';
import type { DatePickerProps } from '../composables/useProps';
import dayjs from '~/utils/useDayJs';
import type { Dayjs, ManipulateType } from 'dayjs';
import type { TimePickerProps } from '~/components/TimePicker/src/composables/useProps';
import type { HDatePickerBaseSupportType } from '../utils/types';

export function getDayjsUnitByType(type: HDatePickerBaseSupportType) {
  switch (type) {
    case 'year':
    case 'year-range':
      return 'year';
    case 'month':
    case 'month-range':
      return 'month';
    default:
      return 'date';
  }
}

export function getTimePanelTypeByType(
  type: HDatePickerBaseSupportType,
): TimePickerProps['type'] {
  switch (type) {
    case 'datetime':
    case 'datetime-range':
    default:
      return 'time';
    case 'date-minutes':
    case 'date-minutes-range':
      return 'minutes';
    case 'date-seconds':
    case 'date-seconds-range':
      return 'seconds';
  }
}

export default function usePanel(
  propRefs: ToRefs<DatePickerProps>,
  options: {
    isRange: ComputedRef<boolean>;
    startDate: Ref<Dayjs | undefined | null>;
    endDate: Ref<Dayjs | undefined | null>;
    visible: Ref<boolean>;
    pickerType: ComputedRef<HDatePickerBaseSupportType>;
  },
) {
  const startPickerType = ref<'year' | 'month' | 'day'>('day');
  const startPanelShowDate = ref(dayjs());
  const endPickerType = ref<'year' | 'month' | 'day'>('day');
  const endPanelShowDate = ref(dayjs().add(1, 'month'));

  const showBeforeAfterDate = computed(() =>
    ['year', 'yearRange', 'week'].includes(options.pickerType.value)
      ? true
      : propRefs.showBeforeAfterDate.value,
  );

  const customShowDate = computed<[Dayjs, Dayjs] | undefined>(() =>
    propRefs.panelShowDate?.value
      ? Array.isArray(propRefs.panelShowDate.value)
        ? (propRefs.panelShowDate.value.map(curr => dayjs(curr)) as [Dayjs, Dayjs])
        : [dayjs(propRefs.panelShowDate.value), dayjs(propRefs.panelShowDate.value).add(1, 'month')]
      : undefined,
  );

  function switchPanelShowDate(type: 'start' | 'end', date: Dayjs) {
    if (propRefs.isLinkPanels.value) {
      if (type === 'start') {
        startPanelShowDate.value = date;
        setPanelShowDate('end');
      } else {
        endPanelShowDate.value = date;
        setPanelShowDate('start');
      }
    } else {
      if (type === 'start') {
        startPanelShowDate.value = date;
        endPanelShowDate.value =
          dayjs.max(date.add(...getPanelGap()), endPanelShowDate.value) ?? endPanelShowDate.value;
      } else {
        endPanelShowDate.value = date;
        startPanelShowDate.value =
          dayjs.min(date.subtract(...getPanelGap()), startPanelShowDate.value) ??
          startPanelShowDate.value;
      }
    }
  }

  watch(
    customShowDate,
    val => {
      if (val) {
        switchPanelShowDate('start', val[0]);
        if (options.isRange.value) {
          switchPanelShowDate('end', val[1]);
        }
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );

  watch(options.visible, val => {
    if (val) {
      switch (options.pickerType.value) {
        case 'year':
        case 'year-range':
          endPickerType.value = startPickerType.value = 'year';
          break;
        case 'month':
        case 'month-range':
          endPickerType.value = startPickerType.value = 'month';
          break;
        default:
          endPickerType.value = startPickerType.value = 'day';
      }
      refreshPanelShowDate();
    }
  });

  watch([options.startDate, options.endDate], () => {
    if (!options.visible) {
      refreshPanelShowDate();
    }
  });

  watch(
    [startPickerType, endPickerType],
    () => {
      
      if (isStartEndPanelShouldRefresh()) {
        setPanelShowDate('end');
      }
    },
    {
      deep: true,
    },
  );

  function isStartEndPanelShouldRefresh() {
    switch (startPickerType.value) {
      case 'year':
        return Math.abs(endPanelShowDate.value.year() - startPanelShowDate.value.year()) <= 10;
      case 'month':
        switch (endPickerType.value) {
          case 'year':
            return Math.abs(endPanelShowDate.value.year() - startPanelShowDate.value.year()) <= 10;
          case 'month':
            return endPanelShowDate.value.isSameOrBefore(startPanelShowDate.value, 'year');
          case 'day':
            return endPanelShowDate.value.isSameOrBefore(startPanelShowDate.value, 'year');
        }
      case 'day':
        switch (endPickerType.value) {
          case 'year':
            return Math.abs(endPanelShowDate.value.year() - startPanelShowDate.value.year()) <= 10;
          case 'month':
            return endPanelShowDate.value.isSameOrBefore(startPanelShowDate.value, 'year');
          case 'day':
            return endPanelShowDate.value.isSameOrBefore(startPanelShowDate.value, 'month');
        }
    }
  }

  function refreshPanelShowDate() {
    if (options.isRange.value) {
      startPanelShowDate.value = options.startDate.value ?? startPanelShowDate.value;

      if (propRefs.isLinkPanels.value) {
        setPanelShowDate('end');
      } else {
        if (!propRefs.singlePanel.value) {
          endPanelShowDate.value = options.endDate.value ?? endPanelShowDate.value;
        }

        if (isStartEndPanelShouldRefresh()) {
          setPanelShowDate('end');
        }
      }
    } else {
      startPanelShowDate.value = options.startDate.value ?? customShowDate.value?.[0] ?? dayjs();
      setPanelShowDate('end');
    }
  }

  function getPanelGap(): [number, ManipulateType] {
    switch (options.pickerType.value) {
      case 'year-range':
      case 'year':
        return [10, 'year'];
      case 'month-range':
      case 'month':
        return [1, 'year'];
      default:
        return [1, 'month'];
    }
  }

  function setPanelShowDate(which: 'start' | 'end') {
    switch (options.pickerType.value) {
      case 'year-range':
      case 'year':
        if (which === 'start') {
          startPanelShowDate.value = endPanelShowDate.value.subtract(...getPanelGap());
        } else {
          endPanelShowDate.value = startPanelShowDate.value.add(...getPanelGap());
        }
        break;
      case 'month-range':
      case 'month':
        if (which === 'start') {
          startPanelShowDate.value = endPanelShowDate.value.subtract(...getPanelGap());
        } else {
          endPanelShowDate.value = startPanelShowDate.value.add(...getPanelGap());
        }
        break;
      default:
        if (which === 'start') {
          startPanelShowDate.value = endPanelShowDate.value.subtract(...getPanelGap());
        } else {
          endPanelShowDate.value = startPanelShowDate.value.add(...getPanelGap());
        }
        break;
    }
  }

  return {
    startPickerType,
    endPickerType,
    startPanelShowDate,
    endPanelShowDate,
    showBeforeAfterDate,
    switchPanelShowDate,
    refreshPanelShowDate,
  };
}
