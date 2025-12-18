import type { Ref } from 'vue';
import { provide, ref } from 'vue';
import { NTimePickerV2PanelVisibleInjectKey } from '../utils/injectKeys';
import type { LegoComponentInstance, LegoSetupContext } from '@nio-fe/shared';
import type NPicker from '~/components/Picker/src/Picker';
import type { PickerExposes } from '~/components/Picker/src/composables/useExposes';
import type { TimePickerV2Emits } from '../composables/useEmits';
import type { TimePickerV2Slots } from '../composables/useSlots';
import type { TimePickerV2Exposes } from '../composables/useExposes';

export default function useVisible(
  context: LegoSetupContext<TimePickerV2Emits, TimePickerV2Slots, TimePickerV2Exposes>,
  pickerDomRef: Ref<LegoComponentInstance<typeof NPicker, PickerExposes> | undefined>,
) {
  const visible = ref(false);

  provide(NTimePickerV2PanelVisibleInjectKey, visible);

  function modifyPanelVisible(visible: boolean) {
    if (visible) {
      pickerDomRef.value?.showPopover();
    } else {
      pickerDomRef.value?.hidePopover();
    }
    context.emit('dropdownVisibleChange', visible);
  }

  function onShow() {
    visible.value = true;
  }

  function onHide() {
    visible.value = false;
  }

  return {
    pickerDomRef,
    visible,
    onShow,
    onHide,
    modifyPanelVisible,
  };
}
