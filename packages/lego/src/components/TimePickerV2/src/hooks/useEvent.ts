import { type LegoSetupContext, safelyGetEventTarget } from '@nio-fe/shared';
import dayjs from '~/utils/useDayJs';
import type { Dayjs } from 'dayjs';
import type { ComputedRef, Ref, ToRefs } from 'vue';
import { inject } from 'vue';
import type { NTimePickerDomRefs } from '../utils/types';
import type { TimePickerV2Props } from '../composables/useProps';
import type { TimePickerV2Emits } from '../composables/useEmits';
import type { TimePickerV2Slots } from '../composables/useSlots';
import type { TimePickerV2Exposes } from '../composables/useExposes';
import { NFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';

export default function useEvent(
  propRefs: ToRefs<TimePickerV2Props>,
  context: LegoSetupContext<TimePickerV2Emits, TimePickerV2Slots, TimePickerV2Exposes>,
  domRefs: NTimePickerDomRefs,
  options: {
    dayjsFormat: ComputedRef<string>;
    startTime: Ref<Dayjs | undefined>;
    endTime: Ref<Dayjs | undefined>;
    doConfirm: (triggerType?: 'click' | 'input') => void;
  },
) {
  /** injects **/
  const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

  function onKeydown(evt: KeyboardEvent) {
    if (evt.code.toLowerCase() === 'enter') {
      evt.stopPropagation();
      options.doConfirm();
    }
  }

  function onInput(evt: Event, type: 'start' | 'end' = 'start') {
    const target = safelyGetEventTarget(evt) as HTMLInputElement;
    const value = target.value;

    context.emit('input', value, evt);

    if (propRefs.isRange.value && propRefs.singleTrigger.value) {
      const [start, end] = value.split('-');

      const startDayjsObject = dayjs(start, options.dayjsFormat.value);
      const endDayjsObject = dayjs(end, options.dayjsFormat.value);

      if (startDayjsObject.isValid() && endDayjsObject.isValid()) {
        domRefs.startTimePanelDomRef.value?.clickTimeCell(startDayjsObject, 'input');
        domRefs.endTimePanelDomRef.value?.clickTimeCell(endDayjsObject, 'input');
      } else if (startDayjsObject.isValid()) {
        domRefs.startTimePanelDomRef.value?.clickTimeCell(startDayjsObject, 'input');
      } else if (endDayjsObject.isValid()) {
        domRefs.endTimePanelDomRef.value?.clickTimeCell(endDayjsObject, 'input');
      }
    } else {
      const dayjsObj = dayjs(value, options.dayjsFormat.value);

      if (dayjsObj.isValid()) {
        if (type === 'start') {
          domRefs.startTimePanelDomRef.value?.clickTimeCell(dayjsObj, 'input');
        } else {
          domRefs.endTimePanelDomRef.value?.clickTimeCell(dayjsObj, 'input');
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

    context.emit('click', evt);
  }

  function handleFocus() {
    context.emit('focus');
  }

  function handleBlur() {
    if (propRefs.confirmType.value === 'blur') {
      options.doConfirm('click');
    }

    context.emit('blur');
    formItemTrigger?.('blur');
  }

  return {
    onKeydown,
    onInput,
    onClick,
    handleFocus,
    handleBlur,
  };
}
