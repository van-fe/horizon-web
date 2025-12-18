import type { ToRefs, Ref } from 'vue';
import { computed } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { NTreeSelectContext, NTreeSelectDomRefs } from './types';
import type { NTreeUuidType } from '~/components/Tree/src/utils/types';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: NTreeSelectContext,
  domRefs: NTreeSelectDomRefs,
  modelValueSet: Ref<Set<NTreeUuidType>>,
  presetModelValueSet: Ref<Set<NTreeUuidType>>,
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
