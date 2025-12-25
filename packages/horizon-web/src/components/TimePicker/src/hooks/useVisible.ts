import type { Ref } from 'vue';
import { provide, ref } from 'vue';
import { NTimePickerPanelVisibleInjectKey } from '../utils/injectKeys';
import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import type NPicker from '~/components/Picker/src/Picker';
import type { PickerExposes } from '~/components/Picker/src/composables/useExposes';
import type { TimePickerEmits } from '../composables/useEmits';
import type { TimePickerSlots } from '../composables/useSlots';
import type { TimePickerExposes } from '../composables/useExposes';

export default function useVisible(
  context: HorizonWebSetupContext<TimePickerEmits, TimePickerSlots, TimePickerExposes>,
  pickerDomRef: Ref<HorizonWebComponentInstance<typeof NPicker, PickerExposes> | undefined>,
) {
  const visible = ref(false);

  provide(NTimePickerPanelVisibleInjectKey, visible);

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
