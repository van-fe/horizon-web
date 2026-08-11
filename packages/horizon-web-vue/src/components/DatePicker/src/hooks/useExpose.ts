import type { HorizonWebSetupContext } from '@aurora/utils';
import type { DatePickerEmits } from '../composables/useEmits';
import type { DatePickerSlots } from '../composables/useSlots';
import type { DatePickerExposes } from '../composables/useExposes';
import type { Dayjs } from 'dayjs';
import type { Ref } from 'vue';

export default function useExpose(
  context: HorizonWebSetupContext<DatePickerEmits, DatePickerSlots, DatePickerExposes>,
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
      const startTarget = options.startPanelShowDate.value.add(amount, 'year');
      const endTarget = options.endPanelShowDate.value.add(amount, 'year');
      options.switchPanelShowDate('start', startTarget);
      options.switchPanelShowDate('end', endTarget);
    },
    increaseMonth: (amount: number) => {
      const startTarget = options.startPanelShowDate.value.add(amount, 'month');
      const endTarget = options.endPanelShowDate.value.add(amount, 'month');
      options.switchPanelShowDate('start', startTarget);
      options.switchPanelShowDate('end', endTarget);
    },
    confirmHandle: () => options.doConfirm(true),
    cancelHandle: options.doCancel,
    clearHandle: options.doClear,
    refreshPanelShowDate: options.refreshPanelShowDate,
  });
}
