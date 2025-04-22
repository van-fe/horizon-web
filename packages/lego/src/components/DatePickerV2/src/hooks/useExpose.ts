import type { LegoSetupContext } from '@nio-fe/shared';
import type { DatePickerV2Emits } from '../composables/useEmits';
import type { DatePickerV2Slots } from '../composables/useSlots';
import type { DatePickerV2Exposes } from '../composables/useExposes';
import type { Dayjs } from 'dayjs';
import type { Ref } from 'vue';

export default function useExpose(
  context: LegoSetupContext<DatePickerV2Emits, DatePickerV2Slots, DatePickerV2Exposes>,
  options: {
    modifyPanelVisible: (visible: boolean) => void;
    startPanelShowDate: Ref<Dayjs>;
    endPanelShowDate: Ref<Dayjs>;
    switchPanelShowDate: (type: 'start' | 'end', date: Dayjs) => void;
    doConfirm: (triggerFromUser?: boolean) => void;
    doCancel: () => void;
    doClear: () => void;
    refreshPanelShowDate: () => void;
  },
) {
  context.expose({
    changePanelVisible: options.modifyPanelVisible,
    increaseYear: (amount: number) => {
      options.switchPanelShowDate('start', options.startPanelShowDate.value.add(amount, 'year'));
      options.switchPanelShowDate('end', options.startPanelShowDate.value.add(amount, 'year'));
    },
    increaseMonth: (amount: number) => {
      options.switchPanelShowDate('start', options.startPanelShowDate.value.add(amount, 'month'));
      options.switchPanelShowDate('end', options.startPanelShowDate.value.add(amount, 'month'));
    },
    confirmHandle: () => options.doConfirm(true),
    cancelHandle: options.doCancel,
    clearHandle: options.doClear,
    refreshPanelShowDate: options.refreshPanelShowDate,
  });
}
