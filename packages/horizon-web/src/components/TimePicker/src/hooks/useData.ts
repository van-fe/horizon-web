import type { ToRefs, Ref, WatchStopHandle } from 'vue';
import { nextTick, inject, computed, ref, watch } from 'vue';
import type { TimePickerProps } from '../composables/useProps';
import dayjs, { isDayjsEqual } from '~/utils/useDayJs';
import type { Dayjs } from 'dayjs';
import { isDayjs } from 'dayjs';
import type { TimePickerEmits } from '../composables/useEmits';
import type { LegoSetupContext } from '@aurora/shared';
import { isNil, isDefined } from '@aurora/shared';
import type { TimePickerSlots } from '../composables/useSlots';
import type { TimePickerExposes } from '../composables/useExposes';
import {
  NFormDisabledInjectedKey,
  NFormItemErrorInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { NTimePickerDomRefs, SingleOrArrayPickerDataType } from '../utils/types';
import { tryToAnalysisTime } from '~/components/TimePicker/src/utils/utils';

export default function useData(
  propRefs: ToRefs<TimePickerProps>,
  context: LegoSetupContext<TimePickerEmits, TimePickerSlots, TimePickerExposes>,
  domRefs: NTimePickerDomRefs,
  options: {
    visible: Ref<boolean>;
    modifyPanelVisible: (visible: boolean) => void;
  },
) {
  const startTime = ref<Dayjs>();
  const endTime = ref<Dayjs>();
  const previewTime = ref<Dayjs>();
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

  /** computed **/
  const isDisabled = computed(() => propRefs.disabled?.value ?? formDisabled?.value ?? false);

  const format = computed(() => {
    if (propRefs.format?.value) {
      return propRefs.format.value;
    } else {
      switch (propRefs.type.value) {
        default:
        case 'time':
          return 'HH:mm';
        case 'seconds':
          return 'HH:mm:ss';
      }
    }
  });

  const dayjsFormat = computed(() => {
    switch (propRefs.type.value) {
      default:
      case 'time':
        return 'HH:mm';
      case 'seconds':
        return 'HH:mm:ss';
    }
  });

  const canConfirmBtnClick = computed(() => {
    if (propRefs.isRange.value) {
      return startTime.value?.isValid() && endTime.value?.isValid();
    } else {
      return startTime.value?.isValid() ?? false;
    }
  });

  function transformRawModelValue():
    | undefined
    | null
    | [Dayjs | undefined | null, Dayjs | undefined | null] {
    if (isNil(propRefs.modelValue?.value)) {
      return propRefs.modelValue?.value;
    } else if (propRefs.modelValue?.value === '') {
      return propRefs.initialValue?.value;
    } else if (Array.isArray(propRefs.modelValue.value)) {
      return [
        tryToAnalysisTime(
          propRefs.modelValue.value[0],
          dayjsFormat.value,
          propRefs.initialValue?.value,
        ),
        tryToAnalysisTime(
          propRefs.modelValue.value[1],
          dayjsFormat.value,
          propRefs.initialValue?.value,
        ),
      ];
    } else {
      return [
        tryToAnalysisTime(
          propRefs.modelValue.value,
          dayjsFormat.value,
          propRefs.initialValue?.value,
        ),
        undefined,
      ];
    }
  }

  function transformModelValue() {
    const value = transformRawModelValue();

    if (value) {
      const [startVal, endVal] = value;

      if (propRefs.isRange.value) {
        startTime.value = isDayjs(startVal) ? startVal : dayjs(startVal, dayjsFormat.value);
        endTime.value = isDayjs(endVal) ? endVal : dayjs(endVal, dayjsFormat.value);
      } else {
        startTime.value = isDayjs(startVal) ? startVal : dayjs(startVal, dayjsFormat.value);
      }
    } else {
      startTime.value = undefined;
      endTime.value = undefined;
    }

    return value;
  }

  function replaceWithPreviewDatetime(
    start: Dayjs | undefined | null,
    end: Dayjs | undefined | null,
  ) {
    let timePreview: Dayjs | undefined | null = previewTime.value;

    if (previewTime.value) {
      if (!timePreview) {
        if (propRefs.isRange.value) {
          if (startTime.value && endTime.value) {
            timePreview = startTime.value;
          } else if (startTime.value) {
            timePreview = endTime.value;
          } else {
            timePreview = start;
          }
        } else {
          timePreview = startTime.value ?? start;
        }
      }
    }

    if (propRefs.hoverToDisplayValue.value && timePreview) {
      if (propRefs.isRange.value) {
        if (startTime.value && endTime.value) {
          return [startTime.value, endTime.value];
        } else if (startTime.value && !endTime.value) {
          return [startTime.value ?? start, timePreview];
        } else {
          return [timePreview, endTime.value ?? end];
        }
      } else {
        return [timePreview, end];
      }
    } else {
      return [startTime.value ?? start, endTime.value ?? end];
    }
  }

  function refreshShowValue() {
    const value = transformRawModelValue();

    const [start, end] = replaceWithPreviewDatetime(value?.[0], value?.[1]);

    const startFormat = start?.format(format.value);
    const endFormat = end?.format(format.value);

    if (propRefs.isRange.value) {
      const showArray = [startFormat, endFormat];

      showValue.value = propRefs.singleTrigger.value
        ? startFormat || endFormat
          ? showArray.map(curr => curr ?? '').join(' - ')
          : undefined
        : (showArray as [string, string]);
    } else {
      showValue.value = start
        ? propRefs.formatTriggerText?.value?.(start, startFormat ?? '') ?? startFormat
        : startFormat;
    }
  }

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

  watch(options.visible, () => {
    void nextTick(() => {
      transformModelValue();
      refreshShowValue();
      notifyPanelsUpdate();
      refreshInputShowValue();
    });
  });

  watch(previewTime, val => {
    context.emit('update:previewTime', val);
  });

  let stopWatchHoverToDisplayValue: WatchStopHandle;

  watch(
    () => propRefs.hoverToDisplayValue.value,
    val => {
      if (val) {
        stopWatchHoverToDisplayValue = watch(previewTime, refreshShowValue);
      } else {
        stopWatchHoverToDisplayValue?.();
      }
    },
    {
      immediate: true,
    },
  );

  function formatValue(value: Dayjs | undefined) {
    if (propRefs.valueFormat?.value) {
      return value?.format(propRefs.valueFormat.value);
    } else {
      return value;
    }
  }

  function doConfirm(triggerType: 'click' | 'input' | 'confirmable-input' = 'click') {
    let emitValue:
      | Dayjs
      | string
      | [Dayjs | string | undefined | null, Dayjs | string | undefined | null]
      | undefined
      | null = propRefs.initialValue?.value;

    if (propRefs.isRange.value) {
      if (isDefined(startTime.value) && isDefined(endTime.value)) {
        if (startTime.value.isBefore(endTime.value)) {
          emitValue = [formatValue(startTime.value), formatValue(endTime.value)];
        } else {
          emitValue = [formatValue(endTime.value), formatValue(startTime.value)];
        }
      }
    } else {
      if (isDefined(startTime.value)) {
        emitValue = formatValue(startTime.value);
      }
    }

    emitUpdateAndChange(emitValue, triggerType);

    if (triggerType === 'click') {
      context.emit('confirm');
      options.modifyPanelVisible(false);
      doBlur();
    }
  }

  function emitUpdateAndChange(
    value: SingleOrArrayPickerDataType<Dayjs | string | undefined | null>,
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) {
    if (!isDayjsEqual(value, prevEmitChangeValue)) {
      context.emit('update:modelValue', value, triggerType);
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
    options.modifyPanelVisible(false);
    context.emit('cancel');
  }

  function checkConfirm(triggerType: 'click' | 'input' | 'confirmable-input') {
    if (!propRefs.needConfirm.value && ['click', 'confirmable-input'].includes(triggerType)) {
      if (propRefs.isRange.value) {
        if (startTime.value && endTime.value) {
          doConfirm(triggerType);
        }
      } else {
        doConfirm(triggerType);
      }
    }
  }

  function onUpdateTime(
    start: Dayjs | undefined,
    end: Dayjs | undefined,
    triggerType: 'click' | 'input' | 'confirmable-input',
  ) {
    if (start && end) {
      if (start.isBefore(end)) {
        startTime.value = start;
        endTime.value = end;
      } else {
        startTime.value = end;
        endTime.value = start;
      }
    } else if (start) {
      startTime.value = start;
    } else if (end) {
      endTime.value = end;
    }

    checkConfirm(triggerType);
  }

  function onClickNow() {
    switch (propRefs.type.value) {
      case 'time':
        domRefs.startTimePanelDomRef.value?.clickTimeCell(dayjs());
        domRefs.endTimePanelDomRef.value?.clickTimeCell(
          dayjs().add(propRefs.timeStep.value, 'minutes'),
        );
        break;
      case 'minutes':
        domRefs.startTimePanelDomRef.value?.clickTimeCell(dayjs());
        domRefs.endTimePanelDomRef.value?.clickTimeCell(
          dayjs().add(propRefs.minuteStep.value, 'minutes'),
        );
        break;
      case 'seconds':
        domRefs.startTimePanelDomRef.value?.clickTimeCell(dayjs());
        domRefs.endTimePanelDomRef.value?.clickTimeCell(
          dayjs().add(propRefs.secondStep.value, 'seconds'),
        );
        break;
    }

    void nextTick(() => {
      checkConfirm('click');
    });
  }

  function doClear() {
    startTime.value = undefined;
    endTime.value = undefined;
    notifyPanelsUpdate();
    doConfirm('click');
    context.emit('clear');
  }

  function notifyPanelsUpdate() {
    setTimeout(() => {
      domRefs.startTimePanelDomRef.value?.updateCurrentTimeFromModelValue();
      domRefs.endTimePanelDomRef.value?.updateCurrentTimeFromModelValue();
    });
  }

  function refreshInputShowValue() {
    domRefs.startInputDomRef.value?.resetInputString();
    domRefs.endInputDomRef.value?.resetInputString();
  }

  return {
    startTime,
    endTime,
    showValue,
    previewTime,
    isDisabled,
    canConfirmBtnClick,
    dayjsFormat,
    formItemError,
    onUpdateTime,
    doConfirm,
    doCancel,
    doClear,
    doBlur,
    onClickNow,
  };
}
