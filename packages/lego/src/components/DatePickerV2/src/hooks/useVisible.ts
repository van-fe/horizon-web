import type { Ref } from 'vue';
import { provide, ref } from 'vue';
import { NDatePickerV2PanelVisibleInjectKey } from '../utils/injectKeys';
import type { LegoComponentInstance, LegoSetupContext } from '@nio-fe/shared';
import type NPicker from '~/components/Picker/src/Picker';
import type { PickerExposes } from '~/components/Picker/src/composables/useExposes';
import type { DatePickerV2Emits } from '../composables/useEmits';
import type { DatePickerV2Slots } from '../composables/useSlots';
import type { DatePickerV2Exposes } from '../composables/useExposes';

export default function useVisible(
  context: LegoSetupContext<DatePickerV2Emits, DatePickerV2Slots, DatePickerV2Exposes>,
  pickerDomRef: Ref<LegoComponentInstance<typeof NPicker, PickerExposes> | undefined>,
) {
  const visible = ref(false);

  provide(NDatePickerV2PanelVisibleInjectKey, visible);

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
