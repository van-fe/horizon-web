import type { LegoSetupContext } from '@nio-fe/shared';
import { safelyGetEventTarget } from '@nio-fe/shared';
import dayjs from '~/utils/useDayJs';
import type { ComputedRef, ToRefs, Ref } from 'vue';
import { nextTick, inject } from 'vue';
import type { NDatePickerDomRefs } from '../utils/types';
import type { DatePickerV2Props } from '../composables/useProps';
import type { DatePickerV2Emits } from '../composables/useEmits';
import type { DatePickerV2Slots } from '../composables/useSlots';
import type { DatePickerV2Exposes } from '../composables/useExposes';
import { NFormItemTriggerInjectedKey } from '~/components/Form';
import { mergeDateTime, onlyCloneTime } from '../utils/useDayjs';
import type { Dayjs } from 'dayjs';

export default function useEvent(
  propRefs: ToRefs<DatePickerV2Props>,
  context: LegoSetupContext<DatePickerV2Emits, DatePickerV2Slots, DatePickerV2Exposes>,
  domRefs: NDatePickerDomRefs,
  options: {
    format: ComputedRef<string>;
    startDate: Ref<Dayjs | undefined | null>;
    endDate: Ref<Dayjs | undefined | null>;
    startTime: Ref<Dayjs | undefined | null>;
    endTime: Ref<Dayjs | undefined | null>;
    visible: Ref<boolean>;
    doConfirm: () => void;
    doBlur: () => void;
    modifyPanelVisible: (visible: boolean) => void;
    isRange: ComputedRef<boolean>;
  },
) {
  const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

  function onKeydown(evt: KeyboardEvent) {
    if (evt.code.toLowerCase() === 'enter') {
      options.doConfirm();
    }

    if (evt.code.toLowerCase() === 'escape') {
      options.modifyPanelVisible(false);
      options.doBlur();
    }
  }

  function notifyStartPanelClick(date: Dayjs) {
    domRefs.startDatePanelsDomRef.value?.clickDateCell(date, 'input', 'start');
    domRefs.startDatePanelsDomRef.value?.clickTimeCell(onlyCloneTime(date), 'confirmable-input');
  }

  function notifyEndPanelClick(date: Dayjs) {
    if (propRefs.singlePanel.value) {
      domRefs.startDatePanelsDomRef.value?.clickDateCell(date, 'input', 'end');
      domRefs.startDatePanelsDomRef.value?.clickTimeCell(onlyCloneTime(date), 'confirmable-input');
    } else {
      domRefs.endDatePanelsDomRef.value?.clickDateCell(date, 'input', 'end');
      domRefs.endDatePanelsDomRef.value?.clickTimeCell(onlyCloneTime(date), 'confirmable-input');
    }
  }

  function notifyPanelToClick(maybeStart: Dayjs, maybeEnd: Dayjs) {
    const [start, end] = maybeStart.isBefore(maybeEnd)
      ? [maybeStart, maybeEnd]
      : [maybeEnd, maybeStart];

    notifyStartPanelClick(start);

    void nextTick(() => {
      notifyEndPanelClick(end);
    });
  }

  function onInput(evt: InputEvent, type: 'start' | 'end' = 'start') {
    const target = safelyGetEventTarget(evt) as HTMLInputElement;
    const value = target.value;

    context.emit('input', value, evt);

    if (options.isRange.value && propRefs.singleTrigger.value) {
      const [start, end] = value.split('-');

      const startDayjsObject = dayjs(start, options.format.value);
      const endDayjsObject = dayjs(end, options.format.value);

      if (startDayjsObject.isValid() && endDayjsObject.isValid()) {
        notifyPanelToClick(startDayjsObject, endDayjsObject);
      } else if (startDayjsObject.isValid()) {
        notifyStartPanelClick(startDayjsObject);
      } else if (endDayjsObject.isValid()) {
        notifyEndPanelClick(endDayjsObject);
      }
    } else {
      const dayjsObj = dayjs(value, options.format.value);

      if (dayjsObj.isValid()) {
        if (!options.isRange.value) {
          notifyStartPanelClick(dayjsObj);
        } else if (type === 'start') {
          const endDatetime = mergeDateTime(options.endDate.value, options.endTime.value);
          if (endDatetime?.isValid()) {
            notifyPanelToClick(dayjsObj, endDatetime);
          } else {
            notifyStartPanelClick(dayjsObj);
          }
        } else {
          const startDatetime = mergeDateTime(options.startDate.value, options.startTime.value);
          if (startDatetime?.isValid()) {
            notifyPanelToClick(startDatetime, dayjsObj);
          } else {
            notifyEndPanelClick(dayjsObj);
          }
        }
      }
    }
  }

  function onClick(evt: MouseEvent) {
    const target = safelyGetEventTarget(evt) as HTMLElement;

    if (target.tagName.toLowerCase() !== 'input') {
      domRefs.startInputDomRef.value?.focus();
      domRefs.pickerDomRef.value?.focus();
    }
  }

  function handleFocus() {
    context.emit('focus');
  }

  function handleBlur() {
    if (propRefs.confirmType.value === 'blur') {
      options.doConfirm();
    }

    formItemTrigger?.('blur');
    context.emit('blur');
  }

  return {
    onKeydown,
    onInput,
    onClick,
    handleFocus,
    handleBlur,
  };
}
