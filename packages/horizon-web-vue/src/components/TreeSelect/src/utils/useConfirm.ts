import type { ToRefs, Ref } from 'vue';
import { computed } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { HTreeSelectContext, HTreeSelectDomRefs } from './types';
import type { HTreeUuidType } from '~/components/Tree/src/utils/types';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: HTreeSelectContext,
  domRefs: HTreeSelectDomRefs,
  modelValueSet: Ref<Set<HTreeUuidType>>,
  presetModelValueSet: Ref<Set<HTreeUuidType>>,
  controlPopperVisible: (status: boolean) => void,
  whetherInputCanFocus: () => void,
  updatePresetToFormal: () => void,
) {
  const needConfirm = computed(() => props.needConfirm.value);

  function confirmHandle(hidePopper = true) {
    updatePresetToFormal();

    hidePopper && controlPopperVisible(false);

    if (!hidePopper) {
      whetherInputCanFocus();
    }

    context.emit('confirm');
  }

  function cancelHandle() {
    controlPopperVisible(false);
    context.emit('cancel');
  }

  return {
    needConfirm,
    confirmHandle,
    cancelHandle,
  };
}
