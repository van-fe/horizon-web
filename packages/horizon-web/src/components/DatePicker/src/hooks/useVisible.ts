import type { Ref } from 'vue';
import { provide, ref } from 'vue';
import { NDatePickerPanelVisibleInjectKey } from '../utils/injectKeys';
import type { LegoComponentInstance, LegoSetupContext } from '@aurora/shared';
import type NPicker from '~/components/Picker/src/Picker';
import type { PickerExposes } from '~/components/Picker/src/composables/useExposes';
import type { DatePickerEmits } from '../composables/useEmits';
import type { DatePickerSlots } from '../composables/useSlots';
import type { DatePickerExposes } from '../composables/useExposes';

export default function useVisible(
  context: LegoSetupContext<DatePickerEmits, DatePickerSlots, DatePickerExposes>,
  pickerDomRef: Ref<LegoComponentInstance<typeof NPicker, PickerExposes> | undefined>,
) {
  const visible = ref(false);

  provide(NDatePickerPanelVisibleInjectKey, visible);

  function modifyPanelVisible(visible: boolean) {
    if (visible) {
      pickerDomRef.value?.showPopover();
    } else {
      pickerDomRef.value?.hidePopover();
    }
  }

  function onShow() {
    visible.value = true;
    context.emit('dropdownVisibleChange', true);
  }

  function onHide() {
    visible.value = false;
    context.emit('dropdownVisibleChange', false);
  }

  return {
    pickerDomRef,
    visible,
    onShow,
    onHide,
    modifyPanelVisible,
  };
}
