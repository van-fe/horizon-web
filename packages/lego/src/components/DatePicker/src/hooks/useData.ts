import type { ToRefs, Ref, ComputedRef, WatchStopHandle } from 'vue';
import { nextTick, inject, computed, ref, watch } from 'vue';
import type { DatePickerProps } from '../composables/useProps';
import dayjs, { isDayjsEqual } from '~/utils/useDayJs';
import type { Dayjs } from 'dayjs';
import type { DatePickerEmits } from '../composables/useEmits';
import type { LegoSetupContext } from '@nio-fe/shared';
import { isFunction, isNil, isDefined, isString } from '@nio-fe/shared';
import type { DatePickerSlots } from '../composables/useSlots';
import type { DatePickerExposes } from '../composables/useExposes';
import {
  NFormDisabledInjectedKey,
  NFormItemErrorInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { NDatePickerDomRefs, NDatePickerBaseSupportType } from '../utils/types';
import { getCurrentLocale } from '~/utils/useLocaleLang';
import { warn } from '~/utils/useLog';
import { mergeDateTime, onlyCloneTime, tryToAnalysisDate } from '../utils/useDayjs';

export function transformWeekPickedDate(date: Dayjs, firstDayOfWeek: number): Dayjs {
  if (date.day() >= firstDayOfWeek) {
    return date.subtract(date.day() - firstDayOfWeek, 'day');
  } else {
    return date.subtract(7 - firstDayOfWeek + date.day(), 'day');
  }
}

export function useDate() {
  const startDate = ref<Dayjs | null>();
  const endDate = ref<Dayjs | null>();
  const previewDate = ref<Dayjs>();

  return {
    startDate,
    endDate,
    previewDate,
  };
}

export function useTime() {
  const startTime = ref<Dayjs | null>();
  const endTime = ref<Dayjs | null>();
  const previewStartTime = ref<Dayjs>();
  const previewEndTime = ref<Dayjs>();

  return {
    startTime,
    endTime,
    previewStartTime,
    previewEndTime,
  };
}

export default function useData(
  propRefs: ToRefs<DatePickerProps>,
  context: LegoSetupContext<DatePickerEmits, DatePickerSlots, DatePickerExposes>,
  domRefs: NDatePickerDomRefs,
  options: {
    pickerType: ComputedRef<NDatePickerBaseSupportType>;
    startDate: Ref<Dayjs | undefined | null>;
    endDate: Ref<Dayjs | undefined | null>;
    previewDate: Ref<Dayjs | undefined>;
    startTime: Ref<Dayjs | undefined | null>;
    endTime: Ref<Dayjs | undefined | null>;
    previewStartTime: Ref<Dayjs | undefined>;
    previewEndTime: Ref<Dayjs | undefined>;
    valueFormat: ComputedRef<string>;
    format: ComputedRef<string>;
    visible: Ref<boolean>;
    modifyPanelVisible: (visible: boolean) => void;
  },
) {
  const showValue = ref<string | undefined | [string | undefined, string | undefined]>();
  let prevEmitChangeValue:
    | Dayjs
    | string
    | [Dayjs | string | undefined | null, Dayjs | string | undefined | null]
    | undefined
    | null = undefined;

  /** injects **/
  const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
  const formDisabled = inject(NFormDisabledInjectedKey, undefined);
  const formItemError = inject(NFormItemErrorInjectedKey, undefined);
  const currentLocale = getCurrentLocale();

  /** computed **/
  const isRange = computed(() => options.pickerType.value.endsWith('range'));
  const isContainTime = computed(() => /time|minutes|seconds/.test(options.pickerType.value));

  const isDisabled = computed(() => propRefs.disabled?.value ?? formDisabled?.value ?? false);

  const canConfirmBtnClick = computed(() => {
    if (isRange.value) {
      if (isContainTime.value) {
        return (
          options.startDate.value?.isValid() &&
          options.endDate.value?.isValid() &&
          options.startTime.value?.isValid() &&
          options.endTime.value?.isValid()
        );
      } else {
        return options.startDate.value?.isValid() && options.endDate.value?.isValid();
      }
    } else {
      if (isContainTime.value) {
        return options.startDate.value?.isValid() && options.startTime.value?.isValid();
      } else {
        return options.startDate.value?.isValid() ?? false;
      }
    }
  });

  function transformRawModelValue():
    | null
    | undefined
    | [Dayjs | undefined | null, Dayjs | undefined | null] {
    if (isNil(propRefs.modelValue?.value)) {
      return propRefs.modelValue?.value || propRefs.initialValue?.value;
    } else if (propRefs.modelValue?.value === '') {
      return propRefs.initialValue?.value;
    } else if (Array.isArray(propRefs.modelValue.value)) {
      return [
        tryToAnalysisDate(
          propRefs.modelValue.value[0],
          options.valueFormat.value,
          propRefs.initialValue?.value,
        ),
        tryToAnalysisDate(
          propRefs.modelValue.value[1],
          options.valueFormat.value,
          propRefs.initialValue?.value,
        ),
      ];
    } else {
      return [
        tryToAnalysisDate(
          propRefs.modelValue.value,
          options.valueFormat.value,
          propRefs.initialValue?.value,
        ),
        undefined,
      ];
    }
  }

  function transformModelValue() {
    const value = transformRawModelValue();

    if (value) {
      if (isRange.value) {
        options.startDate.value = value[0];
        options.startTime.value = isContainTime.value ? onlyCloneTime(value[0]) : undefined;
        options.endDate.value = value[1];
        options.endTime.value = isContainTime.value ? onlyCloneTime(value[1]) : undefined;
      } else if (options.pickerType.value === 'week') {
        options.startDate.value = value[0]
          ? transformWeekPickedDate(value[0], propRefs.firstDayOfWeek.value)
          : undefined;
        options.endDate.value = options.startDate.value?.add(6, 'days');
      } else {
        options.startDate.value = value[0];
        options.startTime.value = isContainTime.value ? onlyCloneTime(value[0]) : undefined;
      }
    } else {
      options.startDate.value = undefined;
      options.endDate.value = undefined;
      options.startTime.value = undefined;
      options.endTime.value = undefined;
    }

    return value;
  }

  let lastEmitDateTime: [Dayjs | undefined | null, Dayjs | undefined | null] | undefined =
    undefined;

  function replaceWithPreviewDatetime(
    start: Dayjs | undefined | null,
    end: Dayjs | undefined | null,
  ) {
    let emitDateTime: [Dayjs | undefined | null, Dayjs | undefined | null];

    if (
      propRefs.hoverToDisplayValue.value &&
      (isContainTime.value
        ? options.previewDate.value ||
          options.previewStartTime.value ||
          options.previewEndTime.value
        : options.previewDate.value)
    ) {
      if (isRange.value) {
        if (isContainTime.value) {
          if ((options.startDate.value && options.endDate.value) || !options.startDate.value) {
            emitDateTime = [
              mergeDateTime(
                options.previewDate.value ?? options.startDate.value ?? start,
                options.previewStartTime.value ?? options.startTime.value ?? start,
              ),
              mergeDateTime(
                options.endDate.value ?? end,
                options.previewEndTime.value ?? options.endTime.value ?? end,
              ),
            ];
          } else {
            emitDateTime = [
              mergeDateTime(
                options.startDate.value ?? start,
                options.previewStartTime.value ?? options.startTime.value ?? start,
              ),
              mergeDateTime(
                options.previewDate.value ?? options.endDate.value ?? end,
                options.previewEndTime.value ?? options.endTime.value ?? end,
              ),
            ];
          }
        } else {
          if ((options.startDate.value && options.endDate.value) || !options.startDate.value) {
            emitDateTime = [
              options.previewDate.value ?? options.startDate.value ?? start,
              options.endDate.value ?? end,
            ];
          } else {
            emitDateTime = [
              options.startDate.value ?? start,
              options.previewDate.value ?? options.endDate.value ?? end,
            ];
          }
        }
      } else {
        emitDateTime = [
          mergeDateTime(
            options.previewDate.value ?? options.startDate.value ?? start,
            options.previewStartTime.value ?? options.startTime.value ?? start,
          ),
          end,
        ];
      }
    } else {
      emitDateTime = [
        mergeDateTime(options.startDate.value ?? start, options.startTime.value ?? start),
        mergeDateTime(options.endDate.value ?? end, options.endTime.value ?? end),
      ];
    }

    if (lastEmitDateTime) {
      if (!isDayjsEqual(lastEmitDateTime, emitDateTime)) {
        lastEmitDateTime = emitDateTime;
        context.emit('update:previewDate', ...emitDateTime);
      }
    } else {
      lastEmitDateTime = emitDateTime;
      context.emit('update:previewDate', ...emitDateTime);
    }

    return emitDateTime;
  }

  function refreshShowValue() {
    const value = transformRawModelValue();

    const { 0: start, 1: end } = replaceWithPreviewDatetime(value?.[0], value?.[1]);

    const startFormat = start?.format(options.format.value);
    const endFormat = end?.format(options.format.value);

    let currentShowValue;

    if (isRange.value) {
      const showArray = [startFormat, endFormat];

      currentShowValue = propRefs.singleTrigger.value
        ? startFormat || endFormat
          ? showArray.map(curr => curr ?? '').join(' - ')
          : undefined
        : (showArray as [string, string]);
    } else {
      currentShowValue =
        propRefs.formatTriggerText?.value?.(start, startFormat ?? '') ?? startFormat;
    }

    if (propRefs.formatTriggerText?.value && isFunction(propRefs.formatTriggerText.value)) {
      const customFormatShowValue = propRefs.formatTriggerText.value(
        isRange.value ? value : value?.[0],
        currentShowValue,
      );

      if (
        isRange.value &&
        !propRefs.singleTrigger.value &&
        !Array.isArray(customFormatShowValue) &&
        !propRefs.singleTrigger.value
      ) {
        warn('date-picker', `formatTriggerText returned value is not array!`);
        showValue.value = currentShowValue;
      } else {
        showValue.value = customFormatShowValue;
      }
    } else {
      showValue.value = currentShowValue;
    }
  }

  let stopWatchHoverToDisplayValue: WatchStopHandle;

  watch(
    () => propRefs.hoverToDisplayValue.value,
    val => {
      if (val) {
        stopWatchHoverToDisplayValue = watch(
          [options.previewDate, options.previewStartTime, options.previewEndTime],
          refreshShowValue,
        );
      } else {
        stopWatchHoverToDisplayValue?.();
      }
    },
    {
      immediate: true,
    },
  );

  watch(
    () => propRefs.modelValue?.value,
    () => {
      prevEmitChangeValue = transformModelValue();
      refreshShowValue();
    },
    {
      immediate: true,
      deep: true,
    },
  );

  watch(propRefs.firstDayOfWeek, () => {
    if (options.pickerType.value === 'week') {
      transformModelValue();
      refreshShowValue();
    }
  });

  watch(currentLocale, refreshShowValue);

  watch(options.visible, val => {
    void nextTick(() => {
      if (!val) {
        options.previewDate.value = undefined;
        options.previewStartTime.value = undefined;
        options.previewEndTime.value = undefined;
      }

      transformModelValue();
      refreshShowValue();
      refreshInputShowValue();
    });
  });

  function formatValue(value: Dayjs | undefined) {
    if (propRefs.valueFormat?.value) {
      return value?.format(propRefs.valueFormat.value);
    } else {
      return value;
    }
  }

  function doConfirm(triggerFromUser = false) {
    let emitValue:
      | Dayjs
      | string
      | [Dayjs | string | undefined | null, Dayjs | string | undefined | null]
      | undefined
      | null = propRefs.initialValue?.value;

    if (isRange.value) {
      const startDate = options.startDate.value;
      const startTime = options.startTime.value;
      const endDate = options.endDate.value;
      const endTime = options.endTime.value;

      emitValue = [mergeDateTime(startDate, startTime), mergeDateTime(endDate, endTime)]
        .sort((a, b) => (a?.isBefore(b, 'seconds') ? -1 : 1))
        .map(curr => formatValue(curr)) as [
        Dayjs | string | undefined | null,
        Dayjs | string | undefined | null,
      ];

      if (
        isContainTime.value
          ? !isDefined(startDate) ||
            !isDefined(endDate) ||
            !isDefined(startTime) ||
            !isDefined(endTime)
          : !isDefined(startDate) || !isDefined(endDate)
      ) {
        emitValue = propRefs.initialValue?.value;
      }
    } else if (isDefined(options.startDate.value)) {
      emitValue = formatValue(mergeDateTime(options.startDate.value, options.startTime.value));
    }

    triggerFromUser && context.emit('confirm');
    emitUpdateAndChange(emitValue);
    options.modifyPanelVisible(false);
    doBlur();
  }

  function emitUpdateAndChange(
    value:
      | Dayjs
      | string
      | [Dayjs | string | undefined | null, Dayjs | string | undefined | null]
      | undefined
      | null,
  ) {
    if (!isDayjsEqual(value, prevEmitChangeValue)) {
      context.emit('update:modelValue', value);
      context.emit('change', value);
      formItemTrigger?.('change');
    }
  }

  function doBlur() {
    domRefs.pickerDomRef.value?.blur();
    domRefs.startInputDomRef.value?.blur();
    domRefs.endInputDomRef.value?.blur();
  }

  function doCancel() {
    context.emit('cancel');
    options.modifyPanelVisible(false);
  }

  function checkConfirm(triggerType: 'click' | 'input' | 'confirmable-input') {
    if (!propRefs.needConfirm.value && ['click'].includes(triggerType)) {
      if (isRange.value) {
        if (isContainTime.value) {
          if (
            options.startDate.value &&
            options.endDate.value &&
            options.startTime.value &&
            options.endTime.value
          ) {
            doConfirm();
          }
        } else {
          if (options.startDate.value && options.endDate.value) {
            doConfirm();
          }
        }
      } else {
        if (isContainTime.value) {
          if (options.startDate.value && options.startTime.value) {
            doConfirm();
          }
        } else {
          if (options.startDate.value) {
            doConfirm();
          }
        }
      }
    }
  }

  function onUpdateDate(
    start: Dayjs | undefined | null,
    end: Dayjs | undefined | null,
    triggerType: 'click' | 'input',
  ) {
    if (start && end) {
      if (start.isBefore(end)) {
        options.startDate.value = start;
        options.endDate.value = end;
      } else {
        options.startDate.value = end;
        options.endDate.value = start;
      }
    } else {
      options.startDate.value = start;
      options.endDate.value = end;
    }

    if (
      propRefs.defaultTime?.value &&
      (isRange.value
        ? !options.startTime.value && !options.endTime.value
        : !options.startTime.value)
    ) {
      const { 0: startTime, 1: endTime } = Array.isArray(propRefs.defaultTime.value)
        ? propRefs.defaultTime.value
        : [propRefs.defaultTime.value, propRefs.defaultTime.value];

      if (isRange.value) {
        options.startTime.value = isString(startTime)
          ? dayjs(`${dayjs().format('YYYY-MM-DD')} ${startTime}`)
          : dayjs(startTime);
        options.endTime.value = isString(endTime)
          ? dayjs(`${dayjs().format('YYYY-MM-DD')} ${endTime}`)
          : dayjs(endTime);
      } else {
        options.startTime.value = isString(startTime)
          ? dayjs(`${dayjs().format('YYYY-MM-DD')} ${startTime}`)
          : dayjs(startTime);
      }
    }

    checkConfirm(triggerType);
  }

  function onUpdatePreviewDate(date: Dayjs | undefined) {
    options.previewDate.value = date;
  }

  function onUpdateTime(
    start: Dayjs | undefined | null,
    end: Dayjs | undefined | null,
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) {
    options.startTime.value = start;
    options.endTime.value = end;

    checkConfirm(triggerType);
  }

  function onUpdatePreviewTime(time: Dayjs | undefined, type: 'start' | 'end') {
    if (type === 'start') {
      options.previewStartTime.value = time;
    } else {
      options.previewEndTime.value = time;
    }
  }

  function onClickNow() {
    onUpdateDate(dayjs(), dayjs(), 'click');
    if (isContainTime.value && !propRefs.defaultTime?.value) {
      onUpdateTime(dayjs(), dayjs(), 'click');
    }
  }

  function doClear() {
    options.startDate.value = undefined;
    options.endDate.value = undefined;
    options.startTime.value = undefined;
    options.endTime.value = undefined;

    doConfirm();

    context.emit('clear');
  }

  function refreshInputShowValue() {
    domRefs.startInputDomRef.value?.resetInputString();
    domRefs.endInputDomRef.value?.resetInputString();
  }

  return {
    showValue,
    isRange,
    isContainTime,
    isDisabled,
    canConfirmBtnClick,
    formItemError,
    onUpdateDate,
    onUpdatePreviewDate,
    onUpdateTime,
    onUpdatePreviewTime,
    doConfirm,
    doCancel,
    doClear,
    doBlur,
    onClickNow,
  };
}
